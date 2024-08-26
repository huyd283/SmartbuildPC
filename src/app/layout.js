'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Footer, Header, Navigation } from "./_components";
import { BackToTop } from "@/components/_personal";
import { usePathname, useRouter } from 'next/navigation';
import AdminLayout from './_components/AdminLayout/AdminLayout'; 
import  { Toaster } from "react-hot-toast";
import ChatBox from "@/components/_personal/chatBox";
import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname(); 
  const router = useRouter();
  const isAdminPath = pathname.startsWith('/admin');

  const [userRole, setUserRole] = useState(null);
 
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const decodedToken = jwtDecode(user.tokenInformation.accessToken);
      setUserRole(decodedToken.role); 

      // Kiểm tra quyền truy cập
      if (isAdminPath && decodedToken.role !== 'ADMIN') {
        router.push('/'); 
      } else if (!isAdminPath && decodedToken.role === 'ADMIN') {
        router.push('/admin'); 
      }
    } else {
      // Nếu không có thông tin người dùng và cố gắng truy cập trang admin
      if (isAdminPath) {
        router.push('/login');
      }
    }
  }, [isAdminPath, router]);

  // Nếu chưa xác định được role, hiển thị loading hoặc null
  if (userRole === null && isAdminPath) return null;
  
  return (
    <html lang="en">
      <head>
        <title>{isAdminPath ? 'Admin Dashboard' : 'SmartPC'}</title>
        <meta name="description" content={isAdminPath ? 'Admin dashboard management' : 'Description of your website'} />
      </head>
      <body className={inter.className}>
        <Toaster position="bottom-center" reverseOrder={false} />
        {isAdminPath ? (
          <AdminLayout>
            {children}
          </AdminLayout>
        ) : (
          <StoreProvider>
            <Header />
            <div className="mt-24 min-h-[58vh]">
              {children}
            </div>
            {/* <ChatBox /> */}
            <Footer />
            <BackToTop />
          </StoreProvider>
        )}
      </body>
    </html>
  );
}
