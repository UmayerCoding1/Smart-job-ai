"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { AnimatePresence, motion } from "motion/react";


export const JobType = ["any", "full time", "hybrid", "remote", "internship"];
export const DatePosted = [
  "any",
  "last 24 hours",
  "last 7 days",
  "last 30 days",
];
export const ExperienceLavel = [
  "any",
  "internship",
  "entry level",
  "mid level",
  "senior level",
  "director",
  "executive",
];

const Filter = () => {
  const [isOpenJobType, setIsOpenJobType] = useState<boolean>(true);
  const [jobType, setJobType] = React.useState<string[]>([]);
 const [isOpenExprience, setIsOpenExperience] = useState<boolean>(true);
 const [experience, setExperience] = React.useState<string[]>([]);
 const [isOpenDatePosted, setIsOpenDatePosted] = useState<boolean>(true);
 const [datePosted, setDatePosted] = React.useState<string[]>([]);

  const handleJobTypeChange = (checked: boolean, value: string) => {
    if (checked) {
      setJobType((prev) => [...prev, value]);
    } else {
      setJobType((prev) => prev.filter((type) => type !== value));
    }
  };

  const handleExperienceChange = (checked: boolean, value: string) => {
    if (checked) {
      setExperience((prev) => [...prev, value]);
    } else {
      setExperience((prev) => prev.filter((type) => type !== value));
    }
  };

  const handleDatePostedChange = (checked: boolean, value: string) => {
    if (checked) {
      setDatePosted((prev) => [...prev, value]);
    } else {
      setDatePosted((prev) => prev.filter((type) => type !== value));
    }
  };
  

  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-300 py-2">
        <h2 className="text-2xl font-semibold">All Filter</h2>

        <Button variant="destructive" className="cursor-pointer">
          <RotateCcw />
          <span className="mr-2 ">Reset</span>
        </Button>
      </div>

      {/* Job Type */}
      <section>
        <div
          onClick={() => setIsOpenJobType(!isOpenJobType)}
          className="flex items-center justify-between border-b border-gray-300 py-2 hover:bg-blue-50 cursor-pointer"
        >
          <h2 className="text-lg font-semibold">Job Type</h2>
          {isOpenJobType ? <ChevronUp /> : <ChevronDown />}
        </div>

        <AnimatePresence>
          {isOpenJobType && (
            <motion.div
              key="jobTypeFilter"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-3 overflow-hidden"
            >
              <div className="py-2">
                {JobType.map((type) => (
                  <div key={type} className="flex items-center gap-2 my-1">
                    <Checkbox
                      id={type}
                      checked={jobType.includes(type)}
                      onCheckedChange={(checked) =>
                        handleJobTypeChange(!!checked, type)
                      }
                      className="bg-transparent border border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-none"
                    />
                    <label htmlFor={type}>{type.toUpperCase()}</label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Experience */}
      <section>
        <div
          onClick={() => setIsOpenExperience(!isOpenExprience)}
          className="flex items-center justify-between border-b border-gray-300 py-2 hover:bg-blue-50 cursor-pointer"
        >
          <h2 className="text-lg font-semibold">Experience Level</h2>
          {isOpenExprience ? <ChevronUp /> : <ChevronDown />}
        </div>

        <AnimatePresence>
          {isOpenExprience && (
            <motion.div
              key="jobTypeFilter"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-3 overflow-hidden"
            >
              <div className="py-2">
                {ExperienceLavel.map((type) => (
                  <div key={type} className="flex items-center gap-2 my-1">
                    <Checkbox
                      id={type}
                      checked={experience.includes(type)}
                      onCheckedChange={(checked) =>
                        handleExperienceChange(!!checked, type)
                      }
                      className="bg-transparent border border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-none"
                    />
                    <label htmlFor={type}>{type.toUpperCase()}</label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Date Posted */}
      <section>
        <div
          onClick={() => setIsOpenDatePosted(!isOpenDatePosted)}
          className="flex items-center justify-between border-b border-gray-300 py-2 hover:bg-blue-50 cursor-pointer"
        >
          <h2 className="text-lg font-semibold">Date Posted</h2>
          {isOpenDatePosted ? <ChevronUp /> : <ChevronDown />}
        </div>

        <AnimatePresence>
          {isOpenDatePosted && (
            <motion.div
              key="jobTypeFilter"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-3 overflow-hidden"
            >
              <div className="py-2">
                {DatePosted.map((type) => (
                  <div key={type} className="flex items-center gap-2 my-1">
                    <Checkbox
                      id={type}
                      checked={datePosted.includes(type)}
                      onCheckedChange={(checked) =>
                        handleDatePostedChange(!!checked, type)
                      }
                      className="bg-transparent border border-gray-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-none"
                    />
                    <label htmlFor={type}>{type.toUpperCase()}</label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>




    </>
  );
};

export default Filter;
