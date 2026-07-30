import React from 'react';
import { FaHeart, FaArrowUp, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = ({ info }) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' },
    ];

    const socialLinks = [
        { name: 'GitHub', icon: <FaGithub size={20} />, url: info?.socialLinks?.github },
        { name: 'LinkedIn', icon: <FaLinkedin size={20} />, url: info?.socialLinks?.linkedin },
        { name: 'Twitter', icon: <FaTwitter size={20} />, url: info?.socialLinks?.twitter },
    ].filter(link => link.url);

    return (
        <footer className="bg-lightCard dark:bg-darkCard pt-16 pb-8 border-t border-amber-200/50 dark:border-gray-800 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
                    
                    {/* Brand & Bio */}
                    <div className="text-center md:text-left md:max-w-sm">
                        <a href="#home" className="inline-block text-3xl font-bold text-lightText dark:text-white mb-4 uppercase tracking-widest font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                            {info?.fullName || 'DEV'}<span className="text-primary">.</span>
                        </a>
                        <p className="text-lightMuted dark:text-gray-400 text-sm leading-relaxed">
                            Crafting digital experiences with modern web technologies. Feel free to explore my work and get in touch.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-lightText dark:text-white font-bold mb-4">Quick Links</h4>
                        <nav className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-x-8 md:gap-y-2">
                            {navLinks.map(link => (
                                <a 
                                    key={link.name} 
                                    href={link.href}
                                    className="text-lightMuted hover:text-primary dark:text-gray-400 dark:hover:text-primary text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Socials & Back to Top */}
                    <div className="flex flex-col items-center md:items-end">
                        <h4 className="text-lightText dark:text-white font-bold mb-4">Connect</h4>
                        <div className="flex items-center space-x-4 mb-6">
                            {socialLinks.map((link, i) => (
                                <a 
                                    key={i} 
                                    href={link.url} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    aria-label={link.name}
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-lightMuted dark:text-gray-300 hover:text-[#0c0c0c] dark:hover:text-[#0c0c0c]"
                                    style={{background:'rgba(200,168,107,0.1)', border:'1px solid rgba(200,168,107,0.25)'}}
                                    onMouseEnter={e => { e.currentTarget.style.background='#c8a86b'; e.currentTarget.style.borderColor='#c8a86b'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background='rgba(200,168,107,0.1)'; e.currentTarget.style.borderColor='rgba(200,168,107,0.25)'; }}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                        <button 
                            onClick={scrollToTop}
                            className="flex items-center space-x-2 text-sm text-lightMuted hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                            aria-label="Scroll back to top"
                        >
                            <span>Back to top</span>
                            <FaArrowUp />
                        </button>
                    </div>
                </div>

                <div className="w-full h-px mb-8 max-w-4xl mx-auto" style={{background:'linear-gradient(to right, transparent, rgba(200,168,107,0.3), transparent)'}}></div>

                <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm font-medium text-lightMuted dark:text-gray-500 max-w-4xl mx-auto">
                    <div className="mb-2 sm:mb-0">
                        &copy; {new Date().getFullYear()} {info?.fullName || 'Portfolio'}. All rights reserved.
                    </div>
                    <div className="flex items-center">
                        Built with <FaHeart className="text-primary mx-1.5" aria-label="love" /> using the MERN Stack
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
