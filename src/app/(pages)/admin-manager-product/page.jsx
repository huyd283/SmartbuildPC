export default function Product() {
    return (
        <div className="p-4 bg-card text-card-foreground bg-slate-100"  style={{marginLeft: '256px'}}>
          <h2 className="text-xl font-semibold mb-4">Danh Sách Sản Phẩm</h2>
          {/* <div className="flex flex-wrap gap-4 mb-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium">Chọn ngày:</label>
              <input type="date" id="date" className="mt-1 block w-full border border-input rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary sm:text-sm" placeholder="Ngày/ Tháng/ Năm" />
            </div>
            <div>
              <label htmlFor="device" className="block text-sm font-medium">Chọn thiết bị:</label>
              <input type="text" id="device" className="mt-1 block w-full border border-input rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary sm:text-sm" placeholder="Thiết bị" />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium">Chọn trạng thái:</label>
              <select id="status" className="mt-1 block w-full border border-input rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary sm:text-sm">
                <option>Trạng thái</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 rounded-md">Tìm kiếm</button>
            </div>
          </div> */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-border rounded-md">
              <thead className="bg-stone-500 text-primary-foreground">
                <tr>
                  <th className="px-4 py-2 border border-border">#</th>
                  <th className="px-4 py-2 border border-border">Mã sản phẩm</th>
                  <th className="px-4 py-2 border border-border">Tên Sản Phẩm</th>
                  <th className="px-4 py-2 border border-border">Số tài khoản</th>
                  <th className="px-4 py-2 border border-border">Số tiền</th>
                  <th className="px-4 py-2 border border-border">Trạng thái</th>
                  <th className="px-4 py-2 border border-border">Ngày tạo</th>
                  <th className="px-4 py-2 border border-border">Quản lý</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border border-border">1</td>
                  <td className="px-4 py-2 border border-border">TRANSNO20240619112417</td>
                  <td className="px-4 py-2 border border-border">BMS060900188</td>
                  <td className="px-4 py-2 border border-border">0983408662</td>
                  <td className="px-4 py-2 border border-border">₫2,000</td>
                  <td className="px-4 py-2 border border-border"><span className="bg-green-600 text-white px-2 py-1 rounded-full">Đang kinh doanh</span></td>
                  <td className="px-4 py-2 border border-border">19/06/2024 11:24</td>
                  <td className="px-4 py-2 border border-border text-center"><img undefinedhidden="true" alt="view-icon" src="https://openui.fly.dev/openui/24x24.svg?text=👁️" /></td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-border">2</td>
                  <td className="px-4 py-2 border border-border">TRANSNO20240619112037</td>
                  <td className="px-4 py-2 border border-border">BMS060900188</td>
                  <td className="px-4 py-2 border border-border">0983408662</td>
                  <td className="px-4 py-2 border border-border">₫5,000</td>
                  <td className="px-4 py-2 border border-border"><span className="bg-green-600 text-white px-2 py-1 rounded-full">Đang kinh doanh</span></td>
                  <td className="px-4 py-2 border border-border">19/06/2024 11:20</td>
                  <td className="px-4 py-2 border border-border text-center"><img undefinedhidden="true" alt="view-icon" src="https://openui.fly.dev/openui/24x24.svg?text=👁️" /></td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-border">3</td>
                  <td className="px-4 py-2 border border-border">TRANSNO20240609181107</td>
                  <td className="px-4 py-2 border border-border">BMS060900188</td>
                  <td className="px-4 py-2 border border-border">0983408662</td>
                  <td className="px-4 py-2 border border-border">₫450,000</td>
                  <td className="px-4 py-2 border border-border"><span className="bg-green-600 text-white px-2 py-1 rounded-full">Đang kinh doanh</span></td>
                  <td className="px-4 py-2 border border-border">09/06/2024 18:11</td>
                  <td className="px-4 py-2 border border-border text-center"><img undefinedhidden="true" alt="view-icon" src="https://openui.fly.dev/openui/24x24.svg?text=👁️" /></td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-border">4</td>
                  <td className="px-4 py-2 border border-border">TRANSNO20240609180904</td>
                  <td className="px-4 py-2 border border-border">BMS060900188</td>
                  <td className="px-4 py-2 border border-border">0983408662</td>
                  <td className="px-4 py-2 border border-border">₫450,000</td>
                  <td className="px-4 py-2 border border-border"><span className="bg-green-600 text-white px-2 py-1 rounded-full">Đang kinh doanh</span></td>
                  <td className="px-4 py-2 border border-border">09/06/2024 18:09</td>
                  <td className="px-4 py-2 border border-border text-center"><img undefinedhidden="true" alt="view-icon" src="https://openui.fly.dev/openui/24x24.svg?text=👁️" /></td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-border">5</td>
                  <td className="px-4 py-2 border border-border">TRANSNO20240609180649</td>
                  <td className="px-4 py-2 border border-border">BMS060900188</td>
                  <td className="px-4 py-2 border border-border">0983408662</td>
                  <td className="px-4 py-2 border border-border">₫350,000</td>
                  <td className="px-4 py-2 border border-border"><span className="bg-green-600 text-white px-2 py-1 rounded-full">Đang kinh doanh</span></td>
                  <td className="px-4 py-2 border border-border">09/06/2024 18:06</td>
                  <td className="px-4 py-2 border border-border text-center"><img undefinedhidden="true" alt="view-icon" src="https://openui.fly.dev/openui/24x24.svg?text=👁️" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm">Hiện 1 đến 5 trong 5 mục</span>
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 border border-border rounded-md" disabled>«</button>
              <span className="px-2 py-1 border border-border rounded-md bg-primary text-primary-foreground">1</span>
              <button className="px-2 py-1 border border-border rounded-md" disabled>»</button>
              <span>Hiện</span>
              <select className="border border-input rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary sm:text-sm">
                <option>10</option>
              </select>
              <span>mục</span>
            </div>
          </div>
        </div>
    )
}