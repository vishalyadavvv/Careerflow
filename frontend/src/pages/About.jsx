import React, { useEffect, useRef } from 'react';
import {
    Target, Lightbulb, ShieldCheck, Users, Zap, Briefcase, Handshake, Eye,
    DollarSign, Search, Sparkles, UserPlus, Building2, Globe
} from 'lucide-react';

const AboutPage = () => {
    const heroRef = useRef(null);
    const missionRef = useRef(null);
    const whatWeDoRef = useRef(null); // Added ref for "What We Do" section
    const featuresRef = useRef(null);
    const valuesRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        // Dynamic script loading for GSAP and ScrollTrigger
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
            loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js", "gsap-script", resolve);
        }).then(() => {
            loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js", "scrolltrigger-script", () => {
                const { gsap, ScrollTrigger } = window; // Ensure GSAP and ScrollTrigger are available on window
                if (gsap && ScrollTrigger) {
                    gsap.registerPlugin(ScrollTrigger);

                    // Hero animations
                    gsap.timeline()
                        .from(heroRef.current?.querySelector('.hero-title'), {
                            duration: 1.2,
                            y: 100,
                            opacity: 0,
                            ease: "power3.out"
                        })
                        .from(heroRef.current?.querySelector('.hero-subtitle'), {
                            duration: 1,
                            y: 50,
                            opacity: 0,
                            ease: "power2.out"
                        }, "-=0.5")
                        .from(heroRef.current?.querySelector('.hero-bg img'), { // Target the image within hero-bg
                            duration: 2,
                            scale: 1.1,
                            ease: "power2.out"
                        }, "-=1")
                        .from(heroRef.current?.querySelector('.hero-image-overlay-text'), { // Animation for new hero image text
                            duration: 1,
                            y: 30,
                            opacity: 0,
                            ease: "power2.out"
                        }, "-=1.5"); // Start slightly before or with hero content

                    // Mission cards animation
                    gsap.fromTo(missionRef.current?.querySelectorAll('.mission-card'), {
                        y: 80,
                        opacity: 0,
                        scale: 0.9
                    }, {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: "back.out(1.7)",
                        stagger: 0.2,
                        scrollTrigger: {
                            trigger: missionRef.current,
                            start: "top 80%",
                            end: "bottom 20%",
                            toggleActions: "play none none reverse"
                        }
                    });

                    // What We Do (Value Proposition) items animation
                    gsap.fromTo(whatWeDoRef.current?.querySelectorAll('.value-prop-item'), {
                        y: 60,
                        opacity: 0,
                        rotateY: 15
                    }, {
                        y: 0,
                        opacity: 1,
                        rotateY: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        stagger: 0.15,
                        scrollTrigger: {
                            trigger: whatWeDoRef.current,
                            start: "top 80%",
                            end: "bottom 20%",
                            toggleActions: "play none none reverse"
                        }
                    });

                    // Animation for the text overlay on the "What We Do" image
                    gsap.fromTo(whatWeDoRef.current?.querySelector('.what-we-do-image-text'), {
                        y: 50,
                        opacity: 0
                    }, {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: whatWeDoRef.current?.querySelector('.what-we-do-image-wrapper'),
                            start: "top 70%", // Trigger when the image wrapper enters view
                            toggleActions: "play none none reverse"
                        }
                    });


                    // Features animation
                    gsap.fromTo(featuresRef.current?.querySelectorAll('.feature-item'), {
                        y: 50,
                        opacity: 0,
                        scale: 0.95
                    }, {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.7,
                        ease: "power2.out",
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: featuresRef.current,
                            start: "top 80%",
                            end: "bottom 20%",
                            toggleActions: "play none none reverse"
                        }
                    });

                    // Values grid animation
                    gsap.fromTo(valuesRef.current?.querySelectorAll('.value-item'), {
                        y: 60,
                        opacity: 0,
                        rotateY: 15
                    }, {
                        y: 0,
                        opacity: 1,
                        rotateY: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        stagger: 0.15,
                        scrollTrigger: {
                            trigger: valuesRef.current,
                            start: "top 80%",
                            end: "bottom 20%",
                            toggleActions: "play none none reverse"
                        }
                    });

                    // CTA animation
                    gsap.fromTo(ctaRef.current, {
                        y: 60,
                        opacity: 0
                    }, {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ctaRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    });

                    // Floating animation for icons
                    gsap.to(".floating-icon", {
                        y: -10,
                        duration: 2,
                        ease: "power2.inOut",
                        repeat: -1,
                        yoyo: true,
                        stagger: 0.2
                    });

                    // Parallax effect for hero background
                    gsap.to(".hero-bg", {
                        yPercent: -50,
                        ease: "none",
                        scrollTrigger: {
                            trigger: heroRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    });
                }
            });
        });

        // Handle image loading for feature items (kept for robustness)
        const featureImages = document.querySelectorAll('.feature-item-img');
        featureImages.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => img.classList.add('loaded'));
                img.addEventListener('error', () => {
                    img.classList.add('errored'); // Add a class for error state
                    img.src = 'https://placehold.co/600x400/cccccc/000000?text=Image+Error'; // Fallback
                });
            }
        });

        // Cleanup function for GSAP ScrollTriggers (important to prevent memory leaks)
        return () => {
            const gsapScript = document.getElementById("gsap-script");
            const scrollTriggerScript = document.getElementById("scrolltrigger-script");
            if (gsapScript) gsapScript.remove();
            if (scrollTriggerScript) scrollTriggerScript.remove();
            // Kill all ScrollTriggers created on this page
            if (window.ScrollTrigger) {
                window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
            <style>{`
                /* CSS Variables for consistent theming */
                :root {
                    /* Primary Brand Colors */
                    --primary-color: #4a90e2; /* A modern, slightly brighter blue */
                    --primary-dark: #357bd8; /* Darker for hover states */
                    --primary-light: #70b0f0; /* Lighter for accents/gradients */

                    /* Secondary / Accent Colors */
                    --secondary-color: #8a62ed; /* A vibrant, modern purple */
                    --accent-color: #ffc107; /* A bright, clear yellow/orange */
                    --success-color: #2ecc71; /* A fresh green */
                    --danger-color: #e74c3c; /* A strong red */
                    --warning-color: #f39c12; /* A clear orange-yellow */

                    /* Grayscale Palette (More nuanced) */
                    --gray-50: #fbfdff;    /* Super light base background */
                    --gray-100: #f2f5f9;   /* Light background for sections */
                    --gray-200: #e8ecf2;   /* Light borders, subtle accents */
                    --gray-300: #d0d7e0;   /* Standard borders, light text */
                    --gray-400: #aab4c2;   /* Muted text, icons */
                    --gray-500: #7b8798;   /* Standard body text */
                    --gray-600: #5e6b7b;   /* Darker body text, captions */
                    --gray-700: #424f5e;   /* Near-black for headings */
                    --gray-800: #2c3a47;   /* Deepest dark text */
                    --gray-900: #1a2228;   /* Very dark backgrounds */

                    /* Border Radii */
                    --border-radius-sm: 8px;
                    --border-radius-md: 12px;
                    --border-radius-lg: 20px;
                    --border-radius-xl: 32px; /* More pronounced curvature */
                    --border-radius-full: 9999px;

                    /* Shadows (Softer, more layered) */
                    --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
                    --shadow-sm: 0 4px 8px rgba(0, 0, 0, 0.08);
                    --shadow-md: 0 8px 20px rgba(0, 0, 0, 0.12);
                    --shadow-lg: 0 12px 30px rgba(0, 0, 0, 0.15);
                    --shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.18);

                    /* Transitions */
                    --transition-ease: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); /* Slower, springier transition */
                    --transition-fast: all 0.25s ease-out;

                    /* Section Padding */
                    --section-padding-y: 6.5rem; /* More vertical space */
                }

                /* Base Styles */
                body {
                    font-family: 'Inter', sans-serif;
                    line-height: 1.7; /* Slightly more relaxed line height */
                    color: var(--gray-700); /* Default body text color */
                    background-color: var(--gray-50);
                    margin: 0;
                    padding: 0;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }

                .about-page {
                    min-height: 100vh;
                    background-color: var(--gray-50);
                    overflow-x: hidden;
                }

                .container {
                    max-width: 1300px; /* Slightly wider max-width */
                    margin: 0 auto;
                    padding: 0 2rem; /* Increased horizontal padding */
                }

                .text-center {
                    text-align: center;
                }

                /* --- Utility Classes for Sections --- */
                .section-padding {
                    padding-top: var(--section-padding-y);
                    padding-bottom: var(--section-padding-y);
                }

                .bg-light-gray {
                    background-color: var(--gray-100);
                }

                .gradient-text {
                    background: linear-gradient(135deg, var(--accent-color) 0%, #ffd700 100%); /* Richer gold gradient */
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                /* Section Titles and Subtitles */
                .section-title {
                    font-size: 3.5rem; /* Larger, more impactful */
                    font-weight: 800;
                    color: var(--gray-800);
                    margin-bottom: 1.5rem;
                    line-height: 1.1;
                    letter-spacing: -0.04em; /* Tighter for stronger headlines */
                }

                .section-subtitle {
                    font-size: 1.35rem; /* More substantial subtitle */
                    color: var(--gray-600);
                    max-width: 750px;
                    margin: 0 auto 3.5rem; /* More bottom margin */
                    line-height: 1.6;
                }

                /* --- Hero Section --- */
                .about-hero-section {
                    position: relative;
                    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
                    padding: 160px 0 120px; /* Even more generous padding */
                    overflow: hidden;
                    color: white;
                    text-shadow: 1px 1px 4px rgba(0,0,0,0.3); /* Stronger text shadow */
                    border-bottom-left-radius: var(--border-radius-xl);
                    border-bottom-right-radius: var(--border-radius-xl);
                    isolation: isolate;
                    box-shadow: var(--shadow-lg); /* Add shadow to hero section */
                }

                .about-hero-section .hero-bg img {
                    transform: scale(1.1); /* Initial state for GSAP animation */
                }

                .about-hero-section .hero-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    /* Using a more abstract, dynamic background image placeholder */
                    background: url('https://placehold.co/1920x800/4a90e2/FFFFFF/PNG?text=Innovate+Connect+Succeed') no-repeat center center/cover;
                    filter: brightness(0.4) grayscale(0.3); /* Darker and more desaturated */
                    z-index: -1;
                    animation: panBackground 30s linear infinite alternate; /* Slow panning animation */
                }

                @keyframes panBackground {
                    0% { background-position: 0% 0%; }
                    100% { background-position: 100% 100%; }
                }

                .about-hero-section .hero-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5); /* Slightly darker overlay */
                    z-index: -1;
                }

                .about-hero-content {
                    position: relative;
                    z-index: 10;
                    max-width: 1100px; /* Wider content */
                    margin: 0 auto;
                    padding: 0 2.5rem; /* More padding */
                    text-align: center;
                }

                .hero-title {
                    font-size: 5rem; /* Even larger, more grand */
                    font-weight: 900; /* Extra bold */
                    line-height: 1;
                    margin-bottom: 2rem;
                    text-shadow: 3px 3px 6px rgba(0,0,0,0.4);
                    text-wrap: balance; /* Improve line wrapping */
                }

                .hero-subtitle {
                    font-size: 1.5rem; /* Larger, more inviting */
                    line-height: 1.7;
                    margin-bottom: 4rem;
                    max-width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                    text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
                    text-wrap: balance; /* Improve line wrapping */
                }

                .hero-image-overlay-text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    color: white;
                    z-index: 1;
                    width: 90%; /* Increased width for better text flow */
                    max-width: 900px; /* Increased max-width */
                    padding: 0 1rem; /* Added horizontal padding */
                }

                .hero-image-overlay-text h3 {
                    font-size: 3.8rem; /* Made slightly larger for impact */
                    font-weight: 900; /* Bolder */
                    margin-bottom: 1rem;
                    text-shadow: 3px 3px 6px rgba(0,0,0,0.6); /* Stronger shadow for pop */
                    line-height: 1.2;
                    text-wrap: balance; /* Improve line wrapping */
                    background: linear-gradient(135deg, #A7F3D0 0%, #34D399 100%); /* Light Green to Darker Green */
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .hero-image-overlay-text p {
                    font-size: 1.8rem; /* Made slightly larger description */
                    opacity: 0.95; /* Slightly less transparent */
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.5); /* Stronger shadow */
                    line-height: 1.6;
                    text-wrap: balance; /* Improve line wrapping */
                    color: #E0F2F7; /* Light blue-grey for contrast */
                }


                .floating-icon {
                    /* No initial opacity, let GSAP handle it */
                }

                /* --- Mission & Vision Section --- */
                .about-mission-section {
                    position: relative;
                    margin-top: -8rem; /* More overlap with hero */
                    z-index: 20;
                }

                .mission-vision-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); /* Larger min-width */
                    gap: 3rem; /* Increased gap */
                    padding: 3rem; /* More padding */
                    background: white;
                    border-radius: var(--border-radius-xl);
                    box-shadow: var(--shadow-xl); /* Very strong shadow for prominent floating effect */
                    border: 1px solid var(--gray-200);
                }

                .mission-card {
                    text-align: center;
                    padding: 2.5rem; /* More padding */
                    border-radius: var(--border-radius-lg);
                    background-color: var(--gray-100); /* Slightly more pronounced background */
                    transition: var(--transition-ease);
                    border: 1px solid var(--gray-200);
                    box-shadow: var(--shadow-sm);
                    /* No initial opacity/transform, let GSAP handle it */
                }

                .mission-card:hover {
                    transform: translateY(-12px) scale(1.02); /* More dynamic lift and slight scale */
                    box-shadow: var(--shadow-lg); /* Stronger shadow on hover */
                    background-color: white;
                    border-color: var(--primary-light);
                }

                .mission-icon {
                    color: var(--primary-color);
                    margin-bottom: 1.5rem; /* More spacing */
                    font-size: 56px; /* Larger icons */
                }

                .mission-card .card-title {
                    font-size: 2rem; /* Larger titles */
                    font-weight: 800;
                    color: var(--gray-800);
                    margin-bottom: 1.2rem;
                    line-height: 1.2;
                }

                .mission-card .card-description {
                    font-size: 1.05rem; /* Slightly larger text */
                    color: var(--gray-600);
                    line-height: 1.8; /* Better readability */
                }

                /* --- What We Do Section (Value Proposition) --- */
                .about-what-we-do {
                    padding-top: var(--section-padding-y);
                    padding-bottom: var(--section-padding-y);
                    background-color: var(--gray-100); /* Consistent background */
                }

                .what-we-do-image-wrapper {
                    margin-bottom: 3.5rem; /* Space below image */
                    border-radius: var(--border-radius-lg);
                    overflow: hidden;
                    box-shadow: var(--shadow-md);
                    position: relative;
                    padding-top: 40%; /* Aspect ratio 5:2 for a wide banner */
                }

                .what-we-do-image {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: var(--border-radius-lg);
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out;
                }

                .what-we-do-image.loaded {
                    opacity: 1;
                }
                .what-we-do-image.loading, .what-we-do-image.errored {
                    background-color: var(--gray-200);
                    animation: pulse-bg 1.5s infinite;
                }

                .what-we-do-image-text {
                    position: absolute;
                    bottom: 8%; /* Adjusted for better spacing */
                    left: 8%; /* Adjusted for better spacing */
                    right: 8%; /* Adjusted for better spacing */
                    text-align: left;
                    color: white;
                    z-index: 1;
                    /* No initial opacity/transform, let GSAP handle it */
                }

                .what-we-do-image-text h3 {
                    font-size: 2.5rem; /* Larger title */
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                }

                .what-we-do-image-text p {
                    font-size: 1.2rem; /* Larger description */
                    opacity: 0.9;
                    text-shadow: 1px 1px 3px rgba(0,0,0,0.4);
                }


                .value-proposition-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Adjusted min-width */
                    gap: 2.5rem;
                    margin-top: 3.5rem; /* More spacing */
                }

                .value-prop-item {
                    background: white;
                    padding: 2.8rem; /* More padding */
                    border-radius: var(--border-radius-lg);
                    box-shadow: var(--shadow-sm);
                    border: 1px solid var(--gray-200);
                    transition: var(--transition-ease);
                    text-align: center;
                    /* No initial opacity/transform, let GSAP handle it */
                }

                .value-prop-item:hover {
                    transform: translateY(-8px);
                    box-shadow: var(--shadow-md);
                    border-color: var(--secondary-color);
                }

                .prop-icon {
                    color: var(--secondary-color);
                    margin-bottom: 1.2rem;
                    font-size: 48px; /* Larger icons */
                }

                .prop-title {
                    font-size: 1.8rem; /* Larger titles */
                    font-weight: 700;
                    color: var(--gray-800);
                    margin-bottom: 1rem;
                }

                .prop-description {
                    font-size: 1rem;
                    color: var(--gray-600);
                    line-height: 1.7;
                }

                /* --- How We Do It (Advanced Technology Features) --- */
                .about-how-we-do-it {
                    padding-top: var(--section-padding-y);
                    padding-bottom: var(--section-padding-y);
                    background-color: var(--gray-50);
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); /* Slightly larger min-width */
                    gap: 2.8rem; /* Increased gap */
                    margin-top: 3.5rem;
                }

                .feature-item {
                    background: white;
                    padding: 2.5rem; /* More padding */
                    border-radius: var(--border-radius-lg);
                    box-shadow: var(--shadow-sm);
                    border: 1px solid var(--gray-200);
                    transition: var(--transition-ease);
                    text-align: left;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden; /* Ensure image doesn't overflow */
                    /* No initial opacity/transform, let GSAP handle it */
                }

                .feature-item:hover {
                    transform: translateY(-8px);
                    box-shadow: var(--shadow-md);
                    border-color: var(--primary-color);
                }

                .feature-item-image-wrapper {
                    width: calc(100% + 5rem); /* Extend beyond padding */
                    margin: -2.5rem -2.5rem 1.5rem -2.5rem; /* Negative margins to fill container width */
                    height: 180px; /* Fixed height for image */
                    overflow: hidden;
                    border-top-left-radius: var(--border-radius-lg);
                    border-top-right-radius: var(--border-radius-lg);
                    position: relative;
                    background-color: var(--gray-200); /* Placeholder background */
                }

                .feature-item-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    opacity: 0;
                    transition: opacity 0.5s ease-in-out;
                }

                .feature-item-img.loaded {
                    opacity: 1;
                }
                .feature-item-img.loading, .feature-item-img.errored {
                    background-color: var(--gray-200);
                    animation: pulse-bg 1.5s infinite;
                }

                @keyframes pulse-bg {
                    0% { background-color: var(--gray-200); }
                    50% { background-color: var(--gray-300); }
                    100% { background-color: var(--gray-200); }
                }

                .feature-icon {
                    color: var(--primary-color);
                    margin-bottom: 1rem;
                    font-size: 40px; /* Consistent icon size */
                }

                .feature-title {
                    font-size: 1.6rem; /* Larger titles */
                    font-weight: 700;
                    color: var(--gray-800);
                    margin-bottom: 0.8rem;
                }

                .feature-description {
                    font-size: 0.98rem; /* Slightly larger text */
                    color: var(--gray-600);
                    line-height: 1.7;
                }

                /* --- Our Values Section --- */
                .about-values-section {
                    padding-top: var(--section-padding-y);
                    padding-bottom: var(--section-padding-y);
                    background-color: var(--gray-100);
                }

                .values-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2.5rem;
                    margin-top: 3.5rem;
                }

                .value-item {
                    background: white;
                    padding: 2.8rem; /* More padding */
                    border-radius: var(--border-radius-lg);
                    box-shadow: var(--shadow-sm);
                    border: 1px solid var(--gray-200);
                    transition: var(--transition-ease);
                    /* No initial opacity/transform, let GSAP handle it */
                }

                .value-item:hover {
                    transform: translateY(-8px);
                    box-shadow: var(--shadow-md);
                    border-color: var(--accent-color);
                }

                .value-icon {
                    color: var(--accent-color);
                    margin-bottom: 1.2rem;
                    font-size: 48px; /* Larger icons */
                }

                .value-title {
                    font-size: 1.8rem; /* Larger titles */
                    font-weight: 700;
                    color: var(--gray-800);
                    margin-bottom: 1rem;
                }

                .value-description {
                    font-size: 1rem;
                    color: var(--gray-600);
                    line-height: 1.7;
                }

                /* --- Call to Action Section --- */
                .about-cta-section {
                    padding-top: var(--section-padding-y);
                    padding-bottom: var(--section-padding-y);
                    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
                    color: white;
                    text-align: center;
                    border-top-left-radius: var(--border-radius-xl);
                    border-top-right-radius: var(--border-radius-xl);
                    text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
                    box-shadow: var(--shadow-lg); /* Add shadow to CTA section */
                    /* No initial opacity/transform, let GSAP handle it */
                }

                .cta-title {
                    font-size: 3.5rem; /* Larger title */
                    font-weight: 800;
                    margin-bottom: 1.8rem;
                    line-height: 1.1;
                    letter-spacing: -0.04em;
                }

                .cta-description {
                    font-size: 1.35rem; /* Larger and more inviting */
                    margin-bottom: 3rem;
                    opacity: 0.98;
                    max-width: 750px;
                    margin-left: auto;
                    margin-right: auto;
                    line-height: 1.6;
                }

                .cta-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 1.8rem; /* Increased gap */
                    flex-wrap: wrap;
                }

                /* Buttons for CTA Section */
                .btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem 2rem; /* More generous padding */
                    border-radius: var(--border-radius-md);
                    font-weight: 600;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: var(--transition-ease);
                    border: 2px solid transparent;
                    text-decoration: none;
                    box-shadow: var(--shadow-sm);
                }

                .btn-primary {
                    background: white;
                    color: var(--primary-color);
                    border-color: white;
                    box-shadow: var(--shadow-md);
                }

                .btn-primary:hover {
                    background: var(--gray-100);
                    transform: translateY(-4px); /* More lift */
                    box-shadow: var(--shadow-lg);
                }

                .btn-outline {
                    background: transparent;
                    border-color: white;
                    color: white;
                    box-shadow: var(--shadow-md);
                }

                .btn-outline:hover {
                    background: white;
                    color: var(--primary-color);
                    transform: translateY(-4px);
                    box-shadow: var(--shadow-lg);
                }

                .large-btn {
                    padding: 1.2rem 2.8rem; /* Even larger for prominent CTA */
                    font-size: 1.15rem;
                    border-radius: var(--border-radius-lg);
                }


                /* --- Responsive Design --- */
                @media (max-width: 1200px) {
                    .container {
                        padding: 0 1.5rem;
                    }
                    .section-title {
                        font-size: 3rem;
                    }
                    .section-subtitle {
                        font-size: 1.2rem;
                    }
                    .about-hero-title {
                        font-size: 4.5rem;
                    }
                    .about-hero-subtitle {
                        font-size: 1.3rem;
                    }
                    .hero-image-overlay-text h3 {
                        font-size: 2.8rem;
                    }
                    .hero-image-overlay-text p {
                        font-size: 1.4rem;
                    }
                    .mission-vision-grid {
                        padding: 2rem;
                        gap: 2rem;
                    }
                    .mission-card .card-title {
                        font-size: 1.8rem;
                    }
                    .mission-icon {
                        font-size: 50px;
                    }
                    .prop-title, .feature-title, .value-title {
                        font-size: 1.5rem;
                    }
                    .prop-description, .feature-description, .value-description {
                        font-size: 0.95rem;
                    }
                    .cta-title {
                        font-size: 3rem;
                    }
                    .cta-description {
                        font-size: 1.2rem;
                    }
                    .what-we-do-image-wrapper {
                        padding-top: 50%; /* Adjust aspect ratio for smaller screens */
                    }
                    .what-we-do-image-text h3 {
                        font-size: 2rem;
                    }
                    .what-we-do-image-text p {
                        font-size: 1rem;
                    }
                }

                @media (max-width: 992px) {
                    .about-hero-section {
                        padding: 120px 0 90px;
                    }
                    .about-hero-title {
                        font-size: 3.5rem;
                        margin-bottom: 1.5rem;
                    }
                    .about-hero-subtitle {
                        font-size: 1.15rem;
                        margin-bottom: 3rem;
                    }
                    .hero-image-overlay-text h3 {
                        font-size: 2.2rem;
                    }
                    .hero-image-overlay-text p {
                        font-size: 1.2rem;
                    }
                    .section-title {
                        font-size: 2.5rem;
                        margin-bottom: 1rem;
                    }
                    .section-subtitle {
                        font-size: 1.05rem;
                        margin-bottom: 2.5rem;
                    }
                    .mission-vision-grid {
                        grid-template-columns: 1fr;
                        padding: 1.5rem;
                        border-radius: var(--border-radius-lg);
                        margin-top: -6rem; /* Adjust overlap for medium screens */
                    }
                    .mission-card {
                        padding: 2rem;
                    }
                    .mission-icon {
                        font-size: 48px;
                    }
                    .mission-card .card-title {
                        font-size: 1.6rem;
                    }
                    .value-proposition-grid, .features-grid, .values-grid {
                        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                        gap: 2rem;
                        margin-top: 2.5rem;
                    }
                    .value-prop-item, .feature-item, .value-item {
                        padding: 2.2rem;
                    }
                    .prop-title, .feature-title, .value-title {
                        font-size: 1.4rem;
                    }
                    .cta-title {
                        font-size: 2.5rem;
                    }
                    .cta-description {
                        font-size: 1.1rem;
                    }
                    .cta-buttons {
                        gap: 1.2rem;
                    }
                    .feature-item-image-wrapper {
                        width: calc(100% + 4.4rem); /* Adjust for new padding */
                        margin: -2.2rem -2.2rem 1.5rem -2.2rem; /* Adjust for new padding */
                    }
                }


                @media (max-width: 768px) {
                    .container {
                        padding: 0 1rem;
                    }
                    :root {
                        --section-padding-y: 4.5rem; /* Reduced padding for mobile */
                    }

                    .about-hero-section {
                        padding: 90px 0 70px;
                        border-bottom-left-radius: var(--border-radius-lg);
                        border-bottom-right-radius: var(--border-radius-lg);
                    }
                    .about-hero-title {
                        font-size: 2.8rem;
                        margin-bottom: 1rem;
                    }
                    .about-hero-subtitle {
                        font-size: 1rem;
                        margin-bottom: 2.5rem;
                    }
                    .hero-image-overlay-text h3 {
                        font-size: 1.8rem;
                    }
                    .hero-image-overlay-text p {
                        font-size: 1rem;
                    }
                    .mission-vision-grid {
                        grid-template-columns: 1fr;
                        padding: 1rem;
                        border-radius: var(--border-radius-lg);
                        margin-top: -4rem; /* Adjust overlap for mobile */
                    }
                    .mission-card {
                        padding: 1.5rem;
                    }
                    .mission-icon {
                        font-size: 40px;
                    }
                    .mission-card .card-title {
                        font-size: 1.5rem;
                    }
                    .mission-card .card-description {
                        font-size: 0.95rem;
                    }
                    .section-title {
                        font-size: 2rem;
                        margin-bottom: 0.8rem;
                    }
                    .section-subtitle {
                        font-size: 0.95rem;
                        margin-bottom: 2rem;
                    }
                    .value-proposition-grid, .features-grid, .values-grid {
                        grid-template-columns: 1fr;
                        gap: 1.5rem;
                        margin-top: 2rem;
                    }
                    .value-prop-item, .feature-item, .value-item {
                        padding: 1.8rem;
                    }
                    .prop-title, .feature-title, .value-title {
                        font-size: 1.3rem;
                    }
                    .prop-description, .feature-description, .value-description {
                        font-size: 0.9rem;
                    }
                    .cta-title {
                        font-size: 2rem;
                        margin-bottom: 1rem;
                    }
                    .cta-description {
                        font-size: 1rem;
                        margin-bottom: 2rem;
                    }
                    .cta-buttons {
                        flex-direction: column;
                        gap: 0.8rem;
                    }
                    .large-btn {
                        width: 100%;
                        max-width: 280px;
                        margin: 0 auto;
                    }
                    .what-we-do-image-wrapper {
                        padding-top: 60%; /* Adjust aspect ratio for mobile */
                    }
                    .feature-item-image-wrapper {
                        width: calc(100% + 3.6rem); /* Adjust for new padding */
                        margin: -1.8rem -1.8rem 1.5rem -1.8rem; /* Adjust for new padding */
                    }
                }
            `}</style>

            {/* Hero Section */}
            <section ref={heroRef} className="about-hero-section min-h-screen flex items-center justify-center">
                {/* Background Image and Overlay */}
                <div className="hero-bg absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
                        alt="Team collaboration"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-blue-800/80"></div>
                     {/* New text overlay for the hero image */}
                    <div className="hero-image-overlay-text">
                        <h3>Your Future Starts Here</h3>
                        <p>Discover endless possibilities and connect with your dream career.</p>
                    </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
                    <h1 className="hero-title text-6xl md:text-8xl font-black text-white mb-6">
                        About <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">CareerFlow</span>
                    </h1>
                    <p className="hero-subtitle text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                        Revolutionizing how talent finds opportunity. We're dedicated to making job search and hiring seamless, transparent, and accessible for everyone.
                    </p>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-10 floating-icon">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Sparkles className="w-8 h-8 text-yellow-400" />
                    </div>
                </div>
                <div className="absolute bottom-20 right-10 floating-icon">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Target className="w-10 h-10 text-blue-400" />
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section ref={missionRef} className="about-mission-section py-20 px-4 bg-white relative -mt-32 z-20">
                <div className="max-w-6xl mx-auto">
                    <div className="mission-vision-grid">
                        <div className="mission-card">
                            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="card-title">Our Mission</h2>
                            <p className="card-description">
                                To empower individuals worldwide by connecting them with meaningful career opportunities, and to enable companies to build diverse, high-performing teams efficiently and ethically.
                            </p>
                        </div>
                        
                        <div className="mission-card">
                            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                <Eye className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="card-title">Our Vision</h2>
                            <p className="card-description">
                                To be the world's most trusted and innovative job portal, where every job seeker finds their perfect fit, and every company discovers exceptional talent with unparalleled ease.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do */}
            <section ref={whatWeDoRef} className="about-what-we-do py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="section-title">What Sets CareerFlow Apart?</h2>
                    <p className="section-subtitle">
                        We're building a smarter, fairer, and more effective job market for the modern era.
                    </p>
                    
                    {/* Feature Image */}
                    <div className="what-we-do-image-wrapper">
                        <img 
                            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80"
                            alt="Modern workplace"
                            className="what-we-do-image"
                            onLoad={(e) => e.target.classList.add('loaded')}
                            onError={(e) => e.target.classList.add('errored')}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="what-we-do-image-text">
                            <h3>Connecting Talent with Opportunity</h3>
                            <p>Where innovation meets career success</p>
                        </div>
                    </div>

                    <div className="value-proposition-grid">
                        <div className="value-prop-item">
                            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                <Briefcase className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="prop-title">Seamless Connections</h3>
                            <p className="prop-description">
                                Our intuitive platform simplifies the entire hiring process, from posting jobs to applying, making it effortlessly smooth for both sides.
                            </p>
                        </div>
                        
                        <div className="value-prop-item">
                            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                <Handshake className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="prop-title">Transparent Processes</h3>
                            <p className="prop-description">
                                We champion clarity with detailed job descriptions, honest company insights, and fair hiring practices that foster trust.
                            </p>
                        </div>
                        
                        <div className="value-prop-item">
                            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                <Globe className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="prop-title">Universal Accessibility</h3>
                            <p className="prop-description">
                                Designed for everyone, CareerFlow ensures diverse opportunities are discoverable and available on any device, anywhere.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section ref={featuresRef} className="about-how-we-do-it py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="section-title">Powered by Advanced Technology</h2>
                        <p className="section-subtitle">
                            We leverage cutting-edge solutions to ensure you find or fill positions with unprecedented precision.
                        </p>
                    </div>
                    
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-item-image-wrapper">
                                <img 
                                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
                                    alt="AI Technology"
                                    className="feature-item-img"
                                    onLoad={(e) => e.target.classList.add('loaded')}
                                    onError={(e) => e.target.classList.add('errored')}
                                />
                            </div>
                            <Zap className="feature-icon" />
                            <h3 className="feature-title">AI-Powered Matching</h3>
                            <p className="feature-description">
                                Our intelligent algorithms analyze skills, experience, and aspirations to connect job seekers with perfect-fit opportunities.
                            </p>
                        </div>
                        
                        <div className="feature-item">
                            <div className="feature-item-image-wrapper">
                                <img 
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                                    alt="Data Analytics"
                                    className="feature-item-img"
                                    onLoad={(e) => e.target.classList.add('loaded')}
                                    onError={(e) => e.target.classList.add('errored')}
                                />
                            </div>
                            <Search className="feature-icon" />
                            <h3 className="feature-title">Smart Search & Filters</h3>
                            <p className="feature-description">
                                Pinpoint exact opportunities or talent with highly customizable search filters, saving valuable time.
                            </p>
                        </div>
                        
                        <div className="feature-item">
                            <div className="feature-item-image-wrapper">
                                <img 
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                                    alt="Dashboard"
                                    className="feature-item-img"
                                    onLoad={(e) => e.target.classList.add('loaded')}
                                    onError={(e) => e.target.classList.add('errored')}
                                />
                            </div>
                            <UserPlus className="feature-icon" />
                            <h3 className="feature-title">Personalized Dashboards</h3>
                            <p className="feature-description">
                                Manage applications, track job postings, and receive tailored recommendations through intuitive dashboards.
                            </p>
                        </div>
                        
                        <div className="feature-item">
                            <div className="feature-item-image-wrapper">
                                <img 
                                    src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80"
                                    alt="Real-time Data"
                                    className="feature-item-img"
                                    onLoad={(e) => e.target.classList.add('loaded')}
                                    onError={(e) => e.target.classList.add('errored')}
                                />
                            </div>
                            <Lightbulb className="feature-icon" />
                            <h3 className="feature-title">Real-time Insights</h3>
                            <p className="feature-description">
                                Get instant notifications, track application statuses, and gain market insights with real-time analytics.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section ref={valuesRef} className="about-values-section py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="section-title">Our Core Values</h2>
                    <p className="section-subtitle">
                        These principles guide every decision we make and every feature we build.
                    </p>
                    
                    <div className="values-grid">
                        <div className="value-item">
                            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <Lightbulb className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="value-title">Innovation</h3>
                            <p className="value-description">
                                We are relentless in our pursuit of cutting-edge solutions, continuously evolving to meet the dynamic needs of the job market.
                            </p>
                        </div>
                        
                        <div className="value-item">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <Users className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="value-title">Inclusivity</h3>
                            <p className="value-description">
                                We believe in equal opportunities for all, fostering a diverse and welcoming platform where every individual feels valued.
                            </p>
                        </div>
                        
                        <div className="value-item">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <ShieldCheck className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="value-title">Integrity</h3>
                            <p className="value-description">
                                Trust and honesty are the bedrock of our operations. We commit to transparent practices and ethical conduct in all interactions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section ref={ctaRef} className="about-cta-section py-20 px-4">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h2 className="cta-title">
                        Take Charge of Your <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Career Journey</span>
                    </h2>
                    <p className="cta-description">
                        Your professional future is in your hands. CareerFlow is here to provide the tools, connections, and support you need to succeed.
                    </p>
                    <div className="cta-buttons">
                        <button className="btn btn-primary large-btn">
                            Explore Jobs
                        </button>
                        <button className="btn btn-outline large-btn">
                            Sign Up Today
                        </button>
                    </div>
                </div>
                
                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
                    <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
