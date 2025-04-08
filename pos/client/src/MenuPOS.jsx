import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Creates header with logo, navigate buttons, time, and logout
function Header() {
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
    ...(user?.isManager ? [
        { label: 'Analytics', icon: '/images/analytics.png', route: '/analytics' },
        { label: 'Inventory', icon: '/images/inventory.png', route: '/inventory' }
    ] : [])
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

// Generalized class to make menu category items
function MenuCategory({ icon, label, color = "text-black", onClick }) {
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center space-y-4 w-full"
        >
            <img src={icon} alt={label} className="w-full max-w-[8rem] aspect-square object-cover rounded-xl" />
            <div className={`text-lg font-extrabold tracking-wide underline ${color}`}>
                {label}
            </div>
        </button>
    );
}

// Class to make order summary panel
function OrderSummary() {
    return (
        // Order Div
        <div className="bg-white w-full max-w-[20%] rounded-2xl shadow border border-blue-300 p-4 flex flex-col justify-between">
            <div>
                <h2 className="text-lg font-semibold text-center mb-2 border-b pb-2">Order</h2>
                <div className="space-y-2">
                    {/*Place Order Items Here*/}
                </div>
            </div>

            <div>
                <p className="text-center text-red-600 text-sm mt-4 mb-2">EDIT ORDER</p>
                <button className="bg-gray-200 w-full py-2 rounded-md mb-2">Gift Card</button>
                <button className="bg-green-500 text-white w-full py-2 rounded-md font-semibold">Checkout</button>
                <p className="text-right font-semibold mt-2">Total: <span>$14.87</span></p>
            </div>
        </div>
    );
}

// Puts the categories into a div
function MainMenu() {
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
                    <MenuCategory key={index} {...item} />
                ))}
            </div>
        </div>
    );
}

// Constructs the MenuPOS screen
function MenuPOS() {
    const navigate = useNavigate();
    useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    
    if (!userData) {
        // Redirect to login page if not logged in
        localStorage.removeItem('user');
        navigate('/');
    }
    }, []);
    
    return (
        <div className="min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url('./images/bobabackground.svg')" }}>
            <Header />
            <main className="flex flex-1 gap-6 p-6 overflow-auto">
                <MainMenu />
                <OrderSummary />
            </main>
        </div>
    );
}

export default MenuPOS;
