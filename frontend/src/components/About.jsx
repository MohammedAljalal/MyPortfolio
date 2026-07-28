import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './shared/SectionHeader';
import SectionContainer from './shared/SectionContainer';

const About = ({ info }) => {
    if (!info || !info.bio) return null;

    // Default stats if none exist
    const stats = info.stats && info.stats.length > 0 ? info.stats : [
        { label: "Years Experience", value: "3+" },
        { label: "Projects Completed", value: "50+" },
        { label: "Client Satisfaction", value: "100%" },
        { label: "Support Provided", value: "24/7" }
    ];

    return (
        <SectionContainer id="about" bg="bg-white dark:bg-darkCard">
            <div className="absolute -left-40 top-40 w-80 h-80 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-10 animate-blob" aria-hidden="true"></div>

            <SectionHeader eyebrow="Discover" title="About Me" />

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 text-center leading-loose text-lg md:text-xl font-light"
                >
                    {info.bio.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-6">{paragraph}</p>
                    ))}
                </motion.div>

                {stats.length > 0 && (
                    <div className={`mt-20 grid grid-cols-2 md:grid-cols-${Math.min(stats.length, 4)} gap-8 text-center pt-16 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-gray-200 dark:before:via-gray-800 before:to-transparent before:h-px before:w-full`}>
                        {stats.map((stat, index) => (
                            <motion.div 
                                key={index}
                                whileHover={{ y: -5, scale: 1.05 }} 
                                transition={{ type: "spring", stiffness: 300 }} 
                                className="p-4 bg-white dark:bg-darkCard rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-shadow"
                            >
                                <div className="text-5xl font-extrabold text-gradient mb-3">{stat.value}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </SectionContainer>
    );
};

export default About;
