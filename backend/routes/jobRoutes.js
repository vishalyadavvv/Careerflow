import express from 'express';
import { protect, authorizeRoles } from '../Middleware/authMiddleware.js';
import {
    getJobs,
    getJobById,
    createJob,
    getMyJobs,
    updateJob,
    deleteJob
} from '../Controllers/jobController.js';

const router = express.Router();

router.route('/')
    .get(getJobs) // Publicly accessible for job search
    .post(protect, authorizeRoles('employer', 'admin'), createJob); // Only employers/admins can create

router.route('/my-jobs').get(protect, authorizeRoles('employer'), getMyJobs); // Employer's own job listings

router.route('/:id')
    .get(getJobById) // Publicly accessible to view details
    .put(protect, authorizeRoles('employer', 'admin'), updateJob) // Only poster/admin can update
    .delete(protect, authorizeRoles('employer', 'admin'), deleteJob); // Only poster/admin can delete

export default router;
