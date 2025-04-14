import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = //connect frontend to backend
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/menupos'
    : '/api/menupos';

function Header() { //sets up navbar at the top
  const [time, setTime] = useState(getCurrentTime());
  const navigate = useNavigate();

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const user = JSON.parse(localStorage.getItem('user'));

  const navItems = [
    { label: 'Home', icon: '/images/home.png', route: '/menupos' },
    ...(user?.isManager
      ? [
          { label: 'Analytics', icon: '/images/analytics.png', route: '/analytics' },
          { label: 'Inventory', icon: '/images/inventory.png', route: '/inventory' }
        ]
      : [])
  ];

  return (
    <div className="relative flex flex-row justify-center items-center bg-cover bg-center h-20 py-6 px-8">
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

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <img src="/images/ShareteaLogo.png" alt="Sharetea" className="h-16" />
      </div>

      <div className="absolute right-6 top-5 flex items-center space-x-4">
        <button
          className="bg-red-500 text-lg sm:text-xl font-semibold text-white rounded-full px-4 py-1 shadow"
          onClick={() => {
            if (window.google?.accounts?.id) {
              window.google.accounts.id.disableAutoSelect();
            }
            localStorage.removeItem('user');
            navigate('/');
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function MenuCategory({ icon, label, color = "text-black", onClick, showPopup, menuItems = [], onItemSelect}) { //sorts menu items by category
  return (
    <div className="relative flex flex-col items-center w-full">
      <button
        onClick={onClick}
        className="flex flex-col items-center justify-center space-y-2 w-full"
      >
        <img src={icon} alt={label} className="w-full max-w-[8rem] aspect-square object-cover rounded-xl" />
        <div className={`text-lg font-extrabold tracking-wide underline ${color}`}>
          {label}
        </div>
      </button>

      {showPopup && ( //puts items as buttons in popups
        <div className="absolute top-full mt-2 bg-white border border-gray-400 shadow-md rounded-md p-6 z-50 w-[16rem] max-h-[20rem] overflow-auto">
        <p className="text-black font-semibold mb-2">{label} Items</p>
        <div className="flex flex-col space-y-2">
            {menuItems.length > 0 ? (
            menuItems.map((item) => (
                <button
                key={item.id}
                className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
                onClick={() => onItemSelect?.(item)}
                >
                {item.name}
                </button>
            ))
            ) : (
            <p className="text-gray-500 text-sm italic">No items found.</p>
            )}
        </div>
        </div>
    )}
    </div>
  );
}

function OrderSummary({ orderItems = [], onCheckout }) { //shows and documents current transaction
    const total = orderItems.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);
  
    return (
      <div className="bg-white w-full max-w-[20%] rounded-2xl shadow border border-blue-300 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-center mb-2 border-b pb-2">Order</h2>
          <div className="space-y-2">
            {orderItems.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span>${parseFloat(item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-center text-red-600 text-sm mt-4 mb-2">EDIT ORDER</p>
          <button className="bg-gray-200 w-full py-2 rounded-md mb-2">Gift Card</button>
          <button
            className="bg-green-500 text-white w-full py-2 rounded-md font-semibold"
            onClick={onCheckout}
          >
            Checkout
          </button>
          <p className="text-right font-semibold mt-2">Total: <span>${total}</span></p>
        </div>
      </div>
    );
  }
  

function MainMenu({ onAddToOrder }) { //documents transaction and combines other classes
    const [popupCategory, setPopupCategory] = useState("");
    const [menuItemsByCategory, setMenuItemsByCategory] = useState({});
    const handleCategoryClick = (categoryLabel) => {
      if (popupCategory === categoryLabel) {
        setPopupCategory(""); // Close if already open
      } else {
        setPopupCategory(categoryLabel); // Open new popup
      }
    };
  
    useEffect(() => {
      if (popupCategory && !menuItemsByCategory[popupCategory]) {
        fetch(`${API_BASE}/menu-items/${encodeURIComponent(popupCategory)}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(`Fetched items for ${popupCategory}:`, data);
            setMenuItemsByCategory((prev) => ({
              ...prev,
              [popupCategory]: data,
            }));
          })
          .catch((error) => {
            console.error("Error fetching menu items:", error);
          });
      }
    }, [popupCategory]);
  
    const menuCategories = [
      { icon: "/images/brewed_tea.jpg", label: "Brewed Tea", color: "text-amber-900" },
      { icon: "/images/milk_tea.jpg", label: "Milk Tea" },
      { icon: "/images/fruit_tea.jpg", label: "Fruit Tea", color: "text-fuchsia-500" },
      { icon: "/images/fresh_milk.jpg", label: "Fresh Milk" },
      { icon: "/images/ice_blended.jpg", label: "Ice Blended", color: "text-cyan-500" },
      { icon: "/images/creama.jpg", label: "Creama", color: "text-amber-300" },
      { icon: "/images/tea_mojito.jpg", label: "Tea Mojito", color: "text-green-500" },
      { icon: "/images/new.png", label: "New", color: "text-yellow-400" },
      { icon: "/images/first.png", label: "TOP ORDER", color: "text-cyan-500" },
      { icon: "/images/second.png", label: "2nd TOP ORDER", color: "text-blue-900" },
      { icon: "/images/third.png", label: "3rd TOP ORDER", color: "text-blue-400" },
      { icon: "/images/fourth.png", label: "4th TOP ORDER", color: "text-red-500" },
    ];
  
    return (
        <div className="bg-white rounded-3xl p-6 w-full max-w-[80%] flex-grow shadow-lg flex flex-col justify-between">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {menuCategories.map((item, index) => (
              <MenuCategory
                key={index}
                {...item}
                onClick={() => handleCategoryClick(item.label)}
                showPopup={popupCategory === item.label}
                menuItems={menuItemsByCategory[item.label] || []}
                onItemSelect={onAddToOrder}
              />
            ))}
          </div>
        </div>
      );
  }
  

  function MenuPOS() {
    const [orderItems, setOrderItems] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => { //uses auth
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData) {
        localStorage.removeItem('user');
        navigate('/');
      }
    }, []);
    const handleAddToOrder = (item) => { //stores the order
      setOrderItems((prev) => [...prev, item]);
    };
    
    const handleClearOrder = () => { //clears order when transaction complete
      setOrderItems([]); // Clear the order
    };
  
    return (
      <div
        className="min-h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: "url('./images/bobabackground.svg')" }}
      >
        <Header />
        <main className="flex flex-1 gap-6 p-6 overflow-auto">
          <MainMenu onAddToOrder={handleAddToOrder} />
          <OrderSummary orderItems={orderItems} onCheckout={handleClearOrder} />
        </main>
      </div>
    );
  }
  


export default MenuPOS;
