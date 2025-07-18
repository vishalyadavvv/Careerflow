import React, { useState, useEffect } from 'react';
// Removed useNavigate as router is not part of the self-contained environment
import { Mail, Linkedin, Github, Eye, EyeOff, LockKeyhole, AlertTriangle, ShieldCheck } from 'lucide-react'; // Import icons from lucide-react

// Dummy LoginForm component for demonstration
const LoginForm = ({ onLoginSuccess, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "", // Added role field
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimer, setBlockTimer] = useState(0);

  // Dummy useAuth hook for Canvas preview
  const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  const { login: authLogin } = useAuth(); // Renamed to avoid conflict with local 'login'

  // Dummy axiosInstance for Canvas preview
  const axiosInstance = {
    post: (url, data) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (url === "/auth/login") {
            if (data.email === "user@example.com" && data.password === "password" && data.role === "job_seeker") {
              resolve({ data: { token: "dummy_token", user: { username: "TestUser", role: "job_seeker" } } });
            } else if (data.email === "employer@example.com" && data.password === "password" && data.role === "employer") {
              resolve({ data: { token: "dummy_token", user: { username: "EmployerCo", role: "employer" } } });
            } else if (data.email === "admin@example.com" && data.password === "password" && data.role === "admin") {
              resolve({ data: { token: "dummy_token", user: { username: "AdminUser", role: "admin" } } });
            } else {
              reject({ response: { data: { message: "Invalid credentials." } } });
            }
          } else {
            reject({ response: { data: { message: "Unknown API endpoint." } } });
          }
        }, 1000); // Simulate network delay
      });
    },
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const wasRemembered = localStorage.getItem("rememberMe") === "true";
    if (savedEmail && wasRemembered) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isBlocked && blockTimer > 0) {
      interval = setInterval(() => {
        setBlockTimer((prev) => {
          if (prev <= 1) {
            setIsBlocked(false);
            setLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBlocked, blockTimer]);

  useEffect(() => {
    const errors = {};
    if (!formData.role) {
      errors.role = "Please select a role";
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (formData.password && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    setValidationErrors(errors);
    setIsFormValid(
      formData.email &&
        formData.password &&
        formData.role &&
        Object.keys(errors).length === 0
    );
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || isBlocked) return;

    setError("");
    setLoading(true);
    console.log("Sending login request:", {
      email: formData.email,
      password: formData.password,
      role: formData.role // if your backend needs this
    });

    try {
      const response = await axiosInstance.post("/auth/login", {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      const { token, user } = response.data;

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberMe");
      }

      setLoginAttempts(0);
      authLogin(token, user); // Use authLogin from useAuth
      onLoginSuccess(user.role);
    } catch (err) {
      console.error("Login error:", err);
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);

      if (newAttempts >= 5) {
        setIsBlocked(true);
        setBlockTimer(300);
        setError(
          "Too many failed login attempts. Please try again in 5 minutes."
        );
      } else if (newAttempts >= 3) {
        setError(
          `Invalid credentials. ${
            5 - newAttempts
          } attempts remaining before temporary block.`
        );
      } else {
        setError(
          err.response?.data?.message ||
            "Login failed. Please check your credentials."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleForgotPassword = () =>
    console.log("Forgot password functionality would be implemented here"); // Changed alert to console.log
  const handleSocialLogin = (provider) =>
    console.log(`${provider} login would be implemented here`); // Changed alert to console.log

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-inter">
      <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-4xl text-indigo-600">🚀</span>
            <h1 className="text-3xl font-bold text-gray-800">JobPortal</h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
          <p className="text-gray-600 text-lg">Sign in to your account to continue</p>
        </div>

        <div className="space-y-4 mb-6">
          <button
            type="button"
            className="w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium shadow-sm transition-colors duration-200 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleSocialLogin("Google")}
            disabled={loading || isBlocked}
          >
            <Mail size={20} className="mr-2 text-red-500" /> Continue with Google
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium shadow-sm transition-colors duration-200 bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleSocialLogin("LinkedIn")}
            disabled={loading || isBlocked}
          >
            <Linkedin size={20} className="mr-2" /> Continue with LinkedIn
          </button>
        </div>

        <div className="relative flex justify-center text-sm mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative bg-white px-3 text-gray-500">or sign in with email</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg flex items-center space-x-2 text-sm">
              <AlertTriangle size={18} />
              <span>{error}</span>
            </div>
          )}
          {isBlocked && (
            <div className="bg-yellow-100 text-yellow-700 p-3 rounded-lg flex items-center space-x-2 text-sm">
              <LockKeyhole size={18} />
              <span>Account temporarily blocked. Try again in {formatTime(blockTimer)}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Login As <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white ${validationErrors.role ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"}`}
              disabled={loading || isBlocked}
            >
              <option value="">Select role</option>
              <option value="job_seeker">Job Seeker</option>
              <option value="employer">Employer</option>
              <option value="admin">Admin</option> {/* Added Admin role for testing */}
            </select>
            {validationErrors.role && (
              <span className="text-red-500 text-xs mt-1">{validationErrors.role}</span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors pr-10 ${validationErrors.email ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"} ${formData.email ? "border-indigo-500" : ""}`}
                placeholder="Enter your email address"
                required
                disabled={loading || isBlocked}
                autoComplete="email"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={20} />
              </span>
            </div>
            {validationErrors.email && (
              <span className="text-red-500 text-xs mt-1">{validationErrors.email}</span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors pr-10 ${validationErrors.password ? "border-red-500 ring-1 ring-red-500" : "border-gray-300"} ${formData.password ? "border-indigo-500" : ""}`}
                placeholder="Enter your password"
                required
                disabled={loading || isBlocked}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                onClick={togglePasswordVisibility}
                disabled={loading || isBlocked}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {validationErrors.password && (
              <span className="text-red-500 text-xs mt-1">{validationErrors.password}</span>
            )}
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading || isBlocked}
                className="form-checkbox h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 transition-colors"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              className="text-indigo-600 hover:underline font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleForgotPassword}
              disabled={loading || isBlocked}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md flex items-center justify-center ${!isFormValid || loading || isBlocked ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!isFormValid || loading || isBlocked}
          >
            {loading ? (
              <>
                <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></span> Signing In...
              </>
            ) : (
              <>
                <LockKeyhole size={20} className="mr-2" /> Sign In
              </>
            )}
          </button>

          {loginAttempts > 0 && loginAttempts < 5 && (
            <div className="text-sm text-center text-yellow-700 mt-4">
              Failed attempts: {loginAttempts}/5
            </div>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-indigo-600 hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Create Account
            </button>
          </p>
        </div>

        <div className="flex items-center justify-center space-x-2 text-gray-500 text-xs mt-6 p-3 bg-gray-100 rounded-lg">
          <ShieldCheck size={16} />
          <p>Your information is protected with 256-bit SSL encryption</p>
        </div>
      </div>
    </div>
  );
}

// Dummy RegisterForm component for demonstration
const RegisterForm = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('job_seeker'); // Default role
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (username && email && password) {
        onRegisterSuccess(); // Simulate successful registration
      } else {
        setError('Please fill in all fields.');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          type="text"
          id="username"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          placeholder="JohnDoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email-register" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="email-register"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          placeholder="your@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password-register" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          id="password-register"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Register As</label>
        <select
          id="role"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="job_seeker">Job Seeker</option>
          <option value="employer">Employer</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Sign Up'}
      </button>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button type="button" onClick={onSwitchToLogin} className="text-indigo-600 hover:underline font-medium">
          Sign In
        </button>
      </p>
    </form>
  );
};


// Dummy AuthContext and LoadingSpinner for standalone execution
const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async auth check
    setTimeout(() => {
      // Set user to null initially to allow AuthPage to render forms
      setUser(null); 
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}> {/* Added setUser to context */}
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
    <p className="ml-4 text-lg text-gray-700">Loading...</p>
  </div>
);


function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  // Removed useNavigate
  const { user, loading, setUser } = useAuth(); // Destructure setUser from useAuth

  // Redirect if already authenticated (simplified for Canvas)
  useEffect(() => {
    if (!loading && user) {
      // In a real app, this would navigate. Here, we can just log or show a message.
      console.log(`User already authenticated as ${user.role}.`);
      // For Canvas preview, we might want to prevent immediate redirect
      // or show a different state. For now, we'll let the forms render.
    }
  }, [user, loading]); // Removed navigate from dependencies

  // Hide welcome message after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleFormSwitch = (toLogin) => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(toLogin);
      setIsAnimating(false);
    }, 300);
  };

  const handleLoginSuccess = (role) => {
    // Simulate setting user after successful login
    setUser({ username: 'LoggedUser', role: role });
    // In a real app, you would navigate here.
    console.log(`Login successful! User role: ${role}`);
  };

  const handleRegisterSuccess = () => {
    setIsLogin(true);
    console.log('Registration successful! Please sign in.');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoadingSpinner />
        <p className="ml-4 text-lg text-gray-700">Checking authentication...</p>
      </div>
    );
  }

  return (
    // Main container for the auth page, using Inter font
    <div className="min-h-screen flex items-center justify-center font-inter bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden p-4">
      {/* Background Elements (Blobs) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob top-10 left-1/4"></div>
        <div className="absolute w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 bottom-10 right-1/4"></div>
        <div className="absolute w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Welcome Message Overlay */}
      {showWelcome && (
        <div className="fixed inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex items-center justify-center z-50 animate-fade-out-delay">
          <div className="text-center animate-zoom-in">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Welcome to JobPortal</h1>
            <p className="text-xl md:text-2xl font-light mb-8">Your gateway to endless opportunities</p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center space-x-3 bg-white bg-opacity-20 px-5 py-3 rounded-full shadow-lg backdrop-blur-sm">
                <span className="text-3xl">🎯</span>
                <span className="text-lg font-medium">Smart Job Matching</span>
              </div>
              <div className="flex items-center space-x-3 bg-white bg-opacity-20 px-5 py-3 rounded-full shadow-lg backdrop-blur-sm">
                <span className="text-3xl">💼</span>
                <span className="text-lg font-medium">Professional Network</span>
              </div>
              <div className="flex items-center space-x-3 bg-white bg-opacity-20 px-5 py-3 rounded-full shadow-lg backdrop-blur-sm">
                <span className="text-3xl">📈</span>
                <span className="text-lg font-medium">Career Growth</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden max-w-6xl w-full mx-auto my-8 min-h-[600px]">
        {/* Left Side - Info Panel */}
        <div className="lg:w-1/2 bg-indigo-700 text-white p-8 md:p-12 flex flex-col justify-between">
          <div className="flex-shrink-0 mb-8">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">💼</span>
              <span className="text-3xl font-bold">JobPortal</span>
            </div>
          </div>
          
          <div className="flex-grow flex flex-col justify-center text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              {isLogin ? 'Welcome Back!' : 'Join Our Community!'}
            </h2>
            <p className="text-indigo-100 text-lg mb-8">
              {isLogin 
                ? 'Sign in to access your personalized job dashboard and continue your career journey.'
                : 'Create your account and unlock thousands of job opportunities tailored just for you.'
              }
            </p>
            
            <div className="grid grid-cols-2 gap-6 text-center">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white">50k+</span>
                <span className="text-indigo-200 text-sm">Active Jobs</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white">25k+</span>
                <span className="text-indigo-200 text-sm">Companies</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white">100k+</span>
                <span className="text-indigo-200 text-sm">Job Seekers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white">95%</span>
                <span className="text-indigo-200 text-sm">Success Rate</span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 mt-8">
            <div className="bg-indigo-800 bg-opacity-70 p-6 rounded-lg shadow-inner">
              <p className="text-indigo-100 italic mb-4">
                "JobPortal helped me land my dream job in just 2 weeks. The platform is intuitive and the job matching is incredibly accurate!"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-400 rounded-full flex items-center justify-center text-lg font-bold text-white">
                  <span>S</span>
                </div>
                <div>
                  <span className="block font-semibold text-white">Sarah Johnson</span>
                  <span className="block text-indigo-200 text-sm">Software Engineer</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Panel */}
        <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto">
            {/* Tab Navigation */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-8 relative shadow-inner">
              <button 
                className={`flex-1 py-3 text-lg font-semibold rounded-xl z-10 transition-colors duration-300 ${isLogin ? 'text-indigo-700' : 'text-gray-600 hover:text-gray-800'}`}
                onClick={() => handleFormSwitch(true)}
              >
                Sign In
              </button>
              <button 
                className={`flex-1 py-3 text-lg font-semibold rounded-xl z-10 transition-colors duration-300 ${!isLogin ? 'text-indigo-700' : 'text-gray-600 hover:text-gray-800'}`}
                onClick={() => handleFormSwitch(false)}
              >
                Sign Up
              </button>
              <div className={`absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(50%-4px)] bg-white rounded-xl shadow transition-transform duration-300 ease-in-out ${isLogin ? 'translate-x-0' : 'translate-x-full'}`}></div>
            </div>

            {/* Form Content */}
            <div className={`relative overflow-hidden transition-all duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              {isLogin ? (
                <LoginForm 
                  onLoginSuccess={handleLoginSuccess}
                  onSwitchToRegister={() => handleFormSwitch(false)}
                />
              ) : (
                <RegisterForm 
                  onRegisterSuccess={handleRegisterSuccess}
                  onSwitchToLogin={() => handleFormSwitch(true)}
                />
              )}
            </div>

            {/* Social Login Options */}
            <div className="mt-8 text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-3 text-gray-500">Or continue with</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                  <Mail size={20} className="mr-2 text-red-500" />
                  Google
                </button>
                <button className="flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                  <Linkedin size={20} className="mr-2 text-blue-600" />
                  LinkedIn
                </button>
                <button className="flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                  <Github size={20} className="mr-2 text-gray-800" />
                  GitHub
                </button>
              </div>
            </div>

            {/* Additional Links */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-2">
                <a href="#" className="hover:underline text-indigo-600">Privacy Policy</a>
                <span className="hidden sm:inline">•</span>
                <a href="#" className="hover:underline text-indigo-600">Terms of Service</a>
                <span className="hidden sm:inline">•</span>
                <a href="#" className="hover:underline text-indigo-600">Help Center</a>
              </div>
              <p className="text-gray-500">
                © 2024 JobPortal. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements (Emojis) - Removed specific classes like icon-1, icon-2 etc. */}
      {/* These will now float randomly based on the animation keyframes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute text-4xl opacity-70 animate-float-slow" style={{ top: '10%', left: '15%' }}>🎯</div>
        <div className="absolute text-4xl opacity-70 animate-float-medium" style={{ top: '25%', right: '20%' }}>💡</div>
        <div className="absolute text-4xl opacity-70 animate-float-fast" style={{ bottom: '15%', left: '30%' }}>🚀</div>
        <div className="absolute text-4xl opacity-70 animate-float-slow" style={{ top: '40%', left: '5%' }}>⭐</div>
        <div className="absolute text-4xl opacity-70 animate-float-medium" style={{ bottom: '5%', right: '5%' }}>💼</div>
        <div className="absolute text-4xl opacity-70 animate-float-fast" style={{ top: '55%', right: '10%' }}>📊</div>
      </div>

      {/* Custom CSS for animations */}
      <style>
        {`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes zoomIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes fadeOutDelay {
          0% { opacity: 1; visibility: visible; }
          90% { opacity: 1; visibility: visible; }
          100% { opacity: 0; visibility: hidden; }
        }

        @keyframes floatSlow {
          0% { transform: translate(0, 0); }
          50% { transform: translate(10px, 10px); }
          100% { transform: translate(0, 0); }
        }

        @keyframes floatMedium {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-15px, 15px); }
          100% { transform: translate(0, 0); }
        }

        @keyframes floatFast {
          0% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
          100% { transform: translate(0, 0); }
        }

        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.6, 0.01, 0.3, 0.9);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-out-delay {
          animation: fadeOutDelay 3s forwards;
        }
        .animate-zoom-in {
          animation: zoomIn 0.5s ease-out forwards;
        }
        .animate-float-slow {
          animation: floatSlow 10s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: floatMedium 8s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: floatFast 6s ease-in-out infinite;
        }
        `}
      </style>
    </div>
  );
}

// Export a new App component that wraps AuthPage with AuthProvider
// function App() {
//   return (
//     <AuthProvider>
//       <AuthPage />
//     </AuthProvider>
//   );
// }

export default LoginForm;
