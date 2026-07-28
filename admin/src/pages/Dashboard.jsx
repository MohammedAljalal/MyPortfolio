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
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    const statCards = [
        { title: 'Total Projects', value: stats.projects, icon: <FaProjectDiagram />, color: 'bg-blue-500' },
        { title: 'Skills Published', value: stats.skills, icon: <FaTools />, color: 'bg-emerald-500' },
        { title: 'Experience Roles', value: stats.experience, icon: <FaBriefcase />, color: 'bg-purple-500' },
        { title: 'Unread Messages', value: stats.unreadMessages, icon: <FaEnvelope />, color: 'bg-orange-500' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((card, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6 flex items-center border border-gray-100 hover:shadow-md transition-shadow">
                        <div className={`p-4 rounded-full text-white ${card.color} mr-5`}>
                            <div className="text-2xl">{card.icon}</div>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium mb-1">{card.title}</p>
                            <h3 className="text-3xl font-bold text-gray-800">{card.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Welcome back to DevPanel</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                    This is your central command center. From here, you can manage your projects, update your technical skills, add new job experience, and respond to incoming contact messages from potential employers or clients.
                </p>
                <div className="bg-indigo-50 text-indigo-700 p-4 rounded-lg flex items-start">
                    <FaEnvelope className="mt-1 mr-3 flex-shrink-0" />
                    <p className="text-sm">You have <strong>{stats.unreadMessages}</strong> unread messages. Head over to the Messages section to engage with your audience!</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
