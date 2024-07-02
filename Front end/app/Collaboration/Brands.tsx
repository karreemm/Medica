import johnson from "./Images/johnson.png"
import siemens from "./Images/siemens.png"
import medtronic from "./Images/medtronic.png"
import storz from "./Images/storz.png"
import oly from "./Images/oly.png"
import philips from "./Images/philips.png"
import abbott from "./Images/abbott.png"
import boston from "./Images/boston.png"
import Bbraun from "./Images/Bbraun.png"
import intuitive from "./Images/intuitive.png"
import stryker from "./Images/stryker.png"
import zimmer from "./Images/zimmer.png"

export default function Brands() {

    const johnsonUrl = johnson.src;
    const siemensUrl = siemens.src;
    const medtronicUrl = medtronic.src;
    const storzUrl = storz.src;
    const olyUrl = oly.src;
    const philipsUrl = philips.src;
    const abbottUrl = abbott.src;
    const bostonUrl = boston.src;
    const BbraunUrl = Bbraun.src;
    const intuitiveUrl = intuitive.src;
    const strykerUrl = stryker.src;
    const zimmerUrl = zimmer.src;

    return(
        <>
        <div className="bg-white">
            <div className="w-full h-16 bg-white flex flex-row justify-around items-center p-5 ">
                <div className="w-[30%]">
                    <img src={johnsonUrl} alt="" className="bg-cover scale-50"/>
                </div>
                <div className="w-[30%]">
                    <img src={siemensUrl} alt=""  className="bg-cover scale-50"  />
                </div>
                <div className="w-[30%]">
                    <img src={olyUrl} alt=""  className="bg-cover scale-50" />
                </div>
            </div>

            <div className="w-full h-16 bg-white flex flex-row justify-around items-center p-5 mt-0 md:mt-8">
                <div className="w-[30%]">
                    <img src={abbottUrl} alt="" className="bg-cover scale-50"/>
                </div>
                <div className="w-[30%]">
                    <img src={bostonUrl} alt=""  className="bg-cover scale-50"  />
                </div>
                <div className="w-[30%]">
                    <img src={BbraunUrl} alt=""  className="bg-cover scale-50" />
                </div>
            </div>

            <div className="w-full h-14 md:h-32 bg-white flex justify-center items-center">
                <h1 className="text-xl md:text-4xl text-center from-[#660708] via-[#a4161a] to-[#ba181b] bg-gradient-to-r bg-clip-text text-transparent font-semibold"> 
                <p className="text-xl md:text-4xl text-center from-[#660708] via-[#a4161a] to-[#ba181b] bg-gradient-to-r bg-clip-text text-transparent font-semibold">+20</p> 
                    Collaborations More
                </h1>
            </div>

            <div className="w-full h-16 bg-white flex flex-row justify-around items-center p-5">
                <div className="w-[30%]">
                    <img src={medtronicUrl} alt="" className="bg-cover scale-50"/>
                </div>
                <div className="w-[30%]">
                    <img src={philipsUrl} alt=""  className="bg-cover scale-50"  />
                </div>
                <div className="w-[30%] flex justify-center">
                    <img src={storzUrl} alt=""  className="bg-cover scale-50" />
                </div>
            </div>

            <div className="w-full h-16 bg-white flex flex-row justify-around items-center p-5 md:mt-8">
                <div className="w-[30%]">
                    <img src={intuitiveUrl} alt="" className="bg-cover scale-50"/>
                </div>
                <div className="w-[30%]">
                    <img src={strykerUrl} alt=""  className="bg-cover scale-50"  />
                </div>
                <div className="w-[30%]">
                    <img src={zimmerUrl} alt=""  className="bg-cover scale-50" />
                </div>
            </div>

        </div>
        


        </>
    )
}