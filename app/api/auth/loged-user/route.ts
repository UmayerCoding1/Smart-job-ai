import { User } from "@/app/models/User";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectToDatabase();

        const session = await getServerSession(authOptions);
        const user = await User.findOne({ email: session?.user?.email });

        if (!user) {
            return NextResponse.json(
              { message: "User not found", success: false },
              { status: 404 }
            );
        } else {
            return NextResponse.json({ user }, { status: 200 });
            
        }
        
    } catch (error) {
        console.log('loged user get error', error);
        const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
        return NextResponse.json(
          { message: errorMessage, success: false },
          { status: 500 }
        );
    }
}