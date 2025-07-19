'use client';
import { IJob } from "@/app/models/Job";
import { RootState } from "@/app/redux/store";
import Filter from "@/components/Filter";
import Joblist from "@/components/Joblist";
import Search from "@/components/Search";
import useJobs from "@/hooks/useJobs";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const HeaderBg = "/assets/jods-header.jpg";

const BrowseJobs = () => {
  const searchQuery = useSelector((stste: RootState )  => stste.searchR.search);
  
  const {jobs,isLoading} = useJobs();


 
  
  
 
    

  
  return (
    <div className="bg-gradient-to-tr from-white to-blue-100">
      <div className='relative h-[430px] lg:h-[370px]  w-full '>
        <Image
         src={HeaderBg}
          alt="Google"
          width={800}
          height={800}
          className="w-full h-full "
        />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className=" z-10 flex flex-col items-center justify-center h-full absolute inset-0">
          <h2 className=" text-2xl lg:text-4xl font-bold text-white">
            Find the job that shine your life
          </h2>
          <p className="font-medium text-white">500k jobs for you to explore</p>
          <div className="bg-white rounded-lg mt-10 w-full lg:w-auto ">
            <Search />
          </div>
        </div>
      </div>

    <div className="flex flex-col md:flex-row gap-4 p-16">
      <div className="w-[22%] hidden lg:block border-r border-gray-400 pr-5">
           <Filter/>
      </div>

      <div className="flex-1">
        {isLoading ? (
          <div className="flex items-center justify-center h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 p-4 max-h-screen overflow-auto scrollbar-hide">

            {jobs.map((job: IJob) =><Joblist key={job._id?.toString()} job={job} />)}
          </div>
        )}
      </div>
    </div>

    </div>
  );
};

export default BrowseJobs;
