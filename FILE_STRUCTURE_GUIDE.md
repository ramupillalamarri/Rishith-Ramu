# SmartHire AI - File-by-File Explanation

## PROJECT STRUCTURE OVERVIEW

```
smart-hire-js/
├── client/                          (React Frontend)
│   ├── src/
│   │   ├── components/              (9 React Components)
│   │   ├── App.jsx                  (Main routing)
│   │   ├── main.jsx                 (React entry point)
│   │   └── index.css                (Global styles)
│   ├── package.json                 (Frontend dependencies)
│   ├── vite.config.js               (Vite configuration)
│   ├── tailwind.config.js           (Tailwind configuration)
│   └── index.html                   (HTML template)
│
├── server/                          (Node.js Backend)
│   ├── models/                      (Database models)
│   ├── utils/                       (Helper functions)
│   ├── config/                      (Configuration)
│   ├── server.js                    (Express app + routes)
│   ├── package.json                 (Backend dependencies)
│   └── .env                         (Environment variables)
│
├── package.json                     (Root package)
└── Documentation files              (*.md files)
```

---

## FRONTEND FILES (CLIENT)

### ROOT LEVEL - `client/package.json`

**What It Does:**
```json
{
  "name": "client",
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.x.x",
    "axios": "^1.x.x"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x.x",
    "vite": "^7.3.1",
    "tailwindcss": "^3.4.16"
  }
}
```

**Purpose:**
- Lists all npm packages frontend needs
- Defines scripts to run development/build
- Specifies versions for compatibility

**What Happens If Missing:**
❌ `npm install` won't know what to download
❌ `npm run dev` command won't exist
❌ Frontend won't run at all
❌ Cannot track dependencies

---

### `client/vite.config.js`

**What It Does:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173  // Development port
  }
})
```

**Purpose:**
- Configures Vite build tool
- Tells Vite how to process React components
- Sets development server port

**What Happens If Missing:**
❌ `npm run dev` will use default settings
⚠️ Port might conflict with other apps
❌ React components might not compile correctly
❌ Hot module reload might not work

---

### `client/tailwind.config.js`

**What It Does:**
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {}
  },
  plugins: []
}
```

**Purpose:**
- Configures Tailwind CSS preprocessing
- Tells Tailwind which files to scan for class names
- Optimizes CSS bundle (purges unused styles)

**What Happens If Missing:**
❌ Tailwind classes won't be processed
❌ All CSS utilities will be in bundle (200KB instead of 50KB)
❌ Styles might not work correctly
❌ App will have no styling

---

### `client/index.html`

**What It Does:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SmartHire AI</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

**Purpose:**
- Entry point HTML file that browser loads
- Creates `<div id="root">` where React mounts
- Links to React JavaScript file

**What Happens If Missing:**
❌ Browser has no HTML to load
❌ React has nowhere to mount (`ReactDOM.createRoot()` fails)
❌ Entire app won't load
❌ 404 error in browser

---

### `client/src/main.jsx`

**What It Does:**
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

**Purpose:**
- React entry point
- Finds `<div id="root">` in HTML
- Renders `<App />` component into it
- Imports global CSS

**What Happens If Missing:**
❌ React doesn't know how to start
❌ App component never renders
❌ Entire app doesn't load
❌ JavaScript console shows error: "Cannot find module 'react'"

---

### `client/src/App.jsx`

**What It Does:**
```javascript
function App() {
  return (
    <Router>
      <nav>Navigation Bar</nav>
      <Routes>
        <Route path="/" element={<JobDashboard />} />
        <Route path="/create" element={<CreateJob />} />
        <Route path="/analyze/:jobId" element={<ResumeAnalyzer />} />
        <Route path="/candidates/:jobId" element={<CandidatesList />} />
        <Route path="/candidate/:candidateId" element={<CandidateDetail />} />
        <Route path="/bulk/:jobId" element={<BulkUpload />} />
      </Routes>
    </Router>
  )
}
```

**Purpose:**
- Main routing component
- Defines all pages/routes in the app
- Shows navigation bar on all pages
- Central component that orchestrates everything

**What Happens If Missing:**
❌ No routing (can't navigate between pages)
❌ Only see one component
❌ Navigation bar doesn't appear
❌ URL changes don't trigger page changes
❌ App is just a single component, not a full app

---

### `client/src/index.css`

**What It Does:**
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  background-color: #f9fafb;
}

