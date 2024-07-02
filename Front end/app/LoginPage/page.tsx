"use client";
import Login from "./Login";
import NavbarUser from "../Components/NavbarUser";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Page() {

  const user = localStorage.getItem("User") as string;
  const userObj = JSON.parse(user);
  if(userObj){ window.location.href = '/UserProfile'; return;}
  let NavbarComponent = Navbar;
  return (
    <>
      <div>
        <NavbarComponent />
      </div>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 mt-8 space-y-5 bg-[#669bbc]">
        <div className="">
          <Login />
        </div>
      </main>
      <Footer />
    </>
  );
}
