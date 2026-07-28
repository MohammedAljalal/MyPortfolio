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
            <SectionContainer id="experience" bg="bg-gray-50 dark:bg-darkBg">
                <SectionHeader eyebrow="My Journey" title="Work Experience" />
                <div className="max-w-4xl mx-auto space-y-12">
                    <SkeletonLoader type="card" count={3} />
                </div>
            </SectionContainer>
        );
    }

    if (error) {
        return (
            <SectionContainer id="experience" bg="bg-gray-50 dark:bg-darkBg">
                <SectionHeader eyebrow="My Journey" title="Work Experience" />
                <ErrorMessage message={error} onRetry={refetch} />
            </SectionContainer>
        );
    }

    if (!experience.length) return null;

    return (
        <SectionContainer id="experience" bg="bg-gray-50 dark:bg-darkBg">
            <SectionHeader eyebrow="My Journey" title="Work Experience" />

            <div className="max-w-4xl mx-auto relative">
                {/* Timeline center line */}
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary via-secondary to-indigo-900 rounded-full opacity-20 hidden sm:block" aria-hidden="true"></div>

                <div className="space-y-12 md:space-y-20 relative z-10" role="list">
                    {experience.map((exp, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            key={exp._id}
                            className={`flex flex-col md:flex-row items-start relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            role="listitem"
                        >
                            {/* Spacer for the other side */}
                            <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? 'pl-10' : 'pr-10 text-right'}`} aria-hidden="true"></div>

                            {/* Timeline Icon */}
                            <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full overflow-hidden bg-white dark:bg-darkCard border-4 border-indigo-100 dark:border-slate-800 shadow-xl flex items-center justify-center text-primary z-20 hidden sm:flex" aria-hidden="true">
                                <FaBriefcase className="w-5 h-5 text-indigo-500" />
                            </div>

                            {/* Content Card */}
                            <div className={`w-full sm:pl-20 md:w-1/2 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                <div className={`bg-white dark:bg-darkCard p-8 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-all duration-300 relative group ${index % 2 === 0 ? 'md:rounded-tr-none' : 'md:rounded-tl-none'} focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 dark:focus-within:ring-offset-darkBg`}>
                                    <span className={`absolute top-0 w-full md:w-0 h-1 md:h-full bg-gradient-to-r md:bg-gradient-to-b from-primary to-secondary md:w-1.5 group-hover:scale-100 md:scale-y-0 transition-transform duration-500 ${index % 2 === 0 ? 'md:right-0 md:origin-top' : 'md:left-0 md:origin-top'} scale-x-0 origin-left`} aria-hidden="true"></span>

                                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{exp.role}</h4>
                                    <h5 className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-4">{exp.company}</h5>

                                    <div className={`inline-block px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/40 text-primary dark:text-indigo-300 rounded-lg text-sm font-bold mb-6 border border-indigo-100 dark:border-indigo-800/50 ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                                        {exp.duration}
                                    </div>

                                    <p className={`text-gray-600 dark:text-gray-400 text-base leading-relaxed whitespace-pre-wrap mb-4 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        {exp.description}
                                    </p>

                                    {/* Tech Stack Tags (if available, assuming we might add them later to model, handling gracefully if not) */}
                                    {exp.technologies && exp.technologies.length > 0 && (
                                        <div className={`flex flex-wrap gap-2 mt-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                                            {exp.technologies.map((tech, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-xs font-semibold">
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
