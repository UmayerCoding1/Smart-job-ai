import { Application, IApplication } from "@/app/models/Application";
import { ROLE } from "@/app/models/User";
import { Params } from "@/app/types/Interface";
import { connectToDatabase } from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";


// recruiter update application status
export async function PUT(reqest: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();
    const isRecruiter = await withAuth(reqest, { allowedRoles: "recruiter" });
    if (!isRecruiter.ok) return isRecruiter.response;

    const {status}: IApplication = await reqest.json();
    const application = await Application.findByIdAndUpdate(
      params.id,
      {
        $set: {
          status,
        }
      }
    );
    if (!application) {
      return NextResponse.json(
        { message: "Application not found", success: false },
        { status: 404 }
      );
    }
    application.status = "accepted";
    await application.save();
    return NextResponse.json({ application }, { status: 200 });
  } catch (error) {
    console.log("Job get error", error);
    throw error;
  }
}



// jobseeker get his applications
export async function GET(reqest: NextRequest, { params }: Params) {
  try {
    const isJobSaker = await withAuth(reqest, { allowedRoles: ROLE.JOBSEEKER });
    if (!isJobSaker.ok) return isJobSaker.response;

    await connectToDatabase();
    const application = await Application.findById(params.id);
    if (!application) {
      return NextResponse.json(
        { message: "Application not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json({ application }, { status: 200 });
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