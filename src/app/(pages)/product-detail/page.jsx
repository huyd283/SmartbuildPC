"use client";
import "../../../css/style2020_zip.css"
import "../../../css/media2020.css"
import "../../../css/otherstyle2020.css"
import { useEffect, useState } from "react";
import { getDetailProduct } from "@/service/Api-service/apiProducts";



export default function ProductDetal() {
  const [productdetail,setProductDetail] = useState("");
    useEffect(() => {
      const fetchData = async() => {
      
        const queryString = window.location.search;

   
        // Xử lý nếu query string không tồn tại
        if (!queryString) {
          return;
        }
        // Xử lý nếu query string có tồn tại
        const urlParams = new URLSearchParams(queryString);
        const searchQuery = urlParams.get('idProduct');
       
        const response = await getDetailProduct(searchQuery);
        setProductDetail(response.result);
           
    }   
    fetchData();
     
    },[])


    return (
        <>
 
        <div className="body-new-2019">
          <div className="container-2019 " style={{marginTop:'40px'}}>
            <div
              className="bg-white d-flex flex-wrap product-detail-top"
              style={{ borderRadius: 3 }}
            >
              <div className="product_detail-header">
                <div className="product_detail-title">
                  <h1>
                    {productdetail?.productName}
                  </h1>
                </div>
              </div>
              <div className="product-detail-top-left d-flex flex-wrap">
                <div className="product-detail-img">
                <img
                        src={productdetail?.imageLink}
                        alt="Product"
                        width={250}
                        height={250}
                      />
                </div>
              </div>
              {/*  product-detail-top-right */}
              <div className=" product-detail-top-right">
                <div className="product_detail-top-right-below">
                  <div className="product-detail-info">
                    <div
                      className="product_detail-meta"
                      style={{ display: "flex", flexWrap: "wrap" }}
                    >
                      <div className="product_detail-sku">
                        Product ID: <span className="sku">PCHP838</span>
                      </div>
                      <div className="product_detail-separator" />
                      Rating:
                      <a
                        href="#tab5"
                        className="product_detail-star"
                        style={{ marginLeft: 5 }}
                      ></a>
                      <a href="#tab5" className="count-rate">
                        0
                      </a>
                      <div className="product_detail-separator" />
                      <a href="#comment" className="product_detail-view-counter">
                        Comment: <span className="counter-number">0</span>
                      </a>
                      <div className="product_detail-separator" />
                      <div className="product_detail-view-counter">
                        View Number: <span className="counter-number">1244</span>
                      </div>
                    </div>
                    <div className="product-summary-item" style={{ padding: 0 }}>
                      <div className="product-summary-item-title">
                      Product Specification
                      </div>
                      <ul
                        className="product-summary-item-ul d-flex flex-wrap mb-0"
                        id="js-tskt-item"
                      >
                        <li>CategoryName: {productdetail?.categoryName}</li>
                        <li>Price: {productdetail?.price}</li>
                        <li>Warranty: {productdetail?.warranty}</li>
                        <li>Brand: {productdetail?.brand}</li>
                        <li>Tag: {productdetail?.tag}</li>
                        <li>Tdp: {productdetail?.tdp}</li>
                      
                      </ul>
                    </div>
                
                   
                    <div className="clear" />
                    <div
                      id="button_buy_2019" 
                      className="d-flex flex-wrap justify-content-start"
                    >
                      {/* kiểm tra có giá kmai hay ko */}
                      <div className="top-buttons-th1">
                        <a
                         
                          style={{backgroundColor: '#026DB5'}}
                          href="javascript:;"
                          onclick="listenBuyProDetail('80652',0,1,'','/cart?step=3')"
                          className="mua-ngay th1"
                        >
                          <span>Order Now</span> Fast delivery, free of charge
                          nationally
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="product-detail-static-content">
                    <div  className="static-item san-pham-chung">
                      <div style={{backgroundColor: '#026DB5'}} className="title">REST ASSURED TO BUY</div>
                      <div className="static-nd">
                        <ul className="m-0 d-flex align-items-center flex-wrap list-unstyled pl-2">
                          <li>
                            <a
                              target="_blank"
                              style={{ color: "#212529" }}
                              href="https://hacom.vn/gioi-thieu-ve-hacom"
                            >
                              Prestige 24 years Top in the market
                            </a>
                          </li>
                          <li>
                            <a
                              target="_blank"
                              style={{ color: "#212529" }}
                              href="https://www.hacom.vn/chinh-sach-hang-chinh-hang"
                            >
                              100% Genuine Products
                            </a>
                          </li>
                          <li>
                            <a
                              target="_blank"
                              style={{ color: "#212529" }}
                              href="https://www.hacom.vn/huong-dan-mua-hang-tra-gop"
                            >
                              0% interest installment for the entire shopping cart
                            </a>
                          </li>
                          <li>
                            <a
                              target="_blank"
                              style={{ color: "#212529" }}
                              href="https://www.hacom.vn/chinh-sach-bao-hanh"
                            >
                              Return the warranty to the place of use
                            </a>
                          </li>
                          <li>
                            <a
                              target="_blank"
                              style={{ color: "#212529" }}
                              href="https://www.hacom.vn/chinh-sach-cho-doanh-nghiep"
                            >
                              On-site warranty for businesses
                            </a>
                          </li>
                          <li>
                            <a
                              target="_blank"
                              href="https://www.hacom.vn/den-hacom-ve-sinh-may-tinh-mien-phi-tren-toan-he-thong"
                            >
                              PC lifetime free cleaning
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="static-item">
                      <div style={{backgroundColor: '#026DB5'}} className="title">FREE SHIP</div>
                      <div className="static-nd">
                        <ul className="m-0 d-flex align-items-center flex-wrap list-unstyled pl-2">
                       
                          <li>Free delivery to all of the country
                          </li>
                          <li>
                          Receive payment at the bank (ship COD)
                          </li>
                       
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end  product-detail-top-right */}
            </div>
            <div className="clearfix space30" id="nhay_comboset" />
            <div className="d-flex flex-wrap mt-4 product-detail-bottom">
              <div className="container-2020">
                <div className="left-column">
                  <div
                    className="content_scroll_tab_2019 bg-white"
                    id="tab1"
                    style={{ borderRadius: 3 }}
                  >
                    <div className="nd title_box_scroll_content_2019 showmore">
                      <h2 className="ddnb-title spct-title">
                        Rate: {productdetail?.productName}
                      </h2>
                      <div id="js-product-description">
                        <div>
                          <strong>Note: </strong>
                          <div>
                          The image is for reference only because the product specification may vary according to the market for each version. If you need a specific configuration, please see the technical specification sheet or ask the business before purchasing. Note: The image is for reference only because the product specification may vary according to the market for each version. If you need a specific configuration, please see the technical specification sheet or ask the business before purchasing. 
                          </div>
                        </div>
                        <h3>
                          <strong>
                              Description:
                          </strong>
                        </h3>
                        <p>
                        {productdetail?.description}
                        </p>
                        
                      </div>
                    </div>
                  </div>
                </div>
              

                <div className="right-column">
                  <div className="content_scroll_tab_2019" id="tab2">
                    <div className="nd title_box_scroll_content_2019">
                      <h2 className="tskt-title spct-title">Specifications</h2>
                      <div className="bang-tskt">
                        <table className="tb-product-spec">
                          <tbody>
                            <tr>
                              <td className="spec-key">CategoryName</td>
                              <td className="spec-value">{productdetail?.categoryName}</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Warranty</td>
                              <td className="spec-value">{productdetail?.warranty}</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Brand</td>
                              <td className="spec-value">{productdetail?.brand}</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Tag</td>
                              <td className="spec-value">{productdetail?.tag}</td>
                            </tr>
                            <tr>
                              <td className="spec-key">TDP</td>
                              <td className="spec-value">{productdetail?.tdp}</td>
                            </tr>
                           
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="popup-common popup-tskt" id="popup-tskt">
                    <div className="content-popup">
                      <div className="bang-tskt">
                        <table className="tb-product-spec">
                          <tbody>
                            <tr>
                              <td className="spec-key">Dòng CPU</td>
                              <td className="spec-value">Core i7</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Công nghệ CPU</td>
                              <td className="spec-value">�&nbsp;</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Mã CPU</td>
                              <td className="spec-value">12700</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Tốc độ CPU</td>
                              <td className="spec-value">2.10GHz</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Tần số turbo tối đa</td>
                              <td className="spec-value">Up to 4.90GHz</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Số lõi CPU</td>
                              <td className="spec-value">8 Cores</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Số luồng</td>
                              <td className="spec-value">16 Threads</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Bộ nhớ đệm</td>
                              <td className="spec-value">25Mb Cache</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Chipset</td>
                              <td className="spec-value">Intel H670</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Bộ nhớ RAM</td>
                              <td className="spec-value">16Gb</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Hỗ trợ RAM tối đa</td>
                              <td className="spec-value">64GB</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Khe cắm RAM</td>
                              <td className="spec-value">2</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Card đồ họa</td>
                              <td className="spec-value">Intel UHD Graphics 770</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Card tích hợp</td>
                              <td className="spec-value">VGA onboard</td>
                            </tr>
                            <tr>
                              <td className="spec-header" colSpan={2}>
                                Ổ CỨNG
                              </td>
                            </tr>
                            <tr>
                              <td className="spec-key">Dung lượng ổ cứng</td>
                              <td className="spec-value">512GB</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Loại ổ cứng</td>
                              <td className="spec-value">SSD</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Chuẩn ổ cứng</td>
                              <td className="spec-value">PCIe®NVMeTMM.2 SSD</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Ổ quang</td>
                              <td className="spec-value">NO DVD</td>
                            </tr>
                            <tr>
                              <td className="spec-header" colSpan={2}>
                                KẾT NỐI
                              </td>
                            </tr>
                            <tr>
                              <td className="spec-key">Kết nối không dây</td>
                              <td className="spec-value">
                                Realtek RTL8821CE 802.11a/b/g/n/ac (1x1) Wi-Fi and
                                Bluetooth 4.2 combo
                              </td>
                            </tr>
                            <tr>
                              <td className="spec-key">Thông số (Lan/Wireless)</td>
                              <td className="spec-value">Gigabit LAN</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Cổng giao tiếp trước</td>
                              <td className="spec-value">�&nbsp;</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Cổng giao tiếp sau</td>
                              <td className="spec-value">
                                1 cổng kết hợp tai nghe/micrô; 2 cổng Super Speed
                                USBType-C® có tốc độ truyền tín hiệu 10Gbps; 4 cổng
                                <br />
                                Super Speed USBType-A có tốc độ truyền tín hiệu 5Gbps
                              </td>
                            </tr>
                            <tr>
                              <td className="spec-key">Khe cắm mở rộng</td>
                              <td className="spec-value">
                                1 cổng PCI có chiều cao đầy đủ; 2M.2; 1 PCIe 3 x1; 1
                                cổng PCIe 4 x16
                              </td>
                            </tr>
                            <tr>
                              <td className="spec-header" colSpan={2}>
                                PHẦN MỀM
                              </td>
                            </tr>
                            <tr>
                              <td className="spec-key">Hệ điều h�&nbsp;nh</td>
                              <td className="spec-value">Windows 11 Home</td>
                            </tr>
                            <tr>
                              <td className="spec-header" colSpan={2}>
                                THÔNG TIN KHÁC
                              </td>
                            </tr>
                            <tr>
                              <td className="spec-key">Bộ nguồn</td>
                              <td className="spec-value">�&nbsp;</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Phụ kiện</td>
                              <td className="spec-value">Key/mouse</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Kiểu dáng</td>
                              <td className="spec-value">Case đứng to</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Kích thước</td>
                              <td className="spec-value">15,5 x 30,3 x 33,7 cm</td>
                            </tr>
                            <tr>
                              <td className="spec-key">Trọng lượng</td>
                              <td className="spec-value">4,7 Kg</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/*content-popup*/}
                  </div>
                  {/*popup*/}
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </>
    );
}