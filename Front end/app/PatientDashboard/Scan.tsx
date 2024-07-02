"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

function Scan(req: {id: number , name:string , image: string ,date: string ,scan1?: string , scan2?: string}){
    
    const router = useRouter();

    const handleViewDoctor = (uid: string) => {
        router.push(`/ViewUserProfile?uid=${uid}&role=doctor`);
      };


    return (
        <div className="relative flex flex-col items-center gap-x-2 felx-nowrap justify-between bg-white 
        rounded-xl h-fit">
            {/* profile section here */}
            <div className="space-x-3 absolute top-2 left-2 flex flex-row items-center">
                <img src={req.image} alt="profile" className="w-12 h-12 rounded-full "/>
                <h1 className="text-2xl font-semibold">{req.name}</h1>
            </div>
            <div onClick={() => handleViewDoctor(req.id.toString())}
             className="absolute top-4 right-4 text-indigo-600 cursor-pointer hover:text-indigo-900 flex flex-row
            items-center">  
                    <FontAwesomeIcon icon={faEye} className='text-xl'/>
                    <span className="hidden md:inline ml-2">View</span>
            </div>  
            {/* date and age section here */}
            <div className='flex flex-row justify-center gap-x-6 mt-14 py-4'>
                <div className='w-[40%] rounded-lg'>
                    <img src={req.scan1} 
                    className='w-full h-full rounded-lg bg-gray-100' alt="Image 1" />
                </div>
                <div className='w-[40%] rounded-lg'>
                    <img src={req.scan2} 
                    className='w-full h-full rounded-lg bg-gray-100' alt="Image 1" />
                </div>
            </div>
    
        </div>
    );
}
export default Scan;
