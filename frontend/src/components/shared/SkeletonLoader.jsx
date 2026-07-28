import React from 'react';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
    const renderSkeleton = (key) => {
        switch (type) {
            case 'card':
                return (
                    <div key={key} className="bg-white dark:bg-darkCard p-8 rounded-3xl shadow-md border border-gray-100 dark:border-gray-800 animate-pulse">
                        <div className="flex items-center mb-8">
                            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-2xl mr-5"></div>
                            <div className="space-y-3 flex-1">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                        </div>
                    </div>
                );
            case 'text':
                return (
                    <div key={key} className="space-y-3 animate-pulse">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                    </div>
                );
            default:
                return (
                    <div key={key} className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                );
        }
    };

    return (
        <>
            {Array(count).fill(0).map((_, idx) => renderSkeleton(idx))}
        </>
    );
};

export default SkeletonLoader;
