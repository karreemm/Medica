"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicroscope } from '@fortawesome/free-solid-svg-icons';
import Scan from "./Scan";
import { useEffect, useState } from 'react';
import GetAllScans from './getAllScans';
function Scans() {

    const user = localStorage.getItem('User') as string;
    const userObj= JSON.parse(user);
    const [requestElements, setRequestElements] = useState();
    useEffect(() => {
        GetAllScans(userObj.uid)
        .then(async res => {
            if(res.status === 200){
                console.log("Scans fetched successfully");
                const data = await res.json();
                console.log(data);
                setRequestElements(data.map((scan: any) => (
                    <Scan
                        key={scan.docId}
                        id={scan.docId} 
                        name={scan.docFirstName +" "+ scan.docLastName}
                        image={scan.docprofileimage}
                        date={scan.date}
                        scan1={scan.image}
                        scan2={scan.image2}
                    />
                )));
            }
            else {
                console.log("Scans not fetched");
            }
        })
    }, []);

    return (
        <>
        
            <div className="h-full shadow-lg rounded-2xl px-6 py-4 bg-gradient-to-r from-sky-900 to-indigo-900
                            w-full">
                <div className="mb-5 flex flex-row items-center gap-x-2 felx-nowrap">
                    <FontAwesomeIcon icon={faMicroscope} className="text-2xl text-[#fdf0d5]" /> 
                    <h1 className="ml-2 pacifico-font text-2xl text-[#fdf0d5]">Scans</h1>
                </div>
                <div className="h-[90%] overflow-y-scroll no-scrollbar space-y-5">
                    {requestElements}
                </div>
            </div>
        </>
    );
}

export default Scans;