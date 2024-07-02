"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faNotesMedical,faCalendar, faBaby} from '@fortawesome/free-solid-svg-icons';
import { AddSurgery } from './AddSurgery';
import { handelStatus } from './UpdateStatus';
import { handelNotes } from './AddNotes';
import { useRouter } from 'next/navigation';

function Appointment(req: {Notes:string , apid:number, pid: number , name:string , image : string ,date : string , status: string}){
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
    const handelAddSurgery = ()=>{
        setDisplay(true);
    }

    const handelSurgeryAvoided = ()=>{
        handelStatus('surgery avoided', req.apid);
        window.location.reload();
    } 

    const handleViewPatient = (uid: string) => {
        router.push(`/ViewUserProfile?uid=${uid}&role=patient`);
      };

    return (
        <div className="relative flex flex-row items-center gap-x-2 felx-nowrap justify-between bg-white 
        rounded-xl h-[460px] md:h-[400px]">
            {/* profile section here */}
            <div className="space-x-3 absolute top-2 left-2 flex flex-row items-center">
                <img src={req.image} alt="profile" className="w-12 h-12 rounded-full "/>
                <h1 className="text-2xl font-semibold">{req.name}</h1>
            </div>
            <div onClick={() => handleViewPatient(req.pid.toString())}
            className="absolute top-4 right-4 text-indigo-600 cursor-pointer hover:text-indigo-900 flex flex-row
            items-center">
                    <FontAwesomeIcon icon={faEye} className='text-xl'/>
                    <span className="hidden md:inline ml-2">View</span>
            </div>

            {/* date and age section here */}
            <div className='absolute top-[80px] left-3 text-lg text-black  mt-6'>
                <div className='flex flex-row items-center ml-2 space-x-2'>
                    <FontAwesomeIcon icon={faCalendar} className='text-xl'/>
                    <h1>Date:<span className='font-semibold ml-3 text-indigo-700'> {convertDateTime(req.date,3)} </span></h1>
                </div>
                <div className='flex flex-row items-center ml-2 space-x-2'>
                    <FontAwesomeIcon icon={faBaby} className='text-xl'/>
                    <h1>Status: <span className={`${statusColor} font-semibold ml-2`}>{status}</span></h1>
                </div>
               
            </div>
            {/* notes section here */}
            <div className='absolute right-[1%] md:bottom-[120px] bottom-[180px] mx-auto w-[98%] h-[90px]'>
                <div className='flex flex-row items-center ml-2 space-x-2'>
                    <FontAwesomeIcon icon={faNotesMedical} className='text-xl'/>
                    <h1 className='text-lg'>Notes:</h1>
                </div>
                <textarea className='mt-2 p-3 text-lg w-full h-full text-wrap shadow-inner focus:outline-none rounded-2xl 
                bg-gray-200 resize-none'maxLength={200} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>

            {/* require surgery button here */}
            {status === 'Pending...' &&
            <div className='w-full p-4 flex flex-row flex-wrap justify-end items-center gap-3 mt-80 md:mt-80'>
                <button onClick={() => handelNotes(notes,req.apid)} className='text-white   bg-indigo-700 rounded-lg p-2 hover:bg-indigo-600 py-2 px-3'>Update Notes</button>
                <button onClick={handelAddSurgery} className='text-white bg-red-600 rounded-lg p-2 hover:bg-red-900 py-2 px-3'>Requires surgery</button>
                <button onClick={handelSurgeryAvoided} className='text-white bg-green-600 rounded-lg p-2 hover:bg-green-900 py-2 px-3'>Surgery avoided</button>
            </div>
            }
            {display && <AddSurgery
                        id={req.pid} 
                        name={req.name}
                        image={req.image}
                        date={req.date}
                        apid={req.apid}
                    />}
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