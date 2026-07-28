import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { FaEdit, FaTrash, FaPlus, FaCertificate } from 'react-icons/fa';

const Certificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', issuer: '', date: '', url: '', credentialId: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => { fetchCertificates(); }, []);

    const fetchCertificates = async () => {
        try {
            const res = await api.get('/certificates');
            setCertificates(res.data);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/certificates/${editingId}`, formData);
            } else {
                await api.post('/certificates', formData);
            }
            fetchCertificates();
            closeModal();
        } catch (err) { console.error(err); }
    };

    const editCertificate = (cert) => {
        setFormData({ 
            name: cert.name, 
            issuer: cert.issuer, 
            date: cert.date ? new Date(cert.date).toISOString().split('T')[0] : '',
            url: cert.url || '',
            credentialId: cert.credentialId || '' 
        });
        setEditingId(cert._id);
        setShowModal(true);
    };

    const deleteCertificate = async (id) => {
        if (window.confirm('Delete this certificate?')) {
            try {
                await api.delete(`/certificates/${id}`);
                fetchCertificates();
            } catch (err) { console.error(err); }
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData({ name: '', issuer: '', date: '', url: '', credentialId: '' });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                    <FaCertificate className="mr-3 text-indigo-600" /> Certificates
                </h1>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700">
                    <FaPlus className="mr-2" /> Add Certificate
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map(cert => (
                    <div key={cert._id} className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="mb-4">
                            <h3 className="font-bold text-gray-800 text-lg mb-1">{cert.name}</h3>
                            <p className="text-sm text-gray-600 font-medium">{cert.issuer}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                Issued: {new Date(cert.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                            </p>
                            {cert.credentialId && (
                                <p className="text-xs text-gray-400 mt-2">Credential ID: {cert.credentialId}</p>
                            )}
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                            {cert.url ? (
                                <a href={cert.url} target="_blank" rel="noreferrer" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View Credential</a>
                            ) : <span></span>}
                            <div className="flex space-x-2">
                                <button onClick={() => editCertificate(cert)} className="text-indigo-600 hover:text-indigo-800 bg-indigo-50 p-2 rounded-full"><FaEdit /></button>
                                <button onClick={() => deleteCertificate(cert._id)} className="text-red-600 hover:text-red-800 bg-red-50 p-2 rounded-full"><FaTrash /></button>
                            </div>
                        </div>
                    </div>
                ))}
                {certificates.length === 0 && <div className="col-span-full text-center text-gray-500 py-10">No certificates added yet.</div>}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg relative z-10 shadow-xl">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">{editingId ? 'Edit Certificate' : 'Add Certificate'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Issuer / Organization</label>
                                    <input type="text" name="issuer" value={formData.issuer} onChange={handleInputChange} required className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} required className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Credential URL (Optional)</label>
                                <input type="url" name="url" value={formData.url} onChange={handleInputChange} className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Credential ID (Optional)</label>
                                <input type="text" name="credentialId" value={formData.credentialId} onChange={handleInputChange} className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
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

export default Certificates;
