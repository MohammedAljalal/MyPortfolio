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

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Contact Messages</h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {messages.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">No messages found.</div>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {messages.map(msg => (
                            <li key={msg._id} className={`p-6 transition-colors ${!msg.isRead ? 'bg-indigo-50 hover:bg-indigo-100/50' : 'bg-white hover:bg-gray-50'}`}>
                                <div className="flex justify-between items-start">
                                    <div className="flex items-start flex-1 min-w-0 pr-6">
                                        <button onClick={() => !msg.isRead && markAsRead(msg._id)} className={`mr-4 mt-1 transition-colors ${!msg.isRead ? 'text-indigo-600 hover:text-indigo-800' : 'text-gray-300'}`} title={!msg.isRead ? "Mark as read" : "Read"}>
                                            {!msg.isRead ? <FaCircle /> : <FaCheckCircle className="text-xl" />}
                                        </button>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{msg.name} <span className="font-normal text-gray-500 ml-2">&lt;{msg.email}&gt;</span></h3>
                                            <p className="text-xs text-gray-500 mb-3">{new Date(msg.createdAt).toLocaleString()}</p>
                                            <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
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
