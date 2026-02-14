import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CandidateDetail = () => {
    const { candidateId } = useParams();
    const navigate = useNavigate();
    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState('');
    const [showNotes, setShowNotes] = useState(false);

    useEffect(() => {
        fetchCandidate();
    }, [candidateId]);

    const fetchCandidate = async () => {
        try {
            // Get candidate from localStorage or reconstruct from API
            const storedCandidates = JSON.parse(localStorage.getItem('candidates') || '{}');
            if (storedCandidates[candidateId]) {
                setCandidate(storedCandidates[candidateId]);
                setNotes(storedCandidates[candidateId].notes || '');
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const saveNotes = () => {
        const storedCandidates = JSON.parse(localStorage.getItem('candidates') || '{}');
        if (storedCandidates[candidateId]) {
            storedCandidates[candidateId].notes = notes;
            localStorage.setItem('candidates', JSON.stringify(storedCandidates));
        }
        setShowNotes(false);
    };

    if (loading) return <div className="p-6 text-center">Loading candidate details...</div>;
    if (!candidate) return <div className="p-6 text-center">Candidate not found</div>;

    const getScoreColor = (score) => {
        if (score >= 75) return 'from-green-400 to-green-600';
        if (score >= 50) return 'from-yellow-400 to-yellow-600';
        return 'from-red-400 to-red-600';
    };

    const matchPercentage = {
        'High': 85,
        'Medium': 60,
        'Low': 35
    }[candidate.aiMatchSize] || 50;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <button
                    onClick={() => navigate(-1)}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold mb-6 flex items-center gap-2"
                >
                    ← Back
                </button>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Hero Section */}
                    <div className={`bg-gradient-to-r ${getScoreColor(candidate.aiScore)} text-white p-8`}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-4xl font-bold">{candidate.name}</h1>
                                <p className="text-xl opacity-90 mt-2">{candidate.email}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-6xl font-bold">{candidate.aiScore}%</p>
                                <p className="text-sm opacity-75">Match Score</p>
                            </div>
                        </div>
                        <span className="inline-block px-4 py-2 bg-white bg-opacity-20 rounded-full font-semibold">
                            {candidate.aiMatchSize} Match
                        </span>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Match Visualization */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Match Analysis</h2>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-700 font-semibold">Overall Fit</span>
                                        <span className="text-gray-600">{matchPercentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div
                                            style={{ width: `${matchPercentage}%` }}
                                            className={`h-4 rounded-full bg-gradient-to-r ${getScoreColor(candidate.aiScore)}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 Summary</h2>
                            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-indigo-600">
                                <p className="text-gray-800 leading-relaxed text-lg">
                                    {candidate.aiSummary}
                                </p>
                            </div>
                        </div>

                        {/* Missing Keywords */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">⚠️ Missing Keywords</h2>
                            <div className="flex flex-wrap gap-2">
                                {candidate.missingKeywords && candidate.missingKeywords.length > 0 ? (
                                    candidate.missingKeywords.map((keyword, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-red-100 text-red-800 px-4 py-2 rounded-full font-semibold"
                                        >
                                            {keyword}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-gray-600">No significant missing keywords identified!</p>
                                )}
                            </div>
                        </div>

                        {/* Interview Questions */}
                        {candidate.interviewQuestions && candidate.interviewQuestions.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">🎤 Suggested Interview Questions</h2>
                                <div className="space-y-3">
                                    {candidate.interviewQuestions.map((question, idx) => (
                                        <div key={idx} className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                                            <p className="text-blue-900 font-semibold">
                                                Q{idx + 1}: {question}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Resume Text */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">📄 Resume Text</h2>
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 max-h-64 overflow-y-auto">
                                <p className="text-gray-700 whitespace-pre-wrap font-mono text-sm">
                                    {candidate.resumeText?.slice(0, 500)}...
                                </p>
                                {candidate.resumeText?.length > 500 && (
                                    <p className="text-gray-500 text-sm mt-4 italic">
                                        (Showing first 500 characters)
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Notes Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 Your Notes</h2>
                            {!showNotes ? (
                                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                                    <p className="text-gray-800 mb-4 min-h-24">
                                        {notes || <span className="text-gray-400 italic">No notes yet. Click add notes to get started.</span>}
                                    </p>
                                    <button
                                        onClick={() => setShowNotes(true)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600"
                                    >
                                        ✏️ Edit Notes
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Add your interview notes, impressions, or feedback..."
                                        className="w-full border border-gray-300 rounded-lg p-4 font-mono text-sm h-32 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                    <div className="flex gap-3">
                                        <button
                                            onClick={saveNotes}
                                            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
                                        >
                                            Save Notes
                                        </button>
                                        <button
                                            onClick={() => setShowNotes(false)}
                                            className="bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-500"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-6 border-t">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700"
                            >
                                Back to List
                            </button>
                            <a
                                href={`mailto:${candidate.email}`}
                                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 text-center"
                            >
                                ✉️ Contact
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateDetail;
