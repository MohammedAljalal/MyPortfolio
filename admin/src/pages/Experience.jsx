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

    if (loading) return <div className="p-10 text-center text-lightMuted">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-lightText">Experience</h1>
                <button onClick={() => setShowModal(true)} className="text-[#0c0c0c] font-bold px-5 py-2.5 rounded-xl flex items-center shadow-md hover:-translate-y-0.5 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-primary" style={{background:'linear-gradient(135deg, #c8a86b, #a88c4f)'}}>
                    <FaPlus className="mr-2" /> Add Experience
                </button>
            </div>

            <div className="space-y-4">
                {experience.map(exp => (
                    <div key={exp._id} className="bg-lightCard p-6 rounded-2xl shadow-sm border border-lightBorder flex flex-col md:flex-row justify-between hover:shadow-md transition-shadow">
                        <div className="flex-1 pr-0 md:pr-6">
                            <h2 className="text-lg md:text-xl font-bold text-lightText">{exp.role} <span className="text-lightMuted font-normal italic">at</span> {exp.company}</h2>
                            <p className="text-primary-dark font-bold mb-3 mt-1.5 text-sm uppercase tracking-wide bg-primary/10 inline-block px-3 py-1 rounded border border-primary/20">{exp.duration}</p>
                            <p className="text-sm md:text-base text-lightMuted whitespace-pre-wrap">{exp.description}</p>
                        </div>
                        <div className="flex flex-row md:flex-col space-x-3 md:space-x-0 md:space-y-3 mt-4 md:mt-0 md:ml-4 flex-shrink-0">
                            <button onClick={() => editExperience(exp)} className="text-primary hover:text-primary-dark bg-primary/10 p-2.5 rounded-full transition-colors border border-primary/20"><FaEdit /></button>
                            <button onClick={() => deleteExperience(exp._id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2.5 rounded-full transition-colors border border-red-100"><FaTrash /></button>
                        </div>
                    </div>
                ))}
                {experience.length === 0 && <div className="text-center text-lightMuted py-10 bg-lightCard rounded-2xl border border-lightBorder">No experience listed yet.</div>}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="bg-lightCard rounded-2xl p-6 w-full max-w-lg relative z-10 shadow-xl border border-lightBorder">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-lightText">{editingId ? 'Edit Experience' : 'Add Experience'}</h2>
                            <button onClick={closeModal} className="text-lightMuted hover:text-red-500 text-2xl leading-none transition-colors">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-lightText mb-1">Company</label>
                                <input type="text" name="company" value={formData.company} onChange={handleInputChange} required className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-lightText mb-1">Role / Title</label>
                                <input type="text" name="role" value={formData.role} onChange={handleInputChange} required className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-lightText mb-1">Duration (e.g. Sept 2021 - Present)</label>
                                <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} required className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-lightText mb-1">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="5" className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText"></textarea>
                            </div>
                            <div className="mt-8 flex justify-end space-x-3 pt-5 border-t border-lightBorder">
                                <button type="button" onClick={closeModal} className="px-5 py-2.5 border border-amber-200/60 rounded-xl text-lightMuted hover:bg-amber-50 font-bold transition-colors">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md text-[#0c0c0c] hover:-translate-y-0.5" style={{background:'linear-gradient(135deg, #c8a86b, #a88c4f)'}}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Experience;
