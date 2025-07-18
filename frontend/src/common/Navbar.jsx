import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Briefcase,
  Home,
  BarChart3,
  MessageSquare,
  BookOpen,
  HelpCircle,
  Heart,
  Save,
  FileText,
  Calendar,
  Shield,
  TrendingUp,
  Building2,
  UserPlus,
  CreditCard,
  Eye,
  Camera,
  Upload,
  Filter
} from 'lucide-react';

// Enhanced Mock Auth Context (Keeping this for full functionality)
const useAuth = () => {
  const [user, setUser] = useState({
    id: '123',
    name: 'John Doe',
    role: 'job_seeker',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', // Sample avatar
    isOnline: true,
    isVerified: true,
    profileCompletion: 85,
    plan: 'Premium',
    credits: 150
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    console.log('Logging out...');
  };

  const updateAvatar = (avatarUrl) => {
    setUser(prev => ({ ...prev, avatar: avatarUrl }));
  };

  return { user, isAuthenticated, login, logout, updateAvatar };
};

function Navbar() {
  const { user, isAuthenticated, logout, updateAvatar } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);

  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const fileInputRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Enhanced mock notifications with more variety
  const notifications = [
    {
      id: 1,
      type: 'job_match',
      title: 'New job match found',
      message: 'Frontend Developer at TechCorp matches your profile',
      time: '2 min ago',
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=40&h=40&fit=crop',
      action: 'View Job'
    },
    {
      id: 2,
      type: 'application_update',
      title: 'Application viewed',
      message: 'Your application for Senior React Developer was reviewed by HR',
      time: '1 hour ago',
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?w=40&h=40&fit=crop',
      action: 'Check Status'
    },
    {
      id: 3,
      type: 'interview',
      title: 'Interview scheduled',
      message: 'Virtual interview with Google - Tomorrow at 2:00 PM',
      time: '3 hours ago',
      unread: false,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop',
      action: 'Join Call'
    },
    {
      id: 4,
      type: 'message',
      title: 'New message from recruiter',
      message: 'Sarah from Microsoft sent you a message about the Software Engineer position',
      time: '5 hours ago',
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9365e96?w=40&h=40&fit=crop',
      action: 'Reply'
    },
    {
      id: 5,
      type: 'profile',
      title: 'Profile views increased',
      message: 'Your profile was viewed 12 times this week - 40% increase!',
      time: '1 day ago',
      unread: false,
      avatar: null,
      action: 'View Analytics'
    }
  ];

  // Mock search suggestions
  const mockSuggestions = [
    'Frontend Developer',
    'Software Engineer',
    'React Developer',
    'Full Stack Developer',
    'Product Manager',
    'Data Scientist',
    'UX Designer',
    'DevOps Engineer'
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    logout();
    navigate('/auth');
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/auth');
    setIsMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (user?.role === 'job_seeker') return '/seeker/dashboard';
    if (user?.role === 'employer') return '/employer/dashboard';
    if (user?.role === 'admin') return '/admin/dashboard';
    return null;
  };

  const getUserRoleDisplay = () => {
    if (user?.role === 'job_seeker') return 'Job Seeker';
    if (user?.role === 'employer') return 'Employer';
    if (user?.role === 'admin') return 'Admin';
    return '';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchFocused(false);
      setShowSearchSuggestions(false);
    }
  };

  const handleSearchInputChange = (value) => {
    setSearchQuery(value);
    if (value.trim()) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSearchSuggestions(filtered.slice(0, 5));
      setShowSearchSuggestions(true);
    } else {
      setShowSearchSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSearchSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNotificationAction = (notification) => {
    console.log(`Performing action: ${notification.action} for notification:`, notification.id);
    // Handle specific notification actions here
  };

  const markAllNotificationsRead = () => {
    console.log('Marking all notifications as read');
    // Implementation would update notification status
  };

  const isActivePath = (path) => location.pathname === path;

  // Removed "Community" link from here
  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/jobs', label: 'Jobs', icon: Briefcase },
    { path: '/companies', label: 'Companies', icon: Building2 },
    { path: '/resources', label: 'Resources', icon: BookOpen },
    { path: '/about', label: 'About', icon: HelpCircle },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'job_match': return <Briefcase size={16} className="text-blue-500" />;
      case 'application_update': return <FileText size={16} className="text-green-500" />;
      case 'interview': return <Calendar size={16} className="text-purple-500" />;
      case 'message': return <MessageSquare size={16} className="text-orange-500" />;
      case 'profile': return <TrendingUp size={16} className="text-indigo-500" />;
      default: return <Bell size={16} className="text-gray-500" />;
    }
  };

  return (
    <nav className="bg-blue-700 p-4 shadow-lg relative z-20">
      {/* Animated background - Simplified using Tailwind animation classes if defined in config */}
      {/* If you want actual animated elements, you'd define keyframes in tailwind.config.js and apply them here */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob top-0 left-0"></div>
        <div className="absolute w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 top-0 right-0"></div>
        <div className="absolute w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 bottom-0 left-0"></div>
      </div>
      
      <div className="container mx-auto flex items-center justify-between relative z-10">
        {/* Enhanced Logo Section */}
        <Link to="/" className="flex items-center space-x-2 text-white">
          <div className="relative">
            <div className="bg-blue-500 p-2 rounded-full flex items-center justify-center relative z-10">
              <Briefcase size={28} className="text-white" />
            </div>
            {/* Minimalist ping/pulse for logo */}
            <span className="absolute top-0 right-0 inline-flex h-3 w-3 rounded-full bg-blue-400 animate-ping opacity-75"></span>
            <span className="absolute top-0 right-0 inline-flex h-3 w-3 rounded-full bg-blue-400"></span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold tracking-tight">CareerFlow</h1>
            <p className="text-sm text-blue-100 opacity-80">Find Your Path</p>
          </div>
        </Link>

        {/* Enhanced Search Bar - Desktop */}
        <div className="hidden md:block relative flex-grow max-w-lg mx-8" ref={searchRef}>
          <form onSubmit={handleSearch} className="relative">
            <div className={`relative flex items-center rounded-lg border transition-all duration-300 ${isSearchFocused ? 'border-blue-400 shadow-md' : 'border-blue-600 bg-blue-600/50'}`}>
              <Search size={20} className="text-blue-200 ml-3" />
              <input
                type="text"
                placeholder="Search jobs, companies, skills..."
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="flex-grow p-2.5 pl-2 bg-transparent text-white placeholder-blue-200 focus:outline-none rounded-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setShowSearchSuggestions(false);
                  }}
                  className="p-2 text-blue-200 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              )}
              <button type="submit" className="bg-blue-500 text-white p-2.5 rounded-r-lg hover:bg-blue-400 transition-colors">
                <Filter size={16} />
              </button>
            </div>
          </form>

          {/* Search Suggestions */}
          {showSearchSuggestions && searchSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg overflow-hidden z-30">
              {searchSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 text-gray-800 hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Search size={16} className="text-gray-500 mr-2" />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center space-x-1 py-2 px-3 rounded-lg transition duration-300 ease-in-out text-lg font-medium 
                ${isActivePath(path)
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-blue-200 hover:text-white hover:bg-blue-600/50'
                }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}

          {isAuthenticated && user && getDashboardLink() && (
            <Link
              to={getDashboardLink()}
              className={`flex items-center space-x-1 py-2 px-3 rounded-lg transition duration-300 ease-in-out text-lg font-medium
                ${isActivePath(getDashboardLink())
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-blue-200 hover:text-white hover:bg-blue-600/50'
                }`}
            >
              <BarChart3 size={18} />
              <span>Dashboard</span>
            </Link>
          )}
        </div>

        {/* Right Section - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated && user ? (
            <>
              {/* Quick Actions */}
              <div className="flex items-center space-x-2">
                <Link to="/saved-jobs" className="p-2 rounded-full text-blue-200 hover:bg-blue-600/50 hover:text-white transition duration-200" title="Saved Jobs">
                  <Save size={18} />
                </Link>
                <Link to="/applications" className="p-2 rounded-full text-blue-200 hover:bg-blue-600/50 hover:text-white transition duration-200" title="Applications">
                  <FileText size={18} />
                </Link>
              </div>

              {/* Enhanced Notifications */}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="p-2 rounded-full text-blue-200 hover:bg-blue-600/50 hover:text-white transition duration-200 relative"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
                  )}
                </button>

                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-30">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                      <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                      <button
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        onClick={markAllNotificationsRead}
                      >
                        Mark all read
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`flex items-start p-4 cursor-pointer hover:bg-blue-50 transition-colors ${notification.unread ? 'bg-blue-50/50' : ''}`}
                          onClick={() => handleNotificationAction(notification)}
                        >
                          <div className="flex-shrink-0 mr-3">
                            {notification.avatar ? (
                              <img src={notification.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                {getNotificationIcon(notification.type)}
                              </div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-sm font-semibold text-gray-800">{notification.title}</h4>
                            <p className="text-sm text-gray-600 mt-0.5">{notification.message}</p>
                            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                              <span>{notification.time}</span>
                              <button className="text-blue-600 hover:text-blue-800 font-medium">
                                {notification.action}
                              </button>
                            </div>
                          </div>
                          {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2 mt-2"></div>}
                        </div>
                      ))}
                    </div>
                    <Link to="/notifications" className="block text-center py-3 text-blue-600 hover:bg-gray-100 transition-colors border-t border-gray-200">
                      View all notifications
                    </Link>
                  </div>
                )}
              </div>

              {/* Enhanced User Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-blue-600/50 transition-colors cursor-pointer"
                  onMouseEnter={() => setIsAvatarHovered(true)}
                  onMouseLeave={() => setIsAvatarHovered(false)}
                >
                  <div className="relative w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white text-lg font-bold">{user.name?.charAt(0).toUpperCase() || 'U'}</span>
                    )}
                    {user.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-blue-700"></div>}
                    {isAvatarHovered && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-xs opacity-0 hover:opacity-100 transition-opacity">
                        <Camera size={16} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-start hidden lg:block"> {/* Hide name/role on medium screens */}
                    <p className="text-white font-semibold flex items-center">
                      {user.name || 'User'}
                      {user.isVerified && <Shield size={14} className="text-blue-300 ml-1" />}
                    </p>
                    <p className="text-blue-200 text-xs">{getUserRoleDisplay()}</p>
                  </div>
                  <ChevronDown size={16} className={`text-blue-200 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl overflow-hidden z-30">
                    <div className="flex items-center p-4 border-b border-gray-200">
                      <div
                        className="relative w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden cursor-pointer group"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-white text-2xl font-bold">{user.name?.charAt(0).toUpperCase() || 'U'}</span>
                        )}
                        {user.isOnline && <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Upload size={20} />
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center text-gray-900 font-semibold text-lg">
                          {user.name}
                          {user.isVerified && <Shield size={16} className="text-blue-500 ml-1" />}
                        </div>
                        <p className="text-gray-600 text-sm">{user.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                            {getUserRoleDisplay()}
                          </span>
                          {user.plan && <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">{user.plan}</span>}
                        </div>
                        <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Eye size={12} />
                            <span>Profile: {user.profileCompletion}%</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star size={12} />
                            <span>Credits: {user.credits}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <Link to="/profile" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                        <User size={16} className="mr-3 text-gray-500" />
                        <span>My Profile</span>
                        <span className="ml-auto px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">{user.profileCompletion}%</span>
                      </Link>
                      <Link to="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                        <BarChart3 size={16} className="mr-3 text-gray-500" />
                        <span>Dashboard</span>
                      </Link>
                      <Link to="/applications" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                        <FileText size={16} className="mr-3 text-gray-500" />
                        <span>My Applications</span>
                      </Link>
                      <Link to="/saved-jobs" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                        <Heart size={16} className="mr-3 text-gray-500" />
                        <span>Saved Jobs</span>
                      </Link>
                      <Link to="/messages" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                        <MessageSquare size={16} className="mr-3 text-gray-500" />
                        <span>Messages</span>
                        {unreadCount > 0 && <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">{unreadCount}</span>}
                      </Link>

                      <div className="py-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</div>
                      <Link to="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                        <Settings size={16} className="mr-3 text-gray-500" />
                        <span>Settings</span>
                      </Link>
                      <Link to="/billing" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                        <CreditCard size={16} className="mr-3 text-gray-500" />
                        <span>Billing & Plans</span>
                        <span className="ml-auto px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">{user.plan}</span>
                      </Link>
                      <Link to="/referrals" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
                        <UserPlus size={16} className="mr-3 text-gray-500" />
                        <span>Invite Friends</span>
                        <span className="ml-auto px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">New</span>
                      </Link>

                      <div className="border-t border-gray-200 my-2"></div>
                      <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut size={16} className="mr-3" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Hidden file input for avatar upload */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarUpload}
                accept="image/*"
                className="hidden"
              />
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/auth?mode=login" className="px-4 py-2 rounded-lg text-blue-200 hover:bg-blue-600/50 hover:text-white transition-colors flex items-center space-x-2">
                <User size={18} />
                <span>Sign In</span>
              </Link>
              <Link to="/auth?mode=register" className="px-4 py-2 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-colors flex items-center space-x-2 shadow-md">
                <UserPlus size={18} />
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg text-white hover:bg-blue-600/50 transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Enhanced Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-blue-700 shadow-lg pb-4 z-10">
          <div className="container mx-auto px-4 py-2">
            {/* Mobile Search */}
            <div className="mb-4">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative flex items-center rounded-lg border border-blue-600 bg-blue-600/50">
                  <Search size={20} className="text-blue-200 ml-3" />
                  <input
                    type="text"
                    placeholder="Search jobs, companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow p-2.5 pl-2 bg-transparent text-white placeholder-blue-200 focus:outline-none rounded-lg"
                  />
                </div>
              </form>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-2">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition duration-200 
                    ${isActivePath(path) ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-blue-600/50 hover:text-white'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              ))}

              {isAuthenticated && user && (
                <>
                  {getDashboardLink() && (
                    <Link
                      to={getDashboardLink()}
                      className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition duration-200
                        ${isActivePath(getDashboardLink()) ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-blue-600/50 hover:text-white'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <BarChart3 size={18} />
                      <span>Dashboard</span>
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg text-blue-200 hover:bg-blue-600/50 hover:text-white transition duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </Link>

                  <Link
                    to="/saved-jobs"
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg text-blue-200 hover:bg-blue-600/50 hover:text-white transition duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart size={18} />
                    <span>Saved Jobs</span>
                  </Link>

                  <Link
                    to="/applications"
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg text-blue-200 hover:bg-blue-600/50 hover:text-white transition duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText size={18} />
                    <span>Applications</span>
                  </Link>

                  <Link
                    to="/notifications"
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg text-blue-200 hover:bg-blue-600/50 hover:text-white transition duration-200 relative"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Bell size={18} />
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                      <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </Link>

                  {/* Mobile User Info Summary */}
                  <div className="flex items-center p-4 border-t border-blue-600 mt-4 pt-4">
                    <div className="relative w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white text-xl font-bold">{user.name?.charAt(0).toUpperCase() || 'U'}</span>
                      )}
                      {user.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-blue-700"></div>}
                    </div>
                    <div className="ml-3 flex-grow">
                      <div className="flex items-center text-white font-semibold">
                        <p>{user.name || 'User'}</p>
                        {user.isVerified && <Shield size={14} className="text-blue-300 ml-1" />}
                      </div>
                      <p className="text-blue-200 text-sm">{user.email}</p>
                      <div className="flex space-x-2 mt-1">
                        <span className="px-2 py-0.5 bg-blue-600 text-blue-100 text-xs rounded-full">{getUserRoleDisplay()}</span>
                        {user.plan && <span className="px-2 py-0.5 bg-purple-600 text-purple-100 text-xs rounded-full">{user.plan}</span>}
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/settings"
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg text-blue-200 hover:bg-blue-600/50 hover:text-white transition duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg text-red-300 hover:bg-red-600/50 hover:text-white transition duration-200 w-full text-left"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </>
              )}

              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 mt-4">
                  <Link
                    to="/auth?mode=login"
                    className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-colors shadow-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/auth?mode=register"
                    className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-400 transition-colors shadow-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlus size={18} />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;