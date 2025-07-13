import { User } from "@/app/models/User";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface Options {
  allowedRoles?: string;
}


export const withAuth = async (
  request: NextRequest,
  options: Options
): Promise<
  { ok: true; token: unknown } | { ok: false; response: NextResponse }
> => {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return {
      ok: false,
      response: NextResponse.json(
        { message: "Not authorized 1" },
        { status: 401 }
      ),
    };
  }
// console.log(token);

  const user = await User.findById(token.id);
 console.log(user);
 
  if (options.allowedRoles !== user.role) {
    return {
      ok: false,
      response: NextResponse.json(
        { message: "Not authorized" },
        { status: 401 }
      ),
    };
  }

  return { ok: true, token };
};
