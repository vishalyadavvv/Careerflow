import React, { useEffect, useState } from "react";
// Removed: import { useNavigate } from "react-router-dom"; // Assuming react-router-dom is used for navigation
import axiosConfig from "../api/axiosConfig"; // Needed for real API call

// Import Lucide icons for the dashboard and common components
import {
  Briefcase, Users, FileText, CheckCircle, Clock, TrendingUp, TrendingDown,
  PlusCircle, Building, BarChart, Search, Edit, Eye, PauseCircle, Trash2, Calendar,
  Menu, X, UserRoundPlus, ChevronDown, ChevronUp, Bell, Sun, Moon, Globe, BriefcaseBusiness, Settings, LogOut,
  MapPin, DollarSign, BookOpen, ShoppingCart, Award, Star, Newspaper, Lightbulb, Facebook, Twitter, Linkedin, Instagram, Play, Apple
} from 'lucide-react';

// --- Mock Components and Contexts (for self-contained immersive) ---

// Mock LoadingSpinner component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
    <p className="ml-4 text-lg text-gray-700 dark:text-gray-300">Loading dashboard...</p>
  </div>
);

// Mock useAuth context
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      // Mock user data for an employer
      setUser({
        id: "employer123",
        username: "EmployerName",
        companyName: "Acme Corp",
        role: "employer",
      });
      setLoading(false);
    }, 500); // Simulate a short loading time
  }, []);

  return { user, loading };
};

// Inline Footer Component
const Footer = () => {
    const [isDarkMode, setIsDarkMode] = useState(false); // Local dark mode state for Footer

    // This toggleDarkMode is just for demonstration within this single file.
    // In a real app, it would be managed by a global context.
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark', !isDarkMode);
    };

    return (
        <footer className={`py-12 ${isDarkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-800 text-gray-300'}`}>
            <div className="container mx-auto px-4 text-center md:text-left">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">JobPortal</h3>
                        <p className="text-sm">Your ultimate destination for finding the perfect job.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200">Sitemap</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200">Cookie Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Our Brands</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors duration-200">99acres</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200">Jeevansathi</a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200">Shiksha</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex space-x-4 mb-4 md:mb-0">
                        <a href="#" aria-label="Facebook" className="hover:text-white transition-colors duration-200"><Facebook size={24} /></a>
                        <a href="#" aria-label="Twitter" className="hover:text-white transition-colors duration-200"><Twitter size={24} /></a>
                        <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors duration-200"><Linkedin size={24} /></a>
                        <a href="#" aria-label="Instagram" className="hover:text-white transition-colors duration-200"><Instagram size={24} /></a>
                    </div>
                    <p className="text-sm">&copy; 2025 JobPortal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};


