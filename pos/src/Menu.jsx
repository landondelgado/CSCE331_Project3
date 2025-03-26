// Menu.jsx
import React from 'react';
import customerIcon from './images/customer.png';
import './default_styles.css';
function Menu() {
  return (
    <div className = "menu-container">
      <div className = "cust-header">
      <input type="text" className="search-bar" placeholder="Search Menu..." />
      </div>
      <div className="order-content">
        {/* Menu */}
        <div className="left-box">
          <h2>Menu</h2>
          {/* You can put order-related content here */}
        </div>

        {/* Order */}
        <div className="right-box">
          <h2>Order</h2>
          {/* You can put additional content here */}
        </div>
      </div>
    </div>
  );
}

export default Menu;
