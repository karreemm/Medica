import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import GetAllPatients from "./Handling/GetAllPatients";
import GetPatientAppointment from "./Handling/GetPatientAppointment"; 
import { useRouter } from "next/navigation";
import DeletePatient from "./Handling/DeletePatient";

interface Patient {
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
  appointmentCount?: number;
}

export default function AllPatients() {
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const router = useRouter();

  const fetchPatients = async () => {
    try {
      console.log("Fetching Patients...");
      const patients = await GetAllPatients();
      console.log("Patients fetched:", patients);
      const patientsWithAppointments = await Promise.all(
        patients.map(async (patient: Patient) => {
          try {
            const appointmentCount = await GetPatientAppointment(patient.uid);
            return { ...patient, appointmentCount };
          } catch (error) {
            console.error(
              `Error fetching appointments for patient ${patient.uid}:`,
              error
            );
            return { ...patient, appointmentCount: 77 }; 
          }
        })
      );
      setPatients(patientsWithAppointments);
      setFilteredPatients(patientsWithAppointments);
    } catch (err: any) {
      console.error("Error fetching Patients:", err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value !== "") {
      const filtered = patients.filter((patient) =>
        (
          patient.firstname.toLowerCase() +
          " " +
          patient.lastname.toLowerCase()
        ).includes(e.target.value.toLowerCase())
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(patients);
    }
  };

  const handleViewPatient = (uid: string) => {
    router.push(`/ViewUserProfile?uid=${uid}&role=patient`);
  };

  const handleDeletePatient = async (uid: string) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        const result = await DeletePatient(uid);
        if (result.success) {
          console.log('Patient deleted successfully.');
          fetchPatients();
        } else {
          console.error('Failed to delete patient:', result.message);
        }
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    }
  };

  return (
    <div className="flex flex-col w-full mt-6 md:mt-44">
      <div className="overflow-x-auto sm:mx-6 lg:mx-8 flex flex-col items-center">
        {/* Search Element */}
        <div className="mb-3 xl:w-96">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              value={searchQuery}
              onChange={handleSearchChange}
              type="search"
              className="relative m-0 block bg-white flex-auto rounded border border-solid border-neutral-300 px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none"
              placeholder="Search for patients ..."
              aria-label="Search"
              aria-describedby="button-addon2"
            />

            {/* <!--Search icon--> */}
            <button
              className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-white"
              id="basic-addon2"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>

        {/* Table Element */}
        <div className="py-2 align-middle inline-block w-[70%] sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-sky-900 to-indigo-900 bg-opacity-2">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[50%]"
                  >
                    Patient
                  </th>
                  <th
                    scope="col"
                    className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[25%] "
                  >
                    Appointments
                  </th>
                  <th scope="col" className="relative px-6 py-3 w-[25%]">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <tr key={patient.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={patient.profileimage}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {patient.firstname} {patient.lastname}
                            </div>
                            <div className="text-sm text-gray-500 hidden md:inline">
                              {patient.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {patient.appointmentCount ?? 0}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-4 items-center">
                          <div onClick={() => handleViewPatient(patient.uid)}
                          className="flex items-center text-indigo-600 hover:text-indigo-900">
                            <FontAwesomeIcon icon={faEye} />
                            <a href="#" className="hidden md:inline ml-2">
                              View
                            </a>
                          </div>
                          <div onClick={() => handleDeletePatient(patient.uid)}
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
                      No patients matched your search query.
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
