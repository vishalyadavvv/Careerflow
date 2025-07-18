import React, { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Briefcase, Building2, TrendingUp, Calendar, Eye, Users, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';

// Mock job data
const allJobs = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'Tech Solutions Inc.',
    location: 'San Francisco, CA',
    jobType: 'Full-time',
    department: 'Engineering',
    experienceLevel: 'Senior',
    postedDate: '2024-06-10',
    applications: 125,
    views: 850,
    status: 'Active',
    logo: 'https://placehold.co/40x40/60A5FA/FFFFFF?text=TS',
    salary: '$120k - $180k',
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'Innovate Corp.',
    location: 'New York, NY',
    jobType: 'Full-time',
    department: 'Product',
    experienceLevel: 'Mid-level',
    postedDate: '2024-06-08',
    applications: 80,
    views: 600,
    status: 'Active',
    logo: 'https://placehold.co/40x40/EF4444/FFFFFF?text=IC',
    salary: '$90k - $130k',
  },
  {
    id: '3',
    title: 'UX Designer',
    company: 'Creative Studios',
    location: 'Remote',
    jobType: 'Remote',
    department: 'Design',
    experienceLevel: 'Junior',
    postedDate: '2024-06-05',
    applications: 150,
    views: 1200,
    status: 'Active',
    logo: 'https://placehold.co/40x40/22C55E/FFFFFF?text=CS',
    salary: '$65k - $95k',
  },
  {
    id: '4',
    title: 'Marketing Specialist',
    company: 'Global Brands Ltd.',
    location: 'London, UK',
    jobType: 'Contract',
    department: 'Marketing',
    experienceLevel: 'Mid-level',
    postedDate: '2024-06-03',
    applications: 60,
    views: 450,
    status: 'Active',
    logo: 'https://placehold.co/40x40/EAB308/FFFFFF?text=GB',
    salary: '$70k - $100k',
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'Quant Analytics',
    location: 'Boston, MA',
    jobType: 'Full-time',
    department: 'Data Science',
    experienceLevel: 'Senior',
    postedDate: '2024-06-01',
    applications: 95,
    views: 700,
    status: 'Active',
    logo: 'https://placehold.co/40x40/EC4899/FFFFFF?text=QA',
    salary: '$110k - $160k',
  },
  {
    id: '6',
    title: 'Customer Support Representative',
    company: 'Service First Co.',
    location: 'Austin, TX',
    jobType: 'Part-time',
    department: 'Customer Service',
    experienceLevel: 'Entry-level',
    postedDate: '2024-05-30',
    applications: 200,
    views: 1500,
    status: 'Active',
    logo: 'https://placehold.co/40x40/3B82F6/FFFFFF?text=SF',
    salary: '$35k - $50k',
  },
  {
    id: '7',
    title: 'DevOps Engineer',
    company: 'Cloud Innovations',
    location: 'Seattle, WA',
    jobType: 'Full-time',
    department: 'Engineering',
    experienceLevel: 'Mid-level',
    postedDate: '2024-05-28',
    applications: 70,
    views: 550,
    status: 'Active',
    logo: 'https://placehold.co/40x40/10B981/FFFFFF?text=CI',
    salary: '$95k - $135k',
  },
  {
    id: '8',
    title: 'Financial Analyst',
    company: 'Wealth Management Group',
    location: 'Chicago, IL',
    jobType: 'Full-time',
    department: 'Finance',
    experienceLevel: 'Junior',
    postedDate: '2024-05-25',
    applications: 110,
    views: 900,
    status: 'Active',
    logo: 'https://placehold.co/40x40/F97316/FFFFFF?text=WM',
    salary: '$55k - $80k',
  },
  {
    id: '9',
    title: 'Graphic Designer',
    company: 'Pixel Perfect Agency',
    location: 'Remote',
    jobType: 'Contract',
    department: 'Design',
    experienceLevel: 'Mid-level',
    postedDate: '2024-05-22',
    applications: 130,
    views: 1000,
    status: 'Active',
    logo: 'https://placehold.co/40x40/6366F1/FFFFFF?text=PP',
    salary: '$60k - $90k',
  },
  {
    id: '10',
    title: 'HR Manager',
    company: 'People First Solutions',
    location: 'Dallas, TX',
    jobType: 'Full-time',
    department: 'Human Resources',
    experienceLevel: 'Senior',
    postedDate: '2024-05-20',
    applications: 45,
    views: 300,
    status: 'Active',
    logo: 'https://placehold.co/40x40/BE185D/FFFFFF?text=PF',
    salary: '$85k - $120k',
  },
  {
    id: '11',
    title: 'Sales Representative',
    company: 'Growth Hub',
    location: 'Miami, FL',
    jobType: 'Full-time',
    department: 'Sales',
    experienceLevel: 'Entry-level',
    postedDate: '2024-05-18',
    applications: 180,
    views: 1100,
    status: 'Closed',
    logo: 'https://placehold.co/40x40/4ADE80/FFFFFF?text=GH',
    salary: '$45k - $70k',
  },
  {
    id: '12',
    title: 'Frontend Developer',
    company: 'Web Wizards',
    location: 'Remote',
    jobType: 'Full-time',
    department: 'Engineering',
    experienceLevel: 'Mid-level',
    postedDate: '2024-05-15',
    applications: 90,
    views: 750,
    status: 'Active',
    logo: 'https://placehold.co/40x40/FACC15/FFFFFF?text=WW',
    salary: '$80k - $115k',
  },
];

