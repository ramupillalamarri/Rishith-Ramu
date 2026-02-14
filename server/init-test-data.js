require('dotenv').config();
const sequelize = require('./config/database');
const Job = require('./models/Job');
const Candidate = require('./models/Candidate');

async function initTestData() {
    try {
        // Sync database
        await sequelize.sync({ force: false });
        
        // Check if jobs already exist
        const jobCount = await Job.count();
        
        if (jobCount === 0) {
            console.log('Creating test jobs...');
            
            const jobs = await Job.bulkCreate([
                {
                    title: 'Senior React Developer',
                    description: 'Looking for an experienced React developer with expertise in modern JavaScript frameworks and state management.',
                    requirements: 'React, JavaScript, Node.js, REST APIs, Git',
                    skills: ['React', 'JavaScript', 'Node.js', 'REST APIs']
                },
                {
                    title: 'Full Stack Developer',
                    description: 'We need a talented full-stack developer to join our growing team.',
                    requirements: 'React, Node.js, PostgreSQL, Docker, AWS',
                    skills: ['React', 'Node.js', 'PostgreSQL', 'Docker']
                },
                {
                    title: 'DevOps Engineer',
                    description: 'Seeking DevOps professional to manage our infrastructure.',
                    requirements: 'Docker, Kubernetes, AWS/GCP, CI/CD, Linux',
                    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD']
                }
            ]);
            
            console.log(`✅ Created ${jobs.length} test jobs`);
            console.log('Test jobs:', jobs.map(j => ({ id: j.id, title: j.title })));
        } else {
            console.log(`✅ Database already has ${jobCount} jobs`);
        }
        
        await sequelize.close();
        console.log('✅ Database initialization complete');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error initializing test data:', error.message);
        process.exit(1);
    }
}

initTestData();
