import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaTools, FaBriefcase, FaEnvelope, FaUser } from 'react-icons/fa';

const Sidebar = () => {
    const links = [
        { name: 'Dashboard', path: '/', icon: <FaHome /> },
        { name: 'Projects', path: '/projects', icon: <FaProjectDiagram /> },
        { name: 'Skills', path: '/skills', icon: <FaTools /> },
        { name: 'Experience', path: '/experience', icon: <FaBriefcase /> },
        { name: 'Messages', path: '/messages', icon: <FaEnvelope /> },
        { name: 'Personal Info', path: '/personal', icon: <FaUser /> },
    ];

    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col min-h-screen">
            <div className="p-6 text-2xl font-bold border-b border-gray-800 text-center tracking-wider font-mono">
                <span className="text-indigo-400">DEV</span>PANEL
            </div>
            <nav className="flex-1 mt-6">
                <ul>
                    {links.map((link) => (
                        <li key={link.name} className="mb-2">
                            <NavLink
                                to={link.path}
                                className={({ isActive }) =>
                                    `flex items-center px-6 py-3 transition-all duration-200 border-l-4 ${isActive
                                        ? 'bg-gray-800 text-indigo-400 border-indigo-400 font-medium'
                                        : 'border-transparent text-gray-400 hover:bg-gray-800 hover:text-white hover:border-gray-600'
                                    }`
                                }
                            >
                                <span className="mr-3 text-lg opacity-80">{link.icon}</span>
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
