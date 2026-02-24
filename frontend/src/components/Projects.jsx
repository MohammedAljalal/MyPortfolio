import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api, { getImageUrl } from '../utils/api';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [activeTech, setActiveTech] = useState('All');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/projects');
                setProjects(res.data);
            } catch (err) { console.error(err); }
        };
        fetchProjects();
    }, []);

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

    return (
        <section id="projects" className="py-20 md:py-32 bg-white dark:bg-darkCard transition-colors duration-300 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2 font-mono">Portfolio</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Featured Projects</h3>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-purple-500 mx-auto mt-6 rounded-full"></div>
                </motion.div>

                <div className="flex justify-center flex-wrap gap-4 mb-16">
                    {topTechs.map(tech => (
                        <button
                            key={tech}
                            onClick={() => setActiveTech(tech)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 shadow-sm ${activeTech === tech
                                ? 'bg-primary text-white transform scale-105 shadow-lg shadow-primary/40 dark:shadow-primary/20 border-transparent'
                                : 'bg-white dark:bg-darkCard text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary hover:-translate-y-1'
                                }`}
                        >
                            {tech}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {displayProjects.map((project, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                            key={project._id}
                            className="bg-gray-50 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700/50 group hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 dark:bg-primary/20 rounded-bl-[100px] -mr-10 -mt-10 z-0 mix-blend-multiply"></div>

                            <div className="relative h-64 overflow-hidden rounded-t-3xl p-4 z-10">
                                <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center backdrop-blur-sm rounded-t-3xl">
                                    <div className="flex space-x-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        {project.githubLink && (
                                            <a href={project.githubLink} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center bg-white text-gray-900 rounded-full hover:bg-black hover:text-white transition-all transform hover:scale-110 shadow-xl">
                                                <FaGithub size={20} />
                                            </a>
                                        )}
                                        {project.liveLink && (
                                            <a href={project.liveLink} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full hover:bg-white hover:text-primary transition-all transform hover:scale-110 shadow-xl">
                                                <FaExternalLinkAlt size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                {project.image ? (
                                    <img src={getImageUrl(project.image)} alt={project.title} className="w-full h-full object-cover rounded-2xl shadow-md transform group-hover:scale-110 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-slate-700 dark:to-slate-600 rounded-2xl shadow-md flex items-center justify-center text-primary dark:text-gray-300 text-7xl font-black">
                                        {project.title.charAt(0)}
                                    </div>
                                )}
                            </div>

                            <div className="p-8 pt-6 flex-1 flex flex-col relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors tracking-tight">{project.title}</h4>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-8 flex-1 line-clamp-3 overflow-hidden text-base leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.technologies.slice(0, 4).map((tech, i) => (
                                        <span key={i} className="px-3.5 py-1.5 bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-lg shadow-sm">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 4 && (
                                        <span className="px-3.5 py-1.5 bg-gray-100 dark:bg-slate-700 border border-transparent text-gray-600 dark:text-gray-400 text-xs font-bold rounded-lg">
                                            +{project.technologies.length - 4}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {displayProjects.length === 0 && (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-20 bg-gray-50 dark:bg-slate-800 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
                        <span className="text-4xl block mb-4">🔍</span>
                        <p className="text-lg font-medium">No projects found for the selected category.</p>
                        <button onClick={() => setActiveTech('All')} className="mt-4 text-primary hover:underline font-medium">View All Projects</button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
