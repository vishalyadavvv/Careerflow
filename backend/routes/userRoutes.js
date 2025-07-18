import express from 'express';
import path from 'path';
import multer from 'multer';
import { protect, authorizeRoles } from '../Middleware/authMiddleware.js';
import { updateProfile, uploadResume, uploadCompanyLogo } from '../Controllers/userController.js';

const router = express.Router();

// Setup multer storage for different uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'resume') {
      cb(null, 'uploads/resumes/');
    } else if (file.fieldname === 'logo') {
      cb(null, 'uploads/logos/');
    } else {
      cb(null, 'uploads/others/');
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter (optional, improve security)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

// ====================== ROUTES =======================
router.route('/profile')
  .put(protect, updateProfile);

router.route('/upload-resume')
  .post(protect, authorizeRoles('job_seeker'), upload.single('resume'), uploadResume);

router.route('/upload-logo')
  .post(protect, authorizeRoles('employer'), upload.single('logo'), uploadCompanyLogo);

export default router;
