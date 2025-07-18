import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    Search, Book, Video, Link, FileText, Calendar, TrendingUp, Download, Eye,
    PlusCircle, Edit, Trash2, XCircle, CheckCircle, Upload, Sliders, Heart,
    Share2, Bookmark, Filter, Grid, List, Star, Clock, Users, Award,
    Sparkles, Zap, Target, Flame, ChevronDown, ChevronUp, Globe, Play,
    BookOpen, Headphones, ImageIcon, Code, Layers, Briefcase, Menu, X
} from 'lucide-react';

// Dummy Footer component for standalone execution in Canvas
const Footer = () => (
  <footer className="bg-gray-800 text-white p-6 text-center text-sm mt-8 shadow-inner">
    <div className="max-w-7xl mx-auto">
      <p>&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="#" className="hover:text-indigo-300 transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-indigo-300 transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-indigo-300 transition-colors">Contact Us</a>
      </div>
    </div>
  </footer>
);

// CTA Section component with its own animations (kept as a separate component for modularity)
const CTASection = ({ handleButtonHover, gsapReady }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (gsapReady && window.gsap && window.ScrollTrigger) {
      window.gsap.fromTo(sectionRef.current, 
        { opacity: 0, y: 50, scale: 0.95 }, 
        { 
          opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Animate children with stagger
      window.gsap.fromTo(sectionRef.current.querySelectorAll('h2, p, button'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, [gsapReady]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden rounded-3xl w-full max-w-6xl mx-auto opacity-0" // Initial opacity-0
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 sm:w-32 sm:h-32 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 -left-8 w-16 h-16 sm:w-20 sm:h-20 bg-white opacity-10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-8 right-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-white opacity-10 rounded-full animate-pulse delay-2000"></div>
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <h2 
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 leading-tight"
        >
          Ready to Take the{' '}
          <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
            Next Step?
          </span>
        </h2>

        {/* Description */}
        <p 
          className="text-lg sm:text-xl lg:text-2xl text-gray-100 mb-8 sm:mb-10 lg:mb-12 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4"
        >
          Join thousands of professionals who have found their perfect job through our platform
        </p>

        {/* Action Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-md sm:max-w-none mx-auto"
        >
          <button 
            className="w-full sm:w-auto bg-white text-blue-600 py-4 px-8 lg:py-5 lg:px-10 rounded-xl sm:rounded-2xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg lg:text-xl shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            style={{ 
              transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
          >
            <span className="flex items-center justify-center gap-2">
              <Search className="w-5 h-5 lg:w-6 lg:h-6" />
              Find Jobs
            </span>
          </button>

          <button 
            className="w-full sm:w-auto border-2 border-white text-white py-4 px-8 lg:py-5 lg:px-10 rounded-xl sm:rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold text-lg lg:text-xl shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
            style={{ 
              transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
          >
            <span className="flex items-center justify-center gap-2">
              <PlusCircle className="w-5 h-5 lg:w-6 lg:h-6" />
              Post a Job
            </span>
          </button>
        </div>

        {/* Stats or Additional Info */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">10K+</div>
            <div className="text-sm sm:text-base text-gray-200">Active Jobs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">5K+</div>
            <div className="text-sm sm:text-base text-gray-200">Companies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">50K+</div>
            <div className="text-sm sm:text-base text-gray-200">Success Stories</div>
          </div>
        </div>
      </div>
    </section>
  );
};


// Mock user context for demo
const useAuth = () => ({
    user: { id: '1', name: 'John Doe', role: 'admin', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }
});

// Enhanced mock data with more variety and features
let allResourcesData = [
    {
        id: '1',
        title: 'Mastering the Behavioral Interview',
        description: 'A comprehensive guide to acing your behavioral interviews with common questions and STAR method examples. Learn from industry experts and get insider tips.',
        type: 'Guide',
        tags: ['Interview Prep', 'Career Advice', 'Professional Development'],
        uploadDate: '2024-05-20',
        popularity: 1500,
        rating: 4.8,
        duration: '45 min read',
        difficulty: 'Intermediate',
        author: 'Sarah Johnson',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        likes: 234,
        bookmarks: 89,
        comments: 45,
        featured: true,
        trending: true,
        link: '#',
        thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=240&fit=crop',
        category: 'Career',
        isPremium: false,
    },
    {
        id: '2',
        title: 'Advanced React Patterns & Performance',
        description: 'Deep dive into advanced React patterns, performance optimization techniques, and modern best practices for building scalable applications.',
        type: 'Video',
        tags: ['React', 'Frontend', 'Performance', 'Advanced'],
        uploadDate: '2024-05-25',
        popularity: 2800,
        rating: 4.9,
        duration: '2.5 hours',
        difficulty: 'Advanced',
        author: 'Alex Chen',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        likes: 456,
        bookmarks: 234,
        comments: 78,
        featured: true,
        trending: true,
        link: '#',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=240&fit=crop',
        category: 'Technology',
        isPremium: true,
    },
    {
        id: '3',
        title: 'Design System Masterclass',
        description: 'Learn how to build and maintain scalable design systems that empower teams and create consistent user experiences across products.',
        type: 'Course',
        tags: ['Design', 'UI/UX', 'Design Systems', 'Figma'],
        uploadDate: '2024-05-18',
        popularity: 1900,
        rating: 4.7,
        duration: '4 hours',
        difficulty: 'Intermediate',
        author: 'Maya Patel',
        authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        likes: 312,
        bookmarks: 178,
        comments: 56,
        featured: false,
        trending: true,
        link: '#',
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop',
        category: 'Design',
        isPremium: true,
    },
    {
        id: '4',
        title: 'Startup Funding Guide 2024',
        description: 'Complete roadmap to securing funding for your startup, from seed to Series A. Includes pitch deck templates and investor insights.',
        type: 'Guide',
        tags: ['Startup', 'Funding', 'Business', 'Entrepreneurship'],
        uploadDate: '2024-06-01',
        popularity: 1200,
        rating: 4.6,
        duration: '30 min read',
        difficulty: 'Beginner',
        author: 'David Kim',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        likes: 189,
        bookmarks: 95,
        comments: 32,
        featured: false,
        trending: false,
        link: '#',
        thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=240&fit=crop',
        category: 'Business',
        isPremium: false,
    },
    {
        id: '5',
        title: 'AI & Machine Learning Fundamentals',
        description: 'Get started with AI and ML concepts, practical applications, and hands-on projects. Perfect for beginners wanting to enter the field.',
        type: 'Course',
        tags: ['AI', 'Machine Learning', 'Python', 'Data Science'],
        uploadDate: '2024-05-15',
        popularity: 3200,
        rating: 4.9,
        duration: '6 hours',
        difficulty: 'Beginner',
        author: 'Dr. Lisa Wang',
        authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
        likes: 567,
        bookmarks: 289,
        comments: 124,
        featured: true,
        trending: true,
        link: '#',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=240&fit=crop',
        category: 'Technology',
        isPremium: true,
    },
    {
        id: '6',
        title: 'Remote Work Productivity Hacks',
        description: 'Transform your home office setup and workflow with proven productivity techniques used by top remote professionals.',
        type: 'Blog',
        tags: ['Remote Work', 'Productivity', 'Lifestyle', 'Tips'],
        uploadDate: '2024-05-28',
        popularity: 890,
        rating: 4.4,
        duration: '15 min read',
        difficulty: 'Beginner',
        author: 'Emma Rodriguez',
        authorAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        likes: 156,
        bookmarks: 67,
        comments: 28,
        featured: false,
        trending: false,
        link: '#',
        thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6f44d?w=400&h=240&fit=crop',
        category: 'Lifestyle',
        isPremium: false,
    }
];

// Enhanced helper functions
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getTypeIcon = (type) => {
    const iconMap = {
        guide: <BookOpen size={20} />,
        tutorial: <Play size={20} />,
        course: <Layers size={20} />,
        document: <FileText size={20} />,
        blog: <Edit size={20} />,
        video: <Video size={20} />,
        audio: <Headphones size={20} />,
        image: <ImageIcon size={20} />,
        code: <Code size={20} />
    };
    return iconMap[type.toLowerCase()] || <Book size={20} />;
};

// Enhanced Resource Card Component
const ResourceCard = ({ resource, viewMode = 'grid', onLike, onBookmark, onShare }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleLike = (e) => {
        e.preventDefault();
        setIsLiked(!isLiked);
        onLike?.(resource.id);
    };

    const handleBookmark = (e) => {
        e.preventDefault();
        setIsBookmarked(!isBookmarked);
        onBookmark?.(resource.id);
    };

    const handleShare = (e) => {
        e.preventDefault();
        if (navigator.share) {
            navigator.share({
                title: resource.title,
                text: resource.description,
                url: window.location.href // Or resource.link if available and distinct
            }).catch((error) => console.error('Error sharing:', error));
        } else {
            // Fallback for browsers that don't support Web Share API
            document.execCommand('copy'); // Using document.execCommand for clipboard in iframe
        }
        onShare?.(resource);
    };

    if (viewMode === 'list') {
        return (
            <a href={resource.link} className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 relative group opacity-0 resource-card">
                <div className="flex-shrink-0 w-full md:w-1/4">
                    <div className="relative h-32 md:h-full overflow-hidden rounded-lg">
                        <img
                            src={resource.thumbnail}
                            alt={resource.title}
                            onLoad={() => setImageLoaded(true)}
                            className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${imageLoaded ? 'filter-none scale-100' : 'filter blur-lg scale-110'}`}
                        />
                        {!imageLoaded && (
                            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500">Loading...</div>
                        )}
                        {resource.isPremium && (
                            <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                <Star size={12} fill="currentColor" />
                                Pro
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{resource.title}</h3>
                            <p className="text-gray-600 text-sm line-clamp-2">{resource.description}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={handleLike} className={`p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors ${isLiked ? 'text-red-500' : ''}`}>
                                <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                            </button>
                            <button onClick={handleBookmark} className={`p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors ${isBookmarked ? 'text-blue-500' : ''}`}>
                                <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
                            </button>
                            <button onClick={handleShare} className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
                                <Share2 size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1 text-blue-600 font-medium">
                            {getTypeIcon(resource.type)}
                            <span>{resource.type}</span>
                        </div>
                        <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs font-medium">{resource.difficulty}</span>
                        <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{resource.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                            <Star size={14} fill="currentColor" />
                            <span>{resource.rating}</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <img src={resource.authorAvatar} alt={resource.author} className="w-8 h-8 rounded-full object-cover" />
                            <div className="flex flex-col">
                                <p className="text-sm font-medium text-gray-800">{resource.author}</p>
                                <p className="text-xs text-gray-500">{formatDate(resource.uploadDate)}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-600">
                            <span className="flex items-center gap-1 text-sm">
                                <Eye size={14} />
                                {resource.popularity}
                            </span>
                            <span className="flex items-center gap-1 text-sm">
                                <Heart size={14} />
                                {resource.likes}
                            </span>
                        </div>
                    </div>
                </div>
            </a>
        );
    }

    return (
        <a href={resource.link} className="flex flex-col bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 relative group opacity-0 resource-card">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-cover transition-all duration-500 ease-in-out ${imageLoaded ? 'filter-none scale-100' : 'filter blur-lg scale-110'}`}
                />
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500">Loading...</div>
                )}

                <div className="absolute top-3 left-3 flex gap-2 z-10">
                    {resource.featured && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 bg-yellow-100 text-yellow-800 shadow-sm">
                            <Award size={12} />
                            Featured
                        </span>
                    )}
                    {resource.trending && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 bg-green-100 text-green-800 shadow-sm">
                            <TrendingUp size={12} />
                            Trending
                        </span>
                    )}
                </div>

                {resource.isPremium && (
                    <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-10">
                        <Star size={12} fill="currentColor" />
                        Premium
                    </div>
                )}

                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-3">
                        <button onClick={handleLike} className={`bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/40 transition-colors ${isLiked ? 'text-red-500' : ''}`}>
                            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                        </button>
                        <button onClick={handleBookmark} className={`bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/40 transition-colors ${isBookmarked ? 'text-blue-500' : ''}`}>
                            <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
                        </button>
                        <button onClick={handleShare} className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/40 transition-colors">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-3 text-sm">
                    <div className="flex items-center gap-1 text-blue-600 font-medium">
                        {getTypeIcon(resource.type)}
                        <span>{resource.type}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                        <Star size={16} fill="currentColor" />
                        <span>{resource.rating}</span>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{resource.title}</h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resource.description}</p>

                <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full">{resource.difficulty}</span>
                    <span className="font-bold">•</span>
                    <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {resource.duration}
                    </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-medium hover:bg-blue-100 hover:text-blue-800 transition-colors cursor-pointer">
                            {tag}
                        </span>
                    ))}
                    {resource.tags.length > 3 && (
                        <span className="bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-full text-xs font-medium">+{resource.tags.length - 3}</span>
                    )}
                </div>

                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <img src={resource.authorAvatar} alt={resource.author} className="w-8 h-8 rounded-full object-cover" />
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-gray-800">{resource.author}</p>
                            <p className="text-xs text-gray-500">{formatDate(resource.uploadDate)}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                        <span className="flex items-center gap-1 text-sm">
                            <Eye size={14} />
                            {resource.popularity}
                        </span>
                        <span className="flex items-center gap-1 text-sm">
                            <Heart size={14} />
                            {resource.likes}
                        </span>
                    </div>
                </div>
            </div>
        </a>
    );
};

