import React, { useState, useEffect } from 'react';
import api from '../utils/api';
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

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Skills</h1>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center">
                    <FaPlus className="mr-2" /> Add Skill
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map(skill => (
                    <div key={skill._id} className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between border border-gray-100">
                        <div className="flex items-center w-full min-w-0 mr-4">
                            {skill.icon ? (
                                <img src={`http://localhost:5000${skill.icon}`} alt="" className="w-12 h-12 object-contain mr-4 flex-shrink-0" />
                            ) : (
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mr-4 font-bold text-xl flex-shrink-0">{skill.name.charAt(0)}</div>
                            )}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-800 truncate">{skill.name}</h3>
                                <p className="text-sm text-gray-500">{skill.category} • {skill.level}%</p>
                                <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                                    <div className="h-full bg-indigo-500" style={{ width: `${skill.level}%` }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 flex-shrink-0">
                            <button onClick={() => editSkill(skill)} className="text-gray-400 hover:text-indigo-600"><FaEdit /></button>
                            <button onClick={() => deleteSkill(skill._id)} className="text-gray-400 hover:text-red-600"><FaTrash /></button>
                        </div>
                    </div>
                ))}
                {skills.length === 0 && <div className="col-span-3 text-center text-gray-500 py-10">No skills added yet.</div>}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50" onClick={closeModal}></div>
                    <div className="bg-white rounded-xl p-6 w-full max-w-md relative z-10">
                        <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Skill' : 'Add Skill'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full border border-gray-300 p-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full border border-gray-300 p-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">
                                        <option value="Frontend">Frontend</option>
                                        <option value="Backend">Backend</option>
                                        <option value="Database">Database</option>
                                        <option value="Tools">Tools</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency Level (1-100)</label>
                                    <input type="number" min="1" max="100" name="level" value={formData.level} onChange={handleInputChange} required className="w-full border border-gray-300 p-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon/Logo Image</label>
                                    <input type="file" onChange={(e) => setIconFile(e.target.files[0])} className="w-full text-sm" />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button type="button" onClick={closeModal} className="px-4 py-2 border border-gray-300 rounded-lg">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Skills;
