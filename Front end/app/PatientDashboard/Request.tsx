
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faXmark, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { handelCancel } from './cancelAppointment';
import { useRouter } from 'next/navigation';

function Request(req: {apid:number ,did: number , name:string , image : string ,date : string}){

    const router = useRouter();

    const handleViewDoctor = (uid: string) => {
        router.push(`/ViewUserProfile?uid=${uid}&role=doctor`);
      };

    return (
    <>
        <div className="flex flex-row flex-wrap items-center gap-x-2 felx-nowrap p-3 justify-between bg-white 
        rounded-xl">
            <div className="space-x-3 flex flex-nowrap flex-row items-center">
                <img src={req.image} alt="profile" className="w-12 h-12 rounded-full "/>
                <h1 className="text-2xl">{req.name}</h1>
            </div>
            <div className="flex flex-row  space-x-6">
                <div onClick={() => handleViewDoctor(req.did.toString())}
                 className="text-indigo-600 cursor-pointer hover:text-indigo-900">
                    <FontAwesomeIcon icon={faEye} />
                    <span className="hidden md:inline ml-1">View</span>
                </div>
                <div className="text-red-600 hover:text-red-900">
                    <FontAwesomeIcon icon={faXmark} />
                    <button onClick={() => handelCancel(req.apid)} className="hidden md:inline ml-2">Cancel</button>
                </div>
            </div>
            <p className='basis-[100%] mt-4 ml-4'>Requests an Appointment at <span className='text-indigo-700 font-semibold'>{convertDateTime(req.date,3)}</span></p>
        </div>
    </>
    );
}
export default Request;

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