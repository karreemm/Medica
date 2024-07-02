'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimneyMedical, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { faHouse, faCircleInfo, faHandshake } from '@fortawesome/free-solid-svg-icons';
import './Components.css';
import Link from 'next/link';



const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: "Home", icon: faHouse },
    { id: 2, text: "About", icon: faCircleInfo },
    { id: 3, text: "Collaboration", icon: faHandshake }
  ];

  return (
    <div className="bg-[#003049] flex justify-between items-center h-24 max-w-[1740px] mx-auto px-4 text-white fixed top-0 w-full z-50">
      {/* Logo */}
      <div className="flex items-center">
      <FontAwesomeIcon icon={faStethoscope} style={{color: "#fdf0d5", marginRight: "10px"}} className="" size="xl" />
      <h1 className="text-3xl  text-[#fdf0d5] pacifico-font">medica</h1>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex mx-auto space-x-4">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link href={`/${item.text}`}>
              <span className="hover:text-[#f2d7bc] font-bold text-md flex items-center text-white">
                <FontAwesomeIcon icon={item.icon} className="mr-2 text-current text-2xl" />
                {item.text}
              </span>
            </Link>
          </li>
        ))}
        </ul>
      
      {/* Login and Signup buttons */}
      <div className="hidden md:flex space-x-4">
        <Link href="/LoginPage">
          <button className="bg-[#fdf0d5] text-black p-2 rounded-full hover:bg-[#f2d7bc] font-bold">Login</button>
        </Link>
        <Link href='/SignupPage'>
        <button className="bg-[#fdf0d5] text-black p-2 rounded-full hover:bg-[#f2d7bc] font-bold">Signup</button>
        </Link>
      </div>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#003049] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        
      {/* Mobile Logo */}
        <div className='flex items-center m-4'>
          <FontAwesomeIcon icon={faStethoscope} style={{color: "#fdf0d5", marginRight: "10px"}} className="" size="xl" />
          <h1 className="w-full text-3xl font-bold text-[#fdf0d5] pacifico-font">medica</h1>
        </div>
        
        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
            <li key={item.id} className="p-4 border-b rounded-xl hover:bg-[#f2d7bc] duration-300 hover:text-black cursor-pointer border-gray-600 flex items-center">
              <Link href={`/${item.text}`}>
                <span>
                  <FontAwesomeIcon icon={item.icon} className="mr-2 text-current text-xl" />
                  {item.text}
                </span>
              </Link>
            </li>
          ))}

      {/* Login and Signup buttons */}
      <Link href='/LoginPage'>
          <li className="p-4 border-b rounded-xl cursor-pointer border-gray-600">
              <button className="w-full bg-[#fdf0d5] text-black p-2 rounded-full hover:bg-[#f2d7bc] font-bold">Login</button>
            </li>
      </Link>
      <Link href='/SignupPage'>
          <li className="p-4 border-b rounded-xl cursor-pointer border-gray-600">
              <button className="w-full bg-[#fdf0d5] text-black p-2 rounded-full hover:bg-[#f2d7bc] font-bold">Signup</button>
            </li>
      </Link>
        
      </ul>
    </div>
  );
};

export default Navbar;