/* Global styles applied to entire app */
```

**Purpose:**
- Global CSS applied to all pages
- Reset default browser styles
- Define global fonts and colors
- Applied before Tailwind utilities

**What Happens If Missing:**
⚠️ No global reset (margins/padding from browser defaults)
⚠️ Fonts might look different
⚠️ Tailwind utilities still work (but no baseline)
⚠️ App still functions, but looks less polished

---

### `client/src/components/JobDashboard.jsx`

**What It Does:**
```javascript
function JobDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs(); // Load jobs on page load
  }, []);

  return (
    <div>
      <h1>🎯 SmartHire Dashboard</h1>
      {/* Stats cards */}
      {/* Job cards */}
      {/* "Post New Job" button */}
    </div>
  )
}
```

**Purpose:**
- Home page / main dashboard
- Shows all jobs and statistics
- Fetches jobs from backend API
- Displays loading/error states
- Entry point for recruiters

**What Happens If Missing:**
❌ No home page
❌ No job listing visible
❌ Cannot see statistics
❌ Cannot navigate to other job-related actions
❌ App starts at wrong page or errors

**Dependencies:**
- Requires backend `/api/jobs` endpoint
- Requires router to navigate to `/create`, `/analyze/:jobId`

---

### `client/src/components/CreateJob.jsx`

**What It Does:**
```javascript
function CreateJob() {
  const [job, setJob] = useState({ title: '', description: '', requirements: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/jobs', job);
    navigate('/'); // Go back to dashboard
  };

  return (
    <form>
      <input placeholder="Job Title" onChange={e => setJob({...job, title: e.target.value})} />
      <textarea placeholder="Description" />
      <textarea placeholder="Requirements" />
      <button>Post Job</button>
    </form>
  )
}
```

**Purpose:**
- Page to create new job postings
- Form to enter job title, description, requirements
- Sends to backend API
- Redirects to dashboard after creation

**What Happens If Missing:**
❌ Cannot create new jobs
❌ App only shows pre-existing jobs from database
❌ "Post New Job" button doesn't work
❌ Recruiters stuck with static job list

**Dependencies:**
- Requires backend `POST /api/jobs` endpoint

---

### `client/src/components/ResumeAnalyzer.jsx`

**What It Does:**
```javascript
function ResumeAnalyzer() {
  const { jobId } = useParams(); // Get job from URL
  const [file, setFile] = useState(null);
  const [candidateName, setCandidateName] = useState('');
  const [result, setResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobId', jobId);
    
    const res = await axios.post('http://localhost:5000/api/analyze', formData);
    setResult(res.data); // Show AI analysis results
  };

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <input placeholder="Candidate Name" />
      <button onClick={handleUpload}>Analyze Resume</button>
      {result && <div>Score: {result.aiScore}%</div>}
    </div>
  )
}
```

**Purpose:**
- Upload and analyze single resume
- Shows AI score, match level, interview questions
- Key feature for resume evaluation
- Most complex component (real-time AI processing)

**What Happens If Missing:**
❌ Cannot upload resumes
❌ Cannot analyze resume content
❌ No AI scoring available
❌ Core functionality missing
❌ App becomes useless

**Dependencies:**
- Requires backend `POST /api/analyze` endpoint
- Requires Google Gemini API integration
- Requires pdf-parse for text extraction

---

### `client/src/components/CandidatesList.jsx`

**What It Does:**
```javascript
function CandidatesList() {
  const { jobId } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [filter, setFilter] = useState('all'); // Filter by experience level

  useEffect(() => {
    fetchCandidates(jobId);
  }, [jobId]);

  return (
    <div>
      <h1>Candidates for Job</h1>
      <select onChange={e => setFilter(e.target.value)}>
        <option>All Levels</option>
        <option>Junior</option>
        <option>Senior</option>
      </select>
      {candidates.map(c => (
        <div key={c.id}>
          <h2>{c.name}</h2>
          <p>Score: {c.aiScore}%</p>
          <Link to={`/candidate/${c.id}`}>View Profile</Link>
        </div>
      ))}
    </div>
  )
}
```

**Purpose:**
- Show all candidates for a specific job
- Filter by experience level
- Sort by match score
- Display top 3 candidates first (hackathon feature)
- Navigate to individual candidate profiles

**What Happens If Missing:**
❌ Cannot view all candidates for a job
❌ No way to filter/sort candidates
❌ Cannot access candidate detail pages
❌ Recruiters can't review all applications

**Dependencies:**
- Requires backend `/api/jobs/:id/candidates` endpoint

---

### `client/src/components/CandidateDetail.jsx`

**What It Does:**
```javascript
function CandidateDetail() {
  const { candidateId } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [notes, setNotes] = useState('');

  const saveNotes = () => {
    localStorage.setItem(`candidate-${candidateId}`, notes); // Persist notes
  };

  return (
    <div>
      <h1>{candidate.name}</h1>
      <p>Score: {candidate.aiScore}%</p>
      <h3>Interview Questions:</h3>
      {candidate.interviewQuestions.map(q => <p>{q}</p>)}
      <h3>My Notes:</h3>
      <textarea onChange={e => setNotes(e.target.value)} />
      <button onClick={saveNotes}>Save Notes</button>
    </div>
  )
}
```

**Purpose:**
- Full candidate profile page
- Shows resume content, AI score, interview questions
- Allows recruiters to save personal notes (localStorage)
- Detailed view of why candidate matches job
- Hackathon feature: smart interview questions

**What Happens If Missing:**
❌ Cannot view full candidate profiles
❌ Cannot see interview questions
❌ Cannot save notes about candidates
❌ Recruiters lose personalization features

**Dependencies:**
- Requires backend `/api/candidates/:id` endpoint
- Uses localStorage for notes (browser-based)

---

### `client/src/components/BulkUpload.jsx`

**What It Does:**
```javascript
function BulkUpload() {
  const { jobId } = useParams();
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);

  const uploadBulk = async () => {
    const uploadPromises = files.map(file => {
      const formData = new FormData();
      formData.append('resume', file);
      return axios.post('http://localhost:5000/api/analyze', formData);
    });

    const results = await Promise.all(uploadPromises); // Parallel processing
    setResults(results); // Show success/fail for each
  };

  return (
    <div>
      <h2>Bulk Upload Resumes</h2>
      {/* Drag-drop area */}
      <input type="file" multiple onChange={e => setFiles([...e.target.files])} />
      <button onClick={uploadBulk}>Upload {files.length} Resumes</button>
      {results.map(r => <div>{r.name}: {r.success ? 'Done' : 'Failed'}</div>)}
    </div>
  )
}
```

**Purpose:**
- Upload multiple resumes at once
- Drag-drop interface
- Parallel processing (all resumes at same time)
- Shows results for each file (success/fail/duplicate)
- Hackathon feature: bulk processing

**What Happens If Missing:**
❌ Cannot upload multiple resumes
❌ Must upload one at a time (slow)
❌ No bulk processing capability
❌ Could test 10 resumes in 30 seconds instead of 5 minutes

**Dependencies:**
- Requires backend `POST /api/analyze` endpoint to handle parallel requests

---

## BACKEND FILES (SERVER)

### ROOT LEVEL - `server/package.json`

**What It Does:**
```json
{
  "name": "server",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^5.2.1",
    "sequelize": "^6.x.x",
    "axios": "^1.x.x",
    "google-generative-ai": "latest",
    "pdf-parse": "^1.x.x",
    "multer": "^1.x.x",
    "cors": "^2.x.x",
    "dotenv": "^16.x.x"
  }
}
```

**Purpose:**
- Lists all backend npm packages
- Defines scripts to start/develop server
- Tracks dependency versions

**What Happens If Missing:**
❌ `npm install` in server folder fails
❌ `npm start` command doesn't exist
❌ Cannot run backend at all

---

### `server/.env`

**What It Does:**
```
PORT=5000
NODE_ENV=development
DATABASE_URL=sqlite
GEMINI_API_KEY=AIzaSy...your_key_here...
```

**Purpose:**
- Stores sensitive configuration
- API keys (not in code)
- Database URL
- Environment settings (dev/prod)
- NOT committed to git (security)

**What Happens If Missing:**
❌ Backend runs on default port (3000)
⚠️ Gemini API calls fail (no API key)
❌ Database defaults to SQLite (might be wrong for production)
❌ App crashes immediately (depends on env vars)

---

### `server/server.js`

**What It Does:**
```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Job = require('./models/Job');
const Candidate = require('./models/Candidate');

