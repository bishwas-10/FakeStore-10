import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./_components/Sidebar/sidebar";
import Header from "./_components/Header/header";
import { ThemeProvider } from "@/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce Admin",
  description: "Eccomerce app admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <div className="bg-boxdark-2 text-bodydark w-full flex flex-row">
         {/* <div className="w-2/12 bg-gray-300 p-2 text-black">
         <Sidebar/>
         </div> */}
        {/* <div className="flex flex-col w-full bg-gray-100 h-screen overflow-hidden">
           </div>  
            <Header/>  */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="  bg-white dark:bg-black w-full flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <div className="py-2 flex-col flex">
              <Header/>
              {children}
            </div>
            
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
