import React, { useState, useRef, useCallback } from 'react';

/**
 * A lightweight, custom Pull-to-Refresh that works reliably on mobile
 * without interfering with React's ErrorBoundary.
 */
const PullToRefresh = ({ children, onRefresh }) => {
    const [pulling, setPulling] = useState(false);
    const [releasing, setReleasing] = useState(false);
    const [pullDistance, setPullDistance] = useState(0);
    const startY = useRef(null);
    const threshold = 80;

    const handleTouchStart = useCallback((e) => {
        // Only start pull if at top of page
        if (window.scrollY === 0) {
            startY.current = e.touches[0].clientY;
        } else {
            startY.current = null;
        }
    }, []);

    const handleTouchMove = useCallback((e) => {
        if (startY.current === null) return;
        const delta = e.touches[0].clientY - startY.current;
        if (delta > 0) {
            setPulling(true);
            setPullDistance(Math.min(delta, threshold + 30));
        }
    }, [threshold]);

    const handleTouchEnd = useCallback(async () => {
        if (!pulling) return;
        if (pullDistance >= threshold) {
            setReleasing(true);
            setPullDistance(threshold);
            await onRefresh?.();
            setReleasing(false);
        }
        setPulling(false);
        setPullDistance(0);
        startY.current = null;
    }, [pulling, pullDistance, threshold, onRefresh]);

    const progress = Math.min(pullDistance / threshold, 1);
    const showIndicator = pulling || releasing;

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ position: 'relative' }}
        >
            {/* Pull indicator */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: '50%',
                    transform: `translateX(-50%) translateY(${showIndicator ? Math.min(pullDistance - 20, 60) : -80}px)`,
                    transition: releasing ? 'transform 0.3s ease' : 'none',
                    zIndex: 9999,
                    pointerEvents: 'none',
                }}
            >
                <div style={{
                    background: 'linear-gradient(135deg,#c8a86b,#a88c4f)',
                    borderRadius: '50%',
                    width: 44,
                    height: 44,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(200,168,107,0.5)',
                }}>
                    {releasing ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0c0c0c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 0.7s linear infinite' }}>
                            <path d="M21 12a9 9 0 1 1-9-9 9 9 0 0 1 6.28 2.58L21 3" />
                        </svg>
                    ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0c0c0c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                            style={{ transform: `rotate(${progress * 180}deg)`, transition: 'transform 0.1s' }}>
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <polyline points="19 12 12 19 5 12" />
                        </svg>
                    )}
                </div>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            {children}
        </div>
    );
};

export default PullToRefresh;
