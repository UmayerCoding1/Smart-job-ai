"use client";

import React from "react";
import axio from "axios";
const Jobpost = () => {
  const jobData = {
    title: "Software Engineer",
    description:
      "We are looking for a skilled software engineer to join our agile team to build scalable web applications.",
    company: "60f7a4e4d1e5f12345678901",
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

  const handleJobPost = async () => {
    const res = await axio.post("/api/job", jobData);
    console.log(res);
  };
  return (
    <div>
      <button
        onClick={() => handleJobPost()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5"
      >
        Post a JOB
      </button>
    </div>
  );
};

export default Jobpost;
