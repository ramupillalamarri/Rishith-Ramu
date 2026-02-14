import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BulkUpload = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [results, setResults] = useState([]);
    const [dragActive, setDragActive] = useState(false);

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

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const droppedFiles = [...e.dataTransfer.files].filter(f => f.type === 'application/pdf');
        setFiles(prev => [...prev, ...droppedFiles]);
    };

    const handleFileInput = (e) => {
        const selectedFiles = [...e.target.files].filter(f => f.type === 'application/pdf');
        setFiles(prev => [...prev, ...selectedFiles]);
    };

    const removeFile = (idx) => {
        setFiles(files.filter((_, i) => i !== idx));
    };

    const uploadBulk = async () => {
        if (files.length === 0) return;
        setUploading(true);
        setResults([]);

        const uploadPromises = files.map(async (file) => {
            const formData = new FormData();
            formData.append('resume', file);
            formData.append('candidateName', file.name.replace('.pdf', ''));
            formData.append('jobDescription', job.description);
            formData.append('jobId', jobId);

            try {
                const res = await axios.post('http://localhost:5000/api/analyze', formData);
                return { name: file.name, success: true, score: res.data.aiScore };
            } catch (err) {
                const errorMsg = err.response?.data?.error || 'Upload failed';
                const isDuplicate = err.response?.status === 409;
                return { 
                    name: file.name, 
                    success: false, 
                    error: errorMsg,
                    isDuplicate: isDuplicate,
                    existingCandidate: err.response?.data?.candidateName
                };
            }
        });

        const uploadResults = await Promise.all(uploadPromises);
        setResults(uploadResults);
        setUploading(false);
    };

    const successCount = results.filter(r => r.success).length;
    const avgScore = results.length > 0
        ? Math.round(results.filter(r => r.success).reduce((sum, r) => sum + r.score, 0) / results.filter(r => r.success).length)
        : 0;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">📤 Bulk Upload Resumes</h1>
                    <p className="text-gray-600 mt-2">{job?.title || 'Loading...'}</p>
                </div>

                {results.length === 0 ? (
                    <>
                        {/* Drop Zone */}
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            className={`border-3 border-dashed rounded-xl p-8 text-center transition ${
                                dragActive
                                    ? 'bg-indigo-50 border-indigo-500'
                                    : 'bg-white border-gray-300 hover:border-indigo-500'
                            }`}
                        >
                            <div className="text-4xl mb-4">📁</div>
                            <p className="text-xl font-semibold text-gray-900 mb-2">
                                Drag and drop PDF files here
                            </p>
                            <p className="text-gray-600 mb-4">or</p>
                            <label className="inline-block">
                                <input
                                    type="file"
                                    multiple
                                    accept=".pdf"
                                    onChange={handleFileInput}
                                    className="hidden"
                                />
                                <span className="bg-indigo-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-indigo-700 inline-block font-semibold">
                                    Browse Files
                                </span>
                            </label>
                        </div>

                        {/* File List */}
                        {files.length > 0 && (
                            <div className="mt-6">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">
                                    Selected Files ({files.length})
                                </h2>
                                <div className="bg-white rounded-lg shadow-md divide-y">
                                    {files.map((file, idx) => (
                                        <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">📄</span>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{file.name}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {(file.size / 1024).toFixed(2)} KB
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeFile(idx)}
                                                className="text-red-600 hover:text-red-800 font-semibold"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Upload Button */}
                                <div className="mt-6 flex gap-4">
                                    <button
                                        onClick={uploadBulk}
                                        disabled={uploading}
                                        className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {uploading ? 'Uploading...' : `Upload ${files.length} Resume${files.length > 1 ? 's' : ''}`}
                                    </button>
                                    <button
                                        onClick={() => setFiles([])}
                                        className="bg-gray-400 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-500"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        )}

                        {files.length === 0 && (
                            <p className="text-center text-gray-500 mt-6">
                                No files selected yet. Start by dragging PDFs or clicking browse.
                            </p>
                        )}
                    </>
                ) : (
                    <>
                        {/* Results Summary */}
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6 border-2 border-green-300">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ Upload Complete!</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white rounded-lg p-4">
                                    <p className="text-gray-600">Total Uploaded</p>
                                    <p className="text-3xl font-bold text-indigo-600">{results.length}</p>
                                </div>
                                <div className="bg-white rounded-lg p-4">
                                    <p className="text-gray-600">Successful</p>
                                    <p className="text-3xl font-bold text-green-600">{successCount}</p>
                                </div>
                                <div className="bg-white rounded-lg p-4">
                                    <p className="text-gray-600">Average Score</p>
                                    <p className="text-3xl font-bold text-blue-600">{avgScore}%</p>
                                </div>
                            </div>
                        </div>

                        {/* Results List */}
                        <div className="bg-white rounded-lg shadow-md divide-y">
                            {results.map((result, idx) => (
                                <div key={idx} className={`p-4 ${result.success ? 'bg-green-50' : result.isDuplicate ? 'bg-orange-50' : 'bg-red-50'}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">
                                                {result.success ? '✅' : result.isDuplicate ? '⚠️' : '❌'}
                                            </span>
                                            <div>
                                                <p className="font-semibold text-gray-900">{result.name}</p>
                                                {result.success && (
                                                    <p className="text-sm text-gray-600">
                                                        Score: <span className="font-bold text-green-600">{result.score}%</span>
                                                    </p>
                                                )}
                                                {!result.success && (
                                                    <>
                                                        <p className={`text-sm ${result.isDuplicate ? 'text-orange-600' : 'text-red-600'}`}>
                                                            {result.error}
                                                        </p>
                                                        {result.isDuplicate && result.existingCandidate && (
                                                            <p className="text-xs text-orange-700 mt-1">
                                                                Previously submitted by: <span className="font-semibold">{result.existingCandidate}</span>
                                                            </p>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        {result.success && (
                                            <span className="text-sm font-bold bg-green-200 text-green-800 px-3 py-1 rounded-full">
                                                Success
                                            </span>
                                        )}
                                        {result.isDuplicate && (
                                            <span className="text-sm font-bold bg-orange-200 text-orange-800 px-3 py-1 rounded-full">
                                                Duplicate
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex gap-4">
                            <button
                                onClick={() => navigate(`/candidates/${jobId}`)}
                                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700"
                            >
                                View All Candidates
                            </button>
                            <button
                                onClick={() => {
                                    setResults([]);
                                    setFiles([]);
                                }}
                                className="flex-1 bg-gray-400 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-500"
                            >
                                Upload More
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BulkUpload;
