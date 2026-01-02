
import React, { useState, useEffect } from 'react';
import { fetchCompanyEvaluation } from '../services/geminiService';

const CompanyEvaluation: React.FC = () => {
  const [selectedCompany, setSelectedCompany] = useState("复星保德信人寿");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const companies = [
    "复星保德信人寿", "中信保诚人寿", "友邦人寿", "平安人寿", "中国人寿", 
    "太保寿险", "泰康人寿", "招商信诺人寿", "同方全球人寿", "中美联泰大都会"
  ];

  useEffect(() => {
    loadEvaluation();
  }, [selectedCompany]);

  const loadEvaluation = async () => {
    setLoading(true);
    const result = await fetchCompanyEvaluation(selectedCompany);
    setData(result);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-pulse">
        <div className="w-16 h-16 bg-blue-600 rounded-3xl mb-6 animate-bounce flex items-center justify-center text-white">
          <i className="fas fa-search-dollar text-2xl"></i>
        </div>
        <p className="text-slate-500 font-bold">正在深度透视【{selectedCompany}】财报及投资底牌...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* 头部选择器 */}
      <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800">险企评价实验室</h2>
          <p className="text-sm text-slate-500">穿透股东背景，直击投资回报真相</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {companies.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCompany(c)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${selectedCompany === c ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：背景与评级 */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 h-full">
              <h3 className="font-black text-slate-800 mb-6 flex items-center">
                <i className="fas fa-users-gear text-blue-600 mr-2"></i> 股东背景与实力
              </h3>
              <div className="space-y-4">
                {data.shareholders?.map((s: any, i: number) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-slate-800 text-sm">{s.name}</span>
                      <span className="text-blue-600 font-black text-xs">{s.ratio}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>

              <h3 className="font-black text-slate-800 mt-10 mb-6 flex items-center">
                <i className="fas fa-certificate text-amber-500 mr-2"></i> 权威机构评级
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {data.ratings?.map((r: any, i: number) => (
                  <div key={i} className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 flex flex-col items-center">
                    <span className="text-[10px] font-bold text-amber-700 uppercase mb-1">{r.org}</span>
                    <span className="text-xl font-black text-slate-800">{r.level}</span>
                    <span className="text-[9px] text-amber-600 font-bold mt-1">{r.trend}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 中间：投资收益 */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 财务投资收益率 */}
              <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
                <h4 className="font-black text-slate-800 mb-6 flex items-center">
                  <i className="fas fa-chart-line-up text-emerald-500 mr-2"></i> 财务投资收益率
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: '近1年', val: data.financialYield?.y1 },
                    { label: '近3年', val: data.financialYield?.y3 },
                    { label: '近5年', val: data.financialYield?.y5 },
                    { label: '近10年', val: data.financialYield?.y10 },
                  ].map((y, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{y.label}</span>
                      <span className="text-2xl font-black text-slate-800">{y.val}%</span>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${Math.min(y.val * 10, 100)}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 综合投资收益率 */}
              <div className="bg-slate-900 p-8 rounded-[3rem] shadow-xl text-white">
                <h4 className="font-black mb-6 flex items-center">
                  <i className="fas fa-coins text-yellow-400 mr-2"></i> 综合投资收益率
                </h4>
                <div className="space-y-6">
                  {[
                    { label: '近1年综合', val: data.comprehensiveYield?.y1 },
                    { label: '近3年综合', val: data.comprehensiveYield?.y3 },
                    { label: '近10年综合', val: data.comprehensiveYield?.y10 },
                  ].map((y, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">{y.label}</span>
                      <div className="flex items-center">
                        <span className="text-xl font-black text-white mr-3">{y.val}%</span>
                        <div className="w-20 bg-white/10 h-2 rounded-full overflow-hidden">
                          <div className="bg-yellow-400 h-full" style={{ width: `${Math.min(y.val * 12, 100)}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 偿付能力 */}
              <div className="bg-blue-50/50 p-8 rounded-[3rem] border border-blue-100">
                <h4 className="font-black text-blue-800 mb-4 text-sm">偿付能力充足率</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-blue-600 mb-1">
                      <span>核心充足率</span>
                      <span>{data.solvency?.core}%</span>
                    </div>
                    <div className="w-full bg-blue-100 h-2 rounded-full">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(data.solvency?.core / 2, 100)}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-blue-600 mb-1">
                      <span>综合充足率</span>
                      <span>{data.solvency?.comprehensive}%</span>
                    </div>
                    <div className="w-full bg-blue-100 h-2 rounded-full">
                      <div className="bg-blue-800 h-2 rounded-full" style={{ width: `${Math.min(data.solvency?.comprehensive / 3, 100)}%` }}></div>
                    </div>
                  </div>
                  <p className="text-[9px] text-blue-400 font-bold mt-2">数据截至：{data.solvency?.date}</p>
                </div>
              </div>

              {/* 红利实现率 */}
              <div className="bg-rose-50/50 p-8 rounded-[3rem] border border-rose-100">
                <h4 className="font-black text-rose-800 mb-4 text-sm">分红实现率</h4>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="relative mb-4">
                    <svg className="w-24 h-24">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-rose-100" />
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
                        strokeDasharray={251} strokeDashoffset={251 - (251 * (data.dividendRealization?.average || 100)) / 100}
                        strokeLinecap="round" className="text-rose-500" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-black text-rose-900">{data.dividendRealization?.average}%</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-rose-600 font-bold text-center">平均分红实现水平</p>
                </div>
              </div>

              {/* 投资风格 */}
              <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100">
                <h4 className="font-black text-slate-800 mb-2 text-sm">投资风格与能力</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed italic">
                  "{data.style?.description}"
                </p>
                <div className="mt-4 space-y-2">
                   {Object.entries(data.style?.radar || {}).map(([k, v]: any) => (
                     <div key={k} className="flex items-center justify-between">
                       <span className="text-[9px] text-slate-400 font-bold uppercase">{k}</span>
                       <div className="w-24 bg-slate-200 h-1 rounded-full">
                         <div className="bg-slate-400 h-1 rounded-full" style={{ width: `${v}%` }}></div>
                       </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyEvaluation;
