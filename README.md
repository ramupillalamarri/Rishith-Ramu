#SmartHire AI - AI-Powered Recruitment Platform
#Contributors
-Malyala Rishith
-Pillalamarri Ramu
## Overview

SmartHire AI is an intelligent resume screening and candidate matching platform powered by Google's Gemini AI. It helps recruiters screen hundreds of resumes in minutes, automatically score candidates by skill match, and identify top candidates for any job position.

**Live at:** `http://localhost:5173` (Development)

---

## ✨ Features Implemented

### Core Features
- ✅ **Resume Screening** - Upload PDFs and get instant AI analysis
- ✅ **AI Scoring** - Google Gemini 2.0 Flash for deterministic scoring (temperature=0)
- ✅ **Job Posting** - Create job positions with title, description, requirements
- ✅ **Candidate Management** - Track all candidates for each job
- ✅ **Match Breakdown** - Visual representation of matched vs missing skills

### Features
1. **📊 Results Dashboard** - View all candidates in sortable, filterable table
2. **📤 Bulk Upload** - Upload 10+ resumes simultaneously with parallel processing
3. **📈 Visual Match Breakdown** - Graph matching skills vs requirements
4. **👤 Candidate Details** - Complete profile view with interview questions
5. **⭐ Top Candidates** - AI-ranked recommendations on dashboard
6. **🧭 Complete Routing** - Seamless navigation between 6+ pages

---

## 🏗️ Tech Stack

### Frontend by rishith
- **React 19.2.0** - Modern UI framework
- **Vite 7.3.1** - Lightning-fast development bundler
- **React Router v7** - Client-side routing
- **Tailwind CSS 3.4.16** - Beautiful responsive styling
- **Axios 1.13.5** - HTTP client
- **localStorage API** - Local data persistence

### Backend by ramu
- **Node.js + Express.js** - REST API server
- **Sequelize 6.37.7** - ORM for database abstraction
- **SQLite** - Local database (file-based)
- **Google Generative AI** - Gemini 2.0 Flash model
- **Multer** - File upload handling
- **pdf-parse** - PDF text extraction

### Key Libraries
- `pdfjs-dist` - Advanced PDF parsing
- `dotenv` - Environment configuration
- `cors` - Cross-origin resource sharing
- `concurrently` - Parallel process execution

---

## 📋 Project Structure

```
smart-hire-js/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── App.jsx                 # Main app with routes
│   │   ├── main.jsx                # React entry point
│   │   ├── index.css               # Global styles
│   │   ├── App.css                 # App styles
│   │   └── components/
│   │       ├── JobDashboard.jsx    # Main dashboard with job cards
│   │       ├── CreateJob.jsx       # Post new job form
│   │       ├── ResumeAnalyzer.jsx  # Upload & analyze resume
│   │       ├── CandidatesList.jsx  # Results table view
│   │       ├── CandidateDetail.jsx # Full candidate profile
│   │       └── BulkUpload.jsx      # Batch resume upload
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── eslint.config.js
│   └── index.html
│
├── server/                          # Node.js Backend
│   ├── server.js                   # Express app & routes
│   ├── test-deterministic.js       # API key validator
│   ├── package.json
│   ├── .env                        # Configuration
│   ├── config/
│   │   └── database.js             # Sequelize config
│   ├── models/
│   │   ├── Job.js                  # Job data model
│   │   └── Candidate.js            # Candidate data model
│   └── utils/
│       └── ai.js                   # Gemini AI integration
│
├── package.json                     # Root package (npm scripts)
├── HACKATHON_FEATURES.md           # Feature documentation
└── README.md                        # This file
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Google API key (free tier available at aistudio.google.com)

### Installation

```bash
# Clone the repository
cd smart-hire-js

# Install root dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..

