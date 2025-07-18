import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github } from 'lucide-react'; // Import icons from lucide-react

// Dummy Dashboard Components for demonstration
const JobSeekerDashboard = ({ user, handleLogout }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full text-center border border-gray-200">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Job Seeker Dashboard</h1>
        <p className="text-lg text-gray-700 mb-6">
            Welcome, <span className="font-semibold text-blue-600">{user.email}</span>!
            You are logged in as a Job Seeker.
        </p>
        <p className="text-sm text-gray-500 break-all mb-4">
            User ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{user.uid}</span>
        </p>
        <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
            Logout
        </button>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-blue-700">
            <p>Here you can find job listings, manage your applications, and update your profile.</p>
        </div>
    </div>
);

const EmployerDashboard = ({ user, handleLogout }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full text-center border border-gray-200">
        <h1 className="text-3xl font-bold text-purple-800 mb-4">Employer Dashboard</h1>
        <p className="text-lg text-gray-700 mb-6">
            Welcome, <span className="font-semibold text-purple-600">{user.email}</span>!
            You are logged in as an Employer.
        </p>
        <p className="text-sm text-gray-500 break-all mb-4">
            User ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{user.uid}</span>
        </p>
        <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
        >
            Logout
        </button>
        <div className="mt-6 p-4 bg-purple-50 rounded-lg text-purple-700">
            <p>Here you can post new jobs, manage applicants, and view company insights.</p>
        </div>
    </div>
);


// LoginForm component modified for simulated authentication
const LoginForm = ({ onLoginSuccess, onSwitchToRegister, setLoading, setError }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Simulated authentication logic
            // For demonstration, let's say 'test@example.com' with 'password123' is a job seeker
            // and 'employer@example.com' with 'password123' is an employer.
            if (email === 'test@example.com' && password === 'password123') {
                onLoginSuccess({ email, uid: 'jobseeker-123', role: 'job_seeker' });
            } else if (email === 'employer@example.com' && password === 'password123') {
                onLoginSuccess({ email, uid: 'employer-456', role: 'employer' });
            }
            else {
                throw new Error('Invalid email or password.');
            }
        } catch (err) {
            console.error("Error signing in:", err);
            setError(`Login failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign In</h2>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="your@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Sign In
            </button>
            <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button type="button" onClick={onSwitchToRegister} className="text-indigo-600 hover:underline font-medium">
                    Sign Up
                </button>
            </p>
        </form>
    );
};

// RegisterForm component modified for simulated authentication and local storage
const RegisterForm = ({ onRegisterSuccess, onSwitchToLogin, setLoading, setError }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('job_seeker'); // Default role

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Basic validation
            if (!email || !password || password.length < 6) {
                throw new Error('Please enter a valid email and a password of at least 6 characters.');
            }

            // Simulate user registration
            const newUser = {
                email,
                uid: `simulated-uid-${Date.now()}`, // Generate a unique ID
                role,
                createdAt: new Date().toISOString()
            };

            // In a real app, you'd send this to your backend/Firebase.
            // Here, we'll store it in localStorage for persistence.
            localStorage.setItem('simulatedUser', JSON.stringify(newUser));

            onRegisterSuccess(newUser); // Pass the new user data to the success handler
        } catch (err) {
            console.error("Error registering:", err);
            setError(`Registration failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
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
            >
                Sign Up
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

// LoadingSpinner component
const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
        <p className="ml-4 text-lg text-gray-700">Loading...</p>
    </div>
);

function AuthPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Set to true initially to simulate loading check
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState(null); // New state for user role
    const [isLogin, setIsLogin] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
        // Simulate initial authentication check
        const checkAuthStatus = async () => {
            setLoading(true);
            setError(null);
            try {
                await new Promise(resolve => setTimeout(resolve, 500)); // Simulate async check
                const storedUser = localStorage.getItem('simulatedUser');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    setUserRole(parsedUser.role);
                }
            } catch (err) {
                console.error("Error checking auth status:", err);
                setError("Failed to retrieve session.");
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();

        // Hide welcome message after 3 seconds
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 3000);
        return () => clearTimeout(timer);

    }, []); // Run only once on component mount

    const handleFormSwitch = (toLogin) => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsLogin(toLogin);
            setIsAnimating(false);
            setError(null); // Clear errors on form switch
        }, 300);
    };

    const handleLoginSuccess = (userData) => {
        console.log('handleLoginSuccess called with:', userData);
        setUser(userData);
        setUserRole(userData.role);
        setError(null);
        console.log('Login successful!', userData);
    };

    const handleRegisterSuccess = (userData) => {
        console.log('handleRegisterSuccess called with:', userData);
        setUser(userData); // Set user immediately after successful registration
        setUserRole(userData.role);
        setIsLogin(false); // Explicitly set to false to ensure form switches away from login
        setError(null);
        console.log('State after handleRegisterSuccess calls: user=', userData, 'role=', userData.role, 'isLogin=false');
    };

    const handleLogout = () => {
        setUser(null);
        setUserRole(null);
        setError(null);
        localStorage.removeItem('simulatedUser'); // Clear simulated user from local storage
        console.log('Logged out');
    };

    console.log('AuthPage render: user=', user, 'userRole=', userRole, 'loading=', loading, 'isLogin=', isLogin);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <LoadingSpinner />
                <p className="ml-4 text-lg text-gray-700">Checking authentication status...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700 p-4 rounded-lg shadow-md">
                <div className="text-lg font-medium">Error: {error}</div>
            </div>
        );
    }

    // If user is authenticated AND their role is determined, show dashboard
    if (user && userRole) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
                {userRole === 'job_seeker' && <JobSeekerDashboard user={user} handleLogout={handleLogout} />}
                {userRole === 'employer' && <EmployerDashboard user={user} handleLogout={handleLogout} />}
            </div>
        );
    }

    // If not authenticated, show login/register forms
    return (
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

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Form Content */}
                        <div className={`relative overflow-hidden transition-all duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                            {isLogin ? (
                                <LoginForm 
                                    onLoginSuccess={handleLoginSuccess}
                                    onSwitchToRegister={() => handleFormSwitch(false)}
                                    setLoading={setLoading}
                                    setError={setError}
                                />
                            ) : (
                                <RegisterForm 
                                    onRegisterSuccess={handleRegisterSuccess}
                                    onSwitchToLogin={() => handleFormSwitch(true)}
                                    setLoading={setLoading}
                                    setError={setError}
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

            {/* Floating Elements (Emojis) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute text-4xl opacity-70 animate-float-slow" style={{ top: '10%', left: '15%' }}>🎯</div>
                <div className="absolute text-4xl opacity-70 animate-float-medium" style={{ top: '25%', right: '20%' }}>💡</div>
                <div className="absolute text-4xl opacity-70 animate-float-fast" style={{ bottom: '15%', left: '30%' }}>🚀</div>
                <div className="absolute text-4xl opacity-70 animate-float-slow" style={{ top: '40%', left: '5%' }}>⭐</div>
                <div className="absolute text-4xl opacity-70 animate-float-medium" style={{ bottom: '5%', right: '5%' }}>💼</div>
                <div className="absolute text-4xl opacity-70 animate-float-fast" style={{ top: '55%', right: '10%' }}>📊</div>
            </div>

            {/* Custom CSS for animations */}
            <style>{`
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
            `}</style>
        </div>
    );
}

export default AuthPage;

