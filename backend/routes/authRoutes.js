import express from "express";
import multer from "multer";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js"; // Make sure to add .js extension
import { protect } from "../Middleware/authMiddleware.js"; // Make sure to add .js extension

const router = express.Router();

// Multer setup for profile image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profiles/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
});

// ========================== DEBUG ROUTES ==========================

// Test route to check if user exists
router.get("/test-user/:email", async (req, res) => {
  try {
    const email = req.params.email;
    console.log("Testing user with email:", email);
    
    // Try multiple search methods
    const userNormal = await User.findOne({ email: email });
    const userLowercase = await User.findOne({ email: email.toLowerCase() });
    const userWithPassword = await User.findOne({ email: email.toLowerCase() }).select("+password");
    
    // Get all users to see what's in database
    const allUsers = await User.find({}, 'email username role');
    
    res.json({
      searchEmail: email,
      userNormal: userNormal ? "Found" : "Not found",
      userLowercase: userLowercase ? "Found" : "Not found", 
      userWithPassword: userWithPassword ? "Found with password" : "Not found",
      allUsersInDB: allUsers,
      userDetails: userWithPassword ? {
        email: userWithPassword.email,
        role: userWithPassword.role,
        hasPassword: !!userWithPassword.password
      } : null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Check registration data
router.get("/check-registration/:email", async (req, res) => {
  try {
    const email = req.params.email;
    
    // Find user with all possible variations
    const users = await User.find({
      $or: [
        { email: email },
        { email: email.toLowerCase() },
        { email: email.toUpperCase() },
        { email: { $regex: new RegExp(`^${email}$`, 'i') } }
      ]
    }).select("+password");
    
    const result = users.map(user => ({
      id: user._id,
      email: user.email,
      role: user.role,
      username: user.username,
      fullName: user.fullName,
      passwordExists: !!user.password,
      passwordLength: user.password ? user.password.length : 0,
      passwordIsHashed: user.password ? user.password.startsWith('$2') : false,
      createdAt: user.createdAt
    }));
    
    res.json({
      searchedEmail: email,
      foundUsers: result,
      totalFound: result.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test password
router.post("/test-password", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ 
      email: email.toLowerCase() 
    }).select("+password");
    
    if (!user) {
      return res.json({ message: "User not found" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    res.json({
      email: user.email,
      passwordFromDB: user.password.substring(0, 10) + "...", // Show first 10 chars
      providedPassword: password,
      isMatch: isMatch,
      passwordLength: user.password.length,
      isHashed: user.password.startsWith('$2')
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========================== REGISTER ==========================
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { username, email, password, fullName, role, companyName, phone } = req.body;

    if (!username || !email || !password || !fullName) {
      return res.status(400).json({
        message: "Please provide all required fields: username, email, password, and full name",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    if (username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(username)) {
      return res.status(400).json({
        message: "Username must be at least 3 characters and contain only letters, numbers, and underscores",
      });
    }

    const existingUser = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username }] });
    if (existingUser) {
      return res.status(409).json({
        message: existingUser.email === email.toLowerCase() ? "Email already registered" : "Username already taken",
      });
    }

    if (role === "employer" && !companyName) {
      return res.status(400).json({
        message: "Company name is required for employer registration",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const userData = {
      username,
      email: email.toLowerCase(), // Store email in lowercase
      password: hashedPassword,
      fullName,
      role: role || "job_seeker",
      phone: phone || "",
    };

    if (role === "employer") {
      userData.companyName = companyName;
    }

    if (req.file) {
      userData.profileImage = req.file.path;
    }

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const userResponse = savedUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "Registration successful",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(409).json({
        message: `${field} already exists`,
      });
    }

    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File size too large. Maximum 5MB allowed." });
      }
      return res.status(400).json({ message: "File upload error: " + error.message });
    }

    res.status(500).json({ message: "Server error during registration" });
  }
});

// ========================== LOGIN ==========================
router.post("/login", async (req, res) => {
  try {
    console.log("=== LOGIN ATTEMPT STARTED ===");
    console.log("Request body:", JSON.stringify(req.body, null, 2));
    
    const { email, password, role } = req.body;

    // Validate input
    if (!email || !password || !role) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ 
        message: "Email, password, and role are required"
      });
    }

    console.log("✅ All required fields present");

    // Search for user (case-insensitive email)
    console.log("🔍 Searching for user...");
    
    const user = await User.findOne({ 
      email: email.toLowerCase() 
    }).select("+password");
    
    console.log("User found:", user ? "Yes" : "No");
  
    if (!user) {
      console.log("❌ User not found in database");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("✅ User found!");
    console.log("User role:", user.role, "Requested role:", role);

    // Check role match
    if (user.role.toLowerCase() !== role.toLowerCase()) {
      console.log("❌ Role mismatch");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("✅ Role matches");

    // Check password
    console.log("🔍 Checking password...");
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);
      
    if (!isMatch) {
      console.log("❌ Password does not match");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("✅ Password matches");

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    
    // Prepare response
    const userObj = user.toObject();
    delete userObj.password;

    console.log("✅ Login successful");
    console.log("=== LOGIN ATTEMPT COMPLETED ===");
    
    res.json({ message: "Login successful", user: userObj, token });
    
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

// ========================== GET CURRENT USER ==========================
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;