"use client"

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

interface FormData {
    user: string,
    name: string;
    specialSkills: string[];
    backStory: string;
    // file: File | null;
    // fileError: string;
}

import jwt from 'jsonwebtoken';

// ...rest of your imports

const GenerteAssistant: React.FC = () => {
    const [user, setUser] = useState('');
    const [formData, setFormData] = useState<FormData>({
        user:'',
        name: '',
        specialSkills: [],
        backStory: '',
        // file: null,
        // fileError: '',

    });

    const [newSkill, setNewSkill] = useState('');

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            const decoded = jwt.decode(token);
            if(decoded && typeof decoded !== 'string') {
                setUser(decoded.userId);
            }
        }
    }, []);

    // const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            'user': user,
            [name]: value,
        });
    };

    // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //         const file = e.target.files[0];
    //         if (file.size > 5242880) { // 5MB in bytes
    //             setFormData({ ...formData, fileError: 'File size exceeds 5MB', file: null });
    //         } else {
    //             setFormData({ ...formData, file: file, fileError: '' });
    //         }
    //     }
    // };

    // const removeFile = () => {
    //     setFormData({ ...formData, file: null, fileError: '' });
    //     if (fileInputRef.current) {
    //         fileInputRef.current.value = '';
    //     }
    // };

    // const triggerFileInput = () => {
    //     if (fileInputRef.current) {
    //         fileInputRef.current.click();
    //     }
    // };

    const handleSkillInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSkill(e.target.value);
    };

    const addSkill = () => {
        if (newSkill && !formData.specialSkills.includes(newSkill)) {
            setFormData({
                ...formData,
                specialSkills: [...formData.specialSkills, newSkill]
            });
            setNewSkill('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setFormData({
            ...formData,
            specialSkills: formData.specialSkills.filter(skill => skill !== skillToRemove)
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    };

    // const handleSubmit = (e: FormEvent) => {
    //     e.preventDefault();
    //     console.log('Form submitted:', formData);
    // };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await axios.post('/api/generateAssistant', formData);
            console.log('Form submitted:', formData);
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
                        placeholder="Special skills for Your assistant*"
                        value={newSkill}
                        onChange={handleSkillInput}
                        onKeyDown={handleKeyDown}
                        className="border hover:outline-none rounded-lg p-2 w-full bg-inherit"
                    />
                    {formData.specialSkills.map(skill => (
                        <span key={skill} className="inline-block bg-gray-200 rounded-full px-3 py-1 mt-2 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            {skill}
                            <button type="button" onClick={() => removeSkill(skill)} className="ml-2 text-red-500">&times;</button>
                        </span>
                    ))}
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


                {/* <div className="mb-4">
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden" // Hide the default input
                    />
                    <div
                        onClick={triggerFileInput}
                        className="border hover:outline-none rounded-lg p-2 w-full text-gray-500 cursor-pointer"
                        style={{ color: formData.file ? '#fff' : 'gray' }}
                    >
                        <button className='mr-5 text-white' >Choose File</button>
                        {formData.file ? formData.file.name : 'Additional Data for your assistant'}
                        {formData.file && (
                            <button type="button" onClick={removeFile} className="text-red-500 ml-2">&times;</button>
                        )}
                    </div>
                    {formData.fileError && (
                        <div className="text-red-500 text-sm mt-2">{formData.fileError}</div>
                    )}
                    <div className="text-red-200 text-xs mt-2">*File Should not Exeed 5mb</div>
                </div> */}

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