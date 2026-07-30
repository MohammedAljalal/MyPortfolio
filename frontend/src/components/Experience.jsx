import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';
import SectionHeader from './shared/SectionHeader';
import SectionContainer from './shared/SectionContainer';
import SkeletonLoader from './shared/SkeletonLoader';
import ErrorMessage from './shared/ErrorMessage';
import useFetchData from '../hooks/useFetchData';

const Experience = () => {
    const { data: experience, loading, error, refetch } = useFetchData('/experience', []);

    if (loading && !experience.length) {
        return (
            <SectionContainer id="experience" bg="bg-lightCard dark:bg-darkBg">
                <SectionHeader eyebrow="My Journey" title="Work Experience" gradientColors="from-primary to-primary-light" />
                <div className="max-w-4xl mx-auto space-y-12">
                    <SkeletonLoader type="card" count={3} />
                </div>
            </SectionContainer>
        );
    }

    if (error) {
        return (
            <SectionContainer id="experience" bg="bg-lightCard dark:bg-darkBg">
                <SectionHeader eyebrow="My Journey" title="Work Experience" gradientColors="from-primary to-primary-light" />
                <ErrorMessage message={error} onRetry={refetch} />
            </SectionContainer>
        );
    }

    if (!experience.length) return null;

    return (
        <SectionContainer id="experience" bg="bg-lightCard dark:bg-darkBg relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-primary rounded-full mix-blend-multiply filter blur-[150px] opacity-10 dark:opacity-20 animate-pulse-slow pointer-events-none" aria-hidden="true"></div>
            <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] bg-primary rounded-full mix-blend-multiply filter blur-[150px] opacity-10 dark:opacity-10 pointer-events-none" aria-hidden="true"></div>

            <SectionHeader eyebrow="My Journey" title="Work Experience" gradientColors="from-primary to-primary-light" />

            <div className="max-w-4xl mx-auto relative mt-10">
                {/* Connecting Line (Left aligned now) */}
                <div className="absolute left-6 md:left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary-light to-transparent rounded-full opacity-30 hidden md:block shadow-[0_0_15px_rgba(200,168,107,0.5)]" aria-hidden="true"></div>

                <div className="space-y-12 relative z-10" role="list">
                    {experience.map((exp, index) => (
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
                            key={exp._id}
                            className="flex flex-col md:flex-row items-start relative group"
                            role="listitem"
                        >
                            {/* Timeline Icon (Left Aligned) */}
                            <div className="hidden md:flex absolute left-12 transform -translate-x-1/2 top-8 w-14 h-14 rounded-full items-center justify-center text-[#0c0c0c] z-20 border-[3px] shadow-[0_0_20px_rgba(200,168,107,0.4)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" aria-hidden="true"
                                style={{background:'linear-gradient(135deg, #dfc090, #c8a86b)', borderColor:'#fffcf5'}}>
                                <FaBriefcase className="w-6 h-6" />
                            </div>

                            {/* Content Card */}
                            <div className="w-full md:pl-28">
                                <div className="rounded-3xl p-8 md:p-10 transition-all duration-500 relative overflow-hidden"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(200, 168, 107, 0.15)',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = '0 25px 50px rgba(200,168,107,0.12)';
                                        e.currentTarget.style.border = '1px solid rgba(200, 168, 107, 0.4)';
                                        e.currentTarget.style.background = 'rgba(200, 168, 107, 0.05)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'none';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.border = '1px solid rgba(200, 168, 107, 0.15)';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                                    }}
                                >
                                    {/* Hover Glow Effect inside card */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 relative z-10 gap-4">
                                        <div>
                                            <h4 className="text-2xl md:text-3xl font-extrabold text-lightText dark:text-white mb-2 group-hover:text-primary transition-colors tracking-tight">{exp.role}</h4>
                                            <h5 className="text-lg md:text-xl font-semibold text-lightMuted dark:text-[#a0a0a0] flex items-center gap-2">
                                                <span className="w-6 h-[1px] bg-primary/50 hidden md:block"></span>
                                                {exp.company}
                                            </h5>
                                        </div>
                                        
                                        {/* Duration Badge */}
                                        <div className="inline-flex self-start items-center px-4 py-2 text-sm font-bold rounded-xl tracking-wide" style={{background:'linear-gradient(to right, rgba(200,168,107,0.15), rgba(200,168,107,0.05))', color:'#c8a86b', border:'1px solid rgba(200,168,107,0.2)'}}>
                                            <span className="w-2.5 h-2.5 rounded-full bg-primary mr-2 animate-pulse shadow-[0_0_8px_#c8a86b]"></span>
                                            {exp.duration}
                                        </div>
                                    </div>

                                    <p className="text-lightMuted dark:text-gray-400 text-[15px] md:text-base leading-relaxed whitespace-pre-wrap mb-8 relative z-10">
                                        {exp.description}
                                    </p>

                                    {/* Tech Stack Tags */}
                                    {exp.technologies && exp.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-2.5 relative z-10">
                                            {exp.technologies.map((tech, idx) => (
                                                <span key={idx} className="px-4 py-1.5 bg-[#fbf8f1] dark:bg-[#1a1a1a] border border-[#eaddc4] dark:border-[#333] text-lightMuted dark:text-gray-300 rounded-lg text-sm font-semibold shadow-sm transition-transform hover:-translate-y-1 cursor-default hover:text-primary dark:hover:text-primary hover:border-primary/50">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
};

export default Experience;
