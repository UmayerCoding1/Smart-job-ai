import  { DefaultUser } from "next-auth";
import { IUser } from "./app/models/User";
// import { IUser } from "./app/models/User";
// import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: IUser;
  }

  interface User extends DefaultUser {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}


// declare module "next-auth" {
//   interface Session {
//     user: IUser | null
//   }
// }