"use client"

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
    user: string,
    name: string;
    specialSkills: string;
    backStory: string;
}

import jwt from 'jsonwebtoken';

const GenerteAssistant: React.FC = () => {
    const [user, setUser] = useState('');
    const [formData, setFormData] = useState<FormData>({
        user: '',
        name: '',
        specialSkills: '',
        backStory: '',
    });

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            const decoded = jwt.decode(token);
            if (decoded && typeof decoded !== 'string') {
                setUser(decoded.userId);
            }
        }
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            'user': user,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const payload = {
            instructions: `your name is ${formData.name} your special skills include ${formData.specialSkills} and your backstory is ${formData.backStory}`
        };

        try {
            const response = await axios.post(`http://127.0.0.1:5000/createAssistant`, payload);
            console.log('Form submitted:', payload);

            const assistant_id = response.data.assistant_id;

            const assistantData = {
                ...formData,
                assistant_id: assistant_id
            };

            await axios.post('/api/generateAssistant', assistantData);
            console.log('Assistant data updated:', assistantData);
            setFormData({
                user: '',
                name: '',
                specialSkills: '',
                backStory: '',
            });
            toast.success('Assistant Created Successfully!');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                console.error('Generating error:', axiosError.response?.data || axiosError.message);
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    };

    return (
        <>
            <ToastContainer position={toast.POSITION.BOTTOM_LEFT} autoClose={5000} />
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name Of Your Assistant*"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="border hover:outline-none rounded-lg p-2 w-full bg-inherit"
                        autoComplete="off"
                        required
                    />
                </div>

                <div className="mb-4 relative">
                    <input
                        type="text"
                        name="specialSkills"
                        placeholder="Special skills for Your assistant*"
                        value={formData.specialSkills}
                        onChange={handleInputChange}
                        className="border hover:outline-none rounded-lg p-2 w-full bg-inherit"
                        required
                    />

                </div>

                <div className="mb-4">
                    <textarea
                        name="backStory"
                        placeholder="Assistant's Back Story*"
                        value={formData.backStory}
                        onChange={handleInputChange}
                        className="border hover:outline-none rounded-lg p-2 w-full bg-inherit"
                        rows={8}
                        required
                    ></textarea>
                </div>

                <div className='text-center p-2'>
                    <button
                        type="submit"
                        className="bg-orng-100 text-white py-2 px-4 rounded-lg hover:bg-orng-200"
                    >
                        Generate My Assistant
                    </button>
                </div>
            </form>
        </>
    );
};

export default GenerteAssistant;
