import React from 'react';

const SectionContainer = ({ id, className = '', bg = 'bg-white dark:bg-darkCard', children }) => {
    return (
        <section id={id} className={`py-20 md:py-32 transition-colors duration-300 relative overflow-hidden ${bg} ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {children}
            </div>
        </section>
    );
};

export default SectionContainer;
