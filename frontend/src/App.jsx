import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import api from './utils/api';

function App() {
    const [personalInfo, setPersonalInfo] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const res = await api.get('/personal');
                setPersonalInfo(res.data);
            } catch (err) {
                console.error('Error fetching personal info', err);
            }
        };
        fetchInfo();
    }, []);

    return (
        <div className="min-h-screen flex flex-col selection:bg-primary selection:text-white bg-gray-50 dark:bg-darkBg text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Navbar info={personalInfo} theme={theme} toggleTheme={toggleTheme} />
            <main className="flex-grow">
                <Hero info={personalInfo} />
                <About info={personalInfo} />
                <Skills />
                <Projects />
                <Experience />
                <Contact info={personalInfo} />
            </main>
            <Footer info={personalInfo} />
            <FloatingContact info={personalInfo} />
        </div>
    );
}

export default App;
