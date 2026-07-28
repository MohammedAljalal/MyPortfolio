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

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                    <FaQuoteLeft className="mr-3 text-indigo-600" /> Testimonials
                </h1>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700">
                    <FaPlus className="mr-2" /> Add Testimonial
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {testimonials.map(testimonial => (
                    <div key={testimonial._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative">
                        <div className="flex justify-end space-x-2 absolute top-6 right-6">
                            <button onClick={() => editTestimonial(testimonial)} className="text-indigo-600 hover:text-indigo-800 bg-indigo-50 p-2 rounded-full"><FaEdit /></button>
                            <button onClick={() => deleteTestimonial(testimonial._id)} className="text-red-600 hover:text-red-800 bg-red-50 p-2 rounded-full"><FaTrash /></button>
                        </div>
                        
                        <div className="pr-16 mb-4 text-gray-600 italic">
                            "{testimonial.content}"
                        </div>
                        
                        <div className="flex items-center mt-4 pt-4 border-t border-gray-50">
                            {testimonial.image ? (
                                <img src={`${BASE_URL}${testimonial.image}`} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                            ) : (
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mr-4 font-bold text-xl">{testimonial.name.charAt(0)}</div>
                            )}
                            <div>
                                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                <p className="text-sm text-gray-500">{testimonial.position}{testimonial.company ? ` at ${testimonial.company}` : ''}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {testimonials.length === 0 && <div className="col-span-full text-center text-gray-500 py-10">No testimonials added yet.</div>}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg relative z-10 shadow-xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Position / Title</label>
                                    <input type="text" name="position" value={formData.position} onChange={handleInputChange} required className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company (Optional)</label>
                                    <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Content</label>
                                <textarea name="content" value={formData.content} onChange={handleInputChange} required rows="4" className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Author Profile Image (Optional)</label>
                                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
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

export default Testimonials;
