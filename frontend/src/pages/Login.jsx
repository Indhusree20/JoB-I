import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            login(res.data.token, res.data.user);
            toast.success('Login Successful');
            navigate('/');
        } catch (err) {
            console.error(err.response.data);
            toast.error(err.response?.data?.msg || 'Login Failed');
        }
    };

    return (
        <div className="container">
            <div className="card" style={{ maxWidth: '500px', margin: '50px auto' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-block">Login</button>
                    <p className="mt-2 text-center">
                        New here? <a href="/register" style={{color: 'var(--primary-blue)'}}>Register</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
