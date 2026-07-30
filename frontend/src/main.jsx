import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,   // 5 minutes — data is considered fresh
            gcTime: 1000 * 60 * 30,      // 30 minutes — cache kept in memory
            refetchOnWindowFocus: false,  // Don't refetch on tab switch
            retry: 2,
        },
    },
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </QueryClientProvider>
    </React.StrictMode>,
)
