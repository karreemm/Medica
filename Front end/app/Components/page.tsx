"use client";

import Editprofile from "../EditprofilePage/Editprofile";
import Usercard from "../UserProfile/Usercard";
import NavbarUser from "../Components/NavbarUser";
import Activity from "../UserProfile/Activity";
import UserInfo from "../UserProfile/UserInfo";
import Sidebar from "../AdminDashboard/Sidebar";
import AddDoctor from "../AdminDashboard/AddDoctor";
import { CustomerFeedbacks } from "../Home/CustomerFeedbacks";
import AllDoctors from "../AdminDashboard/AllDoctors";
import AllNurses from "../AdminDashboard/AllNusrses";
import AllPatients from "../AdminDashboard/AllPatients";
import { FeedbackForm } from "../About/FeedbackForm";
import { Cards } from "../About/Cards";
import {
  faInfoCircle,
  faBullseye,
  faEye,
  faHandHoldingHeart,
  faHandHolding,
} from "@fortawesome/free-solid-svg-icons";
import { faGem } from "@fortawesome/free-regular-svg-icons";

export default function Page() {
  const items = [
    {
      title: "About Us",
      description: `At Medica, we are committed to delivering excellence in healthcare services to our community. With a legacy of [number] years of compassionate care, we strive to be your trusted partner in health and wellness.`,
      link: "/about",
      icon: faInfoCircle,
    },
    {
      title: "Our Mission",
      description: `To provide exceptional medical care with compassion and integrity, ensuring the highest standards of patient safety and satisfaction.`,
      link: "/mission",
      icon: faBullseye,
    },
    {
      title: "Our Vision",
      description: `To be recognized as the leading healthcare provider in our region, known for our commitment to innovation, excellence, and community engagement.`,
      link: "/vision",
      icon: faEye,
    },
    {
      title: "Core Values",
      description: `Patient-Centered Care: Putting our patients' needs first in everything we do.
      Compassion: Showing empathy and kindness to all individuals.
      Excellence: Pursuing the highest standards of quality and performance.
      Collaboration: Working together as a team to achieve common goals.
      Integrity: Upholding honesty, ethics, and professionalism in all our interactions.`,
      link: "/values",
      icon: faGem,
    },
    {
      title: "Services Offered",
      description: `Comprehensive medical and surgical specialties
      Advanced diagnostic and imaging services
      State-of-the-art intensive care units
      Emergency and trauma care
      Rehabilitation and physical therapy programs
      Women's health services
      Pediatrics and neonatal care
      Geriatric care
      Mental health and counseling services`,
      link: "/services",
      icon: faHandHoldingHeart,
    },
    {
      title: "Community Involvement",
      description: `We are proud to be actively involved in our community through health education programs, outreach initiatives, and partnerships with local organizations. Together, we are working to promote health and wellness for all.`,
      link: "/community",
      icon: faHandHolding,
    },
  ];

  return (
    <>
      <div className="bg-[#669bbc] min-h-screen ">
        <NavbarUser />
        <div className="flex flex-col mt-48">
          <Cards items={items} />
        </div>
      </div>
    </>
  );
}
