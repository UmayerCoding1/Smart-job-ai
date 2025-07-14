import { ActiveStatus, Company, ICompany } from "@/app/models/Company";
import { Params } from "@/app/types/Interface";
import { connectToDatabase } from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextRequest, NextResponse } from "next/server";

// recruiter get his company
export async function GET(request: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();
   console.log(params.id);
   
    const isRecruiter = await withAuth(request, { allowedRoles: "recruiter" });
    if (!isRecruiter.ok) return isRecruiter.response;

    const company = await Company.findById(params.id);

    if (!company) {
      return NextResponse.json(
        { message: "Company not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json({ company }, { status: 200 });
  } catch (error) {
    console.log("Company get error", error);
    throw error;
  }
}

// admin can update company status
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();

    const isAdmin = await withAuth(request, { allowedRoles: "admin" });
    if (!isAdmin.ok) return isAdmin.response;

    const { activeStatus }: ICompany = await request.json();

    if (
      activeStatus !== ActiveStatus.ACTIVE &&
      activeStatus !== ActiveStatus.INACTIVE &&
      activeStatus !== ActiveStatus.BLACKLISTED
    ) {
      return NextResponse.json(
        { message: "Invalid activeStatus", success: false },
        { status: 400 }
      );
    }

    if (activeStatus === ActiveStatus.BLACKLISTED) {
      const company = await Company.findByIdAndUpdate(
        params.id,
        {
          $set: {
            activeStatus,
            recoveryLastDate: new Date(),
          },
        },
        { new: true }
      );
      return NextResponse.json(
        { message: "Company blacklisted successfully", company },
        { status: 200 }
      );
    } else {
      const company = await Company.findByIdAndUpdate(
        params.id,
        {
          $set: {
            activeStatus,
          },
        },
        { new: true }
      );
      return NextResponse.json(
        { message: "Company updated successfully", company },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    console.log("Company get error", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        message: "Failed to update company",
        error: errorMessage,
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();
    
    const isAdmin = await withAuth(request, { allowedRoles: "admin" });
    if (!isAdmin.ok) return isAdmin.response;

    await Company.findByIdAndDelete(params.id);
    return NextResponse.json(
      { message: "Company deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Company get error", error);
    throw error;
  }
}
