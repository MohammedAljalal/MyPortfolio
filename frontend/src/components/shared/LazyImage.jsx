import React, { useState, useEffect } from 'react';

const LazyImage = ({ src, alt, className = '', fallbackSrc = '' }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        // Reset state when src changes
        setIsLoaded(false);
        setHasError(false);
        setImageSrc(src);
    }, [src]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleError = () => {
        setHasError(true);
        if (fallbackSrc) {
            setImageSrc(fallbackSrc);
        }
    };

    return (
        <div className={`relative overflow-hidden ${className} ${!isLoaded ? 'bg-gray-200 dark:bg-gray-700 animate-pulse' : ''}`}>
            <img
                src={imageSrc}
                alt={alt}
                loading="lazy"
                onLoad={handleLoad}
                onError={handleError}
                className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${hasError && !fallbackSrc ? 'hidden' : ''}`}
            />
            {hasError && !fallbackSrc && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm font-medium">
                    Image Not Found
                </div>
            )}
        </div>
    );
};

export default LazyImage;
