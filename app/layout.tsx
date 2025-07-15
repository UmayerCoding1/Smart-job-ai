// app/layout.tsx or app/layout.jsx

import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import ReduxProvider from "@/lib/ReduxProvider";
import QueryProvider from "@/lib/QueryProvider";


// Metadata
export const metadata: Metadata = {
  title: "Smart Job AI",
  icons: "/favicon.png",
  description: "AI-powered job platform",
};

// Layout component
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en" >
      <body className="antialiased bg-white dark:bg-slate-900">
        <QueryProvider>
          <ReduxProvider>
            <Navbar session={session} />
            <main>{children}</main>

            <div className="h-screen" />
            <footer>this is footer</footer>
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
