"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Search from "../Search";
import { IJob } from "@/app/models/Job";
import Joblist from "../Joblist";
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
  return (
    <div className="lg:max-w-7xl lg:mx-auto p-2 lg:p-0">
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
              jobs.map((job: IJob) => <Joblist key={job._id?.toString()} job={job} />)
            ) : (
              <p>No jobs found</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jobs;
