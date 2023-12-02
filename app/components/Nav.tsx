"use client"

import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LogoutButton from './LogoutButton';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/authContext'; 

const Nav: React.FC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { isLoggedIn, updateAuth } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    updateAuth(false); 
    Cookies.remove('token'); 
    router.push('/login'); 
  };

 
  return (
    <div className={`fixed top-0 left-0 w-full z-50 h-[12vh] flex justify-between items-center ${isScrolled ? 'backdrop-blur-md bg-violet/30' : 'bg-transparent'}`}>
      <Link href="/"><img className='w-[125px] md:w-[250px] ml-10' src="/Logo.png" alt="Logo" /></Link>
      <ul className='mr-10 text-white flex gap-5 md:gap-10 sm:text-[12px] md:text-lg '>
        <li className="my-1 hover:underline transition duration-300 ease-in-out transform hover:scale-105"><Link href="/">Home</Link></li>
        {isLoggedIn === true ? (
          <li className="my-1 hover:underline transition duration-300 ease-in-out transform hover:scale-105">
            <LogoutButton onLogout={handleLogout} />
          </li>
        ) :  (
          <>
            <li className="my-1 hover:underline transition duration-300 ease-in-out transform hover:scale-105">
              <Link href="/signup">Sign Up</Link>
            </li>
            <li className="my-1 hover:underline transition duration-300 ease-in-out transform hover:scale-105">
              <Link href="/login">Login</Link>
            </li>
          </>
        ) }
      </ul>
    </div>
  );
}

export default Nav;