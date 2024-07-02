"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSearch } from '@fortawesome/free-solid-svg-icons';
import Doctor from './Doctors';
import { useEffect, useState } from 'react';
import GetAllDoctors from './GetAllDoctors';
import Appointment from './Appointment';


interface Doctor {
  uid: number;
  firstname: string;
  lastname: string;
  password: string;
  address: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  profileimage: string;
  twitter: string;
  facebook: string;
  insta: string;
  role: string;
  date: string;
  gender: string;
  bdate: string;
}
function Booking() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(()=>{
    GetAllDoctors().then(async res => {
        if(res.status === 200){
            const docs = await res.json();
            // console.log("here");
            // console.log(docs);
            setDoctors(docs);
        }
        else {
            console.log("Error");
        }
    })
},[])
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDoctors, setFilteredDoctors] =  useState<Doctor[]>([]);
    useEffect(() => {
        setFilteredDoctors(doctors);
    }, [doctors]);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      if (e.target.value !== "") {
        const filtered = doctors.filter((doctor) =>
          (
            doctor.firstname.toLowerCase() +
            " " +
            doctor.lastname.toLowerCase()
          ).includes(e.target.value.toLowerCase())
        );
        setFilteredDoctors(filtered);
      } else {
        setFilteredDoctors(doctors);
      }
    };
    const user = localStorage.getItem('User') as string;
    const userObj= JSON.parse(user);
    console.log(filteredDoctors)
    const requestElements = filteredDoctors.map((doc, index) => (
        <Doctor
            key={index}
            pid = {userObj.uid}
            id={doc.uid}
            name={doc.firstname + " " + doc.lastname}
            image={doc.profileimage}
            date={doc.date}
        />
    ));



    return (
        <>
            <div className="h-full shadow-lg rounded-2xl px-6 py-4 bg-gradient-to-r from-sky-900 to-indigo-900
                            w-full">
                <div className="mb-5 flex flex-row items-center gap-x-2 felx-nowrap">
                    <FontAwesomeIcon icon={faPaperPlane} className="text-2xl text-[#fdf0d5]" /> 
                    <h1 className="ml-2 pacifico-font text-2xl text-[#fdf0d5]">Booking</h1>
                </div>
                {/* search bar */}
                <div className="w-full">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="relative m-0 block bg-white flex-auto rounded border border-solid border-neutral-300 px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none"
                            placeholder="Search for Doctors ..."
                            aria-label="Search"
                            aria-describedby="button-addon2" />

                        {/* <!--Search icon--> */}
                        <button
                            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-white"
                            id="basic-addon2"
                            >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
                <div className="h-[80%] overflow-y-scroll no-scrollbar space-y-5"> 
                    {requestElements.length == 0 ? <h1 className="text-[#fdf0d5] text-2xl text-center">No Doctors Found</h1> : requestElements}
                </div>
            </div>
        </>
    );
}

export default Booking;
