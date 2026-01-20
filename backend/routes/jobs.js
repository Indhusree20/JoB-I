const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Job = require('../models/Job');
const Application = require('../models/Application');

// @route   POST api/jobs
// @desc    Create a job
// @access  Private (Recruiter only)
router.post('/', auth, async (req, res) => {
    try {
        console.log('Headers:', req.headers);
        console.log('Body:', req.body);
        if (req.user.role !== 'recruiter') {
            return res.status(403).json({ msg: 'Not authorized to post jobs' });
        }

        const { title, company, location, description, requirements } = req.body;

        const newJob = new Job({
            title,
            company,
            location,
            description,
            requirements,
            recruiterId: req.user.id
        });

        const job = await newJob.save();
        res.json(job);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ postedAt: -1 });
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/jobs/:id/apply
// @desc    Apply for a job
// @access  Private (Job Seeker only)
router.post('/:id/apply', auth, async (req, res) => {
    try {
        if (req.user.role !== 'jobSeeker') {
            return res.status(403).json({ msg: 'Only job seekers can apply' });
        }

        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        // Check if already applied
        const existingApplication = await Application.findOne({
            jobId: req.params.id,
            applicantId: req.user.id
        });

        if (existingApplication) {
            return res.status(400).json({ msg: 'You have already applied to this job' });
        }

        const newApplication = new Application({
            jobId: req.params.id,
            applicantId: req.user.id
        });

        await newApplication.save();
        res.json({ msg: 'Application submitted successfully' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/jobs/:id/applications
// @desc    Get applications for a job
// @access  Private (Recruiter only)
router.get('/:id/applications', auth, async (req, res) => {
    try {
        if (req.user.role !== 'recruiter') {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        // Check if user is the owner of the job
        if (job.recruiterId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        const applications = await Application.find({ jobId: req.params.id })
            .populate('applicantId', 'name email');

        res.json(applications);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
