import React from 'react'
import SignUpPage from '../components/SignUp'
import Image from 'next/image'

const page = () => {
    return (
        <div className="min-h-screen text-white flex sm:flex-col-reverse gap-1 md:flex-row justify-center md:gap-20 items-center p-5 md:p-20">
            <div className='border-solid border-fuchsia-600 border-4 rounded-lg p-[2rem] min-w-[300px] md:w-[40%] md:px-[5rem]'>
                <SignUpPage />
            </div>
            <Image  width={400} height={200} className="md:w-[40%]" src="/Key.png" alt="Img" />
        </div>
    )
}

export default page
