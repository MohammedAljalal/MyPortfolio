import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { BASE_URL } from '../utils/env';
import { FaSave, FaUserCircle } from 'react-icons/fa';

const PersonalInfo = () => {
    const [formData, setFormData] = useState({ fullName: '', title: '', bio: '', github: '', linkedin: '', twitter: '' });
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

    if (loading) return <div className="p-10 text-center text-lightMuted">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-lightText mb-6">Personal Information</h1>

            {message.text && (
                <div className={`p-4 rounded-xl mb-6 shadow-sm border ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    {message.text}
                </div>
            )}

            <div className="bg-lightCard rounded-2xl shadow-sm border border-lightBorder overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150 z-0" aria-hidden="true"></div>

                <form onSubmit={handleSubmit} className="relative z-10">
                    <div className="p-6 md:p-8 border-b border-lightBorder flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 text-center md:text-left bg-amber-50/30">
                        <div className="relative flex-shrink-0">
                            {currentInfo.profileImage ? (
                                <img src={`${BASE_URL}${currentInfo.profileImage}`} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md mx-auto md:mx-0" />
                            ) : (
                                <FaUserCircle className="w-28 h-28 text-amber-200/50 bg-white rounded-full mx-auto md:mx-0 shadow-sm" />
                            )}
                        </div>
                        <div className="flex-1 w-full text-left">
                            <label className="block text-sm font-bold text-lightText mb-2">Update Profile Picture</label>
                            <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} accept="image/*" className="w-full text-sm text-lightMuted file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary-dark hover:file:bg-primary/20 transition-colors bg-white border border-amber-200/50 rounded-xl" />
                        </div>
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-lightText mb-1">Full Name</label>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-lightText mb-1">Professional Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText" placeholder="e.g. Full Stack Developer" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-lightText mb-1">Professional Bio</label>
                            <textarea name="bio" value={formData.bio} onChange={handleInputChange} required rows="5" className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText"></textarea>
                        </div>

                        <div className="border-t border-lightBorder pt-6">
                            <h3 className="text-lg font-bold text-lightText mb-4">Social Links</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-lightText mb-1">GitHub URL</label>
                                    <input type="url" name="github" value={formData.github} onChange={handleInputChange} className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-lightText mb-1">LinkedIn URL</label>
                                    <input type="url" name="linkedin" value={formData.linkedin} onChange={handleInputChange} className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-lightText mb-1">Twitter URL</label>
                                    <input type="url" name="twitter" value={formData.twitter} onChange={handleInputChange} className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText text-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-lightBorder pt-6">
                            <h3 className="text-lg font-bold text-lightText mb-4">Resume/CV</h3>
                            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                                <div className="flex-1 w-full">
                                    <input type="file" onChange={(e) => setResume(e.target.files[0])} accept=".pdf,.doc,.docx" className="w-full text-sm text-lightMuted file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-colors bg-white border border-amber-200/50 rounded-xl" />
                                </div>
                                {currentInfo.resumeLink && (
                                    <div className="text-sm">
                                        <a href={`${BASE_URL}${currentInfo.resumeLink}`} target="_blank" rel="noreferrer" className="text-primary-dark hover:text-primary font-bold whitespace-nowrap transition-colors">View Current Resume</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-amber-50/50 border-t border-lightBorder flex justify-end rounded-b-2xl">
                        <button type="submit" disabled={saving} className="text-[#0c0c0c] px-8 py-3 rounded-xl flex items-center shadow-md font-bold transition-all disabled:opacity-70 hover:-translate-y-0.5" style={{background:'linear-gradient(135deg, #c8a86b, #a88c4f)'}}>
                            {saving ? 'Saving...' : <><FaSave className="mr-2" /> Save Changes</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PersonalInfo;
