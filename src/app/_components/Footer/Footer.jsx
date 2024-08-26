"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const showHeader =
    pathname === "/sign-in" || pathname === "/create-account" || pathname === "/login"   ? false : true;
  return (
    <footer
      className={`${
        !showHeader && "hidden"
      } bg-[#e4e8ec] flex flex-col w-full`}
    >
      <div className="container relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 pt-8 mb-10 gap-y-4">
        <div className="flex flex-col gap-y-4 lg:gap-y-8 px-4 text-left text-sm">
          <h3 className="text-base font-semibold uppercase">GIỚI THIỆU</h3>
          <p>
            Chuyên mua bán các loại linh kiện PC – chính hãng tại Hà Nội. Cung
            cấp hỗ trợ các loại giấy tờ CO, CQ, chứng thư bán hàng.
          </p>
          <p>Hỗ trợ chương trình bán hàng </p>
          <p>Hỗ trợ giá tốt nhất tại thời điểm giao dịch</p>
          <p>Luôn mang đến khách hàng sản phẩm và dịch vụ tốt nhất</p>
        </div>
        <div className="flex flex-col gap-y-4 lg:gap-y-8 px-4 text-left text-sm">
          <h3 className="text-base font-semibold uppercase">
            THÔNG TIN LIÊN HỆ
          </h3>
          <Link href={"/"} className="hover:text-red-500">
            <span>
              <strong>Zalo:</strong> 0123.456.789
            </span>
          </Link>
          <Link href={"/"} className="hover:text-red-500">
            <span>
              <strong>Hotline:</strong> 0123.456.789
            </span>
          </Link>
          <Link
            href={"https://maps.app.goo.gl/yGwCj46oZEW5zNWn7"}
            className="hover:text-red-500"
          >
            <span>
              <strong>Address:</strong> Khu Giáo dục và Đào tạo – Khu Công nghệ
              cao Hòa Lạc – Km29 Đại lộ Thăng Long, H. Thạch Thất, TP. Hà Nội
            </span>
          </Link>
          <Link
            href={"https://www.facebook.com/"}
            className="hover:text-red-500"
          >
            <span>
              <strong>Facebook:</strong> fb.com
            </span>
          </Link>
          <Link
            href={"https://maps.app.goo.gl/yGwCj46oZEW5zNWn7"}
            className="hover:text-red-500"
          >
            <span>
              <strong>Gmail:</strong> daihocfpt@fpt.edu.vn
            </span>
          </Link>
        </div>
        <div className="flex flex-col gap-y-4 lg:gap-y-8 px-4 text-left text-sm">
          <h3 className="text-base font-semibold uppercase">
            HỖ TRỢ KHÁCH HÀNG
          </h3>
          <Link href={"/san-pham"} className="hover:text-red-500">
            <span>Danh sách sản phẩm</span>
          </Link>
          <Link href={"/kiem-tra-thanh-toan"} className="hover:text-red-500">
            <span>Tra cứu đơn hàng của bạn</span>
          </Link>
          <Link href={"/admin-login"} className="hover:text-red-500">
            <span>Account</span>
          </Link>
          <Link href={"/chuyen-muc/tin-tuc"} className="hover:text-red-500">
            <span>Tin tức mới</span>
          </Link>
          <Link href={"/lien-he"} className="hover:text-red-500">
            <span>Liên hệ với chúng tôi</span>
          </Link>
        </div>
      </div>
      <div className="w-full text-center py-2 lg:py-4 text-sm text-[#df4b4b]">
        <strong>Copyright 2024 © Build PC Smart</strong>
      </div>
    </footer>
  );
}
