import React, { useState, useEffect } from 'react';
import api, { getImageUrl } from '../utils/api';
import { FaSave, FaUserCircle } from 'react-icons/fa';

const PersonalInfo = () => {
    const [formData, setFormData] = useState({ fullName: '', title: '', bio: '', github: '', linkedin: '', twitter: '', facebook: '', phone: '', email: '', whatsapp: '' });
    const [profileImage, setProfileImage] = useState(null);
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [currentInfo, setCurrentInfo] = useState({});
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => { fetchInfo(); }, []);

    const fetchInfo = async () => {
        try {
            const res = await api.get('/personal');
            if (res.data) {
                setCurrentInfo(res.data);
                setFormData({
                    fullName: res.data.fullName || '',
                    title: res.data.title || '',
                    bio: res.data.bio || '',
                    github: res.data.socialLinks?.github || '',
                    linkedin: res.data.socialLinks?.linkedin || '',
                    twitter: res.data.socialLinks?.twitter || '',
                    facebook: res.data.socialLinks?.facebook || '',
                    phone: res.data.contactInfo?.phone || '',
                    email: res.data.contactInfo?.email || '',
                    whatsapp: res.data.contactInfo?.whatsapp || '',
                });
            }
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ text: '', type: '' });

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (profileImage) data.append('profileImage', profileImage);
        if (resume) data.append('resume', resume);

        try {
            const res = await api.put('/personal', data);
            setCurrentInfo(res.data);
            setMessage({ text: 'Personal info updated successfully!', type: 'success' });
            // Clear file inputs
            setProfileImage(null);
            setResume(null);
        } catch (err) {
            setMessage({ text: 'Error updating info.', type: 'error' });
        } finally { setSaving(false); }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h1>

            {message.text && (
                <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {message.text}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <form onSubmit={handleSubmit}>
                    <div className="p-8 border-b border-gray-100 flex items-center space-x-6">
                        <div className="relative">
                            {currentInfo.profileImage ? (
                                <img src={getImageUrl(currentInfo.profileImage)} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-gray-50" />
                            ) : (
                                <FaUserCircle className="w-24 h-24 text-gray-300 bg-gray-50 rounded-full" />
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Update Profile Picture</label>
                            <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors" />
                        </div>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Full Stack Developer" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Professional Bio</label>
                            <textarea name="bio" value={formData.bio} onChange={handleInputChange} required rows="5" className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Social Links</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                                    <input type="url" name="github" value={formData.github} onChange={handleInputChange} className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                                    <input type="url" name="linkedin" value={formData.linkedin} onChange={handleInputChange} className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label>
                                    <input type="url" name="twitter" value={formData.twitter} onChange={handleInputChange} className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                                    <input type="url" name="facebook" value={formData.facebook} onChange={handleInputChange} className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                                    <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="e.g. +1234567890" />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Resume/CV</h3>
                            <div className="flex items-center space-x-6">
                                <div className="flex-1">
                                    <input type="file" onChange={(e) => setResume(e.target.files[0])} accept=".pdf,.doc,.docx" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-colors" />
                                </div>
                                {currentInfo.resumeLink && (
                                    <div className="text-sm">
                                        <a href={getImageUrl(currentInfo.resumeLink)} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-800 font-medium">View Current Resume</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end rounded-b-xl">
                        <button type="submit" disabled={saving} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg flex items-center shadow-md font-medium hover:bg-indigo-700 transition-colors disabled:opacity-70">
                            {saving ? 'Saving...' : <><FaSave className="mr-2" /> Save Changes</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PersonalInfo;