const app = express();
app.use(cors()); // Allow frontend to call backend
app.use(express.json()); // Parse JSON requests

// Route 1: Create Job
app.post('/api/jobs', async (req, res) => {
  const job = await Job.create(req.body);
  res.json(job);
});

// Route 2: Get All Jobs
app.get('/api/jobs', async (req, res) => {
  const jobs = await Job.findAll();
  res.json(jobs);
});

// Route 3: Analyze Resume
app.post('/api/analyze', upload.single('resume'), async (req, res) => {
  const resumeText = await pdfParse(req.file.buffer);
  const aiResult = await analyzeResume(job.description, resumeText);
  const candidate = await Candidate.create({...});
  res.json(candidate);
});

// ... 4 more routes ...

app.listen(5000, () => console.log('Server on port 5000'));
```

**Purpose:**
- Main Express server file
- Defines all 7 API endpoints
- Handles database queries
- Processes file uploads
- Calls Google Gemini AI
- Saves results to database

**What Happens If Missing:**
❌ No backend server at all
❌ Frontend API calls have nowhere to go
❌ `/api/jobs`, `/api/analyze`, etc. endpoints don't exist
❌ Database never gets connected
❌ Entire app is non-functional

**Key Routes:**
```
POST   /api/jobs                          → Create new job
GET    /api/jobs                          → Get all jobs
GET    /api/jobs/:id                      → Get single job
POST   /api/analyze                       → Upload and analyze resume
GET    /api/jobs/:id/candidates           → Get candidates for job
GET    /api/candidates/:id                → Get single candidate
GET    /api/candidates/:id/interviews     → Get interview questions
```

---

### `server/config/database.js`

**What It Does:**
```javascript
const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('postgres')) {
  // Use PostgreSQL for production
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
  });
} else {
  // Use SQLite for development
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './smarthire.db'
  });
}