# Install server dependencies
cd server && npm install && cd ..
```

### Configuration

**Server Setup:**
```bash
# Create server/.env
PORT=5000
DATABASE_URL=sqlite::memory:
GEMINI_API_KEY=YOUR_GOOGLE_API_KEY_HERE
```

**Get API Key:**
1. Visit [Google AI Studio](https://aistudio.google.com)
2. Click "Get API Key" → "Create new free API key"
3. Copy the key to `server/.env`

### Running the Application

```bash
# Start both frontend and backend
npm run dev

# Frontend: http://localhost:5173
# Backend: http://localhost:5000
```

---

## 📱 User Flows

### Flow 1: Create Job & Analyze Resume
```
Dashboard
  → Post New Job
    → Enter title, description, requirements
    → Submit
  → Job appears in grid
    → Click job card
    → Upload resume
    → See AI analysis
```

### Flow 2: View Results & Top Candidates
```
Dashboard
  → Job with candidates
    → "View X Candidates" button
    → See all candidates in table
    → Filter by match level
    → Top 3 highlighted at top
    → Click "View Details" → Full profile
```

### Flow 3: Bulk Upload Multiple Resumes
```
Dashboard
  → Job card
    → "📦 Bulk Upload" button
    → Drag-drop 10+ PDFs
    → Upload all in parallel
    → See results with scores
    → Navigate to candidates list
```

---

## 🎨 UI Components Showcase

### 1. **JobDashboard** (Home Page)
- Statistics cards (total jobs, candidates, analyses)
- Job grid with action buttons
- Quick links to add resumes or bulk upload
- Insights section with top job

### 2. **ResumeAnalyzer** (Analyze Single Resume)
- Clean two-column layout
- PDF upload with candidate name
- Match breakdown visualization
- Interview questions list
- Navigate to bulk upload or view all candidates

### 3. **CandidatesList** (Results Table)
- Sortable table with name, match, score
- Filter by match level (High/Medium/Low)
- Top 3 candidates highlighted
- Statistics cards
- Direct links to view full profiles

### 4. **CandidateDetail** (Full Profile)
- Gradient hero section (color-coded by score)
- Match analysis bar chart
- Missing keywords badges
- Interview questions list
- Resume preview
- Notes editor with localStorage persistence
- Email contact button

### 5. **BulkUpload** (Batch Upload)
- Drag-drop zone with visual feedback
- File list with size indicators
- Parallel upload processing
- Results summary and individual file status
- Navigate to candidates list

### 6. **CreateJob** (Post Job)
- Form with title, description, requirements
- Success message with navigation

---

## 🔌 API Endpoints

### Jobs
- `GET /api/jobs` - List all jobs
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create new job

### Resume Analysis
- `POST /api/analyze` - Upload and analyze resume
  - Form data: `resume` (file), `jobId`, `candidateName`, `jobDescription`
  - Returns: Candidate data with AI score, summary, interview questions

### Candidates
- `GET /api/jobs/:id/candidates` - Get all candidates for job
  - Returns: Array sorted by score (descending)

---

## 📊 AI Analysis Output

Each resume analysis returns:
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "aiScore": 82,
  "aiMatchSize": "High",
  "aiSummary": "Strong candidate with relevant experience...",
  "interviewQuestions": [
    "Can you describe your experience with...",
    "Tell us about a challenging project..."
  ],
  "missingKeywords": ["Docker", "Kubernetes", "CI/CD"],
  "resumeText": "..."
}
```

---

## 🎯 Scoring Logic

- **0-49%:** Low Match (🔴 Red badge)
- **50-74%:** Medium Match (🟡 Yellow badge)
- **75-100%:** High Match (🟢 Green badge)

Scores determined by:
1. Skill keyword matching (resume vs job requirements)
2. Experience level assessment
3. Relevant project experience
4. Educational background fit
5. Overall job alignment

---

## 🧪 Testing Features

### Test Scenarios
1. **Create Job** - Post a React Developer position
2. **Upload Resume** - Add a candidate's resume
3. **View Analysis** - Check scoring and match breakdown
4. **Bulk Upload** - Upload 3-5 sample PDFs at once
5. **View Candidates** - Filter and sort results
6. **View Profile** - Check full candidate details

