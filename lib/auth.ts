import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import { User } from "@/app/models/User";
import bcrypt from "bcryptjs";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDatabase();

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid credentials");
          }

          const user = await User.findOne({ email: credentials?.email });

          if (!user) throw new Error("No user found");

          const isVerifyPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isVerifyPassword) {
            throw new Error("Incorrect password");
          }

          if (!user.isOtpVerified) {
            throw new Error("OTP_NOT_VERIFIED");
          }

          // return {
          //   id: user._id.toString(),
          //   email: user.email,
          //   name: user.name,
          // };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {},
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
};
