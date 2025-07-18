import asyncHandler from 'express-async-handler';
import Job from '../Models/Job.js';
import User from '../Models/User.js'; // Assuming User model is used for 'company' ref

// @desc    Get all jobs with filtering and search
// @route   GET /api/jobs
// @access  Public
export const getJobs = asyncHandler(async (req, res) => {
    const { search, location, jobType, experienceLevel, salaryMin, salaryMax } = req.query;
    let query = {};

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { skillsRequired: { $regex: search, $options: 'i' } },
        ];
    }
    if (location) query.location = { $regex: location, $options: 'i' };
    if (jobType) query.jobType = jobType;
    if (experienceLevel) query.experienceLevel = experienceLevel;

    // Placeholder for salary filtering logic
    if (salaryMin || salaryMax) {
        // TODO: Implement salary range filtering if needed
    }

    const jobs = await Job.find(query).populate('company', 'companyName companyLogo location website');
    res.json(jobs);
});

// @desc    Get a single job by ID
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id).populate('company', 'companyName companyLogo website companyDescription location');
    if (job) {
        res.json(job);
    } else {
        res.status(404);
        throw new Error('Job not found');
    }
});

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Protected (Employer/Admin)
export const createJob = asyncHandler(async (req, res) => {
    if (req.user.role !== 'employer' && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Only employers or administrators can post jobs.');
    }

    const { title, location, salaryRange, jobType, experienceLevel, description, requirements, responsibilities, skillsRequired, expiresAt } = req.body;

    if (!title || !location || !jobType || !experienceLevel || !description || !requirements) {
        res.status(400);
        throw new Error('Please fill all required job fields.');
    }

    const job = new Job({
        title,
        company: req.user._id,
        location,
        salaryRange,
        jobType,
        experienceLevel,
        description,
        requirements,
        responsibilities,
        skillsRequired,
        postedBy: req.user._id,
        expiresAt,
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
});

// @desc    Get jobs posted by the authenticated employer
// @route   GET /api/jobs/my-jobs
// @access  Protected (Employer)
export const getMyJobs = asyncHandler(async (req, res) => {
    if (req.user.role !== 'employer') {
        res.status(403);
        throw new Error('Only employers can view their posted jobs.');
    }
    const jobs = await Job.find({ postedBy: req.user._id }).populate('company', 'companyName');
    res.json(jobs);
});

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Protected (Employer/Admin)
export const updateJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        res.status(404);
        throw new Error('Job not found');
    }

    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Not authorized to update this job');
    }

    job.title = req.body.title || job.title;
    job.location = req.body.location || job.location;
    job.salaryRange = req.body.salaryRange || job.salaryRange;
    job.jobType = req.body.jobType || job.jobType;
    job.experienceLevel = req.body.experienceLevel || job.experienceLevel;
    job.description = req.body.description || job.description;
    job.requirements = req.body.requirements || job.requirements;
    job.responsibilities = req.body.responsibilities || job.responsibilities;
    job.skillsRequired = req.body.skillsRequired || job.skillsRequired;
    job.status = req.body.status || job.status;
    job.expiresAt = req.body.expiresAt || job.expiresAt;

    const updatedJob = await job.save();
    res.json(updatedJob);
});

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Protected (Employer/Admin)
export const deleteJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        res.status(404);
        throw new Error('Job not found');
    }

    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Not authorized to delete this job');
    }

    await Job.deleteOne({ _id: req.params.id });

    res.json({ message: 'Job removed' });
});
