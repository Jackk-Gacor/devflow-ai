import React, { useState } from 'react';
import axios from 'axios';
import { MessageSquare, Send, Loader2 } from 'lucide-react';

const DevOpsChat = () => {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!msg) return;
    const newChat = [...chat, { role: 'user', text: msg }];
    setChat(newChat);
    setMsg('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/chat', { message: msg });
      setChat([...newChat, { role: 'ai', text: res.data.reply }]);
    } catch (err) { alert("Chat Error"); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[600px]">
        <div className="p-4 border-b border-slate-800 font-bold flex items-center gap-2"><MessageSquare size={18} className="text-green-400"/> DevOps Assistant</div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-left">
          {chat.map((c, i) => (
            <div key={i} className={`p-3 rounded-xl max-w-[80%] ${c.role === 'user' ? 'bg-indigo-600 ml-auto' : 'bg-slate-800 text-slate-200'}`}>
              {c.text}
            </div>
          ))}
          {loading && <Loader2 className="animate-spin text-slate-500" />}
        </div>
        <div className="p-4 border-t border-slate-800 flex gap-2">
          <input className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 outline-none" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Tanya sesuatu tentang DevOps..." onKeyPress={(e) => e.key === 'Enter' && send()} />
          <button onClick={send} className="bg-indigo-600 p-3 rounded-lg"><Send size={18}/></button>
        </div>
      </div>
    </div>
  );
};

export default DevOpsChat;