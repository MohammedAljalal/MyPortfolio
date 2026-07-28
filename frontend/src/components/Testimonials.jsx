import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import SectionHeader from './shared/SectionHeader';
import SectionContainer from './shared/SectionContainer';
import SkeletonLoader from './shared/SkeletonLoader';
import ErrorMessage from './shared/ErrorMessage';
import LazyImage from './shared/LazyImage';
import useFetchData from '../hooks/useFetchData';
import { BASE_URL } from '../utils/env';

const Testimonials = () => {
    const { data: testimonials, loading, error, refetch } = useFetchData('/testimonials', []);

    if (loading && !testimonials.length) {
        return (
            <SectionContainer id="testimonials" bg="bg-white dark:bg-darkCard">
                <SectionHeader eyebrow="Kind Words" title="Testimonials" gradientColors="from-blue-500 to-indigo-500" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <SkeletonLoader type="card" count={3} />
                </div>
            </SectionContainer>
        );
    }

    if (error) {
        return (
            <SectionContainer id="testimonials" bg="bg-white dark:bg-darkCard">
                <SectionHeader eyebrow="Kind Words" title="Testimonials" gradientColors="from-blue-500 to-indigo-500" />
                <ErrorMessage message={error} onRetry={refetch} />
            </SectionContainer>
        );
    }

    if (!testimonials.length) return null;

    return (
        <SectionContainer id="testimonials" bg="bg-white dark:bg-darkCard">
            <SectionHeader eyebrow="Kind Words" title="Testimonials" gradientColors="from-blue-500 to-indigo-500" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                        key={testimonial._id}
                        className="bg-gray-50 dark:bg-slate-800 p-8 rounded-3xl relative shadow-sm border border-gray-100 dark:border-gray-700/50 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                    >
                        <FaQuoteLeft className="text-4xl text-blue-500/20 dark:text-blue-400/10 absolute top-8 right-8" aria-hidden="true" />
                        
                        <div className="flex-1 mb-8 relative z-10">
                            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed italic">
                                "{testimonial.text}"
                            </p>
                        </div>

                        <div className="flex items-center mt-auto border-t border-gray-200 dark:border-gray-700 pt-6">
                            {testimonial.image ? (
                                <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-white dark:border-gray-600 shadow-sm shrink-0">
                                    <LazyImage 
                                        src={`${BASE_URL}${testimonial.image}`} 
                                        alt={testimonial.name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-14 h-14 rounded-full mr-4 border-2 border-white dark:border-gray-600 shadow-sm shrink-0 bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xl">
                                    {testimonial.name.charAt(0)}
                                </div>
                            )}
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{testimonial.name}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                    {testimonial.position} {testimonial.company && <span>@ {testimonial.company}</span>}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionContainer>
    );
};

export default Testimonials;
