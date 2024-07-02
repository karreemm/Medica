"use client";
import { useState } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "react-datetime/css/react-datetime.css"
import 'react-datetime/css/react-datetime.css';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported
import handelAddScan from './handelAddScan';
import {useRouter} from 'next/navigation';

export function AddScan(req:{docId: number, pId: number}){
    const [image1, setImage1] = useState('https://www.bifolcomatty.co.uk/wp-content/uploads/2019/08/placeholder-square.jpg');
    const [image2, setImage2] = useState('https://www.bifolcomatty.co.uk/wp-content/uploads/2019/08/placeholder-square.jpg');
    const router = useRouter();

    const handelSubmtion = () => {
        const formData = 
        {
            "docId": req.docId,
            "pId": req.pId,
            "image":image1 ,
            "image2": image2
        }
        handelAddScan(formData)
        .then(res => {
            if(res.status === 200){
                console.log("Scan added successfully");
            }
            else {
                console.log("Scan not added");
            }
        });

        window.location.reload();
    }
    const handleImage1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            setImage1(reader.result as string);
        };
    
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImage1('https://www.bifolcomatty.co.uk/wp-content/uploads/2019/08/placeholder-square.jpg');
        }
    };
    const handleImage2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const reader = new FileReader();
    
        reader.onloadend = () => {
            setImage2(reader.result as string);
        };
    
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImage2('https://www.bifolcomatty.co.uk/wp-content/uploads/2019/08/placeholder-square.jpg');
        }
    };

    

    return (  
        <>
            <div className="fixed inset-0 bg-black z-[51] bg-opacity-30 
            backdrop-blur-sm ">
                <div className="p-6 w-[90%] max-w-[600px] h-fit mx-auto my-16 bg-gradient-to-r
                 from-sky-900 to-indigo-900 rounded-lg overflow-y-scroll no-scrollbar">
                    <div className="flex flex-row items-center gap-x-2 felx-nowrap">
                        <FontAwesomeIcon icon={faPaperPlane} className="text-2xl text-[#fdf0d5]" /> 
                        <h1 className="ml-2 pacifico-font text-2xl text-[#fdf0d5]">Add Scan</h1>
                    </div>
                    <div className='flex flex-row mb-3'>
                        <label className="block w-64 mt-6">
                            <span className="text-[#fdf0d5]">Image 1:</span>
                            <input
                            type="file"
                            onChange={handleImage1Change}
                            className="mt-2 block w-full text-sm text-[#fdf0d5]
                            file:mr-2 file:py-1 file:px-2
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-[#fdf0d5] file:text-black
                                    hover:file:bg-[#f2d7bc]
                                    "
                            />
                        </label>
                        <label className="block w-64 mt-6">
                            <span className="text-[#fdf0d5]">Image 2:</span>
                            <input
                            type="file"
                            onChange={handleImage2Change}
                            className="mt-2 block w-full text-sm text-[#fdf0d5]
                            file:mr-2 file:py-1 file:px-2
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-[#fdf0d5] file:text-black
                                    hover:file:bg-[#f2d7bc]
                                    "
                                    />
                        </label>
                    </div>
                    <div className="relative flex flex-col items-center gap-x-2 felx-nowrap justify-between bg-white 
                        rounded-xl h-fit">
                        {/* date and age section here */}
                        <div className='flex flex-row justify-center gap-x-3 my-6'>
                            <img src={image1} 
                            className='w-[45%] rounded-lg ' alt="Image 1" />
                            <img src={image2}
                            className='w-[45%] rounded-lg ' alt="Image 2" />
                        </div>
                    </div>
                    <div className='flex flex-row space-x-4'>
                        <button  onClick={handelSubmtion} className='mt-4 w-32 h-8 bg-[#fdf0d5] hover:bg-[#f2d7bc] rounded-lg'>Send</button>
                        <a onClick={() => window.location.reload()} className='flex  justify-center hover:bg-[#f2d7bc] items-center cursor-pointer mt-4 w-32 h-8 bg-[#fdf0d5] rounded-lg'>close</a>
                    </div>
                </div>
            </div>
        </>
    )
}