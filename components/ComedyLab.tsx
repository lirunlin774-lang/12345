
import React, { useState } from 'react';
import { generateComedyScript } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface Props { context: string; }

const ComedyLab: React.FC<Props> = ({ context }) => {
  const [highlight, setHighlight] = useState('星福家分红险的红利是不确定的，但也是惊喜的，就像开盲盒。');
  const [comedian, setComedian] = useState('李雪琴');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const comedians = [
    { name: '李雪琴', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LiXueqin', style: '丧萌哲学', color: 'bg-yellow-400' },
    { name: '王建国', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=WangJianguo', style: '谐音梗王', color: 'bg-orange-500' },
    { name: '周奇墨', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZhouQimo', style: '细节天花板', color: 'bg-blue-500' },
    { name: '李诞', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LiDan', style: '佛系解构', color: 'bg-red-400' },
    { name: '池子', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chizi', style: '狂野节奏', color: 'bg-green-500' }
  ];

  const handleGenerate = async () => {
    if (!highlight) return;
    setLoading(true);
    const res = await generateComedyScript(highlight, comedian, context);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden border border-slate-800">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-slate-900 shadow-[0_0_20px_rgba(250,204,21,0.4)]">
            <i className="fas fa-microphone-alt text-2xl"></i>
          </div>
          <div>
            <h3 className="text-3xl font-black tracking-tight">脱口秀剧场</h3>
            <p className="text-slate-400 text-sm">选择你的“灵魂艺人”，讲解产品亮点卖点</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">1. 谁来开麦？</label>
            <div className="grid grid-cols-1 gap-3">
              {comedians.map(c => (
                <button
                  key={c.name}
                  onClick={() => setComedian(c.name)}
                  className={`flex items-center p-3 rounded-2xl border transition-all ${comedian === c.name ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-100' : 'border-slate-50 hover:border-slate-200 bg-slate-50/30'}`}
                >
                  <img src={c.avatar} alt={c.name} className={`w-10 h-10 rounded-xl mr-3 ${c.color} p-0.5`} />
                  <div className="text-left">
                    <p className={`font-black text-sm ${comedian === c.name ? 'text-blue-700' : 'text-slate-700'}`}>{c.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold">{c.style}</p>
                  </div>
                  {comedian === c.name && <i className="fas fa-check-circle ml-auto text-blue-600"></i>}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">2. 产品的亮点或卖点？</label>
            <textarea 
              value={highlight}
              onChange={(e) => setHighlight(e.target.value)}
              placeholder="请输入你想讲解的产品亮点，这里不限输入字数..."
              className="w-full h-56 p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-700 resize-none"
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || !highlight}
            className={`w-full py-5 rounded-[2rem] font-black text-white text-lg shadow-xl transition-all ${loading ? 'bg-slate-400' : 'bg-slate-900 hover:bg-black hover:-translate-y-1'}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <i className="fas fa-spinner fa-spin mr-3"></i> 正在编排段子...
              </span>
            ) : "开始即兴表演"}
          </button>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-white min-h-[600px] h-full rounded-[3.5rem] border border-slate-100 shadow-sm p-10 relative">
            <div className="absolute top-8 left-8 text-slate-100 pointer-events-none">
              <i className="fas fa-quote-left text-7xl"></i>
            </div>
            
            <div className="relative z-10 h-full flex flex-col">
              {result ? (
                <>
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">LIVE Script Output</span>
                  </div>
                  <div className="prose prose-slate max-w-none flex-grow overflow-y-auto pr-2 custom-scrollbar">
                    <ReactMarkdown>{result}</ReactMarkdown>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <p className="text-[10px] text-slate-400 font-bold italic">Performed by: {comedian}</p>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(result);
                        alert('脚本已复制，快去讲给代理人听吧！');
                      }} 
                      className="bg-blue-600 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md"
                    >
                      <i className="fas fa-copy mr-2"></i> 复制脚本
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-300 space-y-6">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center border-4 border-white shadow-inner">
                    <i className="fas fa-laugh-beam text-4xl opacity-10"></i>
                  </div>
                  <div className="text-center">
                    <p className="font-black text-lg text-slate-400">选择一位脱口秀大咖</p>
                    <p className="text-xs mt-1 text-slate-300">输入产品亮点，AI 将生成一段爆笑且专业的营销脚本</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default ComedyLab;
