import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import JobListing from './pages/JobListing';
import ResourcesPage from './pages/Resource';
import AboutPage from './pages/About';

import Footer from './common/Footer';
import Navbar from './common/Navbar';
import LoadingSpinner from './common/LoadingSpinner';

import './index.css';

// ✅ ProtectedRoute component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (!user) return <Navigate to="/auth" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'job_seeker') return <Navigate to="/seeker/dashboard" replace />;
    if (user.role === 'employer') return <Navigate to="/employer/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* ✅ Show Navbar on all pages */}
      <Navbar />

      {/* ✅ Main Routes */}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/jobs" element={<JobListing />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Protected Routes */}
            <Route
              path="/seeker/dashboard"
              element={
                <ProtectedRoute allowedRoles={['job_seeker']}>
                  <JobSeekerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer/dashboard"
              element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <EmployerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <h1 className="text-3xl text-center p-8">Admin Dashboard (Coming Soon)</h1>
                </ProtectedRoute>
              }
            />

            {/* Optional: 404 Not Found */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
      </main>

      {/* ✅ Show Footer on all pages */}
      <Footer />
    </div>
  );
}

export default App;
