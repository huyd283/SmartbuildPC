export default function Widget() {
  return (
    <div className="p-6 bg-background">
      <h2 className="text-2xl font-semibold mb-4">Order List</h2>
      <div className="flex space-x-4 mb-6">
        <button className="bg-secondary text-secondary-foreground p-2 rounded">
          All
        </button>
        <button className="bg-muted text-muted-foreground p-2 rounded">
          Waiting Payment (3)
        </button>
        <button className="bg-muted text-muted-foreground p-2 rounded">
          Order On Process
        </button>
        <button className="bg-muted text-muted-foreground p-2 rounded">
          In Delivery
        </button>
        <button className="bg-muted text-muted-foreground p-2 rounded">
          Complete Order
        </button>
        <button className="bg-muted text-muted-foreground p-2 rounded">
          Refund
        </button>
      </div>

      <div className="border-b border-border pb-4 mb-4">
        <h3 className="text-lg font-medium">Order ID: 430960</h3>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <img
              src="https://placehold.co/100x100"
              alt="Women's Turtleneck Sweater"
              className="mr-4"
            />
            <div>
              <h4 className="font-semibold">Spring Collection</h4>
              <p>Women Turtleneck Sweater</p>
              {/* <p className="text-sm">L | Pink</p> */}
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-4">3 × $500.00</span>
            <span className="font-semibold">$1,500.00</span>
          </div>
        </div>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <img
              src="https://placehold.co/100x100"
              alt="Men's UA Storm Armour Down 2.0 Jacket"
              className="mr-4"
            />
            <div>
              <h4 className="font-semibold">Collection Name</h4>
              <p>Men UA Storm Armour Down 2.0 Jacket</p>
              {/* <p className="text-sm">L | Gray</p> */}
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-4">3 × $500.00</span>
            <span className="font-semibold">$1,500.00</span>
          </div>
        </div>
        <div className="text-right">
          <button className="bg-blue-500 text-primary-foreground p-2 rounded text-center">
            Detail
          </button>
        </div>
      </div>

      <div className="border-b border-border pb-4 mb-4">
        <h3 className="text-lg font-medium">Order ID: 430960</h3>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <img
              src="https://placehold.co/100x100"
              alt="Men's UA Storm Armour Down 2.0 Jacket"
              className="mr-4"
            />
            <div>
              <h4 className="font-semibold">Collection Name</h4>
              <p>Men UA Storm Armour Down 2.0 Jacket</p>
              {/* <p className="text-sm">L | Gray</p> */}
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-4">3 × $500.00</span>
            <span className="font-semibold">$1,500.00</span>
          </div>
        </div>
        <div className="text-right">
          <button className="bg-blue-500 text-primary-foreground p-2 rounded text-center">
            Detail
          </button>
        </div>
      </div>
    </div>
  );
}
