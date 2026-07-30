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
        <SectionContainer id="experience" bg="bg-lightCard dark:bg-darkBg">
            <SectionHeader eyebrow="My Journey" title="Work Experience" gradientColors="from-primary to-primary-light" />

            <div className="max-w-4xl mx-auto relative">
                {/* Timeline center line */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary via-primary-light to-primary rounded-full opacity-25 hidden sm:block" aria-hidden="true"></div>

                <div className="space-y-12 md:space-y-20 relative z-10" role="list">
                    {experience.map((exp, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, type: "spring", stiffness: 80, damping: 20 }}
                            key={exp._id}
                            className={`flex flex-col md:flex-row items-start relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            role="listitem"
                        >
                            {/* Spacer for the other side */}
                            <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? 'pl-10' : 'pr-10 text-right'}`} aria-hidden="true"></div>

                            {/* Timeline Icon */}
                            <motion.div 
                                initial={{ scale: 0, rotate: -180 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                                className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-[#0c0c0c] z-20 hidden sm:flex border-2" aria-hidden="true"
                                style={{background:'#c8a86b', borderColor:'rgba(200,168,107,0.5)'}}>
                                <FaBriefcase className="w-6 h-6" />
                            </motion.div>

                            {/* Content Card */}
                            <div className={`w-full sm:pl-20 md:w-1/2 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                <div className={`rounded-2xl p-7 hover:-translate-y-1 transition-all duration-400 relative group gold-card ${index % 2 === 0 ? 'md:rounded-tr-none' : 'md:rounded-tl-none'} focus-within:outline-none`}
                                    onMouseEnter={e => e.currentTarget.style.boxShadow='0 16px 40px rgba(200,168,107,0.15)'}
                                    onMouseLeave={e => e.currentTarget.style.boxShadow='none'}
                                >
                                    <span className={`absolute top-0 w-full md:w-0 h-1 md:h-full bg-gradient-to-r md:bg-gradient-to-b from-primary to-primary-light md:w-1.5 group-hover:scale-100 md:scale-y-0 transition-transform duration-500 ${index % 2 === 0 ? 'md:right-0 md:origin-top' : 'md:left-0 md:origin-top'} scale-x-0 origin-left`} aria-hidden="true"></span>

                                    <h4 className="text-2xl font-bold text-lightText dark:text-white mb-2 group-hover:text-primary transition-colors drop-shadow-sm">{exp.role}</h4>
                                    <h5 className="text-lg font-semibold text-lightMuted dark:text-gray-400 mb-4">{exp.company}</h5>

                                    <div className={`inline-block px-3 py-1 text-xs font-semibold mb-5 rounded ${index % 2 === 0 ? 'md:ml-auto' : ''}`} style={{background:'rgba(200,168,107,0.12)', color:'#c8a86b', border:'1px solid rgba(200,168,107,0.3)'}}>
                                        {exp.duration}
                                    </div>

                                    <p className={`text-lightMuted dark:text-gray-400 text-base leading-relaxed whitespace-pre-wrap mb-4 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        {exp.description}
                                    </p>

                                    {/* Tech Stack Tags (if available) */}
                                    {exp.technologies && exp.technologies.length > 0 && (
                                        <div className={`flex flex-wrap gap-2 mt-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                                            {exp.technologies.map((tech, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-amber-50 dark:bg-gray-800/50 border border-amber-200/60 dark:border-gray-700/50 text-lightMuted dark:text-gray-300 rounded-full text-xs font-semibold shadow-sm">
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
