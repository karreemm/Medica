"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faCalendar, faHospital, faMoneyCheckDollar, faClock, faBed,faUserNurse } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';
import GetSurgeryNurses from './GetSurgeryNurses';
import { useRouter } from 'next/navigation';

function Request(req: {id:number,image:string,surgeryName:string, name:string, room: string, cost:number,duration:number,date:Date , Sid:number}){
    const [nurses, setNurses] = useState<any[]>([]);
    const router = useRouter();
    useEffect(() => {
        GetSurgeryNurses(req.Sid)
    .then(async res => {
        if(res.status === 200){
            const ap = await res.json();
            setNurses(ap);
        }
        else {
        }
    })
    }, []);
    const Name = req.name;
    const handleViewPatient = (uid: string) => {
      router.push(`/ViewUserProfile?uid=${uid}&role=patient`);
    };
    return (
        <>
        <div className="flex flex-wrap items-center p-4 justify-between bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            <img src={req.image} alt="Profile" className="w-12 h-12 rounded-full" />
            <h1 className="text-2xl">{req.name}</h1>
          </div>
          
          {/* View Button */}
          <div onClick={() => handleViewPatient(req.id.toString())}
          className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
            <FontAwesomeIcon icon={faEye} />
            <span className="hidden md:inline ml-2">View</span>
          </div>
          
          {/* Surgery Details */}
          <div className="mt-4 w-full flex flex-col space-y-2">
            <div className="flex items-center">
              <span className="text-black flex gap-1 items-center"><FontAwesomeIcon icon={faBed} />
              Surgery:</span>
              <p className="ml-2 font-semibold text-indigo-700">{req.surgeryName}</p>
            </div>
            <div className="flex items-center">
              <span className="text-black flex gap-1 items-center"><FontAwesomeIcon icon={faHospital} />
              Room:</span>
              <span className="ml-2 font-semibold text-indigo-700">{req.room}</span>
            </div>
            <div className="flex items-center">
              <span className="text-black flex gap-1 items-center"><FontAwesomeIcon icon={faMoneyCheckDollar} />Cost:</span>
              <span className="ml-2 font-semibold text-indigo-700">{req.cost} EGP</span>
            </div>
            <div className="flex items-center">
              <span className="text-black flex gap-1 items-center"><FontAwesomeIcon icon={faClock} />Duration:</span>
              <span className="ml-2 font-semibold text-indigo-700">{req.duration} min</span>
            </div>
            <div className="flex items-center">
              <span className="text-black flex gap-1 items-center"><FontAwesomeIcon icon={faCalendar} className='' />Date:</span>
              <span className="ml-2 font-semibold text-indigo-700">{convertDateTime(req.date.toLocaleDateString(),3)}</span>
            </div>
          
            
            {nurses.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold"><FontAwesomeIcon icon={faUserNurse} className='' />Nurses:</h2>
                {nurses.map((nurse) => (
                  <div key={nurse.uid} className="flex items-center mt-2">
                    <img src={nurse.profileimage} alt="Nurse" className="w-8 h-8 rounded-full" />
                    <span className="ml-2 font-semibold text-indigo-700">{nurse.firstname}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
      
    );
}
export default Request;
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