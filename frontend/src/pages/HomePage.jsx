import React, { useState, useEffect, useRef } from 'react';

function HomePage() {
  const [searchKeywords, setSearchKeywords] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [jobCategory, setJobCategory] = useState('all');
  const [jobType, setJobType] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Refs for animations
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroStatsRef = useRef(null);
  const searchSectionRef = useRef(null);
  const jobsRef = useRef(null);
  const stepsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const ctaTitleRef = useRef(null);
  const ctaDescriptionRef = useRef(null);
  const ctaButtonsRef = useRef(null);

  // Sample job data
  const featuredJobs = [
    {
      id: 1,
      title: "Senior MERN Stack Developer",
      company: "Acme Corp",
      location: "Remote",
      type: "Full-time",
      level: "Mid-level",
      salary: "$80,000 - $120,000",
      description: "Develop and maintain robust web applications using MongoDB, Express.js, React.js, and Node.js...",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      posted: "2 days ago",
      urgent: false
    },
    {
      id: 2,
      title: "Digital Marketing Specialist",
      company: "Global Solutions",
      location: "London, UK",
      type: "Full-time",
      level: "Entry-level",
      salary: "£35,000 - £45,000",
      description: "Manage and optimize digital marketing campaigns across various channels...",
      tags: ["SEO", "Social Media", "Analytics", "Content"],
      posted: "1 day ago",
      urgent: true
    },
    {
      id: 3,
      title: "UX/UI Designer",
      company: "Creative Hub",
      location: "New York, USA",
      type: "Contract",
      level: "Mid-level",
      salary: "$60 - $80/hour",
      description: "Design intuitive and aesthetically pleasing user interfaces and experiences...",
      tags: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      posted: "3 days ago",
      urgent: false
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "Tech Innovators",
      location: "San Francisco, CA",
      type: "Full-time",
      level: "Senior-level",
      salary: "$130,000 - $180,000",
      description: "Streamline deployment processes and maintain cloud infrastructure...",
      tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      posted: "4 days ago",
      urgent: false
    },
    {
      id: 5,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "Remote",
      type: "Full-time",
      level: "Mid-level",
      salary: "$95,000 - $135,000",
      description: "Analyze complex datasets to drive business insights and machine learning models...",
      tags: ["Python", "Machine Learning", "SQL", "Statistics"],
      posted: "1 week ago",
      urgent: false
    },
    {
      id: 6,
      title: "Product Manager",
      company: "StartupXYZ",
      location: "Austin, TX",
      type: "Full-time",
      level: "Senior-level",
      salary: "$110,000 - $150,000",
      description: "Lead product strategy and roadmap for our growing SaaS platform...",
      tags: ["Strategy", "Agile", "Analytics", "Leadership"],
      posted: "5 days ago",
      urgent: true
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'design', label: 'Design' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' }
  ];

  const jobTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'internship', label: 'Internship' }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      content: "Found my dream job within 2 weeks! The platform is intuitive and the job matches were perfect.",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      company: "GrowthLab",
      content: "As a recruiter, this platform has streamlined our hiring process significantly. Highly recommended!",
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "DesignStudio",
      content: "The quality of job listings here is outstanding. Finally, a platform that understands what I'm looking for.",
      avatar: "ER"
    }
  ];

  // Enhanced animation effects
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = [
        { ref: heroTextRef, delay: 0 },
        { ref: heroStatsRef, delay: 300 },
        { ref: searchSectionRef, delay: 0 },
        { ref: jobsRef, delay: 0 },
        { ref: stepsRef, delay: 0 },
        { ref: testimonialsRef, delay: 0 },
        { ref: ctaRef, delay: 0 }
      ];

      elements.forEach(({ ref, delay }) => {
        if (ref.current) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  animateElement(entry.target);
                }, delay);
              }
            });
          }, { threshold: 0.1 });

          observer.observe(ref.current);
        }
      });
    };

    const animateElement = (element) => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    };

    // Initialize hero animations
    if (heroTextRef.current) {
      const children = heroTextRef.current.children;
      Array.from(children).forEach((child, index) => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(50px)';
        setTimeout(() => {
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
          child.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, index * 200);
      });
    }

    if (heroStatsRef.current) {
      const children = heroStatsRef.current.children;
      Array.from(children).forEach((child, index) => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(30px) scale(0.8)';
        setTimeout(() => {
          child.style.opacity = '1';
          child.style.transform = 'translateY(0) scale(1)';
          child.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }, 800 + index * 100);
      });
    }

    // Initialize CTA animations
    if (ctaTitleRef.current) {
      ctaTitleRef.current.style.opacity = '0';
      ctaTitleRef.current.style.transform = 'translateY(50px)';
    }
    if (ctaDescriptionRef.current) {
      ctaDescriptionRef.current.style.opacity = '0';
      ctaDescriptionRef.current.style.transform = 'translateY(30px)';
    }
    if (ctaButtonsRef.current) {
      ctaButtonsRef.current.style.opacity = '0';
      ctaButtonsRef.current.style.transform = 'translateY(30px)';
    }

    // CTA section animation
    if (ctaRef.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate title
            setTimeout(() => {
              if (ctaTitleRef.current) {
                ctaTitleRef.current.style.opacity = '1';
                ctaTitleRef.current.style.transform = 'translateY(0)';
                ctaTitleRef.current.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              }
            }, 100);

            // Animate description
            setTimeout(() => {
              if (ctaDescriptionRef.current) {
                ctaDescriptionRef.current.style.opacity = '1';
                ctaDescriptionRef.current.style.transform = 'translateY(0)';
                ctaDescriptionRef.current.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              }
            }, 300);

            // Animate buttons
            setTimeout(() => {
              if (ctaButtonsRef.current) {
                ctaButtonsRef.current.style.opacity = '1';
                ctaButtonsRef.current.style.transform = 'translateY(0)';
                ctaButtonsRef.current.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              }
            }, 500);
          }
        });
      }, { threshold: 0.3 });

      observer.observe(ctaRef.current);
    }

    animateOnScroll();
  }, []);

  // Auto-slide testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', { searchKeywords, searchLocation, jobCategory, jobType });
  };

  const filteredJobs = featuredJobs.filter(job => {
    const matchesKeywords = !searchKeywords || 
      job.title.toLowerCase().includes(searchKeywords.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchKeywords.toLowerCase()));
    const matchesLocation = !searchLocation || 
      job.location.toLowerCase().includes(searchLocation.toLowerCase());
    return matchesKeywords && matchesLocation;
  });

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
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')] bg-cover bg-center bg-no-repeat opacity-20"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        
        <div className="relative z-10 container mx-auto px-4 py-20 flex items-center min-h-screen">
          <div ref={heroTextRef} className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Discover Your Next 
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Dream Job</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-12 leading-relaxed max-w-2xl">
              Connect with top employers and find opportunities that match your skills and ambitions. 
              Your career journey starts here.
            </p>
            <div ref={heroStatsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">10K+</div>
                <div className="text-gray-200">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">5K+</div>
                <div className="text-gray-200">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">50K+</div>
                <div className="text-gray-200">Success Stories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* Advanced Search Section */}
        <section ref={searchSectionRef} className="py-16 bg-white relative -mt-16 z-20" style={{ opacity: 0, transform: 'translateY(50px)' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Find Your Perfect Job</h2>
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Job title, keywords, or company"
                      value={searchKeywords}
                      onChange={(e) => setSearchKeywords(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Location or 'Remote'"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <select
                      value={jobCategory}
                      onChange={(e) => setJobCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
                    >
                      {jobTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 hover:shadow-lg font-semibold"
                  >
                    Search Jobs
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section ref={jobsRef} className="py-16 bg-gray-50" style={{ opacity: 0, transform: 'translateY(50px)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Opportunities</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Handpicked jobs from top companies around the world
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredJobs.map(job => (
                <div 
                  key={job.id} 
                  className={`bg-white rounded-xl shadow-lg p-6 relative border-l-4 cursor-pointer transition-all duration-300 ${job.urgent ? 'border-red-500' : 'border-blue-500'}`}
                  onMouseEnter={(e) => handleCardHover(e, true)}
                  onMouseLeave={(e) => handleCardHover(e, false)}
                  style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                >
                  {job.urgent && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                      Urgent
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{job.title}</h3>
                    <div className="text-gray-600 mb-2">
                      <div className="font-semibold">{job.company}</div>
                      <div className="text-sm flex items-center">
                        <span className="mr-1">📍</span>
                        {job.location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4 text-sm">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{job.type}</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{job.level}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">{job.posted}</span>
                  </div>
                  
                  <div className="text-lg font-semibold text-green-600 mb-4">💰 {job.salary}</div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm hover:bg-blue-100 hover:text-blue-800 transition-colors cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Apply Now
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      💖 Save
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <button className="bg-white text-blue-600 border-2 border-blue-600 py-3 px-8 rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 hover:shadow-lg font-semibold">
                Load More Jobs
              </button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section ref={stepsRef} className="py-16 bg-white" style={{ opacity: 0, transform: 'translateY(50px)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600">Get hired in 3 simple steps</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 relative transform transition-all hover:scale-105">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Search & Discover</h3>
                <p className="text-gray-600">
                  Browse thousands of job opportunities or let our AI match you with perfect roles
                </p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 relative transform transition-all hover:scale-105">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Apply with Confidence</h3>
                <p className="text-gray-600">
                  Submit your application with our streamlined process and track your progress
                </p>
              </div>
              
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 relative transform transition-all hover:scale-105">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Get Hired</h3>
                <p className="text-gray-600">
                  Connect with employers, ace your interviews, and land your dream job
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section ref={testimonialsRef} className="py-16 bg-gray-100" style={{ opacity: 0, transform: 'translateY(50px)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
              <p className="text-xl text-gray-600">What our users say about us</p>
            </div>
            
            <div className="max-w-4xl mx-auto relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center transform transition-all hover:scale-105">
                      <p className="text-lg text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                      <div className="flex items-center justify-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                          {testimonial.avatar}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-800">{testimonial.name}</div>
                          <div className="text-gray-600 text-sm">{testimonial.role} at {testimonial.company}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

       {/* Enhanced CTA Section */}
<section
  ref={ctaRef}
  className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden"
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
      ref={ctaTitleRef}

      className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 leading-tight"
    >
      Ready to Take the{' '}
      <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
        Next Step?
      </span>
    </h2>

    {/* Description */}
    <p
      ref={ctaDescriptionRef}
      className="text-lg sm:text-xl lg:text-2xl text-gray-100 mb-8 sm:mb-10 lg:mb-12 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4"
    >
      Join thousands of professionals who have found their perfect job through our platform
    </p>

    {/* Action Buttons */}
    <div
      ref={ctaButtonsRef}
      className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-md sm:max-w-none mx-auto"
    >
      <button
        className="w-full sm:w-auto bg-white text-blue-600 py-4 px-8 lg:py-5 lg:px-10 rounded-xl sm:rounded-2xl hover:bg-gray-100 transition-all duration-300 font-semibold text-lg lg:text-xl shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
        onMouseEnter={(e) => handleButtonHover(e, true)}
        onMouseLeave={(e) => handleButtonHover(e, false)}
        style={{
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Find Jobs
        </span>
      </button>

      <button
        className="w-full sm:w-auto border-2 border-white text-white py-4 px-8 lg:py-5 lg:px-10 rounded-xl sm:rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold text-lg lg:text-xl shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
        onMouseEnter={(e) => handleButtonHover(e, true)}
        onMouseLeave={(e) => handleButtonHover(e, false)}
        style={{
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
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

{/* Footer */}
<footer className="py-8 bg-gray-800 text-gray-200 text-center">
  <div className="container mx-auto px-4">
    <p className="text-sm">&copy; {new Date().getFullYear()} JobFinder. All rights reserved.</p>
    <p className="text-xs mt-2">Made with ❤️ by YourCompany</p>
  </div>
</footer>
        {/* </section> */}
      </main>
    </div>

  );

};


  

export default HomePage;