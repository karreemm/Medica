import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import GetCommonSurgeriesList from './Handling/GetCommonSurgeriesList';
import GetNurseSurgeriesList from './Handling/GetNurseSurgeriesList';
import GetDoctor from './Handling/GetDoctor';
import { useEffect, useState } from 'react';
import {useRouter} from 'next/navigation';

interface Doctor {
  uid: string;
  firstname: string;
  lastname: string | null;
  email: string | null;
  profileimage: string;
  surgeriesCount: number;
}

export default function AllSurgeries() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctorsData = async () => {
      try {
        const nurse = localStorage.getItem("User") as string;
        const nurseObj = JSON.parse(nurse);
        const nurseId = nurseObj?.uid;
        console.log(nurseId);

        if (!nurseId) {
          throw new Error('Nurse ID not found in localStorage.');
        }

        const nurseSurgeries = await GetNurseSurgeriesList(nurseId);
        const doctorMap = new Map<string, Doctor>();

        for (const surgery of nurseSurgeries) {
            const doctorId = surgery.did;
            if (!doctorId) {
              console.error('Doctor ID not found in surgery:', surgery);
              continue;
            }
            console.log(doctorId);
          const doctorSurgeries = await GetCommonSurgeriesList(nurseId, doctorId);
          for (const doctorSurgery of doctorSurgeries) {
            console.log("loop");
            const { did } = doctorSurgery;
            const doctor = await GetDoctor(did);
            console.log('Doctor:', doctor);

              doctorMap.set(did, {
                uid: doctor.uid,
                firstname: doctor.firstname,
                lastname: doctor.lastname,
                email: doctor.email,
                profileimage: doctor.profileimage,
                surgeriesCount: doctorSurgeries.length,
              });
              break;
            }
        }
        const doctorsArray = Array.from(doctorMap.values());
        setDoctors(doctorsArray);
        console.log('Doctors:', doctorsArray);
      } catch (error) {
        console.error('Error fetching doctors data:', error);
      }
    };

    fetchDoctorsData();
  }, []);

  const handleViewDoctor = (uid: string) => {
    router.push(`/ViewUserProfile?uid=${uid}&role=doctor`);
  };

  return (
    <div className="flex flex-col w-full mt-44">
      <div className="overflow-x-auto sm:mx-6 lg:mx-8 flex flex-col items-center">
        {/* Table Element */}
        <div className="py-2 align-middle inline-block w-[70%] sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-sky-900 to-indigo-900 bg-opacity-2">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[50%]">
                    With Doctor:
                  </th>
                  <th scope="col" className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[25%]">
                    Surgeries
                  </th>
                  <th scope="col" className="relative px-6 py-3 w-[25%]">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {doctors.map((doctor) => (
                  <tr key={doctor.uid}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={doctor.profileimage} alt={`${doctor.firstname} ${doctor.lastname}`} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{doctor.firstname} {doctor.lastname}</div>
                          <div className="text-sm text-gray-500 hidden md:inline">{doctor.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doctor.surgeriesCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-4 items-center">
                        <div onClick={() => handleViewDoctor(doctor.uid)}
                         className="flex items-center text-indigo-600 hover:text-indigo-900">
                          <FontAwesomeIcon icon={faEye} />
                          <a href="#" className="hidden md:inline ml-2">
                            View
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