// Main EmployerDashboard component
function EmployerDashboard() {
  const { user, loading } = useAuth(); // Assume useAuth provides user object and loading state
  // Removed: const navigate = useNavigate(); // Removed useNavigate import
  const [dashboardData, setDashboardData] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    // Redirect logic for authentication and role
    if (!loading && (!user || user.role !== "employer")) {
      // In a real app, this would redirect. For this immersive, we'll just log.
      console.log("Redirecting: User not logged in or not an employer.");
      // navigate("/auth"); // Uncomment in a full application
    } else if (user && user.role === "employer") {
      fetchDashboardData();
    }
  }, [user, loading]); // Removed navigate from dependency array

  const fetchDashboardData = async () => {
    try {
      // In a real application, you would make an actual API call here:
      // const res = await axios.get('/api/employer/dashboard');
      // setDashboardData(res.data);

      // Mocking API call with a delay to simulate network request
      setTimeout(() => {
        setDashboardData({
          totalJobs: 12,
          totalApplications: 145,
          pendingReviews: 23,
          shortlisted: 15,
          interviews: 7,
          hired: 3,
          recentApplications: [
            {
              id: 1,
              candidateName: "Sarah Johnson",
              position: "Senior Frontend Developer",
              appliedDate: "2024-01-15",
              status: "pending",
              avatar: "SJ",
              experience: "5 years",
              skills: ["React", "TypeScript", "Node.js"],
              email: "sarah.johnson@email.com",
              phone: "+1 (555) 123-4567"
            },
            {
              id: 2,
              candidateName: "Michael Chen",
              position: "UX Designer",
              appliedDate: "2024-01-14",
              status: "shortlisted",
              avatar: "MC",
              experience: "3 years",
              skills: ["Figma", "Adobe XD", "Prototyping"],
              email: "michael.chen@email.com",
              phone: "+1 (555) 987-6543"
            },
            {
              id: 3,
              candidateName: "Emily Rodriguez",
              position: "Backend Developer",
              appliedDate: "2024-01-13",
              status: "interview",
              avatar: "ER",
              experience: "4 years",
              skills: ["Python", "Django", "PostgreSQL"],
              email: "emily.rodriguez@email.com",
              phone: "+1 (555) 456-7890"
            },
            {
              id: 4,
              candidateName: "David Kim",
              position: "DevOps Engineer",
              appliedDate: "2024-01-12",
              status: "hired",
              avatar: "DK",
              experience: "6 years",
              skills: ["Docker", "Kubernetes", "AWS"],
              email: "david.kim@email.com",
              phone: "+1 (555) 321-0987"
            },
            {
              id: 5,
              candidateName: "Lisa Wang",
              position: "Product Manager",
              appliedDate: "2024-01-11",
              status: "rejected",
              avatar: "LW",
              experience: "4 years",
              skills: ["Agile", "Scrum", "Analytics"],
              email: "lisa.wang@email.com",
              phone: "+1 (555) 654-3210"
            }
          ],
          activeJobs: [
            {
              id: 1,
              title: "Senior Frontend Developer",
              department: "Technology",
              type: "Full-time",
              location: "New York, NY",
              postedDate: "2024-01-10",
              applications: 45,
              views: 230,
              status: "active",
              salary: "$90,000 - $120,000",
              description: "Looking for an experienced frontend developer to join our team..."
            },
            {
              id: 2,
              title: "UX Designer",
              department: "Design",
              type: "Full-time",
              location: "Remote",
              postedDate: "2024-01-08",
              applications: 32,
              views: 180,
              status: "active",
              salary: "$70,000 - $95,000",
              description: "Seeking a creative UX designer to enhance user experiences..."
            },
            {
              id: 3,
              title: "Backend Developer",
              department: "Technology",
              type: "Contract",
              location: "San Francisco, CA",
              postedDate: "2024-01-05",
              applications: 28,
              views: 150,
              status: "active",
              salary: "$80,000 - $110,000",
              description: "Join our backend team to build scalable solutions..."
            }
          ],
          performanceInsights: [
            {
              title: "Application Rate",
              value: "12.5%",
              trend: "positive",
              description: "Average applications per job view",
              change: "+2.3% from last month"
            },
            {
              title: "Time to Hire",
              value: "18 days",
              trend: "positive",
              description: "Average time from posting to hire",
              change: "-3 days from last month"
            },
            {
              title: "Job View Rate",
              value: "2.8K",
              trend: "positive",
              description: "Total views across all job postings",
              change: "+450 from last week"
            }
          ]
        });
        setFetching(false);
      }, 1000); // Simulate 1-second loading time
    } catch (err) {
      console.error("Error fetching dashboard data", err);
      setFetching(false);
    }
  };

  // Helper function to get Tailwind color classes based on application status
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shortlisted":
        return "bg-blue-100 text-blue-800";
      case "interview":
        return "bg-purple-100 text-purple-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "hired":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Helper function to get display text for application status
  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Under Review";
      case "shortlisted":
        return "Shortlisted";
      case "interview":
        return "Interview Scheduled";
      case "rejected":
        return "Rejected";
      case "hired":
        return "Hired";
      default:
        return "Under Review";
    }
  };

  // Helper function to format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Placeholder functions for application and job actions
  const handleApplicationAction = (applicationId, action) => {
    console.log(`${action} application ${applicationId}`);
    // Implement API call for application actions (e.g., update status)
  };

  const handleJobAction = (jobId, action) => {
    console.log(`${action} job ${jobId}`);
    // Implement API call for job actions (e.g., pause, delete)
  };

  // Show loading spinner while data is being fetched or user is loading
  if (loading || fetching || !dashboardData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-inter transition-colors duration-300">
      {/* Removed Navbar component */}

      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
                Welcome back, {user?.companyName || user?.username || 'Employer'}! 👋
              </h1>
              <p className="text-lg opacity-90">
                Manage your job postings, review applications, and grow your team.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-lg p-4 text-center shadow-inner">
                <span className="block text-3xl font-bold">{dashboardData.activeJobs.length}</span>
                <span className="block text-sm opacity-80">Active Jobs</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-lg p-4 text-center shadow-inner">
                <span className="block text-3xl font-bold">{dashboardData.totalApplications}</span>
                <span className="block text-sm opacity-80">Total Applications</span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Jobs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center space-x-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex-shrink-0 bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-200 p-3 rounded-full">
              <Briefcase size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Jobs Posted</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{dashboardData.totalJobs}</p>
              <span className="text-green-500 text-sm flex items-center">
                <TrendingUp size={16} className="mr-1" /> +2 this month
              </span>
            </div>
          </div>

          {/* Total Applications */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center space-x-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex-shrink-0 bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-200 p-3 rounded-full">
              <FileText size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Applications</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{dashboardData.totalApplications}</p>
              <span className="text-green-500 text-sm flex items-center">
                <TrendingUp size={16} className="mr-1" /> +15 this week
              </span>
            </div>
          </div>

          {/* Pending Reviews */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center space-x-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex-shrink-0 bg-yellow-100 text-yellow-600 dark:bg-yellow-800 dark:text-yellow-200 p-3 rounded-full">
              <Clock size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Pending Reviews</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{dashboardData.pendingReviews}</p>
              <span className="text-gray-500 text-sm">Needs attention</span>
            </div>
          </div>

          {/* Shortlisted */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center space-x-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex-shrink-0 bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-200 p-3 rounded-full">
              <CheckCircle size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Shortlisted</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{dashboardData.shortlisted}</p>
              <span className="text-blue-500 text-sm">Quality candidates</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <PlusCircle size={48} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Post New Job</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Create a new job posting and attract top talent to your organization.
              </p>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md"
                onClick={() => console.log("Navigate to /employer/post-job")} // Mock navigation
              >
                Post Job
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <Building size={48} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Company Profile</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Update your company information, branding, and showcase your culture.
              </p>
              <button
                className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-md"
                onClick={() => console.log("Navigate to /employer/profile")} // Mock navigation
              >
                Edit Profile
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <BarChart size={48} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">View Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Analyze your job posting performance and recruitment metrics.
              </p>
              <button
                className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md"
                onClick={() => console.log("Navigate to /employer/analytics")} // Mock navigation
              >
                View Analytics
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-center mb-4">
                <Search size={48} className="text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Search Talent</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Proactively find and contact qualified candidates for your positions.
              </p>
              <button
                className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition-colors duration-200 shadow-md"
                onClick={() => console.log("Navigate to /employer/search")} // Mock navigation
              >
                Search Talent
              </button>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Recent Applications</h2>
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Candidate</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Position</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Applied Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {dashboardData.recentApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-100 rounded-full flex items-center justify-center font-semibold text-sm">
                          {application.avatar}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{application.candidateName}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{application.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-100">{application.position}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{application.experience}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(application.appliedDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                        {getStatusText(application.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                          title="View Details"
                          onClick={() => console.log(`Navigate to /employer/applications/${application.id}`)} // Mock navigation
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-200"
                          title="Shortlist"
                          onClick={() => handleApplicationAction(application.id, 'shortlist')}
                        >
                          <CheckCircle size={20} />
                        </button>
                        <button
                          className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300 transition-colors duration-200"
                          title="Schedule Interview"
                          onClick={() => handleApplicationAction(application.id, 'schedule')}
                        >
                          <Calendar size={20} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                          title="Reject"
                          onClick={() => handleApplicationAction(application.id, 'reject')}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-center">
            <button
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md"
              onClick={() => console.log("Navigate to /employer/applications")} // Mock navigation
            >
              View All Applications
            </button>
          </div>
        </div>

        {/* Active Jobs */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Active Job Postings</h2>
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Job Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Department</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Applications</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Views</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {dashboardData.activeJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{job.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{job.type} • {job.salary}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {job.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {job.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {job.applications}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {job.views}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                          title="Edit Job"
                          onClick={() => console.log(`Navigate to /employer/jobs/${job.id}/edit`)} // Mock navigation
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-200"
                          title="View Applications"
                          onClick={() => console.log(`Navigate to /employer/jobs/${job.id}/applications`)} // Mock navigation
                        >
                          <Users size={20} />
                        </button>
                        <button
                          className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors duration-200"
                          title="Pause Job"
                          onClick={() => handleJobAction(job.id, 'pause')}
                        >
                          <PauseCircle size={20} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                          title="Delete Job"
                          onClick={() => handleJobAction(job.id, 'delete')}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-center">
            <button
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md"
              onClick={() => console.log("Navigate to /employer/jobs")} // Mock navigation
            >
              Manage All Jobs
            </button>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Performance Insights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardData.performanceInsights.map((insight, index) => (
              <div key={index} className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ${insight.trend === 'positive' ? 'border-green-300' : insight.trend === 'negative' ? 'border-red-300' : 'border-gray-300'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{insight.title}</h4>
                  <span className={`text-sm flex items-center ${insight.trend === 'positive' ? 'text-green-600' : insight.trend === 'negative' ? 'text-red-600' : 'text-gray-500'}`}>
                    {insight.trend === 'positive' ? <TrendingUp size={16} className="mr-1" /> : insight.trend === 'negative' ? <TrendingDown size={16} className="mr-1" /> : null}
                    {insight.change}
                  </span>
                </div>
                <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{insight.value}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{insight.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center bg-blue-50 dark:bg-gray-700 p-6 rounded-xl shadow-inner">
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">Want deeper insights into your recruitment performance?</p>
            <button
              className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors duration-200 shadow-md"
              onClick={() => console.log("Navigate to /employer/analytics")} // Mock navigation
            >
              View Detailed Analytics
            </button>
          </div>
        </div>
      </main>

      {/* Footer component (now inlined for self-containment) */}
      <Footer />
    </div>
  );
}

export default EmployerDashboard;
