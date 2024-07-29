"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../src/css/style2020_zip.css"
import "../../src/css/media2020.css"
import { useEffect, useState } from "react";
import { getData, searchProductbyDes } from "@/service/Api-service/apiProducts";
import { formatNumber } from "@/service/convert/convertNumber";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
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
  const [searchProduct, setSearchProduct] = useState("")
  const [cateID, setCateID] = useState("")

  const [listSearchProduct, setListSearchProduct] = useState([]);



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
      {listSearchProduct?.length > 0 ? (
        <>
          <div className="container-2019 ">

            <div id="cate-homepage-2023-com">
              <div
                className=" homepage-product-2019 d-inline-block w-100 js-category-home"
                id="boxcate-1106"
                style={{ minHeight: 400 }}
              >
                <div className="js-glee-block">
                  <div className="title_box_center_2019 wow">
                    <h2 className="h_title_2019">TÌM KIẾM : {searchProduct} ({(listSearchProduct?.length)} sản phẩm) </h2>

                    <a href="/laptop-tablet-mobile" className="viewall">
                      See all <i className="fal fa-long-arrow-right" />
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

                        {listSearchProduct?.slice(0, 5).map((val, index) => (
                          <>
                          <div className="owl-item active" style={{ width: 236 }}>
                            <div
                              className="p-component loaded p-frame-bhmr-6m"

                            >
                              <div className="p-iconLTAU811">
                                <span className="bhmr-6m" />
                              </div>
                              <div className="p-img ajax-loading ajax-finished">


                                <a className="hover_detailsearch" href={`product-detail?idProduct=${item.id}`} />
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

                                <span className="p-price">  {formatNumber(val.price)} VNĐ</span>
                                <span className="p-haskmai">
                                  <i className="icons icon-gift" />{" "}
                                </span>
                              </div>


                            </div>
                          </div>
                           <Tooltip style={{ backgroundColor: 'white' }} anchorSelect=".hover_detailsearch" place="right-end">
                           <div className="tooltip-2019">
                             <a
                               href=""
                               className="hover_name"
                             >
                               {val.productName}
                             </a>
                             <table>
                               <tbody>
                                 <tr>
                                   <td>- Giá bán:</td>
                                   <td>
                                     <span className="img_price_full">{formatNumber(val.price)}₫</span>
                                   </td>
                                 </tr>

                                 {/*  */}
                                 <tr>
                                   <td>- Bảo hành</td>
                                   <td>12 Tháng</td>
                                 </tr>
                                 <tr className="classhidden2024">
                                   <td>- Kho hàng:</td>
                                   <td>
                                     <span
                                       className="dongbotonkho js-dongbotonkho dongbotonkho-80652"
                                       data-id={80652}
                                     >
                                       <span
                                         className="detail "
                                         style={{ color: "red", whiteSpace: "pre-line" }}
                                       />
                                     </span>
                                   </td>
                                 </tr>
                               </tbody>
                             </table>
                             <span className="tooltip-title">
                               <i className="fal fa-layer-group" /> Thông số sản phẩm
                             </span>
                             <div className="hover_offer ">
                               - Brand: {val.brand}
                               <br />
                               - Warranty: {val.warranty}
                               <br />
                               - Tag: {val.tag}
                               <br />
                               - TDP: {val.tdp}
                               <br />

                             </div>

                           </div>
                         </Tooltip>
                         </>
                        ))}
                      </div>
                    </div>



                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) :
        <>
          <div className="container-2019 ">

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
                      See all <i className="fal fa-long-arrow-right" />
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

                        {listCPU?.slice(0, 5).map((val, index) => (
                          <>
                            <div className="owl-item active" style={{ width: 236 }}>
                              <div
                                className="p-component loaded p-frame-bhmr-6m"

                              >
                                <div className="p-iconLTAU811">
                                  <span className="bhmr-6m" />
                                </div>
                                <div className="p-img ajax-loading ajax-finished">
                                  <a className="hover_detail1" href={`product-detail?idProduct=${val.productId}`} />
                                  <div className="a">
                                    <img
                                      src={val.imageLink}
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

                                  <span className="p-price">  {formatNumber(val.price)} VNĐ</span>
                                  <span className="p-haskmai">
                                    <i className="icons icon-gift" />{" "}
                                  </span>
                                </div>


                              </div>
                            </div>
                            <Tooltip style={{ backgroundColor: 'white' }} anchorSelect=".hover_detail1" place="right-end">
                              <div className="tooltip-2019">
                                <a
                                  href=""
                                  className="hover_name"
                                >
                                  {val.productName}
                                </a>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td>- Giá bán:</td>
                                      <td>
                                        <span className="img_price_full">{formatNumber(val.price)}₫</span>
                                      </td>
                                    </tr>

                                    {/*  */}
                                    <tr>
                                      <td>- Bảo hành</td>
                                      <td>12 Tháng</td>
                                    </tr>
                                    <tr className="classhidden2024">
                                      <td>- Kho hàng:</td>
                                      <td>
                                        <span
                                          className="dongbotonkho js-dongbotonkho dongbotonkho-80652"
                                          data-id={80652}
                                        >
                                          <span
                                            className="detail "
                                            style={{ color: "red", whiteSpace: "pre-line" }}
                                          />
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <span className="tooltip-title">
                                  <i className="fal fa-layer-group" /> Thông số sản phẩm
                                </span>
                                <div className="hover_offer ">
                                  - Brand: {val.brand}
                                  <br />
                                  - Warranty: {val.warranty}
                                  <br />
                                  - Tag: {val.tag}
                                  <br />
                                  - TDP: {val.tdp}
                                  <br />

                                </div>

                              </div>
                            </Tooltip></>


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
                      See all <i className="fal fa-long-arrow-right" />
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

                        {listMainboard?.slice(0, 5).map((val, index) => (
                          <>
                            <div className="owl-item active" style={{ width: 236 }}>
                              <div
                                className="p-component loaded p-frame-bhmr-6m"

                              >
                                <div className="p-iconLTAU811">
                                  <span className="bhmr-6m" />
                                </div>
                                <div className="p-img ajax-loading ajax-finished">
                                  <a className="hover_detail2" href={`product-detail?idProduct=${val.productId}`} />
                                  <div className="a">
                                    <img
                                      src={val.imageLink}
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

                                  <span className="p-price">  {formatNumber(val.price)} VNĐ</span>
                                  <span className="p-haskmai">
                                    <i className="icons icon-gift" />{" "}
                                  </span>
                                </div>

                              </div>
                            </div>
                            <Tooltip style={{ backgroundColor: 'white' }} anchorSelect=".hover_detail2" place="right-end">
                              <div className="tooltip-2019">
                                <a
                                  href=""
                                  className="hover_name"
                                >
                                  {val.productName}
                                </a>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td>- Giá bán:</td>
                                      <td>
                                        <span className="img_price_full">{formatNumber(val.price)}₫</span>
                                      </td>
                                    </tr>

                                    {/*  */}
                                    <tr>
                                      <td>- Bảo hành</td>
                                      <td>12 Tháng</td>
                                    </tr>
                                    <tr className="classhidden2024">
                                      <td>- Kho hàng:</td>
                                      <td>
                                        <span
                                          className="dongbotonkho js-dongbotonkho dongbotonkho-80652"
                                          data-id={80652}
                                        >
                                          <span
                                            className="detail "
                                            style={{ color: "red", whiteSpace: "pre-line" }}
                                          />
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <span className="tooltip-title">
                                  <i className="fal fa-layer-group" /> Thông số sản phẩm
                                </span>
                                <div className="hover_offer ">
                                  - Brand: {val.brand}
                                  <br />
                                  - Warranty: {val.warranty}
                                  <br />
                                  - Tag: {val.tag}
                                  <br />
                                  - TDP: {val.tdp}
                                  <br />

                                </div>

                              </div>
                            </Tooltip></>


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
                      See all <i className="fal fa-long-arrow-right" />
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

                        {listRAM?.slice(0, 5).map((val, index) => (
                          <>
                            <div className="owl-item active" style={{ width: 236 }}>
                              <div
                                className="p-component loaded p-frame-bhmr-6m"

                              >
                                <div className="p-iconLTAU811">
                                  <span className="bhmr-6m" />
                                </div>
                                <div className="p-img ajax-loading ajax-finished">
                                  <a className="hover_detail4" href={`product-detail?idProduct=${val.productId}`} />
                                  <div className="a">
                                    <img
                                      src={val.imageLink}
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

                                  <span className="p-price">  {formatNumber(val.price)} VNĐ</span>
                                  <span className="p-haskmai">
                                    <i className="icons icon-gift" />{" "}
                                  </span>
                                </div>

                              </div>
                            </div>
                            <Tooltip style={{ backgroundColor: 'white' }} anchorSelect=".hover_detail4" place="right-end">
                              <div className="tooltip-2019">
                                <a
                                  href=""
                                  className="hover_name"
                                >
                                  {val.productName}
                                </a>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td>- Giá bán:</td>
                                      <td>
                                        <span className="img_price_full">{formatNumber(val.price)}₫</span>
                                      </td>
                                    </tr>

                                    {/*  */}
                                    <tr>
                                      <td>- Bảo hành</td>
                                      <td>12 Tháng</td>
                                    </tr>
                                    <tr className="classhidden2024">
                                      <td>- Kho hàng:</td>
                                      <td>
                                        <span
                                          className="dongbotonkho js-dongbotonkho dongbotonkho-80652"
                                          data-id={80652}
                                        >
                                          <span
                                            className="detail "
                                            style={{ color: "red", whiteSpace: "pre-line" }}
                                          />
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <span className="tooltip-title">
                                  <i className="fal fa-layer-group" /> Thông số sản phẩm
                                </span>
                                <div className="hover_offer ">
                                  - Brand: {val.brand}
                                  <br />
                                  - Warranty: {val.warranty}
                                  <br />
                                  - Tag: {val.tag}
                                  <br />
                                  - TDP: {val.tdp}
                                  <br />

                                </div>

                              </div>
                            </Tooltip></>
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
                      See all <i className="fal fa-long-arrow-right" />
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

                        {listSSD?.slice(0, 5).map((val, index) => (
                          <>
                            <div className="owl-item active" style={{ width: 236 }}>
                              <div
                                className="p-component loaded p-frame-bhmr-6m"

                              >
                                <div className="p-iconLTAU811">
                                  <span className="bhmr-6m" />
                                </div>
                                <div className="p-img ajax-loading ajax-finished">
                                  <a className="hover_detail5" href={`product-detail?idProduct=${val.productId}`} />
                                  <div className="a">
                                    <img
                                      src={val.imageLink}
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

                                  <span className="p-price">  {formatNumber(val.price)} VNĐ</span>
                                  <span className="p-haskmai">
                                    <i className="icons icon-gift" />{" "}
                                  </span>
                                </div>

                              </div>
                            </div>
                            <Tooltip style={{ backgroundColor: 'white' }} anchorSelect=".hover_detail5" place="right-end">
                              <div className="tooltip-2019">
                                <a
                                  href=""
                                  className="hover_name"
                                >
                                  {val.productName}
                                </a>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td>- Giá bán:</td>
                                      <td>
                                        <span className="img_price_full">{formatNumber(val.price)}₫</span>
                                      </td>
                                    </tr>

                                    {/*  */}
                                    <tr>
                                      <td>- Bảo hành</td>
                                      <td>12 Tháng</td>
                                    </tr>
                                    <tr className="classhidden2024">
                                      <td>- Kho hàng:</td>
                                      <td>
                                        <span
                                          className="dongbotonkho js-dongbotonkho dongbotonkho-80652"
                                          data-id={80652}
                                        >
                                          <span
                                            className="detail "
                                            style={{ color: "red", whiteSpace: "pre-line" }}
                                          />
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <span className="tooltip-title">
                                  <i className="fal fa-layer-group" /> Thông số sản phẩm
                                </span>
                                <div className="hover_offer ">
                                  - Brand: {val.brand}
                                  <br />
                                  - Warranty: {val.warranty}
                                  <br />
                                  - Tag: {val.tag}
                                  <br />
                                  - TDP: {val.tdp}
                                  <br />

                                </div>

                              </div>
                            </Tooltip></>
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
                      See all <i className="fal fa-long-arrow-right" />
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

                        {listHDD?.slice(0, 5).map((val, index) => (
                          <>
                            <div className="owl-item active" style={{ width: 236 }}>
                              <div
                                className="p-component loaded p-frame-bhmr-6m"

                              >
                                <div className="p-iconLTAU811">
                                  <span className="bhmr-6m" />
                                </div>
                                <div className="p-img ajax-loading ajax-finished">
                                  <a className="hover_detail6" href={`product-detail?idProduct=${val.productId}`} />
                                  <div className="a">
                                    <img
                                      src={val.imageLink}
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

                                  <span className="p-price">  {formatNumber(val.price)} VNĐ</span>
                                  <span className="p-haskmai">
                                    <i className="icons icon-gift" />{" "}
                                  </span>
                                </div>

                              </div>
                            </div>
                            <Tooltip style={{ backgroundColor: 'white' }} anchorSelect=".hover_detail6" place="right-end">
                              <div className="tooltip-2019">
                                <a
                                  href=""
                                  className="hover_name"
                                >
                                  {val.productName}
                                </a>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td>- Giá bán:</td>
                                      <td>
                                        <span className="img_price_full">{formatNumber(val.price)}₫</span>
                                      </td>
                                    </tr>

                                    {/*  */}
                                    <tr>
                                      <td>- Bảo hành</td>
                                      <td>12 Tháng</td>
                                    </tr>
                                    <tr className="classhidden2024">
                                      <td>- Kho hàng:</td>
                                      <td>
                                        <span
                                          className="dongbotonkho js-dongbotonkho dongbotonkho-80652"
                                          data-id={80652}
                                        >
                                          <span
                                            className="detail "
                                            style={{ color: "red", whiteSpace: "pre-line" }}
                                          />
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <span className="tooltip-title">
                                  <i className="fal fa-layer-group" /> Thông số sản phẩm
                                </span>
                                <div className="hover_offer ">
                                  - Brand: {val.brand}
                                  <br />
                                  - Warranty: {val.warranty}
                                  <br />
                                  - Tag: {val.tag}
                                  <br />
                                  - TDP: {val.tdp}
                                  <br />

                                </div>

                              </div>
                            </Tooltip></>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>


          </div> </>}



    </>



  );




}
