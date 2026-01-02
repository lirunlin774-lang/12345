
import React, { useState, useEffect } from 'react';
import { fetchFinancialNews, fetchRegulatoryUpdates } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface Props { context: string; }

const Dashboard: React.FC<Props> = ({ context }) => {
  const [loadingFin, setLoadingFin] = useState(true);
  const [loadingReg, setLoadingReg] = useState(true);
  const [finData, setFinData] = useState<{ text: string, chunks: any[] } | null>(null);
  const [regData, setRegData] = useState<{ text: string, chunks: any[] } | null>(null);

  useEffect(() => {
    loadAll();
  }, [context]);

  const loadAll = () => {
    loadFin();
    loadReg();
  };

  const loadFin = async () => {
    setLoadingFin(true);
    const res = await fetchFinancialNews("四川", context);
    setFinData(res);
    setLoadingFin(false);
  };

  const loadReg = async () => {
    setLoadingReg(true);
    const res = await fetchRegulatoryUpdates(context);
    setRegData(res);
    setLoadingReg(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">每日极简视点</h2>
          <p className="text-sm text-slate-500">仅展示对分红险销售最有用的核心动态</p>
        </div>
        <button 
          onClick={loadAll}
          className="flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold hover:bg-black transition-all shadow-xl"
        >
          <i className="fas fa-sync-alt"></i>
          <span>极速刷新</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 精简资讯 */}
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
              <i className="fas fa-bolt"></i>
            </div>
            <h3 className="text-lg font-black text-slate-800">关键催化剂</h3>
          </div>

          {loadingFin ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-slate-100 rounded-full w-3/4"></div>
              <div className="h-12 bg-slate-50 rounded-2xl w-full"></div>
            </div>
          ) : (
            <div className="prose prose-slate prose-sm max-w-none">
              <ReactMarkdown>{finData?.text || ""}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* 精简监管 */}
        <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-200/60">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-slate-800 rounded-2xl flex items-center justify-center text-white">
              <i className="fas fa-gavel"></i>
            </div>
            <h3 className="text-lg font-black text-slate-800">政策哨点</h3>
          </div>

          {loadingReg ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-12 bg-white rounded-2xl w-full"></div>
            </div>
          ) : (
            <div className="prose prose-slate prose-sm max-w-none">
              <ReactMarkdown>{regData?.text || ""}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
