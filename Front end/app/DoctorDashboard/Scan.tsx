"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faNotesMedical,faCalendar, faBaby} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
function Scan(req: {id: number , name:string , image: string ,scan1?: string , scan2?: string}){
    const router = useRouter();
    const handleViewDoctor = (uid: string) => {
        router.push(`/ViewUserProfile?uid=${uid}&role=patient`);
      };
    return (
        <div className="relative flex flex-col items-center gap-x-2 felx-nowrap justify-between bg-white 
        rounded-xl h-fit">
            {/* profile section here */}
            <div className="space-x-3 absolute top-2 left-2 flex flex-row items-center">
                <img src={req.image} alt="profile" className="w-12 h-12 rounded-full "/>
                <h1 className="text-2xl font-semibold">{req.name}</h1>
            </div>
            <div onClick={() => handleViewDoctor(req.id.toString())}
             className="absolute top-4 right-4 text-indigo-600 cursor-pointer hover:text-indigo-900 flex flex-row
            items-center">  
                    <FontAwesomeIcon icon={faEye} className='text-xl'/>
                    <span className="hidden md:inline ml-2">View</span>
            </div>  
            {/* date and age section here */}
            <div className='flex flex-row justify-center gap-x-3 mt-14 py-4'>
                <div className='w-[40%] rounded-lg'>
                    <img src={req.scan1} 
                    className='w-full h-full rounded-lg bg-gray-100' alt="Image 1" />
                </div>
                <div className='w-[40%] rounded-lg'>
                    <img src={req.scan2} 
                    className='w-full h-full rounded-lg bg-gray-100' alt="Image 1" />
                </div>
            </div>
    
        </div>
    );
}
export default Scan;
function convertDateTime(dateTime: string, offset: number): string {
    const date = new Date(dateTime);
    date.setHours(date.getHours() + offset);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}