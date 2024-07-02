"use client";
import Sidebar from "./Sidebar";
import NavbarUser from "../Components/NavbarUser";
import Navbar from "../Components/Navbar";
import AddDoctor from "./AddDoctor";
import AddNurse from "./AddNurse";
import AllDoctors from "./AllDoctors";
import AllNurses from "./AllNusrses";
import AllPatients from "./AllPatients";
import { useState } from "react";
import Footer from "../Components/Footer";

export default function Page() {

  const user = localStorage.getItem("User") as string;
    const userObj = JSON.parse(user);
    if (!(userObj) || (userObj.role != 'admin')) {
      window.location.href = '/'; 
      return null;
    }
  let NavbarComponent = Navbar;
  if (userObj) {
    NavbarComponent = NavbarUser;
  }
  else{
    NavbarComponent = Navbar;
  }
  


  const [activeComponent, setActiveComponent] = useState('Doctors');

  const handleSidebarOptionClick = (option: string) => {
    setActiveComponent(option);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Add Doctor':
        return <AddDoctor />;
      case 'Add Nurse':
        return <AddNurse />;
      case 'Doctors':
        return <AllDoctors />;
      case 'Nurses':
        return <AllNurses />;
      case 'Patients':
        return <AllPatients />;
      default:
        return <AllDoctors />;
    }
  };

  return (
    <>
      <div className="bg-[#669bbc] min-h-screen ">
        {/* <NavbarComponent /> */}
        <NavbarUser />
        <div className="flex flex-col items-center md:flex-row md:justify-between">
        <Sidebar onOptionClick={handleSidebarOptionClick} />   
        {renderComponent()}
        </div>
      </div>
      <Footer />
    </>
  );
}
