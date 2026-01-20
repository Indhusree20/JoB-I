import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const RecruiterDashboard = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
        requirements: ''
    });
    const [myJobs, setMyJobs] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [applications, setApplications] = useState([]);

    const { title, company, location, description, requirements } = formData;

    useEffect(() => {
        fetchMyJobs();
    }, []);

    const fetchMyJobs = async () => {
        try {
            // In a real app we'd have a specific endpoint for "my jobs", but filtering client-side for simplicity or using getAll if small
            // Let's rely on the public endpoint and filter by stored user ID for now as we didn't make a specific "my-jobs" endpoint
            // Wait, we can't filter purely by client side securely, but for a simple app...
            // Let's make a quick "my jobs" simple fetch. Since getAll returns everything, we filter by recruiterId.
            // Note: In getAll jobs, we didn't verify it returns recruiterId on the object, let's check model.
            // Job model has recruiterId.
            const res = await axios.get('http://localhost:5000/api/jobs');
            // Assuming the simple auth setup, we trust the current user ID
            setMyJobs(res.data.filter(job => job.recruiterId === user.id));
        } catch (err) {
            console.error(err);
        }
    };

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/jobs', formData);
            toast.success('Job Posted Successfully');
            setFormData({
                title: '',
                company: '',
                location: '',
                description: '',
                requirements: ''
            });
            fetchMyJobs();
        } catch (err) {
            console.error(err);
            toast.error('Failed to post job');
        }
    };

    const viewApplications = async (jobId) => {
        if (selectedJobId === jobId) {
            setSelectedJobId(null);
            setApplications([]);
            return;
        }
        try {
            const res = await axios.get(`http://localhost:5000/api/jobs/${jobId}/applications`);
            setApplications(res.data);
            setSelectedJobId(jobId);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load applications');
        }
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '20px auto' }}>
            <div className="card">
                <h2 className="mb-4" style={{color: 'var(--primary-blue)'}}>Post a New Job</h2>
                <form onSubmit={onSubmit}>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                        <div className="form-group">
                            <label>Job Title</label>
                            <input type="text" name="title" value={title} onChange={onChange} required />
                        </div>
                        <div className="form-group">
                            <label>Company Name</label>
                            <input type="text" name="company" value={company} onChange={onChange} required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input type="text" name="location" value={location} onChange={onChange} required />
                    </div>
                    <div className="form-group">
                        <label>Job Description</label>
                        <textarea name="description" value={description} onChange={onChange} rows="3" required></textarea>
                    </div>
                    <div className="form-group">
                        <label>Requirements</label>
                        <textarea name="requirements" value={requirements} onChange={onChange} rows="3" required placeholder="Detail the skills and experience needed..."></textarea>
                    </div>
                    <button type="submit" className="btn">Post Job</button>
                </form>
            </div>

            <h2 className="mb-4" style={{color: 'var(--primary-blue)', marginTop: '40px'}}>My Posted Jobs</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {myJobs.map(job => (
                    <div key={job._id} className="card">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <div>
                                <h3>{job.title}</h3>
                                <p style={{color: '#777'}}>{job.location} • Posted on {new Date(job.postedAt).toLocaleDateString()}</p>
                            </div>
                            <button onClick={() => viewApplications(job._id)} className="btn" style={{backgroundColor: selectedJobId === job._id ? 'var(--secondary-blue)' : 'var(--primary-blue)'}}>
                                {selectedJobId === job._id ? 'Hide Applications' : 'View Applications'}
                            </button>
                        </div>
                        
                        {selectedJobId === job._id && (
                            <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px'}}>
                                <h4 style={{marginBottom: '10px'}}>Applicants ({applications.length})</h4>
                                {applications.length === 0 ? <p>No applications yet.</p> : (
                                    <ul style={{listStyle: 'none'}}>
                                        {applications.map(app => (
                                            <li key={app._id} style={{padding: '10px', borderBottom: '1px solid #eee'}}>
                                                <strong>{app.applicantId.name}</strong> ({app.applicantId.email})
                                                <span style={{float: 'right', fontSize: '12px', color: '#888'}}>Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecruiterDashboard;
