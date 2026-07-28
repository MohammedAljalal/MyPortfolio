import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './shared/SectionHeader';
import SectionContainer from './shared/SectionContainer';
import SkeletonLoader from './shared/SkeletonLoader';
import ErrorMessage from './shared/ErrorMessage';
import LazyImage from './shared/LazyImage';
import useFetchData from '../hooks/useFetchData';
import { BASE_URL } from '../utils/env';

const Skills = () => {
    const { data: skills, loading, error, refetch } = useFetchData('/skills', []);
    const [activeCategory, setActiveCategory] = useState('All');

    if (loading && !skills.length) {
        return (
            <SectionContainer id="skills" bg="bg-gray-50 dark:bg-darkBg">
                <SectionHeader eyebrow="My Expertise" title="Technical Skills" gradientColors="from-secondary to-teal-400" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <SkeletonLoader type="card" count={6} />
                </div>
            </SectionContainer>
        );
    }

    if (error) {
        return (
            <SectionContainer id="skills" bg="bg-gray-50 dark:bg-darkBg">
                <SectionHeader eyebrow="My Expertise" title="Technical Skills" gradientColors="from-secondary to-teal-400" />
                <ErrorMessage message={error} onRetry={refetch} />
            </SectionContainer>
        );
    }

    const categories = ['All', ...new Set(skills.map(skill => skill.category))];
    const filteredSkills = activeCategory === 'All' ? skills : skills.filter(s => s.category === activeCategory);

    if (!skills.length) return null;

    return (
        <SectionContainer id="skills" bg="bg-gray-50 dark:bg-darkBg">
            <div className="absolute right-0 bottom-40 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-[100px] opacity-10 dark:opacity-20 animate-blob" aria-hidden="true"></div>

            <SectionHeader eyebrow="My Expertise" title="Technical Skills" gradientColors="from-secondary to-teal-400" />

            <div className="flex justify-center flex-wrap gap-4 mb-16" role="tablist" aria-label="Skill Categories">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        role="tab"
                        aria-selected={activeCategory === cat}
                        aria-controls={`panel-${cat}`}
                        id={`tab-${cat}`}
                        className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${activeCategory === cat
                                ? 'bg-secondary text-white transform scale-105 shadow-secondary/30 shadow-lg border-transparent'
                                : 'bg-white dark:bg-darkCard text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-secondary hover:text-secondary dark:hover:border-secondary dark:hover:text-secondary hover:-translate-y-1'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div 
                id={`panel-${activeCategory}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeCategory}`}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {filteredSkills.map((skill, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                        key={skill._id}
                        className="bg-white dark:bg-darkCard p-8 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-transform duration-300 group"
                    >
                        <div className="flex items-center mb-8">
                            {skill.icon ? (
                                <div className="w-16 h-16 p-3 bg-gray-50 dark:bg-slate-800 rounded-2xl mr-5 flex flex-shrink-0 items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-gray-100 dark:border-gray-700 shadow-inner overflow-hidden">
                                    <LazyImage 
                                        src={`${BASE_URL}${skill.icon}`} 
                                        alt={`${skill.name} icon`} 
                                        className="w-full h-full object-contain filter drop-shadow-sm" 
                                    />
                                </div>
                            ) : (
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-secondary rounded-2xl flex flex-shrink-0 items-center justify-center text-white text-2xl font-black mr-5 shadow-lg shadow-emerald-200 dark:shadow-none transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 border border-white/20 dark:border-gray-700">
                                    {skill.name.substring(0, 2).toUpperCase()}
                                </div>
                            )}
                            <div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-secondary transition-colors">{skill.name}</h4>
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{skill.category}</span>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm font-bold mb-3">
                                <span className="text-gray-600 dark:text-gray-400">Proficiency</span>
                                <span className="text-secondary">{skill.level}%</span>
                            </div>
                            <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner" role="progressbar" aria-valuenow={skill.level} aria-valuemin="0" aria-valuemax="100">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-emerald-400 to-secondary rounded-full relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 translate-x-full group-hover:animate-shimmer" aria-hidden="true"></div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionContainer>
    );
};

export default Skills;
