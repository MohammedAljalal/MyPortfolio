import React, { useState, useEffect } from 'react';
import api from '../utils/api';
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

    if (loading) return <div className="p-10 text-center">Loading projects...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Projects Management</h1>
                <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700 shadow-md">
                    <FaPlus className="mr-2" /> Add Project
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 relative z-0">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tech</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {projects.length === 0 ? (
                            <tr><td colSpan="3" className="px-6 py-10 text-center text-gray-500">No projects found. Create one!</td></tr>
                        ) : projects.map((project) => (
                            <tr key={project._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {project.image && (
                                            <div className="flex-shrink-0 h-10 w-10 mr-4">
                                                <img className="h-10 w-10 rounded-md object-cover" src={`http://localhost:5000${project.image}`} alt="" />
                                            </div>
                                        )}
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{project.title}</div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {project.featured ? <span className="text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded">Featured</span> : 'Standard'}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-600 flex flex-wrap gap-1">
                                        {project.technologies.slice(0, 3).map((t, i) => (
                                            <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs">{t}</span>
                                        ))}
                                        {project.technologies.length > 3 && <span className="bg-gray-100 px-2 py-1 rounded text-xs">+{project.technologies.length - 3}</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => editProject(project)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors mr-2 border border-transparent hover:border-indigo-100"><FaEdit /></button>
                                    <button onClick={() => deleteProject(project._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors border border-transparent hover:border-red-100"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="3" className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"></textarea>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma separated)</label>
                                        <input type="text" name="technologies" value={formData.technologies} onChange={handleInputChange} required className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="React, Node.js, MongoDB" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
                                        <input type="url" name="githubLink" value={formData.githubLink} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Live URL</label>
                                        <input type="url" name="liveLink" value={formData.liveLink} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                                    </div>
                                    <div className="col-span-2 flex items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleInputChange} className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                        <label htmlFor="featured" className="ml-3 block text-sm font-medium text-gray-700">Display this highly visible on your portfolio homepage</label>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Thumbnail</label>
                                        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end space-x-3 pt-4 border-t border-gray-100">
                                    <button type="button" onClick={closeModal} className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors">Cancel</button>
                                    <button type="submit" className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors shadow-md">{editingId ? 'Save Changes' : 'Create Project'}</button>
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
