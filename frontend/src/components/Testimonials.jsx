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
            <SectionContainer id="testimonials" bg="bg-lightCard dark:bg-darkCard">
                <SectionHeader eyebrow="Kind Words" title="Testimonials" gradientColors="from-primary to-primary-light" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <SkeletonLoader type="card" count={3} />
                </div>
            </SectionContainer>
        );
    }

    if (error) {
        return (
            <SectionContainer id="testimonials" bg="bg-lightCard dark:bg-darkCard">
                <SectionHeader eyebrow="Kind Words" title="Testimonials" gradientColors="from-primary to-primary-light" />
                <ErrorMessage message={error} onRetry={refetch} />
            </SectionContainer>
        );
    }

    if (!testimonials.length) return null;

    return (
        <SectionContainer id="testimonials" bg="bg-lightCard dark:bg-darkCard">
            <SectionHeader eyebrow="Kind Words" title="Testimonials" gradientColors="from-primary to-primary-light" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                        key={testimonial._id}
                        className="p-8 rounded-3xl relative flex flex-col h-full hover:-translate-y-1 transition-all duration-300 group gold-card"
                        onMouseEnter={e => e.currentTarget.style.boxShadow='0 16px 40px rgba(200,168,107,0.15)'}
                        onMouseLeave={e => e.currentTarget.style.boxShadow=''}
                    >
                        <FaQuoteLeft className="text-4xl absolute top-8 right-8 opacity-15" style={{color:'#c8a86b'}} aria-hidden="true" />
                        
                        <div className="flex-1 mb-8 relative z-10">
                            <p className="text-lightMuted dark:text-gray-300 text-lg leading-relaxed italic">
                                "{testimonial.text}"
                            </p>
                        </div>

                        <div className="flex items-center mt-auto border-t border-amber-100 dark:border-gray-700 pt-6">
                            {testimonial.image ? (
                                <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 shrink-0" style={{borderColor:'rgba(200,168,107,0.4)'}}>
                                    <LazyImage 
                                        src={`${BASE_URL}${testimonial.image}`} 
                                        alt={testimonial.name} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-14 h-14 rounded-full mr-4 border-2 shrink-0 flex items-center justify-center text-[#0c0c0c] font-bold text-xl" style={{background:'linear-gradient(135deg, #c8a86b, #dfc090)', borderColor:'rgba(200,168,107,0.4)'}}>
                                    {testimonial.name.charAt(0)}
                                </div>
                            )}
                            <div>
                                <h4 className="font-bold text-lightText dark:text-white group-hover:text-primary transition-colors">{testimonial.name}</h4>
                                <p className="text-sm text-lightMuted dark:text-gray-400 font-medium">
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
