"use client";
import { IJob } from "@/app/models/Job";
import { BriefcaseBusiness, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import PrimaryButton from "./button/PrimaryButton";
import FadeRight from "./animations/FadeRight";

const GoogleImage = "/assets/google.png";

// todo 1 : add company information to add next time , because company data in not available all job data;
const Joblist = ({ job }: { job: IJob }) => {
  const { title, location, jobtype, shift, requiredSkills } = job;
 
  return (
   <>
  
   <FadeRight>

     <div className="flex flex-col md:flex-row md:items-center lg:flex-row lg:items-center justify-between gap-3 shadow-md p-5  border-transparent rounded-lg hover:border-b-2 hover:border-blue-500 transition-all duration-200">
      <div className="flex items-center gap-3">
        <Image src={GoogleImage} alt="Google" width={50} height={50} />

        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="flex  gap-3 items-center text-sm text-gray-500">
            <p className="flex items-center gap-1">
              <MapPin size={15} />
              <span>{location}</span>
            </p>
            <p className="flex items-center gap-1">
              <BriefcaseBusiness size={15} />
              <span className="flex items-center gap-1">
                <span>{jobtype}</span>|<span>{shift}</span>
              </span>
            </p>
          </div>

          <div>
            {requiredSkills &&
              requiredSkills.slice(0, 4).map((skill, index) => (
                <div key={index} className="inline-block mr-2 mb-2 ">
                  <button
                    className={`${index === 0 && "bg-blue-200"} ${
                      index === 1 && "bg-pink-200"
                    } ${index === 2 && "bg-green-200"} ${
                      index === 3 && "bg-yellow-200"
                    } px-2 py-1 rounded-full text-xs font-semibold text-gray-600`}
                  >
                    {skill}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div>
        <PrimaryButton className="w-full px-5 py-2 text-sm ">
          Apply
        </PrimaryButton>
      </div>
    </div>
   </FadeRight>
         
           
   </>
  );
};

export default Joblist;