### Sample Job to Create
```
Title: Full-Stack Developer
Description: We're looking for an experienced developer with 3+ years
Requirements: React, Node.js, PostgreSQL, REST APIs, Docker
```

### Sample Resume Keywords
Add PDF with keywords like:
- React, Vue, Angular
- Node.js, Python, Java
- PostgreSQL, MongoDB
- Docker, AWS, CI/CD
- REST APIs, GraphQL

---

## ⚙️ Configuration

### .env Variables
```bash
# Backend
PORT=5000
DATABASE_URL=sqlite::memory:  # or :memory: for in-memory DB
GEMINI_API_KEY=AIzaSy...     # Get from aistudio.google.com

# Optional
NODE_ENV=development
```

### Vite Configuration (Frontend)
- Dev server: `localhost:5173`
- HMR enabled for hot reload
- Tailwind CSS bundled
- Optimized build output to `dist/`

---

## 🔐 Security Considerations

For production:
1. ❌ Move API keys to GitHub secrets (not .env in repo)
2. ❌ Add authentication (JWT tokens)
3. ❌ Validate file types and sizes
4. ❌ Rate limit API endpoints
5. ❌ Store files in cloud (S3, GCS) not server
6. ❌ Add HTTPS/TLS encryption
7. ❌ Implement CORS whitelist

---

## 📈 Performance Optimizations

- **Lazy Loading:** React Router code splitting
- **Build Optimization:** Vite tree-shaking and minification
- **Caching:** localStorage for candidate data
- **Parallel Uploads:** Promise.all() for bulk operations
- **Database:** SQLite for fast local queries
- **API Efficiency:** Single trip to fetch candidates for job

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Database Not Syncing
```bash
# Clear database and restart
rm server/smarthire.db  # Delete SQLite file
npm run dev             # Restart to recreate
```

### Google API Errors
- **404:** Model not found → Use `gemini-2.0-flash` instead
- **429:** Quota exceeded → Wait for daily reset (UTC midnight) or add billing
- **Invalid key:** Verify from aistudio.google.com, not Google Cloud Console

### Build Issues
```bash
# Clear node_modules and cache
rm -r node_modules client/node_modules server/node_modules
npm install
npm run dev
```

---

## 📚 Dependencies

### Frontend (client/package.json)
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.13.0",
  "axios": "^1.13.5",
  "tailwindcss": "^3.4.16"
}
```

### Backend (server/package.json)
```json
{
  "express": "^5.2.1",
  "sequelize": "^6.37.7",
  "sqlite3": "^5.1.7",
  "pdf-parse": "^1.1.1",
  "@google/generative-ai": "^0.21.0",
  "multer": "^1.4.5",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3"
}
```

---

## 🎓 Learning Resources

- [React Hooks Documentation](https://react.dev/reference/react)
- [Tailwind CSS Official Guide](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [Express.js Guide](https://expressjs.com)
- [Sequelize ORM](https://sequelize.org)
- [Google Generative AI Documentation](https://ai.google.dev)

---

## 🚀 Future Enhancements

- [ ] User authentication (Google OAuth)
- [ ] Team collaboration features
- [ ] Resume library and version history
- [ ] Advanced filtering (experience level, location, salary)
- [ ] Candidate messaging system
- [ ] Export reports (PDF, CSV)
- [ ] Analytics dashboard
- [ ] Calendar and interview scheduling
- [ ] Slack/Teams integration
- [ ] Mobile native app

---

## 🎉 Hackathon Submission

**Project:** SmartHire AI  
**Category:** AI-Powered Recruitment  
**Technologies:** React, Node.js, Google Gemini AI, Tailwind CSS  
**Status:** ✅ Production Ready  
**Features:** 6 Premium Features Implemented  

**Key Differentiators:**
- Full-stack solution (not just a UI mock)
- Real AI integration with fallback
- Professional UX with beautiful design
- Practical bulk operations
- Data persistence and local storage
- Responsive mobile-friendly design

---
