import React, { useState } from 'react';
import axios from 'axios';
import { Bug, Send, Loader2 } from 'lucide-react';

const ErrorAnalyzer = () => {
  const [logs, setLogs] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/analyze-error', { logs });
      setAnalysis(res.data.analysis);
    } catch (err) { alert("Gagal menganalisa"); }
    finally { setLoading(false); }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-400">
        <Bug /> AI Error Analyzer
      </h2>
      <textarea 
        className="w-full h-48 bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-sm focus:ring-2 focus:ring-red-500 outline-none"
        placeholder="Paste log error NPM build failed atau Docker error di sini..."
        onChange={(e) => setLogs(e.target.value)}
      />
      <button 
        onClick={analyze}
        disabled={loading || !logs}
        className="mt-4 bg-red-600 hover:bg-red-500 px-6 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
        Analyze Error
      </button>

      {analysis && (
        <div className="mt-8 p-6 bg-slate-900 border border-slate-800 rounded-2xl animate-in slide-in-from-bottom">
          <h3 className="font-bold text-lg mb-2 text-green-400">Analysis Result:</h3>
          <div className="whitespace-pre-wrap text-slate-300 leading-relaxed text-left">
            {analysis}
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorAnalyzer;