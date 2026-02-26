import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaEnvelope, FaChevronDown, FaExternalLinkAlt, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import api, { getImageUrl } from '../utils/api';

const SocialIcon = ({ href, icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-darkCard text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all transform hover:-translate-y-1 shadow-sm border border-gray-200 dark:border-gray-700"
    >
        {icon}
    </a>
);

const Hero = () => {
    const [info, setInfo] = useState({});

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const res = await api.get('/personal');
                setInfo(res.data);
            } catch (err) { console.error(err); }
        };
        fetchInfo();
    }, []);

    const scrollToProjects = () => {
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 12 }
        }
    };

    return (
        <section id="home" className="min-h-screen relative flex items-center pt-20 overflow-hidden bg-white dark:bg-darkBg transition-colors duration-300">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 dark:bg-darkCard transform skew-x-12 translate-x-32 z-0 hidden lg:block transition-colors duration-300"></div>
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-[80px] opacity-20 dark:opacity-30 animate-blob"></div>
            <div className="absolute top-40 right-10 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-[80px] opacity-20 dark:opacity-30 animate-blob animation-delay-2000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
                    {/* Image Section - Shows first on mobile */}
                    <motion.div
                        className="lg:w-5/12 order-1 lg:order-2 w-full max-w-md mx-auto"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="relative aspect-square">
                            {/* Decorative background for image */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full md:rounded-3xl transform rotate-6 scale-105 opacity-20 dark:opacity-30"></div>
                            <div className="absolute inset-0 bg-white dark:bg-darkCard rounded-full md:rounded-3xl shadow-xl transform -rotate-3 transition-colors duration-300 xl:scale-105"></div>

                            {info.profileImage ? (
                                <img src={getImageUrl(info.profileImage)} alt={info.fullName} className="relative z-10 w-full h-full object-cover rounded-full md:rounded-3xl shadow-2xl border-4 border-white dark:border-darkCard rotate-3 hover:rotate-0 transition-transform duration-500 hover:scale-[1.02]" />
                            ) : (
                                <div className="relative z-10 w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full md:rounded-3xl shadow-2xl flex items-center justify-center border-4 border-white dark:border-darkCard rotate-3">
                                    <span className="text-secondary opacity-50 font-black text-9xl">{info.fullName ? info.fullName.charAt(0) : 'P'}</span>
                                </div>
                            )}

                            {/* Floating Badges */}
                            <div className="absolute -bottom-6 -left-6 z-20 glass-card px-6 py-3 rounded-2xl shadow-xl hidden md:block animate-bounce-slow">
                                <span className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    Available for work
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        className="lg:w-7/12 order-2 lg:order-1 text-center lg:text-left"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h2 variants={itemVariants} className="text-primary font-mono font-bold tracking-widest uppercase mb-4 flex items-center justify-center lg:justify-start gap-2 text-sm md:text-base">
                            <span className="w-8 h-px bg-primary hidden md:inline-block"></span>
                            Hello, World! I am
                        </motion.h2>

                        <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 leading-tight">
                            {info.fullName || 'Loading...'}
                        </motion.h1>

                        <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-900 dark:from-gray-300 dark:to-white mb-6">
                            {info.title || 'Developer'}
                        </motion.h3>

                        <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            {info.bio || 'Please update your bio in the admin panel.'}
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12">
                            <button onClick={scrollToProjects} className="px-8 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-lg hover:shadow-lg hover:shadow-gray-900/20 dark:hover:shadow-white/20 transition-all transform hover:-translate-y-1">
                                View Projects
                            </button>
                            {info.resumeLink && (
                                <a href={getImageUrl(info.resumeLink)} target="_blank" rel="noreferrer" className="px-6 py-3.5 glass-card text-gray-800 dark:text-white font-medium flex items-center gap-2 group">
                                    <FaExternalLinkAlt className="text-gray-400 group-hover:text-primary transition-colors" /> View CV
                                </a>
                            )}
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-5">
                            <span className="text-gray-400 font-medium mr-2">Connect:</span>
                            {info.socialLinks?.github && <SocialIcon href={info.socialLinks.github} icon={<FaGithub />} />}
                            {info.socialLinks?.linkedin && <SocialIcon href={info.socialLinks.linkedin} icon={<FaLinkedin />} />}
                            {info.socialLinks?.twitter && <SocialIcon href={info.socialLinks.twitter} icon={<FaTwitter />} />}
                            {info.socialLinks?.facebook && <SocialIcon href={info.socialLinks.facebook} icon={<FaFacebook />} />}

                            {info.contactInfo?.email && <SocialIcon href={`mailto:${info.contactInfo.email}`} icon={<FaEnvelope />} />}
                            {info.contactInfo?.phone && <SocialIcon href={`tel:${info.contactInfo.phone}`} icon={<FaPhoneAlt />} />}
                            {info.contactInfo?.whatsapp && <SocialIcon href={`https://wa.me/${info.contactInfo.whatsapp.replace(/[^0-9]/g, '')}`} icon={<FaWhatsapp />} />}
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block cursor-pointer"
                    onClick={scrollToProjects}
                >
                    <div className="w-10 h-16 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center p-2 mb-2">
                        <div className="w-1.5 h-4 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
