// backend/controllers/authController.js (functions as userController for auth)
import asyncHandler from 'express-async-handler';
import User from '../Models/User.js';  // Ensure your file is named User.js with .js extension when importing in ESM
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user (Job Seeker or Employer)
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const {
    username, email, password, role,
    companyName, companyDescription, website,
    location, skills, experience, education
  } = req.body;

  const profilePicture = req.uploadedFileUrl || undefined;

  if (!username || !email || !password || !role) {
    res.status(400);
    throw new Error('Please enter all required fields: username, email, password, and role.');
  }

  const userExists = await User.findOne({ $or: [{ email }, { username }] });

  if (userExists) {
    res.status(400);
    throw new Error('User with this email or username already exists.');
  }

  const userData = {
    username,
    email,
    password,
    role,
    location: location || '',
    profilePicture: profilePicture || undefined
  };

  if (role === 'employer') {
    if (!companyName) {
      res.status(400);
      throw new Error('Company name is required for employer registration.');
    }
    userData.companyName = companyName;
    userData.companyDescription = companyDescription || '';
    userData.website = website || '';
  } else if (role === 'job_seeker') {
    userData.skills = skills ? JSON.parse(skills) : [];
    userData.experience = experience || '';
    userData.education = education || '';
  }

  const user = await User.create(userData);

  if (user) {
    const userResponseData = await User.findById(user._id).select('-password');
    res.status(201).json({
      message: 'User registered successfully',
      user: userResponseData,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data provided.');
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await user.matchPassword(password);

  if (isPasswordValid) {
    const userResponseData = user.toObject();
    delete userResponseData.password;

    res.json({
      message: 'Login successful',
      user: userResponseData,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Protected
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        location: user.location,
        companyName: user.companyName,
        companyDescription: user.companyDescription,
        website: user.website,
        companyLogo: user.companyLogo,
        resumeUrl: user.resumeUrl,
        skills: user.skills,
        experience: user.experience,
        education: user.education,
      },
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
