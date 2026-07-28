import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaTimesCircle } from 'react-icons/fa';
import LazyImage from './shared/LazyImage';
import { BASE_URL } from '../utils/env';

const ProjectModal = ({ project, onClose }) => {
    const modalRef = useRef(null);

    // Focus trap and prevent background scroll
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            
            // Basic focus trap
            if (e.key === 'Tab' && modalRef.current) {
                const focusableElements = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        
        // Focus first element on mount
        setTimeout(() => {
            if (modalRef.current) {
                const closeBtn = modalRef.current.querySelector('button');
                if (closeBtn) closeBtn.focus();
            }
        }, 100);

        return () => {
            document.body.style.overflow = originalStyle;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    if (!project) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity"
                    aria-hidden="true"
                />
                
                <motion.div 
                    ref={modalRef}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white dark:bg-darkCard w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl relative z-10 flex flex-col overflow-hidden"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-darkBg/50">
                        <h2 id="modal-title" className="text-xl font-bold text-gray-900 dark:text-white truncate pr-4">
                            {project.title}
                        </h2>
                        <button 
                            onClick={onClose}
                            className="p-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label="Close modal"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Content Scrollable */}
                    <div className="overflow-y-auto flex-1 p-6 sm:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            
                            {/* Left Column - Media & Details */}
                            <div className="space-y-8">
                                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 aspect-video relative">
                                    {project.image ? (
                                        <LazyImage 
                                            src={`${BASE_URL}${project.image}`} 
                                            alt={project.title} 
                                            className="w-full h-full"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-primary dark:text-gray-400 text-7xl font-black">
                                            {project.title.charAt(0)}
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 flex space-x-2">
                                        {project.githubLink && (
                                            <a href={project.githubLink} target="_blank" rel="noreferrer" className="p-2 bg-white/90 text-gray-900 rounded-full hover:bg-black hover:text-white transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-primary" aria-label="View source code on GitHub">
                                                <FaGithub size={18} />
                                            </a>
                                        )}
                                        {project.liveLink && (
                                            <a href={project.liveLink} target="_blank" rel="noreferrer" className="p-2 bg-primary/90 text-white rounded-full hover:bg-primary hover:text-white transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-white" aria-label="View live project">
                                                <FaExternalLinkAlt size={16} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                                        <span className="w-1.5 h-6 bg-primary rounded-full mr-2"></span>
                                        Technologies Used
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/50 text-sm font-semibold rounded-lg">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Metrics & Timeline */}
                                {(project.timeline || project.teamSize || project.metrics) && (
                                    <div className="grid grid-cols-2 gap-4">
                                        {project.timeline && (
                                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                                                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Timeline</div>
                                                <div className="font-medium text-gray-900 dark:text-gray-200">{project.timeline}</div>
                                            </div>
                                        )}
                                        {project.teamSize && (
                                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                                                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold mb-1">Team Size</div>
                                                <div className="font-medium text-gray-900 dark:text-gray-200">{project.teamSize} Member(s)</div>
                                            </div>
                                        )}
                                        {project.metrics && (
                                            <div className="col-span-2 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30">
                                                <div className="text-xs text-emerald-600 dark:text-emerald-400 uppercase font-bold mb-1">Key Metrics</div>
                                                <div className="font-medium text-emerald-800 dark:text-emerald-300">{project.metrics}</div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Right Column - Content */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white flex items-center">
                                        <span className="w-1.5 h-6 bg-primary rounded-full mr-2"></span>
                                        Overview
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                                
                                {project.role && (
                                    <div>
                                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Role</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{project.role}</p>
                                    </div>
                                )}

                                {project.challenges && (
                                    <div>
                                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Challenges Faced</h3>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.challenges}</p>
                                    </div>
                                )}

                                {project.architecture && (
                                    <div>
                                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Architecture & Approach</h3>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.architecture}</p>
                                    </div>
                                )}
                                
                                {project.impact && (
                                    <div>
                                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Impact & Results</h3>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.impact}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ProjectModal;
