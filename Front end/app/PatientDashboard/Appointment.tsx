"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faNotesMedical,faCalendar,faUserNurse} from '@fortawesome/free-solid-svg-icons';
import {AddScan} from './AddScan';
import { useRouter } from 'next/navigation';

function Appointment(req: {Notes:string , apid:number, did: number , name:string , image : string ,date : string , status: string}){
    const [notes, setNotes] = useState(req.Notes);
    const router = useRouter();
    let statusColor = 'text-indigo-700'
    let status = req.status;
    switch(req.status){
        case null:  
            status = "Pending...";
            break;
        case 'surgery required':
            statusColor = 'text-red-700';
            break;
        case 'surgery avoided':
            statusColor = 'text-green-700';
            break;
        default:
            break;
    }
    const [display , setDisplay] = useState(false);
    const user = localStorage.getItem('User') as string;
    const userObj= JSON.parse(user);

    const handleViewDoctor = (uid: string) => {
        router.push(`/ViewUserProfile?uid=${uid}&role=doctor`);
      };
    
   
    return (
        <div className="relative flex flex-row items-center gap-x-2 felx-nowrap justify-between bg-white 
        rounded-xl h-[400px]">
            {/* profile section here */}
            <div className="space-x-3 absolute top-2 left-2 flex flex-row flex-wrap items-center">
                <img src={req.image} alt="profile" className="w-12 h-12 rounded-full "/>
                <div className='flex flex-col'>
                    <h1 className="text-2xl font-semibold">{req.name}</h1>
                    <span className='text-lg text-gray-400'>Orthopedic doctor</span>
                </div>
            </div>
            <div onClick={() => handleViewDoctor(req.did.toString())}
             className="absolute top-4 right-4 text-indigo-600 cursor-pointer hover:text-indigo-900 flex flex-row
            items-center">  
                    <FontAwesomeIcon icon={faEye} className='text-xl'/>
                    <span className="hidden md:inline ml-2">View</span>
            </div>  
            {/* date and age section here */}
            <div className='absolute top-[80px] left-3 text-lg text-black space-y-3 mt-6'>
                <div className='flex flex-row items-center ml-2 space-x-2'>
                    <FontAwesomeIcon icon={faCalendar} className='text-xl'/>
                    <h1 className='font-normal'>Date: <span className='font-semibold ml-3 text-indigo-700'> {convertDateTime(req.date,3)} </span></h1>
                </div>
                <div className='flex flex-row items-center ml-2 space-x-2'>
                    <FontAwesomeIcon icon={faUserNurse} className='text-xl'/>
                    <h1 className='font-normal'>Status: <span className={`${statusColor} font-semibold ml-2`}>{status}</span></h1>
                </div>
               
            </div>
            {/* notes section here */}
            <div className='absolute right-[1%] bottom-[100px] mx-auto w-[98%] h-[90px]'>
                <div className='flex flex-row items-center ml-2 space-x-2'>
                    <FontAwesomeIcon icon={faNotesMedical} className='text-xl'/>
                    <h1 className='text-lg'>Doctor&apos;s notes:</h1>
                </div>
                <p className='mt-2 p-3 text-lg w-full h-full text-wrap shadow-inner focus:outline-none rounded-2xl 
                bg-gray-200 resize-none'>
                    {notes}
                </p>
            </div>
            <div className='flex h-full w-full py-3 items-end justify-center'>
                <button onClick={() => setDisplay(true)} className='py-2 px-3 text-base bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg '>Send scans</button>
            </div>
            {display && <AddScan docId={req.did} pId={userObj.uid}/>}
        </div>
    );
}
export default Appointment;

function convertDateTime(dateTime: string, offset: number): string {
    const date = new Date(dateTime);
    date.setHours(date.getHours() + offset);

    // Format the date as "2 June 2024"
    const formattedDate = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    // Format the time as "7:15 PM"
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    return `${formattedDate} at ${formattedTime}`;
}