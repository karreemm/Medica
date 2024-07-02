"use client";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import HandleAddNurse from "./Handling/HandleAddNurse";
import { useRouter } from "next/navigation";
import State from "../Components/State";

export default function AddNurse() {
  const [firstname, setFirst_name] = useState("");
  const [lastname, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [github, setGithub] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [image, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);

    if (e.target.value !== password) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
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
      setImage(
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
      );
    }
  };

  const resetForm = () => {
    setFirst_name("");
    setLast_name("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setAddress("");
    setErrorMessage("");
    setSubmitAttempted(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);

    const formData = {
      uid: 0,
      firstname: firstname,
      lastname: lastname,
      password: password,
      address: address,
      email: email,
      phone: phone,
      github: github,
      linkedin: linkedin,
      twitter: twitter,
      facebook: facebook,
      instagram: instagram,
      profileimage: image,
    };

    // Check if first name is empty
    if (firstname === "") {
      setErrorMessage("Please enter a first name");
      return;
    }

    // Check if last name is empty
    if (lastname === "") {
      setErrorMessage("Please enter a last name");
      return;
    }

    // Check if email is valid
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email");
      return;
    }

    // Check if phone number is valid
    const phoneRegex = /^[0-9]*$/;
    if (!phoneRegex.test(phone)) {
      setErrorMessage("Please enter a valid phone number");
      return;
    }

    // Check if address is empty
    if (address === "") {
      setErrorMessage("Please enter an address");
      return;
    }

    // Check if password is empty
    if (password === "") {
      setErrorMessage("Please enter a password");
      return;
    }

    // Check if confirm password is empty
    if (confirmpassword === "") {
      setErrorMessage("Please confirm your password");
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmpassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // If all checks pass, route to login page
    HandleAddNurse(formData)
      .then(async (res) => {
        if (res.status === 200) {
          resetForm();
          setSuccessMessage("Nurse added successfully");
        } else {
          const state = await res.text();
          if (parseInt(state, 10) == State.InvalidInput) {
            setErrorMessage("Email already exists");
          }
          router.refresh();
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
        router.refresh();
      });
  };

  return (
    <>
      <div className="bg-[#669bbc] flex  flex-col items-center justify-center mt-16 md:p-14 w-[100%] md:mr-32">
        <form
          className="p-8 w-[90%] flex items-center flex-col space-y-12 sm:space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="bg-gradient-to-r from-sky-900 to-indigo-900 bg-opacity-2 p-8 rounded-lg shadow-lg w-[380px] md:w-[90%] flex flex-col items-center ">
            <h2 className="text-left w-full text-[#f2d7bc] text-2xl pacifico-font">
              {" "}
              Add Nurse
            </h2>

            {/* First Row */}
            <div className="flex flex-col md:flex-row justify-between w-full mt-2">
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
                />
              </div>
            </div>

            {/* Second Row */}
            <div className="flex flex-col md:flex-row justify-between w-full mt-2">
              {/* Email */}
              <div className="mt-4 w-full md:w-[40%]">
                <label className="block text-md font-medium text-[#fdf0d5]">
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
              <div className="mt-4 w-full md:w-[40%]">
                <label className=" block text-md font-medium text-[#fdf0d5]">
                  Phone Number
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  name="phone"
                  type="tel"
                  pattern="[0-9]*"
                  className="peer ... w-full p-2 border border-[#fdf0d5] focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg invalid:text-rose-400
                                        focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1
                                            "
                />
                {phone && (
                  <p className="mt-2 invisible peer-invalid:visible text-rose-400 text-sm">
                    Please provide a valid phone number.
                  </p>
                )}
              </div>
            </div>

            {/* Third Row */}
            <div className="flex flex-col md:flex-row justify-between w-full mt-2">
              {/* Password */}
              <div className="mt-4 w-full md:w-[40%]">
                <label
                  htmlFor="password"
                  className=" block text-md font-medium text-[#fdf0d5]"
                >
                  Password
                </label>
                <div className="flex items-center relative">
                  <input
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1 pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2"
                  >
                    <FontAwesomeIcon
                      className="text-indigo-900"
                      icon={isPasswordVisible ? faEyeSlash : faEye}
                    />
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mt-4 w-full md:w-[40%]">
                <label
                  htmlFor="password"
                  className="block text-md font-medium text-[#fdf0d5]"
                >
                  Confirm Password
                </label>
                <div className="flex items-center relative">
                  <input
                    required
                    value={confirmpassword}
                    onChange={handleConfirmPasswordChange}
                    name="confirm_password"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    id="confirm_password"
                    className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1 pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-2"
                  >
                    <FontAwesomeIcon
                      className="text-indigo-900"
                      icon={isConfirmPasswordVisible ? faEyeSlash : faEye}
                    />
                  </button>
                </div>
                {errorMessage && (
                  <p className="mt-2 text-rose-400 text-sm">
                    Password does not match
                  </p>
                )}
              </div>
            </div>

            {/* Fourth Row */}
            <div className="flex flex-col md:flex-row justify-center w-full mt-2">
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
                />
              </div>
            </div>
          </div>
          {/* Submit Button */}
          {submitAttempted && errorMessage && (
            <p className="mt-2 text-rose-400 text-sm">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="mt-2 text-indigo-700 font-bold text-sm">{successMessage}</p>
          )}
          <div className="flex justify-center w-[340px] md:w-[60%]">
            <button className=" w-[340px] md:w-[60%] bg-gradient-to-r from-sky-900 to-indigo-900 font-bold text-white p-2 rounded-lg hover:from-indigo-900 hover:to-sky-900 flex items-center justify-center ">
              Add Nurse
              <FontAwesomeIcon
                icon={faCheck}
                style={{ color: "#ffffff" }}
                className=" text-xl ml-3"
              />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
