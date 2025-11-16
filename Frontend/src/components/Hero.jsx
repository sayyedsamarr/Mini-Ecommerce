import React from "react";
import HeroImage from '../assets/hero_img.png'

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border rounded-xl border-gray-400">
      {/* left sidebard */}
      <div className="w-full sm:w/12 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[1.5px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">Our BestSeller</p>
          </div>
          <div>
            <h1 className="text-3xl poppins-extrabold sm:py-3 lg:text-5xl leading-relaxed">
              Latest Arrivals
            </h1>
            <div className="flex items-center gap-2 ">
              <p className="font-medium text-sm md:text-base">Shop Now</p>
              <p className="w-8 md:w-11 h-[1.5px] bg-[#414141]"></p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <img className="w-full sm:w-1/2 rounded-r-xl" src={HeroImage} alt="" />
    </div>
  );
};

export default Hero;