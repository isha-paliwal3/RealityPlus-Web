import React from 'react'
import GenerteAssistant from '../components/GenerateAssistant'
import Image from 'next/image'

const page = () => {
    return (
        <div className="min-h-screen text-white flex sm:flex-col gap-1 md:flex-col justify-center md:gap-5 items-center p-5 mt-20">
            <h2 className="text-3xl font-bold text-center mb-3">Ready To Bring Your Assistant to Life?</h2>
            <h4 className="text-xl">Fill This form and create magic</h4>
            <div className='flex flex-col md:flex-row  justify-center items-center w-[80%]'>
                <Image  width={400} height={200} className='w-[300px] md:w-[30%]' src="/generate.png" alt="" />
                <div className=' p-[2rem] min-w-[300px] md:w-[50%] md:px-[5rem]'>
                    <GenerteAssistant />
                </div>
            </div>
        </div>
    )
}

export default page
