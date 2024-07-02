'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import State from "../Components/State";
import HandleSignup from "./HandleSignup";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState('https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [github, setGithub] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

 
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
        setImage(reader.result as string);
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        setImage('https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80');
    }
};

const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setConfirmPassword(e.target.value);

  if (e.target.value !== password) {
    setErrorMessage('Passwords do not match');
  } else {
    setErrorMessage('');
  }
};

const handleSubmit =  (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setSubmitAttempted(true);

  const formData = {
    "uid": 0,
    "firstname": firstName,
    "lastname": lastName ,
    "password": password,
    "address": address,
    "email": email,
    "phone": phone,
    "github": github,
    "linkedin": linkedin,
    "twitter": twitter,
    "facebook": facebook,
    "insta": instagram,
    "profileimage" : image
  };


  
  // Check if first name is empty
  if (firstName === '') {
    setErrorMessage('Please enter a first name');
    return;
  }

  // Check if last name is empty
  if (lastName === '') {
    setErrorMessage('Please enter a last name');
    return;
  }


  // Check if email is valid
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailRegex.test(email)) {
    setErrorMessage('Please enter a valid email');
    return;
  }

  // Check if phone number is valid
  const phoneRegex = /^[0-9]*$/;
  if (!phoneRegex.test(phone)) {
    setErrorMessage('Please enter a valid phone number');
    return;
  }

  // Check if address is empty
  if (address === '') {
    setErrorMessage('Please enter an address');
    return;
  }

  // Check if password is empty
  if (password === '') {
    setErrorMessage('Please enter a password');
    return;
  }

  // Check if confirm password is empty
  if (confirmPassword === '') {
    setErrorMessage('Please confirm your password');
    return;
  }

  // Check if password and confirm password match
  if (password !== confirmPassword) {
    setErrorMessage('Passwords do not match');
    return;
  }

  // // Check if Facebook link is valid
  // const facebookRegex = /^https?:\/\/www\.facebook\.com\/.+$/;
  // if (facebook !== '' && !facebookRegex.test(facebook)) {
  //   setErrorMessage('Please provide a valid Facebook link');
  //   return;
  // }

  // // Check if Instagram link is valid
  // const instagramRegex = /^https?:\/\/www\.instagram\.com\/.+$/;
  // if (instagram !== '' && !instagramRegex.test(instagram)) {
  //   setErrorMessage('Please provide a valid Instagram link');
  //   return;
  // }

  // // Check if LinkedIn link is valid
  // const linkedinRegex = /^https?:\/\/www\.linkedin\.com\/in\/.+$/;
  // if (linkedin !== '' && !linkedinRegex.test(linkedin)) {
  //   setErrorMessage('Please provide a valid LinkedIn link');
  //   return;
  // }

  // // Check if Twitter link is valid
  // const twitterRegex = /^https?:\/\/twitter\.com\/.+$/;
  // if (twitter !== '' && !twitterRegex.test(twitter)) {
  //   setErrorMessage('Please provide a valid Twitter link');
  //   return;
  // }

  // // Check if GitHub link is valid
  // const githubRegex = /^https?:\/\/github\.com\/.+$/;
  // if (github !== '' && !githubRegex.test(github)) {
  //   setErrorMessage('Please provide a valid GitHub link');
  //   return;
  // }
 

  // If all checks pass, route to login page

  HandleSignup(formData)
   .then(async res => {
      if(res.status === 200)
      {

        router.push('/LoginPage');
      }
      else
      {
        const state  =await res.text();
        if(parseInt(state,10) == State.InvalidInput){
          setErrorMessage('already exist email');
        }
        router.refresh();
      }
   })
   .catch(error => {
      console.log("Error: ", error);
      router.refresh();
   });
};

  return (
    <div className=" flex justify-center items-center ">
      <form className="bg-gradient-to-r from-sky-900 to-indigo-900 p-8 rounded-lg shadow-lg w-[400px]" onSubmit={handleSubmit} >
        
        {/* Titele */}
        <h1 className="text-2xl font-bold text-center text-[#fdf0d5] ">
          Sign Up
        </h1>

        {/* First Name */}
        <div className="mt-4">
          <label
            htmlFor="password"
            className="block after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-[#fdf0d5]"
          >
            First Name
          </label>
          <input
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            name="first_name"
            type="text"
            id="password"
            className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1"
          />
        </div>

        {/* Last Name */}
        <div className="mt-8">
          <label
            htmlFor="password"
            className="block after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-[#fdf0d5]"
          >
            Last Name
          </label>
          <input
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            name="last_name"
            type="text"
            id="password"
            className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1"
          />
        </div>

        {/* Email */}
        <div className="mt-8">
          <label className="block after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-[#fdf0d5]">
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

        {/* Phone */}
        <div className="mt-4">
          <label className="block after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-[#fdf0d5]">
            Phone Number
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            name="phone"
            type="tel"
            className="peer ... w-full p-2 border border-[#fdf0d5] focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg invalid:text-rose-400
            focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1
                "
            placeholder="01234567899"
          />
          {phone && (
            <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
              Please provide a valid phone number.
            </p>
          )}
        </div>

        {/* Address */}
        <div className="mt-4">
          <label
            htmlFor="password"
            className="block after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-[#fdf0d5]"
          >
            Address
          </label>
          <input
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            name="address"
            type="text"
            id="password"
            className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1"
          />
        </div>

        {/* Password */}
        <div className="mt-8 relative">
          <label
            htmlFor="password"
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
            <button type="button" onClick={togglePasswordVisibility} className="absolute right-2">
              <FontAwesomeIcon className='text-indigo-900' icon={isPasswordVisible ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mt-8 relative">
          <label
            htmlFor="confirm_password"
            className="block after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-[#fdf0d5]"
          >
            Confirm Password
          </label>
          <div className="flex items-center">
            <input
              required
              value={confirmPassword} 
              onChange={handleConfirmPasswordChange} 
              name="confirm_password"
              type={isConfirmPasswordVisible ? "text" : "password"}
              id="confirm_password"
              className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1 pr-10"
            />
            <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-2">
              <FontAwesomeIcon className='text-indigo-900' icon={isConfirmPasswordVisible ? faEyeSlash : faEye} />
            </button>
          </div>
          {errorMessage && (
              <p className="mt-2 text-rose-400 text-sm">Password does not match</p>
          )}
        </div>

        {/* Optional */}
        <h1 className="text-2xl font-bold text-center text-[#fdf0d5] mt-8 ">
          Additional Information
        </h1>

        {/* Facebook Account */}
        <div className="mt-8">
          <label className="  block text-sm font-medium text-[#fdf0d5]">
          <FontAwesomeIcon icon={faFacebook} style={{color: "#fdf0d5"}} className=" text-md mr-2" />
            Facebook 
          </label>
          <input
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            name="facebook"
            type="text"
            className="peer ... w-full p-2 border border-gray-300 focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg invalid:border-pink-500 invalid:text-rose-400
            focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1
                "
            placeholder="https://www.facebook.com/username"
          />
          <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
            Please provide a valid Facebook link.
          </p>
        </div>

        {/* Instagram Account */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-[#fdf0d5]">
          <FontAwesomeIcon icon={faInstagram} style={{color: "#fdf0d5"}} className=" text-md mr-2" />
            Instagram 
          </label>
          <input
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            name="instagram"
            type="text"
            className="peer ... w-full p-2 border border-gray-300 focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg  invalid:border-pink-500 invalid:text-rose-400
            focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1
                "
            placeholder="https://www.instagram.com/username"
          />
          <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
            Please provide a valid Instagram link.
          </p>
        </div>

        {/* LinkedIn Account */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-[#fdf0d5]">
          <FontAwesomeIcon icon={faLinkedin} style={{color: "#fdf0d5"}} className=" text-md mr-2" />
            LinkedIn 
          </label>
          <input
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            name="linkedin"
            type="text"
            className="peer ... w-full p-2 border border-gray-300 focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg  invalid:border-pink-500 invalid:text-rose-400
            focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1"
            placeholder="https://www.linkedin.com/in/username"
          />
          <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
            Please provide a valid LinkedIn link.
          </p>
        </div>

        {/* Twitter Account */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-[#fdf0d5]">
          <FontAwesomeIcon icon={faTwitter} style={{color: "#fdf0d5"}} className=" text-md mr-2" />
            Twitter
          </label>
          <input
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            name="twitter"
            type="text"
            className="peer ... w-full p-2 border border-gray-300 focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg  invalid:border-pink-500 invalid:text-rose-400
            focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1
                "
            placeholder="https://twitter.com/username"
          />
          <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
            Please provide a valid Twitter link.
          </p>
        </div>

        {/* GitHub Account */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-[#fdf0d5]">
          <FontAwesomeIcon icon={faGithub} style={{color: "#fdf0d5"}} className=" text-md mr-2" />
            GitHub 
          </label>
          <input
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            name="github"
            type="text"
            className="peer ... w-full p-2 border border-gray-300 focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg  invalid:border-pink-500 invalid:text-rose-400
                focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1
                "
            placeholder="https://github.com/username"
          />
          <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
            Please provide a valid GitHub link.
          </p>
        </div>

        {/* Choose Photo */}
        <div className="mt-4 flex items-center space-x-6">
          <div className="shrink-0">
            <img
              className="h-16 w-16 object-cover rounded-full bg-white"
              src={image}
              alt="Current profile photo"
            />
          </div>
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input
                onChange={handleImageChange}
                type="file"
                className="block w-full text-sm text-[#fdf0d5]
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[#fdf0d5] file:text-black
                        hover:file:bg-[#f2d7bc]
                        "
            />
          </label>
        </div>

        {/* Submit Button */}
        {submitAttempted && errorMessage && <p className="mt-2 text-rose-400 text-sm">{errorMessage}</p>}
        <div className="mt-8">
          <button className="w-full bg-[#fdf0d5] font-bold text-black p-2 rounded-full hover:bg-[#f2d7bc] flex items-center justify-center ">
            Sign Up
            <FontAwesomeIcon icon={faUserPlus} className=" text-black text-lg ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
}
