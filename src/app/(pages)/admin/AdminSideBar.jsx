import Link from 'next/link'
import React, { useState } from 'react'

export async function getServerSideProps(context) {
  const { params, query, req } = context
  const currentPath = req.url
  const pathSegments = currentPath.split('/')
  const lastSegment = pathSegments[pathSegments.length - 1]

  return {
    props: {
      lastPath: lastSegment
    }
  }
}
export default function AdminSidebar() {
  const [lastSegment, setActivePath] = useState('/')

  function onClickLogout() {}

  return (
    <div>
      <nav className="bg-slate-400 fixed left-0 top-0 flex flex-col h-full px-3 py-4 shadow-md pt-3" style={{ zIndex: 10, width: '256px' }}>
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0">
          <div>
            <ul className="flex list-none flex-col w-full">
           

              <hr className="my-4 w-full"/>
              {/* Heading */}
              <span className="mr-2 block pb-4 pt-1 text-sm font-bold uppercase text-info w-full">
              Sản phẩm
              </span>

              <li className="flex items-center">
                <Link href="/admin-add-product">
                <span
                    className={`block py-3 text-xs font-bold uppercase cursor-pointer ${
                        lastSegment === '/admin-add-product' ? 'text-green-400' : 'text-white'
                    }`}
                    onClick={() => setActivePath('/admin-add-product')}
                >
                  <i
                      className={`text-sm cursor-pointer ${
                          lastSegment === '/admin-add-product' ? 'text-green-400' : 'text-white'
                      }`}
                  >
                  Thêm sản phẩm mới
                  </i>
                </span>
                </Link>
              </li>

              <li className="flex items-center">
                <Link href="/admin-manager-product">
                <span
                    className={`block py-3 text-xs font-bold uppercase cursor-pointer ${
                        lastSegment === '/admin-manager-product' ? 'text-green-400' : 'text-white'
                    }`}
                    onClick={() => setActivePath('/admin-manager-product')}
                >
                  <i
                      className={`text-sm cursor-pointer ${
                          lastSegment === '/admin-manager-product' ? 'text-green-400' : 'text-white'
                      }`}
                  >
                  Quản lý sản phẩm
                  </i>
                </span>
                </Link>
              </li>
            {/*   <hr className="my-4 w-full"/>
              <span className="mr-2 block pb-4 pt-1 text-xs font-bold uppercase text-info w-full">
              Banner
              </span>
              <li className="flex items-center ">
                <Link href="/admin-add-banner">
                <span
                    className={`block py-3 text-xs font-bold uppercase cursor-pointer ${
                        lastSegment === '/admin-add-banner' ? 'text-green-400' : 'text-white'
                    }`}
                    onClick={() => setActivePath('/admin-add-banner')}
                >
                  <i
                      className={`text-sm cursor-pointer ${
                          lastSegment === '/admin-add-banner' ? 'text-green-400' : 'text-white'
                      }`}
                  >
                  Tạo banner mới
                  </i>
                </span>
                </Link>
              </li>

              <li className="flex items-center">
                <Link href="/admin-manager-banner">
                <span
                    className={`block py-3 text-xs font-bold uppercase cursor-pointer ${
                        lastSegment === '/admin-manager-banner' ? 'text-green-400' : 'text-white'
                    }`}
                    onClick={() => setActivePath('/admin-manager-banner')}
                >
                  <i
                      className={`text-sm cursor-pointer ${
                          lastSegment === '/admin-manager-banner' ? 'text-green-400' : 'text-white'
                      }`}
                  >
                  Quản lý banner
                  </i>
                </span>
                </Link>
              </li>
              <hr className="my-4 w-full"/>
              <span className="mr-2 block pb-4 pt-1 text-xs font-bold uppercase text-info w-full">
              Bài viết tin tức
              </span>
              <li className="flex items-center">
                <Link href="/admin-add-post">
                <span
                    className={`block py-3 text-xs font-bold uppercase cursor-pointer ${
                        lastSegment === '/admin-add-post' ? 'text-green-400' : 'text-white'
                    }`}
                    onClick={() => setActivePath('/admin-add-post')}
                >
                  <i
                      className={`text-sm cursor-pointer ${
                          lastSegment === '/admin-add-post' ? 'text-green-400' : 'text-white'
                      }`}
                  >
                  Tạo mới bài viết tin tức
                  </i>
                </span>
                </Link>
              </li>
              <li className="flex items-center">
                <Link href="/admin-manager-post">
                <span
                    className={`block py-3 text-xs font-bold uppercase cursor-pointer ${
                        lastSegment === '/admin-manager-post' ? 'text-green-400' : 'text-white'
                    }`}
                    onClick={() => setActivePath('/admin-manager-post')}
                >
                  <i
                      className={`text-sm cursor-pointer ${
                          lastSegment === '/admin-manager-post' ? 'text-green-400' : 'text-white'
                      }`}
                  >
                  Quản lý bài viết
                  </i>
                </span>
                </Link>
              </li> */}

              <hr className="my-4 w-full"/>
              {/* Heading */}

              <li className="flex items-center">
                <button type="button" onClick={onClickLogout} className="btn btn-link">
                <span
                    className={`block py-3 text-xs font-bold uppercase cursor-pointer ${
                        lastSegment === '/admin-login' ? 'text-info' : 'text-white'
                    }`}
                    onClick={() => setActivePath('/admin-login')}
                >
                  <i
                      className={`text-sm cursor-pointer ${
                          lastSegment === '/admin-login' ? 'text-info' : 'text-white'
                      }`}
                  >
                  Đăng xuất
                  </i>
                </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
