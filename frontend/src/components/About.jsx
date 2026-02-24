import React from 'react';
import { motion } from 'framer-motion';

const About = ({ info }) => {
    if (!info || !info.bio) return null;

    return (
        <section id="about" className="py-20 md:py-32 bg-white dark:bg-darkCard transition-colors duration-300 relative overflow-hidden">
            <div className="absolute -left-40 top-40 w-80 h-80 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-10 animate-blob"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2 font-mono">Discover</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">About Me</h3>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full"></div>
                </motion.div>

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

                    <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center pt-16 relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-gray-200 dark:before:via-gray-800 before:to-transparent before:h-px before:w-full">
                        <motion.div whileHover={{ y: -5, scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="p-4 bg-white dark:bg-darkCard rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-shadow">
                            <div className="text-5xl font-extrabold text-gradient mb-3">3+</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Years Experience</div>
                        </motion.div>
                        <motion.div whileHover={{ y: -5, scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="p-4 bg-white dark:bg-darkCard rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-shadow">
                            <div className="text-5xl font-extrabold text-gradient mb-3">50+</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Projects Completed</div>
                        </motion.div>
                        <motion.div whileHover={{ y: -5, scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="p-4 bg-white dark:bg-darkCard rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-shadow">
                            <div className="text-5xl font-extrabold text-gradient mb-3">100%</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Client Satisfaction</div>
                        </motion.div>
                        <motion.div whileHover={{ y: -5, scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="p-4 bg-white dark:bg-darkCard rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-shadow">
                            <div className="text-5xl font-extrabold text-gradient mb-3">24/7</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold">Support Provided</div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
