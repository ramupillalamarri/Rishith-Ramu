# 🎯 SmartHire AI - First Time User Guide

Welcome! This guide helps you get started with your AI recruitment platform in 2 minutes.

---

## ⚡ Quick Start (2 minutes)

### 1. Start the App
```bash
cd c:\ramu\FSWD_new\smart-hire-js
npm run dev
```

Wait 10 seconds for servers to start, then:

### 2. Open in Browser
```
http://localhost:5173
```

You should see the beautiful dashboard! ✨

### 3. Create Your First Job
- Click **"Post New Job"** button
- Fill in:
  - **Title:** React Developer (or any role)
  - **Description:** Brief job description
  - **Requirements:** List of skills needed
- Click **Submit**
- ✅ Job appears on dashboard!

### 4. Upload a Resume
- Click the job card
- Click **"Analyze"** or **"Add Resume"**
- Enter candidate name
- Pick a PDF file to upload
- Watch the AI analyze it! 🤖
- See the score, summary, and interview questions

### 5. View All Candidates  
- Click **"View All Candidates"**
- See the beautiful table with filtering
- See top 3 recommendations highlighted
- ✅ Browse full results!

---

## 🗺️ Navigation Guide

### Main Pages

**🏠 Dashboard** (`/`)
- Home page
- See all your jobs
- Quick action buttons
- Statistics cards

**➕ Create Job** (`/create`)
- Post a new job
- Fill form, submit
- Job appears on dashboard

**📤 Analyze Resume** (`/analyze/:jobId`)
- Upload single PDF
- Get AI analysis
- See match breakdown
- Interview questions

**📊 Candidates List** (`/candidates/:jobId`)
- View all candidates for a job
- Top 3 recommendations
- Sortable table
- Statistics

**👤 Candidate Details** (`/candidate/:candidateId`)
- Full candidate profile
- All AI analysis details
- Interview questions
- Save notes
- Contact email

**📦 Bulk Upload** (`/bulk/:jobId`)
- Upload multiple PDFs at once
- See all results
- Navigate to candidates list

---

## 🎯 Common Tasks

### How to... Create a Job?
1. Click **"Post New Job"** on dashboard
2. Fill in job details
3. Click Submit
4. ✅ Done!

### How to... Upload a Resume?
1. Click on a job
2. Click **"Analyze"** or **"Add Resume"**
3. Select PDF file
4. Click **"Analyze Resume"**
5. ✅ See results!

### How to... View All Candidates?
1. Go to job detail page
2. Click **"View All Candidates"**
3. OR click job → **"View X Candidates"**
4. ✅ See beautiful table!

### How to... Save Notes About a Candidate?
1. Go to candidate detail page
2. Scroll to **"Your Notes"** section
3. Click **"Edit Notes"**
4. Type your notes
5. Click **"Save Notes"**
6. ✅ Notes saved to browser!

### How to... Upload Multiple Resumes?
1. Click **"Bulk Upload"**
2. Drag-drop 3+ PDF files
3. Click **"Upload X Resumes"**
4. Wait for upload
5. See results summary
6. ✅ All candidates added!

---

## 🎨 Understanding the UI

### Color Coding

**Badges:**
- 🟢 **Green "High"** = Great match (75%+)
- 🟡 **Yellow "Medium"** = Good match (50-74%)
- 🔴 **Red "Low"** = Poor match (<50%)

**Progress Bars:**
- Longer bar = Better match
- Green = High, Yellow = Medium, Red = Low

**Scores:**
- 0-49% = Red badge "Low"
- 50-74% = Yellow badge "Medium"
- 75-100% = Green badge "High"

### Button Types

**Blue/Indigo Buttons** = Main actions
- Submit job, analyze resume

**Green Buttons** = Positive actions
- View candidates, upload

**Gray Buttons** = Secondary actions
- Back, cancel, clear

---

## 💡 Tips & Tricks

### Pro Tips

1. **Try Bulk Upload** - Most impressive feature!
   - Shows parallel processing
   - Much faster than single uploads

2. **Edit Notes** - Shows persistence
   - Edit a note, then refresh page
   - Note is still there! (localStorage)

3. **Try Filtering** - On candidates list
   - Filter by "High" match
   - See statistics update in real-time

4. **Check Responsive** - Resize browser
   - App works on mobile too!
   - Try Ctrl+Shift+M in Chrome

5. **Look at Gradients** - Beautiful design
   - Gradient hero sections
   - Color-coded status bars
   - Professional Tailwind styling

