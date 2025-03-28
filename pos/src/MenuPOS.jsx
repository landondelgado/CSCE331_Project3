import React from 'react';

function Header() {
  return (
      <div className="relative flex flex-row justify-center items-center bg-cover bg-center p-8">

          <div className="absolute top-0 h-20">
              <img src="/images/ShareteaLogo.png" alt="Sharetea" className="h-12" />
          </div>

          <div className="absolute right-7 top-6 flex items-center space-x-4">
              <div className="text-white text-4xl font-bold">10:42 AM</div>
              <button className="bg-white text-2xl font-semibold text-black rounded-full px-4 py-1 shadow">Logout</button>
          </div>
      </div>
  );
}

function MenuItem({ icon, label, color = "text-black"}) {
    return (
        <div className="flex flex-col items-center justify-center space-y-1">
            <img src={icon} alt={label} className="w-[175px] h-[175px]" />
            <div className={`text-xl font-bold ${color}`}>{label}</div>
        </div>
    );
}

function OrderSummary() {
    return (
        <div className="bg-white h-[750px] w-1/4 rounded-2xl shadow border border-blue-300 p-4 flex flex-col justify-between">
            <div>
                <h2 className="text-lg font-semibold text-center mb-2 border-b pb-2">Order</h2>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>MDM BRW HNY</span>
                        <span>$6.38</span>
                    </div>
                    <div className="flex justify-between text-green-500 pl-4 text-sm">
                        <span>+ Lychee</span>
                        <span>+ $1.00</span>
                    </div>
                    <div className="flex justify-between">
                        <span>MDM FRT TPCL</span>
                        <span>$7.49</span>
                    </div>
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

function MainMenu() {
    const menuItems = [
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
        <div className="bg-white rounded-3xl p-6 w-3/4 h-[750px] shadow-lg flex flex-col justify-between">
            <div className="grid grid-cols-4 gap-6">
                {menuItems.map((item, index) => (
                    <MenuItem key={index} {...item} />
                ))}
            </div>
        </div>
    );
}

function MenuPOS() {
    return (
        <div className="h-screen w-screen bg-cover bg-center" style={{ backgroundImage: "url('./images/bobabackground.svg')" }}>
            <Header />
            <div className="flex gap-6 mt-6 px-6">
                <MainMenu />
                <OrderSummary />
            </div>
        </div>
    );
}

export default MenuPOS;
