import React from 'react';
import img from "./Images/about.jpg"

const imageUrl = img.src;

export default function About() {
    return (
        <>
        <div>
            <div className="h-96 bg-cover bg-right md:h-96 md:bg-bottom " style={{backgroundImage: `url(${imageUrl})`}}>
            <div className='md:visible flex flex-col items-start md:items-baseline md:justify-center mt-4 md:mt-0  h-[80%] pl-8 pt-6 space-y-3 md:space-y-10'>
                <h1 className="text-2xl md:text-6xl md:pl-24 pl-2 font-bold text-[#023047]">We Are Your Partner<br /> In Health & Wellness</h1>
                <p className="text-lg md:text-2xl md:pl-24 pl-2 text-slate-800">We're dedicated to your best care, prioritizing your health.</p>
            </div>
        </div>
        </div>
        </>
    );
}