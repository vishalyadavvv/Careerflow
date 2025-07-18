import express from 'express';
import { protect, authorizeRoles } from '../Middleware/authMiddleware.js';
import {
  applyForJob,
  getMyApplications,
  getApplicationsForJob,
  updateApplicationStatus,
} from '../Controllers/applicationController.js';

const router = express.Router();

router.route('/').post(protect, authorizeRoles('job_seeker'), applyForJob); // Apply for a job
router.route('/my-applications').get(protect, authorizeRoles('job_seeker'), getMyApplications); // Get job seeker's applications
router.route('/:id/status').put(protect, authorizeRoles('employer', 'admin'), updateApplicationStatus); // Update application status
router.route('/job/:jobId').get(protect, authorizeRoles('employer', 'admin'), getApplicationsForJob); // Get all applications for a specific job

export default router;
