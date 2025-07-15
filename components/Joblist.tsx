"use client";
import { IJob } from "@/app/models/Job";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import React from "react";
// import PrimaryButton from "./button/PrimaryButton";
import FadeRight from "./animations/FadeRight";
import { Button } from "./ui/button";

const GoogleImage = "/assets/google.png";

// todo 1 : add company information to add next time , because company data in not available all job data;
const Joblist = ({ job }: { job: IJob }) => {
  const { title, experience, jobtype, shift, salaryrange} = job;
 console.log(shift,salaryrange);
  return (
   <>
  
   <FadeRight>

     <div className="flex flex-col  justify-between gap-3 shadow-md p-5  border-transparent rounded-lg hover:border-b-2 hover:border-blue-500 transition-all duration-200 w-full">
      <div className="flex items-center justify-between w-full">
        <Image
      src={GoogleImage}
      alt="Google"
      width={100}
      height={100}
      className="w-12 h-12"
      />

      <div>
        <Button variant={"ghost"} className="border border-black">
          <Bookmark className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-semibold text">Google</span>
        <span className="text-xs font-medium text-gray-500">5 day ago</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold lg:font-semibold">{title}</h1>
        <button className="bg-gray-100 px-2 py-1 text-sm font-[500] rounded-lg mt-2">{jobtype}</button>
        <button className="bg-gray-100 px-2 py-1 text-sm font-medium rounded-lg mt-2">{experience}</button>
      </div>

      <div>

      </div>
       
    </div>
   </FadeRight>
         
           
   </>
  );
};

export default Joblist;
