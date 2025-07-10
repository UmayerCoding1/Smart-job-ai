import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import { User } from "@/app/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        try {
          await connectToDatabase();

          const user = await User.findOne({ email: credentials.email });

          // chack if user exists
          if (!user) {
            throw new Error("User not found");
          }

          // chack if password is correct
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValidPassword) {
            throw new Error("Invalid password");
          }

          // chack OTP verification
          if (!user.isOtpVerified) {
            return NextResponse.json(
              {
                message: "OTP not verified",
                redirect: "/verify",
                success: false,
              },
              { status: 400 }
            );
          }

          console.log(user);

          return user;
        } catch (error) {
          console.log("User login error", error);
          throw new Error("User login error");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
        if (user) {
        token.id = user.id;
      }

    (await cookies()).set('token', JSON.stringify(token), {
      httpOnly: true,
      maxAge: 2 *24 * 60 * 60 * 1000 ,
      path: '/',
      sameSite: 'strict',
    })
      return token;
    },

      async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
  }
