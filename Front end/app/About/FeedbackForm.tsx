import { Fade } from 'react-awesome-reveal';
import img from "../Components/Images/feedback.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


export function FeedbackForm() {

    const imageUrl = img.src;
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');


    return (
        <>
        <div className='flex justify-center w-full mt-8'>
            <div className="bg-white p-4 w-[90%] rounded-l flex justify-center md:flex transform transition duration-500 ease-in-out hover:scale-105">
                            <div className='w-[40%] md:flex md:justify-center md:items-center hidden md:visible'>
                                <img src={imageUrl} alt="img" className='h-64' />
                            </div>
                            <div className='flex flex-col justify-center md:w-[60%]'>
                                <h1 className="text-xl md:text-3xl font-bold text-center text-[#14213d]"><FontAwesomeIcon icon={faMessage} className="mr-4"/>We Value Your Feedback</h1>
                                <br />
                                <div className=" flex flex-col ">
                                    <form className="bg-white p-8 rounded-lg shadow-lg" >
                                        
                                        {/* Email */} 
                                    <div className="mt-2">
                                        <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-lg font-medium text-[#14213d]">
                                            Email
                                        </label>
                                        <input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            name="email"
                                            type="email"
                                            className="peer ... w-full p-2 border border-gray-300 focus:border-[#14213d] focus:outline-[#14213d] focus:ring-0 rounded-lg invalid:text-rose-400
                                            focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1"
                                            placeholder="example@gmail.com"
                                        />
                                        {email && (
                                            <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
                                            Please provide a valid email.
                                            </p>
                                        )}
                                        </div>

                                        {/* Name */}
                                        <div className="mt-4">
                                        <label
                                            htmlFor="password"
                                            className="block after:content-['*'] after:ml-0.5 after:text-red-500  text-lg font-medium text-[#14213d]"
                                        >
                                             Name
                                        </label>
                                        <input
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            name="first_name"
                                            type="text"
                                            id="name"
                                            className="w-full p-2 border border-gray-300 focous:border-[#14213d] focus:outline-[#14213d] focus:ring-0 rounded-lg mt-1"
                                        />
                                        </div>

                                        {/* Description */}
                                        <div className="mt-4">
                                            <label
                                                htmlFor="password"
                                                className="block after:content-['*'] after:ml-0.5 after:text-red-500  text-lg font-medium text-[#14213d]"
                                            >
                                                Tell us how we can improve
                                            </label>
                                            <textarea
                                                required
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                name="first_name"
                                                id="name"
                                                className="w-full h-20 p-2 border border-gray-300 focus:border-[#14213d] focus:outline-[#14213d] focus:ring-0 rounded-lg mt-1"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        {submitAttempted && errorMessage && <p className="mt-2 text-rose-400 text-sm">{errorMessage}</p>}
                                        <div className="mt-8 flex justify-center">
                                        <button className="w-[50%] bg-[#14213d] font-bold text-white p-2 rounded-full  hover:bg-[#27496d] flex items-center justify-center">
                                            Submit
                                            
                                        </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
            </div>
        </div>
        </>
    )
}