import { Application, IApplication } from "@/app/models/Application";
import { ROLE } from "@/app/models/User";
import { Params } from "@/app/types/Interface";
import { connectToDatabase } from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(reqest: NextRequest) {
  try {
    await connectToDatabase();
    const { applicant, job, resumeLink , expectedSalary}: IApplication = await reqest.json();

    const isJobSaker = await withAuth(reqest, { allowedRoles: ROLE.JOBSEEKER });
    if (!isJobSaker.ok) return isJobSaker.response;

    if (!applicant || !job || !resumeLink || expectedSalary) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }
    const applicationExists = await Application.findOne({ applicant, job });
    if (applicationExists) {
      return NextResponse.json(
        { message: "Already applied for this job", success: false },
        { status: 400 }
      );
    } else {
      await Application.create({ applicant, job, resumeLink, expectedSalary });
      return NextResponse.json(
        { message: "Application created successfully", success: true },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("Job appily error", error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json(
      { message: errorMessage, success: false },
      { status: 500 }
    );
  }
}

export async function GET(reqest: NextRequest, { params }: Params) {
    try {
        await connectToDatabase();
        const isRecruiter = await withAuth(reqest, { allowedRoles: "recruiter" });
        if(!isRecruiter.ok) return isRecruiter.response;

        const application = await Application.find({job: params.id});

        if (!application) {
            return NextResponse.json(
              { message: "Application not found", success: false },
              { status: 404 }
            );
        } 

        const validApplications = application.filter((application) => {
            return application.status !== "rejected" && application.status !== "accepted" && application.status !== "interview";
        });

        return NextResponse.json({ application: validApplications }, { status: 200 });
    } catch (error) {
         console.log("Job get error", error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json(
      { message: errorMessage, success: false },
      { status: 500 }
    );
    }
}
