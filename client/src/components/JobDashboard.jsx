import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const JobDashboard = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [candidateCounts, setCandidateCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setError(null);
            const res = await axios.get('http://localhost:5000/api/jobs', { timeout: 5000 });
            setJobs(res.data || []);
            
            // Fetch candidate counts for each job
            const counts = {};
            if (res.data && Array.isArray(res.data)) {
                for (const job of res.data) {
                    try {
                        const candRes = await axios.get(`http://localhost:5000/api/jobs/${job.id}/candidates`, { timeout: 5000 });
                        counts[job.id] = candRes.data?.length || 0;
                    } catch (err) {
                        counts[job.id] = 0;
                    }
                }
            }
            setCandidateCounts(counts);
        } catch (err) {
            console.error('Error fetching jobs:', err.message);
            setError('Unable to connect to server. Make sure backend is running on port 5000');
            setJobs([]);
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Connection Error</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-bold transition"
                    >
                        🔄 Retry
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                    <h2 className="text-2xl font-bold text-gray-900">Loading Dashboard...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="p-6 max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">🎯 SmartHire Dashboard</h1>
                        <p className="text-gray-600 mt-2">
                            {jobs.length} Active Jobs • {Object.values(candidateCounts).reduce((a, b) => a + b, 0)} Total Candidates
                        </p>
                    </div>
                    <Link
                        to="/create"
                        className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-lg hover:shadow-lg font-bold transition"
                    >
                        + Post New Job
                    </Link>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-6 shadow-md">
                        <p className="text-blue-600 font-semibold">Total Jobs</p>
                        <p className="text-4xl font-bold text-blue-700 mt-2">{jobs.length}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl p-6 shadow-md">
                        <p className="text-green-600 font-semibold">Total Candidates</p>
                        <p className="text-4xl font-bold text-green-700 mt-2">
                            {Object.values(candidateCounts).reduce((a, b) => a + b, 0)}
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl p-6 shadow-md">
                        <p className="text-purple-600 font-semibold">Analyses Completed</p>
                        <p className="text-4xl font-bold text-purple-700 mt-2">
                            {Object.values(candidateCounts).reduce((a, b) => a + b, 0)}
                        </p>
                    </div>
                </div>

                {/* Jobs Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Active Job Postings</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {jobs.map(job => {
                            const candidateCount = candidateCounts[job.id] || 0;
                            return (
                                <div
                                    key={job.id}
                                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
                                >
                                    {/* Card Header */}
                                    <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 text-white">
                                        <h3 className="text-2xl font-bold">{job.title}</h3>
                                        <div className="flex items-center gap-2 mt-2 text-indigo-100">
                                            <span>👥</span>
                                            <span className="font-semibold">{candidateCount} Candidates</span>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-6 space-y-4">
                                        <p className="text-gray-700 line-clamp-3">
                                            {job.description}
                                        </p>

                                        {/* Requirements Preview */}
                                        <div className="pt-4 border-t">
                                            <p className="text-sm text-gray-600 font-semibold mb-2">Requirements:</p>
                                            <p className="text-sm text-gray-700 line-clamp-2">
                                                {job.requirements || 'See full details for requirements'}
                                            </p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col gap-2 pt-4">
                                            {candidateCount > 0 ? (
                                                <button
                                                    onClick={() => navigate(`/candidates/${job.id}`)}
                                                    className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold transition"
                                                >
                                                    👥 View {candidateCount} Candidate{candidateCount !== 1 ? 's' : ''}
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => navigate(`/analyze/${job.id}`)}
                                                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-semibold transition"
                                                >
                                                    📤 Upload First Resume
                                                </button>
                                            )}
                                            
                                            <button
                                                onClick={() => navigate(`/bulk/${job.id}`)}
                                                className="w-full border-2 border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 font-semibold transition"
                                            >
                                                📦 Bulk Upload
                                            </button>

                                            <Link
                                                to={`/analyze/${job.id}`}
                                                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 font-semibold text-center transition"
                                            >
                                                ➕ Add Resume
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {jobs.length === 0 && (
                        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                            <p className="text-gray-600 text-xl mb-6">No jobs posted yet!</p>
                            <Link
                                to="/create"
                                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-bold inline-block"
                            >
                                Create Your First Job Post
                            </Link>
                        </div>
                    )}
                </div>

                {/* Quick Stats */}
                {jobs.length > 0 && (
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border-2 border-green-300">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">✨ Insights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-700 font-semibold mb-2">Most Candidates Applied (Job)</p>
                                <p className="text-2xl font-bold text-indigo-600">
                                    {jobs[Object.keys(candidateCounts).reduce((a, b) => candidateCounts[a] > candidateCounts[b] ? a : b)] && 
                                     jobs[Object.keys(candidateCounts).reduce((a, b) => candidateCounts[a] > candidateCounts[b] ? a : b)].title}
                                    {' '}
                                    <span className="text-lg text-gray-600">
                                        ({Object.values(candidateCounts).reduce((a, b) => Math.max(a, b), 0)} candidates)
                                    </span>
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-700 font-semibold mb-2">Last Job Posted</p>
                                <p className="text-2xl font-bold text-indigo-600">
                                    {jobs.length > 0 ? new Date(jobs[0].createdAt).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobDashboard;