module.exports = sequelize;
```

**Purpose:**
- Creates database connection
- Checks environment to pick SQLite or PostgreSQL
- Sequelize instance (ORM) used by all models
- Handles database pool/lifecycle

**What Happens If Missing:**
❌ No database connection
❌ Models can't query data
❌ App crashes when trying to save jobs
❌ All database operations fail

**Dependencies:**
- Requires SQLite or PostgreSQL to be installed
- Requires DATABASE_URL env var (for PostgreSQL)

---

### `server/models/Job.js`

**What It Does:**
```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Job = sequelize.define('Job', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  requirements: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  skills: {
    type: DataTypes.JSON,
    defaultValue: []
  }
});

module.exports = Job;
```

**Purpose:**
- Defines Job database table structure
- Specifies columns (id, title, description, etc.)
- Data validation (allowNull, type checking)
- Sequelize model for database operations

**What Happens If Missing:**
❌ Cannot create/read jobs from database
❌ `Job.create()`, `Job.findAll()` fail
❌ Job table doesn't exist in database
❌ App crashes when trying to post/fetch jobs

**Related Code:**
- Used in: `server.js` route handlers
- Used in: `JobDashboard.jsx` (fetches jobs)
- Used in: `CreateJob.jsx` (creates jobs)

---

### `server/models/Candidate.js`

**What It Does:**
```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Job = require('./Job');

const Candidate = sequelize.define('Candidate', {
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  resumeText: { type: DataTypes.TEXT },
  resumeHash: { type: DataTypes.STRING }, // Duplicate detection
  aiScore: { type: DataTypes.INTEGER },
  aiMatchSize: { type: DataTypes.STRING },
  aiSummary: { type: DataTypes.TEXT },
  interviewQuestions: { type: DataTypes.JSON },
  missingKeywords: { type: DataTypes.JSON },
  jobId: { type: DataTypes.INTEGER, foreignKey: true }
});

Candidate.belongsTo(Job);
Job.hasMany(Candidate);

Candidate.generateResumeHash = (resumeText) => {
  return crypto.createHash('sha256').update(resumeText).digest('hex');
};

module.exports = Candidate;
```

**Purpose:**
- Defines Candidate database table
- Stores all resume analysis data
- Creates relationship with Job (one job → many candidates)
- Hash function for duplicate detection
- AI analysis results storage

**What Happens If Missing:**
❌ Cannot save analyzed candidates
❌ `Candidate.create()` fails
❌ No way to store scores, interview questions
❌ Resume analysis results disappear
❌ No duplicate detection

**Key Fields:**
- `resumeHash`: Content-based fingerprint (detects duplicates)
- `aiScore`: 0-100 match percentage
- `aiMatchSize`: High/Medium/Low
- `interviewQuestions`: AI-generated questions
- `jobId`: Links to parent job

---

### `server/utils/ai.js`

**What It Does:**
```javascript
const { GoogleGenerativeAI } = require('@google/generative-ai');

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeResume = async (jobDescription, resumeText) => {
  const prompt = `
    You are an expert recruiter. Analyze this resume against the job.
    
    JOB: ${jobDescription}
    RESUME: ${resumeText}
    
    Provide:
    1. Match Score (0-100)
    2. Match Size (High/Medium/Low)
    3. Summary (2-3 sentences)
    4. Matched Skills (array)
    5. Missing Keywords (array)
    6. Interview Questions (array of 5)
    
    Return JSON format only.
  `;

  const response = await client.generateContent(prompt);
  return JSON.parse(response.text());
};

