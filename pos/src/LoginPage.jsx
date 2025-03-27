import React from 'react';
import { useNavigate } from 'react-router-dom';
import customerIcon from './images/customer.png';

// Puts together the entire login page
function LoginPage() {
    const navigate = useNavigate();

    const goToPOSMenu = (e) => {
        e.preventDefault();
        navigate('/menupos');
    };

    return (
        <div className="relative h-screen flex flex-col justify-center items-center bg-cover bg-center" style={{ backgroundImage: "url('./images/bobabackground.png')" }}>
            <CustomerInterfaceButton></CustomerInterfaceButton>

            <div className="bg-white/90 p-10 rounded-xl w-72 text-center">
                <h2 className="mb-5 text-2xl font-semibold text-black">Log in to Register</h2>
                <form onSubmit={goToPOSMenu} className="space-y-4">
                    <input type="text" placeholder="Username" className="w-full px-3 py-2 border border-gray-300 rounded-md text-base" />
                    <input type="password" placeholder="Password" className="w-full px-3 py-2 border border-gray-300 rounded-md text-base" />
                    <MediumButton>Login</MediumButton>
                </form>
            </div>
        </div>
    );
}

// Generalized medium button
function MediumButton(props){
    return (
        <button type="submit" className="w-full px-3 py-2 bg-[#6b4f4f] text-white rounded-md text-base hover:bg-[#5c4040] transition">{props.children}</button>
    );
}

// Customer interface button
function CustomerInterfaceButton(){
    const navigate = useNavigate();

    const goToCustomerInterface = (e) => {
        e.preventDefault();
        navigate('/menu');
    };

    return(
        <div className="absolute top-5 right-5">
            <button onClick={goToCustomerInterface} className="flex flex-col items-center px-4 py-3 bg-white/90 rounded-md shadow hover:shadow-md transition">
                <img src={customerIcon} alt="Customer Interface" className="w-14 h-14 mb-2" />
                <span className="text-sm text-gray-800">Customer Interface</span>
            </button>
        </div>
    );
}

export default LoginPage;
