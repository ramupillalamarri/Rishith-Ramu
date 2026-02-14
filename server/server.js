require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const crypto = require('crypto');
const pdfParse = require('pdf-parse');
const { analyzeResume } = require('./utils/ai');
const sequelize = require('./config/database');
const Job = require('./models/Job');
const Candidate = require('./models/Candidate');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
sequelize.sync()
    .then(() => console.log('PostgreSQL Connected & Models Synced'))
    .catch(err => console.error('PostgreSQL Connection Error:', err));

// Multer Setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes

// 1. Create Job
app.post('/api/jobs', async (req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 2. Get All Jobs
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await Job.findAll({ order: [['createdAt', 'DESC']] });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2.5. Get Single Job by ID
app.get('/api/jobs/:id', async (req, res) => {
    try {
        const job = await Job.findByPk(req.params.id);
        if (!job) return res.status(404).json({ error: "Job not found" });
        res.json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Upload Resume & Analyze
app.post('/api/analyze', upload.single('resume'), async (req, res) => {
    try {
        const { jobId, candidateName, candidateEmail } = req.body;
        const file = req.file;

        if (!file || !jobId) {
            return res.status(400).json({ error: "Resume file and Job ID are required." });
        }

        // Parse PDF
        let resumeText = '';
        try {
            const pdfData = await pdfParse(file.buffer);
            resumeText = pdfData.text;
        } catch (pdfError) {
            // Fallback: treat as plain text if PDF parsing fails
            console.warn('PDF parsing failed, using raw content:', pdfError.message);
            resumeText = file.buffer.toString('utf-8');
        }

        // Generate hash of resume content
        const resumeHash = Candidate.generateResumeHash(resumeText);

        // Check if same resume already applied for this job
        const existingCandidate = await Candidate.findOne({
            where: { 
                jobId: jobId,
                resumeHash: resumeHash
            }
        });

        if (existingCandidate) {
            return res.status(409).json({ 
                error: "This resume has already been submitted for this job.",
                existingCandidateId: existingCandidate.id,
                candidateName: existingCandidate.name
            });
        }

        // Fetch Job Description
        const job = await Job.findByPk(jobId);
        if (!job) return res.status(404).json({ error: "Job not found." });

        // AI Analysis
        const aiResult = await analyzeResume(job.description, resumeText);

        // Save Candidate
        const candidate = await Candidate.create({
            jobId,
            name: candidateName || "Unknown Candidate",
            email: candidateEmail || "not-provided@example.com",
            resumeText,
            resumeHash,
            aiScore: aiResult.score,
            aiMatchSize: aiResult.matchSize,
            aiSummary: aiResult.summary,
            interviewQuestions: aiResult.interviewQuestions,
            missingKeywords: aiResult.missingKeywords || [],
        });

        res.json({
            id: candidate.id,
            name: candidate.name,
            email: candidate.email,
            aiScore: candidate.aiScore,
            aiMatchSize: candidate.aiMatchSize,
            aiSummary: candidate.aiSummary,
            interviewQuestions: candidate.interviewQuestions,
            missingKeywords: candidate.missingKeywords,
            resumeText: candidate.resumeText
        });

    } catch (error) {
        console.error("Analysis Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 4. Get Candidates for a Job
app.get('/api/jobs/:id/candidates', async (req, res) => {
    try {
        const candidates = await Candidate.findAll({
            where: { jobId: req.params.id },
            order: [['aiScore', 'DESC']]
        });
        res.json(candidates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
