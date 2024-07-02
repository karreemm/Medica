"use client";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faNotesMedical,faCalendar, faBaby} from '@fortawesome/free-solid-svg-icons';
import Datetime from 'react-datetime';
import AddRequest from './AddRequest';
import { useRouter } from 'next/navigation';


function Doctor(req: {pid:number, id: number , name:string , image : string ,date : string}){
    const [selectedDate, setSelectedDate] = useState(new Date());
    const router = useRouter();
    const handleDateChange = (date: Date | string | moment.Moment) => {
        if (date instanceof Date) {
          setSelectedDate(date);
        } else if (typeof date === 'string') {
          setSelectedDate(new Date(date));
        } else if (date && date.toDate) {
          setSelectedDate(date.toDate());
        }
      }
    const AddAppointment = () => {
        const formData = {
            "did": req.id,
            "pid": req.pid,
            "apdate": selectedDate
        };
        AddRequest(formData)
        .then(async res => {
            if(res.status === 200){
                console.log("Request Added");
            }
            else {
                console.log("Error");
            }
        })
        .then(() => {
            alert("Appointment Scheduled");
        })
    };

    const handleViewDoctor = (uid: string) => {
        router.push(`/ViewUserProfile?uid=${uid}&role=doctor`);
      };


    return (
        <div className="relative flex flex-row items-start gap-x-2 felx-nowrap  justify-between bg-white 
        rounded-xl h-[120px] max-[485px]:h-[200px]">
            {/* profile section here */}
            <div className="space-x-3 absolute top-2 left-2 flex flex-row flex-wrap items-center">
                <img src={req.image} alt="profile" className="w-12 h-12 rounded-full "/>
                <div className='flex flex-col'>
                    <h1 className="text-2xl font-semibold">{req.name}</h1>
                    <span className='text-lg text-gray-400'>Anasthasia doctor</span>
                </div>
            </div>
            <div onClick={() => handleViewDoctor(req.id.toString())}
             className="absolute top-4 right-4 text-indigo-600 cursor-pointer hover:text-indigo-900 flex flex-row
            items-center">  
                    <FontAwesomeIcon icon={faEye} className='text-xl'/>
                    <span className="hidden md:inline ml-2">View</span>
            </div>  
            <div className='mr-2 absolute top-[70px] right-[389px] max-[485px]:top-[100px] max-[485px]:right-[207px]'>
                        <div className="relative">
                          <div className="absolute bg-white rounded-lg shadow-lg flex justify-center">
                            <Datetime
                            value={selectedDate}
                            input={true}
                            onChange={handleDateChange}
                            className="flex justify-center w-full p-2 border border-gray-300 focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg"
                            />
                          </div>
                        </div>
                    </div>
            <div className='absolute right-2 bottom-2'>
                <button onClick={AddAppointment} className='w-fit h-fit p-2 rounded-lg bg-indigo-700 hover:bg-indigo-600 text-white  '>Schedule Appointment</button>
            </div>
        </div>
    );
}
export default Doctor;
