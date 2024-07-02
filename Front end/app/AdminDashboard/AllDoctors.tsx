"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import GetAllDoctors from "./Handling/GetAllDoctors";
import GetAllDoctorsSurgeries from "./Handling/GetDoctorSurgeries";
import { useRouter } from "next/navigation";
import DeleteDoctor from "./Handling/DeleteDoctor";

interface Doctor {
  uid: string;
  firstname: string;
  lastname: string;
  password: string;
  address: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  profileimage: string;
  twitter: string;
  facebook: string;
  insta: string;
  role: string;
  date: string;
  gender: string;
  bdate: string;
  surgeries?: number;
}

export default function AllDoctors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const router = useRouter();

  const fetchDoctors = async () => {
    try {
      console.log("Fetching doctors...");
      const doctors = await GetAllDoctors();
      console.log("Doctors fetched:", doctors);
      // Fetch surgeries data for each doctor
      const doctorsWithSurgeries = await Promise.all(
        doctors.map(async (doctor: any) => {
          const surgeries = await GetAllDoctorsSurgeries(doctor.uid);
          return { ...doctor, surgeries: surgeries[0] };
        })
      );
      console.log("Doctors with surgeries fetched:", doctorsWithSurgeries);
      setDoctors(doctorsWithSurgeries);
      setFilteredDoctors(doctorsWithSurgeries);
    } catch (err: any) {
      console.error("Error fetching doctors:", err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value !== "") {
      const filtered = doctors.filter((doctor) =>
        (
          doctor.firstname.toLowerCase() +
          " " +
          doctor.lastname.toLowerCase()
        ).includes(e.target.value.toLowerCase())
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(doctors);
    }
  };

  const handleViewDoctor = (uid: string) => {
    router.push(`/ViewUserProfile?uid=${uid}&role=doctor`);
  };

  const handleDeleteDoctor = async (uid: string) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        const result = await DeleteDoctor(uid);
        if (result.success) {
          console.log('Doctor deleted successfully.');
          fetchDoctors();
        } else {
          console.error('Failed to delete doctor:', result.message);
        }
      } catch (error) {
        console.error('Error deleting doctor:', error);
      }
    }
  };
  

  return (
    <div className="flex flex-col w-full mt-6 md:mt-44">
      <div className="overflow-x-auto sm:mx-6 lg:mx-8 flex flex-col items-center">
        <div className="mb-3 xl:w-96">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="relative m-0 block bg-white flex-auto rounded border border-solid border-neutral-300 px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none"
              placeholder="Search for Doctors ..."
              aria-label="Search"
              aria-describedby="button-addon2"
            />
            <button
              className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-white"
              id="basic-addon2"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <div className="py-2 align-middle inline-block w-[70%] sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-sky-900 to-indigo-900 bg-opacity-2">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[50%]"
                  >
                    Doctor
                  </th>
                  <th
                    scope="col"
                    className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[25%]"
                  >
                    Surgeries
                  </th>
                  <th scope="col" className="relative px-6 py-3 w-[25%]">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <tr key={doctor.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={doctor.profileimage}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {doctor.firstname} {doctor.lastname}
                            </div>
                            <div className="text-sm text-gray-500 hidden md:inline">
                              {doctor.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {doctor.surgeries ?? 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-4 items-center">
                          <div
                            onClick={() => handleViewDoctor(doctor.uid)}
                            className="flex items-center text-indigo-600 hover:text-indigo-900 cursor-pointer"
                          >
                            <FontAwesomeIcon icon={faEye} />
                            <span className="hidden md:inline ml-2">
                              View
                            </span>
                          </div>
                          <div  onClick={() => handleDeleteDoctor(doctor.uid)}
                           className="flex items-center text-red-600 hover:text-red-900">
                            <FontAwesomeIcon icon={faTrashAlt} />
                            <a href="#" className="hidden md:inline ml-2">
                              Delete
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-center text-sm font-medium"
                    >
                      No doctors matched your search query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
