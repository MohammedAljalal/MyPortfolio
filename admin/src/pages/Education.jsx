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

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                    <FaGraduationCap className="mr-3 text-indigo-600" /> Education
                </h1>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700">
                    <FaPlus className="mr-2" /> Add Education
                </button>
            </div>

            <div className="space-y-4">
                {education.map(edu => (
                    <div key={edu._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between hover:shadow-md transition-shadow">
                        <div className="flex-1 pr-0 md:pr-6">
                            <h2 className="text-lg md:text-xl font-bold text-gray-800">{edu.degree} in {edu.fieldOfStudy}</h2>
                            <h3 className="text-md text-gray-600 font-medium mt-1">{edu.institution}</h3>
                            <p className="text-indigo-600 font-medium mb-3 mt-1 text-sm">
                                {new Date(edu.from).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })} - 
                                {edu.current ? ' Present' : (edu.to ? ` ${new Date(edu.to).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}` : '')}
                            </p>
                            <p className="text-sm md:text-base text-gray-600 whitespace-pre-wrap">{edu.description}</p>
                        </div>
                        <div className="flex flex-row md:flex-col space-x-3 md:space-x-0 md:space-y-3 mt-4 md:mt-0 md:ml-4 flex-shrink-0">
                            <button onClick={() => editEducation(edu)} className="text-indigo-600 hover:text-indigo-800 bg-indigo-50 p-2.5 rounded-full"><FaEdit /></button>
                            <button onClick={() => deleteEducation(edu._id)} className="text-red-600 hover:text-red-800 bg-red-50 p-2.5 rounded-full"><FaTrash /></button>
                        </div>
                    </div>
                ))}
                {education.length === 0 && <div className="text-center text-gray-500 py-10 bg-white rounded-xl">No education listed yet.</div>}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg relative z-10 shadow-xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">{editingId ? 'Edit Education' : 'Add Education'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                                <input type="text" name="institution" value={formData.institution} onChange={handleInputChange} required className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                                    <input type="text" name="degree" value={formData.degree} onChange={handleInputChange} required className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. BSc, MSc" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                                    <input type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleInputChange} required className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                                    <input type="date" name="from" value={formData.from} onChange={handleInputChange} required className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                                    <input type="date" name="to" value={formData.to} onChange={handleInputChange} disabled={formData.current} required={!formData.current} className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-400" />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" id="current" name="current" checked={formData.current} onChange={handleInputChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                <label htmlFor="current" className="ml-2 block text-sm text-gray-700">I am currently studying here</label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
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

export default Education;