### Keyboard Shortcuts

- **Ctrl+Shift+M** - Toggle mobile view
- **Ctrl+Shift+I** - Open developer tools
- **Ctrl+Shift+Delete** - Clear cache (if stuck)

---

## 🤖 AI Features Explained

### What the AI Does

1. **Reads your resume** - Extracts text from PDF
2. **Compares to job** - Matches skills and experience
3. **Scores it** - Gives 0-100% match score
4. **Generates questions** - Creates interview questions
5. **Lists missing skills** - Shows what's needed

### How Scoring Works

The AI looks at:
- Technical skills match
- Experience level
- Project relevance
- Education fit
- Overall alignment

### What if AI Doesn't Work?

Smart fallback system:
- If API quota is exceeded → Uses mock scores
- Mock scores are realistic and random
- App never breaks
- Everything still works!

---

## 📊 Understanding Results

### Match Breakdown

**Green Badges = Have these skills**
- React, Node.js, etc.

**Red Badges = Missing these skills**
- Docker, Kubernetes, etc.

**Score 80%+ = Highly qualified**
- Candidate for final rounds

**Score 50-79% = Qualified**
- Could work with training

**Score <50% = Unqualified**
- Not a good fit

### Interview Questions Generated

AI creates questions about:
- Their experience with key skills
- Project challenges they've overcome
- How they learn new technologies
- Career goals alignment
- Why they want this role

---

## 🔧 Troubleshooting

### App Won't Load?
```bash
npm run dev
# Wait 10 seconds
# Refresh browser (Ctrl+R)
```

### Port Already in Use?
```bash
# Kill the process using the port
taskkill /PID <number> /F
npm run dev
```

### Can't Upload PDF?
- Make sure it's a real PDF file
- File size under 10MB
- Try a different PDF

### Notes Not Saving?
- Check browser localStorage is enabled
- Try in a non-private window
- Clear browser cache

### AI Not Analyzing?
- Check internet connection
- Check Google API key in `.env`
- App falls back to mock mode if API down

---

## 📱 Mobile View

SmartHire AI is fully responsive!

### On Mobile Phone:
- Tap buttons instead of click
- Drag-drop works on mobile too!
- All features available
- Beautiful mobile layout

### Test Mobile:
- Open browser DevTools (F12)
- Click device icon (Ctrl+Shift+M)
- Choose iPhone/Android
- Everything still works!

---

## 🎓 Learning More

### Read the Documentation
- **README.md** - Full project guide
- **QUICK_START.md** - Executive summary
- **HACKATHON_FEATURES.md** - Feature details

### Check the Code
- **App.jsx** - Page routing
- **CandidatesList.jsx** - Results table
- **ResumeAnalyzer.jsx** - Analysis page
- **server.js** - API endpoints

### Edit and Experiment
- Change colors in Tailwind CSS
- Add new filters to candidates list
- Modify AI prompt in `ai.js`
- Extend database models

---

## 🚀 Next Steps

### To Keep Learning:
1. ✅ Create 3-4 test jobs
2. ✅ Upload 5-10 test resumes
3. ✅ Try bulk upload
4. ✅ Test all pages
5. ✅ Edit notes and refresh
6. ✅ Try mobile view
7. ✅ Check responsive design

### To Impress Others:
1. Demo the dashboard
2. Show bulk upload (most impressive!)
3. Point out beautiful design
4. Explain the AI features
5. Show how notes persist
6. Highlight responsive design

### To Modify & Extend:
1. Check README.md for architecture
2. Read component code
3. Modify colors and text
4. Add new features
5. Deploy to production

---

## 🎊 Congratulations!

You now understand SmartHire AI! 🎉

**You can:**
- ✅ Create jobs
- ✅ Upload and analyze resumes
- ✅ See results in beautiful table
- ✅ View full candidate profiles
- ✅ Save notes
- ✅ Bulk process multiple files
- ✅ Get AI-powered recommendations

**Next:** Show it to judges and wow them! 🏆

---

## 📞 Quick Reference

| Task | Page | Button |
|------|------|--------|
| Create job | `/create` | Post New Job |
| Upload resume | `/analyze/:jobId` | Analyze |
| View candidates | `/candidates/:jobId` | View Candidates |
| See profile | `/candidate/:candidateId` | View Details |
| Bulk upload | `/bulk/:jobId` | Bulk Upload |

---

**Happy analyzing! 🚀**

Questions? Check the README.md or browse the code!
