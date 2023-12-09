'use client'

import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { memo } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import axios, { AxiosError } from 'axios';
import Avatar from '@mui/material/Avatar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    minWidth: 300,
    height: '100%',
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
    const userAvatarSrc = "";
    const assistantAvatarSrc = "/bot.png";

    return (
        <div className={`flex items-start ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
            <Avatar src={isCurrentUser ? userAvatarSrc : assistantAvatarSrc} style={{ margin: '0 8px' }} />
            <div className={`md:max-w-[50%] mx-2 sm:max-w-[80%] p-3 rounded-[5px]
                ${isCurrentUser ? 'bg-customBlue text-left ml-auto text-white-100'
                    : 'bg-slate-800 text-left mr-auto text-sm md:max-w-[70%]'}`}>
                {text}
            </div>
        </div>
    );
});


Message.displayName = 'Message';

const TypingLoader = () => (
    <div className="typing-loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
    </div>
);

const ChatModal: React.FC<ChatModalProps> = ({ handleCloseChat, isChatActive, assistantData, setAssistantData }) => {
    const veryLongTimeout = Number.MAX_SAFE_INTEGER;
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    useEffect(() => {
        const startChat = async () => {
            const payload = {
                assistant_id: assistantData.assistant_id
            };

            try {
                const response = await axios.post(`http://127.0.0.1:5000/start`, payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: veryLongTimeout
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

    useEffect(() => {
        console.log("Messages updated, scrolling to bottom");
        scrollToBottom();
    }, [messages]);


    const handleSendMessage = async () => {
        if (currentMessage.trim() !== '') {
            setIsProcessing(true);
            setMessages(prevMessages => [...prevMessages, { text: currentMessage, isCurrentUser: true }]);
            const veryLongTimeout = Number.MAX_SAFE_INTEGER;
            setCurrentMessage('');
            try {
                const response = await axios.post(
                    // 'https://reality-plus-flask.vercel.app/chat',
                    `http://127.0.0.1:5000/chat`,
                    {
                        message: currentMessage,
                        thread_id: assistantData.thread_id,
                        assistant_id: assistantData.assistant_id,
                    }, {
                    responseType: 'stream',
                    timeout: veryLongTimeout
                });

            let responseText = await response.data.split('```json\n')[1].split('\n```')[0].trim();
            responseText = responseText.replace(/```json|```/g, '').trim();

            const responseData = JSON.parse(responseText);

            responseData.forEach((item:any) => {
                if (item.text) {
                    setMessages(prevMessages => [...prevMessages, { text: item.text, isCurrentUser: false }]);
                }
            });
            } catch (error) {
                console.error('Error sending message:', error);
                toast.error("An error occurred while sending the message. Please Try Again");
            }
            setIsProcessing(false);
            setCurrentMessage('');
        }
        console.log(messages)
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
                
                <Box className='custom-scrollbar' 
                    sx={style} 
                    style={{
                        backdropFilter: 'blur(16px) saturate(180%)',
                        backgroundColor: ' rgb(23 27 34 / 60%)',
                        borderRadius: '12px',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.125)'
                    }}>
                    <button className='float-right' onClick={handleCloseChat}><CloseIcon /></button>
                    <Typography id="keep-mounted-modal-title" variant="h5" component="h2">
                        {assistantData.name}
                    </Typography>
                    <div className='flex flex-col md:items-center justify-center max-h-[80%] mt-10'>
                        {messages.length === 0 &&
                            <Typography id="keep-mounted-modal-title" className='flex flex-col items-center justify-center gap-2' variant="h4" component="h2">
                                <Avatar src='/bot.png' />
                                How can I help you today?
                            </Typography>
                        }
                        <div className="max-h-[90%] md:w-[60%] overflow-y-auto flex flex-col gap-6 custom-scrollbar">
                            {messages.map((message, index) => (
                                <Message
                                    key={index}
                                    text={message.text}
                                    isCurrentUser={message.isCurrentUser}
                                />
                            ))}
                            {isProcessing && <TypingLoader />}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="mt-4 flex items-center justify-center md:max-w-[50%]">
                            <TextField
                                fullWidth
                                value={currentMessage}
                                onChange={handleMessageChange}
                                onKeyPress={handleKeyPress}
                                disabled={isProcessing}
                                placeholder="Type a message"
                                style={{ position: 'absolute', bottom: '20px', borderRadius: '10px', color: 'black' }}
                                className='bg-fuchsia-50 max-w-[92%] md:max-w-[55%] color-black hover:outline-none'
                                inputProps={{
                                    style: { color: '#000', fontSize: '16px' }
                                }}
                            />
                            <button className='absolute bottom-9 text-black right-5 md:right-[23%] z-10' onClick={handleSendMessage} disabled={isProcessing}><SendIcon /></button>
                        </div>

                    </div>
                </Box>
            </Modal>
            <ToastContainer />
        </div>
    );
}

export default ChatModal;
