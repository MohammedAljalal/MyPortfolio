import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import useFetchData from './hooks/useFetchData';
import { Helmet } from 'react-helmet-async';

// Lazy loaded components for performance
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Education = lazy(() => import('./components/Education'));
const Projects = lazy(() => import('./components/Projects'));
const Certificates = lazy(() => import('./components/Certificates'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
    const { data: personalInfo, loading } = useFetchData('/personal', null);

    if (loading && !personalInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-darkBg">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    const fallbackInfo = personalInfo || { fullName: 'Developer', bio: '', title: '' };

    return (
        <div className="min-h-screen flex flex-col selection:bg-primary selection:text-white bg-gray-50 dark:bg-darkBg transition-colors duration-300 relative">
            <Helmet>
                <title>{fallbackInfo.fullName ? `${fallbackInfo.fullName} | Portfolio` : 'Portfolio'}</title>
                <meta name="description" content={fallbackInfo.bio || 'Full stack developer portfolio'} />
                {/* Dynamically set theme color based on dark mode preference if needed, handled in index.css generally */}
            </Helmet>

            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-primary text-white rounded-md shadow-lg outline-none ring-2 ring-offset-2 ring-primary">
                Skip to main content
            </a>

            <Navbar info={fallbackInfo} />
            
            <main id="main-content" className="flex-grow w-full focus:outline-none" tabIndex="-1">
                <ErrorBoundary>
                    <Suspense fallback={
                        <div className="min-h-screen flex items-center justify-center dark:bg-darkBg">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" aria-label="Loading content..."></div>
                        </div>
                    }>
                        <Hero info={fallbackInfo} />
                        <About info={fallbackInfo} />
                        <Skills />
                        <Experience />
                        <Education />
                        <Projects />
                        <Certificates />
                        <Testimonials />
                        <Contact info={fallbackInfo} />
                    </Suspense>
                </ErrorBoundary>
            </main>
            
            <Footer info={fallbackInfo} />
        </div>
    );
}

export default App;
