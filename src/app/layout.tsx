import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu";
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import NextAuthProvider from "@/providers/NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <NextAuthProvider session = {session}>
            <TopMenu />
            {children}
          </NextAuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
