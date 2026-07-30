import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ eyebrow, title, gradientColors = "from-primary to-primary-light" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
        >
            {eyebrow && (
                <p className="text-xs font-bold uppercase tracking-widest mb-3 font-mono text-primary">
                    {eyebrow}
                </p>
            )}
            <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-lightText dark:text-darkText">
                {title}
            </h3>
            <div className="w-16 h-0.5 mx-auto mt-5 rounded-full" style={{background:'linear-gradient(to right, #c8a86b, #dfc090)'}}></div>
        </motion.div>
    );
};

export default SectionHeader;
