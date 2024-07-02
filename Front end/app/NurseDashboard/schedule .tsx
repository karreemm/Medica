import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import GetNurseSurgeriesList from './Handling/GetNurseSurgeriesList';
import GetDoctor from './Handling/GetDoctor';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Surgery {
  sid: number;
  did: number;
  sdate: string;
}

interface Doctor {
  uid: string;
  firstname: string;
  lastname: string | null;
  email: string | null;
  profileimage: string;
}

interface SurgeryWithDoctor {
  surgery: Surgery;
  doctor: Doctor;
}

export default function Schedule() {
  const [surgeriesWithDoctors, setSurgeriesWithDoctors] = useState<SurgeryWithDoctor[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();
  const nurse = localStorage.getItem("User") as string;
  const nurseObj = JSON.parse(nurse);
  const nurseId = nurseObj?.uid;

  useEffect(() => {
    async function fetchSurgeriesAndDoctors() {
      try {
        const surgeries: Surgery[] = await GetNurseSurgeriesList(nurseId);
        const surgeriesWithDoctorsPromises = surgeries.map(async (surgery) => {
          const doctor: Doctor = await GetDoctor(surgery.did.toString());
          const date = new Date(surgery.sdate);
          const day = date.getDate();
          const month = date.toLocaleString('default', { month: 'short' });
          const year = date.getFullYear();
          const formattedDate = `${day} ${month} ${year}`;

          return { surgery: { ...surgery, sdate: formattedDate }, doctor };
        });
        const surgeriesWithDoctors = await Promise.all(surgeriesWithDoctorsPromises);

        // Sort surgeries based on date
        surgeriesWithDoctors.sort((a, b) => {
          const dateA = new Date(a.surgery.sdate);
          const dateB = new Date(b.surgery.sdate);
          return dateA.getTime() - dateB.getTime();
        });

        setSurgeriesWithDoctors(surgeriesWithDoctors);
      } catch (error) {
        console.error('Error fetching surgeries or doctors:', error);
      }
    }

    fetchSurgeriesAndDoctors();

    // Update current time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatRemainingTime = (sdate: string) => {
    const surgeryDate = new Date(sdate);
    const timeDiff = surgeryDate.getTime() - currentTime.getTime();

    if (timeDiff <= 0) {
      return "Past";
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h`;
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
                  <th scope="col" className="px-2 md:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[50%]">
                    With Doctor:
                  </th>
                  <th scope="col" className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider w-[25%]">
                    Date
                  </th>
                  <th scope="col" className="relative text-xs px-2 md:px-6 py-3 uppercase tracking-wider text-white">
                    State
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {surgeriesWithDoctors.map(({ surgery, doctor }) => {
                  const surgeryDate = new Date(surgery.sdate);
                  const now = new Date();
                  const isPast = surgeryDate < now;
                  const remainingTime = formatRemainingTime(surgery.sdate);

                  return (
                    <tr key={surgery.sid}>
                      <td className="px-2 md:px-6 py-4 whitespace-nowrap">
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
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{surgery.sdate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-4 items-center">
                          <div className={`flex items-center ${isPast ? 'text-green-600' : 'text-indigo-600'} hover:text-indigo-900`}>
                            <FontAwesomeIcon icon={isPast ? faCheck : faClock} />
                            {!isPast && <span className="ml-2">{remainingTime}</span>}
                            {isPast && <span className="ml-2">Done</span>}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
