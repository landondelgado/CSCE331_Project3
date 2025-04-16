import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/menupos'
    : '/api/menupos'; //connects backend to frontend
// Creates header with logo, navigate buttons, time, and logout
function Header() {
  const [time, setTime] = useState(getCurrentTime());
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [translateText, setTranslateText] = useState('Translate');
  const translations = ['Translate', 'Traducir', '翻译'];

  // State to manage modal visibility
  const [showTranslateModal, setShowTranslateModal] = useState(false);
  // Track if the Google Translate script has finished loading
  const [scriptLoaded, setScriptLoaded] = useState(false);

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Cycle translate button text every 5 seconds
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % translations.length;
      setTranslateText(translations[index]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: 'Login', icon: '/images/back.png', route: '/' },
  ];

  // -------------------------
  // 1. Load the Google Translate script once
  useEffect(() => {
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      // Note: The callback in the URL will call our global function below
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  // -------------------------
  // 2. Define the global initialization callback (only once)
  useEffect(() => {
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = function () {
      };
    }
  }, []);

  // -------------------------
  // 3. Reinitialize the Translate widget every time the modal opens,
  // but only if the script has been loaded.
  useEffect(() => {
    if (showTranslateModal && scriptLoaded) {
      // Check if the widget constructor is available
      if (
        window.google &&
        window.google.translate &&
        typeof window.google.translate.TranslateElement === 'function'
      ) {
        const container = document.getElementById('google_translate_element');
        if (container) {
          // Clear any old content
          container.innerHTML = '';
          // Instantiate a new Google Translate widget in the container.
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,es,fr', // Limit to English, Spanish, French
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            'google_translate_element'
          );
        }
      }
    }
  }, [showTranslateModal, scriptLoaded]);

  return (
    <div className="relative flex flex-row justify-center items-center bg-cover bg-center h-20 py-6 px-8">
      {/* Nav Buttons & Search Bar */}
      <div className="absolute top-4 left-12 flex space-x-6 items-center">
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
        {/* Search Bar */}
        <div className="relative w-80">
          <img
            src="/images/search.png"
            alt="Search"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
          <input
            type="text"
            placeholder="Search Menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 pr-6 py-3 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {/* Modified Translate Button */}
        <button
          onClick={() => setShowTranslateModal(true)}
          className="flex flex-col items-center text-white hover:scale-105 transition-transform"
        >
          <img src="/images/translate.png" alt="Translate" className="w-10 h-10 mb-1" />
          <span className="text-xs sm:text-sm font-medium block w-full text-center truncate">
            {translateText}
          </span>
        </button>
      </div>

      {/* Logo */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <img src="/images/ShareteaLogo.png" alt="Sharetea" className="h-16" />
      </div>

      {/* Time + Logout */}
      <div className="absolute right-6 top-5 flex items-center space-x-4">
        <div className="bg-slate-600 py-2 px-4 rounded-full text-white text-2xl font-bold">
          {time}
        </div>
      </div>

      {/* Translation Modal Popup */}
      {showTranslateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Translate Page</h2>
            {/* Container for the Google Translate widget */}
            <div id="google_translate_element"></div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setShowTranslateModal(false)}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Modal for Category 
function CategoryModal({ isOpen, onClose, title, items = [], onItemSelect }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="relative bg-gradient-to-br from-white to-gray-100 w-[90%] max-w-fit h-[90%] max-h-fit rounded-xl shadow-xl p-8 overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-3xl font-bold"
        >
          &times;
        </button>

        {/* Category Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{title}</h2>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-6 px-28 pb-6">
          {items.map((item) => {
            const outOfStock = item.stock <= 0;
            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl shadow-md overflow-hidden transition cursor-pointer ${
                  outOfStock ? 'opacity-50 grayscale pointer-events-none' : 'hover:shadow-xl'
                }`}
                onClick={() => !outOfStock && onItemSelect(item)}
              >
                <div className="w-full h-[400px] overflow-hidden">
                  <img
                    src={`/images/${item.name.toLowerCase().replace(/ /g, '_')}.png`}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => (e.target.src = '/images/default.png')}
                  />
                </div>
                <div className="p-4 text-center">
                  <h3
                    className={`text-base font-semibold text-gray-800 ${
                      outOfStock ? 'line-through' : ''
                    }`}
                  >
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">${parseFloat(item.price).toFixed(2)}</p>
                  {outOfStock && (
                    <p className="text-red-500 text-xs font-semibold">Out of Stock</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Modal for customizing an item
function CustomizeItemModal({ item, isOpen, onClose, onAddToCart, editing }) {
  const [toppings, setToppings] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);

  // Retrieve toppings from database
  useEffect(() => {
    if (isOpen) {
      fetch(`${API_BASE}/menu-items/toppings`)
        .then((res) => res.json())
        .then((data) => setToppings(data))
        .catch((err) => console.error('Toppings fetch error:', err));
    }
  }, [isOpen]);

  // Handles selecting toppings
  useEffect(() => {
    if (isOpen && item?.toppings) {
      setSelectedToppings(item.toppings || []);
    } else if (!isOpen) {
      setSelectedToppings([]);
    }
  }, [isOpen, item]);

  // Adds and removes toppings from selected toppings
  const toggleTopping = (topping) => {
    setSelectedToppings((prev) =>
      prev.some((t) => t.id === topping.id)
        ? prev.filter((t) => t.id !== topping.id)
        : [...prev, topping]
    );
  };

  // Builds full item with selected toppings and calculated price, then adds it to the cart
  const handleAdd = () => {
    const totalPrice =
      parseFloat(item.basePrice ?? item.price) +
      selectedToppings.reduce((sum, t) => sum + parseFloat(t.price), 0);

    const fullItem = {
      ...item,
      basePrice: parseFloat(item.basePrice ?? item.price),
      toppings: selectedToppings,
      price: totalPrice.toFixed(2),
    };
    onAddToCart(fullItem);
    onClose();
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-3xl p-6 flex gap-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-black"
        >
          &times;
        </button>

        {/* Item Image and Description */}
        <div className="flex-1">
          <img
            src={`/images/${item.name.toLowerCase().replace(/ /g, '_')}.png`}
            alt={item.name}
            className="w-full h-400 object-cover rounded-xl"
            onError={(e) => (e.target.src = '/images/default.png')}
          />
          <p className="text-center mt-4 font-semibold">{item.name}</p>
          <p className="text-center text-gray-600 text-sm">
            Customize your drink with toppings
          </p>
        </div>

        {/* Toppings */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-center mb-4">Toppings</h2>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {toppings.map((topping) => {
            const selected = selectedToppings.some((t) => t.id === topping.id);
            const outOfStock = topping.stock <= 0;

            return (
              <div
                key={topping.id}
                className={`flex items-center justify-between px-4 py-2 rounded-lg shadow-sm ${
                  outOfStock ? 'bg-gray-200 opacity-50' : 'bg-gray-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                  <span
                    className={`font-medium text-gray-800 ${
                      outOfStock ? 'line-through' : ''
                    }`}
                  >
                    {topping.name}
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base">
                    ${parseFloat(topping.price).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-center h-full">
                  {!outOfStock && (
                    <button
                      onClick={() => toggleTopping(topping)}
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-[20px] font-bold leading-[0] p-0 ${
                        selected
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-green-500 hover:bg-green-600'
                      }`}
                    >
                      {selected ? '−' : '+'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          </div>

          {/* Add to Cart/Update Item Button */}
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white w-full mt-4 py-2 rounded-md text-lg font-semibold"
          >
            {editing ? 'Update Item' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Sorts menu items by category
function MenuCategory({ icon, label, color = "text-black", onClick, showPopup, menuItems = [], onItemSelect}) { 
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

// Shows and documents current transaction
function OrderSummary({ orderItems = [], onCheckout, onEditItem, onRemoveItem }) { 
  const total = orderItems.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);

  return (
    <div className="bg-white w-full max-w-[25%] rounded-2xl shadow border border-blue-300 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold text-center mb-2 border-b pb-2">Order</h2>
        {/* Items */}
        <div className="flex-grow overflow-y-auto max-h-[60vh]">
        {orderItems.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow p-3 flex gap-4 items-center"
          >
            <img
              src={`/images/${item.name.toLowerCase().replace(/ /g, '_')}.png`}
              alt={item.name}
              className="w-20 h-full object-cover rounded-md"
              onError={(e) => (e.target.src = '/images/default.png')}
            />

            <div className="flex flex-col flex-1">
              <span className="font-bold text-slate-700 text-lg">{item.name}</span>
              <span className="text-black text-md">${parseFloat(item.price).toFixed(2)}</span>
              {item.toppings?.length > 0 && (
                <span className="text-gray-600 text-sm">{item.toppings.map(t => t.name).join(', ')}</span>
              )}
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-green-500 text-white px-4 py-1 rounded-full"
                  onClick={() => onEditItem(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded-full"
                  onClick={() => onRemoveItem(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Gift Card and Checkout Buttons */}
      <div>
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

// Renders Menu Panel
function MainMenu({ onAddToOrder }) {
  const [popupCategory, setPopupCategory] = useState("");
  const [menuItemsByCategory, setMenuItemsByCategory] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [customizeModalOpen, setCustomizeModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCategoryClick = (categoryLabel) => {
    if (popupCategory === categoryLabel) {
      setModalOpen(false);
      setPopupCategory("");
    } else {
      setPopupCategory(categoryLabel);
      setModalOpen(true);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setCustomizeModalOpen(true);
    setModalOpen(false); // ✅ Close CategoryModal
  };

  useEffect(() => {
    if (popupCategory && !menuItemsByCategory[popupCategory]) {
      fetch(`${API_BASE}/menu-items/${encodeURIComponent(popupCategory)}`)
        .then((response) => response.json())
        .then((data) => {
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
    <>
      <div className="bg-white rounded-3xl p-6 w-full max-w-[75%] min-w-[75%] flex-grow shadow-lg flex flex-col justify-between">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {menuCategories.map((item, index) => (
            <MenuCategory
              key={index}
              {...item}
              onClick={() => handleCategoryClick(item.label)}
            />
          ))}
        </div>
      </div>

      <CategoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={popupCategory}
        items={menuItemsByCategory[popupCategory] || []}
        onItemSelect={handleItemClick}
      />

      <CustomizeItemModal
        item={selectedItem}
        isOpen={customizeModalOpen}
        onClose={() => {
          setCustomizeModalOpen(false);
        }}
        onAddToCart={onAddToOrder}
      />
    </>
  );
}
function Menu() {
  const [orderItems, setOrderItems] = useState([]);
  const [customizeModalOpen, setCustomizeModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const navigate = useNavigate();

  const handleAddToOrder = (item) => {
    if (editingIndex !== null) {
      const updated = [...orderItems];
      updated[editingIndex] = item;
      setOrderItems(updated);
      setEditingIndex(null);
    } else {
      setOrderItems((prev) => [...prev, item]);
    }
  };

  const handleEditItem = (index) => {
    const item = orderItems[index];
    setSelectedItem(item);
    setEditingIndex(index);
    setCustomizeModalOpen(true);
  };
  
  const handleRemoveItem = (index) => {
    const updated = [...orderItems];
    updated.splice(index, 1);
    setOrderItems(updated);
  };

  const handleCheckout = async () => {
    try {
      // Send Request to backend
      const response = await fetch(`${API_BASE}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: orderItems }),
      });
      
      // Wait for backend to verify
      const data = await response.json();
      if (response.ok) {
        setShowSuccessOverlay(true);
        setOrderItems([]);
      
        setTimeout(() => setShowSuccessOverlay(false), 2000);
      } else {
        alert('Checkout failed: ' + data.error);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('An unexpected error occurred.');
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex justify-center"
      style={{ backgroundImage: "url('./images/bobabackground.svg')" }}
    >
      <div className='w-full max-w-[1920px] min-w-[1920px]'>
        <Header />
        <main className="flex flex-1 gap-6 p-6 overflow-auto">
          <MainMenu onAddToOrder={handleAddToOrder} />
          <OrderSummary
            orderItems={orderItems}
            onEditItem={handleEditItem}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />
        </main>

        <CustomizeItemModal
          item={selectedItem}
          isOpen={customizeModalOpen}
          onClose={() => {
            setCustomizeModalOpen(false);
            setEditingIndex(null);
          }}
          onAddToCart={handleAddToOrder}
          editing={editingIndex !== null}
        />

        {showSuccessOverlay && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className=" text-white text-xl font-bold px-8 py-4">
              Checkout Successful!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
