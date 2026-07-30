const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Connect DB
const connectDB = require('./config/db');

// Load models
const PersonalInfo = require('./models/personalInfoModel');
const Project = require('./models/projectModel');
const Skill = require('./models/skillModel');
const Experience = require('./models/experienceModel');
const Education = require('./models/educationModel');

const importCVData = async () => {
    try {
        await connectDB();
        console.log('Connected to DB');

        // Clear existing data (optional, but good for a fresh start)
        await PersonalInfo.deleteMany();
        await Project.deleteMany();
        await Skill.deleteMany();
        await Experience.deleteMany();
        await Education.deleteMany();

        // 1. Personal Info
        await PersonalInfo.create({
            fullName: 'Mohammed M. Aljalal',
            title: 'Full Stack Developer (MERN & Laravel)',
            email: 'mohammedalgalalalgalal@gmail.com',
            location: 'Taiz, Yemen',
            availableForWork: true,
            bio: 'Full Stack Developer skilled in the MERN stack and Laravel, building complete web and mobile systems including authentication, REST APIs, payment integrations, and admin dashboards. Comfortable working across the full project lifecycle, from requirements gathering to deployment, for remote clients. Native Arabic speaker with intermediate technical English.',
            socialLinks: {
                github: 'https://github.com/MohammedAljalal',
                linkedin: 'https://linkedin.com/in/mohammed-aljalal-4b3279325',
                twitter: '',
            },
            stats: [
                { label: 'Years Experience', value: '2+' },
                { label: 'Completed Projects', value: '10+' },
            ]
        });

        // 2. Experience
        await Experience.create([
            {
                role: 'Freelance Full Stack Developer',
                company: 'Self-Employed (Remote)',
                duration: '2024 - Present',
                description: 'Worked as an independent freelance developer, managing the complete project lifecycle from requirements gathering to deployment, for remote international clients. Built authentication systems, REST APIs, payment integrations, and admin dashboards using React, Node.js, Express, MongoDB, and Laravel.',
                achievements: [],
                technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Laravel'],
                order: 1
            }
        ]);

        // 3. Education
        await Education.create([
            {
                degree: 'Bachelor of Science in Software Engineering',
                institution: 'Taiz University',
                location: 'Taiz, Yemen',
                year: 'Recent',
                startDate: '',
                endDate: '',
                description: 'Faculty of Engineering and Information Technology',
                achievements: ['Graduated with Excellent (Highest Honors)'],
                order: 1
            }
        ]);

        // 4. Skills
        await Skill.create([
            // Frontend
            { name: 'React.js', category: 'Frontend', level: 90, order: 1 },
            { name: 'TypeScript', category: 'Frontend', level: 85, order: 2 },
            { name: 'JavaScript (ES6+)', category: 'Frontend', level: 95, order: 3 },
            { name: 'Tailwind CSS', category: 'Frontend', level: 90, order: 4 },
            { name: 'HTML5/CSS3', category: 'Frontend', level: 95, order: 5 },
            // Backend
            { name: 'Node.js', category: 'Backend', level: 90, order: 6 },
            { name: 'Express.js', category: 'Backend', level: 90, order: 7 },
            { name: 'Laravel', category: 'Backend', level: 85, order: 8 },
            { name: 'PHP', category: 'Backend', level: 80, order: 9 },
            { name: 'REST API Design', category: 'Backend', level: 95, order: 10 },
            // Mobile
            { name: 'React Native', category: 'Frontend', level: 85, order: 11 },
            { name: 'Flutter', category: 'Frontend', level: 80, order: 12 },
            // Databases
            { name: 'MongoDB', category: 'Database', level: 90, order: 13 },
            { name: 'MySQL', category: 'Database', level: 85, order: 14 },
            { name: 'PostgreSQL', category: 'Database', level: 80, order: 15 },
        ]);

        // 5. Projects
        await Project.create([
            {
                title: 'Parcela – E-Commerce and Delivery Platform',
                description: 'Built a multi-application e-commerce and delivery platform with JWT authentication, Stripe payment integration, real-time updates via Socket.io, and multi-language (Arabic/Portuguese) support.',
                technologies: ['React Native', 'Expo', 'React', 'Node.js', 'Express', 'MongoDB'],
                githubLink: 'https://github.com/MohammedAljalal/Parcela',
                liveLink: '',
                featured: true,
                role: 'Full Stack Developer',
                architecture: 'React admin dashboard, Node.js/Express/MongoDB backend, React Native mobile app',
                order: 1
            },
            {
                title: 'Doctor Appointment System',
                description: 'Developed patient, doctor, and admin portals with JWT authentication, role-based access control, Razorpay payment integration, and Cloudinary image uploads.',
                technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
                githubLink: 'https://github.com/MohammedAljalal/doctor-appointment-system',
                liveLink: '',
                featured: true,
                role: 'Full Stack Developer',
                order: 2
            },
            {
                title: 'Learning Management System',
                description: 'Built a multi-role e-learning platform with Spatie role and media management, Laravel Reverb real-time notifications, and an integrated Gemini AI chatbot.',
                technologies: ['Laravel 12', 'React', 'TypeScript', 'Inertia.js'],
                githubLink: 'https://github.com/MohammedAljalal/Learning-Management-System',
                liveLink: '',
                featured: true,
                role: 'Full Stack Developer',
                order: 3
            },
            {
                title: 'QuizBattle',
                description: 'Built a real-time competitive quiz mobile application with live leaderboards, Firestore security rules, and full Arabic RTL support.',
                technologies: ['Flutter', 'Firebase', 'Firestore'],
                githubLink: 'https://github.com/MohammedAljalal/quizbattle-app',
                liveLink: '',
                featured: false,
                role: 'Mobile Developer',
                order: 4
            },
            {
                title: 'Job Board System',
                description: 'Built a multi-application job board (public listings and admin back-office) sharing a common Composer models package.',
                technologies: ['Laravel', 'PHP'],
                githubLink: 'https://github.com/MohammedAljalal/job-board-system',
                liveLink: '',
                featured: false,
                role: 'Backend Developer',
                order: 5
            }
        ]);

        console.log('CV Data Imported successfully');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

importCVData();
