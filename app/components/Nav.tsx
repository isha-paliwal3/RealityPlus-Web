"use client"

import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LogoutButton from './LogoutButton';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/authContext';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';

const Nav: React.FC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { isLoggedIn, updateAuth } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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
    handleMenuClose();
    Cookies.remove('token');
    router.push('/login');
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`fixed top-0 left-0 w-full z-50 h-[12vh] flex justify-between items-center ${isScrolled ? 'backdrop-blur-md bg-violet/30' : 'bg-transparent'}`}>
      <Link href="/"><Image  width={400} height={200} className='w-[125px] md:w-[250px] ml-10' src="/Logo.png" alt="Logo" priority /></Link>
      <ul className='hidden mr-10 text-white md:flex gap-5 md:gap-10 sm:text-[12px] md:text-lg '>
        <li className="my-1 hover:underline transition duration-300 ease-in-out transform hover:scale-105"><Link href="/">Home</Link></li>
        {isLoggedIn === true ? (
          <>
            <li className="my-1 hover:underline transition duration-300 ease-in-out transform hover:scale-105"><Link href="/generateAssistant">Create Assistant</Link></li>
            <li className="my-1 hover:underline transition duration-300 ease-in-out transform hover:scale-105"><Link href="/myAssistants">My Assistants</Link></li>
            <li className="my-1 hover:underline transition duration-300 ease-in-out transform hover:scale-105">
              <LogoutButton onLogout={handleLogout} />
            </li>
          </>
        ) : (
          <>
            <li className="my-1 hover:underline transition duration-300 ease-in-out transform hover:scale-105">
              <Link href="/signup">Sign Up</Link>
            </li>
            <li className="my-1 hover:underline transition duration-300 ease-in-out transform hover:scale-105">
              <Link href="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
      <button className='md:hidden mr-10' onClick={toggleMenu}>
        <MenuIcon className='text-white' />
      </button>

      <ul className={`absolute backdrop-blur-md bg-violet/30 md:relative top-[12vh] left-0 w-full md:w-auto transition-all ease-in-out duration-300 ${isMenuOpen ? 'block' : 'hidden'} mr-10 p-5 text-white text-center flex flex-col md:flex-row gap-5 md:gap-10 sm:text-[12px] md:text-lg `}>
        <li className="my-1 hover:underline transition duration-300 ease-in-out transform hover:scale-105">
          <Link href="/" onClick={handleMenuClose}>Home</Link>
        </li>
        {isLoggedIn === true ? (
          <>
            <li className="my-1 hover:underline transition duration-300 ease-in-out transform hover:scale-105">
              <Link href="/generateAssistant" onClick={handleMenuClose}>Create Assistant</Link>
            </li>
            <li className="my-1 hover:underline transition duration-300 ease-in-out transform hover:scale-105">
              <Link href="/myAssistants" onClick={handleMenuClose}>My Assistants</Link>
            </li>
            <li className="my-1 hover:underline transition duration-300 ease-in-out transform hover:scale-105">
              <LogoutButton onLogout={handleLogout} />
            </li>
          </>
        ) : (
          <>
            <li className="my-1 hover:underline transition duration-300 ease-in-out transform hover:scale-105">
              <Link href="/signup" onClick={handleMenuClose}>Sign Up</Link>
            </li>
            <li className="my-1 hover:underline transition duration-300 ease-in-out transform hover:scale-105">
              <Link href="/login" onClick={handleMenuClose}>Login</Link>
            </li>
          </>
        )}
      </ul>
    </div >
  );
}

export default Nav;