module.exports = { analyzeResume };
```

**Purpose:**
- Google Gemini AI integration
- Analyzes resume vs job description
- Returns structured JSON with score, questions, etc.
- Core AI logic for SmartHire

**What Happens If Missing:**
❌ No AI analysis
❌ Cannot score resumes
❌ No interview questions generated
❌ Backend returns errors for `/api/analyze`
❌ Entire AI feature missing

**Dependencies:**
- Requires `GEMINI_API_KEY` env var
- Requires internet connection
- Requires Google Generative AI package

---

### `server/init-test-data.js`

**What It Does:**
```javascript
const sequelize = require('./config/database');
const Job = require('./models/Job');

async function initTestData() {
  await sequelize.sync();
  
  const jobCount = await Job.count();
  if (jobCount === 0) {
    await Job.bulkCreate([
      { title: 'Senior React Developer', description: '...', requirements: '...' },
      { title: 'Full Stack Developer', description: '...', requirements: '...' },
      { title: 'DevOps Engineer', description: '...', requirements: '...' }
    ]);
  }
  
  await sequelize.close();
}

initTestData();
```

**Purpose:**
- One-time script to create test data
- Runs: `node init-test-data.js`
- Creates 3 sample jobs for demo
- Used after database is reset

**What Happens If Missing:**
⚠️ Database is empty after reset
⚠️ No test jobs to demo with
⚠️ Have to manually create jobs via API
⚠️ Presentation would be harder

**When Needed:**
- After `rm smarthire.db` (database deletion)
- After switching databases
- Fresh installation setup

---

## CONFIGURATION FILES

### `postcss.config.js` (Frontend)

**What It Does:**
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}
```

**Purpose:**
- Post-processes CSS after Tailwind generates it
- Autoprefixer adds vendor prefixes (-webkit-, -moz-)
- Makes CSS work in older browsers

**What Happens If Missing:**
⚠️ Tailwind still works
⚠️ Some CSS features might not work in older browsers
⚠️ `-webkit-` and `-moz-` prefixes not added
⚠️ App looks bad on older browsers

---

### `eslint.config.js` (Frontend)

**What It Does:**
```javascript
export default [
  {
    rules: {
      'react/no-unknown-property': 'warn',
      'react-refresh/only-export-components': 'warn'
    }
  }
]
```

**Purpose:**
- Lints JavaScript code (checks for errors)
- React-specific rules
- Catches bugs before runtime

**What Happens If Missing:**
⚠️ ESLint disabled
⚠️ Code errors not caught during development
⚠️ Bugs might slip into production
⚠️ Code quality lower

---

## DOCUMENTATION FILES

### `README.md`

**What It Does:**
- Project overview
- Installation steps
- How to run project
- Architecture explanation

**What Happens If Missing:**
⚠️ No instructions for newcomers
⚠️ Hard to understand how to run project
⚠️ Users don't know what app does

---

### `DETAILED_PRESENTATION.md`

**What It Does:**
- 15-minute presentation guide
- Features breakdown
- Technology explanation
- Demo workflow

**What Happens If Missing:**
⚠️ No structured presentation plan
⚠️ Harder to explain project
⚠️ Demo might be disorganized

---

### `TECHNOLOGY_EXPLANATION.md`

**What It Does:**
- Explains each technology
- Why each tech was chosen
- How to scale project
- Performance details

**What Happens If Missing:**
⚠️ Can't explain tech stack
⚠️ No reference for architecture decisions
⚠️ Hard to onboard new developers

---

## DEPENDENCY MAP (What depends on what)

