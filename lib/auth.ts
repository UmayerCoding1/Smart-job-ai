import { NextAuthOptions } from "next-auth";
import type { User as NextAuthUser, Account, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GooglePrpovider from "next-auth/providers/google";
import { connectToDatabase } from "./db";
import { User } from "@/app/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GooglePrpovider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {

    async signIn({
      user,
      account,
    }: {
      user: NextAuthUser;
      account: Account | null;
    }) {
      if (account?.provider === "google") {
        try {
          await connectToDatabase();

          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            await User.create({
              fullname: user.name,
              email: user.email,
              avatar: user.image,
              loginMethod: "google",
              googleId: account.providerAccountId,
            });
          }

          return true;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
      return true;
    },

    async jwt({ token, user }: { token: JWT; user: NextAuthUser }) {
      if (user) {
        console.log(user);
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET!,
};
