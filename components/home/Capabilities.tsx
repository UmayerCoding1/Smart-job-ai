"use client";

import React from "react";
import { Button } from "../ui/button";
import { Brain, FileText, Zap } from "lucide-react";

const Capabilities = () => {
  return (
    <div className="mt-20">
      <section className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-semibold">Powered by Advanced AI</h1>
        <p className="text-sm text-gray-600">
          Three core features that revolutionize how you find and hire talent
        </p>
      </section>

      <section className="flex flex-col md:flex-row lg:flex-row items-center gap-5 md:gap-10 lg:gap-16 my-10 ">
        <div className="bg-gradient-to-r from-blue-200  to-blue-50 flex flex-col items-center justify-center gap-4 py-3 px-10 lg:w-[300px] rounded-lg">
          <Button className="bg-[#2563EB]">
            <Brain />
          </Button>

          <div className="text-center">
            <h2 className="text-2xl font-semibold">AI Resume Analyzer</h2>
            <p className="text-base text-left">
              Upload your resume and our AI instantly extracts skills,
              experience, and qualifications. Get detailed insights and skill
              gap analysis.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-50  to-blue-50 flex flex-col items-center justify-center gap-4 py-3 px-10 lg:w-[300px] rounded-lg">
          <Button className="bg-gradient-to-r from-[#5C43E6] hover:form-blue-700 to-[#8F34E9] ">
            <Zap />
          </Button>

          <div className="text-center">
            <h2 className="text-2xl font-semibold">AI Resume Analyzer</h2>
            <p className="text-base text-left">
              Upload your resume and our AI instantly extracts skills,
              experience, and qualifications. Get detailed insights and skill
              gap analysis.
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-pink-50 to-violet-100 flex flex-col items-center justify-center gap-4 py-3 px-10 lg:w-[300px] rounded-lg">
          <Button className="bg-gradient-to-r from-[#5C43E6] hover:form-blue-700 to-pink-500 ">
            <FileText />
          </Button>

          <div className="text-center">
            <h2 className="text-2xl font-semibold">AI Resume Analyzer</h2>
            <p className="text-base text-left">
              Upload your resume and our AI instantly extracts skills,
              experience, and qualifications. Get detailed insights and skill
              gap analysis.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Capabilities;
