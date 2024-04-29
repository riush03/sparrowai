
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

import { BsGithub } from "react-icons/bs";

import { MdOutlineHelp } from "react-icons/md";
import { SiBuymeacoffee } from "react-icons/si";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

function NavBar() {
  const [menu, setMenu] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenu(!menu);
  };

  const handleSignupNavigation = () => {
    router.push("/register");
  };

  return (
    <div className="md:sticky md:top-0   md:shadow-none z-20 ">
           {/* DESKTOP */}
           <div className=" hidden lg:block animate-in fade-in zoom-in  p-4">
        <div className="flex justify-between mx-[41px] items-center">
          <div className="flex items-center">
          <img className="w-[40px] h-[40px] left-5" src="/logo.png" />
          <span className="ml-2"> <strong className="font-semibold tracking-tight text-base md:text-lg">Sparrowai</strong></span>
          </div>
         
          <div className="flex items-center gap-[40px] select-none">
            <div
              className={`hover:text-black cursor-pointer flex items-center gap-2  font-[500] text-customGray`}
            >
                   <div className="flex items-center">
        <div className="flex-1">
          <ul className="hidden md:flex float-right text-lg text-slate-700 items-center">
            <li className="mx-2">
             
            </li>
            <li>
            
            </li>
            <li className="mx-2">
              <span>
                
              </span>
            </li>
           
          
        
          </ul>
        </div>
      </div>
              
            </div>

           
          </div>
        </div>
      </div>
    
      {/* MOBILE */}
      <div
        className={` block lg:hidden shadow-sm  fixed top-0 w-full z-[999] bg-white py-4 animate-in fade-in zoom-in  ${
          menu ? " bg-primary py-2" : ""
        } `}
      >
        <div className="flex justify-between mx-[10px]">
        <div className="flex items-center">
        <img className="w-[40px] h-[40px] left-5" src="/logo.png" />
        <span className="ml-2"> <strong className="font-semibold tracking-tight text-base md:text-lg">Sparrowai</strong></span>
      </div>
          <div className="flex items-center gap-[40px]">
            {menu ? (
              <X
                className="cursor-pointer animate-in fade-in zoom-in text-black"
                onClick={toggleMenu}
              />
            ) : (
              <img
                src="./logo.png"
                alt="logo"
                className="cursor-pointer animate-in fade-in zoom-in"
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>

   
     
      </div>
    </div>
  );
}

export default NavBar;