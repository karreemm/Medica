"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faHospital, faMoneyCheckDollar, faClock, faBed } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';


function Surgery(req: {id:number,image:string,surgeryName:string, name:string, room: string, cost:number,duration:number,date:Date , Sid:number}){
    
    const router = useRouter();

  const handleViewDoctor = (uid: string) => {
    router.push(`/ViewUserProfile?uid=${uid}&role=doctor`);
  };

  function convertDateTime(dateTime: string, offset: number): string {
    const date = new Date(dateTime);
    date.setHours(date.getHours() + offset);

    // Format the date as "2 June 2024"
    const formattedDate = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    // Format the time as "7:15 PM"
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    return `${formattedDate} at ${formattedTime}`;
}

    return (
        <>
        <div className="flex flex-wrap items-center p-4 justify-between bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            <img src={req.image} alt="Profile" className="w-12 h-12 rounded-full" />
            <h1 className="text-2xl font-semibold">{req.name}</h1>
          </div>
          
          {/* View Button */}
          <div onClick={() => handleViewDoctor(req.id.toString())}
           className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
            <FontAwesomeIcon icon={faEye} />
            <span className="hidden md:inline ml-2 font-semibold">View</span>
          </div>
          
          {/* Surgery Details */}
          <div className="mt-4 w-full flex flex-col space-y-2">
            <div className="flex items-center">
              <span className="text-black flex gap-1 items-center"><FontAwesomeIcon icon={faBed} />
              Surgery:</span>
              <p className="ml-2 font-semibold text-indigo-700">{req.surgeryName}</p>
            </div>
            <div className="flex items-center">
              <span className="text-black flex gap-1 items-center"><FontAwesomeIcon icon={faHospital} />
              Room:</span>
              <span className="ml-2 font-semibold text-indigo-700">{req.room}</span>
            </div>
            <div className="flex items-center">
              <span className="text-black flex gap-1 items-center"><FontAwesomeIcon icon={faMoneyCheckDollar} />Cost:</span>
              <span className="ml-2 font-semibold text-indigo-700">{req.cost} EGP</span>
            </div>
            <div className="flex items-center">
              <span className="text-black flex gap-1 items-center"><FontAwesomeIcon icon={faClock} />Duration:</span>
              <span className="ml-2 font-semibold text-indigo-700">{req.duration} min</span>
            </div>
            <div className="flex items-center">
              <span className="text-black flex gap-1 items-center"><FontAwesomeIcon icon={faCalendar} className='' />Date:</span>
              <span className="ml-2 font-semibold text-indigo-700">{convertDateTime(req.date.toLocaleDateString(),3)}</span>
            </div>
          </div>
        </div>
      </>
      
    );
}
export default Surgery;
