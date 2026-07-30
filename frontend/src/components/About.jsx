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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
    };

    return (
        <SectionContainer id="about" bg="bg-lightBg dark:bg-darkBg">
            <div className="absolute -left-40 top-40 w-80 h-80 bg-primary rounded-full mix-blend-multiply filter blur-[100px] opacity-10 dark:opacity-10 animate-blob" aria-hidden="true"></div>

            <SectionHeader eyebrow="Discover" title="About Me" gradientColors="from-primary to-primary-light" />

            <div className="max-w-4xl mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="prose prose-lg dark:prose-invert max-w-none text-lightMuted dark:text-gray-300 text-center leading-loose text-lg md:text-xl font-light"
                >
                    {info.bio.split('\n').map((paragraph, index) => (
                        <motion.p variants={itemVariants} key={index} className="mb-6 drop-shadow-sm">{paragraph}</motion.p>
                    ))}
                </motion.div>

                {stats.length > 0 && (
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className={`mt-20 grid grid-cols-2 md:grid-cols-${Math.min(stats.length, 4)} gap-8 text-center pt-16 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-amber-200 dark:before:via-gray-800 before:to-transparent before:h-px before:w-full`}
                    >
                        {stats.map((stat, index) => (
                            <motion.div 
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -5, scale: 1.05 }} 
                                transition={{ type: "spring", stiffness: 300 }} 
                                className="p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group cursor-default gold-card"
                                onMouseEnter={e => e.currentTarget.style.boxShadow='0 12px 32px rgba(200,168,107,0.18)'}
                                onMouseLeave={e => e.currentTarget.style.boxShadow='none'}
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="text-5xl font-extrabold text-gradient mb-3 drop-shadow-sm relative z-10">{stat.value}</div>
                                <div className="text-xs text-lightMuted dark:text-gray-400 uppercase tracking-widest font-bold relative z-10">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </SectionContainer>
    );
};

export default About;
