import React from 'react';
import bobabackground from './images/bobabackground.svg';
import homeIcon from './images/home.png';
import inventoryIcon from './images/inventory.png';
import analyticsIcon from './images/analytics.png';
import shareteaLogo from './images/ShareteaLogo.png';

export default function InventoryPage() {
  return (
    <div
      className="min-h-screen text-white bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${bobabackground})`,
        backgroundSize: 'cover',
      }}
    >
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-transparent">
        {/* Left: Navigation Buttons */}
        <div className="flex gap-4">
          <button className="flex flex-col items-center hover:text-gray-300">
            <img src={homeIcon} alt="Home" className="w-10 h-10" />
            <span className="text-s">Home</span>
          </button>
          <button className="flex flex-col items-center hover:text-gray-300">
            <img src={inventoryIcon} alt="Inventory" className="w-10 h-10" />
            <span className="text-s">Inventory</span>
          </button>
          <button className="flex flex-col items-center hover:text-gray-300">
            <img src={analyticsIcon} alt="Analytics" className="w-10 h-10" />
            <span className="text-s">Analytics</span>
          </button>
        </div>

        {/* Center: Logo shifted slightly to the left */}
        <div className="text-center" style={{ transform: 'translateX(-20px)' }}>
          <img src={shareteaLogo} alt="Sharetea Logo" className="h-12 mb-1" />
        </div>

        {/* Right: Time and Logout (side by side) */}
        <div className="flex items-center justify-end gap-2">
          <p className="text-xl">04:35:32 PM</p>
          <button className="hover:text-gray-300 text-xl">Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="text-center p-4">
        <h2 className="text-2xl font-bold mb-7">Inventory Page</h2>

        {/* Action Buttons Row */}
        <div className="flex justify-center gap-4 mb-6">
          <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded">
            Add Stock
          </button>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded">
            Create Item
          </button>
          <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded">
            Edit Item
          </button>
          <button className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded">
            Delete Item
          </button>
        </div>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-white/80">
              <tr>
                <th className="border border-black p-2 text-black">Category</th>
                <th className="border border-black p-2 text-black">Stock</th>
                <th className="border border-black p-2 text-black">
                  Previous Week Usage
                </th>
                <th className="border border-black p-2 text-black">Low Stock Items</th>
              </tr>
            </thead>
            <tbody className="bg-white/80">
              <tr>
                <td className="border border-black p-2 text-black">Brewed Tea</td>
                <td className="border border-black p-2 text-black">16.0000</td>
                <td className="border border-black p-2 text-black">16</td>
                <td className="border border-black p-2 text-black">Ginger Tea</td>
              </tr>
              {/* Additional rows can be added here (placeholder data) */}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
