import React from 'react';
import { useNavigate } from 'react-router-dom';
import './default_styles.css';

function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // You can add auth logic here later
        navigate('/menu'); // Navigate to MainMenu
    };

    return (
    <div className="main-container">
        <div className="login-box">
            <h2 className="login-title">Welcome Back</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <input type="text" placeholder="Username" className="login-input" />
                <input type="password" placeholder="Password" className="login-input" />
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    </div>
    );
}

export default LoginPage;