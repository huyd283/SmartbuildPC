"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../src/css/style2020_zip.css"
import "../../src/css/media2020.css"
import { useEffect, useState } from "react";
import { getData } from "@/service/Api-service/apiProducts";

export default function Home() {

  const pathname = usePathname();
  const [listCPU, setListCPU] = useState([]);
  const [listMainboard, setListMainboard] = useState([]);
  const [listRAM, setListRAM] = useState([]);
  const [listSSD, setListSSD] = useState([]);
  const [listHDD, setListHDD] = useState([]);
  const [listVGA, setListVGA] = useState([]);
  const [listPSU, setListPSU] = useState([]);
  const [listCase, setListCase] = useState([]);
  const [listColling, setListColling] = useState([]);
  const [listKeyboard, setListKeyboard] = useState([]);
  const [listMouse, setListMouse] = useState([]);
  const [listMonitor, setListMonitor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCPU = await getData(1);
        setListCPU(resCPU.result);
        const resMainboard = await getData(2);
        setListMainboard(resMainboard.result);

        const resRAM = await getData(3);
        setListRAM(resRAM.result);
        const resSSD = await getData(4);
        setListSSD(resSSD.result);
        const resHDD = await getData(5);
        setListHDD(resHDD.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

  }, []);

  const showHeader =
    pathname === "/sign-in" || pathname === "/create-account" ? false : true;
  return (
    <>

      <div className="container-2019 ">
        {/* <div className="homepage-slider-2019">
          <div className="homepage-slider-left">
            <ul className="ul ul_menu_2019 boxshadowx2023" id="menu-2019">
              <li
                id="vt-1106"
                className="js-hover-menu li-catcha-menu"

              >
                <a href="/laptop-tablet-mobile" className="root">
                  CPU
                </a>

                <span className="arrow-li-catcha-menu" />
              </li>
              <li
                id="vt-1087"
                className="js-hover-menu li-catcha-menu"

              >
                <a href="/laptop-gaming-do-hoa" className="root">
                  MainBoard
                </a>

                <span className="arrow-li-catcha-menu" />
              </li>
              <li
                id="vt-455"
                className="js-hover-menu li-catcha-menu"

              >
                <a href="/phu-kien" className="root">
                  RAM
                </a>

                <span className="arrow-li-catcha-menu" />
              </li>
              <li
                id="vt-178"
                className="js-hover-menu li-catcha-menu"

              >
                <a href="/pc-gaming-streaming" className="root">
                  SSD
                </a>

                <span className="arrow-li-catcha-menu" />
              </li>
              <li
                id="vt-388"
                className="js-hover-menu li-catcha-menu"

              >
                <a href="/pc-workstations" className="root">
                  HDD
                </a>

                <span className="arrow-li-catcha-menu" />
              </li>
              <li
                id="vt-137"
                className="js-hover-menu li-catcha-menu"

              >
                <a href="/may-tinh-de-ban" className="root">
                  PC - Văn Phòng, L�&nbsp;m Việc
                </a>

                <span className="arrow-li-catcha-menu" />
              </li>
              <li
                id="vt-6"
                className="js-hover-menu li-catcha-menu"

              >
                <a href="/linh-kien-may-tinh" className="root">
                  Linh Kiện Máy Tính
                </a>

                <span className="arrow-li-catcha-menu" />
              </li>
              <li
                id="vt-379"
                className="js-hover-menu li-catcha-menu"
              >
                <a href="/tan-nhiet-cooling" className="root">
                  Tản Nhiệt, Fan, Đèn Led
                </a>

                <span className="arrow-li-catcha-menu" />
              </li>

              <li
                id="vt-12"
                className="js-hover-menu li-catcha-menu"

              >
                <a href="/thiet-bi-van-phong" className="root">
                  TB Văn Phòng, Hội Nghị
                </a>

                <span className="arrow-li-catcha-menu" />
              </li>

            </ul>
          </div>

        </div> */}

        <div id="cate-homepage-2023-com">
          <div
            className=" homepage-product-2019 d-inline-block w-100 js-category-home"
            id="boxcate-1106"
            style={{ minHeight: 400 }}
          >
            <div className="js-glee-block">
              <div className="title_box_center_2019 wow">
                <h2 className="h_title_2019">CPU</h2>

                <a href="/laptop-tablet-mobile" className="viewall">
                  Xem tất cả <i className="fal fa-long-arrow-right" />
                </a>
              </div>
            </div>
            <div className="js-glee-block">
              <div
                className="product-home custom-nav js-productslide-cate1106 owl-theme owl-loaded owl-drag"

              >
                <div className="owl-stage-outer">
                  <div
                    className="owl-stage flex"

                  >

                    {listCPU.slice(0, 5).map((val, index) => (
                      <div className="owl-item active" style={{ width: 236 }}>
                        <div
                          className="p-component loaded p-frame-bhmr-6m"

                        >
                          <div className="p-iconLTAU811">
                            <span className="bhmr-6m" />
                          </div>
                          <div className="p-img ajax-loading ajax-finished">
                            <a href="/" />
                            <div className="a">
                              <img
                                src="https://hanoicomputercdn.com/media/product/250_73001_laptop_asus_vivobook_go_e1404fa_18.png"
                                alt="Laptop Asus VivoBook E1404FA-NK177W (R5 7520U/16GB RAM/512GB SSD/14 FHD/Win11/Bạc)"
                                width={250}
                                height={250}
                              />
                            </div>
                          </div>
                          <div className="align-items-center d-flex flex-wrap my-2">

                            <p className="p-sku">Brand: {val.brand}</p>
                          </div>
                          <div className="p-info">
                            <p className="p-name" style={{ height: '30px' }}>
                              <a href="/laptop-asus-vivobook-e1404fa-nk177w-r5-7520u-16gb-ram-512gb-ssd-14-fhd-win11-bac">
                                {" "}
                                {val.productName}
                              </a>
                            </p>

                            <span className="p-price">  {val.price} VNĐ</span>
                            <span className="p-haskmai">
                              <i className="icons icon-gift" />{" "}
                            </span>
                          </div>

                          <div className="hover_content_pro tooltip-2019">
                            <a
                              href="/laptop-asus-vivobook-e1404fa-nk177w-r5-7520u-16gb-ram-512gb-ssd-14-fhd-win11-bac"
                              className="hover_name"
                            >
                              Laptop Asus VivoBook E1404FA-NK177W (R5 7520U/16GB
                              RAM/512GB SSD/14 FHD/Win11/Bạc)
                            </a>
                            <table>
                              <tbody>
                                <tr>
                                  <td>- Giá bán:</td>
                                  <td>
                                    <span className="img_price_full">
                                      {" "}
                                      14.499.000₫{" "}
                                    </span>
                                  </td>
                                </tr>
                                <tr className="p-extend-minprice">
                                  <td>- Giá HACOM:</td>
                                  <td className="p-extend-minprice-text">
                                    <span className="min_price"> 12.199.000₫</span>
                                    <span className="hover_vat">
                                      {" "}
                                      [Đã bao gồm VAT]{" "}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>- Bảo hành:</td>
                                  <td>24 Tháng (Pin 12 Tháng)</td>
                                </tr>
                              </tbody>
                            </table>
                            <span className="tooltip-title">
                              <i className="fal fa-layer-group" /> Thông số sản phẩm
                            </span>
                            <div className="hover_offer">
                              - CPU: AMD Ryzen™ R5 7520U
                              <br />- Ram: 16GB LPDDR5 (hàn liền)
                              <br />- Ổ cứng: 512GB M.2 NVMe™
                              <br />- VGA: AMD Radeon™ Graphics
                              <br />- Display: 14 inch FHD (1920 x 1080) 16:9, LED ,
                              60Hz, 250nits, 45% NTSC
                              <br />
                            </div>
                            <span className="tooltip-title">
                              <i className="fal fa-gift" /> Chương trình khuyến mại
                            </span>
                            <div className="hover_offer kmai-ndung">
                              <div className="km-title">
                                BỘ QUÀ TẶNG TRỊ GIÁ 999.000Đ
                              </div>
                              <ul>
                                <li>
                                  Tặng phiếu vệ sinh bảo dưỡng Laptop, PC miễn phí
                                  trọn đời trị giá 999.000đ (THEK417)
                                </li>
                              </ul>
                              <div className="km-title">
                                ƯU ĐÃI HẤP DẪN MUA KÈM LAPTOP
                              </div>
                              <ul>
                                <li>
                                  Giảm ngay 50.000đ khi mua Balo, Cặp, Túi chống sốc
                                  cao cấp thương hiệu WIWU
                                </li>
                                <li>
                                  Giảm ngay 100.000đ khi mua Ram Laptop thương hiệu
                                  KINGSTON
                                </li>
                                <li>
                                  Giảm ngay 100.000đ khi mua Ram Laptop thương hiệu
                                  LEXAR
                                </li>
                                <li>
                                  Giảm ngay 200.000đ khi mua Ghế công thái học thương
                                  hiệu LEGION
                                </li>
                                <li>
                                  Giảm ngay 300.000đ khi mua Ghế công thái học thương
                                  hiệu HBADA
                                </li>
                              </ul>
                              <div className="km-title">KHUYẾN MẠI KHÁC</div>
                              <ul></ul>
                              <br />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>



              </div>
            </div>
          </div>

          <div
            className=" homepage-product-2019 d-inline-block w-100 js-category-home"
            id="boxcate-1106"
            style={{ minHeight: 400 }}
          >
            <div className="js-glee-block">
              <div className="title_box_center_2019 wow">
                <h2 className="h_title_2019">MainBoard</h2>

                <a href="/laptop-tablet-mobile" className="viewall">
                  Xem tất cả <i className="fal fa-long-arrow-right" />
                </a>
              </div>
            </div>
            <div className="js-glee-block">
              <div
                className="product-home custom-nav js-productslide-cate1106 owl-theme owl-loaded owl-drag"

              >
                <div className="owl-stage-outer">
                  <div
                    className="owl-stage flex"

                  >

                    {listMainboard.slice(0, 5).map((val, index) => (
                      <div className="owl-item active" style={{ width: 236 }}>
                        <div
                          className="p-component loaded p-frame-bhmr-6m"

                        >
                          <div className="p-iconLTAU811">
                            <span className="bhmr-6m" />
                          </div>
                          <div className="p-img ajax-loading ajax-finished">
                            <a href="/" />
                            <div className="a">
                              <img
                                src="https://hanoicomputercdn.com/media/product/250_73001_laptop_asus_vivobook_go_e1404fa_18.png"
                                alt="Laptop Asus VivoBook E1404FA-NK177W (R5 7520U/16GB RAM/512GB SSD/14 FHD/Win11/Bạc)"
                                width={250}
                                height={250}
                              />
                            </div>
                          </div>
                          <div className="align-items-center d-flex flex-wrap my-2">

                            <p className="p-sku">Brand: {val.brand}</p>
                          </div>
                          <div className="p-info">
                            <p className="p-name" style={{ height: '30px' }}>
                              <a href="/laptop-asus-vivobook-e1404fa-nk177w-r5-7520u-16gb-ram-512gb-ssd-14-fhd-win11-bac">
                                {" "}
                                {val.productName}
                              </a>
                            </p>

                            <span className="p-price">  {val.price} VNĐ</span>
                            <span className="p-haskmai">
                              <i className="icons icon-gift" />{" "}
                            </span>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>



              </div>
            </div>
          </div>
          <div
            className=" homepage-product-2019 d-inline-block w-100 js-category-home"
            id="boxcate-1106"
            style={{ minHeight: 400 }}
          >
            <div className="js-glee-block">
              <div className="title_box_center_2019 wow">
                <h2 className="h_title_2019">RAM</h2>

                <a href="/laptop-tablet-mobile" className="viewall">
                  Xem tất cả <i className="fal fa-long-arrow-right" />
                </a>
              </div>
            </div>
            <div className="js-glee-block">
              <div
                className="product-home custom-nav js-productslide-cate1106 owl-theme owl-loaded owl-drag"

              >
                <div className="owl-stage-outer">
                  <div
                    className="owl-stage flex"

                  >

                    {listRAM.slice(0, 5).map((val, index) => (
                      <div className="owl-item active" style={{ width: 236 }}>
                        <div
                          className="p-component loaded p-frame-bhmr-6m"

                        >
                          <div className="p-iconLTAU811">
                            <span className="bhmr-6m" />
                          </div>
                          <div className="p-img ajax-loading ajax-finished">
                            <a href="/" />
                            <div className="a">
                              <img
                                src="https://hanoicomputercdn.com/media/product/250_73001_laptop_asus_vivobook_go_e1404fa_18.png"
                                alt="Laptop Asus VivoBook E1404FA-NK177W (R5 7520U/16GB RAM/512GB SSD/14 FHD/Win11/Bạc)"
                                width={250}
                                height={250}
                              />
                            </div>
                          </div>
                          <div className="align-items-center d-flex flex-wrap my-2">

                            <p className="p-sku">Brand: {val.brand}</p>
                          </div>
                          <div className="p-info">
                            <p className="p-name" style={{ height: '30px' }}>
                              <a href="/laptop-asus-vivobook-e1404fa-nk177w-r5-7520u-16gb-ram-512gb-ssd-14-fhd-win11-bac">
                                {" "}
                                {val.productName}
                              </a>
                            </p>

                            <span className="p-price">  {val.price} VNĐ</span>
                            <span className="p-haskmai">
                              <i className="icons icon-gift" />{" "}
                            </span>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>



              </div>
            </div>
          </div>
          <div
            className=" homepage-product-2019 d-inline-block w-100 js-category-home"
            id="boxcate-1106"
            style={{ minHeight: 400 }}
          >
            <div className="js-glee-block">
              <div className="title_box_center_2019 wow">
                <h2 className="h_title_2019">SSD</h2>

                <a href="/laptop-tablet-mobile" className="viewall">
                  Xem tất cả <i className="fal fa-long-arrow-right" />
                </a>
              </div>
            </div>
            <div className="js-glee-block">
              <div
                className="product-home custom-nav js-productslide-cate1106 owl-theme owl-loaded owl-drag"

              >
                <div className="owl-stage-outer">
                  <div
                    className="owl-stage flex"

                  >

                    {listSSD.slice(0, 5).map((val, index) => (
                      <div className="owl-item active" style={{ width: 236 }}>
                        <div
                          className="p-component loaded p-frame-bhmr-6m"

                        >
                          <div className="p-iconLTAU811">
                            <span className="bhmr-6m" />
                          </div>
                          <div className="p-img ajax-loading ajax-finished">
                            <a href="/" />
                            <div className="a">
                              <img
                                src="https://hanoicomputercdn.com/media/product/250_73001_laptop_asus_vivobook_go_e1404fa_18.png"
                                alt="Laptop Asus VivoBook E1404FA-NK177W (R5 7520U/16GB RAM/512GB SSD/14 FHD/Win11/Bạc)"
                                width={250}
                                height={250}
                              />
                            </div>
                          </div>
                          <div className="align-items-center d-flex flex-wrap my-2">

                            <p className="p-sku">Brand: {val.brand}</p>
                          </div>
                          <div className="p-info">
                            <p className="p-name" style={{ height: '30px' }}>
                              <a href="/laptop-asus-vivobook-e1404fa-nk177w-r5-7520u-16gb-ram-512gb-ssd-14-fhd-win11-bac">
                                {" "}
                                {val.productName}
                              </a>
                            </p>

                            <span className="p-price">  {val.price} VNĐ</span>
                            <span className="p-haskmai">
                              <i className="icons icon-gift" />{" "}
                            </span>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div
            className=" homepage-product-2019 d-inline-block w-100 js-category-home"
            id="boxcate-1106"
            style={{ minHeight: 400 }}
          >
            <div className="js-glee-block">
              <div className="title_box_center_2019 wow">
                <h2 className="h_title_2019">HDD</h2>

                <a href="/laptop-tablet-mobile" className="viewall">
                  Xem tất cả <i className="fal fa-long-arrow-right" />
                </a>
              </div>
            </div>
            <div className="js-glee-block">
              <div
                className="product-home custom-nav js-productslide-cate1106 owl-theme owl-loaded owl-drag"

              >
                <div className="owl-stage-outer">
                  <div
                    className="owl-stage flex"

                  >

                    {listHDD.slice(0, 5).map((val, index) => (
                      <div className="owl-item active" style={{ width: 236 }}>
                        <div
                          className="p-component loaded p-frame-bhmr-6m"

                        >
                          <div className="p-iconLTAU811">
                            <span className="bhmr-6m" />
                          </div>
                          <div className="p-img ajax-loading ajax-finished">
                            <a href="/" />
                            <div className="a">
                              <img
                                src="https://hanoicomputercdn.com/media/product/250_73001_laptop_asus_vivobook_go_e1404fa_18.png"
                                alt="Laptop Asus VivoBook E1404FA-NK177W (R5 7520U/16GB RAM/512GB SSD/14 FHD/Win11/Bạc)"
                                width={250}
                                height={250}
                              />
                            </div>
                          </div>
                          <div className="align-items-center d-flex flex-wrap my-2">

                            <p className="p-sku">Brand: {val.brand}</p>
                          </div>
                          <div className="p-info">
                            <p className="p-name" style={{ height: '30px' }}>
                              <a href="/laptop-asus-vivobook-e1404fa-nk177w-r5-7520u-16gb-ram-512gb-ssd-14-fhd-win11-bac">
                                {" "}
                                {val.productName}
                              </a>
                            </p>

                            <span className="p-price">  {val.price} VNĐ</span>
                            <span className="p-haskmai">
                              <i className="icons icon-gift" />{" "}
                            </span>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>


    </>



  );




}
