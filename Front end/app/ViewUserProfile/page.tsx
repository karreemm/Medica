"use client";
import UserCard from "./Usercard";
import NavbarUser from "../Components/NavbarUser";
import UserInfo from "./UserInfo";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const user = localStorage.getItem("User") as string;
  const userObj = JSON.parse(user);
  const router = useRouter();
  const [uid, setUid] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUid = async () => {
      if (!userObj) {
        router.push("/LoginPage"); 
      } else {
        const queryParams = new URLSearchParams(window.location.search);
        const uidFromQuery = queryParams.get("uid");
        const roleFromQuery = queryParams.get("role");


        console.log("Window Location Search:", window.location.search);
        console.log("UID:", uidFromQuery, "Role:", roleFromQuery);

        if (uidFromQuery) {
          setUid(uidFromQuery);
          setRole(roleFromQuery);
        } else {
          window.location.reload(); 
        }
      }
    };

    fetchUid();
  }, [router, userObj]);

  useEffect(() => {
      if (uid) {
        console.log("User UID:", uid);
        console.log("User Role:", role);
      }
    }, [uid, role]);

  if (!uid) {
    return <div>Loading...</div>; 
  }
  if (!userObj) {
    window.location.href = "/LoginPage";
    return;
  }
  return (
    <>
      <div className="mb-32">
        <NavbarUser />
      </div>
      <div className="flex flex-row justify-center flex-wrap">
        <div className="basis-[30%]">
          <UserCard userId={uid} role={role} />
        </div>
        <div className="basis-[95%] min-[1050px]:basis-[60%] max-[1050px]:mt-5 space-y-8 mx-5 gap-x-4">
          <UserInfo userId={uid} role={role}   />
        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </>
  );
}
