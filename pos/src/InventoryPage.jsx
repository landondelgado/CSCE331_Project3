import React from 'react';
import bobabackground from './images/bobabackground.svg';

export default function InventoryPage() {
    return(
    <div 
        className = "min-h-screen bg-blue-900 text-white bg-cover bg-no-repeat"
        style = {{ backgroundImage: `url(${bobabackground})`}}
        >
        
        {/*Header*/}
        <header className = "flex items-center justify-between p-4 bg-blue-800">
            {/* Left: Navigation Buttons */}
            <div className = "flex gap-4">
                <button className = "hover:text-gray-300">Menu</button>
                <button className = "hover:text-gray-300">Inventory</button>
                <button className = "hover:text:-gray-300">Analytics</button>
            </div>
            {/* Center: Logo and Title */}
            <div className = "text-center">
                <h1 className = "text-xl font-bold">Sharetea</h1>
                <p className = "text-sm">Inventory</p>
            </div>
            {/* Right: Time and Logout */}
            <div className = "text-right">
                <p className = "text-sm">04:35:32 PM</p>
                <button className = "hover:text-gray-300">Logout</button>
            </div>
        </header>
        {/* Main Content: Placeholder */}
        <main className = "p-4">
            <h2 className = "text-2x1 font-bold"> Inventory Page </h2>
            {/* Fill this with the tailwind layout & styling later*/}
            <p>Inventory content goes here.</p>
        </main>
        {/* Footer */}
    </div>
    )
}