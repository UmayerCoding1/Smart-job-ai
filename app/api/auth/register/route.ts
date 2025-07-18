import { IUser, User } from "@/app/models/User";
import { connectToDatabase } from "@/lib/db";


import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { fullname, email, password, role,loginMethod }: IUser = await request.json();
  
    if (!fullname || !email || !password || !role || !loginMethod) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { message: "User already exists", success: false },
        { status: 400 }
      );
    }



    const user = await User.create({
      fullname,
      email,
      password,
      role,
      loginMethod
    });

    return NextResponse.json(
      { message: "User registered successfully", success: true, user },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "User reginter failed", success: false },
      { status: 500 }
    );
  }
}
