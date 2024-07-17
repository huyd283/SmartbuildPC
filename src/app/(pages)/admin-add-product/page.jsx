export default function AddProduct() {
    return (
        <div className="p-6 max-w-7xl mx-auto bg-card text-card-foreground rounded-lg shadow-md">
          <form>
            <div className="mb-4">
              <label htmlFor="product-name" className="block text-primary font-semibold mb-2">Tên sản phẩm</label>
              <input type="text" id="product-name" className="w-full p-2 border border-border rounded" placeholder="Nhập tên sản phẩm" />
            </div>
            <div className="mb-4">
              <label htmlFor="product-description" className="block text-primary font-semibold mb-2">Mô tả</label>
              <input type="text" id="product-description" className="w-full p-2 border border-border rounded" placeholder="Nhập mô tả" />
            </div>
            <div className="mb-4">
              <label htmlFor="product-price" className="block text-primary font-semibold mb-2">Giá sản phẩm</label>
              <input type="number" id="product-price" className="w-full p-2 border border-border rounded" placeholder="Nhập giá" min={0} />
            </div>
            <div className="mb-4">
              <label htmlFor="product-category" className="block text-primary font-semibold mb-2">Danh mục sản phẩm</label>
              <select id="product-category" className="w-full p-2 border border-border rounded">
                <option>CPU</option>
                <option>Main</option>
                <option>GPU</option>
                <option>Ram</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="product-images" className="block text-primary font-semibold mb-2">Ảnh sản phẩm (chọn tối đa 4)</label>
              <div id="product-images" className="w-full p-4 border-2 border-dashed border-border rounded text-muted-foreground">
                Kéo và thả một hoặc nhiều hình ảnh vào đây hoặc nhấn để chọn hình ảnh.
                <div className="mt-2 text-muted-foreground">Chưa có hình ảnh nào được chọn.</div>
              </div>
            </div>
          </form>
        </div>
    )
}