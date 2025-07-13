"use client";
import { getSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SessionChecker() {
  useEffect(() => {
    (async () => {
      const session = await getSession();
      console.log("📦 Session (client):", session);
    })();
  }, []);

  return null;
}
