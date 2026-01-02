
import React, { useState } from 'react';
import { solveObjection } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface Props { context: string; }

const ObjectionMaster: React.FC<Props> = ({ context }) => {
  const [objection, setObjection] = useState('');
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState('');

  const handleSolve = async (txt?: string) => {
    const target = txt || objection;
    if (!target) return;
    setLoading(true);
    setSolution(await solveObjection(target, context));
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800">异议深度诊断</h3>
          <div className="text-[10px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg border border-indigo-100 font-bold uppercase">
            <i className="fas fa-microchip mr-1"></i> Brain-Enabled
          </div>
        </div>
        
        <div className="flex space-x-2">
          <input 
            type="text" 
            value={objection}
            onChange={(e) => setObjection(e.target.value)}
            placeholder="代理人向你反馈了什么客户疑问？"
            className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button 
            onClick={() => handleSolve()}
            disabled={loading}
            className="px-8 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-all"
          >
            {loading ? <i className="fas fa-sync-alt fa-spin"></i> : "对策生成"}
          </button>
        </div>
      </div>

      {solution && (
        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-600 animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mr-4">
              <i className="fas fa-shield-alt text-xl"></i>
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-800">定制化应答策略</h4>
              <p className="text-xs text-slate-500">已结合你提供的公司内部口径进行优化</p>
            </div>
          </div>
          <div className="prose prose-blue max-w-none">
            <ReactMarkdown>{solution}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectionMaster;
