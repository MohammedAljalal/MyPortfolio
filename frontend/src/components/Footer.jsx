import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer = ({ info }) => {
    return (
        <footer className="bg-white dark:bg-darkCard pt-16 pb-8 border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
                <a href="#" className="text-3xl font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-widest font-mono">
                    {info?.fullName || 'DEV'}<span className="text-primary">.</span>
                </a>
                <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
                    Crafting digital experiences with modern web technologies. Feel free to explore my work and get in touch.
                </p>

                <div className="w-full h-px bg-gray-200 dark:bg-gray-800 mb-8 max-w-2xl mx-auto"></div>

                <div className="text-sm font-medium text-gray-400 dark:text-gray-500 flex items-center">
                    &copy; {new Date().getFullYear()} {info?.fullName}. Made with <FaHeart className="text-red-500 mx-1.5" /> using MERN Stack
                </div>
            </div>
        </footer>
    );
};

export default Footer;
