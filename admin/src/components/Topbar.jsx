import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-8 z-10 w-full relative">
            <div className="text-xl font-semibold text-gray-800">
                Admin Dashboard
            </div>
            <div className="flex items-center space-x-6">
                <div className="flex items-center text-gray-700 bg-gray-100 py-1.5 px-3 rounded-full">
                    <FaUserCircle className="mr-2 text-indigo-500 text-lg" />
                    <span className="font-medium text-sm">{user?.name || 'Administrator'}</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                >
                    <FaSignOutAlt className="mr-1.5" /> Logout
                </button>
            </div>
        </div>
    );
};

export default Topbar;
