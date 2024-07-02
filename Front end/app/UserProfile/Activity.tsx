import { ReactElement, useEffect, useState } from "react";
import ActivityElement from "./ActivityElement";
import { AllActivities } from "./handelActivity";

function Activity() {
    const user = localStorage.getItem("User") as string;
    const userObj = JSON.parse(user);
    const [activityElements, setActivityElements] = useState<ReactElement<any, any>[]>([]);
    useEffect(() => {
        const uid: number = userObj.uid;
        AllActivities(uid).then((activities: any) => {
            if (Array.isArray(activities)) {
                setActivityElements(activities.map((act: any) => (
                    <ActivityElement
                        key={act.id}
                        name={userObj.firstname}
                        type={act.action}
                        to={act.to}
                        data={act.date}
                    />
                )));
            } else {
                setActivityElements([]); // Ensure the state is set to an empty array if no activities
            }
        }).catch(error => {
            console.error("Error fetching activities:", error);
            setActivityElements([]); // Handle error by setting to an empty array
        });
    }, []);
    

    // const activityElements = Array.from({ length: 10 }, (_, index) => (
    //     <ActivityElement
    //         key={index}
    //         name= {userObj.firstname}
    //         type="did something"
    //         to="folan"
    //         data="6 May 2024"
    //     />
    // ));

    return (
        <>
        
            <div className="h-full shadow-lg rounded-2xl px-6 py-4 bg-gradient-to-r from-sky-900 to-indigo-900
                            w-full">
                <div className="flex flex-row items-center gap-x-2 felx-nowrap">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-left-dots text-[#fdf0d5] -translate-y-2" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                    </svg>  
                    <h1 className="ml-2 pacifico-font text-2xl mb-5 text-[#fdf0d5]">Activity</h1>
                </div>
                <div className="h-[90%] overflow-y-scroll no-scrollbar">
                    {activityElements}
                </div>
            </div>
        </>
    );
}

export default Activity;

