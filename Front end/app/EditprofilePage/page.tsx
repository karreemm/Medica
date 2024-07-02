"use client";
import Editprofile from "../EditprofilePage/Editprofile";
import NavbarUser from "../Components/NavbarUser";
import Navbar from "../Components/Navbar"; 
import Footer from "../Components/Footer";


export default function Page() {

  const user = localStorage.getItem("User") as string;
  const userObj = JSON.parse(user);
  if(!userObj){ window.location.href = '/LoginPage'; return;}
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
      <div className="p-8 flex justify-start bg-[#669bbc] min-h-screen mt-8">
        <Editprofile />
      </div>
      <Footer />
      
      
    </>
  );
}