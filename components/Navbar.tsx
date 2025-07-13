"use client";
import { Bell, LayoutDashboard, Menu, Search } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GostButton from "./button/GostButton";
import { Button } from "./ui/button";

export const LargeLogo = "/assets/logo.png";
export const SmallLogo = "/assets/Ai.png";
const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <header
        className={` py-3 shadow-md fixed top-0 left-0 w-full z-50 ${
          isSticky ? "bg-white backdrop-blur-md" : "bg-transparent"
        } transition-all duration-300 ease-in-out bg-white`}
      >
        <nav className="max-w-7xl mx-auto  px-1 flex items-center justify-between">
          <section>
            <Image
              src={LargeLogo}
              alt="logo"
              width={150}
              height={150}
              className="lg:block md:block hidden"
            />
            <Image
              src={SmallLogo}
              alt="logo"
              width={150}
              height={150}
              className="lg:hidden md:hidden block w-[45px]"
            />
          </section>


          <section className="flex items-center gap-2">
            <GostButton>
                 <Search size={30}/>
            </GostButton>
           
            <div className="relative ">
              <GostButton>
                <Bell size={30} />
              </GostButton>

              <span className="absolute -top-2 right-0 w-5 h-5 flex items-center font-medium justify-center bg-blue-300 text-sm rounded-full  ">5</span>
            </div>

            <div>
                <Button className="cursor-pointer">
                    <LayoutDashboard size={30}/>
                    Dashboard
                </Button>
            </div>

            <div className="flex items-center bg-gray-100 p-2 rounded-2xl cursor-pointer" >
              
                <div>
                    <button className="bg-black text-white w-10 h-10 rounded-full cursor-pointer">
                        UH
                    </button>
                </div>
              <Menu size={20} />
            </div>
          </section>
        </nav>
      </header>
      <div className="h-[72px] md:h-[75px] lg:h-[75px]"></div>
    </>
  );
};

export default Navbar;
