import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaSignOutAlt, FaUserCircle, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ toggleSidebar }) => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="h-16 bg-lightCard shadow-sm border-b border-lightBorder flex items-center justify-between px-4 md:px-8 z-10 w-full relative">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="mr-4 text-lightMuted hover:text-primary focus:outline-none md:hidden text-xl transition-colors">
                    <FaBars />
                </button>
                <div className="text-lg md:text-xl font-bold text-lightText font-mono tracking-tight">
                    Admin Dashboard
                </div>
            </div>
            <div className="flex items-center space-x-3 md:space-x-6">
                <div className="hidden md:flex items-center text-lightText bg-amber-50 py-1.5 px-3 rounded-full border border-amber-200/50 shadow-inner">
                    <FaUserCircle className="mr-2 text-primary text-lg" />
                    <span className="font-semibold text-sm tracking-wide">{user?.name || 'Administrator'}</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center text-sm font-semibold text-lightMuted hover:text-red-600 transition-colors bg-amber-50 md:bg-transparent px-3 py-1.5 md:p-0 rounded-full md:rounded-none border border-amber-200/50 md:border-transparent shadow-inner md:shadow-none"
                >
                    <FaSignOutAlt className="md:mr-1.5" /> <span className="hidden md:inline">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Topbar;
