const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

// Load env vars
dotenv.config();

// Connect DB
const connectDB = require('./config/db');

// Load models
const Admin = require('./models/adminModel');
const PersonalInfo = require('./models/personalInfoModel');
const Project = require('./models/projectModel');
const Skill = require('./models/skillModel');
const Experience = require('./models/experienceModel');

const importData = async () => {
    try {
        await connectDB();
        await Admin.deleteMany();
        await PersonalInfo.deleteMany();
        await Project.deleteMany();
        await Skill.deleteMany();
        await Experience.deleteMany();

        // Create Admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        await Admin.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: hashedPassword,
        });

        // Create Personal Info
        await PersonalInfo.create({
            fullName: 'John Doe',
            title: 'Full Stack MERN Developer',
            bio: 'I am a passionate software developer specializing in MERN stack. I love building scalable and beautiful web applications.',
            socialLinks: {
                github: 'https://github.com',
                linkedin: 'https://linkedin.com',
                twitter: 'https://twitter.com',
            }
        });

        // Create Sample Projects
        await Project.create([
            {
                title: 'E-commerce Platform',
                description: 'A full-featured e-commerce platform with payment integration, user authentication, and admin dashboard.',
                technologies: ['React', 'Node.js', 'MongoDB', 'Redux', 'Stripe'],
                githubLink: 'https://github.com',
                liveLink: 'https://example.com',
                featured: true,
            },
            {
                title: 'Real-time Chat App',
                description: 'A responsive real-time chat application with private rooms, media sharing, and instant notifications.',
                technologies: ['React', 'Socket.io', 'Express', 'Tailwind CSS'],
                githubLink: 'https://github.com',
                liveLink: 'https://example.com',
                featured: true,
            },
            {
                title: 'Task Management System',
                description: 'A Kanban-style task management web app using drag-and-drop functionality to organize workflows.',
                technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
                githubLink: 'https://github.com',
                liveLink: 'https://example.com',
                featured: false,
            }
        ]);

        // Create Sample Skills
        await Skill.create([
            { name: 'JavaScript (ES6+)', level: 90, category: 'Frontend' },
            { name: 'React.js', level: 85, category: 'Frontend' },
            { name: 'Node.js & Express', level: 80, category: 'Backend' },
            { name: 'MongoDB', level: 75, category: 'Backend' },
            { name: 'Tailwind CSS', level: 95, category: 'Frontend' },
            { name: 'Git & GitHub', level: 85, category: 'Tools' }
        ]);

        // Create Sample Experiences
        await Experience.create([
            {
                role: 'Full Stack Developer',
                company: 'Tech Solutions Inc.',
                duration: 'Jan 2023 - Present',
                description: 'Developing and maintaining robust MERN stack applications. Collaborating with cross-functional teams to deliver high-quality software solutions.'
            },
            {
                role: 'Frontend Web Developer',
                company: 'Creative Agency',
                duration: 'Jun 2021 - Dec 2022',
                description: 'Built interactive and responsive UIs with React and Tailwind CSS. Optimized applications for maximum speed and scalability.'
            }
        ]);

        console.log('Data Imported successfully');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const deleteData = async () => {
    try {
        await Admin.deleteMany();
        await PersonalInfo.deleteMany();
        await Project.deleteMany();
        await Skill.deleteMany();
        await Experience.deleteMany();

        console.log('Data Destroyed successfully');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    deleteData();
} else {
    importData();
}
