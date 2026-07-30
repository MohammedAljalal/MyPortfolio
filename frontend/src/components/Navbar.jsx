import React, { useState, useEffect, useRef } from 'react';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollSpy from '../hooks/useScrollSpy';

const Navbar = ({ info }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const navLinks = [
        { name: 'About', href: '#about', id: 'about' },
        { name: 'Skills', href: '#skills', id: 'skills' },
        { name: 'Projects', href: '#projects', id: 'projects' },
        { name: 'Experience', href: '#experience', id: 'experience' },
        { name: 'Education', href: '#education', id: 'education' },
        { name: 'Certificates', href: '#certificates', id: 'certificates' },
        { name: 'Testimonials', href: '#testimonials', id: 'testimonials' },
        { name: 'Contact', href: '#contact', id: 'contact' },
    ];

    const activeSection = useScrollSpy(navLinks.map(link => link.id));
    const mobileMenuRef = useRef(null);

    useEffect(() => {
        const isDark = localStorage.getItem('theme') === 'dark';

        if (isDark) {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setDarkMode(false);
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [mobileMenuOpen]);

    const toggleDarkMode = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setDarkMode(!darkMode);
    };

    // Handle mobile nav click: close menu first, then scroll after animation ends
    const handleMobileNavClick = (e, sectionId) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        // Wait for the menu close animation (300ms) before scrolling
        setTimeout(() => {
            const el = document.getElementById(sectionId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 350);
    };

    return (
        <nav 
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}
            aria-label="Main Navigation"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex-shrink-0">
                        <a href="#home" className="text-2xl font-bold text-gradient tracking-tighter" aria-label="Home">
                            {info?.fullName ? info.fullName.split(' ')[0] : 'Dev'}<span className="text-lightText dark:text-white">.</span>
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {navLinks.map(link => (
                            <a 
                                key={link.name} 
                                href={link.href} 
                                className={`text-sm font-medium transition-colors relative group ${
                                    activeSection === link.id 
                                        ? 'text-primary' 
                                        : 'text-lightMuted hover:text-primary dark:text-gray-300 dark:hover:text-primary'
                                }`}
                                aria-current={activeSection === link.id ? 'page' : undefined}
                            >
                                {link.name}
                                {activeSection === link.id && (
                                    <motion.span 
                                        layoutId="activeNav"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" 
                                    />
                                )}
                            </a>
                        ))}
                        <button 
                            onClick={toggleDarkMode} 
                            className="p-2.5 rounded-full bg-amber-50 dark:bg-gray-800 text-amber-700 dark:text-gray-200 hover:bg-amber-100 dark:hover:bg-gray-700 transition-colors shadow-inner border border-amber-200/50 dark:border-transparent"
                            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {darkMode ? <FaSun /> : <FaMoon />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-3">
                        <button 
                            onClick={toggleDarkMode} 
                            className="p-2 mr-1 rounded-full text-amber-700 dark:text-gray-300 bg-amber-50 dark:bg-gray-800 border border-amber-200/50 dark:border-transparent"
                            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {darkMode ? <FaSun /> : <FaMoon />}
                        </button>
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                            className="text-lightText dark:text-gray-300 focus:outline-none p-2 bg-amber-50 dark:bg-gray-800 rounded-lg border border-amber-200/50 dark:border-transparent"
                            aria-expanded={mobileMenuOpen}
                            aria-label="Toggle navigation menu"
                        >
                            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden glass absolute top-full left-0 w-full shadow-lg border-t border-amber-200/40 dark:border-gray-800 mt-2 rounded-b-xl overflow-hidden origin-top"
                        ref={mobileMenuRef}
                    >
                        <div className="px-6 py-5 space-y-2 max-h-[70vh] overflow-y-auto">
                            {navLinks.map(link => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleMobileNavClick(e, link.id)}
                                    className={`block text-base font-medium py-3 border-b border-amber-100/60 dark:border-gray-800/50 transition-colors ${
                                        activeSection === link.id 
                                            ? 'text-primary' 
                                            : 'text-lightText dark:text-gray-200 hover:text-primary dark:hover:text-primary'
                                    }`}
                                    aria-current={activeSection === link.id ? 'page' : undefined}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
