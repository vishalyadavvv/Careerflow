import React, { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, Github, Eye, EyeOff, Upload, User, Building2, Phone, CheckCircle, AlertCircle, ShieldCheck, Plus } from 'lucide-react'; // Import icons from lucide-react

// Dummy AuthContext and axiosInstance for standalone execution in Canvas
// In a real application, these would be imported from their respective paths.
const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async auth check
    setTimeout(() => {
      setUser(null); 
      setLoading(false);
    }, 1000);
  }, []);

  const login = (token, userData) => {
    console.log("AuthContext: User logged in", userData);
    setUser(userData);
    // In a real app, you'd store the token (e.g., in localStorage)
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

const axiosInstance = {
  post: (url, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url === "/auth/register") {
          // Simulate successful registration
          console.log("Simulating registration for:", data);
          resolve({ data: { message: "Registration successful! Please log in." } });
        } else {
          reject({ response: { data: { message: "Unknown API endpoint or registration failed." } } });
        }
      }, 1500); // Simulate network delay
    });
  },
};


function RegisterForm({ onRegisterSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'job_seeker',
    companyName: '',
    phone: '',
    fullName: '',
    profileImage: null
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const fileInputRef = useRef(null);

  // Password strength validation
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isStrong: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
    };
  };

  // Real-time validation
  const validateField = (name, value) => {
    const errors = { ...validationErrors };
    
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors.email = 'Please enter a valid email address';
        } else {
          delete errors.email;
        }
        break;
      case 'username':
        if (value.length < 3) {
          errors.username = 'Username must be at least 3 characters long';
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          errors.username = 'Username can only contain letters, numbers, and underscores';
        } else {
          delete errors.username;
        }
        break;
      case 'password':
        const passwordValidation = validatePassword(value);
        if (!passwordValidation.isStrong) {
          errors.password = 'Password must meet all requirements';
        } else {
          delete errors.password;
        }
        // Also re-validate confirm password if password changes
        if (formData.confirmPassword && value !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        } else if (formData.confirmPassword) {
            delete errors.confirmPassword;
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          errors.confirmPassword = 'Passwords do not match';
        } else {
          delete errors.confirmPassword;
        }
        break;
      case 'phone':
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (value && !phoneRegex.test(value.replace(/\s/g, ''))) {
          errors.phone = 'Please enter a valid phone number';
        } else {
          delete errors.phone;
        }
        break;
      case 'fullName':
        if (!value) {
          errors.fullName = 'Full Name is required';
        } else {
          delete errors.fullName;
        }
        break;
      case 'companyName':
        if (formData.role === 'employer' && !value) {
          errors.companyName = 'Company Name is required for employers';
        } else {
          delete errors.companyName;
        }
        break;
      default:
        break;
    }
    
    setValidationErrors(errors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
    if (error) setError(''); // Clear general error on input change
    if (success) setSuccess(''); // Clear success message on input change
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      
      setFormData(prev => ({ ...prev, profileImage: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, profileImage: null }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Perform final validation check before submission
    const finalErrors = {};
    Object.keys(formData).forEach(key => {
        // Skip profileImage and confirmPassword for direct validation here if not needed in backend
        if (key !== 'profileImage' && key !== 'confirmPassword') {
            validateField(key, formData[key]);
        }
    });

    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }
    
    if (!formData.username || !formData.email || !formData.password || !formData.fullName) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setError('Please fix all validation errors');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.role === 'employer' && !formData.companyName) {
      setError('Company name is required for employer registration');
      return;
    }
    
    setLoading(true);
    
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'confirmPassword' && formData[key] !== null) {
          submitData.append(key, formData[key]);
        }
      });
      
      const response = await axiosInstance.post('/auth/register', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setSuccess(response.data.message || 'Registration successful! Please log in.');
      
      // Reset form
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'job_seeker',
        companyName: '',
        phone: '',
        fullName: '',
        profileImage: null
      });
      setImagePreview(null);
      setAgreedToTerms(false);
      setValidationErrors({});
      
      // Auto-switch to login after 2 seconds
      setTimeout(() => {
        onRegisterSuccess();
      }, 2000);
      
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = validatePassword(formData.password);

  return (
    <div className="flex flex-col items-center justify-center p-4 font-inter text-gray-800">
      <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-lg mx-auto animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Plus size={40} className="text-indigo-600 animate-pulse-slow" /> {/* Creative icon with animation */}
            <h1 className="text-3xl font-bold text-gray-800">Join JobPortal</h1>
          </div>
          <p className="text-gray-600 text-lg">Create your account to unlock opportunities</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg flex items-center space-x-2 text-sm animate-fade-in-down">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 text-green-700 p-3 rounded-lg flex items-center space-x-2 text-sm animate-fade-in-down">
              <CheckCircle size={18} />
              <span>{success}</span>
            </div>
          )}

          {/* Profile Image Upload */}
          <div className="space-y-2 animate-fade-in-up animation-delay-100">
            <label className="block text-sm font-medium text-gray-700">Profile Picture (Optional)</label>
            <div 
              className="relative w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors group overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg animate-scale-in" />
                  <button 
                    type="button" 
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors transform hover:scale-110" 
                    onClick={(e) => { e.stopPropagation(); removeImage(); }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-500 group-hover:text-indigo-600 transition-colors animate-fade-in">
                  <Upload size={32} className="mx-auto mb-2" />
                  <p className="font-medium">Click to upload image</p>
                  <span className="text-xs">PNG, JPG up to 5MB</span>
                </div>
              )}
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-2 animate-fade-in-up animation-delay-200">
            <label className="block text-sm font-medium text-gray-700">I am a</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <label className={`flex-1 flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-[1.02] ${formData.role === 'job_seeker' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md' : 'border-gray-300 bg-white hover:border-gray-400'}`}>
                <input
                  type="radio"
                  name="role"
                  value="job_seeker"
                  checked={formData.role === 'job_seeker'}
                  onChange={handleInputChange}
                  className="hidden"
                />
                <div className="flex flex-col items-center space-y-2">
                  <User size={24} />
                  <span className="font-medium">Job Seeker</span>
                </div>
              </label>
              <label className={`flex-1 flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-[1.02] ${formData.role === 'employer' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md' : 'border-gray-300 bg-white hover:border-gray-400'}`}>
                <input
                  type="radio"
                  name="role"
                  value="employer"
                  checked={formData.role === 'employer'}
                  onChange={handleInputChange}
                  className="hidden"
                />
                <div className="flex flex-col items-center space-y-2">
                  <Building2 size={24} />
                  <span className="font-medium">Employer</span>
                </div>
              </label>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-2 animate-fade-in-up animation-delay-300">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${validationErrors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
              placeholder="Enter your full name"
              required
            />
            {validationErrors.fullName && (
              <span className="text-red-500 text-xs mt-1 animate-fade-in-down">{validationErrors.fullName}</span>
            )}
          </div>

          {/* Username */}
          <div className="space-y-2 animate-fade-in-up animation-delay-400">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${validationErrors.username ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
              placeholder="Choose a unique username"
              required
            />
            {validationErrors.username && (
              <span className="text-red-500 text-xs mt-1 animate-fade-in-down">{validationErrors.username}</span>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2 animate-fade-in-up animation-delay-500">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 pr-10 ${validationErrors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                placeholder="Enter your email address"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={20} />
              </span>
            </div>
            {validationErrors.email && (
              <span className="text-red-500 text-xs mt-1 animate-fade-in-down">{validationErrors.email}</span>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2 animate-fade-in-up animation-delay-600">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 pr-10 ${validationErrors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                placeholder="Enter your phone number"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Phone size={20} />
              </span>
            </div>
            {validationErrors.phone && (
              <span className="text-red-500 text-xs mt-1 animate-fade-in-down">{validationErrors.phone}</span>
            )}
          </div>

          {/* Company Name for Employers */}
          {formData.role === 'employer' && (
            <div className="space-y-2 animate-fade-in-up animation-delay-700">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 pr-10 ${validationErrors.companyName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your company name"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Building2 size={20} />
                </span>
              </div>
              {validationErrors.companyName && (
                <span className="text-red-500 text-xs mt-1 animate-fade-in-down">{validationErrors.companyName}</span>
              )}
            </div>
          )}

          {/* Password */}
          <div className="space-y-2 animate-fade-in-up animation-delay-800">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 pr-10 ${validationErrors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                placeholder="Create a strong password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2 text-sm text-gray-600 space-y-1 animate-fade-in-down">
                <div className={`flex items-center space-x-1 ${passwordStrength.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordStrength.minLength ? <CheckCircle size={16} className="animate-scale-in" /> : <AlertCircle size={16} className="animate-scale-in" />}
                  <span>At least 8 characters</span>
                </div>
                <div className={`flex items-center space-x-1 ${passwordStrength.hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordStrength.hasUpperCase ? <CheckCircle size={16} className="animate-scale-in" /> : <AlertCircle size={16} className="animate-scale-in" />}
                  <span>Uppercase letter</span>
                </div>
                <div className={`flex items-center space-x-1 ${passwordStrength.hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordStrength.hasLowerCase ? <CheckCircle size={16} className="animate-scale-in" /> : <AlertCircle size={16} className="animate-scale-in" />}
                  <span>Lowercase letter</span>
                </div>
                <div className={`flex items-center space-x-1 ${passwordStrength.hasNumbers ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordStrength.hasNumbers ? <CheckCircle size={16} className="animate-scale-in" /> : <AlertCircle size={16} className="animate-scale-in" />}
                  <span>Number</span>
                </div>
                <div className={`flex items-center space-x-1 ${passwordStrength.hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
                  {passwordStrength.hasSpecialChar ? <CheckCircle size={16} className="animate-scale-in" /> : <AlertCircle size={16} className="animate-scale-in" />}
                  <span>Special character</span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2 animate-fade-in-up animation-delay-900">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 pr-10 ${validationErrors.confirmPassword ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'}`}
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {validationErrors.confirmPassword && (
              <span className="text-red-500 text-xs mt-1 animate-fade-in-down">{validationErrors.confirmPassword}</span>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-2 animate-fade-in-up animation-delay-1000">
            <input
              type="checkbox"
              id="agreedToTerms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              required
              className="mt-1 h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            />
            <label htmlFor="agreedToTerms" className="text-sm text-gray-700">
              I agree to the <a href="#" target="_blank" className="text-indigo-600 hover:underline">Terms of Service</a> and <a href="#" target="_blank" className="text-indigo-600 hover:underline">Privacy Policy</a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 shadow-md flex items-center justify-center transform hover:scale-[1.01] active:scale-95 ${loading || Object.keys(validationErrors).length > 0 || !agreedToTerms ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading || Object.keys(validationErrors).length > 0 || !agreedToTerms}
          >
            {loading ? (
              <>
                <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></span> Creating Account...
              </>
            ) : (
              <>
                <User size={20} className="mr-2" /> Create Account
              </>
            )}
          </button>

          {/* Login Link */}
          <div className="mt-6 text-center animate-fade-in-up animation-delay-1100">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <button type="button" onClick={onSwitchToLogin} className="text-indigo-600 hover:underline font-medium">
                Sign in here
              </button>
            </p>
          </div>

          {/* Security Notice */}
          <div className="flex items-center justify-center space-x-2 text-gray-500 text-xs mt-6 p-3 bg-gray-100 rounded-lg animate-fade-in-up animation-delay-1200">
            <ShieldCheck size={16} />
            <p>Your information is protected with 256-bit SSL encryption</p>
          </div>
        </form>
      </div>

      {/* Custom CSS for animations */}
      <style>
        {`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulseSlow {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        .animate-pulse-slow {
          animation: pulseSlow 2s infinite ease-in-out;
        }

        /* Staggered animation delays */
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-900 { animation-delay: 0.9s; }
        .animation-delay-1000 { animation-delay: 1.0s; }
        .animation-delay-1100 { animation-delay: 1.1s; }
        .animation-delay-1200 { animation-delay: 1.2s; }
        `}
      </style>
    </div>
  );
}

export default RegisterForm;
