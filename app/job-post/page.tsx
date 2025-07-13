"use client";

import React, { useEffect } from "react";
import axio from "axios";
const Jobpost = () => {
  const jobData = {
    title: "Software Engineer",
    description:
      "We are looking for a skilled software engineer to join our agile team to build scalable web applications.",
    company: "687335c23aba454b97914999",
    reqruiter: "60f7a4e4d1e5f12345678902",
    location: "Dhaka, Bangladesh",
    salaryrange: {
      min: 60000,
      max: 90000,
    },
    jobtype: "full-time",
    requiredSkills: ["JavaScript", "React", "Node.js", "MongoDB"],
    education: ["BSc in Computer Science", "MSc preferred"],
    experience: "mid",
    dedline: "2025-08-15T23:59:59.999Z",
    category: "Software Development",
    holidayPolicy: "Standard national holidays and two company trips per year.",
    workTime: {
      start: "09:00 AM",
      end: "05:00 PM",
    },
    shift: "day",
    benefits: ["Medical", "Festival Bonus", "Lunch Facilities"],
    vacancies: 2,
    isRemoteAvailable: true,
    status: "active",
  };

  const companyData = {
  name: "TechNova Ltd.",
  email: "hr@technova.com",
  description: "TechNova is a leading AI and software development firm.",
  website: "https://www.technova.com",
  logo: "https://cdn.technova.com/logo.png",
  location: "Dhaka, Bangladesh",
  industry: "Software & AI",
  activeStatus: "active", 
  recruiter: "68727033ce59eabca10b28e7", 
};



  const handleJobPost = async () => {
    const res = await axio.post("/api/job", jobData);
    console.log(res);
  };

  const handleAddCompany = async () => {
    const res = await axio.post("/api/company", companyData);
    console.log(res);
  }


  useEffect(() => {
    const handleGetCompany = async () => {
      const res = await axio.get(`/api/company/${jobData.company}`);
      console.log(res.data);
    }
    handleGetCompany();
  },[jobData.company])
  return (
    <div>
      <button
        onClick={() => handleJobPost()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5"
      >
        Post a JOB
      </button>
      <button
        onClick={() => handleAddCompany()}
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded m-5"
      >
        Add Company
      </button>
    </div>
  );
};

export default Jobpost;
