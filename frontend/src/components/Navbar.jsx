import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">JobSearch</Link>
                <ul className="nav-links">
                    {!user ? (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    ) : (
                        <>
                            <li><span>Hello, {user.name} ({user.role})</span></li>
                            <li><button onClick={handleLogout} className="btn" style={{padding: '5px 10px', fontSize: '14px'}}>Logout</button></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
