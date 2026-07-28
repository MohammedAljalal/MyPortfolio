import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaTools, FaBriefcase, FaEnvelope, FaUser, FaGraduationCap, FaCertificate, FaQuoteLeft, FaTimes } from 'react-icons/fa';

const Sidebar = ({ isOpen, closeSidebar }) => {
    const links = [
        { name: 'Dashboard', path: '/', icon: <FaHome /> },
        { name: 'Projects', path: '/projects', icon: <FaProjectDiagram /> },
        { name: 'Skills', path: '/skills', icon: <FaTools /> },
        { name: 'Experience', path: '/experience', icon: <FaBriefcase /> },
        { name: 'Education', path: '/education', icon: <FaGraduationCap /> },
        { name: 'Certificates', path: '/certificates', icon: <FaCertificate /> },
        { name: 'Testimonials', path: '/testimonials', icon: <FaQuoteLeft /> },
        { name: 'Messages', path: '/messages', icon: <FaEnvelope /> },
        { name: 'Personal Info', path: '/personal', icon: <FaUser /> },
    ];

    return (
        <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white flex flex-col transition-transform duration-300 transform md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-6 text-2xl font-bold border-b border-gray-800 flex justify-between items-center tracking-wider font-mono">
                <div><span className="text-indigo-400">DEV</span>PANEL</div>
                <button onClick={closeSidebar} className="md:hidden text-gray-400 hover:text-white">
                    <FaTimes />
                </button>
            </div>
            <nav className="flex-1 mt-6 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-700">
                <ul>
                    {links.map((link) => (
                        <li key={link.name} className="mb-2">
                            <NavLink
                                to={link.path}
                                onClick={() => { if(window.innerWidth < 768) closeSidebar() }}
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
