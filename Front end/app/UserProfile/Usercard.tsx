
"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import '../Components/Components.css';
export default function UserCard() {

    const user = localStorage.getItem("User") as string;
    const userObj = JSON.parse(user);
    const date = new Date(userObj.date);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    userObj.date = `${day} ${month} ${year}`;

    return (
        <>
        
        <div className="relative flex flex-col rounded-lg  w-[380px] " >
            <div className="h-[130px] bg-gradient-to-r from-sky-900 to-indigo-900 w-full rounded-t-lg"></div>
            <div className="h-[250px] bg-white w-full rounded-b-lg flex flex-col items-center">

                {/* Content of the  */}
                <div className="mt-16 flex flex-col items-center" >

                    {/* Name, Role and line  */}
                    <p className="text-2xl text-slate-800 font-bold text-center" >
                        {userObj.firstname} {userObj.lastname}
                    </p>
                    <p className="text-md text-slate-800 font-bold text-center mt-2	">
                        {userObj.role} 
                    </p>
                    <hr className="w-[280px] border-indigo-900 border-2 mt-4 mb-2 " />

                    {/* Joined on and Posts */}
                    <div className="flex flex-col items-start w-[320px] mt-4">
                        <p className="">
                        <FontAwesomeIcon icon={faCalendar} className="text-slate-700 h-[16px] inline mr-1" /> 
                        <span className='text-sm text-center text-slate-700 font-bold'> Joined on :</span> 
                         <span className="text-slate-700 inline text-center text-sm font-normal"> {userObj.date}</span>
                        </p>
                    </div>
                    
                </div>
            </div>
            <img
                src={userObj.profileimage}
                alt="User"
                className="absolute top-[40px] left-[30%] transform -translate-x-50% w-[150px] h-[150px] rounded-full border-4 border-white bg-white"
            />
        </div>
        </>
        
    )
}