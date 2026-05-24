import React, { useState } from 'react';
import axios from 'axios';
import { Box, Zap, Loader2 } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

const DockerGen = () => {
  const [data, setData] = useState({ framework: 'Node.js', port: '3000' });
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/generate-dockerfile', data);
      setOutput(res.data.code);
    } catch (err) { alert("Error!"); }
    finally { setLoading(false); }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-4 bg-slate-900 p-6 rounded-2xl border border-slate-800 h-fit">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Box className="text-blue-400"/> Docker Gen</h2>
        <label className="block text-xs font-bold text-slate-500 uppercase">Framework</label>
        <input className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg mb-4" value={data.framework} onChange={(e) => setData({...data, framework: e.target.value})} />
        <label className="block text-xs font-bold text-slate-500 uppercase">Port</label>
        <input className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg mb-4" value={data.port} onChange={(e) => setData({...data, port: e.target.value})} />
        <button onClick={generate} className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold flex justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Zap size={18} />} Generate
        </button>
      </div>
      <div className="md:col-span-8">
        {output ? <CodeBlock code={output} /> : <div className="border-2 border-dashed border-slate-800 h-64 rounded-2xl flex items-center justify-center text-slate-600">Dockerfile akan muncul di sini</div>}
      </div>
    </div>
  );
};

export default DockerGen;