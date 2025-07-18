import asyncHandler from 'express-async-handler';
import User from '../Models/User.js';
import generateToken from '../utils/generateToken.js';
import cloudinary from '../config/cloudinaryConfig.js'; // keep if needed

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, role, companyName, companyDescription, website, phone, skills, experience, education, location } = req.body;
    const profilePicture = req.uploadedFileUrl;

    if (!username || !email || !password || !role) {
        res.status(400);
        throw new Error('Please provide username, email, password, and role.');
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
        profilePicture: profilePicture || 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
        location: location || '',
    };

    if (role === 'employer') {
        if (!companyName) {
            res.status(400);
            throw new Error('Company name is required for employer registration.');
        }
        userData.companyName = companyName;
        userData.companyDescription = companyDescription || '';
        userData.website = website || '';
    }

    if (role === 'job_seeker') {
        userData.skills = skills ? JSON.parse(skills) : [];
        userData.experience = experience || '';
        userData.education = education || '';
    }

    const user = await User.create(userData);

    if (user) {
        res.status(201).json({
            message: 'User registered successfully',
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
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data.');
    }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
        const userResponse = user.toObject();
        delete userResponse.password;

        res.json({
            message: 'Login successful',
            user: userResponse,
            token: generateToken(user._id),
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
        res.json({ user });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Search for users
// @route   GET /api/users?search=keyword
// @access  Protected
export const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { username: { $regex: req.query.search, $options: 'i' } },
                { email: { $regex: req.query.search, $options: 'i' } },
            ],
        }
        : {};

    const users = await User.find(keyword)
        .find({ _id: { $ne: req.user._id } })
        .select('-password');
    res.send(users);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Protected
export const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.location = req.body.location || user.location;

    if (req.body.password && req.body.password.length > 0) {
        user.password = req.body.password;
    }

    if (req.body.profilePicture) {
        user.profilePicture = req.body.profilePicture;
    } else if (req.uploadedFileUrl) {
        user.profilePicture = req.uploadedFileUrl;
    }

    if (user.role === 'job_seeker') {
        user.skills = req.body.skills ? JSON.parse(req.body.skills) : user.skills;
        user.experience = req.body.experience || user.experience;
        user.education = req.body.education || user.education;
    }

    if (user.role === 'employer') {
        user.companyName = req.body.companyName || user.companyName;
        user.companyDescription = req.body.companyDescription || user.companyDescription;
        user.website = req.body.website || user.website;
    }

    const updatedUser = await user.save();
    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.json({
        message: 'Profile updated successfully',
        user: userResponse,
    });
});

// @desc    Upload resume
// @route   POST /api/users/upload-resume
// @access  Protected (Job Seeker)
export const uploadResume = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (user.role !== 'job_seeker') {
        res.status(403);
        throw new Error('Only job seekers can upload resumes.');
    }

    if (!req.file || !req.uploadedFileUrl) {
        res.status(400);
        throw new Error('No file provided or failed to upload.');
    }

    user.resumeUrl = req.uploadedFileUrl;
    await user.save();

    res.json({
        message: 'Resume uploaded successfully',
        resumeUrl: req.uploadedFileUrl,
    });
});

// @desc    Upload company logo
// @route   POST /api/users/upload-logo
// @access  Protected (Employer)
export const uploadCompanyLogo = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (user.role !== 'employer') {
        res.status(403);
        throw new Error('Only employers can upload company logos.');
    }

    if (!req.file || !req.uploadedFileUrl) {
        res.status(400);
        throw new Error('No file provided or failed to upload.');
    }

    user.companyLogo = req.uploadedFileUrl;
    await user.save();

    res.json({
        message: 'Company logo uploaded successfully',
        companyLogo: req.uploadedFileUrl,
    });
});