// Helper function to format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Job Card Component
const JobCard = ({ job }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 p-6 border border-gray-100 overflow-hidden ${
        job.status === 'Closed' ? 'opacity-70' : 'hover:border-blue-200'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
          job.status === 'Active' 
            ? 'bg-green-100 text-green-800 group-hover:bg-green-200 group-hover:shadow-lg' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {job.status}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0">
            <div className={`p-2 rounded-2xl bg-white shadow-md transition-all duration-300 ${
              isHovered ? 'shadow-xl transform scale-110' : ''
            }`}>
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="w-12 h-12 rounded-xl object-cover"
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src = `https://placehold.co/48x48/CCCCCC/666666?text=${job.company.charAt(0)}` 
                }}
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
              {job.title}
            </h3>
            <p className="text-gray-600 font-medium mb-1">{job.company}</p>
            <p className="text-lg font-bold text-emerald-600">{job.salary}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          <div className="flex items-center space-x-3 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
            <MapPin size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
            <Briefcase size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
            <span>{job.jobType}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
            <Building2 size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
            <span>{job.department}</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200">
            <TrendingUp size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
            <span>{job.experienceLevel}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-2xl group-hover:bg-white group-hover:shadow-md transition-all duration-300">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Eye size={16} className="text-gray-400" />
            <span>{job.views} Views</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users size={16} className="text-gray-400" />
            <span>{job.applications} Applications</span>
          </div>
          <div className="text-sm text-gray-500">
            <Calendar size={16} className="inline mr-1" />
            {formatDate(job.postedDate)}
          </div>
        </div>

        {/* Action Button */}
        <button
          className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-300 transform relative overflow-hidden ${
            job.status === 'Active'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-2xl hover:scale-105 hover:from-blue-700 hover:to-purple-700 active:scale-95'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          disabled={job.status !== 'Active'}
          onMouseEnter={(e) => {
            if (job.status === 'Active') {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            }
          }}
          onMouseLeave={(e) => {
            if (job.status === 'Active') {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            }
          }}
        >
          {job.status === 'Active' && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          )}
          <span className="relative z-10">
            {job.status === 'Active' ? 'Apply Now' : 'Position Closed'}
          </span>
        </button>
      </div>
    </div>
  );
};

