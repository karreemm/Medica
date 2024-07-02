'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import '../Components/Components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import HandleEditProfile from "./HandleEditProfile";



export default function Editprofile() {

    // User Data
    const user = localStorage.getItem("User") as string;
    const userObj = JSON.parse(user);


    const [firstname, setFirst_name] = useState(userObj.firstname);
    const [lastname, setLast_name] = useState(userObj.lastname);
    const [email, setEmail] = useState( userObj.email);
    const [phone, setPhone] = useState( userObj.phone);
    const [password, setPassword] = useState( userObj.password);
    const [confirmpassword, setConfirmPassword] = useState( userObj.password);
    const [address, setAddress] = useState( userObj.address);
    const [image, setImage] = useState(userObj.profileimage);
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const [github, setGithub] = useState(userObj.github);
    const [facebook, setFacebook] = useState(userObj.facebook);
    const [instagram, setInstagram] = useState( userObj.insta);
    const [linkedin, setLinkedin] = useState(userObj.linkedin);
    const [twitter, setTwitter] = useState(userObj.twitter);

    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);


    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };


    const handleSubmit =  (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitAttempted(true);
      
        const formData = {
          "uid": userObj.uid,
          "firstname": firstname,
          "lastname": lastname ,
          "password": password,
          "address": address,
          "email": email,
          "phone": phone,
          "github":github ,
          "linkedin": linkedin,
          "profileimage":image,
          "role" : userObj.role,
          "date" : userObj.date,
          "facebook": facebook,
          "insta" : instagram,
          "twitter" : twitter,
        };
      
      
        
        // Check if first name is empty
        if (firstname === '') {
          setErrorMessage('Please enter a first name');
          return;
        }
      
        // Check if last name is empty
        if (lastname === '') {
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
        if (confirmpassword === '') {
          setErrorMessage('Please confirm your password');
          return;
        }
      
        // Check if password and confirm password match
        if (password !== confirmpassword) {
          setErrorMessage('Passwords do not match');
          return;
        }
      
        // If all checks pass, route to login page
      
        HandleEditProfile(formData)
         .then(async res => {
            if(res.status === 200)
            {
                console.log(await res.json());
                localStorage.setItem('User', JSON.stringify(formData));
                router.push('/UserProfile');
            }
            else
            {
                setErrorMessage(await res.text());
                console.log("Error: ",await res.text());
            }
         })
         .catch(error => {
            console.log("Error: ", error);
            setErrorMessage("An error occurred. Please try again.");
            router.refresh();
         });
      };


    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
      
        if (e.target.value !== password) {
          setErrorMessage('Passwords do not match');
        } else {
          setErrorMessage('');
        }
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

    return(
        <>
        <div className="bg-[#669bbc] flex items-center flex-col p-24 min-h-screen w-[100%]">
            <form className="bg-[#669bbc] p-8 w-[90%] flex items-center flex-col space-y-12 sm:space-y-20" onSubmit={handleSubmit}>  

                {/* Photo Part          */}
                <div className="bg-gradient-to-r from-sky-900 to-indigo-900 bg-opacity-2 p-8 rounded-lg shadow-lg w-[380px] sm:w-[100%] flex flex-col items-center">
                    <h2 className="text-left w-full text-[#f2d7bc] text-2xl pacifico-font"> Profile Image</h2>
                    <div className="w-64 h-64 mt-6">
                        <img src={image} alt="Profile" className="w-full h-full object-cover rounded-full bg-white" />
                    </div>
                    <label className="block w-64 mt-6">
                        <span className="sr-only">Choose profile photo</span>
                        <input
                        type="file"
                        onChange={handleImageChange}
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

                {/* Pesonal Info */}
                <div className="bg-gradient-to-r from-sky-900 to-indigo-900 bg-opacity-2 p-8 rounded-lg shadow-lg w-[380px] md:w-[100%] flex flex-col items-center">
                    <h2 className="text-left w-full text-[#f2d7bc] text-2xl pacifico-font"> Personal Information</h2>

                    {/* First Row */}
                    <div className="flex flex-col md:flex-row justify-between w-full mt-6">

                        {/* First Name */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label
                                htmlFor="password"
                                className=" block text-md font-medium text-[#fdf0d5]"
                            >
                                First Name
                            </label>
                            <input
                                value={firstname}
                                onChange={(e) => setFirst_name(e.target.value)}
                                name="first_name"
                                type="text"
                                id="first_name"
                                className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1"
                                placeholder={userObj.firstname}
                            />
                        </div>

                        {/* Last Name */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label
                                htmlFor="password"
                                className=" block text-md font-medium text-[#fdf0d5]"
                            >
                                Last Name
                            </label>
                            <input
                                value={lastname}
                                onChange={(e) => setLast_name(e.target.value)}
                                name="last_name"
                                type="text"
                                id="last_name"
                                className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1"
                                placeholder={userObj.lastname}
                            />

                         </div>
                    </div>

                    {/* Second Row */}
                    <div className="flex flex-col md:flex-row justify-between w-full mt-6">

                        {/* Address */}
                        <div className="mt-4 w-full md:w-[40%]">
                                <label
                                    htmlFor="password"
                                    className=" block text-md font-medium text-[#fdf0d5]"
                                >
                                    Address
                                </label>
                                <input
                                    
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    name="address"
                                    type="text"
                                    id="password"
                                    className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1"
                                    placeholder={userObj.address}
                                />
                        </div>

                        {/* Phone */}
                        <div className="mt-4 w-full md:w-[40%]">
                                <label className=" block text-md font-medium text-[#fdf0d5]">
                                    Phone Number
                                </label>
                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    name="phone"
                                    type="tel"
                                    className="peer ... w-full p-2 border border-[#fdf0d5] focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg invalid:text-rose-400
                                    focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1
                                        "
                                    placeholder={userObj.phone}
                                />
                                {phone && (
                                    <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
                                    Please provide a valid phone number.
                                    </p>
                                )}
                        </div> 
                    </div>

                    {/* Third Row */}
                    <div className="flex flex-col md:flex-row justify-between w-full mt-6">

                       {/* Password */}
                        <div className="mt-4 w-full md:w-[40%] relative">
                        <label
                            htmlFor="password"
                            className="block text-md font-medium text-[#fdf0d5]"
                        >
                            New Password
                        </label>
                        <div className="flex items-center">
                            <input
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
                        <div className="mt-4 w-full md:w-[40%] relative">
                        <label
                            htmlFor="confirm_password"
                            className="block text-md font-medium text-[#fdf0d5]"
                        >
                            Confirm New Password
                        </label>
                        <div className="flex items-center">
                            <input
                            value={confirmpassword} 
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
                        </div>
                    </div>

                </div>

                {/* Social Media Links */}
                <div className="bg-gradient-to-r from-sky-900 to-indigo-900 bg-opacity-2 p-8 rounded-lg shadow-lg w-[380px] md:w-[100%] flex flex-col items-center">
                    <h2 className="text-left w-full text-[#f2d7bc] text-2xl pacifico-font"> Social Media Links</h2>

                    {/* First Row */}
                    <div className="flex flex-col md:flex-row justify-between w-full mt-6">

                        {/* Facebook */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label
                            htmlFor="facebook"
                            className="block text-md font-medium text-[#fdf0d5]"
                            >
                            <FontAwesomeIcon icon={faFacebook} style={{color: "#fdf0d5"}} className=" text-lg mr-2" />
                            Facebook
                            </label>
                            <input
                                name="facebook"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                                type="text"
                                className="peer ... w-full p-2 border border-gray-300 focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg invalid:border-pink-500 invalid:text-rose-400
                                focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1
                                    "
                                placeholder={userObj.facebook}
                            />
                            <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
                                Please provide a valid Facebook link.
                            </p>
                        </div>

                        {/* Instagram */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label className="block text-md font-medium text-[#fdf0d5]">
                                <FontAwesomeIcon icon={faInstagram} style={{color: "#fdf0d5"}} className=" text-lg mr-2" />
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
                                placeholder={userObj.insta}
                            />
                            <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
                                Please provide a valid Instagram link.
                            </p>
                        </div>
                    </div>

                    {/* Secind Row */}
                    <div className="flex flex-col md:flex-row justify-between w-full mt-6">

                        {/* LinkedIn */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label className="block text-md font-medium text-[#fdf0d5]">
                                <FontAwesomeIcon icon={faLinkedin} style={{color: "#fdf0d5"}} className=" text-lg mr-2" />
                                LinkedIn 
                            </label>
                            <input
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                                name="linkedin"
                                type="text"
                                className="peer ... w-full p-2 border border-gray-300 focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg  invalid:border-pink-500 invalid:text-rose-400
                                focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1"
                                placeholder={userObj.linkedin}
                            />
                            <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
                                Please provide a valid LinkedIn link.
                            </p>
                        </div>

                        {/* Twitter */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label className="block text-md font-medium text-[#fdf0d5]">
                                <FontAwesomeIcon icon={faTwitter} style={{color: "#fdf0d5"}} className=" text-lg mr-2" />
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
                                placeholder={userObj.twitter}
                            />
                            <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
                                Please provide a valid Twitter link.
                            </p>
                        </div>
                    </div>

                    {/* Third Row */}
                    <div className="flex flex-col md:flex-row justify-center w-full mt-6">

                        {/* Github */}
                        <div className="mt-4 w-full md:w-[40%]">
                            <label className="block text-md font-medium text-[#fdf0d5]">
                                <FontAwesomeIcon icon={faGithub} style={{color: "#fdf0d5"}} className=" text-lg mr-2" />
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
                                placeholder={userObj.github}
                            />
                            <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
                                Please provide a valid GitHub link.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                {submitAttempted && errorMessage && <p className="mt-2 text-rose-400 text-sm">{errorMessage}</p>}
                <div className="flex justify-center w-[340px] md:w-[60%]">
                    <button className=" w-[340px] md:w-[60%] bg-gradient-to-r from-sky-900 to-indigo-900 font-bold text-white p-2 rounded-lg hover:from-indigo-900 hover:to-sky-900 flex items-center justify-center ">
                        Save Your Changes
                        <FontAwesomeIcon icon={faCheck} style={{color: "#ffffff"}} className=" text-xl ml-3" />
                    </button>
                </div>

            </form>

        </div>
        </>
    )
    
}