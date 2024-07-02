import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faIndustry, faHammer } from '@fortawesome/free-solid-svg-icons';
import { Fade } from 'react-awesome-reveal';

import img1 from "./Images/1.jpg"
import img2 from "./Images/2.jpg"
import img3 from "./Images/3.jpg"
import img4 from "./Images/4.jpg"
import img5 from "./Images/5.jpg"


const imgurl1 = img1.src;
const imgurl2 = img2.src;
const imgurl3 = img3.src;
const imgurl4 = img4.src;
const imgurl5 = img5.src;

const devices = {
    device1: { 
        name: 'Robotic Surgical Systems', 
        description: "Robotic Surgical Systems are advanced medical devices designed to enhance the precision, flexibility, and control of surgeons during complex surgical procedures.", 
        manufacturer: 'Johnson & Johnson', 
        maintenancePeriod: 'Our quarterly maintenance routine involves replacing parts, lubricating components, and updating firmware to ensure optimal performance and safety of our robotic surgical systems.', 
        image: imgurl1,
        descriptionIcon: faFile, 
        manufacturerIcon: faIndustry, 
        maintenanceIcon: faHammer 
    },
    device2: { 
        name: 'Intraoperative MRI/CT Scanners', 
        description: 'Intraoperative MRI/CT Scanners provide real-time imaging to guide surgeons during complex procedures.', 
        manufacturer: 'Siemens Healthineers', 
        maintenancePeriod: 'Regular maintenance ensures our MRI/CT scanners deliver high-quality imaging, enhancing surgical precision and patient outcomes.', 
        image: imgurl2,
        descriptionIcon: faFile, 
        manufacturerIcon: faIndustry, 
        maintenanceIcon: faHammer 
    },
    device3: { 
        name: 'Electrosurgical Units', 
        description: 'Electrosurgical Units use electrical currents to cut tissue or control bleeding during surgery.', 
        manufacturer: 'Medtronic', 
        maintenancePeriod: 'Scheduled maintenance ensures our electrosurgical units remain reliable and effective in surgical procedures.', 
        image: imgurl3,
        descriptionIcon: faFile, 
        manufacturerIcon: faIndustry, 
        maintenanceIcon: faHammer 
    },
    device4: { 
        name: 'Endoscopic Cameras', 
        description: 'Endoscopic Cameras provide high-definition visualization of internal body structures during surgical procedures.', 
        manufacturer: 'KARL STORZ', 
        maintenancePeriod: 'Regular maintenance ensures clear imaging and functionality of our endoscopic cameras, aiding surgeons in minimally invasive procedures.', 
        image: imgurl4,
        descriptionIcon: faFile, 
        manufacturerIcon: faIndustry, 
        maintenanceIcon: faHammer 
    },
    device5: { 
        name: 'Laparoscopic Instruments', 
        description: 'Laparoscopic Instruments are minimally invasive tools used in keyhole surgeries, offering precision and reduced recovery time for patients.', 
        manufacturer: 'Olympus Corporation', 
        maintenancePeriod: 'Routine maintenance ensures the reliability and effectiveness of our laparoscopic instruments in surgical procedures.', 
        image: imgurl5,
        descriptionIcon: faFile, 
        manufacturerIcon: faIndustry, 
        maintenanceIcon: faHammer 
    },
    // Add more devices here...
};


export default function Collaboration() {
    

    return (
        <>
        
        {Object.values(devices).map((device, idx) => (
        <Fade duration={4000} key={device.name}>
            <div className="bg-[#669bbc] flex flex-col items-center mt-36 space-y-10">
                {idx === 0 && (
                <div className='flex justify-center'>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#14213d]">Our Devices</h1>
                </div>
                )}
                <div className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] w-[80%] md:w-[100%] md:flex-row">
                    {/* Device Image */}
                    <div className="md:w-[60%] flex justify-center bg-cover bg-center h-96" 
                        style={{backgroundImage: `url(${device.image})`}}>
                    </div>
                
                    {/* Device Content */}
                    <div className="flex flex-col justify-start p-6 md:w-[60%] space-y-4">
                    {/* Device Name */}
                    <h5 className="mb-2 text-xl md:text-4xl flex justify-center font-bold text-[#14213d]">
                        {device.name}
                    </h5>
                    
                    {/* Device Description */}
                    <p className="text-[#14213d] font-bold text-lg md:text-2xl">
                        <FontAwesomeIcon icon={device.descriptionIcon} className='mr-2' />Description: 
                        <span className="mb-4 text-base md:text-lg font-normal inline text-neutral-600">
                        {device.description}
                        </span>
                    </p>
                    
                    {/* Device Manufacturer */}
                    <p className="text-[#14213d] font-bold text-lg md:text-2xl">
                        <FontAwesomeIcon icon={device.manufacturerIcon} className='mr-2' />Manufacturer: 
                        <span className="mb-4 text-base md:text-lg font-normal inline text-neutral-600">
                        {device.manufacturer}
                        </span>
                    </p>
                    
                    {/* Device Maintenance */}
                    <p className="text-[#14213d] font-bold text-lg md:text-2xl">
                        <FontAwesomeIcon icon={device.maintenanceIcon} className='mr-2' />Maintenance Period: 
                        <span className="mb-4 text-base md:text-lg font-normal inline text-neutral-600">
                        {device.maintenancePeriod}
                        </span>
                    </p>
                    </div>
                </div>
            </div>
        </Fade>
        ))}
        <div style={{ height: '140px' }}></div> 
        </>
    );
}