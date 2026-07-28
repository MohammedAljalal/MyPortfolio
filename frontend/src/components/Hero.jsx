import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import LazyImage from './shared/LazyImage';
import { BASE_URL } from '../utils/env';

const Hero = ({ info }) => {
    if (!info) return null; // Or render a fallback if we want. But since App.jsx has Suspense, we can just return null or a skeleton if needed. Let's provide fallback data.

    const socialLinks = [
        { name: 'GitHub', icon: <FaGithub />, url: info.socialLinks?.github },
        { name: 'LinkedIn', icon: <FaLinkedin />, url: info.socialLinks?.linkedin },
        { name: 'Twitter', icon: <FaTwitter />, url: info.socialLinks?.twitter },
    ].filter(link => link.url);

    return (
        <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-center relative overflow-hidden">

            {/* Decorative background elements */}
            <div className="absolute top-20 right-0 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" aria-hidden="true"></div>
            <div className="absolute top-40 right-20 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" aria-hidden="true"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="order-2 md:order-1"
                >
                    {info.availableForWork && (
                        <div className="inline-block px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/40 text-primary dark:text-indigo-300 font-medium text-sm mb-6 border border-indigo-100 dark:border-indigo-800/80 shadow-sm" role="status">
                            <span className="mr-2" aria-hidden="true">🚀</span> Available for New Opportunities
                        </div>
                    )}
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
                        Hi, I'm <br className="hidden md:block" /> <span className="text-gradient leading-tight">{info.fullName || 'Developer'}</span>
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-500 dark:text-gray-400 mb-6 font-mono tracking-tight">
                        {info.title || 'Creative Professional'}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-lg leading-relaxed">
                        {info.bio?.substring(0, 150)}{info.bio?.length > 150 ? '...' : ''}
                        <br /> <span className="font-medium text-gray-800 dark:text-gray-300">Let's build something amazing together.</span>
                    </p>

                    <div className="flex flex-wrap gap-4 mb-10">
                        <a href="#contact" className="px-8 py-3.5 bg-primary hover:bg-indigo-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 flex items-center transform hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-300 dark:hover:shadow-indigo-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-darkBg">
                            <FaEnvelope className="mr-2.5" aria-hidden="true" /> Book a call
                        </a>
                        {info.resumeLink && (
                            <a href={`${BASE_URL}${info.resumeLink}`} target="_blank" rel="noreferrer" className="px-8 py-3.5 bg-white dark:bg-darkCard text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary rounded-xl font-medium transition-all shadow-sm flex items-center transform hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-darkBg" aria-label="Download Resume">
                                <FaFileDownload className="mr-2.5" aria-hidden="true" /> Resume
                            </a>
                        )}
                    </div>

                    <div className="flex items-center space-x-6">
                        <span className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-r border-gray-300 dark:border-gray-700 pr-6 py-1">Connect</span>
                        {socialLinks.map((link, i) => (
                            <a key={i} href={link.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary dark:text-gray-500 dark:hover:text-white text-2xl transition-colors transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm" aria-label={link.name}>
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="order-1 md:order-2 flex justify-center md:justify-end"
                >
                    <div className="relative w-64 h-64 md:w-96 md:h-96 group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full blur-2xl opacity-20 dark:opacity-40 animate-pulse transition-opacity group-hover:opacity-30 dark:group-hover:opacity-50" aria-hidden="true"></div>
                        {info.profileImage ? (
                            <div className="relative z-10 w-full h-full rounded-full md:rounded-3xl shadow-2xl border-4 border-white dark:border-darkCard rotate-3 group-hover:rotate-0 transition-transform duration-500 group-hover:scale-[1.02] overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <LazyImage 
                                    src={`${BASE_URL}${info.profileImage}`} 
                                    alt={`Profile photo of ${info.fullName}`} 
                                />
                            </div>
                        ) : (
                            <div className="relative z-10 w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full md:rounded-3xl shadow-2xl border-4 border-white dark:border-darkCard flex items-center justify-center text-white text-9xl font-bold rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                {info.fullName ? info.fullName.charAt(0) : 'D'}
                            </div>
                        )}

                        {/* Floating badges */}
                        <motion.div animate={{ y: [-15, 15, -15] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute -bottom-6 -left-6 glass p-4 rounded-xl flex items-center z-20 hidden md:flex" aria-hidden="true">
                            <span className="text-3xl mr-3">💡</span>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase">MERN Stack</p>
                                <p className="font-bold text-gray-800 dark:text-white">Expertise</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
