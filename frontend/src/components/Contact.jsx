import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import api from '../utils/api';
import SectionHeader from './shared/SectionHeader';
import SectionContainer from './shared/SectionContainer';

const Contact = ({ info }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ submitting: false, success: false, error: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitting: true, success: false, error: '' });
        try {
            await api.post('/contact', formData);
            setStatus({ submitting: false, success: true, error: '' });
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
        } catch (err) {
            setStatus({ submitting: false, success: false, error: err.response?.data?.message || 'Failed to send message. Please try again later.' });
        }
    };

    return (
        <SectionContainer id="contact" bg="bg-white dark:bg-darkBg overflow-hidden relative">
            <div className="absolute left-0 bottom-0 w-full h-80 bg-gradient-to-t from-primary/5 to-transparent z-0" aria-hidden="true"></div>

            <SectionHeader eyebrow="Let's Connect" title="Get In Touch" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col justify-center"
                >
                    <h4 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                        Ready to create something <span className="text-gradient">extraordinary?</span>
                    </h4>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed font-light">
                        Whether you have a project in mind, want to collaborate on something exciting, or just want to say hi, I'm always open to discussing new opportunities and ideas.
                    </p>

                    <div className="bg-gray-50 dark:bg-darkCard p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-[2] duration-700 ease-out z-0" aria-hidden="true"></div>
                        <h5 className="font-bold text-gray-900 dark:text-white text-xl mb-6 relative z-10 font-mono tracking-tight">Direct Contact</h5>
                        <div className="space-y-6 relative z-10">
                            <div>
                                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Email</p>
                                <a href={`mailto:${info?.email || 'hello@portfolio.com'}`} className="font-semibold text-xl text-gray-800 dark:text-gray-200 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm inline-block">
                                    {info?.email || 'hello@portfolio.com'}
                                </a>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Location</p>
                                <p className="font-semibold text-xl text-gray-800 dark:text-gray-200">{info?.location || 'Available Worldwide (Remote)'}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <div className="bg-white dark:bg-darkCard p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-indigo-100 dark:shadow-none border border-gray-100 dark:border-gray-800 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-secondary" aria-hidden="true"></div>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-100 dark:border-gray-800 pb-6 ml-2">Drop a Message</h4>

                        {status.success && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} role="alert" className="mb-8 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl flex items-center shadow-sm ml-2">
                                <span className="mr-3 text-2xl" aria-hidden="true">🎉</span> <span className="font-medium">Message sent successfully! I'll get back to you soon.</span>
                            </motion.div>
                        )}
                        {status.error && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} role="alert" className="mb-8 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center shadow-sm ml-2">
                                <span className="mr-3 text-2xl" aria-hidden="true">⚠️</span> <span className="font-medium">{status.error}</span>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6 ml-2" noValidate>
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-mono">Your Name <span className="text-primary" aria-label="required">*</span></label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                    aria-required="true"
                                    className="w-full bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white dark:focus:bg-slate-700 transition-all outline-none placeholder-gray-400 dark:placeholder-gray-500 shadow-inner" 
                                    placeholder="John Doe" 
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-mono">Your Email <span className="text-primary" aria-label="required">*</span></label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                    aria-required="true"
                                    className="w-full bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white dark:focus:bg-slate-700 transition-all outline-none placeholder-gray-400 dark:placeholder-gray-500 shadow-inner" 
                                    placeholder="john@example.com" 
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-mono">Message <span className="text-primary" aria-label="required">*</span></label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    required 
                                    aria-required="true"
                                    rows="5" 
                                    className="w-full bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white dark:focus:bg-slate-700 transition-all outline-none placeholder-gray-400 dark:placeholder-gray-500 shadow-inner resize-none" 
                                    placeholder="How can I help you?"
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                disabled={status.submitting} 
                                className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-indigo-600 hover:to-indigo-800 text-white font-bold py-4 px-8 rounded-2xl flex justify-center items-center transition-all duration-300 shadow-xl shadow-indigo-200 dark:shadow-indigo-900/30 transform hover:-translate-y-1 hover:shadow-2xl disabled:opacity-70 disabled:hover:translate-y-0 text-lg group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:focus-visible:ring-offset-darkCard"
                                aria-disabled={status.submitting}
                            >
                                {status.submitting ? 'Sending...' : <><span className="mr-3">Send Message</span> <FaPaperPlane className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true" /></>}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </SectionContainer>
    );
};

export default Contact;
