'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { faHouse, faCircleInfo, faHandshake, faChartLine, faBriefcase, faHandHoldingMedical, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faUser, faPenToSquare, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import './Components.css';
import Link from 'next/link';
import logout from './Logout';

const NavbarUser = () => {


  const user = localStorage.getItem("User") as string;
  const userObj = JSON.parse(user);
  let role = userObj.role;


  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);


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
        <FontAwesomeIcon icon={faStethoscope} style={{color: "#fdf0d5"}} className="mr-2" size="2x" />
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
      
        {/* Settings Part */}
        <div className="hidden md:flex space-x-4">
            <div className="relative">
                    <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)} 
                    className="text-white hover:text-[#f2d7bc] focus:text-[#f2d7bc] font-bold text-md"
                    >
                    <FontAwesomeIcon icon={faGear} className="mr-2 text-xl" />
                    Settings
                    </button>
                    {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                    <Link href="/UserProfile" className="block px-4 py-2 text-black hover:bg-[#f2d7bc]">
                        <FontAwesomeIcon icon={faUser} className="mr-2 text-xl" />
                        Profile
                    </Link>
                    <Link href="/EditprofilePage" className="block px-4 py-2 text-black hover:bg-[#f2d7bc]">
                        <FontAwesomeIcon icon={faPenToSquare} className="mr-2 text-xl" />
                        Edit
                    </Link>
                    <button 
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-black hover:bg-[#f2d7bc]"
                    >
                        <FontAwesomeIcon icon={faRightFromBracket} className="mr-2 text-xl" />
                        Log Out
                    </button>

                    {/* Additional settings */}
                    <hr className='border-b-2'/>

                    {/* Admin Only */}
                    {role === 'admin' && (
                      <Link href="/AdminDashboard" className="block px-4 py-2 text-black hover:bg-[#f2d7bc]">
                        <FontAwesomeIcon icon={faChartLine} className="mr-2 text-xl" />
                        Dashboard
                      </Link>
                    )}

                    {/* Doctor Only */}
                    {(role === 'doctor') && (
                      <Link href="/DoctorDashboard" className="block px-4 py-2 text-black hover:bg-[#f2d7bc]">
                        <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-xl" />
                        Workspace
                      </Link>
                    )}

                    {/* Nurse Only */}
                    {(role === 'nurse') && (
                      <Link href="/NurseDashboard" className="block px-4 py-2 text-black hover:bg-[#f2d7bc]">
                        <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-xl" />
                        Workspace
                      </Link>
                    )}

                    {/* Patient Only */}
                    {role === 'patient' && (
                      <Link href="/PatientDashboard" className="block px-4 py-2 text-black hover:bg-[#f2d7bc]">
                        <FontAwesomeIcon icon={faHandHoldingMedical} className="mr-2 text-xl" />
                        Services
                      </Link>
                    )}

                </div>
                    )}
            </div>
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

                {/* Settings buttons */}
                    <li className="p-4 border-b rounded-xl cursor-pointer border-gray-600 hover:bg-[#f2d7bc] hover:text-black flex items-center text-white mt-4 ">
                        <Link href="/UserProfile" className=" ">
                                <span>
                                    <FontAwesomeIcon icon={faUser} className="mr-2 text-xl " />
                                    Profile
                                </span>
                            </Link>
                        </li>
                        <li className="p-4 border-b rounded-xl cursor-pointer border-gray-600 hover:bg-[#f2d7bc] hover:text-black flex items-center text-white ">
                        <Link href="/EditprofilePage" className=" ">
                                <span>
                                    <FontAwesomeIcon icon={faPenToSquare} className="mr-2 text-xl " />
                                    Edit
                                </span>
                            </Link>
                        </li>
                        <li className="p-4 border-b rounded-xl cursor-pointer border-gray-600 hover:bg-[#f2d7bc] hover:text-black flex items-center text-white ">
                        <button onClick={logout} className=" ">
                                <span>
                                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-2 text-xl " />
                                    Log Out
                                </span>
                            </button>
                        </li>

                        {/* Additional settings */}
                        <div className="mt-4"></div>

                        {/* Admin Only */}
                        {role === 'admin' && (
                          <li className="p-4 border-b rounded-xl cursor-pointer border-gray-600 hover:bg-[#f2d7bc] hover:text-black flex items-center text-white">
                            <button onClick={logout} className="">
                              <span>
                                <FontAwesomeIcon icon={faChartLine} className="mr-2 text-xl" />
                                Dashboard
                              </span>
                            </button>
                          </li>
                        )}

                        {/* Doctor & Nurse Only */}
                        {(role === 'doctor' || role === 'nurse') && (
                          <li className="p-4 border-b rounded-xl cursor-pointer border-gray-600 hover:bg-[#f2d7bc] hover:text-black flex items-center text-white">
                            <button onClick={logout} className="">
                              <span>
                                <FontAwesomeIcon icon={faBriefcase} className="mr-2 text-xl" />
                                Workspace
                              </span>
                            </button>
                          </li>
                        )}

                        {/* Patient Only */}
                        {role === 'patient' && (
                          <li className="p-4 border-b rounded-xl cursor-pointer border-gray-600 hover:bg-[#f2d7bc] hover:text-black flex items-center text-white">
                            <button onClick={logout} className="">
                              <span>
                                <FontAwesomeIcon icon={faHandHoldingMedical} className="mr-2 text-xl" />
                                Services
                              </span>
                            </button>
                          </li>
                        )}
        </ul>
    </div>
  );
};

export default NavbarUser;