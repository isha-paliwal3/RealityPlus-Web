'use client'

import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import axios, { AxiosError } from 'axios';
import { memo } from 'react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    minWidth: 300,
    height: 500,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface AssistantData {
    name: string;
    assistant_id: string;
    thread_id?: string;
}

interface ChatMessage {
    text: string;
    isCurrentUser: boolean;
}

interface ChatModalProps {
    isChatActive: boolean;
    handleCloseChat: () => void;
    assistantData: AssistantData;
    setAssistantData: React.Dispatch<React.SetStateAction<AssistantData>>;
}

const Message = memo(({ text, isCurrentUser }: ChatMessage) => {
    return (
        <div className={`max-w-4/5 mx-2 p-3 rounded-[5px]
                        ${isCurrentUser ? 'bg-gray-300 text-right ml-auto text-black'
                : 'bg-blue-300 text-left mr-auto'}`}>
            {text}
        </div>
    );
});

Message.displayName = 'Message'; 

const ChatModal: React.FC<ChatModalProps> = ({ handleCloseChat, isChatActive, assistantData, setAssistantData }) => {

    useEffect(() => {
        const startChat = async () => {
            const payload = {
                assistant_id: assistantData.assistant_id
            };

            try {
                const response = await axios.post('https://reality-plus-flask.vercel.app/start', payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const thread_id = response.data.thread_id;

                const updatedAssistantData = {
                    ...assistantData,
                    thread_id: thread_id
                };

                console.log('Assistant data updated:', updatedAssistantData);

                setAssistantData(updatedAssistantData);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError;
                    console.error('Generating error:', axiosError.response?.data || axiosError.message);
                } else {
                    console.error('An unexpected error occurred:', error);
                }
            }
        };

        startChat();
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [currentMessage, setCurrentMessage] = React.useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    const handleSendMessage = async () => {
        if (currentMessage.trim() !== '') {
            setMessages(prevMessages => [...prevMessages, { text: currentMessage, isCurrentUser: true }]);

            try {
                const response = await axios.post<{
                    response: any; message: string }>('https://reality-plus-flask.vercel.app/chat', {
                    message: currentMessage,
                    thread_id: assistantData.thread_id,
                    assistant_id: assistantData.assistant_id,
                });

                console.log(response)
                const replyMessage = response.data.response;
                setMessages(prevMessages => [...prevMessages, { text: replyMessage, isCurrentUser: false }]);
            } catch (error) {
                console.error('Error sending message:', error);
            }

            setCurrentMessage('');
        }
    };

    const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentMessage(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div >
            <Modal
                open={isChatActive}
                aria-labelledby="chat-modal-title"
                aria-describedby="chat-modal-description"
            >
                <Box className='md:w-[60%] custom-scrollbar' sx={style} style={{
                    backdropFilter: 'blur(16px) saturate(180%)',
                    backgroundColor: ' rgb(23 27 34 / 60%)',
                    borderRadius: '12px',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.125)',
                }}>
                    <button className='float-right' onClick={handleCloseChat}><CloseIcon /></button>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        {assistantData.name}
                    </Typography>
                    <div className="max-h-[300px] overflow-y-auto flex flex-col space-y-2 custom-scrollbar">
                        {messages.map((message, index) => (
                            <Message
                                key={index}
                                text={message.text}
                                isCurrentUser={message.isCurrentUser}
                            />
                        ))}
                        <div ref={messagesEndRef} /> 
                    </div>
                    <div className="mt-4 flex items-center justify-center">
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={currentMessage}
                            onChange={handleMessageChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message"
                            className='absolute bottom-0 left-0 bg-fuchsia-50 '
                        />
                        <button className='absolute bottom-4 text-black right-3 z-10' onClick={handleSendMessage}><SendIcon /></button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}

export default ChatModal;
