const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Job = require('./Job');
const crypto = require('crypto');

const Candidate = sequelize.define('Candidate', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resumeText: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    resumeHash: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Hash of resume content to detect duplicate submissions'
    },
    aiScore: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    aiMatchSize: {
        type: DataTypes.STRING, // High, Medium, Low
        allowNull: true
    },
    aiSummary: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    interviewQuestions: {
        type: DataTypes.JSON, // Use JSON for arrays in Postgres
        allowNull: true
    },
    missingKeywords: {
        type: DataTypes.JSON, // Use JSON for arrays in Postgres
        allowNull: true,
        defaultValue: []
    }
});

// Define relationship
Candidate.belongsTo(Job, { foreignKey: 'jobId' });
Job.hasMany(Candidate, { foreignKey: 'jobId' });

// Helper function to generate hash of resume content
Candidate.generateResumeHash = (resumeText) => {
    return crypto.createHash('sha256').update(resumeText.trim().toLowerCase()).digest('hex');
};

module.exports = Candidate;
