import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { FaEdit, FaTrash, FaPlus, FaGraduationCap } from 'react-icons/fa';

const Education = () => {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ institution: '', degree: '', fieldOfStudy: '', from: '', to: '', current: false, description: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => { fetchEducation(); }, []);

    const fetchEducation = async () => {
        try {
            const res = await api.get('/education');
            setEducation(res.data);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/education/${editingId}`, formData);
            } else {
                await api.post('/education', formData);
            }
            fetchEducation();
            closeModal();
        } catch (err) { console.error(err); }
    };

    const editEducation = (edu) => {
        setFormData({ 
            institution: edu.institution, 
            degree: edu.degree, 
            fieldOfStudy: edu.fieldOfStudy,
            from: edu.from ? new Date(edu.from).toISOString().split('T')[0] : '',
            to: edu.to ? new Date(edu.to).toISOString().split('T')[0] : '',
            current: edu.current,
            description: edu.description || '' 
        });
        setEditingId(edu._id);
        setShowModal(true);
    };

    const deleteEducation = async (id) => {
        if (window.confirm('Delete this education?')) {
            try {
                await api.delete(`/education/${id}`);
                fetchEducation();
            } catch (err) { console.error(err); }
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData({ institution: '', degree: '', fieldOfStudy: '', from: '', to: '', current: false, description: '' });
    };

    if (loading) return <div className="p-10 text-center text-lightMuted">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-lightText flex items-center">
                    <FaGraduationCap className="mr-3 text-primary-dark" /> Education
                </h1>
                <button onClick={() => setShowModal(true)} className="text-[#0c0c0c] font-bold px-5 py-2.5 rounded-xl flex items-center shadow-md hover:-translate-y-0.5 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-primary" style={{background:'linear-gradient(135deg, #c8a86b, #a88c4f)'}}>
                    <FaPlus className="mr-2" /> Add Education
                </button>
            </div>

            <div className="space-y-4">
                {education.map(edu => (
                    <div key={edu._id} className="bg-lightCard p-6 rounded-2xl shadow-sm border border-lightBorder flex flex-col md:flex-row justify-between hover:shadow-md transition-shadow">
                        <div className="flex-1 pr-0 md:pr-6">
                            <h2 className="text-lg md:text-xl font-bold text-lightText">{edu.degree} in {edu.fieldOfStudy}</h2>
                            <h3 className="text-md text-lightMuted font-bold mt-1.5">{edu.institution}</h3>
                            <p className="text-primary-dark font-bold mb-3 mt-1.5 text-sm uppercase tracking-wide bg-primary/10 inline-block px-3 py-1 rounded border border-primary/20">
                                {new Date(edu.from).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })} - 
                                {edu.current ? ' Present' : (edu.to ? ` ${new Date(edu.to).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}` : '')}
                            </p>
                            <p className="text-sm md:text-base text-lightMuted whitespace-pre-wrap">{edu.description}</p>
                        </div>
                        <div className="flex flex-row md:flex-col space-x-3 md:space-x-0 md:space-y-3 mt-4 md:mt-0 md:ml-4 flex-shrink-0">
                            <button onClick={() => editEducation(edu)} className="text-primary hover:text-primary-dark bg-primary/10 p-2.5 rounded-full transition-colors border border-primary/20"><FaEdit /></button>
                            <button onClick={() => deleteEducation(edu._id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2.5 rounded-full transition-colors border border-red-100"><FaTrash /></button>
                        </div>
                    </div>
                ))}
                {education.length === 0 && <div className="text-center text-lightMuted py-10 bg-lightCard rounded-2xl border border-lightBorder">No education listed yet.</div>}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="bg-lightCard rounded-2xl p-6 md:p-8 w-full max-w-lg relative z-10 shadow-xl max-h-[90vh] overflow-y-auto border border-lightBorder">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-lightText">{editingId ? 'Edit Education' : 'Add Education'}</h2>
                            <button onClick={closeModal} className="text-lightMuted hover:text-red-500 text-2xl leading-none transition-colors">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-lightText mb-1">Institution</label>
                                <input type="text" name="institution" value={formData.institution} onChange={handleInputChange} required className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-lightText mb-1">Degree</label>
                                    <input type="text" name="degree" value={formData.degree} onChange={handleInputChange} required className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText" placeholder="e.g. BSc, MSc" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-lightText mb-1">Field of Study</label>
                                    <input type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleInputChange} required className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-lightText mb-1">From Date</label>
                                    <input type="date" name="from" value={formData.from} onChange={handleInputChange} required className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-lightText mb-1">To Date</label>
                                    <input type="date" name="to" value={formData.to} onChange={handleInputChange} disabled={formData.current} required={!formData.current} className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText disabled:bg-gray-100 disabled:text-gray-400" />
                                </div>
                            </div>
                            <div className="flex items-center bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
                                <input type="checkbox" id="current" name="current" checked={formData.current} onChange={handleInputChange} className="h-5 w-5 text-primary focus:ring-primary border-amber-300 rounded" />
                                <label htmlFor="current" className="ml-3 block text-sm font-bold text-lightText">I am currently studying here</label>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-lightText mb-1">Description (Optional)</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText"></textarea>
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

export default Education;
