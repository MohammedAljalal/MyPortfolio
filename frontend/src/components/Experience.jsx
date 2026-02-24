import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { FaBriefcase } from 'react-icons/fa';

const Experience = () => {
    const [experience, setExperience] = useState([]);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const res = await api.get('/experience');
                setExperience(res.data);
            } catch (err) { console.error(err); }
        };
        fetchExperience();
    }, []);

    if (!experience.length) return null;

    return (
        <section id="experience" className="py-20 md:py-32 bg-gray-50 dark:bg-darkBg transition-colors duration-300 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2 font-mono">My Journey</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Work Experience</h3>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full"></div>
                </motion.div>

                <div className="max-w-4xl mx-auto relative pl-2 md:pl-0">
                    {/* Minimalist left timeline line */}
                    <div className="absolute left-8 md:left-[3.25rem] top-8 bottom-0 w-[2px] bg-gradient-to-b from-primary via-gray-200 dark:via-gray-800 to-transparent"></div>

                    <div className="space-y-12 relative z-10">
                        {experience.map((exp, index) => (
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                key={exp._id}
                                className="relative pl-16 md:pl-28 group"
                            >
                                {/* Glowing Dot on Timeline */}
                                <div className="absolute left-8 md:left-[3.3rem] top-10 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-darkBg border-2 border-primary rounded-full group-hover:bg-primary group-hover:scale-150 transition-all duration-300 z-20">
                                    <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-40 group-hover:animate-ping"></div>
                                </div>

                                {/* Content Card */}
                                <div className="bg-white dark:bg-darkCard p-8 md:p-10 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-primary/5 dark:hover:shadow-primary/5 hover:border-primary/30 transition-all duration-500 relative overflow-hidden group-hover:-translate-y-1">
                                    {/* Subtle corner glow */}
                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                    <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6 relative z-10">
                                        <div>
                                            <h4 className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors tracking-tight">{exp.role}</h4>
                                            <h5 className="text-lg font-bold text-gray-500 dark:text-gray-400 mt-1">{exp.company}</h5>
                                        </div>
                                        <div className="mt-4 lg:mt-0 inline-flex items-center px-4 py-2 bg-gray-50 dark:bg-slate-800/80 text-gray-600 dark:text-gray-300 rounded-xl text-sm font-bold border border-gray-200 dark:border-gray-700 w-fit">
                                            {exp.duration}
                                        </div>
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed whitespace-pre-wrap relative z-10 font-light">
                                        {exp.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
