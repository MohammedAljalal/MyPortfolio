import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Messages from './pages/Messages';
import PersonalInfo from './pages/PersonalInfo';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="skills" element={<Skills />} />
                        <Route path="experience" element={<Experience />} />
                        <Route path="messages" element={<Messages />} />
                        <Route path="personal" element={<PersonalInfo />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
