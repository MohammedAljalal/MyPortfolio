const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

// Load env vars
dotenv.config();

// Connect DB
const connectDB = require('./config/db');
connectDB();

// Load models
const Admin = require('./models/adminModel');
const PersonalInfo = require('./models/personalInfoModel');
const Project = require('./models/projectModel');
const Skill = require('./models/skillModel');
const Experience = require('./models/experienceModel');

const importData = async () => {
    try {
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
        await Project.create({
            title: 'E-commerce Platform',
            description: 'A full-featured e-commerce platform with payment integration.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Redux', 'Stripe'],
            githubLink: 'https://github.com',
            liveLink: 'https://example.com',
            featured: true,
        });

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
