import React from 'react'
import MyAssistant from '../components/MyAssistant'

const page = () => {
  return (
    <div className="min-h-screen text-white flex sm:flex-col gap-1 md:flex-col justify-top md:gap-5 items-center p-5 mt-[10rem]">
      <h2 className="text-3xl font-bold text-left mb-3">Your Assistants</h2>
      <div className='flex flex-col md:flex-row  justify-center items-center w-[90%]'>
        <div className=' p-[2rem] min-w-[300px] md:w-[100%] md:px-[5rem]'>
          <MyAssistant />
        </div>
      </div>
    </div >

  )
}

export default page
