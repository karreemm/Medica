"use client";

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import '../Components/Components.css';

interface User {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  profileimage: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  github?: string;
  role: string
  date: string
}

export default function UserCard({ userId, role }: { userId: string; role: string | null }) {

  const [user, setUser] = useState<User >(Object);

  console.log("User Info ID:", userId);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let url = "";
        if (role === "doctor") {
          url = `http://localhost:5221/api/Doctor/Doctor?did=${userId}`;
        } else if (role === "patient") {
          url = `http://localhost:5221/GetPatient?uid=${userId}`;
        } else if (role === "nurse") {
          url = `http://localhost:5221/api/Nurse/GetNurse?uid=${userId}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        if (isNaN(Date.parse(data.date))) {
          console.error('Invalid date format:', data.date);
        } else {
          const date = new Date(data.date);
          const day = date.getDate();
          const month = date.toLocaleString('default', { month: 'short' });
          const year = date.getFullYear();
          data.date = `${day} ${month} ${year}`;
          console.log("Formatted User Date:", data.date);
        }
        setUser(data);
        console.log("User Data:", data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [userId, role]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="relative flex flex-col rounded-lg w-[380px]">
        <div className="h-[130px] bg-gradient-to-r from-sky-900 to-indigo-900 w-full rounded-t-lg"></div>
        <div className="h-[250px] bg-white w-full rounded-b-lg flex flex-col items-center">
          <div className="mt-16 flex flex-col items-center">
            <p className="text-2xl text-slate-800 font-bold text-center">
              {user.firstname} {user.lastname}
            </p>
            <p className="text-md text-slate-800 font-bold text-center mt-2">
              {user.role}
            </p>
            <hr className="w-[280px] border-indigo-900 border-2 mt-4 mb-2" />
            <div className="flex flex-col items-start w-[320px] mt-4">
              <p>
                <FontAwesomeIcon icon={faCalendar} className="text-slate-700 h-[16px] inline mr-1" />
                <span className="text-sm text-center text-slate-700 font-bold"> Joined on :</span>
                <span className="text-slate-700 inline text-center text-sm font-normal"> {user.date}</span>
              </p>
            </div>
          </div>
        </div>
        <img
          src={user.profileimage}
          alt="Doctor"
          className="absolute top-[40px] left-[30%] transform -translate-x-50% w-[150px] h-[150px] rounded-full border-4 border-white bg-white"
        />
      </div>
    </>
  );
}
