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

    if (loading) return <div className="p-10 text-center text-lightMuted">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-lightText flex items-center">
                    <FaCertificate className="mr-3 text-primary-dark" /> Certificates
                </h1>
                <button onClick={() => setShowModal(true)} className="text-[#0c0c0c] font-bold px-5 py-2.5 rounded-xl flex items-center shadow-md hover:-translate-y-0.5 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-primary" style={{background:'linear-gradient(135deg, #c8a86b, #a88c4f)'}}>
                    <FaPlus className="mr-2" /> Add Certificate
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map(cert => (
                    <div key={cert._id} className="bg-lightCard p-6 rounded-2xl shadow-sm flex flex-col justify-between border border-lightBorder hover:shadow-md transition-shadow">
                        <div className="mb-4">
                            <h3 className="font-bold text-lightText text-lg mb-1">{cert.name}</h3>
                            <p className="text-sm text-lightMuted font-medium">{cert.issuer}</p>
                            <p className="text-xs text-primary-dark font-medium mt-1">
                                Issued: {new Date(cert.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                            </p>
                            {cert.credentialId && (
                                <p className="text-xs text-lightMuted opacity-80 mt-2 font-mono">ID: {cert.credentialId}</p>
                            )}
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-amber-200/40">
                            {cert.url ? (
                                <a href={cert.url} target="_blank" rel="noreferrer" className="text-sm text-primary-dark hover:text-primary font-bold transition-colors">View Credential</a>
                            ) : <span></span>}
                            <div className="flex space-x-2">
                                <button onClick={() => editCertificate(cert)} className="text-primary hover:text-primary-dark bg-primary/10 p-2 rounded-full transition-colors"><FaEdit /></button>
                                <button onClick={() => deleteCertificate(cert._id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full transition-colors"><FaTrash /></button>
                            </div>
                        </div>
                    </div>
                ))}
                {certificates.length === 0 && <div className="col-span-full text-center text-lightMuted py-10">No certificates added yet.</div>}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="bg-lightCard rounded-2xl p-6 md:p-8 w-full max-w-lg relative z-10 shadow-xl border border-lightBorder">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-lightText">{editingId ? 'Edit Certificate' : 'Add Certificate'}</h2>
                            <button onClick={closeModal} className="text-lightMuted hover:text-red-500 text-2xl leading-none transition-colors">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-lightText mb-1">Certificate Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-lightText mb-1">Issuer / Organization</label>
                                    <input type="text" name="issuer" value={formData.issuer} onChange={handleInputChange} required className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-lightText mb-1">Issue Date</label>
                                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} required className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-lightText mb-1">Credential URL (Optional)</label>
                                <input type="url" name="url" value={formData.url} onChange={handleInputChange} className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-lightText mb-1">Credential ID (Optional)</label>
                                <input type="text" name="credentialId" value={formData.credentialId} onChange={handleInputChange} className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText" />
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

export default Certificates;
