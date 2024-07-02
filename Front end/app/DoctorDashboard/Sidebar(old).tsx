"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { faStethoscope, faMicroscope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import '../Components/Components.css';



interface SidebarProps {
  onOptionClick: (option: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onOptionClick }) => {

        // State to manage the sidebar's visibility
        const [sid, setSid] = useState(false);
      
        // Toggle function to handle the sidebar's display
        const handleSidebar = () => {
          setSid(!sid);
        };

        const sideItems = [
          { id: 1, text: "Appointments", icon: faStethoscope },
          { id: 2, text: "Scans", icon: faMicroscope },
          { id: 3, text: "Requests", icon: faPaperPlane }
        ];
    return (
        <>
        <div className="bg-[#003049] flex flex-col w-full px-2 md:px-4 md:p-6 text-white z-10 space-y-8 rounded-lg  h-16 md:h-[50%]">   
        {/* Logo */}
        <div className="flex items-center ">
          <h1 className="hidden md:block text-3xl text-[#fdf0d5] pacifico-font">Sidebar</h1>
        </div>
  
        {/* Desktop Navigation */}
        <ul className="hidden md:flex md:flex-col md:items-start space-y-4">
          {sideItems.map((item) => (
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
        
  
        {/* Mobile Navigation Icon */}
        <div onClick={handleSidebar} className="block md:hidden h-0">
          {sid ? <div></div> :
           <div className='flex justify-start items-center'>
          <h1 className="w-full text-2xl font-bold text-[#fdf0d5] pacifico-font flex items-center">Sidebar</h1>
          <AiOutlineMenu size={30} />
          </div>  }
        </div>
  
        {/* Mobile Navigation */}
        <ul
          className={
            sid
              ? "fixed md:hidden border-r rounded-lg border-r-gray-900 bg-[#003049] w-[90%]"
              : "duration-500 fixed left-[-100%] md:hidden  border-r rounded-lg border-r-gray-900 bg-[#003049]"
          }
        >
          
        {/* Mobile Logo */}
          <div className='flex items-center m-4'>
            <h1 className="w-full text-2xl font-bold text-[#fdf0d5] pacifico-font">Sidebar</h1>
            {sid ? <AiOutlineClose size={20} onClick={()=>setSid(false)} /> : <div></div>}

          </div>
          
          {/* Mobile Navigation Items */}
          {sideItems.map((item) => (
              <li key={item.id} className="p-4 border-b rounded-xl hover:bg-[#f2d7bc] duration-300 hover:text-black cursor-pointer border-gray-600 flex items-center">
                <Link href={`/${item.text}`}>
                  <span>
                    <FontAwesomeIcon icon={item.icon} className="mr-2 text-current text-xl" />
                    {item.text}
                  </span>
                </Link>
              </li>
            ))}

        </ul>
        </div>

        </>
        
    )
}