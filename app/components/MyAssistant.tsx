"use client"

import * as React from 'react';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ChatIcon from '@mui/icons-material/Chat';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import ChatModal from './ChatModal';
import { Assistant } from 'next/font/google';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'



const Item = styled(Paper)(() => ({
    backdropFilter: 'blur(16px) saturate(180%)',
    textAlign: 'center',
    maxWidth: 800
}));

function stringToColor(string: string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}
function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}`,
    };
}
interface Assistant {
    _id: string;
    assistant_id: string;
    name: string;
    backStory: string;
}
interface UserData {
    _id: string;
    email: string;
    password: string;
    __v: number;
    assistants: Assistant[];
}

interface AssistantData {
    assistant_id: string;
    name: string;
}

const MyAssistant: React.FC = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [user, setUser] = useState('');
    const [isChatActive, setIsChatActive] = useState<boolean>(false);
    const handleOpenChat = () => setIsChatActive(true);
    const handleCloseChat = () => setIsChatActive(false);
    const [userData, setUserData] = useState<UserData>({
        _id: '',
        email: '',
        password: '',
        __v: 0,
        assistants: [],
    });
    const [assistantData, setAssistantData] = useState<AssistantData>({
        name: '',
        assistant_id: '',
    });

    const router = useRouter();

    const handleTalk = async (assistant_id: string) => {
        // Construct the URL string manually
        const talkPath = `/Talk?assistant_id=${encodeURIComponent(assistant_id)}`;
        router.push(talkPath);
    };

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            const decoded = jwt.decode(token);
            if (decoded && typeof decoded !== 'string') {
                setUser(decoded.userId);
            }
        }
    }, []);

    useEffect(() => {
        if (!user) return;
        setIsLoading(true); 
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/myAssistant', { params: { user } });
                setUserData(response.data.userData);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError;
                    console.error('Generating error:', axiosError.response?.data || axiosError.message);
                } else {
                    console.error('An unexpected error occurred:', error);
                }
            }
            setIsLoading(false); 

        };

        fetchUserData();
    }, [user]);

    const handleChat = (name: string, assistant_id: string) =>{
        setAssistantData({
            name: name,
            assistant_id: assistant_id
        });
        handleOpenChat();
    }
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (
        <div >
           {isChatActive && <ChatModal isChatActive={isChatActive} handleCloseChat={handleCloseChat} assistantData={assistantData} setAssistantData={setAssistantData} />}
           {isLoading ? (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <CircularProgress />
            </div>
        ) : (userData.assistants.map((assistant) => (
                <Box key={assistant._id} maxWidth={{ xs: 300, sm: 'unset' }} sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }} >
                    <Item
                        sx={{
                            my: 1,
                            mx: 'auto',
                            p: 2,
                        }}
                        style={{
                            backdropFilter: 'blur(16px) saturate(180%)',
                            backgroundColor: ' rgb(23 27 34 / 60%)',
                            borderRadius: '12px',
                            color: '#fff',
                            border: '1px solid rgba(255, 255, 255, 0.125)'
                        }}
                    >
                        <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between" >
                            <Stack spacing={2} direction="row" alignItems="center" >
                                <Avatar {...stringAvatar(assistant.name)} />
                                <Typography className='text-lg' noWrap>{assistant.name}</Typography>
                            </Stack>
                            <Stack spacing={2} className='md:gap-10' direction="row" alignItems="center" >
                                <button onClick={() => handleTalk(assistant.assistant_id)} className='text-lg flex items-center gap-2'><span className='hidden md:block' >Talk</span> <VideoChatIcon /></button>
                                <button className='text-lg flex items-center gap-2' onClick={() => handleChat(assistant.name, assistant.assistant_id)}><span className='hidden md:block'>Chat</span> <ChatIcon /></button>
                            </Stack>
                        </Stack>
                    </Item>
                </Box>
            )))}
        </div>
    );
}

export default MyAssistant
