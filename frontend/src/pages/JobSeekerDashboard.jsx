import React, { useState, useEffect } from 'react';
// Removed useNavigate as router is not part of the self-contained environment
import { Trash2 } from 'lucide-react'; // Import the Trash2 icon

// Dummy Footer component for demonstration
// In a real application, this would be imported from its respective path.
// import { AuthProvider, useAuth } from '../contexts/AuthContext'; // Import AuthContext

// Dummy AuthContext and LoadingSpinner for standalone execution
// In a real application, these would be imported.
const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async auth check
    setTimeout(() => {
      // Set a dummy user for demonstration
      setUser({ username: 'JaneDoe', role: 'job_seeker' });
      setLoading(false);
    }, 1000);
  }, []);

  // return (
  //   <AuthContext.Provider value={{ user, loading }}>
  //     {children}
  //   </AuthContext.Provider>
  // );
};

const useAuth = () => React.useContext(AuthContext);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
    <p className="ml-4 text-lg text-gray-700">Loading...</p>
  </div>
);


function JobSeekerDashboard() { // Renamed to JobSeekerDashboardContent
  const { user, loading } = useAuth();
  // Removed useNavigate and the useEffect related to navigation
  const [activeTab, setActiveTab] = useState('overview');
  const [profileCompletion, setProfileCompletion] = useState(65);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New job match found!", type: "success", time: "2 hours ago" },
    { id: 2, message: "Application viewed by employer", type: "info", time: "1 day ago" },
    { id: 3, message: "Complete your profile to get better matches", type: "warning", time: "3 days ago" }
  ]);

  // Sample data (will be replaced with API calls)
  const dashboardStats = {
    appliedJobs: 12,
    savedJobs: 8,
    profileViews: 34,
    interviewsScheduled: 3
  };

  const recentApplications = [
    {
      id: 1,
      jobTitle: "Senior React Developer",
      company: "TechCorp Inc.",
      status: "Under Review",
      appliedDate: "2024-01-15",
      salary: "$90,000 - $120,000",
      location: "Remote"
    },
    {
      id: 2,
      jobTitle: "Full Stack Engineer",
      company: "StartupXYZ",
      status: "Interview Scheduled",
      appliedDate: "2024-01-12",
      salary: "$80,000 - $110,000",
      location: "San Francisco, CA"
    },
    {
      id: 3,
      jobTitle: "Frontend Developer",
      company: "Design Studio",
      status: "Application Sent",
      appliedDate: "2024-01-10",
      salary: "$70,000 - $95,000",
      location: "New York, NY"
    }
  ];

  const savedJobs = [
    {
      id: 1,
      title: "Senior JavaScript Developer",
      company: "Innovation Labs",
      location: "Remote",
      salary: "$85,000 - $115,000",
      postedDate: "2024-01-14",
      urgent: false
    },
    {
      id: 2,
      title: "React Native Developer",
      company: "Mobile Solutions",
      location: "Austin, TX",
      salary: "$75,000 - $100,000",
      postedDate: "2024-01-13",
      urgent: true
    },
    {
      id: 3,
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Seattle, WA",
      salary: "$95,000 - $130,000",
      postedDate: "2024-01-12",
      urgent: false
    }
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "GrowthCorp",
      location: "Remote",
      salary: "$100,000 - $140,000",
      matchPercentage: 95,
      skills: ["React", "Node.js", "TypeScript", "AWS"]
    },
    {
      id: 2,
      title: "Lead Frontend Engineer",
      company: "UX Masters",
      location: "Los Angeles, CA",
      salary: "$110,000 - $150,000",
      matchPercentage: 88,
      skills: ["React", "Vue.js", "CSS", "JavaScript"]
    }
  ];

  const upcomingInterviews = [
    {
      id: 1,
      company: "StartupXYZ",
      position: "Full Stack Engineer",
      date: "2024-01-20",
      time: "2:00 PM",
      type: "Technical Interview",
      interviewer: "John Smith"
    },
    {
      id: 2,
      company: "TechCorp Inc.",
      position: "Senior React Developer",
      date: "2024-01-22",
      time: "10:00 AM",
      type: "Final Round",
      interviewer: "Sarah Johnson"
    }
  ];

  // Helper function to get status-specific Tailwind classes
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'under review': return 'bg-blue-100 text-blue-800';
      case 'interview scheduled': return 'bg-purple-100 text-purple-800';
      case 'application sent': return 'bg-gray-200 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Helper function to get notification-specific Tailwind classes
  const getNotificationTypeClasses = (type) => {
    switch (type) {
      case 'success': return 'bg-green-100 border-l-4 border-green-500';
      case 'info': return 'bg-blue-100 border-l-4 border-blue-500';
      case 'warning': return 'bg-yellow-100 border-l-4 border-yellow-500';
      default: return 'bg-gray-100 border-l-4 border-gray-300';
    }
  };

  // Function to dismiss a notification
  const dismissNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  // Show loading spinner if authentication is in progress or user is not authorized
  if (loading || !user || user.role !== 'job_seeker') {
    return (
      <AuthProvider> {/* Ensure AuthProvider is here if this is the entry point */}
        <LoadingSpinner />
      </AuthProvider>
    );
  }

  return (
    // Main container for the dashboard, using Inter font
    <div className="min-h-screen flex flex-col font-inter bg-gray-50">
      {/* Removed Navbar component */}
      
      {/* Main content area */}
      <main className="flex-grow p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header Section: Welcome and Profile Completion */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Welcome back, <span className="text-indigo-600">{user.username}!</span>
              </h1>
              <p className="text-gray-600 text-lg">Here's what's happening with your job search</p>
            </div>
            
            {/* Profile Completion Card */}
            <div className="w-full md:w-auto bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col items-center shadow-sm">
              <div className="flex justify-between w-full mb-2">
                <span className="text-gray-700 font-medium">Profile Completion</span>
                <span className="font-bold text-indigo-600">{profileCompletion}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                <div 
                  className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${profileCompletion}%` }}
                ></div>
              </div>
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md">
                Complete Profile
              </button>
            </div>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Applied Jobs Stat Card */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 transform transition-transform duration-200 hover:scale-105 hover:shadow-lg">
              <div className="text-4xl p-3 rounded-full bg-blue-100 text-blue-600">📝</div>
              <div className="flex-1">
                <div className="text-3xl font-bold text-gray-800">{dashboardStats.appliedJobs}</div>
                <div className="text-gray-500 text-sm">Applications Sent</div>
              </div>
            </div>
            
            {/* Saved Jobs Stat Card */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 transform transition-transform duration-200 hover:scale-105 hover:shadow-lg">
              <div className="text-4xl p-3 rounded-full bg-green-100 text-green-600">💾</div>
              <div className="flex-1">
                <div className="text-3xl font-bold text-gray-800">{dashboardStats.savedJobs}</div>
                <div className="text-gray-500 text-sm">Saved Jobs</div>
              </div>
            </div>
            
            {/* Profile Views Stat Card */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 transform transition-transform duration-200 hover:scale-105 hover:shadow-lg">
              <div className="text-4xl p-3 rounded-full bg-yellow-100 text-yellow-600">👁️</div>
              <div className="flex-1">
                <div className="text-3xl font-bold text-gray-800">{dashboardStats.profileViews}</div>
                <div className="text-gray-500 text-sm">Profile Views</div>
              </div>
            </div>
            
            {/* Interviews Scheduled Stat Card */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 transform transition-transform duration-200 hover:scale-105 hover:shadow-lg">
              <div className="text-4xl p-3 rounded-full bg-purple-100 text-purple-600">🎯</div>
              <div className="flex-1">
                <div className="text-3xl font-bold text-gray-800">{dashboardStats.interviewsScheduled}</div>
                <div className="text-gray-500 text-sm">Interviews Scheduled</div>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          {notifications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Notifications</h2>
              <div className="space-y-3">
                {notifications.map(notification => (
                  <div key={notification.id} className={`flex items-center justify-between p-4 rounded-lg shadow-sm transition-transform duration-200 hover:scale-[1.01] ${getNotificationTypeClasses(notification.type)}`}>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center">
                      <span className="text-gray-800 font-medium">{notification.message}</span>
                      <span className="text-gray-500 text-sm mt-1 sm:mt-0 sm:ml-4">{notification.time}</span>
                    </div>
                    <button 
                      className="ml-4 text-gray-500 hover:text-gray-800 font-bold text-xl transition-colors"
                      onClick={() => dismissNotification(notification.id)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-2">
            <button 
              className={`px-6 py-3 text-lg font-medium text-gray-600 border-b-2 border-transparent hover:border-indigo-500 hover:text-indigo-600 transition-colors duration-200 ${activeTab === 'overview' ? '!border-indigo-600 !text-indigo-700' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-6 py-3 text-lg font-medium text-gray-600 border-b-2 border-transparent hover:border-indigo-500 hover:text-indigo-600 transition-colors duration-200 ${activeTab === 'applications' ? '!border-indigo-600 !text-indigo-700' : ''}`}
              onClick={() => setActiveTab('applications')}
            >
              My Applications
            </button>
            <button 
              className={`px-6 py-3 text-lg font-medium text-gray-600 border-b-2 border-transparent hover:border-indigo-500 hover:text-indigo-600 transition-colors duration-200 ${activeTab === 'saved' ? '!border-indigo-600 !text-indigo-700' : ''}`}
              onClick={() => setActiveTab('saved')}
            >
              Saved Jobs
            </button>
            <button 
              className={`px-6 py-3 text-lg font-medium text-gray-600 border-b-2 border-transparent hover:border-indigo-500 hover:text-indigo-600 transition-colors duration-200 ${activeTab === 'interviews' ? '!border-indigo-600 !text-indigo-700' : ''}`}
              onClick={() => setActiveTab('interviews')}
            >
              Interviews
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            {activeTab === 'overview' && (
              <div className="overview-content">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Applications Section */}
                  <div className="overview-section">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">Recent Applications</h3>
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">View All</button>
                    </div>
                    <div className="space-y-4">
                      {recentApplications.slice(0, 3).map(application => (
                        <div key={application.id} className="p-4 border border-gray-200 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center transition-transform duration-200 hover:scale-[1.01] hover:shadow-sm">
                          <div className="flex-1 mb-2 md:mb-0">
                            <h4 className="text-lg font-semibold text-gray-800">{application.jobTitle}</h4>
                            <p className="text-gray-600 text-sm mb-1">{application.company}</p>
                            <div className="flex flex-wrap gap-x-4 text-gray-500 text-sm">
                              <span>{application.location}</span>
                              <span>{application.salary}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-start md:items-end">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold mb-1 ${getStatusColor(application.status)}`}>
                              {application.status}
                            </span>
                            <span className="text-gray-500 text-sm">{application.appliedDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Jobs Section */}
                  <div className="overview-section">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-gray-800">Recommended for You</h3>
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">View All</button>
                    </div>
                    <div className="space-y-4">
                      {recommendedJobs.map(job => (
                        <div key={job.id} className="p-5 border border-gray-200 rounded-lg shadow-sm flex flex-col transition-transform duration-200 hover:scale-[1.02] hover:shadow-md">
                          <div className="text-sm font-medium text-green-700 mb-2">
                            <span className="bg-green-100 px-2 py-0.5 rounded-full">{job.matchPercentage}% match</span>
                          </div>
                          <h4 className="text-lg font-semibold text-gray-800">{job.title}</h4>
                          <p className="text-gray-600 text-sm mb-2">{job.company}</p>
                          <div className="flex flex-wrap gap-x-4 text-gray-500 text-sm mb-3">
                            <span>{job.location}</span>
                            <span>{job.salary}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {job.skills.map(skill => (
                              <span key={skill} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                          <div className="flex justify-end gap-2 mt-4">
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-sm">Apply Now</button>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200 shadow-sm">Save</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="applications-content">
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                  <h3 className="text-xl font-semibold text-gray-800">My Applications ({recentApplications.length})</h3>
                  <div className="flex items-center gap-2">
                    <label htmlFor="status-filter" className="sr-only">Filter by Status</label>
                    <select id="status-filter" className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option value="">All Statuses</option>
                      <option value="sent">Application Sent</option>
                      <option value="review">Under Review</option>
                      <option value="interview">Interview Scheduled</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
                
                <div className="w-full text-left">
                  {/* Table Header for larger screens */}
                  <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 py-3 px-4 bg-gray-100 text-gray-600 font-semibold rounded-t-lg">
                    <div className="uppercase text-sm">Job Details</div>
                    <div className="uppercase text-sm">Status</div>
                    <div className="uppercase text-sm">Applied Date</div>
                    <div className="uppercase text-sm">Actions</div>
                  </div>
                  {/* Table Rows */}
                  {recentApplications.map(application => (
                    <div key={application.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 py-4 px-4 border-b border-gray-200 last:border-b-0 bg-white rounded-lg md:rounded-none shadow-sm md:shadow-none mb-4 md:mb-0 transition-transform duration-200 hover:scale-[1.005] hover:shadow">
                      <div className="flex flex-col md:block">
                        <h4 className="text-lg font-semibold text-gray-800">{application.jobTitle}</h4>
                        <p className="text-gray-600 text-sm">{application.company}</p>
                        <div className="flex flex-wrap gap-x-4 text-gray-500 text-sm mt-1">
                          <span>{application.location}</span>
                          <span>{application.salary}</span>
                        </div>
                      </div>
                      <div className="flex flex-col md:block mt-2 md:mt-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(application.status)}`}>
                          {application.status}
                        </span>
                      </div>
                      <div className="flex flex-col md:block mt-2 md:mt-0 text-gray-700">{application.appliedDate}</div>
                      <div className="flex flex-col sm:flex-row gap-2 mt-2 md:mt-0">
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200 shadow-sm">View</button>
                        <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors duration-200 shadow-sm">Withdraw</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="saved-content">
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                  <h3 className="text-xl font-semibold text-gray-800">Saved Jobs ({savedJobs.length})</h3>
                  <button className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">Clear All</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedJobs.map(job => (
                    <div key={job.id} className={`p-5 border border-gray-200 rounded-lg shadow-sm flex flex-col relative transition-transform duration-200 hover:scale-[1.02] hover:shadow-md ${job.urgent ? 'border-red-500 ring-1 ring-red-500' : ''}`}>
                      {job.urgent && <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow">Urgent</div>}
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-semibold text-gray-800">{job.title}</h4>
                        {/* Replaced heart icon with Trash2 icon */}
                        <button className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-100">
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{job.company}</p>
                      <div className="flex flex-wrap gap-x-4 text-gray-500 text-sm mb-3">
                        <span>{job.location}</span>
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                        <span className="text-gray-500 text-sm">Posted: {job.postedDate}</span>
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-sm">Apply Now</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'interviews' && (
              <div className="interviews-content">
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                  <h3 className="text-xl font-semibold text-gray-800">Upcoming Interviews ({upcomingInterviews.length})</h3>
                  <button className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">View Calendar</button>
                </div>
                
                <div className="space-y-4">
                  {upcomingInterviews.map(interview => (
                    <div key={interview.id} className="p-5 border border-gray-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-transform duration-200 hover:scale-[1.01] hover:shadow-sm">
                      <div className="flex flex-col items-center justify-center bg-indigo-100 text-indigo-700 rounded-lg p-3 w-20 flex-shrink-0 shadow-inner">
                        <div className="text-3xl font-bold">{new Date(interview.date).getDate()}</div>
                        <div className="text-sm uppercase font-semibold">
                          {new Date(interview.date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800">{interview.position}</h4>
                        <p className="text-gray-600 text-sm mb-2">{interview.company}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-500 text-sm">
                          <span>🕒 {interview.time}</span>
                          <span>📋 {interview.type}</span>
                          <span>👤 {interview.interviewer}</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0 sm:ml-auto">
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-sm">Interview Prep</button>
                        <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors duration-200 shadow-sm">Reschedule</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Footer component */}
      <Footer />
    </div>
  );
}

// Main App component to wrap JobSeekerDashboardContent with AuthProvider
// The AuthProvider wrapping is now handled internally for standalone preview.
// If this component is used within a larger React app, AuthProvider should be higher up.
export default  JobSeekerDashboard;
