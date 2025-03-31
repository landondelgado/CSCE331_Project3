import React from 'react';
import bobabackground from './images/bobabackground.svg';
import homeIcon from './images/home.png';
import inventoryIcon from './images/inventory.png';
import analyticsIcon from './images/analytics.png';
import shareteaLogo from './images/ShareteaLogo.png';

export default function InventoryPage() {
  return (
    // Parent container with the background
    <div
      className="min-h-screen text-white bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${bobabackground})`,
        backgroundSize: 'cover',
      }}
    >
      {/* Header with transparent background */}
      <header className="flex items-center justify-between p-4 bg-transparent">
        {/* Left: Navigation Buttons */}
        <div className="flex gap-4">
          <button className="flex flex-col items-center hover:text-gray-300">
            <img src={homeIcon} alt="Home" className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center hover:text-gray-300">
            <img src={inventoryIcon} alt="Inventory" className="w-6 h-6" />
            <span className="text-xs">Inventory</span>
          </button>
          <button className="flex flex-col items-center hover:text-gray-300">
            <img src={analyticsIcon} alt="Analytics" className="w-6 h-6" />
            <span className="text-xs">Analytics</span>
          </button>
        </div>

        {/* Center: Logo */}
        <div className="text-center">
          <img src={shareteaLogo} alt="Sharetea Logo" className="h-10 mx-auto mb-1" />
        </div>

        {/* Right: Time and Logout */}
        <div className="text-right">
          <p className="text-sm">04:35:32 PM</p>
          <button className="hover:text-gray-300">Logout</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <h2 className="text-2xl font-bold">Inventory Page</h2>
        <p>Inventory content goes here.</p>
      </main>
    </div>
  );
}