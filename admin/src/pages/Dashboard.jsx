import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { FaProjectDiagram, FaTools, FaEnvelope, FaBriefcase } from 'react-icons/fa';

const Dashboard = () => {
    const [stats, setStats] = useState({
        projects: 0,
        skills: 0,
        experience: 0,
        messages: 0,
        unreadMessages: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [projectsRes, skillsRes, experienceRes, messagesRes] = await Promise.all([
                    api.get('/projects'),
                    api.get('/skills'),
                    api.get('/experience'),
                    api.get('/contact'),
                ]);

                const messages = messagesRes.data;
                const unread = messages.filter(m => !m.isRead).length;

                setStats({
                    projects: projectsRes.data.length,
                    skills: skillsRes.data.length,
                    experience: experienceRes.data.length,
                    messages: messages.length,
                    unreadMessages: unread,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    const statCards = [
        { title: 'Total Projects', value: stats.projects, icon: <FaProjectDiagram />, gradient: 'linear-gradient(135deg, #c8a86b, #dfc090)' },
        { title: 'Skills Published', value: stats.skills, icon: <FaTools />, gradient: 'linear-gradient(135deg, #dfc090, #c8a86b)' },
        { title: 'Experience Roles', value: stats.experience, icon: <FaBriefcase />, gradient: 'linear-gradient(135deg, #a88c4f, #c8a86b)' },
        { title: 'Unread Messages', value: stats.unreadMessages, icon: <FaEnvelope />, gradient: 'linear-gradient(135deg, #c8a86b, #b8923a)' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-extrabold text-lightText mb-8 tracking-tight">Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((card, index) => (
                    <div key={index} className="bg-lightCard rounded-2xl shadow-sm p-6 flex items-center border border-lightBorder hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <div className="p-4 rounded-xl text-[#0c0c0c] mr-5 shadow-inner" style={{background: card.gradient}}>
                            <div className="text-2xl">{card.icon}</div>
                        </div>
                        <div>
                            <p className="text-lightMuted text-sm font-bold uppercase tracking-wider mb-1">{card.title}</p>
                            <h3 className="text-3xl font-black text-lightText">{card.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-lightCard rounded-2xl shadow-sm p-8 border border-lightBorder relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150" aria-hidden="true"></div>
                
                <h2 className="text-2xl font-bold text-lightText mb-4 relative z-10">Welcome back to DevPanel</h2>
                <p className="text-lightMuted mb-6 leading-relaxed max-w-4xl relative z-10 text-lg">
                    This is your central command center. From here, you can manage your projects, update your technical skills, add new job experience, and respond to incoming contact messages from potential employers or clients.
                </p>
                <div className="bg-amber-50/80 border border-amber-200 text-lightText p-5 rounded-xl flex items-start shadow-inner relative z-10">
                    <div className="text-primary mt-0.5 mr-4 flex-shrink-0 text-xl">
                        <FaEnvelope />
                    </div>
                    <p className="text-base font-medium">You have <strong className="text-primary text-xl font-black mx-1">{stats.unreadMessages}</strong> unread messages. Head over to the Messages section to engage with your audience!</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
