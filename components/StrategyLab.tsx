
import React, { useState } from 'react';
import { generateSalesScript } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface Props { context: string; }

const StrategyLab: React.FC<Props> = ({ context }) => {
  const [topic, setTopic] = useState('分红险的长期价值');
  const [need, setNeed] = useState('');
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState('');

  const handleGenerate = async () => {
    if (!need) return alert('请输入具体的代理人需求');
    setLoading(true);
    const res = await generateSalesScript(topic, need, context);
    setScript(res);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center space-x-3 mb-2">
            <i className="fas fa-brain text-blue-600"></i>
            <span className="text-xs text-blue-800 font-medium">知识库已激活：AI 将结合公司产品优势生成话术</span>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">主题选择</label>
            <select 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            >
              <option>分红险的长期价值</option>
              <option>复星康养生态优势</option>
              <option>合资险企全球配置实力</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">详细需求</label>
            <textarea 
              value={need}
              onChange={(e) => setNeed(e.target.value)}
              placeholder="例如：针对高净值客户，强调我们保德信的美资背景和四川本地的养老资源。"
              className="w-full h-40 p-3 bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white ${loading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? "AI 结合知识库深度构思中..." : "生成定制销售方案"}
          </button>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 relative min-h-[500px] border border-slate-100">
          {script ? (
            <div className="prose prose-slate prose-sm max-w-none">
              <ReactMarkdown>{script}</ReactMarkdown>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 opacity-40">
              <i className="fas fa-file-invoice-dollar text-5xl mb-4"></i>
              <p>方案将在此处生成</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StrategyLab;
