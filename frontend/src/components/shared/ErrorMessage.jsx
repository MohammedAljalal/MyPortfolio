import React from 'react';
import { motion } from 'framer-motion';

const ErrorMessage = ({ message, onRetry }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-8 text-center bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl max-w-lg mx-auto"
        >
            <div className="text-4xl mb-4">⚠️</div>
            <h4 className="text-xl font-bold text-red-800 dark:text-red-400 mb-2">Oops! Something went wrong.</h4>
            <p className="text-red-600 dark:text-red-300 mb-6">{message || 'Failed to load data.'}</p>
            {onRetry && (
                <button 
                    onClick={onRetry}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                >
                    Try Again
                </button>
            )}
        </motion.div>
    );
};

export default ErrorMessage;
