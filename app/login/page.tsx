import React from 'react'
import Login from '../components/Login'

const page = () => {
    return (
        <div className="bg-[url('/BG-main.png')] bg-cover bg-center min-h-screen text-white flex sm:flex-col-reverse gap-1 md:flex-row justify-center md:gap-20 items-center p-5 md:p-20">
            <div className='border-solid border-fuchsia-600 border-4 rounded-lg p-[2rem] min-w-[300px] md:w-[38%] md:p-[5rem]'>
                <Login />
            </div>
            <img className="md:w-[40%]" src="/Lock.png" alt="Img" />
        </div>
    )
}

export default page