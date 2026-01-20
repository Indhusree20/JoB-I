import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const JobSeekerDashboard = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/jobs');
                setJobs(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchJobs();
    }, []);

    const applyForJob = async (jobId) => {
        try {
            await axios.post(`http://localhost:5000/api/jobs/${jobId}/apply`);
            toast.success('Applied successfully!');
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.msg || 'Failed to apply');
        }
    };

    return (
        <div>
            <h2 className="mb-4" style={{color: 'var(--primary-blue)'}}>Available Jobs</h2>
            {jobs.length === 0 ? <p>No jobs available currently.</p> : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {jobs.map(job => (
                        <div key={job._id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <h3 style={{ marginBottom: '10px' }}>{job.title}</h3>
                                <p style={{ fontWeight: 'bold', color: 'var(--text-light)', marginBottom: '5px' }}>{job.company}</p>
                                <p style={{ fontSize: '14px', color: '#777', marginBottom: '15px' }}>📍 {job.location}</p>
                                <p style={{ marginBottom: '10px' }}>{job.description.length > 100 ? job.description.substring(0, 100) + '...' : job.description}</p>
                                <div style={{ fontSize: '14px', backgroundColor: '#f0f5ff', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
                                    <strong>Requirements:</strong><br/>
                                    {job.requirements ? job.requirements.substring(0, 80) + '...' : 'No specific requirements listed.'}
                                </div>
                            </div>
                            <button onClick={() => applyForJob(job._id)} className="btn btn-block">Apply Now</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobSeekerDashboard;
