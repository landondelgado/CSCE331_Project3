import React from 'react';

function Menu() {
  return (
    <div
      className="relative h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('./images/bobabackground.png')" }}
    >
      <div className="flex justify-between items-center p-4">
        <input
          type="text"
          className="px-5 py-2 border border-gray-300 rounded-full w-[70vh]"
          placeholder="Search Menu..."
        />
      </div>

      <div className="flex gap-5 mt-5 px-4">
        {/* Menu */}
        <div className="bg-white rounded-2xl w-full h-[650px] p-5 border border-gray-300">
          <h2 className="text-xl font-semibold mb-2">Menu</h2>
          {/* You can put order-related content here */}
        </div>

        {/* Order */}
        <div className="bg-white rounded-2xl w-1/3 h-[650px] p-5 border border-gray-300">
          <h2 className="text-xl font-semibold mb-2">Order</h2>
          {/* You can put additional content here */}
        </div>
      </div>
    </div>
  );
}

export default Menu;
