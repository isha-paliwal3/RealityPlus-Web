import Link from "next/link"
import SignUpPage from "./components/SignUp"
import Image from "next/image"

export default function Home() {
  return (
    <>
      <main className="min-h-screen text-white mt-20">
        <div className="p-10">
          <div className="section md:flex items-center font-Raleway justify-between w-[100%] ">
            <div className="md:w-[55%]">
              <div className="lg:px-20">
                <h5 className="text-900 text-2xl md:text-4xl lg:text-4xl xl:text-6xl">WELCOME TO THE EDGE OF TOMORROW</h5>
                <p className="py-[50px] sm:text-sm lg:text-xl">
                  Delve into the world of artificial intelligence and augmented reality. Our next-gen AR assistant is here to break the barriers between the virtual and real world. Life&apos;s about to get really exciting!
                  <Link href="/login">
                    <button className="hidden md:block bg-orng-100 hover:bg-orng-200 text-white font-bold py-2 px-4 rounded-lg mt-4 transition duration-300 ease-in-out transform hover:scale-105">Try Now</button>
                  </Link>
                </p>
              </div>
            </div>
              <Image className="md:w-[40%]" width={400} height={200} src="/Img1.png" alt="Img" />
            <Link href="/signup">
              <button className="md:hidden text-center bg-orng-200 hover:bg-orng-200 text-white font-bold py-2 px-4 rounded-lg mt-4 transition duration-300 ease-in-out transform hover:scale-105">Try Now</button>
            </Link>
          </div>

          <div className="section md:flex gap-10 items-center font-Raleway justify-between w-[100%] lg:p-20 mt-20 mb-20">
            <div className="relative xl:w-[400px] xl:h-[300px] md:w-[300px] md:h-[200px] sm:w-[unset] sm:h-[unset] mt-20 md:mt-[unset]">
              <div className="absolute inset-0 bg-violet-900 opacity-0 rounded-md"></div>
              <Image  width={400} height={200} className="w-full h-full object-cover rounded-md" src="/Cooking.jpg" alt="" />
              <p className="mt-5 sm:text-sm lg:text-xl">Whisk in the virtual world - where AI meets your culinary dreams. Ready to taste the future?</p>
            </div>
            <div className="relative xl:w-[400px] xl:h-[300px] md:w-[300px] md:h-[200px] sm:w-[unset] sm:h-[unset] mt-10 md:mt-[unset]">
              <div className="absolute inset-0 bg-violet-900 opacity-0 rounded-md"></div>
              <Image  width={400} height={200} className="w-full h-full object-cover rounded-md" src="/Teaching.jpg" alt="" />
              <p className="mt-5 sm:text-sm lg:text-xl">Learning is fun when it&apos;s virtually real! Dive into our incredibly engaging educational Assistance.</p>
            </div>
            <div className="relative xl:w-[400px] xl:h-[300px] md:w-[300px] md:h-[200px] sm:w-[unset] sm:h-[unset] mt-10 md:mt-[unset]">
              <div className="absolute inset-0 bg-violet-900 opacity-0 rounded-md"></div>
              <Image  width={400} height={200} className="w-full h-full object-cover rounded-md" src="/Fitness.jpg" alt="" />
              <p className="mt-5 sm:text-sm lg:text-xl">Integrating fitness with Al and AR, our personal fitness Assitant makes workouts less boring and more Fun!</p>
            </div>
          </div>

          <div className="section md:flex flex-col gap-10 items-center font-Raleway w-[100%] lg:px-20 mt-20 mb-20">
            <Image  width={400} height={200} className="md:w-[35%] mb-10 md:mb-0" src="/Signup.jpg" alt="Img" />
            <h5 className="text-900 text-2xl md:text-4xl lg:text-4xl xl:text-6xl text-center">Ready to explore your digitally enhanced reality? Jump right in!</h5>
            <div className="flex justify-center gap-10 flex-col md:flex-row">
              <Link href="/signup">
                <button className=" bg-orng-100 hover:bg-orng-200 w-[100%] text-white text-lg font-bold py-2 px-4 rounded-lg mt-4 transition duration-300 ease-in-out transform hover:scale-105">Signup</button>
              </Link>
              <Link href="/login">
                <button className=" bg-orng-100 hover:bg-orng-200 w-[100%] text-white text-lg font-bold py-2 px-4 rounded-lg mt-4 transition duration-300 ease-in-out transform hover:scale-105">Login</button>
              </Link>
            </div>
          </div>
          <div className="section md:flex flex-col gap-10 items-center font-Raleway w-[100%] lg:px-20 mt-20 mb-20">
            <h5 className="text-900 text-2xl md:text-4xl lg:text-4xl xl:text-6xl text-center">AI AR Fusion</h5>
            <Image  width={400} height={200} className="md:w-[35%] mb-10 md:mb-0" src="/AIAR1.png" alt="Img" />
            <p className="py-[10px] sm:text-sm lg:text-xl">It&apos;s not just tech, it&apos;s the future. We have woven the complexities of AI, machine learning, and AR into your friendly assistant, crafting an unparalleled experience. This fusion brings together the intricacies of artificial intelligence, the adaptability of machine learning, and the immersive visuals of augmented reality, creating a smart, intuitive, and interactive companion. </p>
          </div>
          <div className="section md:flex flex-col gap-10 items-center w-[100%] lg:px-20 mt-20 mb-20">
            <h5 className="text-900 text-2xl md:text-4xl lg:text-4xl xl:text-6xl text-center mb-10">Sign Up Now and Get your Assistant</h5>
            <div className='border-solid border-fuchsia-600 border-4 rounded-lg p-[2rem] min-w-[300px] md:w-[40%] md:px-[5rem]'>
              <SignUpPage />
            </div>
          </div>

        </div>
        <footer className="backdrop-blur-md bg-violet-900/10 py-6 text-gray-300 ">
          <div className="container mx-auto text-center">
            <p>&copy; 2023 RealityPlus</p>
            <Link href="/signup">
              <p className="mt-2">SignUp</p>
            </Link>
            <Link href="/login">
              <p className="mt-2">Login</p>
            </Link>
          </div>
        </footer>

      </main></>
  )
}
