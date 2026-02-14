import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import JobDashboard from './components/JobDashboard';
import CreateJob from './components/CreateJob';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import CandidatesList from './components/CandidatesList';
import CandidateDetail from './components/CandidateDetail';
import BulkUpload from './components/BulkUpload';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex-shrink-0 flex items-center font-bold text-2xl text-white">
                  🎯 SmartHire AI
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link to="/" className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition">
                    Dashboard
                  </Link>
                  <Link to="/create" className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition">
                    Post Job
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-white text-sm">Resume Screening Powered by AI</span>
              </div>
            </div>
          </div>
        </nav>

        <main className="py-10">
          <Routes>
            <Route path="/" element={<JobDashboard />} />
            <Route path="/create" element={<CreateJob />} />
            <Route path="/analyze/:jobId" element={<ResumeAnalyzer />} />
            <Route path="/candidates/:jobId" element={<CandidatesList />} />
            <Route path="/candidate/:candidateId" element={<CandidateDetail />} />
            <Route path="/bulk/:jobId" element={<BulkUpload />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
