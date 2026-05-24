import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-slate-800 bg-[#1e1e1e] mt-4">
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-slate-800">
        <span className="text-xs font-mono text-slate-400 font-bold uppercase">YAML Output</span>
        <button onClick={copyToClipboard} className="text-slate-400 hover:text-white transition-colors">
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        </button>
      </div>
      <SyntaxHighlighter language="yaml" style={vscDarkPlus} customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent' }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;