import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { BASE_URL } from '../utils/env';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', technologies: '', githubLink: '', liveLink: '', featured: false });
    const [imageFile, setImageFile] = useState(null);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (err) { console.error(err); } finally { setLoading(false); }
    };

    const handleInputChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (imageFile) data.append('image', imageFile);

        try {
            if (editingId) {
                await api.put(`/projects/${editingId}`, data);
            } else {
                await api.post('/projects', data);
            }
            fetchProjects();
            closeModal();
        } catch (err) { console.error(err); }
    };

    const editProject = (project) => {
        setFormData({
            title: project.title,
            description: project.description,
            technologies: project.technologies.join(', '),
            githubLink: project.githubLink || '',
            liveLink: project.liveLink || '',
            featured: project.featured
        });
        setEditingId(project._id);
        setShowModal(true);
    };

    const deleteProject = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await api.delete(`/projects/${id}`);
                fetchProjects();
            } catch (err) { console.error(err); }
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingId(null);
        setFormData({ title: '', description: '', technologies: '', githubLink: '', liveLink: '', featured: false });
        setImageFile(null);
    };

    if (loading) return <div className="p-10 text-center text-lightMuted">Loading projects...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-lightText">Projects Management</h1>
                <button onClick={() => setShowModal(true)} className="text-[#0c0c0c] font-bold px-5 py-2.5 rounded-xl flex items-center shadow-md hover:-translate-y-0.5 transition-all focus:ring-2 focus:ring-offset-2 focus:ring-primary" style={{background:'linear-gradient(135deg, #c8a86b, #a88c4f)'}}>
                    <FaPlus className="mr-2" /> Add Project
                </button>
            </div>

            <div className="bg-lightCard rounded-2xl shadow-sm border border-lightBorder overflow-x-auto">
                <table className="min-w-full divide-y divide-amber-200/40">
                    <thead className="bg-amber-50/50 relative z-0">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-lightMuted uppercase tracking-wider">Project</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-lightMuted uppercase tracking-wider">Tech</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-lightMuted uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-200/30">
                        {projects.length === 0 ? (
                            <tr><td colSpan="3" className="px-6 py-10 text-center text-lightMuted">No projects found. Create one!</td></tr>
                        ) : projects.map((project) => (
                            <tr key={project._id} className="hover:bg-amber-50/30 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {project.image && (
                                            <div className="flex-shrink-0 h-12 w-12 mr-4 border border-lightBorder rounded-lg overflow-hidden">
                                                <img className="h-full w-full object-cover" src={`${BASE_URL}${project.image}`} alt="" />
                                            </div>
                                        )}
                                        <div>
                                            <div className="text-sm font-bold text-lightText">{project.title}</div>
                                            <div className="text-xs mt-1.5">
                                                {project.featured ? <span className="text-primary-dark font-bold bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">Featured</span> : <span className="text-lightMuted bg-gray-100 border border-gray-200 px-2.5 py-0.5 rounded-full">Standard</span>}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-lightMuted flex flex-wrap gap-1.5">
                                        {project.technologies.slice(0, 3).map((t, i) => (
                                            <span key={i} className="bg-amber-50 border border-amber-200/50 px-2 py-1 rounded text-xs font-medium text-lightMuted">{t}</span>
                                        ))}
                                        {project.technologies.length > 3 && <span className="bg-amber-50 border border-amber-200/50 px-2 py-1 rounded text-xs font-medium text-lightMuted">+{project.technologies.length - 3}</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => editProject(project)} className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors mr-2"><FaEdit /></button>
                                    <button onClick={() => deleteProject(project._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="bg-lightCard rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 border border-lightBorder">
                        <div className="p-6 border-b border-lightBorder flex justify-between items-center bg-amber-50/50">
                            <h2 className="text-xl font-bold text-lightText">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
                            <button onClick={closeModal} className="text-lightMuted hover:text-red-500 text-2xl leading-none transition-colors">&times;</button>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-bold text-lightText mb-1">Title</label>
                                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-white border border-amber-200/60 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-inner text-lightText" />
                                    </div>
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-bold text-lightText mb-1">Description</label>
                                        <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="3" className="w-full bg-white border border-amber-200/60 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-inner text-lightText"></textarea>
                                    </div>
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-bold text-lightText mb-1">Technologies (comma separated)</label>
                                        <input type="text" name="technologies" value={formData.technologies} onChange={handleInputChange} required className="w-full bg-white border border-amber-200/60 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-inner text-lightText" placeholder="React, Node.js, MongoDB" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-lightText mb-1">GitHub Link</label>
                                        <input type="url" name="githubLink" value={formData.githubLink} onChange={handleInputChange} className="w-full bg-white border border-amber-200/60 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-inner text-lightText" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-lightText mb-1">Live URL</label>
                                        <input type="url" name="liveLink" value={formData.liveLink} onChange={handleInputChange} className="w-full bg-white border border-amber-200/60 rounded-xl p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-inner text-lightText" />
                                    </div>
                                    <div className="col-span-1 md:col-span-2 flex items-center bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
                                        <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleInputChange} className="h-5 w-5 text-primary focus:ring-primary border-amber-300 rounded" />
                                        <label htmlFor="featured" className="ml-3 block text-sm font-bold text-lightText">Display this highly visible on your portfolio homepage</label>
                                    </div>
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-bold text-lightText mb-1">Project Thumbnail</label>
                                        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full border border-amber-200/60 rounded-xl p-2 text-sm text-lightMuted file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary-dark hover:file:bg-primary/20 bg-white" />
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end space-x-3 pt-5 border-t border-lightBorder">
                                    <button type="button" onClick={closeModal} className="px-5 py-2.5 border border-amber-200/60 rounded-xl text-lightMuted hover:bg-amber-50 font-bold transition-colors">Cancel</button>
                                    <button type="submit" className="px-5 py-2.5 rounded-xl font-bold transition-colors shadow-md text-[#0c0c0c] hover:-translate-y-0.5" style={{background:'linear-gradient(135deg, #c8a86b, #a88c4f)'}}>{editingId ? 'Save Changes' : 'Create Project'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
