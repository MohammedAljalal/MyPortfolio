import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api, { getImageUrl } from '../utils/api';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await api.get('/skills');
                setSkills(res.data);
            } catch (err) { console.error(err); }
        };
        fetchSkills();
    }, []);

    const categories = ['All', ...new Set(skills.map(skill => skill.category))];
    const filteredSkills = activeCategory === 'All' ? skills : skills.filter(s => s.category === activeCategory);

    if (!skills.length) return null;

    return (
        <section id="skills" className="py-20 md:py-32 bg-gray-50 dark:bg-darkBg transition-colors duration-300 relative overflow-hidden">
            <div className="absolute right-0 bottom-40 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-[100px] opacity-10 dark:opacity-20 animate-blob"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2 font-mono">My Expertise</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Technical Skills</h3>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-secondary to-teal-400 mx-auto mt-6 rounded-full"></div>
                </motion.div>

                <div className="flex justify-center flex-wrap gap-4 mb-16">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 shadow-sm ${activeCategory === cat
                                ? 'bg-secondary text-white transform scale-105 shadow-secondary/30 shadow-lg border-transparent'
                                : 'bg-white dark:bg-darkCard text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-secondary hover:text-secondary dark:hover:border-secondary dark:hover:text-secondary hover:-translate-y-1'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {filteredSkills.map((skill, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                            key={skill._id}
                            className="bg-white dark:bg-darkCard p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group flex items-center overflow-hidden relative"
                        >
                            {/* Subtle background glow on hover */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                            {/* Icon Container */}
                            <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 bg-gray-50 dark:bg-slate-800/80 rounded-[1.5rem] flex items-center justify-center p-3.5 md:p-4 mr-6 md:mr-8 border border-gray-100 dark:border-gray-700 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors duration-500 z-10">
                                {skill.icon ? (
                                    <img src={getImageUrl(skill.icon)} alt={skill.name} className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500" />
                                ) : (
                                    <span className="text-2xl font-black text-gray-300 dark:text-gray-500 group-hover:text-primary transition-colors duration-500">{skill.name.substring(0, 2).toUpperCase()}</span>
                                )}
                            </div>

                            {/* Info Container */}
                            <div className="flex-1 min-w-0 z-10 flex items-center">
                                <div className="truncate pr-4">
                                    <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate group-hover:text-primary transition-colors tracking-tight">{skill.name}</h4>
                                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mt-1 md:mt-1.5">{skill.category}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
