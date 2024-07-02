"use client";
import NavbarUser from "../Components/NavbarUser";
import Navbar from "../Components/Navbar";
import AllSurgeries from "./AllSurgeries";
import Footer from "../Components/Footer";
import { useState } from "react";
import Schedule from "./schedule ";
import Sidebar from "./Sidebar";

export default function Page() {

  const user = localStorage.getItem("User") as string;
    const userObj = JSON.parse(user);
    console.log(userObj.uid);
    if (!(userObj) || userObj.role !== "nurse") {
      window.location.href = "/login";
      return null;
    }

    let NavbarComponent = Navbar;
    if(userObj){
      NavbarComponent = NavbarUser;
  }

  const [activeComponent, setActiveComponent] = useState('Doctors');

  const handleSidebarOptionClick = (option: string) => {
    setActiveComponent(option);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Surgeries':
        return <AllSurgeries />;
      case 'Schedule ':
        return <Schedule />;
      default:
        return <Schedule />;
    }
  };


  return (
    <>
      <div className="bg-[#669bbc] min-h-screen ">
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
