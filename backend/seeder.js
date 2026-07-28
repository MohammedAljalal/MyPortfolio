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
const Education = require('./models/educationModel');
const Certificate = require('./models/certificateModel');
const Testimonial = require('./models/testimonialModel');

const importData = async () => {
    try {
        await Admin.deleteMany();
        await PersonalInfo.deleteMany();
        await Project.deleteMany();
        await Skill.deleteMany();
        await Experience.deleteMany();
        await Education.deleteMany();
        await Certificate.deleteMany();
        await Testimonial.deleteMany();

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
            fullName: 'Mohammed',
            title: 'Senior MERN Stack Architect',
            email: 'hello@mohammed.dev',
            location: 'Remote / Global',
            availableForWork: true,
            bio: 'I am a passionate software developer specializing in the MERN stack with over 5 years of experience building scalable, high-performance web applications. I focus on clean architecture, accessibility, and delivering premium user experiences.',
            socialLinks: {
                github: 'https://github.com',
                linkedin: 'https://linkedin.com',
                twitter: 'https://twitter.com',
            },
            stats: [
                { label: 'Years Experience', value: '5+' },
                { label: 'Projects Completed', value: '40+' },
                { label: 'Happy Clients', value: '25+' },
                { label: 'Awards Won', value: '3' }
            ]
        });

        // Create Skills
        await Skill.create([
            { name: 'React', category: 'Frontend', level: 95, order: 1 },
            { name: 'Node.js', category: 'Backend', level: 90, order: 2 },
            { name: 'MongoDB', category: 'Database', level: 85, order: 3 },
            { name: 'Express', category: 'Backend', level: 90, order: 4 },
            { name: 'Tailwind CSS', category: 'Frontend', level: 95, order: 5 },
            { name: 'TypeScript', category: 'Frontend', level: 80, order: 6 },
        ]);

        // Create Experience
        await Experience.create([
            {
                role: 'Senior Frontend Engineer',
                company: 'Tech Innovators Inc.',
                duration: 'Jan 2022 - Present',
                description: 'Led a team of 5 developers to rebuild the core SaaS platform. Improved performance by 40% and implemented a comprehensive design system.',
                achievements: ['Reduced bundle size by 30%', 'Mentored junior developers', 'Introduced strict TypeScript typing'],
                technologies: ['React', 'TypeScript', 'Redux', 'Tailwind'],
                order: 1
            },
            {
                role: 'Full Stack Developer',
                company: 'Digital Solutions LLC',
                duration: 'Mar 2019 - Dec 2021',
                description: 'Developed custom web applications for various enterprise clients using the MERN stack. Designed RESTful APIs and optimized database queries.',
                achievements: ['Delivered 10+ projects on time', 'Set up CI/CD pipelines', 'Integrated payment gateways'],
                technologies: ['Node.js', 'Express', 'MongoDB', 'React'],
                order: 2
            }
        ]);

        // Create Education
        await Education.create([
            {
                degree: 'Master of Computer Science',
                institution: 'Tech University',
                location: 'New York, NY',
                year: '2019',
                startDate: 'Sep 2017',
                endDate: 'Jun 2019',
                description: 'Specialized in Software Engineering and Distributed Systems.',
                achievements: ['Graduated with Honors', 'Published paper on scalable microservices'],
                order: 1
            },
            {
                degree: 'Bachelor of Science in IT',
                institution: 'State College',
                location: 'Boston, MA',
                year: '2017',
                startDate: 'Sep 2013',
                endDate: 'May 2017',
                description: 'Core focus on web technologies, databases, and algorithms.',
                order: 2
            }
        ]);

        // Create Certificates
        await Certificate.create([
            {
                title: 'AWS Certified Developer - Associate',
                issuer: 'Amazon Web Services',
                date: 'Aug 2023',
                credentialId: 'AWS-DEV-12345',
                link: 'https://aws.amazon.com/verification',
                order: 1
            },
            {
                title: 'MongoDB Node.js Developer Path',
                issuer: 'MongoDB University',
                date: 'Feb 2022',
                credentialId: 'MDB-NODE-9876',
                link: 'https://university.mongodb.com',
                order: 2
            }
        ]);

        // Create Testimonials
        await Testimonial.create([
            {
                name: 'Sarah Jenkins',
                position: 'Product Manager',
                company: 'Tech Innovators Inc.',
                text: 'Mohammed is an exceptional engineer. He completely transformed our frontend architecture and delivered a beautiful, fast application ahead of schedule.',
                order: 1
            },
            {
                name: 'David Chen',
                position: 'CTO',
                company: 'Digital Solutions LLC',
                text: 'Working with Mohammed was a pleasure. His deep understanding of the MERN stack and clean code practices made our backend robust and scalable.',
                order: 2
            }
        ]);

        // Create Sample Projects
        await Project.create([
            {
                title: 'E-commerce Platform Architecture',
                description: 'A full-featured e-commerce platform with payment integration, admin dashboard, and real-time inventory management.',
                technologies: ['React', 'Node.js', 'MongoDB', 'Redux', 'Stripe', 'Socket.io'],
                githubLink: 'https://github.com',
                liveLink: 'https://example.com',
                featured: true,
                role: 'Lead Full Stack Developer',
                challenges: 'Handling concurrent inventory updates during high-traffic sales events.',
                impact: 'Increased sales by 25% and reduced server costs by optimizing database queries.',
                architecture: 'Microservices architecture with Node.js backends and a React SPA frontend.',
                teamSize: 4,
                metrics: '98% Performance, 100% SEO, 100% Accessibility',
                order: 1
            },
            {
                title: 'AI Task Management SaaS',
                description: 'A modern task management application featuring AI-powered task prioritization and intelligent scheduling.',
                technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Express', 'OpenAI API'],
                githubLink: 'https://github.com',
                liveLink: 'https://example.com',
                featured: true,
                role: 'Frontend Architect',
                impact: 'Acquired 10,000+ active users within the first month of launch.',
                order: 2
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
        await Education.deleteMany();
        await Certificate.deleteMany();
        await Testimonial.deleteMany();

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
