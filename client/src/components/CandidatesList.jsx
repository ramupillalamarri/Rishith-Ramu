import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CandidatesList = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchCandidates();
        fetchJob();
    }, [jobId]);

    const fetchCandidates = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/jobs/${jobId}/candidates`);
            setCandidates(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchJob = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
            setJob(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 75) return 'bg-green-100 text-green-800';
        if (score >= 50) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };

    const getMatchBadgeColor = (match) => {
        if (match === 'High') return 'bg-green-500';
        if (match === 'Medium') return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const filteredCandidates = candidates.filter(c => {
        if (filter === 'All') return true;
        return c.aiMatchSize === filter;
    });

    const topCandidates = candidates.slice(0, 3);

    if (loading) return <div className="p-6 text-center">Loading candidates...</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{job?.title}</h1>
                    <p className="text-gray-600 mt-1">Total Candidates: {candidates.length}</p>
                </div>
                <button
                    onClick={() => navigate(`/analyze/${jobId}`)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                    + Upload Resume
                </button>
            </div>

            {/* Top 3 Recommendations */}
            {topCandidates.length > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-2 border-green-300">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">🌟 Top Recommended Candidates</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {topCandidates.map((candidate, idx) => (
                            <div key={candidate.id} className="bg-white p-4 rounded-lg shadow-md">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-bold text-gray-800">#{idx + 1}</h3>
                                    <span className={`${getScoreColor(candidate.aiScore)} px-3 py-1 rounded-full font-bold`}>
                                        {candidate.aiScore}%
                                    </span>
                                </div>
                                <p className="font-semibold text-gray-900">{candidate.name}</p>
                                <p className="text-sm text-gray-600">{candidate.email}</p>
                                <span className={`inline-block ${getMatchBadgeColor(candidate.aiMatchSize)} text-white px-3 py-1 rounded-full text-sm font-semibold mt-2`}>
                                    {candidate.aiMatchSize} Match
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="flex gap-2">
                {['All', 'High', 'Medium', 'Low'].map(level => (
                    <button
                        key={level}
                        onClick={() => setFilter(level)}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${
                            filter === level
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {level} ({candidates.filter(c => level === 'All' || c.aiMatchSize === level).length})
                    </button>
                ))}
            </div>

            {/* Candidates Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">Candidate</th>
                            <th className="px-6 py-3 text-left">Match Level</th>
                            <th className="px-6 py-3 text-right">Score</th>
                            <th className="px-6 py-3 text-left">Summary</th>
                            <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {filteredCandidates.map(candidate => (
                            <tr key={candidate.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-semibold text-gray-900">{candidate.name}</p>
                                        <p className="text-sm text-gray-500">{candidate.email}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-block ${getMatchBadgeColor(candidate.aiMatchSize)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                                        {candidate.aiMatchSize}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`inline-block ${getScoreColor(candidate.aiScore)} px-3 py-2 rounded-lg font-bold`}>
                                        {candidate.aiScore}%
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                                    {candidate.aiSummary}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => navigate(`/candidate/${candidate.id}`)}
                                        className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
                                    >
                                        View Details →
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredCandidates.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No candidates with {filter} match found. Upload resumes to get started!
                    </div>
                )}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-green-100 rounded-lg p-4">
                    <p className="text-green-800 font-semibold">High Match</p>
                    <p className="text-2xl font-bold text-green-600">{candidates.filter(c => c.aiMatchSize === 'High').length}</p>
                </div>
                <div className="bg-yellow-100 rounded-lg p-4">
                    <p className="text-yellow-800 font-semibold">Medium Match</p>
                    <p className="text-2xl font-bold text-yellow-600">{candidates.filter(c => c.aiMatchSize === 'Medium').length}</p>
                </div>
                <div className="bg-red-100 rounded-lg p-4">
                    <p className="text-red-800 font-semibold">Low Match</p>
                    <p className="text-2xl font-bold text-red-600">{candidates.filter(c => c.aiMatchSize === 'Low').length}</p>
                </div>
                <div className="bg-indigo-100 rounded-lg p-4">
                    <p className="text-indigo-800 font-semibold">Avg Score</p>
                    <p className="text-2xl font-bold text-indigo-600">
                        {candidates.length > 0 ? Math.round(candidates.reduce((sum, c) => sum + c.aiScore, 0) / candidates.length) : 0}%
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CandidatesList;
