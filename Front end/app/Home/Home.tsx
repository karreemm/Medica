import image from '../Components/Images/doctor2.jpg';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HashLink as Link2 } from 'react-router-hash-link';



export default function Home() {
    const imageUrl = image.src;
    const [role, setRole] = useState('' as string);
    const user = localStorage.getItem("User") as string;
    const userObj = JSON.parse(user);

    useEffect(() => {
        if (userObj) {
            setRole(userObj.role);
        }
    }, [userObj]);

    return (
        <>
        {/* Appear at Desktop */}
       <div className="h-full bg-cover bg-right md:h-[650px] md:bg-top " style={{backgroundImage: `url(${imageUrl})`}}>
            <div className='invisible md:visible flex flex-col justify-center h-[80%] pl-8 pt-6'>
                <h1 className="text-6xl pl-24 font-bold text-[#023047]">We Take Care <br /> Because We Care</h1>
                <br />
                <p className="text-2xl pl-24 text-slate-800">We are here to provide you with the best care possible.</p>
                <br />
                <br />
                <div className="flex pl-24 space-x-6">
                { !role  &&  
                    <Link href="/SignupPage" className="bg-[#023047] text-white py-2 px-4 rounded-full text-xl hover:bg-[#02547D]">
                        Join Us
                    </Link>}
                   
                    <Link href="/About#FeedbackForm" className="bg-[#023047] text-white py-2 px-4 rounded-full ml-xl text-xl hover:bg-[#02547D]">
                        Contact us
                    </Link>
                </div> 
            </div>
        </div>

        {/* Appear at Phones */}
        <div className='md:hidden flex flex-col items-center space-y-4'>
            <h1 className="text-4xl font-bold text-[#023047] text-center">We Take Care <br /> Because We Care</h1>
            <p className="text-xl text-slate-800 w-[70%] text-center">We are here to provide you with the best care possible.</p>
            <div className="flex flex-col space-y-4 items-center">
                <Link href="/SignupPage" className="bg-[#023047] text-white py-2 px-4 rounded-full text-xl hover:bg-[#02547D]">
                    Join Us
                </Link>
                <Link href="/About#FeedbackForm" className="bg-[#023047] text-white py-2 px-4 rounded-full ml-xl text-xl hover:bg-[#02547D]">
                    Contact us
                </Link>

            </div> 
        </div>
        </>
    );
}