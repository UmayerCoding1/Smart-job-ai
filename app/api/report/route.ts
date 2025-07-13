import { IReport, Report } from "@/app/models/Report";
import { getUserId } from "@/lib/getToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { jobId, type, reason }: IReport = await request.json();
    const userId = getUserId(request);

    if (!jobId || !type || !reason || !userId) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    } else {
      await Report.create({ jobId, userId, type, reason });
      return NextResponse.json(
        { message: "Report submitted successfully", success: true },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("Report submit error", error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json(
      { message: errorMessage, success: false },
      { status: 500 }
    );
  }
}
