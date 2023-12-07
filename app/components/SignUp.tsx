"use client"

import React, { useState, FormEvent, useContext } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/authContext';
import Link from "next/link";
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';

interface SignUpForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const SignUpPage: React.FC = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { updateAuth } = useContext(AuthContext);
    const [formData, setFormData] = useState<SignUpForm>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('/api/signup', formData);
            console.log('Signup successful:', response.data);
            updateAuth(true);
            router.push('/generateAssistant');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                console.error('Signup error:', axiosError.response?.data || axiosError.message);
                toast.error(axiosError.message + "Please Try Again with correct Email or password");
            } else {
                console.error('An unexpected error occurred:', error);
                toast.error("An error occurred, Please Try Again");
            }
        }
        setIsLoading(false);
    };

    return (
        <>
            <h2 className="text-xl md:text-3xl md:font-bold mb-4">Sign Up</h2><form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="border hover:outline-none rounded-lg p-2 w-full text-fuchsia-950"
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="border  hover:outline-none rounded-lg p-2 w-full text-fuchsia-950"
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border  hover:outline-none rounded-lg p-2 w-full text-fuchsia-950"
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="border hover:outline-none rounded-lg p-2 w-full text-fuchsia-950"
                        autoComplete="off"
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="bg-orng-100 text-white py-2 px-4 rounded-lg hover:bg-orng-200 "
                    >
                        Sign Up
                    </button>
                </div>
                <div>
                    <p className='text-center p-2'>Already Have an Account? <Link href='/login' className='underline'> Login</Link></p>
                </div>
            </form>
            {isLoading && (
                <div className="loader-container">
                    <CircularProgress />
                </div>
            )}
            <ToastContainer />
        </>
    );
};

export default SignUpPage;
