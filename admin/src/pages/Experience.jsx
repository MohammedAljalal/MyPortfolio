import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Experience = () => {
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ company: '', role: '', duration: '', description: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => { fetchExperience(); }, []);

    const fetchExperience = async () => {
        try {
            const res = await api.get('/experience');
            setExperience(res.data);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/experience/${editingId}`, formData);
            } else {
                await api.post('/experience', formData);
            }
            fetchExperience();
            closeModal();
        } catch (err) { console.error(err); }
    };

    const editExperience = (exp) => {
        setFormData({ company: exp.company, role: exp.role, duration: exp.duration, description: exp.description });
        setEditingId(exp._id);
        setShowModal(true);
    };

    const deleteExperience = async (id) => {
        if (window.confirm('Delete this experience?')) {
            try {
                await api.delete(`/experience/${id}`);
                fetchExperience();
            } catch (err) { console.error(err); }
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData({ company: '', role: '', duration: '', description: '' });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Experience</h1>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700">
                    <FaPlus className="mr-2" /> Add Experience
                </button>
            </div>

            <div className="space-y-4">
                {experience.map(exp => (
                    <div key={exp._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between hover:shadow-md transition-shadow">
                        <div className="flex-1 pr-6">
                            <h2 className="text-xl font-bold text-gray-800">{exp.role} <span className="text-gray-400 font-normal">at</span> {exp.company}</h2>
                            <p className="text-indigo-600 font-medium mb-3 mt-1 text-sm">{exp.duration}</p>
                            <p className="text-gray-600 whitespace-pre-wrap">{exp.description}</p>
                        </div>
                        <div className="flex flex-col space-y-3 ml-4 flex-shrink-0">
                            <button onClick={() => editExperience(exp)} className="text-indigo-600 hover:text-indigo-800 bg-indigo-50 p-2.5 rounded-full"><FaEdit /></button>
                            <button onClick={() => deleteExperience(exp._id)} className="text-red-600 hover:text-red-800 bg-red-50 p-2.5 rounded-full"><FaTrash /></button>
                        </div>
                    </div>
                ))}
                {experience.length === 0 && <div className="text-center text-gray-500 py-10 bg-white rounded-xl">No experience listed yet.</div>}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative z-10 shadow-xl">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">{editingId ? 'Edit Experience' : 'Add Experience'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                <input type="text" name="company" value={formData.company} onChange={handleInputChange} required className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role / Title</label>
                                <input type="text" name="role" value={formData.role} onChange={handleInputChange} required className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (e.g. Sept 2021 - Present)</label>
                                <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} required className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="5" className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                            </div>
                            <div className="mt-8 flex justify-end space-x-3">
                                <button type="button" onClick={closeModal} className="px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Experience;
