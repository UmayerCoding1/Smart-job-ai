"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Search from "../Search";
import { IJob } from "@/app/models/Job";
import Joblist from "../Joblist";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {motion} from "framer-motion";
const Jobs = () => {
  const { data: jobs = [] } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const res = await axios.get("/api/job");
      return res.data.jobs;
    },
  });

  const handleSearch = (search: {
    jobTitle: string;
    location: string;
    jobType: string;
  }) => {
    console.log(search);
  };


  const MotionBtn = motion(Button);
  return (
    <div>
      <Search onSearch={handleSearch} />

      <section className="mt-16">
        <div>
          <div>
            <h2 className="text-3xl font-bold">Featured jobs</h2>
            <p className="text-sm ">
              Know your worth and find the job that qualify your life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-4">
            {jobs?.length > 0 ? (
              jobs.slice(0, 6).map((job: IJob) => (
                <Joblist key={job._id?.toString()} job={job} />
              ))
            ) : (
              <p>No jobs found</p>
            )}
          </div>

          <div className="flex items-center justify-end mt-2">
            <div className="flex items-center gap-2">
            <MotionBtn whileTap={{ scale: 0.7 }} className="w-6 h-6 rounded-full cursor-pointer">
                <ChevronLeft size={20} />
              </MotionBtn>

              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-500 font-semibold">1</span>
                <span className="text-sm ">1</span>
                <span className="text-sm ">1</span>
                <span className="text-sm ">1</span>
              </div>

              <MotionBtn whileTap={{ scale: 0.7 }}  className="w-6 h-6 rounded-full cursor-pointer">
                <ChevronRight size={20} />
              </MotionBtn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jobs;
