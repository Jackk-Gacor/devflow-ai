import React, { useState } from 'react';
import axios from 'axios';
import { Zap, Loader2, Terminal } from 'lucide-react';
import CodeBlock from '../components/CodeBlock'; // Pastikan path benar

const PipelineGen = () => {
  const [formData, setFormData] = useState({
    framework: 'React', platform: 'GitHub Actions', requirements: ''
  });
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // INI ADALAH JEMBATAN KE BACKEND
      const res = await axios.post('http://localhost:5000/api/ai/generate-pipeline', formData);
      setOutput(res.data.code);
    } catch (err) {
      alert("Backend tidak merespon. Cek terminal backend!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Terminal size={20}/> Konfigurasi</h2>
        <div className="space-y-4 text-left">
           <label className="block text-xs font-bold text-slate-500 uppercase">Framework</label>
           <select className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg" onChange={(e) => setFormData({...formData, framework: e.target.value})}>
             <option>React</option><option>Next.js</option><option>Node.js</option>
           </select>
           
           <label className="block text-xs font-bold text-slate-500 uppercase mt-4">Platform</label>
           <select className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg" onChange={(e) => setFormData({...formData, platform: e.target.value})}>
             <option>GitHub Actions</option><option>GitLab CI</option>
           </select>

           <label className="block text-xs font-bold text-slate-500 uppercase mt-4">Tambahan</label>
           <textarea className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg h-24" onChange={(e) => setFormData({...formData, requirements: e.target.value})}></textarea>

           <button onClick={handleGenerate} className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-bold mt-4 flex justify-center gap-2">
             {loading ? <Loader2 className="animate-spin" /> : <Zap size={18} />}
             Generate
           </button>
        </div>
      </div>
      <div className="md:col-span-8">
         {output ? <CodeBlock code={output} /> : <div className="border-2 border-dashed border-slate-800 h-64 rounded-2xl flex items-center justify-center">Hasil akan muncul di sini</div>}
      </div>
    </div>
  );
};

export default PipelineGen;