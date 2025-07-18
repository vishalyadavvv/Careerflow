import asyncHandler from 'express-async-handler';
import Application from '../Models/Application.js';
import Job from '../Models/Job.js';
import User from '../Models/User.js'; // To populate applicant user details

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Protected (Job Seeker)
export const applyForJob = asyncHandler(async (req, res) => {
    const { jobId, coverLetter } = req.body;
    const applicant = req.user;

    if (applicant.role !== 'job_seeker') {
        res.status(403);
        throw new Error('Only job seekers can apply for jobs.');
    }

    if (!jobId) {
        res.status(400);
        throw new Error('Job ID is required to apply.');
    }

    const job = await Job.findById(jobId);
    if (!job) {
        res.status(404);
        throw new Error('Job not found.');
    }

    if (!applicant.resumeUrl) {
        res.status(400);
        throw new Error('Please upload your resume to your profile before applying for jobs.');
    }

    const existingApplication = await Application.findOne({ job: jobId, applicant: applicant._id });
    if (existingApplication) {
        res.status(400);
        throw new Error('You have already applied for this job.');
    }

    const application = new Application({
        job: jobId,
        applicant: applicant._id,
        resumeUrl: applicant.resumeUrl,
        coverLetter,
        status: 'Pending',
    });

    const createdApplication = await application.save();

    job.applicants.push(createdApplication._id);
    await job.save();

    res.status(201).json(createdApplication);
});

// @desc    Get all applications for the authenticated job seeker
// @route   GET /api/applications/my-applications
// @access  Protected (Job Seeker)
export const getMyApplications = asyncHandler(async (req, res) => {
    if (req.user.role !== 'job_seeker') {
        res.status(403);
        throw new Error('Only job seekers can view their applications.');
    }

    const applications = await Application.find({ applicant: req.user._id })
        .populate('job', 'title company location')
        .populate({
            path: 'job',
            populate: { path: 'company', select: 'companyName companyLogo' }
        });

    res.json(applications);
});

// @desc    Get all applications for a specific job (for employer)
// @route   GET /api/jobs/:jobId/applications
// @access  Protected (Employer/Admin)
export const getApplicationsForJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
        res.status(404);
        throw new Error('Job not found.');
    }

    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Not authorized to view applications for this job.');
    }

    const applications = await Application.find({ job: req.params.jobId })
        .populate('applicant', 'username email profilePicture location skills experience education resumeUrl');

    res.json(applications);
});

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Protected (Employer/Admin)
export const updateApplicationStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const application = await Application.findById(req.params.id).populate('job', 'postedBy');

    if (!application) {
        res.status(404);
        throw new Error('Application not found.');
    }

    if (application.job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Not authorized to update this application status.');
    }

    if (!['Pending', 'Reviewed', 'Interviewing', 'Rejected', 'Hired'].includes(status)) {
        res.status(400);
        throw new Error('Invalid application status.');
    }

    application.status = status;
    const updatedApplication = await application.save();

    res.json(updatedApplication);
});
