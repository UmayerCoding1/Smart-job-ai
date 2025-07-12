import { IJob, Job } from "@/app/models/Job";
import { Params } from "@/app/types/Interface";
import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET({ params }: Params) {
  try {
    await connectToDatabase();
    const job = await Job.findById(params.id);
    return NextResponse.json({ job }, { status: 200 });
  } catch (error) {
    console.log("Job get error", error);
    throw error;
  }
};

export async function DELETE({ params }: Params) {
  try {
    await connectToDatabase();
    await Job.findByIdAndDelete(params.id);
    return NextResponse.json(
      { message: "Job deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Job get error", error);
    throw error;
  }
};



export async function PUT(request: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();
    const body: IJob = await request.json();
    const job = await Job.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json({ job }, { status: 200 });
  } catch (error) {
    console.log("Job get error", error);
    throw error;
  }
};