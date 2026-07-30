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
        <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-darkCard text-white flex flex-col transition-transform duration-300 transform md:relative md:translate-x-0 border-r border-darkBorder ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-6 text-2xl font-bold border-b border-darkBorder flex justify-between items-center tracking-wider font-mono">
                <div><span className="text-primary">DEV</span>PANEL</div>
                <button onClick={closeSidebar} className="md:hidden text-gray-400 hover:text-white transition-colors">
                    <FaTimes />
                </button>
            </div>
            <nav className="flex-1 mt-6 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-800">
                <ul>
                    {links.map((link) => (
                        <li key={link.name} className="mb-2">
                            <NavLink
                                to={link.path}
                                onClick={() => { if(window.innerWidth < 768) closeSidebar() }}
                                className={({ isActive }) =>
                                    `flex items-center px-6 py-3 transition-all duration-200 border-l-4 ${isActive
                                        ? 'bg-black/40 text-primary border-primary font-medium shadow-inner'
                                        : 'border-transparent text-gray-400 hover:bg-black/20 hover:text-primary-light hover:border-darkBorder'
                                    }`
                                }
                            >
                                <span className="mr-3 text-lg opacity-90">{link.icon}</span>
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
