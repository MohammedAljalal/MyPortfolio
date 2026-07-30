import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { FaTrash, FaCheckCircle, FaCircle } from 'react-icons/fa';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchMessages(); }, []);

    const fetchMessages = async () => {
        try {
            const res = await api.get('/contact');
            setMessages(res.data);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const markAsRead = async (id) => {
        try {
            await api.put(`/contact/${id}`);
            fetchMessages();
        } catch (err) { console.error(err); }
    };

    const deleteMessage = async (id) => {
        if (window.confirm('Delete this message?')) {
            try {
                await api.delete(`/contact/${id}`);
                fetchMessages();
            } catch (err) { console.error(err); }
        }
    };

    if (loading) return <div className="p-10 text-center text-lightMuted">Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-lightText mb-6">Contact Messages</h1>
            <div className="bg-lightCard rounded-2xl shadow-sm border border-lightBorder overflow-hidden">
                {messages.length === 0 ? (
                    <div className="p-10 text-center text-lightMuted">No messages found.</div>
                ) : (
                    <ul className="divide-y divide-amber-200/40">
                        {messages.map(msg => (
                            <li key={msg._id} className={`p-4 md:p-6 transition-colors ${!msg.isRead ? 'bg-amber-50/70 hover:bg-amber-50' : 'bg-transparent hover:bg-amber-50/30'}`}>
                                <div className="flex justify-between items-start">
                                    <div className="flex items-start flex-1 min-w-0 pr-4 md:pr-6">
                                        <button onClick={() => !msg.isRead && markAsRead(msg._id)} className={`mr-3 md:mr-4 mt-1 transition-colors ${!msg.isRead ? 'text-primary hover:text-primary-dark' : 'text-amber-200/60'}`} title={!msg.isRead ? "Mark as read" : "Read"}>
                                            {!msg.isRead ? <FaCircle /> : <FaCheckCircle className="text-xl" />}
                                        </button>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-lightText truncate">
                                                {msg.name} 
                                                <span className="block md:inline font-normal text-lightMuted md:ml-2 truncate opacity-80">&lt;{msg.email}&gt;</span>
                                            </h3>
                                            <p className="text-xs text-primary-dark font-medium mb-3">{new Date(msg.createdAt).toLocaleString()}</p>
                                            <p className="text-sm md:text-base text-lightMuted whitespace-pre-wrap break-words">{msg.message}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => deleteMessage(msg._id)} className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors flex-shrink-0" title="Delete message"><FaTrash /></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Messages;
