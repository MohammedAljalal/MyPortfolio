import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { FaPaperPlane, FaWhatsapp, FaLinkedin, FaEnvelope } from 'react-icons/fa';

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
            setStatus({ submitting: false, success: false, error: 'Failed to send message. Please try again later.' });
        }
    };

    return (
        <section id="contact" className="py-20 md:py-32 bg-white dark:bg-darkBg transition-colors duration-300 relative overflow-hidden">
            <div className="absolute left-0 bottom-0 w-full h-80 bg-gradient-to-t from-primary/5 to-transparent z-0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2 font-mono">Let's Connect</h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Get In Touch</h3>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full"></div>
                </motion.div>

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
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-[2] duration-700 ease-out z-0"></div>
                            <h5 className="font-bold text-gray-900 dark:text-white text-xl mb-6 relative z-10 font-mono tracking-tight">Direct Contact</h5>
                            <div className="space-y-4 relative z-10">
                                {info?.contactInfo?.whatsapp && (
                                    <a href={`https://wa.me/${info.contactInfo.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-all group shadow-sm hover:shadow-md">
                                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                            <FaWhatsapp size={24} />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">WhatsApp</p>
                                            <p className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Message Me</p>
                                        </div>
                                    </a>
                                )}
                                {info?.socialLinks?.linkedin && (
                                    <a href={info.socialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all group shadow-sm hover:shadow-md">
                                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <FaLinkedin size={24} />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">LinkedIn</p>
                                            <p className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Connect With Me</p>
                                        </div>
                                    </a>
                                )}
                                <div className="flex items-center p-4 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                                        <FaEnvelope size={20} />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">Email</p>
                                        <p className="font-semibold text-gray-900 dark:text-white truncate max-w-[200px] hover:text-indigo-600 transition-colors hover:cursor-text select-all">{info?.contactInfo?.email || 'hello@portfolio.com'}</p>
                                    </div>
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
                            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-secondary"></div>
                            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-100 dark:border-gray-800 pb-6 ml-2">Drop a Message</h4>

                            {status.success && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl flex items-center shadow-sm ml-2">
                                    <span className="mr-3 text-2xl">🎉</span> <span className="font-medium">Message sent successfully! I'll get back to you soon.</span>
                                </motion.div>
                            )}
                            {status.error && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl flex items-center shadow-sm ml-2">
                                    <span className="mr-3 text-2xl">⚠️</span> <span className="font-medium">{status.error}</span>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6 ml-2">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-mono">Your Name</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white dark:focus:bg-slate-700 transition-all outline-none placeholder-gray-400 dark:placeholder-gray-500 shadow-inner" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-mono">Your Email</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white dark:focus:bg-slate-700 transition-all outline-none placeholder-gray-400 dark:placeholder-gray-500 shadow-inner" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 font-mono">Message</label>
                                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="5" className="w-full bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl p-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white dark:focus:bg-slate-700 transition-all outline-none placeholder-gray-400 dark:placeholder-gray-500 shadow-inner resize-none" placeholder="How can I help you?"></textarea>
                                </div>
                                <button type="submit" disabled={status.submitting} className="w-full bg-gradient-to-r from-primary to-indigo-600 hover:from-indigo-600 hover:to-indigo-800 text-white font-bold py-4 px-8 rounded-2xl flex justify-center items-center transition-all duration-300 shadow-xl shadow-indigo-200 dark:shadow-indigo-900/30 transform hover:-translate-y-1 hover:shadow-2xl disabled:opacity-70 disabled:hover:translate-y-0 text-lg group">
                                    {status.submitting ? 'Sending...' : <><span className="mr-3">Send Message</span> <FaPaperPlane className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
