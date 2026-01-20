import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import RecruiterDashboard from './RecruiterDashboard';
import JobSeekerDashboard from './JobSeekerDashboard';
import { Link } from 'react-router-dom';

const Home = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div className="container center" style={{marginTop: '50px'}}>Loading...</div>;

    if (!user) {
        return (
            <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
                <h1 style={{color: 'var(--primary-blue)', marginBottom: '20px'}}>Welcome to the Digital Job Portal</h1>
                <p style={{fontSize: '18px', color: 'var(--text-light)', marginBottom: '40px'}}>
                    Find your dream job or hire the best talent. Simple, fast, and effective.
                </p>
                <div style={{display: 'flex', justifyContent: 'center', gap: '20px'}}>
                    <Link to="/register" className="btn" style={{ fontSize: '20px', padding: '15px 30px'}}>Get Started</Link>
                    <Link to="/login" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary-blue)', border: '1px solid var(--primary-blue)', fontSize: '20px', padding: '15px 30px'}}>Login</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            {user.role === 'recruiter' ? <RecruiterDashboard /> : <JobSeekerDashboard />}
        </div>
    );
};

export default Home;
