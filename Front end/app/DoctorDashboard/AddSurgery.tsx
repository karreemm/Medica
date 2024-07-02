"use client";
import { useEffect, useState } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "react-datetime/css/react-datetime.css"
import {Multiselect} from "multiselect-react-dropdown";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import handelAddSurgery from './HandelAddSurgery';
import GetNurses from './GetNurses';
import AddNursesToSurgery from './AddNursesToSurgery';
import { handelStatus } from './UpdateStatus';
export function AddSurgery(req: {apid:number, id: number , name:string , image : string ,date : string}){
    const user = localStorage.getItem("User") as string;
    const userObj = JSON.parse(user);
    const [nurses, setNurses] = useState();
    const [selectedNurses, setSelectedNurses] = useState<any[]>([]);
    const [sid, setSid] = useState(0);

    useEffect(() => {
      GetNurses()
      .then(async res => {
          if(res.status === 200){
              const response = await res.json();
              setNurses(response);
          }
          else {
              console.log("Error");
          }
      }).catch(error => {
          console.error(error);
      });
    }, []);
    
    
    const handelFormSubmition = (event: React.FormEvent<HTMLFormElement>)=> {
      const nurseIds = selectedNurses.map(nurse => nurse.uid).join(',');
      console.log(nurseIds);
      
      event.preventDefault();
      
      const formData = {
        "did": parseInt(userObj.uid),
        "pid": req.id,
        "name": event.currentTarget.SurgeryName.value,
        "sdate": selectedDate,
        "cost": parseInt(event.currentTarget.cost.value),
        "opRoom": parseInt(event.currentTarget.oproom.value),
        "duration": parseInt(event.currentTarget.duration.value)
      };
      let sidnum = 0;
      console.log(formData);
      handelAddSurgery(formData)
      .then(async res => {
         if(res.status === 200)
         {
          const Sid = await res.text();
          sidnum = parseInt(Sid);
          console.log("sid : "+sidnum)
          
          setSid(sidnum);
         }
      })
      .then(() => {
        console.log("here :"+sidnum)
        const nursesData = {
          "nurses": nurseIds,
          "sid": sidnum
        }; 
        AddNursesToSurgery(nursesData)
          .then(async nres => {
            if(nres.status === 200)
            {
              console.log("Nurses Added");
            }
            else
            {
              console.log("Error");
            }
          })
      })
      .then(() => {
        handelStatus('surgery required',req.apid);
      })
      .then(() => {
          window.location.reload();
      })
      .catch(error => {
         console.log("Error: ", error);
         setErrorMessage("An error occurred. Please try again.");
      });
   };
    
    const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date | string | moment.Moment) => {
    if (date instanceof Date) {
      setSelectedDate(date);
    } else if (typeof date === 'string') {
      setSelectedDate(new Date(date));
    } else if (date && date.toDate) {
      setSelectedDate(date.toDate());
    }
  }
    return (  
        <>
            <form className="fixed inset-0 bg-black z-[51] bg-opacity-30 
            backdrop-blur-sm " onSubmit={handelFormSubmition}>
                <div className="p-6 w-[90%] max-w-[600px] h-[500px] mx-auto my-16 bg-gradient-to-r
                 from-sky-900 to-indigo-900 rounded-lg overflow-y-scroll no-scrollbar">
                    <div className="flex flex-row items-center gap-x-2 felx-nowrap">
                        <FontAwesomeIcon icon={faPaperPlane} className="text-2xl text-[#fdf0d5]" /> 
                        <h1 className="ml-2 pacifico-font text-2xl text-[#fdf0d5]">Add Surgery</h1>
                    </div>
                    {/* surgery name ,room ,cost, duration,date*/}
                    <div className="mt-4">
                        <label
                          htmlFor="SugeryName"
                          className="block after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-[#fdf0d5]"
                        >
                          Surgery Name
                        </label>
                        <input
                          required
                          name="SurgeryName"
                          type="text"
                          id="SugeryName"
                          className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1"
                        />
                    </div>
                    <div className="mt-4">
                        <label
                          htmlFor="oproom"
                          className="block after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-[#fdf0d5]"
                        >
                          Operation Room
                        </label>
                        <input
                          required
                          name="oproom"
                          type="text"
                          id="oproom"
                          className="w-full p-2 border border-gray-300 focous:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg mt-1"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-[#fdf0d5]">
                          Cost (EGP)
                        </label>
                        <input
                          required
                          name="cost"
                          type="number"
                          pattern="[0-9]*"
                          className="peer ... w-full p-2 border border-[#fdf0d5] focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg invalid:text-rose-400
                          focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1
                              "
                          placeholder="1000"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-[#fdf0d5]">
                          Duration (min)
                        </label>
                        <input
                          required
                          name="duration"
                          type="number"
                          pattern="[0-9]*"
                          className="peer ... w-full p-2 border border-[#fdf0d5] focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg invalid:text-rose-400
                          focus:invalid:border-rose-500 focus:invalid:ring-rose-500 placeholder-slate-400 mt-1
                              "
                          placeholder="120"
                        />
                    </div>
                    <div className='my-4'>
                        <label className="block  after:ml-0.5 after:text-red-500  text-sm font-medium text-[#fdf0d5]">
                            Date
                        </label>
                        <div className="relative">
                          <div className="absolute bg-white border rounded-md shadow-lg z-10">
                            <Datetime
                            value={selectedDate}
                            input={true}
                            onChange={handleDateChange}
                            className="w-full p-2 border border-gray-300 focus:border-[#fdf0d5] focus:outline-[#fdf0d5] focus:ring-0 rounded-lg"
                            />
                          </div>
                        </div>
                    </div>
                    {/* nurses */}
                    <div className=" mt-14">
                      <label className="block after:content-['*'] after:ml-0.5 after:text-red-500  text-sm font-medium text-[#fdf0d5]">
                          Nurses
                      </label>
                      <Multiselect
                      options={nurses}
                      displayValue='firstname'
                      className='bg-white rounded-lg'
                      onSelect={(selectedList) => setSelectedNurses(selectedList)}
                      onRemove={(selectedList) => setSelectedNurses(selectedList)}
                      />                  
                    </div>
                    <div className='flex flex-row space-x-4'>
                      <button type='submit' className='mt-4 w-32 h-8 bg-[#fdf0d5] rounded-lg'>Send</button>
                      <a onClick={() => window.location.reload()} className='flex  justify-center items-center cursor-pointer mt-4 w-32 h-8 bg-[#fdf0d5] rounded-lg'>close</a>
                    </div>
                </div>
            </form>
        </>
    )
  }

function setErrorMessage(arg0: string) {
  throw new Error('Function not implemented.');
}
