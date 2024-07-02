"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';
import GetAllSurgeries from './AllSurgeries';
import Surgery from './Surgery';
export function Surgeries() {

    const user = localStorage.getItem('User') as string;
    const userObj= JSON.parse(user);
    const [requestElements, setRequestElements] = useState<JSX.Element[]>([]);
    useEffect(() => {
        GetAllSurgeries(userObj.uid)    
    .then(async res => {
        if(res.status === 200){
            const ap = await res.json();
            setRequestElements(ap.map((app: any, index: number) => (
                <Surgery
                    key={index}
                    id={app.did}
                    surgeryName={app.name}
                    name={app.docFirstName +" "+ app.docLastName}
                    image={app.docProfileImage}
                    room={app.opRoom}
                    cost={app.cost}
                    duration={app.duration}
                    date={new Date(app.sdate)}
                    Sid = {app.sid}
                />
            )));
        }
        else {

        }
    })
    }, []);
    
    
        // <Surgery
        //     key={index}
        //     id={index}
        //     surgeryName="Surgery Name"
        //     name={userObj.firstname}
        //     image={userObj.profileimage}
        //     room="Room"
        //     cost={0}
        //     duration={0}
        //     date={new Date()}
        // />
    

    return (
        <>
        
            <div className="h-full shadow-lg rounded-2xl px-6 py-4 bg-gradient-to-r from-sky-900 to-indigo-900
                            w-full">
                <div className="mb-5 flex flex-row items-center gap-x-2 felx-nowrap">
                    <FontAwesomeIcon icon={faPaperPlane} className="text-2xl text-[#fdf0d5]" /> 
                    <h1 className="ml-2 pacifico-font text-2xl text-[#fdf0d5]">Surgeries</h1>
                </div>
                <div className="h-[90%] overflow-y-scroll no-scrollbar space-y-5">
                    {requestElements}
                </div>
            </div>
        </>
    );
}

