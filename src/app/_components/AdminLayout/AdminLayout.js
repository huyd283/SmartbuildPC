import AdminSidebar from '@/app/(pages)/admin/AdminSideBar';
import React from 'react';

const AdminLayout = ({ children }) => {
  return (
    <div>
      <AdminSidebar/>
      {children}
    </div>
  );
};

export default AdminLayout;