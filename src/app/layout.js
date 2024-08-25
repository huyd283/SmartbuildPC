'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Footer, Header, Navigation } from "./_components";
import { BackToTop } from "@/components/_personal";
import { usePathname } from 'next/navigation';
import AdminLayout from './_components/AdminLayout/AdminLayout'; 
import  { Toaster } from "react-hot-toast";
import ChatBox from "@/components/_personal/chatBox";
import metadata from './metadata';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname(); 
  const isAdmin = pathname.startsWith('/admin');
  
  if (isAdmin) {
    return (
      <html lang="en">
        <head>
          <title>Admin Dashboard</title>
          <meta name="description" content="Admin dashboard management" />
        </head>
        <body className={inter.className}>
          <Toaster position="bottom-center" reverseOrder={false} />
          <AdminLayout>
            {children}
          </AdminLayout>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      {/* <head>
        <title> SmartPC </title>
        <meta name="description" content="Description of your website" />
      </head> */}
      <body className={inter.className}>
        <Toaster position="bottom-center" reverseOrder={false} />
        <StoreProvider>
          <Header />
          <div className="min-h-[58vh]">
            {children}
          </div>
          <ChatBox />
          <Footer />
          <BackToTop />
        </StoreProvider>
      </body>
    </html>
  );
}
