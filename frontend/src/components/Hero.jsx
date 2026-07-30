import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import LazyImage from './shared/LazyImage';
import { BASE_URL } from '../utils/env';
import ParticlesBackground from './ParticlesBackground';

const Hero = ({ info }) => {
    if (!info) return null;

    const socialLinks = [
        { name: 'GitHub', icon: <FaGithub />, url: info.socialLinks?.github },
        { name: 'LinkedIn', icon: <FaLinkedin />, url: info.socialLinks?.linkedin },
        { name: 'Twitter', icon: <FaTwitter />, url: info.socialLinks?.twitter },
    ].filter(link => link.url);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
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
        <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-center relative overflow-hidden">
            <ParticlesBackground />
            
            {/* Gold ambient glow */}
            <div className="absolute top-32 right-10 w-80 h-80 rounded-full blur-[140px] opacity-[0.15] dark:opacity-[0.07]" style={{background:'#c8a86b'}} aria-hidden="true"></div>
            <div className="absolute bottom-20 left-0 w-64 h-64 rounded-full blur-[120px] opacity-[0.10] dark:opacity-[0.05]" style={{background:'#c8a86b'}} aria-hidden="true"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="order-2 md:order-1"
                >
                    {/* Available badge — green */}
                    {info.availableForWork && (
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border text-sm font-medium" style={{background:'rgba(74,222,128,0.08)', borderColor:'rgba(74,222,128,0.3)', color:'#22a75a'}} role="status">
                            <span className="w-2 h-2 rounded-full bg-available animate-pulse inline-block"></span>
                            Available for New Opportunities
                        </motion.div>
                    )}
                    
                    {/* Name — gold gradient */}
                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-lightText dark:text-darkText">
                        Hi, I'm <br className="hidden md:block" /> <span className="text-gradient leading-tight">{info.fullName || 'Developer'}</span>
                    </motion.h1>
                    
                    {/* Title — muted */}
                    <motion.h2 variants={itemVariants} className="text-xl md:text-2xl font-medium mb-6 font-mono tracking-tight text-lightMuted dark:text-mutedText">
                        {info.title || 'Creative Professional'}
                    </motion.h2>
                    
                    {/* Bio */}
                    <motion.p variants={itemVariants} className="text-base mb-10 max-w-lg leading-relaxed text-lightMuted dark:text-mutedText">
                        {info.bio?.substring(0, 150)}{info.bio?.length > 150 ? '...' : ''}
                        <br /> <span className="font-medium text-lightText dark:text-darkText">Let's build something amazing together.</span>
                    </motion.p>

                    {/* CTAs */}
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-10">
                        <a 
                            href="#contact" 
                            className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center transform hover:-translate-y-1 focus-visible:outline-none"
                            style={{background:'#c8a86b', color:'#0c0c0c', boxShadow:'0 4px 20px rgba(200,168,107,0.4)'}}
                            onMouseEnter={e => e.currentTarget.style.background='#dfc090'}
                            onMouseLeave={e => e.currentTarget.style.background='#c8a86b'}
                        >
                            <FaEnvelope className="mr-2.5" aria-hidden="true" /> Book a call
                        </a>
                        {info.resumeLink && (
                            <a 
                                href={`${BASE_URL}${info.resumeLink}`} 
                                target="_blank" rel="noreferrer" 
                                className="pl-6 pr-10 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 transform hover:-translate-y-1 focus-visible:outline-none relative"
                                style={{background:'transparent', color:'#c8a86b', border:'1px solid rgba(200,168,107,0.5)'}}
                                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(200,168,107,0.9)'; e.currentTarget.style.background='rgba(200,168,107,0.05)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(200,168,107,0.5)'; e.currentTarget.style.background='transparent'; }}
                                aria-label="View or Download CV"
                            >
                                <span>CV</span>
                                <span className="absolute right-3">
                                    <FaFileDownload size={14} aria-hidden="true" />
                                </span>
                            </a>
                        )}
                    </motion.div>

                    {/* Social links */}
                    <motion.div variants={itemVariants} className="flex items-center space-x-6">
                        <span className="text-xs font-semibold uppercase tracking-widest pr-6 py-1 border-r text-lightMuted dark:text-mutedText" style={{borderColor:'rgba(139,90,0,0.2)'}}>Connect</span>
                        {socialLinks.map((link, i) => (
                            <motion.a 
                                whileHover={{ scale: 1.2, color: '#c8a86b' }}
                                whileTap={{ scale: 0.9 }}
                                key={i} href={link.url} target="_blank" rel="noreferrer" 
                                className="text-2xl transition-colors rounded-sm text-lightMuted dark:text-mutedText hover:text-primary" 
                                aria-label={link.name}
                            >
                                {link.icon}
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Profile Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, type: "spring", bounce: 0.4, delay: 0.2 }}
                    className="order-1 md:order-2 flex justify-center md:justify-end"
                >
                    <motion.div 
                        animate={{ y: [-10, 10, -10] }} 
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        className="relative w-64 h-64 md:w-96 md:h-96 group"
                    >
                        {/* Gold glow behind image */}
                        <div className="absolute inset-0 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-60" style={{background:'#c8a86b', opacity: 0.18}} aria-hidden="true"></div>
                        
                        {info.profileImage ? (
                            <div className="relative z-10 w-full h-full rounded-full shadow-2xl border rotate-3 group-hover:rotate-0 transition-transform duration-500 group-hover:scale-[1.02] overflow-hidden" style={{borderColor:'rgba(200,168,107,0.35)', background:'#fffcf5'}}>
                                <LazyImage 
                                    src={info.profileImage.startsWith('http') ? info.profileImage : `${BASE_URL}${info.profileImage}`} 
                                    alt={`Profile photo of ${info.fullName}`} 
                                />
                            </div>
                        ) : (
                            <div className="relative z-10 w-full h-full rounded-full shadow-2xl border flex items-center justify-center text-9xl font-bold rotate-3 group-hover:rotate-0 transition-transform duration-500" style={{background:'#fffcf5', borderColor:'rgba(200,168,107,0.35)', color:'#c8a86b'}}>
                                {info.fullName ? info.fullName.charAt(0) : 'D'}
                            </div>
                        )}

                        {/* Floating badges removed as requested */}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
