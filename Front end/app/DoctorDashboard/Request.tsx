
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { SetResponse } from './SetResponse';
import { useRouter } from 'next/navigation';


function Request(req: {id: number , name:string , image : string ,date : string ,apid:number}){

    const handelResponse = (response:boolean) => {
        SetResponse(req.apid,response)
        .then(async res => {
            
        })
        .then(() => {
            window.location.reload();
        })
        .then(() => {
            alert("Response Sent");
        })
    };

    const router = useRouter();

    const handleViewPatient = (uid: string) => {
        router.push(`/ViewUserProfile?uid=${uid}&role=patient`);
      };

    return (
    <>
        <div className="flex flex-row flex-wrap items-center gap-x-2 felx-nowrap p-3 justify-between bg-white 
        rounded-xl">
            <div className="space-x-3 flex flex-nowrap flex-row items-center">
                <img src={req.image} alt="profile" className="w-12 h-12 rounded-full "/>
                <h1 className="text-2xl">{req.name}</h1>
            </div>
            <div className="flex flex-row  space-x-3">
                <div onClick={() => handleViewPatient(req.id.toString())}
                className="text-indigo-600 hover:text-indigo-900">
                    <FontAwesomeIcon icon={faEye} />
                    <a className="hidden md:inline ml-1 font-semibold">View</a>
                </div>
                <div className="text-green-600 hover:text-green-900">
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <button onClick={() => handelResponse(true)} className="font-semibold hidden md:inline ml-1">Accept</button>
                </div>
                <div className="text-red-600 hover:text-red-900">
                    <FontAwesomeIcon icon={faThumbsDown} />
                    <button onClick={() => handelResponse(false)} className="font-semibold hidden md:inline ml-1">Reject</button>
                </div>
            </div>
            <p className='basis-[100%] mt-4 ml-4'>Requests an Appointment at <span className='font-semibold text-indigo-700'>{convertDateTime(req.date,3)}</span> </p>
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