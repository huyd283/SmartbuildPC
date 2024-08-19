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
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname(); 
  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) {
    return (
      <html lang="en">
        <body className={inter.className}>
        <Toaster   
      position="bottom-center"
      reverseOrder={false}
    />
          <AdminLayout>
            {children}
          </AdminLayout>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={inter.className}>
      <Toaster   
      position="bottom-center"
      reverseOrder={false}
    />
        <StoreProvider>
          <Header />
          {/* <Navigation /> */}
          {children}
          <ChatBox/>
          <Footer />
          <BackToTop />
        </StoreProvider>
      </body>
    </html>
  );
}
