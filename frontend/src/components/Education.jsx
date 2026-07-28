import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import SectionHeader from './shared/SectionHeader';
import SectionContainer from './shared/SectionContainer';
import SkeletonLoader from './shared/SkeletonLoader';
import ErrorMessage from './shared/ErrorMessage';
import useFetchData from '../hooks/useFetchData';

const Education = () => {
    const { data: education, loading, error, refetch } = useFetchData('/education', []);

    if (loading && !education.length) {
        return (
            <SectionContainer id="education" bg="bg-white dark:bg-darkCard">
                <SectionHeader eyebrow="Academic Background" title="Education" gradientColors="from-indigo-500 to-purple-500" />
                <div className="max-w-4xl mx-auto space-y-8">
                    <SkeletonLoader type="card" count={2} />
                </div>
            </SectionContainer>
        );
    }

    if (error) {
        return (
            <SectionContainer id="education" bg="bg-white dark:bg-darkCard">
                <SectionHeader eyebrow="Academic Background" title="Education" gradientColors="from-indigo-500 to-purple-500" />
                <ErrorMessage message={error} onRetry={refetch} />
            </SectionContainer>
        );
    }

    if (!education.length) return null;

    return (
        <SectionContainer id="education" bg="bg-white dark:bg-darkCard">
            <SectionHeader eyebrow="Academic Background" title="Education" gradientColors="from-indigo-500 to-purple-500" />

            <div className="max-w-4xl mx-auto">
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-indigo-200 dark:before:via-indigo-900 before:to-transparent" role="list">
                    {education.map((edu, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            key={edu._id}
                            className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}
                            role="listitem"
                        >
                            {/* Icon */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-darkCard bg-indigo-100 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" aria-hidden="true">
                                <FaGraduationCap size={16} />
                            </div>

                            {/* Content */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 dark:bg-slate-800 p-6 md:p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-darkCard">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                                    <h4 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-indigo-500 transition-colors tracking-tight">
                                        {edu.degree}
                                    </h4>
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold whitespace-nowrap">
                                        <FaCalendarAlt className="mr-1.5" aria-hidden="true" />
                                        {edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : edu.year}
                                    </div>
                                </div>
                                
                                <h5 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-2">
                                    {edu.institution}
                                </h5>

                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
                                    <FaMapMarkerAlt className="mr-1.5" aria-hidden="true" />
                                    {edu.location || 'Location Not Provided'}
                                </div>
                                
                                {(edu.description || edu.achievements) && (
                                    <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed prose prose-sm dark:prose-invert">
                                        <p>{edu.description}</p>
                                        {edu.achievements && edu.achievements.length > 0 && (
                                            <ul className="mt-2 space-y-1">
                                                {edu.achievements.map((achievement, idx) => (
                                                    <li key={idx} className="flex items-start">
                                                        <span className="text-indigo-500 mr-2" aria-hidden="true">•</span>
                                                        <span>{achievement}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
};

export default Education;
