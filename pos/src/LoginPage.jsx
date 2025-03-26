import React from 'react';
import { useNavigate } from 'react-router-dom';
import customerIcon from './images/customer.png';
import './default_styles.css';

function LoginPage() {
    const navigate = useNavigate();

    const goToPOSMenu = (e) => {
        e.preventDefault();
        // Add auth logic here later
        navigate('/menupos');
    };

    const goToCustomerInterface = (e) => {
        e.preventDefault();
        navigate('/menu');
    }

    return (
    <div className="main-container">
        <div className="customer-div">
            <button className="image-button" onClick={goToCustomerInterface}>
                <img src={customerIcon} alt="Customer Interface" className="button-icon" />
                <span className="button-text">Customer Interface</span>
            </button>
        </div>

        <div className="login-box">
            <h2 className="login-title">Log in to Register</h2>
            <form className="login-form" onSubmit={goToPOSMenu}>
                <input type="text" placeholder="Username" className="login-input" />
                <input type="password" placeholder="Password" className="login-input" />
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    </div>
    );
}

export default LoginPage;