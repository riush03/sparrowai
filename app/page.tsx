import Image from "next/image";
import Header from "@/components/Header";
import HeroWhiteboard from "@/components/WhiteBoardHero";
import Hero from "@/components/SchreenshotHero";
import PromptHero from "@/components/PromptHero";
import Faqs from "@/components/Faqs";
import Footer from "@/components/Footer";
import OurFeatureSection from "@/components/Features";
import HeroSection from "@/components/landing/HeroSection";

export default function Home() {
  return (
    <main className="relative">
    <Header/>
    <div>
    <div className="mx-4 md:mx-[3.25rem] pt-32 lg:pt-16">
      <HeroSection />

      <div className=" hidden md:block md:absolute top-0 left-0 -z-10">
        <img src="/images/top_left_gradient.png" alt="top left gradient" />
      </div>
      <div className="absolute hidden md:block top-0 right-0 -z-10">
        <img src="/images/top_right_gradient.png" alt="top right gradient" />
      </div>
    </div>
    <div className="mx-4 md:mx-[3.25rem]">
                    <OurFeatureSection/>
                    </div>
                    <Hero />
                    <HeroWhiteboard />
                    <PromptHero/>
                </div>
                <div>
                    <Faqs />
                </div>
                <div className='mt-6'>
                    <Footer />
                </div>
    </main>
  );
}
