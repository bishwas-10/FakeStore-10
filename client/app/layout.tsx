import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header/header";
import { ThemeProvider } from "@/providers/theme-provider";
import ReduxProvider from "@/utils/ReduxProvider";
import ProtectedRoute from "@/hooks/useRequireAuth";

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
     
        <ReduxProvider>
          <ProtectedRoute>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="  bg-white dark:bg-black w-full flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <div className="py-2 flex-col flex">
                  <Header />
                  {children}
                </div>
              </div>
            </ThemeProvider>
          </ProtectedRoute>
        </ReduxProvider>
      </body>
    </html>
  );
}
