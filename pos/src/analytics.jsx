import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//header 
function Header() {
  const navigate = useNavigate();
  const [time, setTime] = useState(getCurrentTime());

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  useEffect(() => {
    const interval = setInterval(() => setTime(getCurrentTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  //icons
  const navItems = [
    { label: 'Home', icon: '/images/home.png', route: '/menupos' },
    { label: 'Analytics', icon: '/images/analytics.png', route: '/analytics' },
    { label: 'Inventory', icon: '/images/inventory.png', route: '/inventory' },
  ];

  return (
    <div className="relative flex flex-row justify-center items-center bg-cover bg-center h-20 py-6 px-8">
      {/* Nav Buttons */}
      <div className="absolute top-4 left-12 flex space-x-6">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.route)}
            className="flex flex-col items-center text-white hover:scale-105 transition-transform"
          >
            <img src={item.icon} alt={item.label} className="w-10 h-10 mb-1" />
            <span className="text-xs sm:text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Logo */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <img src="/images/ShareteaLogo.png" alt="Sharetea" className="h-16" />
      </div>

      {/* Time + Logout */}
      <div className="absolute right-6 top-5 flex items-center space-x-4">
        <button
          onClick={() => navigate('/')}
          className="bg-red-500 text-lg sm:text-xl font-semibold text-white rounded-full px-4 py-1 shadow"
        >
          Logout
        </button>
        <div className="bg-slate-600 py-2 px-4 rounded-full text-white text-2xl font-bold">
          {time}
        </div>
      </div>
    </div>
  );
}

// Summary Tab
function CategorySummary() {
  const data = [
    { category: "Beverages", salesQty: 50, sales: 250.0, topSeller: "Coffee", topSellerPct: 30.0 },
    { category: "Food", salesQty: 30, sales: 150.0, topSeller: "Burger", topSellerPct: 40.0 },
  ];

  return (
    <div className="overflow-x-auto bg-white bg-opacity-80 rounded-lg p-4">
      <table className="w-full table-auto text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Sales Qty</th>
            <th className="px-4 py-2">Sales</th>
            <th className="px-4 py-2">Top Seller</th>
            <th className="px-4 py-2">Top Seller %Sales</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b">
              <td className="px-4 py-2">{row.category}</td>
              <td className="px-4 py-2">{row.salesQty}</td>
              <td className="px-4 py-2">${row.sales.toFixed(2)}</td>
              <td className="px-4 py-2">{row.topSeller}</td>
              <td className="px-4 py-2">{row.topSellerPct.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Product usage tab
function ProductUsage() {
  const [start, setStart] = useState("2025-03-01 10:00:00");
  const [end, setEnd] = useState("2025-03-01 14:00:00");

  const data = [
    { ingredient: "Coffee", totalUsed: 100, unit: "grams" },
    { ingredient: "Milk", totalUsed: 200, unit: "ml" },
  ];

  const handleLoad = () => {
    alert(`Load data from ${start} to ${end}`);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
        <div className="flex items-center">
          <label className="text-white mr-2">Start Date/Time:</label>
          <input
            type="text"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="px-2 py-1 rounded border border-gray-300"
          />
        </div>
        <div className="flex items-center">
          <label className="text-white mr-2">End Date/Time:</label>
          <input
            type="text"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="px-2 py-1 rounded border border-gray-300"
          />
        </div>
        <button onClick={handleLoad} className="px-4 py-1 bg-blue-500 text-white rounded">
          Load
        </button>
      </div>
      <div className="overflow-x-auto bg-white bg-opacity-80 rounded-lg p-4">
        <table className="w-full table-auto text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Ingredient</th>
              <th className="px-4 py-2">Total Used</th>
              <th className="px-4 py-2">Unit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="border-b">
                <td className="px-4 py-2">{row.ingredient}</td>
                <td className="px-4 py-2">{row.totalUsed}</td>
                <td className="px-4 py-2">{row.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Hourly sales tab
function HourlySales() {
  const data = [
    { hour: "11:00", salesCount: 5, totalRevenue: 50.0 },
    { hour: "12:00", salesCount: 8, totalRevenue: 80.0 },
    { hour: "13:00", salesCount: 10, totalRevenue: 100.0 },
  ];

  return (
    <div className="overflow-x-auto bg-white bg-opacity-80 rounded-lg p-4">
      <table className="w-full table-auto text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Hour of Day</th>
            <th className="px-4 py-2">Sales Count</th>
            <th className="px-4 py-2">Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b">
              <td className="px-4 py-2">{row.hour}</td>
              <td className="px-4 py-2">{row.salesCount}</td>
              <td className="px-4 py-2">${row.totalRevenue.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Main analytics pane
function Analytics() {
  const [currentTab, setCurrentTab] = useState("category");

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bobabackground.svg')" }}
    >
      <Header />
      <div className="p-6">
        <h1 className="text-4xl text-center text-white font-bold mb-6">Analytics</h1>
        {/* Tab Navigation */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setCurrentTab("category")}
            className={`px-4 py-2 mx-2 rounded transition-colors ${
              currentTab === "category" ? "bg-white text-black" : "bg-gray-700 text-white"
            }`}
          >
            Category Summary
          </button>
          <button
            onClick={() => setCurrentTab("product")}
            className={`px-4 py-2 mx-2 rounded transition-colors ${
              currentTab === "product" ? "bg-white text-black" : "bg-gray-700 text-white"
            }`}
          >
            Product Usage Table
          </button>
          <button
            onClick={() => setCurrentTab("hourly")}
            className={`px-4 py-2 mx-2 rounded transition-colors ${
              currentTab === "hourly" ? "bg-white text-black" : "bg-gray-700 text-white"
            }`}
          >
            Hourly Sales
          </button>
        </div>
        {/* Render tab content */}
        {currentTab === "category" && <CategorySummary />}
        {currentTab === "product" && <ProductUsage />}
        {currentTab === "hourly" && <HourlySales />}
      </div>
    </div>
  );
}

export default Analytics;
