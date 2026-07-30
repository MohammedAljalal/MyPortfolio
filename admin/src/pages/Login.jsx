import React, { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaLock, FaEnvelope } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (user) {
        return <Navigate to="/" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-lightBg flex flex-col justify-center items-center relative overflow-hidden">
            {/* Background ambient glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-blob" aria-hidden="true"></div>
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary-light rounded-full mix-blend-multiply filter blur-[100px] opacity-15 animate-pulse-slow" aria-hidden="true"></div>

            <div className="bg-lightCard p-10 rounded-2xl shadow-xl shadow-amber-900/5 w-full max-w-md border border-lightBorder relative z-10">
                <div className="text-center mb-10">
                    <div className="text-4xl font-black text-lightText tracking-tight mb-2 font-mono">
                        <span className="text-primary">DEV</span>PANEL
                    </div>
                    <p className="text-lightMuted mt-2 text-sm font-medium tracking-wide uppercase">Sign in to manage your portfolio</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 text-sm flex items-center border border-red-200 shadow-sm">
                        <span className="font-bold mr-2 text-xl">⚠️</span> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary">
                            <FaEnvelope />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 bg-amber-50/50 border border-amber-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all text-lightText placeholder-amber-900/30 shadow-inner"
                            placeholder="Email address"
                            required
                        />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary">
                            <FaLock />
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 bg-amber-50/50 border border-amber-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all text-lightText placeholder-amber-900/30 shadow-inner"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full font-bold py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary text-lg"
                        style={{background:'linear-gradient(135deg, #c8a86b, #a88c4f)', color:'#0c0c0c', boxShadow:'0 8px 24px rgba(200,168,107,0.3)'}}
                        onMouseEnter={e => e.currentTarget.style.background='linear-gradient(135deg, #dfc090, #c8a86b)'}
                        onMouseLeave={e => e.currentTarget.style.background='linear-gradient(135deg, #c8a86b, #a88c4f)'}
                    >
                        Sign In to Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
