import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { BASE_URL } from '../utils/env';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ name: '', category: 'Frontend', level: 50 });
    const [iconFile, setIconFile] = useState(null);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => { fetchSkills(); }, []);

    const fetchSkills = async () => {
        try {
            const res = await api.get('/skills');
            setSkills(res.data);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (iconFile) data.append('icon', iconFile);

        try {
            if (editingId) {
                await api.put(`/skills/${editingId}`, data);
            } else {
                await api.post('/skills', data);
            }
            fetchSkills();
            closeModal();
        } catch (err) { console.error(err); }
    };

    const editSkill = (skill) => {
        setFormData({ name: skill.name, category: skill.category, level: skill.level });
        setEditingId(skill._id);
        setShowModal(true);
    };

    const deleteSkill = async (id) => {
        if (window.confirm('Delete this skill?')) {
            try {
                await api.delete(`/skills/${id}`);
                fetchSkills();
            } catch (err) { console.error(err); }
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData({ name: '', category: 'Frontend', level: 50 });
        setIconFile(null);
    };

    if (loading) return <div className="p-10 text-center text-lightMuted">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-lightText">Skills</h1>
                <button onClick={() => setShowModal(true)} className="text-[#0c0c0c] font-bold px-5 py-2.5 rounded-xl flex items-center shadow-md hover:-translate-y-0.5 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-primary" style={{background:'linear-gradient(135deg, #c8a86b, #a88c4f)'}}>
                    <FaPlus className="mr-2" /> Add Skill
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map(skill => (
                    <div key={skill._id} className="bg-lightCard p-6 rounded-2xl shadow-sm flex items-center justify-between border border-lightBorder hover:shadow-md transition-shadow">
                        <div className="flex items-center w-full min-w-0 mr-4">
                            {skill.icon ? (
                                <img src={skill.icon.startsWith('http') ? skill.icon : `${BASE_URL}${skill.icon}`} alt="" className="w-12 h-12 object-contain mr-4 flex-shrink-0 drop-shadow-sm" />
                            ) : (
                                <div className="w-12 h-12 bg-amber-50 border border-amber-200/50 rounded-xl flex items-center justify-center text-primary-dark mr-4 font-bold text-xl flex-shrink-0">{skill.name.charAt(0)}</div>
                            )}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-lightText truncate">{skill.name}</h3>
                                <p className="text-xs text-lightMuted mt-0.5 font-medium">{skill.category} • {skill.level}%</p>
                                <div className="w-full h-2 bg-amber-100/50 rounded-full mt-2.5 overflow-hidden">
                                    <div className="h-full" style={{ width: `${skill.level}%`, background:'linear-gradient(90deg, #dfc090, #c8a86b)' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 flex-shrink-0">
                            <button onClick={() => editSkill(skill)} className="text-lightMuted hover:text-primary transition-colors p-2"><FaEdit /></button>
                            <button onClick={() => deleteSkill(skill._id)} className="text-lightMuted hover:text-red-500 transition-colors p-2"><FaTrash /></button>
                        </div>
                    </div>
                ))}
                {skills.length === 0 && <div className="col-span-3 text-center text-lightMuted py-10">No skills added yet.</div>}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="bg-lightCard p-6 md:p-8 rounded-2xl shadow-xl z-10 w-full max-w-lg relative border border-lightBorder">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-lightText">{editingId ? 'Edit Skill' : 'Add New Skill'}</h2>
                            <button onClick={closeModal} className="text-lightMuted hover:text-red-500 text-2xl leading-none transition-colors">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-lightText mb-1">Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full bg-white border border-amber-200/60 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-inner text-lightText" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-lightText mb-1">Category</label>
                                        <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-white border border-amber-200/60 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner text-lightText">
                                            <option value="Frontend">Frontend</option>
                                            <option value="Backend">Backend</option>
                                            <option value="Database">Database</option>
                                            <option value="Tools">Tools</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-lightText mb-1">Level (1-100)</label>
                                        <input type="number" min="1" max="100" name="level" value={formData.level} onChange={handleInputChange} required className="w-full bg-white border border-amber-200/60 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-inner text-lightText" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-lightText mb-1">Icon/Logo Image</label>
                                    <input type="file" accept="image/*" onChange={(e) => setIconFile(e.target.files[0])} className="w-full border border-amber-200/60 rounded-xl p-2 text-sm text-lightMuted file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary-dark hover:file:bg-primary/20 bg-white" />
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end space-x-3 pt-5 border-t border-lightBorder">
                                <button type="button" onClick={closeModal} className="px-5 py-2.5 border border-amber-200/60 rounded-xl text-lightMuted hover:bg-amber-50 font-bold transition-colors">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md text-[#0c0c0c] hover:-translate-y-0.5" style={{background:'linear-gradient(135deg, #c8a86b, #a88c4f)'}}>{editingId ? 'Save Changes' : 'Add Skill'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Skills;
