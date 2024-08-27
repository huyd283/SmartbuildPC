import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export async function getServerSideProps(context) {
  const { req } = context;
  const currentPath = req.url;
  const pathSegments = currentPath.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  return {
    props: {
      lastPath: lastSegment,
    },
  };
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [lastSegment, setActivePath] = useState("/");
  const [role, setRole] = useState(null); // Thêm state để lưu role của người dùng
  const showHeader = pathname !== "/admin-login";

  function onClickLogout() {
    window.location.href = "/login";
    localStorage.clear();
  }

  const checkRole = () => {
    const response = JSON.parse(localStorage.getItem("currentUser"));
    if (response) {
      const decodedToken = jwtDecode(response.tokenInformation.accessToken);
      const userRole = decodedToken?.role;
      setRole(userRole);
      if (userRole === "CUSTOMER") {
        window.location.href = "/";
      }
    }
  };

  useEffect(() => {
    checkRole();
  }, []);

  return (
    <div className={`${!showHeader && "hidden"} `}>
      <nav className="bg-slate-400 fixed left-0 top-0 flex flex-col h-full px-3 py-4 shadow-md pt-3 z-10 w-40 lg:w-52 md:w-52 sm:w-48">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0">
          <div>
            <ul className="flex list-none flex-col w-full">
              <hr className="my-4 w-full" />
              <span className="mr-2 block pb-4 pt-1 text-sm font-bold uppercase text-info w-full">
                Home Page
              </span>

              <li className="flex items-center">
                <Link href="/admin-dashboard">
                  <span
                    className={`block py-3 text-xs font-bold uppercase cursor-pointer ${
                      lastSegment === "/admin-dashboard"
                        ? "text-green-400"
                        : "text-white"
                    }`}
                    onClick={() => setActivePath("/admin-dashboard")}
                  >
                    <i
                      className={`text-sm cursor-pointer ${
                        lastSegment === "/admin-dashboard"
                          ? "text-green-400"
                          : "text-white"
                      }`}
                    >
                      Dashboard
                    </i>
                  </span>
                </Link>
              </li>
              <hr className="my-4 w-full" />
              <span className="mr-2 block pb-4 pt-1 text-sm font-bold uppercase text-info w-full">
                PRODUCTS
              </span>

              <li className="flex items-center">
                <Link href="/admin-add-product">
                  <span
                    className={`block py-3 text-xs font-bold uppercase cursor-pointer ${
                      lastSegment === "/admin-add-product"
                        ? "text-green-400"
                        : "text-white"
                    }`}
                    onClick={() => setActivePath("/admin-add-product")}
                  >
                    <i
                      className={`text-sm cursor-pointer ${
                        lastSegment === "/admin-add-product"
                          ? "text-green-400"
                          : "text-white"
                      }`}
                    >
                      New Product
                    </i>
                  </span>
                </Link>
              </li>

              <li className="flex items-center">
                <Link href="/admin-manager-product">
                  <span
                    className={`block py-3 text-xs font-bold uppercase cursor-pointer ${
                      lastSegment === "/admin-manager-product"
                        ? "text-green-400"
                        : "text-white"
                    }`}
                    onClick={() => setActivePath("/admin-manager-product")}
                  >
                    <i
                      className={`text-sm cursor-pointer ${
                        lastSegment === "/admin-manager-product"
                          ? "text-green-400"
                          : "text-white"
                      }`}
                    >
                      Product Management
                    </i>
                  </span>
                </Link>
              </li>

              <hr className="my-4 w-full" />
              <span className="mr-2 block pb-4 pt-1 text-xs font-bold uppercase text-info w-full">
                Order
              </span>

              <li className="flex items-center">
                <Link href="/admin-order">
                  <span
                    className={`block py-3 text-xs font-bold uppercase cursor-pointer ${
                      lastSegment === "/admin-order"
                        ? "text-green-400"
                        : "text-white"
                    }`}
                    onClick={() => setActivePath("/admin-order")}
                  >
                    <i
                      className={`text-sm cursor-pointer ${
                        lastSegment === "/admin-order"
                          ? "text-green-400"
                          : "text-white"
                      }`}
                    >
                      Order Management
                    </i>
                  </span>
                </Link>
              </li>

              <hr className="my-4 w-full" />

              {role === "ADMIN" && ( // Chỉ hiển thị menu Account nếu role là ADMIN
                <>
                  <span className="mr-2 block pb-4 pt-1 text-xs font-bold uppercase text-info w-full">
                    Account
                  </span>

                  <li className="flex items-center">
                    <Link href="/admin-account">
                      <span
                        className={`block py-3 text-xs font-bold uppercase cursor-pointer ${
                          lastSegment === "/admin-account"
                            ? "text-green-400"
                            : "text-white"
                        }`}
                        onClick={() => setActivePath("/admin-account")}
                      >
                        <i
                          className={`text-sm cursor-pointer ${
                            lastSegment === "/admin-account"
                              ? "text-green-400"
                              : "text-white"
                          }`}
                        >
                          Account Management
                        </i>
                      </span>
                    </Link>
                  </li>
                  <hr className="my-4 w-full" />
                </>
              )}

              <li className="flex items-center">
                <Link href="/admin-profile">
                  <span
                    className={`block py-3 text-xs font-bold uppercase cursor-pointer ${
                      lastSegment === "/admin-profile"
                        ? "text-green-400"
                        : "text-white"
                    }`}
                    onClick={() => setActivePath("/admin-profile")}
                  >
                    <i
                      className={`text-sm cursor-pointer ${
                        lastSegment === "/admin-profile"
                          ? "text-green-400"
                          : "text-white"
                      }`}
                    >
                      Setting
                    </i>
                  </span>
                </Link>
              </li>
              <li className="flex items-center">
                <button
                  type="button"
                  onClick={onClickLogout}
                  className="btn btn-link"
                >
                  <span
                    className={`block py-3 text-xs font-bold uppercase cursor-pointer ${
                      lastSegment === "/admin-login"
                        ? "text-info"
                        : "text-white"
                    }`}
                    onClick={() => setActivePath("/admin-login")}
                  >
                    <i
                      className={`text-sm cursor-pointer ${
                        lastSegment === "/admin-login"
                          ? "text-info"
                          : "text-white"
                      }`}
                    >
                      Log Out
                    </i>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
