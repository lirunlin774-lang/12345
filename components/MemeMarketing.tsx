
import React, { useState, useEffect } from 'react';
import { generateMemeCopy, fetchRealtimeTrends } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface Props { context: string; }

const MemeMarketing: React.FC<Props> = ({ context }) => {
  const [trend, setTrend] = useState('');
  const [highlight, setHighlight] = useState('');
  const [style, setStyle] = useState('social');
  const [loading, setLoading] = useState(false);
  const [fetchingTrends, setFetchingTrends] = useState(false);
  const [result, setResult] = useState('');
  const [realtimeCategories, setRealtimeCategories] = useState<any[]>([]);

  const date = new Date();
  const currentMonthDisplay = `${date.getFullYear()}年${date.getMonth() + 1}月`;

  const styles = [
    { id: 'social', label: '社交媒体', icon: 'fa-hashtag' },
    { id: 'pro', label: '专业视角', icon: 'fa-user-tie' },
    { id: 'humor', label: '幽默风趣', icon: 'fa-face-laugh' },
    { id: 'emotion', label: '情感共共鸣', icon: 'fa-heart' }
  ];

  // 默认的基础库，已更新为用户提供的 2025年12月风格示例
  const staticCategories = [
    {
      name: `🔥 ${currentMonthDisplay} 抖音洗脑神梗`,
      items: ["我鸟都不鸟你", "阿米噶帝朵米喵喵", "i'm back", "不讲不讲", "精神退休", "这一份City的浪漫"]
    },
    {
      name: "✨ 文艺文学 / 情绪搭子",
      items: ["清风上南枝，梦中仍相思", "山海自有归期", "轻舟已过万重山", "岁岁常欢愉"]
    }
  ];

  useEffect(() => {
    updateTrends();
  }, []);

  const updateTrends = async () => {
    setFetchingTrends(true);
    const data = await fetchRealtimeTrends();
    if (data && data.categories) {
      setRealtimeCategories(data.categories);
    }
    setFetchingTrends(false);
  };

  const handleGenerate = async () => {
    if (!trend || !highlight) return alert('请填入或选择热梗 and 产品亮点');
    setLoading(true);
    const res = await generateMemeCopy(trend, highlight, style, context);
    setResult(res);
    setLoading(false);
  };

  const displayCategories = realtimeCategories.length > 0 ? realtimeCategories : staticCategories;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <i className="fas fa-bolt text-9xl rotate-12"></i>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <h3 className="text-3xl font-black mb-2 flex items-center">
              <i className="fas fa-fire mr-3"></i> 社交金句 & 热梗实验站
            </h3>
            <p className="text-purple-100 max-w-xl">
              实时追踪 <span className="underline decoration-yellow-400 decoration-2 font-black">{currentMonthDisplay}</span> 抖音、微博热点。已集成“我鸟都不鸟你”等洗脑爆梗。
            </p>
          </div>
          <button 
            onClick={updateTrends}
            disabled={fetchingTrends}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl border border-white/30 text-xs font-bold transition-all flex items-center shrink-0"
          >
            <i className={`fas fa-radar-alt mr-2 ${fetchingTrends ? 'animate-spin' : ''}`}></i>
            {fetchingTrends ? "全网热点探测中..." : `同步${currentMonthDisplay}实时爆梗`}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col h-[580px]">
            <div className="flex items-center justify-between mb-4 px-1">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">{currentMonthDisplay} 灵感库 (50+ 实时同步)</label>
              {fetchingTrends && <span className="text-[10px] text-indigo-500 font-bold animate-pulse">AI 正在深度冲浪...</span>}
            </div>
            
            <div className="mb-4">
              <input 
                type="text"
                value={trend}
                onChange={(e) => setTrend(e.target.value)}
                placeholder="选中下方灵感或输入自定义热梗..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-purple-400 transition-all font-bold text-slate-700"
              />
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8">
              {displayCategories.map((cat, idx) => (
                <div key={idx}>
                  <div className="flex items-center mb-3 px-1">
                    <div className="w-1 h-3 bg-indigo-500 rounded-full mr-2"></div>
                    <h5 className="text-[11px] font-black text-slate-500 uppercase">{cat.name}</h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items?.map((t: string) => (
                      <button 
                        key={t}
                        onClick={() => setTrend(t)}
                        className={`px-3 py-1.5 text-[10px] font-bold rounded-xl border transition-all ${trend === t ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-purple-200 hover:bg-white'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">2. 产品核心卖点</label>
            <div className="space-y-4">
              <textarea 
                value={highlight}
                onChange={(e) => setHighlight(e.target.value)}
                placeholder="在这里输入你想推广的产品亮点..."
                className="w-full h-24 p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-400 transition-all font-medium text-slate-700 resize-none"
              />
              <div className="flex flex-wrap gap-2">
                {["星福家分红稳定性", "复星星堡康养社区", "复利奇迹与长期确定性"].map(h => (
                  <button 
                    key={h}
                    onClick={() => setHighlight(h)}
                    className={`px-3 py-1.5 text-[10px] font-bold rounded-xl border transition-all ${highlight === h ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100'}`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">3. 文案风格</label>
              <div className="grid grid-cols-2 gap-2">
                {styles.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setStyle(s.id)}
                    className={`flex flex-col items-center p-3 rounded-2xl border transition-all ${style === s.id ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-purple-200'}`}
                  >
                    <i className={`fas ${s.icon} mb-1 text-xs`}></i>
                    <span className="text-[9px] font-bold">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <button 
              onClick={handleGenerate}
              disabled={loading || !trend || !highlight}
              className={`py-5 rounded-[2.5rem] font-black text-white text-lg shadow-xl transition-all h-full ${loading ? 'bg-slate-400 cursor-wait' : 'bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 hover:scale-[1.02] active:scale-95 shadow-purple-200'}`}
            >
              {loading ? <i className="fas fa-spinner fa-spin"></i> : "一键生成爆款"}
            </button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="bg-white h-full min-h-[600px] rounded-[3.5rem] border border-slate-100 shadow-inner p-10 relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-40 -mr-40 -mt-40"></div>
            
            {result ? (
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-1.5 h-6 bg-purple-600 rounded-full"></div>
                  <span className="text-xs font-black text-slate-400 tracking-widest uppercase">爆款文案预览</span>
                </div>
                <div className="prose prose-indigo max-w-none prose-sm flex-grow overflow-y-auto pr-4 custom-scrollbar bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
                <div className="mt-10 pt-6 border-t border-slate-50 flex justify-between items-center">
                   <div className="flex flex-col">
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Selected Concept</p>
                     <p className="text-xs font-black text-purple-600">#{trend}</p>
                   </div>
                   <button onClick={() => {
                     navigator.clipboard.writeText(result);
                     alert('内容已复制到剪贴板！');
                   }} className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-xs font-bold hover:bg-black transition-all shadow-xl hover:-translate-y-1">
                     <i className="fas fa-copy mr-2"></i> 复制全文
                   </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-300 space-y-6">
                <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center border-4 border-white shadow-inner">
                  <i className="fas fa-wand-magic-sparkles text-4xl opacity-10"></i>
                </div>
                <div className="text-center max-w-xs">
                  <p className="font-black text-lg text-slate-400 uppercase tracking-tighter">创意处于待机状态</p>
                  <p className="text-xs mt-2 text-slate-300 leading-relaxed">左侧挑选一个“洗脑”神梗，AI 自动结合复星产品亮点，生成带货力极强的朋友圈短文案。</p>
                </div>
              </div>
            )}
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

export default MemeMarketing;
