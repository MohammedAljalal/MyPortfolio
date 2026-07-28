import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-darkBg w-full">
                    <div className="text-5xl mb-6">💥</div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Something went wrong</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
                        The component encountered an unexpected error. Try refreshing the page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-primary hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm"
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
