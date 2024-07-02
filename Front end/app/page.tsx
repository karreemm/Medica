"use client";
import Navbar from "./Components/Navbar";
import NavbarUser from "./Components/NavbarUser";
import Home from "./Home/Home";
import Services from "./Home/OurServices";
import { CustomerFeedbacks } from "./Home/CustomerFeedbacks";
import Footer from "./Components/Footer";
import BestDoctors from "./Home/BestDoctors";

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

  const feedbacks = [
    {
      quote: "This product is amazing!",
      name: "John Doe",
      title: "CEO at Company",
    },
    {
      quote: "I love using this product. It's very user-friendly.",
      name: "Jane Smith",
      title: "Manager at Business",
    },
    {
      quote: "I love using this product. It's very user-friendly.",
      name: "Jane Smith",
      title: "Manager at Business",
    },
    {
      quote: "I love using this product. It's very user-friendly.",
      name: "Jane Smith",
      title: "Manager at Business",
    },
    {
      quote: "I love using this product. It's very user-friendly.",
      name: "Jane Smith",
      title: "Manager at Business",
    },
  ];

  return (
    <>
      <main className="h-screen w-full bg-[#669bbc]">
        <NavbarComponent />
        <div className="mt-24 space-y-10 md:space-y-20 ">
          <Home />
          <Services />
          <BestDoctors />
          <CustomerFeedbacks
            items={feedbacks}
            direction="left"
            speed="slow"
            pauseOnHover={true}
          />
          <Footer />
        </div>
      </main>
    </>
  );
}
