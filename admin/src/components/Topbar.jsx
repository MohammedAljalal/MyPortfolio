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
        <div className="h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-4 md:px-8 z-10 w-full relative">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="mr-4 text-gray-600 hover:text-indigo-600 focus:outline-none md:hidden text-xl">
                    <FaBars />
                </button>
                <div className="text-lg md:text-xl font-semibold text-gray-800">
                    Admin Dashboard
                </div>
            </div>
            <div className="flex items-center space-x-3 md:space-x-6">
                <div className="hidden md:flex items-center text-gray-700 bg-gray-100 py-1.5 px-3 rounded-full">
                    <FaUserCircle className="mr-2 text-indigo-500 text-lg" />
                    <span className="font-medium text-sm">{user?.name || 'Administrator'}</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center text-sm font-medium text-gray-600 hover:text-red-600 transition-colors bg-gray-100 md:bg-transparent px-3 py-1.5 md:p-0 rounded-full md:rounded-none"
                >
                    <FaSignOutAlt className="md:mr-1.5" /> <span className="hidden md:inline">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Topbar;
