import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
            <SectionContainer id="skills" bg="bg-lightCard dark:bg-darkBg">
                <SectionHeader eyebrow="My Expertise" title="Technical Skills" gradientColors="from-primary to-primary-light" />
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    <SkeletonLoader type="card" count={6} />
                </div>
            </SectionContainer>
        );
    }

    if (error) {
        return (
            <SectionContainer id="skills" bg="bg-lightCard dark:bg-darkBg">
                <SectionHeader eyebrow="My Expertise" title="Technical Skills" gradientColors="from-primary to-primary-light" />
                <ErrorMessage message={error} onRetry={refetch} />
            </SectionContainer>
        );
    }

    const categories = ['All', ...new Set(skills.map(skill => skill.category))];
    const filteredSkills = activeCategory === 'All' ? skills : skills.filter(s => s.category === activeCategory);

    if (!skills.length) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12 } }
    };

    return (
        <SectionContainer id="skills" bg="bg-lightCard dark:bg-darkBg">
            <div className="absolute right-0 bottom-40 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-[100px] opacity-10 dark:opacity-20 animate-pulse-slow pointer-events-none" aria-hidden="true"></div>
            <div className="absolute left-10 top-40 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-[100px] opacity-10 dark:opacity-10 animate-blob pointer-events-none" aria-hidden="true"></div>

            <SectionHeader eyebrow="My Expertise" title="Technical Skills" gradientColors="from-primary to-primary-light" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex justify-start md:justify-center gap-3 mb-16 overflow-x-auto pb-2 scrollbar-hide relative z-20" 
                role="tablist" 
                aria-label="Skill Categories"
            >
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        role="tab"
                        aria-selected={activeCategory === cat}
                        aria-controls={`panel-${cat}`}
                        id={`tab-${cat}`}
                        className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none flex-shrink-0 ${
                            activeCategory === cat
                                ? 'text-[#0c0c0c]'
                                : 'text-lightMuted dark:text-[#888888] hover:text-primary dark:hover:text-[#e2e2e2]'
                        }`}
                        style={activeCategory === cat 
                            ? {background:'#c8a86b', boxShadow:'0 4px 16px rgba(200,168,107,0.35)'} 
                            : {background:'rgba(200,168,107,0.07)', border:'1px solid rgba(200,168,107,0.2)'}}
                    >
                        {cat}
                    </button>
                ))}
            </motion.div>

            <motion.div 
                id={`panel-${activeCategory}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeCategory}`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 relative z-10"
            >
                <AnimatePresence mode="popLayout">
                    {filteredSkills.map((skill, index) => (
                        <motion.div
                            layout
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4 }}
                            key={skill._id}
                            className="rounded-2xl p-3 md:p-6 group hover:-translate-y-1 transition-all duration-300 gold-card"
                            onMouseEnter={e => e.currentTarget.style.boxShadow='0 12px 32px rgba(200,168,107,0.18)'}
                            onMouseLeave={e => e.currentTarget.style.boxShadow='none'}
                        >
                            <div className="flex items-center mb-4 md:mb-8">
                                {skill.icon ? (
                                    <div className="w-10 h-10 md:w-16 md:h-16 p-2 md:p-3 bg-amber-50 dark:bg-slate-800/50 rounded-xl md:rounded-2xl mr-3 md:mr-5 flex flex-shrink-0 items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border border-amber-200/60 dark:border-gray-700/50 backdrop-blur-md shadow-inner overflow-hidden">
                                        <LazyImage 
                                            src={skill.icon.startsWith('http') ? skill.icon : `${BASE_URL}${skill.icon}`} 
                                            alt={`${skill.name} icon`} 
                                            className="w-full h-full object-contain filter drop-shadow-sm" 
                                        />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 md:w-16 md:h-16 bg-gradient-to-br from-primary to-primary-dark rounded-xl md:rounded-2xl flex flex-shrink-0 items-center justify-center text-white text-base md:text-2xl font-black mr-3 md:mr-5 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 border border-white/20 dark:border-gray-700">
                                        {skill.name.substring(0, 2).toUpperCase()}
                                    </div>
                                )}
                                <div className="min-w-0">
                                    <h4 className="text-sm md:text-xl font-bold text-lightText dark:text-white group-hover:text-primary transition-colors drop-shadow-sm truncate">{skill.name}</h4>
                                    <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-lightMuted dark:text-gray-400">{skill.category}</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm font-bold mb-3">
                                    <span className="text-lightMuted dark:text-gray-400">Proficiency</span>
                                    <span className="text-primary">{skill.level}%</span>
                                </div>
                                <div className="w-full h-3 bg-amber-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner" role="progressbar" aria-valuenow={skill.level} aria-valuemin="0" aria-valuemax="100">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.3, type: "spring", bounce: 0.2 }}
                                        className="h-full rounded-full relative overflow-hidden"
                                        style={{background:'linear-gradient(to right, #c8a86b, #dfc090)'}}
                                    >
                                        <div className="absolute top-0 left-0 w-full h-full bg-white/30 transform -skew-x-12 translate-x-full group-hover:animate-shimmer" aria-hidden="true"></div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </SectionContainer>
    );
};

export default Skills;