```
main.jsx
  ↓ imports
App.jsx ← All 6 components are imported here
  ├→ JobDashboard.jsx
  │   ├→ axios (calls /api/jobs)
  │   └→ useNavigate (React Router)
  │
  ├→ CreateJob.jsx
  │   ├→ axios (POST /api/jobs)
  │   └→ useNavigate
  │
  ├→ ResumeAnalyzer.jsx
  │   ├→ axios (POST /api/analyze) ← REQUIRES server.js
  │   ├→ useParams (from URL)
  │   └→ useState
  │
  ├→ CandidatesList.jsx
  │   ├→ axios (GET /api/jobs/:id/candidates)
  │   └→ useParams
  │
  ├→ CandidateDetail.jsx
  │   ├→ localStorage (browser API)
  │   └→ useParams
  │
  └→ BulkUpload.jsx
      ├→ axios (Promise.all for parallel)
      └→ useParams

server.js
  ├→ models/Job.js (database queries)
  ├→ models/Candidate.js (database queries)
  ├→ config/database.js (connection)
  ├→ utils/ai.js (Gemini API calls)
  ├→ multer (file upload)
  └→ pdf-parse (text extraction)
```

---

## CRITICAL FILES (App won't work without these)

| File | Why Critical | If Missing |
|------|-------------|-----------|
| `main.jsx` | React entry point | App doesn't load |
| `App.jsx` | Routing & navigation | No pages exist |
| `server.js` | Backend API | No data processing |
| `models/Job.js` | Job database | Can't save jobs |
| `models/Candidate.js` | Candidate storage | Can't save analysis |
| `config/database.js` | Database connection | No DB access |
| `utils/ai.js` | AI integration | No analysis |
| `package.json` (both) | Dependencies | Can't install packages |

---

## OPTIONAL FILES (App works, but missing features)

| File | Missing Feature | Impact |
|------|----------------|--------|
| `BulkUpload.jsx` | Bulk upload | Can only upload 1 at a time |
| `CandidateDetail.jsx` | Full profiles | Can't see details or notes |
| `init-test-data.js` | Sample data | Must create jobs manually |
| `tailwind.config.js` | Config | Default Tailwind settings |
| `eslint.config.js` | Linting | No code quality checks |

---

## FILE SIZE IMPACT

```
Smallest Impact (easily replaceable):
- index.css (50 lines)
- eslint.config.js (10 lines)
- postcss.config.js (10 lines)

Medium Impact (would take time to rewrite):
- CreateJob.jsx (60 lines)
- CandidatesList.jsx (193 lines)
- ResumeAnalyzer.jsx (290 lines)

Largest Impact (complex logic):
- server.js (155 lines) - 7 routes, AI integration
- BulkUpload.jsx (260 lines) - Parallel processing, progress tracking
- Candidate.js (45 lines) - Relationships, hashing logic
```

---

## SUMMARY TABLE: File → Purpose → If Missing

| File | Purpose | If Missing | Criticality |
|------|---------|-----------|------------|
| `package.json` (×2) | Dependencies | Can't run anything | **CRITICAL** |
| `main.jsx` | React startup | App doesn't load | **CRITICAL** |
| `App.jsx` | Routing | No navigation | **CRITICAL** |
| `server.js` | Backend API | No data/AI | **CRITICAL** |
| `models/Job.js` | Job schema | Can't save jobs | **CRITICAL** |
| `models/Candidate.js` | Candidate schema | Can't save analysis | **CRITICAL** |
| `config/database.js` | DB connection | No database | **CRITICAL** |
| `utils/ai.js` | AI integration | No analysis | **CRITICAL** |
| `JobDashboard.jsx` | Home page | No job listing | **HIGH** |
| `ResumeAnalyzer.jsx` | Core feature | Can't analyze | **HIGH** |
| `CreateJob.jsx` | Job posting | Manual DB edit needed | **HIGH** |
| `CandidatesList.jsx` | View results | Can't filter candidates | **MEDIUM** |
| `CandidateDetail.jsx` | Full profiles | Can't see details | **MEDIUM** |
| `BulkUpload.jsx` | Batch upload | Slow single uploads | **MEDIUM** |
| `index.css` | Styling | Looks ugly | **LOW** |
| `.env` | Config | Wrong ports/keys | **HIGH** |
| `vite.config.js` | Build settings | HMR might fail | **LOW** |
| `tailwind.config.js` | CSS settings | Bundle bigger | **LOW** |
| `init-test-data.js` | Sample data | Manual setup | **LOW** |

---

## HOW TO READ THIS GUIDE

**If you want to understand:** | **Read this section:**
---|---
How the app starts | main.jsx → App.jsx → components
How to add a new API | See patterns in server.js routes
How to add a new page | Duplicate component + add route in App.jsx
How database works | config/database.js → models/
How AI works | utils/ai.js (100 lines, very readable)
Why something breaks | Check "If Missing" column for that file
How to deploy | Check DATABASE_URL and GEMINI_API_KEY in .env

