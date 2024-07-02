import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faBed, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { Fade } from 'react-awesome-reveal';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import img1 from "../Components/Images/appointment.jpg"
import img2 from "../Components/Images/diagnosis.jpg"
import img3 from "../Components/Images/surgery.jpg"





export default function OurServices() {


    const imageUrl1 = img1.src;
    const imageUrl2 = img2.src;
    const imageUrl3 = img3.src;

    const titleRef = useRef(null);

    useEffect(() => {
        gsap.from(titleRef.current, {
            duration: 2,
            autoAlpha: 0,
            ease: 'power3.out',
        });
    }, []);

    return(
        <>
            <div className="flex flex-col items-center space-y-4 mt-10">

                <div className="p-4 flex flex-col items-center justify-center space-y-4">

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-bold text-[#14213d]">Our Services</h1>

                    {/* First Card */}
                    <div className="bg-white p-4 rounded-lg w-[90%] flex transform transition duration-500 ease-in-out hover:scale-105">
                        <div className='w-[30%] md:flex md:justify-center hidden md:visible'>
                            <img src={imageUrl1} alt="img" className='h-48' />
                        </div>
                        <div className='flex flex-col justify-center md:w-[70%] '>
                            <h1 className="text-xl md:text-3xl font-bold text-[#14213d] text-center"><FontAwesomeIcon icon={faCalendarCheck} className="mr-4"/>Appointment Booking</h1>
                            <br />
                            <p className="text-md md:text-xl text-[#14213d]">Booking an appointment at our hospital is simple and convenient. Our team is dedicated to providing you with the best possible care. Whether you need a routine check-up or specialized consultation, our easy-to-use online system ensures you get the timely attention you deserve. Our commitment is to make your experience seamless from start to finish.</p>
                        </div>
    
                    </div>

                    {/* Second Card */}
                    <div className="bg-white p-4 w-[90%] rounded-lg flex transform transition duration-500 ease-in-out hover:scale-105">
                        <div className='w-[30%] md:flex md:justify-center hidden md:visible'>
                            <img src={imageUrl2} alt="img" className='h-48' />
                        </div>
                        <div className='flex flex-col justify-center md:w-[70%]'>
                            <h1 className="text-xl md:text-3xl font-bold text-center text-[#14213d]"><FontAwesomeIcon icon={faStethoscope} className="mr-4"/>Online Diagnostic Scan</h1>
                            <br />
                            <p className="text-md md:text-xl text-[#14213d]">Our online diagnostic scan services offer you quick and accurate results. Using state-of-the-art technology, we ensure a thorough and precise diagnosis. Our team of experienced professionals is available to guide you through the process and address any concerns. Enjoy the convenience of accessing essential health information from the comfort of your home.</p>
                        </div>
                    </div>

                    {/* Third Card */}
                    <div className="bg-white p-4 w-[90%] rounded-l flex transform transition duration-500 ease-in-out hover:scale-105">
                        <div className='w-[30%] md:flex md:justify-center hidden md:visible'>
                            <img src={imageUrl3} alt="img" className='h-48' />
                        </div>
                        <div className='flex flex-col justify-center md:w-[70%]'>
                            <h1 className="text-xl md:text-3xl font-bold text-center text-[#14213d]"><FontAwesomeIcon icon={faBed} className="mr-4"/>Surgery Booking</h1>
                            <br />
                            <p className="text-md md:text-xl text-[#14213d]">Booking a surgery at our hospital is straightforward and hassle-free. Our expert surgical team is ready to provide you with the highest level of care. From initial consultation to post-operative follow-up, we prioritize your health and recovery. Trust us to deliver exceptional surgical services with compassion and expertise, ensuring your well-being at every step.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}