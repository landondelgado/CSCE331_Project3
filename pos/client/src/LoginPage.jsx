import React from 'react';
import { useNavigate } from 'react-router-dom';
import customerIcon from './images/customer.png';
import shareteaLogo from './images/ShareteaLogo.png';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './default_styles.css';

const AUTH_API_BASE =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/api/auth'
    : '/api/auth';

function LoginPage() {
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const email = decoded.email;
  
    try {
      const res = await fetch(`${AUTH_API_BASE}/google-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  
      const result = await res.json();
  
      if (!res.ok) throw new Error(result.error);
  
      // Save user data in localStorage
      localStorage.setItem('user', JSON.stringify(result));
  
      // Navigate to POS page
      navigate('/menupos');
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  const goToPOSMenu = (e) => {
    e.preventDefault();
    navigate('/menupos');
  };

  const handleGoogleLoginError = () => {
    console.error('Google login failed');
  };

  return (
    <div
      className="relative h-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('./images/bobabackground.svg')" }}
    >
      <img src={shareteaLogo} alt="Sharetea Logo" className="absolute top-0 h-20" />

      <CustomerInterfaceButton />

      <div className="bg-white/90 p-10 rounded-xl w-72 text-center">
        <h2 className="mb-5 text-2xl font-semibold text-black">Log in to Cashier Register</h2>
          {/* Google Login */}
          <div className="mt-4">
            <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} />
          </div>
      </div>
    </div>
  );
}

function MediumButton(props) {
  return (
    <button
      type="submit"
      className="w-full px-3 py-2 bg-[#6b4f4f] text-white rounded-md text-base hover:bg-[#5c4040] transition"
    >
      {props.children}
    </button>
  );
}

function CustomerInterfaceButton() {
  const navigate = useNavigate();

  const goToCustomerInterface = (e) => {
    e.preventDefault();
    navigate('/menu');
  };

  return (
    <div className="absolute top-5 right-5">
      <button
        onClick={goToCustomerInterface}
        className="flex flex-col items-center px-4 py-3 bg-white/90 rounded-md shadow hover:shadow-md transition"
      >
        <img src={customerIcon} alt="Customer Interface" className="w-14 h-14 mb-2" />
        <span className="text-sm text-gray-800">Customer Interface</span>
      </button>
    </div>
  );
}

export default LoginPage;
