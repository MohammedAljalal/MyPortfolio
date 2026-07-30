import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import SectionHeader from './shared/SectionHeader';
import SectionContainer from './shared/SectionContainer';
import SkeletonLoader from './shared/SkeletonLoader';
import ErrorMessage from './shared/ErrorMessage';
import LazyImage from './shared/LazyImage';
import useFetchData from '../hooks/useFetchData';
import ProjectModal from './ProjectModal';
import { BASE_URL } from '../utils/env';

const Projects = () => {
    const { data: projects, loading, error, refetch } = useFetchData('/projects', []);
    const [activeTech, setActiveTech] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);

    if (loading && !projects.length) {
        return (
            <SectionContainer id="projects" bg="bg-lightBg dark:bg-darkBg">
                <SectionHeader eyebrow="Portfolio" title="Featured Projects" gradientColors="from-primary to-primary-light" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <SkeletonLoader type="card" count={3} />
                </div>
            </SectionContainer>
        );
    }

    if (error) {
        return (
            <SectionContainer id="projects" bg="bg-lightBg dark:bg-darkBg">
                <SectionHeader eyebrow="Portfolio" title="Featured Projects" gradientColors="from-primary to-primary-light" />
                <ErrorMessage message={error} onRetry={refetch} />
            </SectionContainer>
        );
    }

    const allTechs = projects.reduce((acc, project) => {
        project.technologies.forEach(tech => {
            if (!acc.includes(tech)) acc.push(tech);
        });
        return acc;
    }, []);

    const topTechs = ['All', ...allTechs.slice(0, 5)];

    const filteredProjects = activeTech === 'All'
        ? projects.filter(p => p.featured)
        : projects.filter(p => p.technologies.includes(activeTech));

    const displayProjects = activeTech === 'All' ? projects.filter(p => p.featured) : filteredProjects;

    if (!projects.length) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
    };

    return (
        <SectionContainer id="projects" bg="bg-lightBg dark:bg-darkBg">
            <SectionHeader eyebrow="Portfolio" title="Featured Projects" gradientColors="from-primary to-primary-light" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex justify-center flex-wrap gap-4 mb-16" 
                role="tablist" 
                aria-label="Project Technologies"
            >
                {topTechs.map(tech => (
                    <button
                        key={tech}
                        onClick={() => setActiveTech(tech)}
                        role="tab"
                        aria-selected={activeTech === tech}
                        aria-controls={`project-panel-${tech}`}
                        id={`project-tab-${tech}`}
                        className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none ${
                            activeTech === tech
                                ? 'text-[#0c0c0c]'
                                : 'text-lightMuted dark:text-[#888888] hover:text-primary dark:hover:text-[#e2e2e2]'
                        }`}
                        style={activeTech === tech 
                            ? {background:'#c8a86b', boxShadow:'0 4px 16px rgba(200,168,107,0.35)'} 
                            : {background:'rgba(200,168,107,0.07)', border:'1px solid rgba(200,168,107,0.2)'}}
                    >
                        {tech}
                    </button>
                ))}
            </motion.div>

            <motion.div 
                id={`project-panel-${activeTech}`}
                role="tabpanel"
                aria-labelledby={`project-tab-${activeTech}`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10"
            >
                <AnimatePresence mode="popLayout">
                    {displayProjects.map((project, index) => (
                        <motion.div
                            layout
                            variants={cardVariants}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            key={project._id}
                            className="rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-400 flex flex-col h-full relative cursor-pointer focus-within:outline-none gold-card"
                            onMouseEnter={e => e.currentTarget.style.boxShadow='0 16px 40px rgba(200,168,107,0.2)'}
                            onMouseLeave={e => e.currentTarget.style.boxShadow='none'}
                            onClick={() => setSelectedProject(project)}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedProject(project); }}
                            tabIndex={0}
                            role="button"
                            aria-label={`View details for ${project.title}`}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[100px] -mr-10 -mt-10 z-0 mix-blend-overlay" aria-hidden="true"></div>

                            <div className="relative h-64 overflow-hidden rounded-t-3xl p-4 z-10">
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-center justify-center backdrop-blur-sm shadow-inner rounded-t-3xl mx-4 mt-4">
                                    <div className="flex space-x-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="px-6 py-2 bg-white text-primary font-bold rounded-full shadow-lg">View Details</span>
                                    </div>
                                </div>
                                {project.image ? (
                                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-md transform group-hover:scale-[1.15] group-hover:rotate-2 transition-transform duration-700 bg-amber-50 dark:bg-gray-700">
                                        <LazyImage 
                                            src={`${BASE_URL}${project.image}`} 
                                            alt={`Screenshot of ${project.title}`} 
                                            className="w-full h-full"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 dark:from-slate-700 dark:to-slate-600 rounded-2xl shadow-md flex items-center justify-center text-primary text-7xl font-black">
                                        {project.title.charAt(0)}
                                    </div>
                                )}
                            </div>

                            <div className="p-8 pt-6 flex-1 flex flex-col relative z-10 bg-gradient-to-b from-transparent to-amber-50/30 dark:to-black/30">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-2xl font-bold text-lightText dark:text-white group-hover:text-primary transition-colors tracking-tight drop-shadow-sm">{project.title}</h4>
                                </div>
                                <p className="text-lightMuted dark:text-gray-400 mb-8 flex-1 line-clamp-3 overflow-hidden text-base leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.technologies.slice(0, 4).map((tech, i) => (
                                        <span key={i} className="px-3.5 py-1.5 bg-amber-50 dark:bg-slate-700/50 backdrop-blur-sm border border-amber-200/70 dark:border-gray-600/50 text-primary dark:text-primary-light text-xs font-bold rounded-lg shadow-sm">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 4 && (
                                        <span className="px-3.5 py-1.5 bg-amber-50/50 dark:bg-slate-700/50 backdrop-blur-sm border border-amber-200/50 dark:border-transparent text-lightMuted dark:text-gray-400 text-xs font-bold rounded-lg">
                                            +{project.technologies.length - 4}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {displayProjects.length === 0 && !loading && (
                <div className="text-center text-lightMuted dark:text-gray-400 py-20 glass rounded-3xl max-w-2xl mx-auto mt-10">
                    <span className="text-4xl block mb-4" aria-hidden="true">🔍</span>
                    <p className="text-lg font-medium">No projects found for the selected category.</p>
                    <button onClick={() => setActiveTech('All')} className="mt-4 text-primary hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">View All Projects</button>
                </div>
            )}

            {/* Project Details Modal */}
            {selectedProject && (
                <ProjectModal 
                    project={selectedProject} 
                    onClose={() => setSelectedProject(null)} 
                />
            )}
        </SectionContainer>
    );
};

export default Projects;
