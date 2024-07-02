"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useState } from 'react';
import HandleLogin from './HandleLogin';



export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);


    const formData = {
      "password": password,
      "email": email  
    };

    // Check if email is valid
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email');
      return;
    }

     // Check if password is empty
      if (password === '') {
        setErrorMessage('Please enter a password');
        return;
      }

    HandleLogin(formData)
   .then(async res => {
      if(res.status === 200)
      {
        const data = await res.json();
        const UserObj = JSON.stringify(data);

        localStorage.setItem('User', UserObj);
        
        router.push('/UserProfile');

      }
      else
      {
        setErrorMessage(await res.text());
      }
   })
   .catch(error => {
      console.log("Error: ", error);
      setErrorMessage("An error occurred. Please try again.");
      router.refresh();
   });
  };

  return (
    <>
    <div className=" flex justify-center items-center flex-col ">
      <form className="bg-gradient-to-r from-sky-900 to-indigo-900 p-8 rounded-lg shadow-lg w-[400px]" onSubmit={handleSubmit} >

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-[#fdf0d5] ">
          Welcome Back!
        </h1>
      
          {/* Email */} 
       <div className="mt-8">
          <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-sm font-medium text-[#fdf0d5]">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            name="email"
            type="email"
            className="peer ... w-full p-2 border border-[#fdf0d5] focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg invalid:text-rose-400
            focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1"
            placeholder="example@gmail.com"
          />
          {email && (
            <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
              Please provide a valid email.
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mt-8 relative">
          <label
            htmlFor="password-login"
            className="block after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-[#fdf0d5]"
          >
            Password
          </label>
          <div className="flex items-center">
            <input
              required
              value={password} 
              onChange={(e) => setPassword(e.target.value)}       
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1 pr-10"
            />
            <button type="button" onClick={togglePasswordVisibility} className="absolute right-2 ">
              <FontAwesomeIcon className='text-indigo-900' icon={isPasswordVisible ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        {submitAttempted && errorMessage && <p className="mt-2 text-rose-400 text-sm">{errorMessage}</p>}
        <div className="mt-8">
          <button className="w-full bg-[#fdf0d5] font-bold text-black p-2 rounded-full  hover:bg-[#f2d7bc] flex items-center justify-center">
            Log In
            <FontAwesomeIcon icon={faRightToBracket} style={{color: "#000000"}} className="ml-2" />
          </button>
        </div>
      </form>
    </div>
    </>
  );
}