// Enhanced Filter Panel
const FilterPanel = ({
    isOpen,
    onClose,
    filters,
    onFiltersChange,
    resources,
    onClearFilters
}) => {
    const categories = ['All', ...new Set(resources.map(r => r.category))];
    const types = ['All', ...new Set(resources.map(r => r.type))];
    const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

    // Prevent scrolling on body when filter panel is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);


    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className={`bg-white w-full max-w-sm h-full shadow-2xl flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Filter size={24} />
                        Advanced Filters
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                        <XCircle size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    <div className="space-y-3">
                        <label className="block text-lg font-semibold text-gray-700 mb-2">Category</label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => onFiltersChange({ ...filters, category })}
                                    className={`px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400 transition-colors flex items-center gap-1 ${filters.category === category ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' : ''}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-lg font-semibold text-gray-700 mb-2">Content Type</label>
                        <div className="flex flex-wrap gap-2">
                            {types.map(type => (
                                <button
                                    key={type}
                                    onClick={() => onFiltersChange({ ...filters, type })}
                                    className={`px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400 transition-colors flex items-center gap-1 ${filters.type === type ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' : ''}`}
                                >
                                    {type !== 'All' && getTypeIcon(type)}
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-lg font-semibold text-gray-700 mb-2">Difficulty Level</label>
                        <div className="flex flex-wrap gap-2">
                            {difficulties.map(difficulty => (
                                <button
                                    key={difficulty}
                                    onClick={() => onFiltersChange({ ...filters, difficulty })}
                                    className={`px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400 transition-colors flex items-center gap-1 ${filters.difficulty === difficulty ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' : ''}`}
                                >
                                    {difficulty}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-lg font-semibold text-gray-700 mb-2">Access Level</label>
                        <div className="flex flex-wrap gap-2">
                            <button onClick={() => onFiltersChange({ ...filters, isPremium: null })} className={`px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400 transition-colors ${filters.isPremium === null ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' : ''}`}>
                                All Content
                            </button>
                            <button onClick={() => onFiltersChange({ ...filters, isPremium: false })} className={`px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400 transition-colors ${filters.isPremium === false ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' : ''}`}>
                                Free Only
                            </button>
                            <button onClick={() => onFiltersChange({ ...filters, isPremium: true })} className={`px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400 transition-colors ${filters.isPremium === true ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' : ''}`}>
                                Premium Only
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
                    <button onClick={onClearFilters} className="bg-gray-200 text-gray-800 py-2 px-5 rounded-lg hover:bg-gray-300 transition-colors">Clear All</button>
                    <button onClick={onClose} className="bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors">Apply Filters</button>
                </div>
            </div>
        </div>
    );
};

// Main Component
const HomePage = () => { // Renamed from ResourcesPage to HomePage as per user's original context
    const { user } = useAuth();
    const isAdmin = user && user.role === 'admin';

    const [resources, setResources] = useState(allResourcesData);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: 'All',
        type: 'All',
        difficulty: 'All',
        isPremium: null,
        rating: 0,
        featured: false,
        trending: false
    });
    const [sortBy, setSortBy] = useState('latest');
    const [viewMode, setViewMode] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [showStats, setShowStats] = useState(true);
    const resourcesPerPage = viewMode === 'grid' ? 6 : 8;
    const [gsapReady, setGsapReady] = useState(false); // State to track if GSAP is ready

    // Filter and sort resources
    const filteredAndSortedResources = useMemo(() => {
        let filtered = resources.filter(resource => {
            const matchesSearch =
                resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesCategory = filters.category === 'All' || resource.category === filters.category;
            const matchesType = filters.type === 'All' || resource.type === filters.type;
            const matchesDifficulty = filters.difficulty === 'All' || resource.difficulty === filters.difficulty;
            const matchesPremium = filters.isPremium === null || resource.isPremium === filters.isPremium;
            const matchesRating = resource.rating >= filters.rating;
            const matchesFeatured = !filters.featured || resource.featured;
            const matchesTrending = !filters.trending || resource.trending;

            return matchesSearch && matchesCategory && matchesType && matchesDifficulty &&
                matchesPremium && matchesRating && matchesFeatured && matchesTrending;
        });

        // Sort
        switch (sortBy) {
            case 'latest':
                filtered.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
                break;
            case 'popularity':
                filtered.sort((a, b) => b.popularity - a.popularity);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'title':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }

        return filtered;
    }, [searchTerm, filters, sortBy, resources]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedResources.length / resourcesPerPage);
    const currentResources = filteredAndSortedResources.slice(
        (currentPage - 1) * resourcesPerPage,
        currentPage * resourcesPerPage
    );

    // Stats
    const stats = useMemo(() => {
        return {
            total: resources.length,
            featured: resources.filter(r => r.featured).length,
            trending: resources.filter(r => r.trending).length,
            premium: resources.filter(r => r.isPremium).length,
            avgRating: (resources.reduce((sum, r) => sum + r.rating, 0) / resources.length).toFixed(1),
            totalViews: resources.reduce((sum, r) => sum + r.popularity, 0),
            categories: new Set(resources.map(r => r.category)).size
        };
    }, [resources]);

    // Event handlers
    const handleLike = (resourceId) => {
        setResources(prev => prev.map(r =>
            r.id === resourceId ? { ...r, likes: r.likes + (r.isLiked ? -1 : 1), isLiked: !r.isLiked } : r
        ));
    };

    const handleBookmark = (resourceId) => {
        setResources(prev => prev.map(r =>
            r.id === resourceId ? { ...r, bookmarks: r.bookmarks + (r.isBookmarked ? -1 : 1), isBookmarked: !r.isBookmarked } : r
        ));
    };

    const handleShare = (resource) => {
        if (navigator.share) {
            navigator.share({
                title: resource.title,
                text: resource.description,
                url: window.location.href // Or resource.link if available and distinct
            });
        } else {
            document.execCommand('copy');
        }
    };

    const clearFilters = () => {
        setFilters({
            category: 'All',
            type: 'All',
            difficulty: 'All',
            isPremium: null,
            rating: 0,
            featured: false,
            trending: false
        });
        setSearchTerm('');
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filters, sortBy]);

    // Dynamic script loading for GSAP and ScrollTrigger
    useEffect(() => {
        const loadScript = (src, id, callback) => {
            if (document.getElementById(id)) {
                if (callback) callback();
                return;
            }
            const script = document.createElement('script');
            script.src = src;
            script.id = id;
            script.onload = () => {
                if (callback) callback();
            };
            script.onerror = () => console.error(`Failed to load script: ${src}`);
            document.head.appendChild(script);
        };

        // Load GSAP first, then ScrollTrigger. Use a promise-like chain for sequential loading.
        new Promise(resolve => {
            loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js", "gsap-script", resolve);
        }).then(() => {
            loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollTrigger.min.js", "scrolltrigger-script", () => {
                setGsapReady(true); // Mark GSAP as ready after both scripts are loaded
            });
        });

        // Cleanup function to remove scripts if component unmounts
        return () => {
            const gsapScript = document.getElementById("gsap-script");
            const scrollTriggerScript = document.getElementById("scrolltrigger-script");
            if (gsapScript) gsapScript.remove();
            if (scrollTriggerScript) scrollTriggerScript.remove();
        };
    }, []); // Empty dependency array means this runs once on mount


    // GSAP Animations - triggered when gsapReady becomes true
    useEffect(() => {
        if (gsapReady && window.gsap && window.ScrollTrigger) {
            // Register ScrollTrigger plugin
            window.gsap.registerPlugin(window.ScrollTrigger);

            // Hero Section Animations
            window.gsap.fromTo(".hero-title", 
                { opacity: 0, y: 50 }, 
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
            );
            window.gsap.fromTo(".hero-subtitle", 
                { opacity: 0, y: 50 }, 
                { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
            );
            window.gsap.fromTo(".hero-stats-grid", 
                { opacity: 0, scale: 0.8 }, 
                { opacity: 1, scale: 1, duration: 0.8, delay: 0.6, stagger: 0.2, ease: "back.out(1.7)" }
            );
            window.gsap.fromTo(".admin-actions button", 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 0.6, delay: 1, stagger: 0.1, ease: "power2.out" }
            );

            // Search and Controls Section Animations
            window.gsap.fromTo(".search-controls-container", 
                { opacity: 0, y: 50, scale: 0.95 }, 
                { 
                    opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".search-controls-container",
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // Resource Cards Animations
            window.gsap.fromTo(".resource-card", 
                { opacity: 0, y: 50, scale: 0.9 }, 
                { 
                    opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out", stagger: 0.15,
                    scrollTrigger: {
                        trigger: ".resource-list-grid", // Use a class for the grid container
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                }
            );

            // Pagination Controls Animations
            window.gsap.fromTo(".pagination-controls", 
                { opacity: 0, y: 20 }, 
                { 
                    opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
                    scrollTrigger: {
                        trigger: ".pagination-controls",
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                }
            );
        }
    }, [gsapReady]); // Depend on gsapReady to re-run when scripts are loaded

    // Hover effects for cards and buttons (still using direct style for simplicity, can be GSAP too)
    const handleCardHover = (e, isEntering) => {
        const card = e.currentTarget;
        if (isEntering) {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
        }
        card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    };

    const handleButtonHover = (e, isHovering) => {
        const button = e.currentTarget;
        if (isHovering) {
            button.style.transform = 'translateY(-3px) scale(1.05)';
            button.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        } else {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        }
        button.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    };

    return (
        <div className="min-h-screen bg-gray-50 font-inter overflow-hidden">
            {/* Removed Header component */}
            {/* Hero Section */}
            <section className="relative min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden py-20"> {/* Removed pt-20, using py-20 */}
                {/* Background Image */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')] bg-cover bg-center bg-no-repeat opacity-20"></div>
                <div className="absolute inset-0 bg-black/40"></div>
                
                {/* Animated Shapes */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl opacity-70 animate-blob top-1/4 left-1/4"></div>
                    <div className="absolute w-80 h-80 bg-yellow-300/10 rounded-full mix-blend-overlay filter blur-3xl opacity-70 animate-blob animation-delay-2000 bottom-1/3 right-1/4"></div>
                    <div className="absolute w-72 h-72 bg-purple-300/10 rounded-full mix-blend-overlay filter blur-3xl opacity-70 animate-blob animation-delay-4000 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <div className="relative z-10 container mx-auto px-4 py-20 flex items-center min-h-screen">
                    <div className="max-w-4xl text-center md:text-left">
                        <h1 className="hero-title text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg opacity-0">
                            Discover
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Amazing Resources</span>
                        </h1>
                        <p className="hero-subtitle text-xl md:text-2xl text-gray-100 mb-12 leading-relaxed max-w-2xl mx-auto md:mx-0 opacity-0">
                            Unlock your potential with our curated collection of guides, tutorials, and expert insights.
                            Your journey to success starts here.
                        </p>

                        {showStats && (
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 hero-stats-grid opacity-0">
                                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm shadow-lg text-center">
                                    <div className="text-4xl font-bold text-white mb-1">{stats.total}</div>
                                    <div className="text-gray-200">Total Resources</div>
                                </div>
                                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm shadow-lg text-center">
                                    <div className="text-4xl font-bold text-white mb-1">{stats.categories}</div>
                                    <div className="text-gray-200">Categories</div>
                                </div>
                                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm shadow-lg text-center">
                                    <div className="text-4xl font-bold text-white mb-1">{stats.avgRating}</div>
                                    <div className="text-gray-200">Avg Rating</div>
                                </div>
                                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm shadow-lg text-center">
                                    <div className="text-4xl font-bold text-white mb-1">{(stats.totalViews / 1000).toFixed(1)}K</div>
                                    <div className="text-gray-200">Total Views</div>
                                </div>
                            </div>
                        )}

                        {isAdmin && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start admin-actions">
                                <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold flex items-center justify-center gap-2 shadow-lg opacity-0">
                                    <PlusCircle size={20} />
                                    Add Resource
                                </button>
                                <button className="border-2 border-white text-white py-3 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 font-semibold flex items-center justify-center gap-2 shadow-lg opacity-0">
                                    <Sliders size={20} />
                                    Manage All
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 py-16">
                {/* Search and Controls */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 opacity-0 search-controls-container">
                    <div className="flex-1 flex items-center bg-gray-100 rounded-full px-5 py-3 shadow-inner w-full">
                        <Search size={24} className="text-gray-500 mr-3" />
                        <input
                            type="text"
                            placeholder="Search resources, authors, tags..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-lg"
                        />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm('')} className="text-gray-500 hover:text-gray-700 transition-colors ml-3">
                                <XCircle size={20} />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex rounded-full bg-gray-100 p-1 shadow-inner">
                            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-full text-gray-600 hover:bg-white hover:shadow-md transition-all ${viewMode === 'grid' ? 'bg-blue-500 text-white shadow-md' : ''}`}>
                                <Grid size={20} />
                            </button>
                            <button onClick={() => setViewMode('list')} className={`p-2 rounded-full text-gray-600 hover:bg-white hover:shadow-md transition-all ${viewMode === 'list' ? 'bg-blue-500 text-white shadow-md' : ''}`}>
                                <List size={20} />
                            </button>
                        </div>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                            <option value="latest">Latest First</option>
                            <option value="popularity">Most Popular</option>
                            <option value="rating">Highest Rated</option>
                            <option value="title">Alphabetical</option>
                        </select>

                        <button onClick={() => setShowFilters(true)} className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors shadow-md">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                {/* Resource List/Grid */}
                <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'flex flex-col'} gap-8 mb-12 resource-list-grid`}>
                    {currentResources.map(resource => (
                        <ResourceCard
                            key={resource.id}
                            resource={resource}
                            viewMode={viewMode}
                            onLike={handleLike}
                            onBookmark={handleBookmark}
                            onShare={handleShare}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-4 mt-8 pagination-controls opacity-0">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <span className="font-medium text-gray-800">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </main>

            {/* Filter Panel */}
            <FilterPanel
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
                filters={filters}
                onFiltersChange={setFilters}
                resources={allResourcesData} // Pass all resources for filter options
                onClearFilters={clearFilters}
            />
            
            <CTASection handleButtonHover={handleButtonHover} gsapReady={gsapReady} /> {/* Integrated CTA Section */}
            <Footer />

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

                @keyframes pulse {
                  0%, 100% {
                    opacity: 1;
                  }
                  50% {
                    opacity: 0.5;
                  }
                }

                .animate-blob {
                  animation: blob 7s infinite cubic-bezier(0.6, 0.01, 0.3, 0.9);
                }
                .animation-delay-1000 {
                  animation-delay: 1s;
                }
                .animation-delay-2000 {
                  animation-delay: 2s;
                }
                `}
            </style>
        </div>
    );
};

export default HomePage;
