"use client";
import Usercard from "../UserProfile/Usercard";
import NavbarUser from "../Components/NavbarUser";

import Activity from "./Activity";
import UserInfo from "./UserInfo";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";


export default function Page() {

  const [role, setRole] = useState('');
  const user = localStorage.getItem("User") as string;
  const userObj = JSON.parse(user);
  if(!userObj){ window.location.href = '/LoginPage'; return;}
  const NavbarComponent =  NavbarUser;

  useEffect(() => {
    if (userObj) {
        setRole(userObj.role);
    }
}, [userObj]);

  return (
    <>
    <div className="mb-32">
        <NavbarComponent />
    </div>

    <div className="flex flex-row justify-center flex-wrap">
      <div className="basis-[30%]">
        <Usercard />
      </div>
      <div className="basis-[95%] min-[1050px]:basis-[60%] max-[1050px]:mt-5 space-y-8 mx-5 gap-x-4">
          <UserInfo />
          {role != "admin" && 
            <div className="h-[450px]">
              <Activity />
            </div> }
      </div>
    </div>
    {role == "admin" &&
      <div className="mt-20">
        <Footer />
        </div>}
    

    </>
  );
}