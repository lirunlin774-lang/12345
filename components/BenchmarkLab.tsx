
import React, { useState, useEffect } from 'react';
import { fetchMarketBenchmarkData } from '../services/geminiService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'https://esm.sh/recharts@^2.12.7';

const BenchmarkLab: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBanks, setSelectedBanks] = useState<string[]>(["工商银行", "四川银行"]);
  
  const banks = [
    { name: "工商银行", color: "#4f46e5" },
    { name: "农业银行", color: "#10b981" },
    { name: "中国银行", color: "#ef4444" },
    { name: "建设银行", color: "#3b82f6" },
    { name: "成都银行", color: "#f59e0b" },
    { name: "四川银行", color: "#8b5cf6" },
    { name: "交通银行", color: "#ec4899" },
    { name: "邮储银行", color: "#06b6d4" },
    { name: "招商银行", color: "#14b8a6" },
    { name: "中信银行", color: "#f43f5e" },
    { name: "平安银行", color: "#6366f1" }
  ];

  useEffect(() => {
    loadData();
  }, [selectedBanks]);

  const loadData = async () => {
    setLoading(true);
    const result = await fetchMarketBenchmarkData(selectedBanks);
    setData(result);
    setLoading(false);
  };

  const toggleBank = (name: string) => {
    if (selectedBanks.includes(name)) {
      if (selectedBanks.length > 1) setSelectedBanks(selectedBanks.filter(b => b !== name));
    } else {
      if (selectedBanks.length < 5) setSelectedBanks([...selectedBanks, name]);
      else alert("最多同时对比5家机构");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-black text-slate-800">资产对标中心</h3>
          <p className="text-sm text-slate-500 mt-1">多机构 1/3/5年 定存利率动态对标（含国债/货基基准）</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center max-w-lg">
          {banks.map(b => (
            <button
              key={b.name}
              onClick={() => toggleBank(b.name)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border ${selectedBanks.includes(b.name) ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'}`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 h-[650px] flex flex-col relative">
            {loading ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-sm text-slate-400 font-bold">正在多维检索机构利率数据...</p>
              </div>
            ) : (
              <div className="flex-1 w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="date" tick={{fontSize: 9, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                    <YAxis tick={{fontSize: 10, fill: '#94a3b8'}} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                    <Tooltip contentStyle={{borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                    <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{paddingBottom: '30px', fontSize: '9px', fontWeight: 'bold'}} />
                    
                    <Line type="monotone" dataKey="bond" name="10年国债" stroke="#4f46e5" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="mFund" name="货基均值" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    
                    {selectedBanks.map((bankName, idx) => (
                      <React.Fragment key={bankName}>
                        <Line type="monotone" dataKey={`rate3y_${bankName}`} name={`${bankName}3年定存`} stroke={banks.find(b => b.name === bankName)?.color} strokeWidth={2} dot={false} />
                      </React.Fragment>
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><i className="fas fa-chart-line text-6xl"></i></div>
             <h4 className="font-black mb-4 text-xs uppercase tracking-widest text-blue-400">当前对比机构</h4>
             <div className="space-y-2">
                {selectedBanks.map(b => (
                  <div key={b} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-xs font-bold">{b}</span>
                    <i className="fas fa-check-circle text-blue-400 text-[10px]"></i>
                  </div>
                ))}
             </div>
             <p className="mt-6 text-[10px] text-slate-400 leading-relaxed italic">
               对比显示：随着大行压降成本，3年/5年期挂牌利率已失去往日吸引力。
             </p>
          </div>
          
          <div className="bg-blue-600 p-8 rounded-[3rem] text-white shadow-xl">
             <h4 className="font-black mb-2 text-sm">成交秘籍</h4>
             <p className="text-[11px] leading-relaxed opacity-90">
               “张总，您看这张图，国债和这些主流银行的存单利率都在往下‘出溜’。咱们的分红险不仅有保底，还能带您去博取比这几根线更高的红利空间。”
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkLab;
