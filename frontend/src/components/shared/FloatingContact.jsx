import React, { useState } from 'react';
import { FaWhatsapp, FaPhoneAlt, FaCommentDots, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingContact = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Replace with your actual numbers
    const whatsappNumber = "1234567890";
    const phoneNumber = "+1234567890";
    const message = encodeURIComponent("Hello, I'm interested in your portfolio!");
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    const callUrl = `tel:${phoneNumber}`;

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex flex-col items-center gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col gap-3"
                    >
                        {/* Call Button */}
                        <a
                            href={callUrl}
                            className="group flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-colors relative"
                            aria-label="Call me"
                        >
                            <FaPhoneAlt className="w-5 h-5" />
                            <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
                                Direct Call
                            </span>
                        </a>

                        {/* WhatsApp Button */}
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1ebd5a] transition-colors relative"
                            aria-label="WhatsApp me"
                        >
                            <FaWhatsapp className="w-6 h-6" />
                            <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs font-semibold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
                                WhatsApp
                            </span>
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <motion.button
                onClick={toggleMenu}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full text-[#0c0c0c] shadow-[0_4px_20px_0_rgba(200,168,107,0.4)] focus:outline-none"
                style={{
                    background: 'linear-gradient(135deg, #dfc090, #c8a86b)'
                }}
                aria-label="Contact options"
            >
                {/* Pulse animation rings */}
                {!isOpen && (
                    <>
                        <span className="absolute w-full h-full rounded-full bg-primary opacity-40 animate-ping" style={{ animationDuration: '2s' }}></span>
                        <span className="absolute w-[120%] h-[120%] rounded-full border border-primary opacity-20 animate-pulse"></span>
                    </>
                )}
                
                <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {isOpen ? <FaTimes className="w-6 h-6 md:w-7 md:h-7" /> : <FaCommentDots className="w-6 h-6 md:w-7 md:h-7" />}
                </motion.div>
            </motion.button>
        </div>
    );
};

export default FloatingContact;
