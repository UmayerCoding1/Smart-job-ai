import React from "react";
import { SheetContent, SheetDescription, SheetHeader } from "./ui/sheet";
import { IUser } from "@/app/models/User";
import { useSelector } from "react-redux";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  BriefcaseBusiness,
  ChevronRight,
  FileCheck2,
  FilePenLine,
  HeartHandshake,
  Info,
  Rss,
  Settings,
  Shield,
  User,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { RootState } from "@/app/redux/store";

const UserImage = "/assets/user.png";

const NavlinkList = ({ session }: { session: { user: IUser } | null }) => {
  const user = useSelector((state: RootState) => state.authR.user);
  const firstName = user?.fullname.split(" ")[0];
  const lastName = user?.fullname.split(" ")[1];
 console.log(user);
 

  const authenticatedRoutes = [
    { lable: "Profile", link: "/profile", icon: User },
    { lable: "My Applications", link: "/my-applications", icon: FileCheck2 },
    { lable: "Resume Builder", link: "/resume-builder", icon: FilePenLine },
    { lable: "Settings", link: "/settings", icon: Settings },
  ];

  const globleRoutes = [
    { lable: "Companys", link: "/companies", icon: BriefcaseBusiness },
    { lable: "Blog", link: "/blog", icon: Rss },
    { lable: "About US", link: "/about-us", icon: Info },
    { lable: "Support", link: "/support", icon: HeartHandshake },
    { lable: "Policy", link: "/policy", icon: Shield },
  ];

  const handleLogOut = async () => {
    const res = await signOut();
    console.log(res);

    if (res) {
    }
  };
  return (
    <SheetContent>
      <SheetHeader>
        {/* <SheetTitle>Are you absolutely sure?</SheetTitle> */}
        <SheetDescription>
          <div>
            {session?.user && (
              <div>
                <div className=" flex flex-col items-center justify-center">
                  {user?.avatar ? (
                    <Image
                      src={user?.avatar || UserImage}
                      alt="avatar"
                      width={100}
                      height={100}
                      className="w-32 h-32 rounded-full"
                    />
                  ) : (
                    <div>
                      <Button className="w-32 h-32 flex items-center gap-0 text-5xl font-bold">
                        <span>{firstName?.charAt(0) || ""}</span>
                        <span>{lastName?.charAt(0) || ""}</span>
                      </Button>
                    </div>
                  )}

                  <div className="text-center mt-3 ">
                    <p className="text-lg text-black font-medium">
                      {user?.fullname}
                    </p>
                    <p>{user?.email}</p>
                  </div>
                </div>
                <hr className="mt-3" />

                <div className="mt-3">
                  <ul className="flex flex-col gap-2">
                    {authenticatedRoutes.map((route, inx) => (
                      <Link
                        key={inx}
                        href={route.link}
                        className="cursor-pointer p-2 text-black hover:bg-gray-100 rounded-lg flex items-center justify-between"
                      >
                        <div className="flex items-center gap-1">
                          {route.icon && <route.icon size={15} />}
                          <span className="text-sm font-medium">
                            {route.lable}
                          </span>
                        </div>

                        <ChevronRight size={15} />
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div>
              {session?.user && <hr className="mt-3" />}

              <div>
                <ul className="flex flex-col gap-2">
                  {globleRoutes.map((route, inx) => (
                    <Link
                      key={inx}
                      href={route.link}
                      className="cursor-pointer p-2 text-black hover:bg-gray-100 rounded-lg flex items-center justify-between"
                    >
                      <div className="flex items-center gap-1">
                        {route.icon && <route.icon size={15} />}
                        <span className="text-sm font-medium">
                          {route.lable}
                        </span>
                      </div>

                      <ChevronRight size={15} />
                    </Link>
                  ))}
                </ul>
              </div>

              <hr className="my-4" />

              <div>
                {session?.user ? (
                  <Button
                    onClick={() => handleLogOut()}
                    variant="destructive"
                    className=" w-full cursor-pointer"
                  >
                    Logout
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white w-full cursor-pointer">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default NavlinkList;
