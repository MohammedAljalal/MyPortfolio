import React from 'react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-darkBg text-center px-4">
            <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 drop-shadow-sm">
                404
            </h1>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Page Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-md text-lg">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <a 
                href="/" 
                className="px-8 py-3.5 bg-primary hover:bg-indigo-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20"
            >
                Return Home
            </a>
        </div>
    );
};

export default NotFound;
