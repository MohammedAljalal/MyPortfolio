import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { BASE_URL } from '../utils/env';
import { FaEdit, FaTrash, FaPlus, FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', position: '', company: '', content: '' });
    const [imageFile, setImageFile] = useState(null);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => { fetchTestimonials(); }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await api.get('/testimonials');
            setTestimonials(res.data);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (imageFile) data.append('image', imageFile);

        try {
            if (editingId) {
                await api.put(`/testimonials/${editingId}`, data);
            } else {
                await api.post('/testimonials', data);
            }
            fetchTestimonials();
            closeModal();
        } catch (err) { console.error(err); }
    };

    const editTestimonial = (testimonial) => {
        setFormData({ 
            name: testimonial.name, 
            position: testimonial.position, 
            company: testimonial.company || '',
            content: testimonial.content 
        });
        setEditingId(testimonial._id);
        setShowModal(true);
    };

    const deleteTestimonial = async (id) => {
        if (window.confirm('Delete this testimonial?')) {
            try {
                await api.delete(`/testimonials/${id}`);
                fetchTestimonials();
            } catch (err) { console.error(err); }
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData({ name: '', position: '', company: '', content: '' });
        setImageFile(null);
    };

    if (loading) return <div className="p-10 text-center text-lightMuted">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-lightText flex items-center">
                    <FaQuoteLeft className="mr-3 text-primary-dark" /> Testimonials
                </h1>
                <button onClick={() => setShowModal(true)} className="text-[#0c0c0c] font-bold px-5 py-2.5 rounded-xl flex items-center shadow-md hover:-translate-y-0.5 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-primary" style={{background:'linear-gradient(135deg, #c8a86b, #a88c4f)'}}>
                    <FaPlus className="mr-2" /> Add Testimonial
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {testimonials.map(testimonial => (
                    <div key={testimonial._id} className="bg-lightCard p-6 rounded-2xl shadow-sm border border-lightBorder hover:shadow-md transition-shadow relative">
                        <div className="flex justify-end space-x-2 absolute top-6 right-6">
                            <button onClick={() => editTestimonial(testimonial)} className="text-primary hover:text-primary-dark bg-primary/10 p-2 rounded-full transition-colors"><FaEdit /></button>
                            <button onClick={() => deleteTestimonial(testimonial._id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-full transition-colors"><FaTrash /></button>
                        </div>
                        
                        <div className="pr-16 mb-4 text-lightMuted italic leading-relaxed text-lg">
                            "{testimonial.content}"
                        </div>
                        
                        <div className="flex items-center mt-6 pt-4 border-t border-amber-200/40">
                            {testimonial.image ? (
                                <img src={testimonial.image.startsWith('http') ? testimonial.image : `${BASE_URL}${testimonial.image}`} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4 border border-lightBorder" />
                            ) : (
                                <div className="w-12 h-12 bg-amber-50 border border-amber-200/50 rounded-full flex items-center justify-center text-primary-dark mr-4 font-bold text-xl">{testimonial.name.charAt(0)}</div>
                            )}
                            <div>
                                <h4 className="font-bold text-lightText">{testimonial.name}</h4>
                                <p className="text-sm text-lightMuted font-medium">{testimonial.position}{testimonial.company ? ` at ${testimonial.company}` : ''}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {testimonials.length === 0 && <div className="col-span-full text-center text-lightMuted py-10 bg-lightCard rounded-2xl border border-lightBorder">No testimonials added yet.</div>}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="bg-lightCard rounded-2xl p-6 md:p-8 w-full max-w-lg relative z-10 shadow-xl max-h-[90vh] overflow-y-auto border border-lightBorder">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-lightText">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
                            <button onClick={closeModal} className="text-lightMuted hover:text-red-500 text-2xl leading-none transition-colors">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-lightText mb-1">Author Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-lightText mb-1">Position / Title</label>
                                    <input type="text" name="position" value={formData.position} onChange={handleInputChange} required className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-lightText mb-1">Company (Optional)</label>
                                    <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-lightText mb-1">Testimonial Content</label>
                                <textarea name="content" value={formData.content} onChange={handleInputChange} required rows="4" className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-lightText mb-1">Author Profile Image (Optional)</label>
                                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full border border-amber-200/60 rounded-xl p-2 text-sm text-lightMuted file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary-dark hover:file:bg-primary/20 bg-white" />
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

export default Testimonials;
