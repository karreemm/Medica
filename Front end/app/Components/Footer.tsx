import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';


export default function Footer() {
    return (
        <div className="w-full h-48 bg-gradient-to-r from-[#003049] to-[#14213d] flex flex-col p-10 items-center space-y-4 mt-5">
        <h1 className="text-2xl font-bold text-[#fdf0d5]"> <FontAwesomeIcon icon={faStethoscope} style={{color: "#fdf0d5"}} className="mr-2" size='xl'/> Medica Healthcare</h1>
        <p className='text-md text-[#fdf0d5]'>Copyright © 2024 - All right reserved</p>
        <div className='flex justify-center space-x-4'>
            <Link href="#"><FontAwesomeIcon icon={faFacebook} className="mr-2 text-[#fdf0d5] hover:text-[#d1bd95]" size="2x" /></Link>
            <Link href="#"><FontAwesomeIcon icon={faInstagram} className="mr-2 text-[#fdf0d5] hover:text-[#d1bd95]" size="2x" /></Link>
            <Link href="#"><FontAwesomeIcon icon={faTwitter} className="mr-2 text-[#fdf0d5] hover:text-[#d1bd95]" size="2x" /></Link>
        </div>

        </div>
    )
}