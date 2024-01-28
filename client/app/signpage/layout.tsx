import type { Metadata } from "next";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "sign in",
  description: "Eccomerce app admin signin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <main className=" bg-white dark:bg-black dark:text-white">
       {children}
      </main>
    
  );
}