// Mobile Filter Modal
const MobileFilterModal = ({ isOpen, onClose, filters, setFilters, uniqueLocations, uniqueJobTypes, uniqueDepartments, uniqueExperienceLevels }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Filter Jobs</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {[
              { key: 'location', label: 'Location', options: uniqueLocations },
              { key: 'jobType', label: 'Job Type', options: uniqueJobTypes },
              { key: 'department', label: 'Department', options: uniqueDepartments },
              { key: 'experienceLevel', label: 'Experience Level', options: uniqueExperienceLevels },
            ].map(({ key, label, options }) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none bg-white"
                  value={filters[key]}
                  onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
                >
                  {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const JobListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    department: '',
    experienceLevel: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const jobsPerPage = 9;

  const uniqueLocations = useMemo(() => ['All', ...new Set(allJobs.map(job => job.location))], []);
  const uniqueJobTypes = useMemo(() => ['All', ...new Set(allJobs.map(job => job.jobType))], []);
  const uniqueDepartments = useMemo(() => ['All', ...new Set(allJobs.map(job => job.department))], []);
  const uniqueExperienceLevels = useMemo(() => ['All', ...new Set(allJobs.map(job => job.experienceLevel))], []);

  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.company.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation = filters.location === 'All' || filters.location === '' || job.location === filters.location;
      const matchesJobType = filters.jobType === 'All' || filters.jobType === '' || job.jobType === filters.jobType;
      const matchesDepartment = filters.department === 'All' || filters.department === '' || job.department === filters.department;
      const matchesExperienceLevel = filters.experienceLevel === 'All' || filters.experienceLevel === '' || job.experienceLevel === filters.experienceLevel;

      return matchesSearch && matchesLocation && matchesJobType && matchesDepartment && matchesExperienceLevel;
    });
  }, [searchTerm, filters]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-700/20 animate-pulse"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 leading-tight">
              Find Your Dream Job
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto px-4">
              Discover amazing opportunities from world-class companies and take your career to the next level
            </p>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-100">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by job title, company, or keywords..."
              className="w-full pl-12 pr-4 py-4 text-base sm:text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-4 mb-6">
            {[
              { key: 'location', label: 'Location', options: uniqueLocations },
              { key: 'jobType', label: 'Job Type', options: uniqueJobTypes },
              { key: 'department', label: 'Department', options: uniqueDepartments },
              { key: 'experienceLevel', label: 'Experience Level', options: uniqueExperienceLevels },
            ].map(({ key, label, options }) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none bg-white"
                  value={filters[key]}
                  onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
                >
                  {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Filter size={18} />
              <span>Filter Jobs</span>
            </button>
          </div>

          {/* Results Count */}
          <div className="text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              Showing <span className="font-semibold text-blue-600">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'job' : 'jobs'}
            </p>
          </div>
        </div>
      </section>

      {/* Job Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 max-w-md mx-auto">
              <div className="text-4xl sm:text-6xl mb-4">🔍</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 text-sm sm:text-base">Try adjusting your search criteria or filters</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {currentJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className="flex justify-center items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 sm:p-3 rounded-xl transition-all duration-200 ${
                currentPage === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md'
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            
            {[...Array(Math.min(5, totalPages))].map((_, index) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = index + 1;
              } else if (currentPage <= 3) {
                pageNumber = index + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + index;
              } else {
                pageNumber = currentPage - 2 + index;
              }
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                    currentPage === pageNumber
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 sm:p-3 rounded-xl transition-all duration-200 ${
                currentPage === totalPages
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md'
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Filter Modal */}
      <MobileFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        setFilters={setFilters}
        uniqueLocations={uniqueLocations}
        uniqueJobTypes={uniqueJobTypes}
        uniqueDepartments={uniqueDepartments}
        uniqueExperienceLevels={uniqueExperienceLevels}
      />
    </div>
  );
};

export default JobListing;