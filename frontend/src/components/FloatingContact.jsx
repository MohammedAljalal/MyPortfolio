import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaFacebook, FaLinkedin, FaPhoneAlt, FaEnvelope, FaCommentDots, FaTimes } from 'react-icons/fa';

const FloatingContact = ({ info }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!info) return null;

    const contacts = [
        {
            name: 'WhatsApp',
            icon: <FaWhatsapp size={20} />,
            url: info.contactInfo?.whatsapp ? `https://wa.me/${info.contactInfo.whatsapp.replace(/\D/g, '')}` : null,
            color: 'bg-green-500 hover:bg-green-600',
        },
        {
            name: 'Facebook',
            icon: <FaFacebook size={20} />,
            url: info.socialLinks?.facebook,
            color: 'bg-blue-600 hover:bg-blue-700',
        },
        {
            name: 'LinkedIn',
            icon: <FaLinkedin size={20} />,
            url: info.socialLinks?.linkedin,
            color: 'bg-blue-500 hover:bg-blue-600',
        },
        {
            name: 'Phone',
            icon: <FaPhoneAlt size={18} />,
            url: info.contactInfo?.phone ? `tel:${info.contactInfo.phone}` : null,
            color: 'bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500',
        },
        {
            name: 'Email',
            icon: <FaEnvelope size={18} />,
            url: info.contactInfo?.email ? `mailto:${info.contactInfo.email}` : null,
            color: 'bg-red-500 hover:bg-red-600',
        }
    ].filter(contact => contact.url);

    if (contacts.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8, transition: { duration: 0.2 } }}
                        className="flex flex-col gap-3 mb-4 items-end"
                    >
                        {contacts.map((contact, i) => (
                            <motion.a
                                key={contact.name}
                                href={contact.url}
                                target="_blank"
                                rel="noreferrer"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: i * 0.05 }}
                                className={`flex items-center gap-3 group`}
                            >
                                <span className="glass px-3 py-1.5 rounded-lg text-sm font-medium text-gray-800 dark:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm">
                                    {contact.name}
                                </span>
                                <div className={`w-12 h-12 flex items-center justify-center rounded-full text-white shadow-lg transform hover:scale-110 transition-transform ${contact.color}`}>
                                    {contact.icon}
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl text-white transition-colors duration-300 z-50 ${isOpen ? 'bg-gray-800 dark:bg-gray-600' : 'bg-primary hover:bg-indigo-600'}`}
            >
                {isOpen ? <FaTimes size={24} /> : <FaCommentDots size={24} />}
            </motion.button>
        </div>
    );
};

export default FloatingContact;
