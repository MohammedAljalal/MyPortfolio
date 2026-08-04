import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import SectionHeader from './shared/SectionHeader';
import SectionContainer from './shared/SectionContainer';
import SkeletonLoader from './shared/SkeletonLoader';
import ErrorMessage from './shared/ErrorMessage';
import LazyImage from './shared/LazyImage';
import useFetchData from '../hooks/useFetchData';
import { BASE_URL } from '../utils/env';

const Certificates = () => {
    const { data: certificates, loading, error, refetch } = useFetchData('/certificates', []);

    if (loading && !certificates.length) {
        return (
            <SectionContainer id="certificates" bg="bg-lightBg dark:bg-darkBg">
                <SectionHeader eyebrow="Continuous Learning" title="Certifications" gradientColors="from-primary to-primary-light" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <SkeletonLoader type="card" count={3} />
                </div>
            </SectionContainer>
        );
    }

    if (error) {
        return (
            <SectionContainer id="certificates" bg="bg-lightBg dark:bg-darkBg">
                <SectionHeader eyebrow="Continuous Learning" title="Certifications" gradientColors="from-primary to-primary-light" />
                <ErrorMessage message={error} onRetry={refetch} />
            </SectionContainer>
        );
    }

    if (!certificates.length) return null;

    return (
        <SectionContainer id="certificates" bg="bg-lightBg dark:bg-darkBg">
            <SectionHeader eyebrow="Continuous Learning" title="Certifications" gradientColors="from-primary to-primary-light" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {certificates.map((cert, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                        key={cert._id}
                        className="rounded-3xl overflow-hidden flex flex-col group hover:-translate-y-2 transition-transform duration-300 gold-card"
                        onMouseEnter={e => e.currentTarget.style.boxShadow='0 16px 40px rgba(200,168,107,0.18)'}
                        onMouseLeave={e => e.currentTarget.style.boxShadow=''}
                    >
                        {/* Image/Header Area */}
                        <div className="relative h-48 bg-amber-50 dark:bg-slate-800 overflow-hidden">
                            {cert.image ? (
                                <LazyImage 
                                    src={cert.image.startsWith('http') ? cert.image : `${BASE_URL}${cert.image}`} 
                                    alt={`${cert.title} Certificate`} 
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 dark:from-slate-700 dark:to-slate-600">
                                    <FaCertificate className="text-6xl opacity-20" style={{color:'#c8a86b'}} aria-hidden="true" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                                <div className="text-white">
                                    <h4 className="font-bold text-xl leading-tight mb-1">{cert.title}</h4>
                                    <p className="text-white/80 text-sm font-medium">{cert.issuer}</p>
                                </div>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-center mb-4 text-sm font-medium text-lightMuted dark:text-gray-400">
                                <span>{cert.date}</span>
                                {cert.credentialId && (
                                    <span className="truncate max-w-[150px]" title={cert.credentialId}>ID: {cert.credentialId}</span>
                                )}
                            </div>
                            
                            <div className="mt-auto pt-4 flex justify-end">
                                {cert.link && (
                                    <a 
                                        href={cert.link} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="inline-flex items-center text-sm font-bold text-primary hover:text-primary-dark transition-colors focus-visible:outline-none focus-visible:underline rounded-sm"
                                        aria-label={`View credential for ${cert.title}`}
                                    >
                                        View Credential <FaExternalLinkAlt className="ml-1.5" aria-hidden="true" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionContainer>
    );
};

export default Certificates;
