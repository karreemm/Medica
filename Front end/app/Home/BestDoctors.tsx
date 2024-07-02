import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import image1 from './Images/doct1.jpg';
import image2 from './Images/doct2.jpg';
import image3 from './Images/doct3.jpg';
import image4 from './Images/doct4.jpg';
import image5 from './Images/doct5.jpg';
import image6 from './Images/doct6.jpg';
import image7 from './Images/doct7.jpg';
import image8 from './Images/doct8.jpg';

import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function BestDoctors() {


    const [currentIndex, setCurrentIndex] = useState(0);
    const [doctorsPerPage, setDoctorsPerPage] = useState(window.innerWidth < 768 ? 1 : 4);

    const image1url = image1.src;
    const image2url = image2.src;
    const image3url = image3.src;
    const image4url = image4.src;
    const image5url = image5.src;
    const image6url = image6.src;
    const image7url = image7.src;
    const image8url = image8.src;


    const surgeryDepartment = {
        doctor1: {
            name: "Dr. Ahmed Hassan",
            position: "Chief Surgeon",
            image: image1url
        },
        doctor2: {
            name: "Dr. Ibrahim El-Sayed",
            position: "Neurosurgeon",
            image: image2url
        },
        doctor3: {
            name: "Dr. Youssef Ahmed",
            position: "Pediatric Surgeon",
            image: image3url
        },
        doctor4: {
            name: "Dr. Hala Hassan",
            position: "Vascular Surgeon",
            image: image4url
        },
        doctor5: {
            name: "Dr. Rana Khaled",
            position: "Cardiothoracic Surgeon",
            image: image5url
        },
        doctor6: {
            name: "Dr. Omar Nabil",
            position: "Orthopedic Surgeon",
            image: image6url
        },
        doctor7: {
            name: "Dr. Layla Mahmoud",
            position: "General Surgeon",
            image: image7url
        },
        doctor8: {
            name: "Dr. Fatima Saeed",
            position: "Plastic Surgeon",
            image: image8url
        }
    };
    
      const doctorsArray = Object.values(surgeryDepartment);

      const next = () => {
        setCurrentIndex((prevIndex) => {
            const maxIndex = doctorsArray.length - 1;
            if (prevIndex < maxIndex && doctorsArray[prevIndex + 1] != null) {
                return prevIndex + 1;
            } else {
                return prevIndex;
            }
        });
    };
    
    const back = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0)); 
    };

    useEffect(() => {
        const handleResize = () => {
            setDoctorsPerPage(window.innerWidth < 768 ? 1 : 4);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <><div className='flex flex-col space-y-4'>
            <h1 className="text-4xl md:text-6xl font-bold text-[#14213d] text-center">Best Doctors</h1>
            <div className="flex justify-center w-full bg-white">
                <div>
                    <button onClick={back} className="h-full hover:text-slate-800 text-slate-950 font-bold flex items-center ">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                </div>
                <div className="w-[90%] bg-white flex flex-col items-center md:items-baseline md:flex-row md:space-x-6 space-y-3 md:pt-5 pt-8 pb-8 pr-5 pl-5 ">
                    {doctorsArray.slice(currentIndex, currentIndex + doctorsPerPage).map((doctor, index) => (
                        <div key={index} className="md:w-[25%] w-[90%] shadow-lg bg-white rounded-lg h-80 flex flex-col transform transition duration-500 ease-in-out hover:scale-105">
                            <div className="w-full h-3/4">
                                <img src={doctor.image} alt="" style={{ height: '100%', objectFit: 'cover' }} className="w-full h-full rounded-t-lg" />
                            </div>
                            <div className="w-full h-1/2 flex flex-col justify-center items-center">
                                <h1 className="text-xl font-semibold mt-2">{doctor.name}</h1>
                                <p className="text-sm text-gray-500">{doctor.position}</p>
                                <div className='flex justify-center space-x-2 mt-2'>
                                    <Link href="#"><FontAwesomeIcon icon={faFacebook} className="mr-2 text-slate-950 hover:text-slate-800" size="lg" /></Link>
                                    <Link href="#"><FontAwesomeIcon icon={faInstagram} className="mr-2 text-slate-950 hover:text-slate-800" size="lg" /></Link>
                                    <Link href="#"><FontAwesomeIcon icon={faTwitter} className="mr-2 text-slate-950 hover:text-slate-800" size="lg" /></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <button onClick={next} className="h-full hover:text-slate-800 text-slate-950 font-bold flex items-center ">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </div>
        </div>
            
        </>
    );
}