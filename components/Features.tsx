import React from "react";
import MainButton from "./common/MainButton";

function OurFeatureSection() {
 
  return (
    <section>
      <div className="mt-[6rem] flex flex-col gap-4 md:gap-[3rem] md:flex-row items-center">
        <p className="text-3xl md:text-[3.125rem] font-[600] text-dark leading-[2.9rem]">
          Our Features you cab get
        </p>
        <p className="text-[1.125rem] font-[500] text-customGray">
          We offer a variety of interesting features that you can help increase
          yor productivity at work and manage your projrct esaly
        </p>

        <MainButton
          text="Get Started"
          classes="rounded-[4.375rem] w-[10.125rem] h-[3rem]"
        />
      </div>
    
    </section>
  );
}

export default OurFeatureSection;