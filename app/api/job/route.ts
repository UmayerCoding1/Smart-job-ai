import { Company } from "@/app/models/Company";
import { IJob, Job } from "@/app/models/Job";
import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// shift,vacancies,isRemoteAvailable

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body: IJob = await request.json();
    const {
      title,
      description,
      company,
      reqruiter,
      location,
      salaryrange,
      jobtype,
      requiredSkills,
      education,
      experience,
      dedline,
      category,
      holidayPolicy,
      workTime,
    } = body;

    if (
      !title ||
      !description ||
      !company ||
      !reqruiter ||
      !location ||
      !salaryrange ||
      !jobtype ||
      !requiredSkills ||
      !education ||
      !experience ||
      !dedline ||
      !category ||
      !holidayPolicy ||
      !workTime
    ) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

    const existingCompany = await Company.findById(company);

    if (!existingCompany) {
      return NextResponse.json(
        { message: "Company not found", success: false },
        { status: 404 }
      );
    }

    await Job.create({
      title,
      description,
      company,
      reqruiter,
      location,
      salaryrange,
      jobtype,
      requiredSkills,
      education,
      experience,
      dedline,
      category,
      holidayPolicy,
      workTime,
      ...(body.shift && { shift: body.shift }),
      ...(body.vacancies && { vacancies: body.vacancies }),
      ...(body.isRemoteAvailable && {
        isRemoteAvailable: body.isRemoteAvailable,
      }),
    });

    return NextResponse.json(
      { message: "Job posted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("Job post error", error);
    throw error;
  }
}


export async function GET() {
  try {
    await connectToDatabase();
    const jobs = await Job.find();
    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    console.log("Job get error", error);
    throw error;
  }
}