import { ActiveStatus, Company } from "@/app/models/Company";
import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    await connectToDatabase();

    const now = new Date();

    const experyDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

     await Company.deleteMany({
      activeStatus: ActiveStatus.BLACKLISTED,
      recoveryLastDate: { $lt: experyDate },
    });


    return NextResponse.json( { status: 200 });



  } catch (error: unknown) {
    console.log("Delete expired blacklisted error", error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json(
      { message: errorMessage, success: false },
      { status: 500 }
    );
  }
}
