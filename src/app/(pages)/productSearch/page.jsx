"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../../../src/css/style2020_zip.css"
import "../../../../src/css/media2020.css"
import { useEffect, useState } from "react";
import { filterProducts, FilterProducts, getData, searchProductbyDes } from "@/service/Api-service/apiProducts";
import { formatNumber } from "@/service/convert/convertNumber";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { useParams } from "react-router-dom";
export default function ProductSearch() {

    const pathname = usePathname();


    const [searchProduct, setSearchProduct] = useState("")
    const [cateID, setCateID] = useState("")
    const [startprice, setStartPrice] = useState("");
    const [endprice, setEndPrice] = useState("");
    const [listSearchProduct, setListSearchProduct] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            const queryString = window.location.search;
            // Xử lý nếu query string không tồn tại
            if (!queryString) {
                return;
            }
            // Xử lý nếu query string có tồn tại
            const urlParams = new URLSearchParams(queryString);
            const searchQuery = urlParams.get('query');

            setSearchProduct(searchQuery);
            if (cateID != null) {
                const body = {
                    storeName: searchProduct,
                    priceFrom: startprice,
                    priceTo: endprice,
                    category: cateID
                }
                const searchPro = await searchProductbyDes(searchQuery);
                setListSearchProduct(searchPro?.result);
            }
        }
        fetchData();
    }, [searchProduct]);

    useEffect(() => {
        const fetchData = async () => {
            const queryString = window.location.search;
            // Xử lý nếu query string không tồn tại
            if (!queryString) {
                return;
            }
            // Xử lý nếu query string có tồn tại
            const urlParams = new URLSearchParams(queryString);
            const searchQuery = urlParams.get('searchCate');

            setCateID(searchQuery);
            const searchPro = await getData(searchQuery);
            setListSearchProduct(searchPro?.result);
            console.log(searchPro)
        }
        fetchData();

    }, [cateID]);
    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name == "startprice") {
            setStartPrice(value);
        }
        if (name == "endprice") {
            setEndPrice(value);
        }
    }
    const filterProduct = async () => {
        if (cateID != null) {
            const body = {
                storeName: searchProduct,
                priceFrom: startprice,
                priceTo: endprice,
                category: cateID
            }
            const searchPro = await filterProducts(body);
            setListSearchProduct(searchPro?.result);
        } else {
            const body = {
                storeName: searchProduct,
                priceFrom: startprice,
                priceTo: endprice,

            }
            const searchPro = await filterProducts(body);
            setListSearchProduct(searchPro?.result);
        }
    }




    const showHeader =
        pathname === "/sign-in" || pathname === "/create-account" ? false : true;
    return (
        <>

            <>
                <div className="">

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
                                    <div className="row">
                                        <div className="col-md-12">

                                            <div className="owl-stage-outer col-md-9" style={{ display: 'flex' }}>
                                                <div className="col-md-3" style={{ width: '20%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;', height: '100%' }}>

                                                    <h3 className="cpu-list-container" style={{ borderBottom: '1px solid gray', paddingBottom: '6px' }}>
                                                        <span className="cpu-list-title" style={{ fontSize: '16px' }}>CPU</span>
                                                    </h3>
                                                    <ul className="cpu-list" style={{ listStyleType: 'none', paddingLeft: 0, marginTop: '30px' }}>
                                                        <li>
                                                            <input type="checkbox" />
                                                            Intel Core i5 (6)
                                                        </li>
                                                        <li>
                                                            <input type="checkbox" />
                                                            Intel Core i7 (6)
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div
                                                    className="owl-stage col-md-9"
                                                    style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
                                                >
                                                    <div style={{ backgroundColor: 'red', width: '100%' }}>
                                                        {searchProduct && (
                                                            <div class="filter-form">
                                                                <select style={{ width: '30%' }}>
                                                                    <option value="">Tình trạng kho hàng</option>
                                                                    <option value="in-stock">In Stock</option>
                                                                    <option value="out-of-stock">Out of Stock</option>
                                                                </select>
                                                                <select style={{ width: '30%' }}>
                                                                    <option value="">Tất cả kho</option>
                                                                    <option value="warehouse1">Warehouse 1</option>
                                                                    <option value="warehouse2">Warehouse 2</option>
                                                                </select>
                                                                <div style={{ width: '10%' }}>Loc theo giá tiền:</div>
                                                                <input type="text" style={{ width: '10%' }} name="startprice" onChange={onChange} placeholder="15.999.000 đ" />
                                                                <div>-</div>
                                                                <input type="text" style={{ width: '10%' }} name="endprice" onChange={onChange} placeholder="117.999.000 đ" />
                                                                <button onClick={filterProduct}>Lọc</button>

                                                            </div>
                                                        )}
                                                    </div>
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', width: '100%' }}>

                                                        {listSearchProduct?.map((val, index) => (
                                                            <>
                                                            <div className="owl-item active" >
                                                                {/* <a href="product-detail">
                                                                    <div
                                                                        className="p-component loaded p-frame-bhmr-6m"

                                                                    >
                                                                        <div className="p-iconLTAU811">
                                                                            <span className="bhmr-6m" />
                                                                        </div>
                                                                        <div className="p-img ajax-loading ajax-finished">
                                                                        <a className="hover_detailsearch" href={`product-detail?idProduct=${val.productId}`} />
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
                                                                </a> */}
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
                        </div>
                    </div>
                </div>

            </>




        </>



    );




}
