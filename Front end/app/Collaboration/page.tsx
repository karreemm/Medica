'use client';
import Collaboration from "./Collaboration";
import NavbarUser from "../Components/NavbarUser";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Brands from "./Brands";

export default function Page() {

    const user = localStorage.getItem("User") as string;
  const userObj = JSON.parse(user);
  let NavbarComponent = Navbar;
  if (userObj) {
    NavbarComponent = NavbarUser;
  }
  else{
    NavbarComponent = Navbar;
  }

    return (
        <>
        <div>
            <NavbarComponent />
        </div>
        <div className="bg-[#669bbc] flex flex-col mt-44">
            <Brands />
            <Collaboration /> 
        </div>
        <Footer />
        </>
    );
}