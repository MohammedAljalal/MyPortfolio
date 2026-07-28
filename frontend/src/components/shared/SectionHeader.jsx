import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ eyebrow, title, gradientColors = "from-primary to-secondary" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
        >
            {eyebrow && (
                <h2 className={`text-sm font-bold uppercase tracking-widest mb-2 font-mono ${gradientColors.includes('secondary') ? 'text-secondary' : 'text-primary'}`}>
                    {eyebrow}
                </h2>
            )}
            <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {title}
            </h3>
            <div className={`w-24 h-1.5 bg-gradient-to-r ${gradientColors} mx-auto mt-6 rounded-full`}></div>
        </motion.div>
    );
};

export default SectionHeader;
