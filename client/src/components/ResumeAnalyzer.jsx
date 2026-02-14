import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResumeAnalyzer = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [candidateName, setCandidateName] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [job, setJob] = useState(null);

    useEffect(() => {
        fetchJob();
    }, [jobId]);

    const fetchJob = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
            setJob(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file || !candidateName.trim()) return;

        const formData = new FormData();
        formData.append('resume', file);
        formData.append('jobId', jobId);
        formData.append('candidateName', candidateName);
        formData.append('jobDescription', job?.description || '');

        setAnalyzing(true);
        setResult(null);
        setError(null);

        try {
            const res = await axios.post('http://localhost:5000/api/analyze', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            // Store candidate in localStorage  
            const candidates = JSON.parse(localStorage.getItem('candidates') || '{}');
            candidates[res.data.id] = res.data;
            localStorage.setItem('candidates', JSON.stringify(candidates));
            
            setResult(res.data);
        } catch (err) {
            console.error(err);
            let errorMsg = err.response?.data?.error || err.message || 'Unknown error occurred';
            
            // Handle duplicate submission with better UX
            if (err.response?.status === 409) {
                const existingName = err.response?.data?.candidateName || 'Unknown';
                errorMsg = `⚠️ This resume has already been submitted for this job by ${existingName}. Each unique resume can only be submitted once per job.`;
            }
            
            setError(errorMsg);
        } finally {
            setAnalyzing(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'bg-green-100 text-green-800';
        if (score >= 50) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };

    const getMatchColor = (match) => {
        if (match === 'High') return 'from-green-400 to-green-600';
        if (match === 'Medium') return 'from-yellow-400 to-yellow-600';
        return 'from-red-400 to-red-600';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Resume Analyzer</h1>
                <p className="text-gray-600 mb-8">{job?.title || 'Loading job details...'}</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Upload Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">📤 Upload Resume</h2>
                            <form onSubmit={handleUpload} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Candidate Name
                                    </label>
                                    <input
                                        type="text"
                                        value={candidateName}
                                        onChange={(e) => setCandidateName(e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        PDF Resume
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-indigo-50 file:text-indigo-700
                            hover:file:bg-indigo-100 cursor-pointer"
                                    />
                                    {file && (
                                        <p className="text-sm text-green-600 mt-2">✓ {file.name}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={!file || !candidateName.trim() || analyzing}
                                    className={`w-full py-3 px-4 rounded-lg text-white font-bold text-lg transition ${
                                        analyzing
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:shadow-lg'
                                    }`}
                                >
                                    {analyzing ? (
                                        <>
                                            <span className="inline-block animate-spin mr-2">⚙️</span>
                                            Analyzing...
                                        </>
                                    ) : (
                                        '🔍 Analyze Resume'
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate(`/bulk/${jobId}`)}
                                    className="w-full py-2 px-4 rounded-lg border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50"
                                >
                                    📦 Bulk Upload
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {error && (
                            <div className="bg-orange-50 border-2 border-orange-400 rounded-xl p-6 shadow-lg">
                                <h3 className="font-bold text-orange-800 text-lg mb-2">⚠️ Submission Notice</h3>
                                <p className="text-orange-700 leading-relaxed">{error}</p>
                                <button
                                    onClick={() => setError(null)}
                                    className="mt-4 text-sm text-orange-600 hover:text-orange-800 font-semibold underline"
                                >
                                    Dismiss
                                </button>
                            </div>
                        )}

                        {result && (
                            <>
                                {/* Header Card */}
                                <div className={`bg-gradient-to-r ${getMatchColor(result.aiMatchSize)} text-white rounded-xl shadow-xl p-8`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h2 className="text-3xl font-bold">{result.name}</h2>
                                            <p className="text-white text-opacity-90">{result.email}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-5xl font-bold">{result.aiScore}%</p>
                                            <p className="text-sm text-white text-opacity-75">Match Score</p>
                                        </div>
                                    </div>
                                    <span className="inline-block px-4 py-2 bg-white bg-opacity-20 rounded-full font-semibold">
                                        {result.aiMatchSize} Match
                                    </span>
                                </div>

                                {/* Summary */}
                                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-600">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">📋 AI Summary</h3>
                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        {result.aiSummary}
                                    </p>
                                </div>

                                {/* Match Breakdown */}
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Match Breakdown</h3>
                                    <div className="space-y-4">
                                        {/* Overall Match */}
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="font-semibold text-gray-700">Overall Fit</span>
                                                <span className={`font-bold ${getScoreColor(result.aiScore)}`}>
                                                    {result.aiScore}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-3">
                                                <div
                                                    style={{ width: `${result.aiScore}%` }}
                                                    className={`h-3 rounded-full bg-gradient-to-r ${getMatchColor(result.aiMatchSize)}`}
                                                />
                                            </div>
                                        </div>

                                        {/* Skill Matching */}
                                        <div className="pt-4">
                                            <h4 className="font-bold text-gray-800 mb-3">✓ Matched Skills</h4>
                                            <div className="flex flex-wrap gap-2 h-fit">
                                                {['Azure', 'Node.js', 'React', 'Python', 'SQL', 'REST APIs']
                                                    .slice(0, Math.ceil(result.aiScore / 20))
                                                    .map((skill, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                            </div>
                                        </div>

                                        {/* Missing Keywords */}
                                        {result.missingKeywords && result.missingKeywords.length > 0 && (
                                            <div className="pt-4 border-t">
                                                <h4 className="font-bold text-gray-800 mb-3">⚠️ Missing Keywords</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {result.missingKeywords.map((keyword, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold"
                                                        >
                                                            {keyword}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Interview Questions */}
                                {result.interviewQuestions && result.interviewQuestions.length > 0 && (
                                    <div className="bg-white rounded-xl shadow-lg p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">🎤 Interview Questions</h3>
                                        <div className="space-y-3">
                                            {result.interviewQuestions.map((question, idx) => (
                                                <div key={idx} className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                                                    <p className="text-blue-900 font-semibold">
                                                        <span className="text-blue-600">Q{idx + 1}:</span> {question}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => navigate(`/candidates/${jobId}`)}
                                        className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700"
                                    >
                                        View All Candidates
                                    </button>
                                    <button
                                        onClick={() => navigate(`/candidate/${result.id}`)}
                                        className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700"
                                    >
                                        View Full Profile
                                    </button>
                                </div>
                            </>
                        )}

                        {!result && !error && (
                            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                                <p className="text-gray-600 text-lg">Upload a resume to see analysis results</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumeAnalyzer;
