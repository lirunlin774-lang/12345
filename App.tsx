
import React, { useState, useEffect } from 'react';
import { AppTab, KnowledgeEntry } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import BenchmarkLab from './components/BenchmarkLab';
import StrategyLab from './components/StrategyLab';
import ObjectionMaster from './components/ObjectionMaster';
import KnowledgeBase from './components/KnowledgeBase';
import KnowledgeManager from './components/KnowledgeManager';
import MemeMarketing from './components/MemeMarketing';
import ComedyLab from './components/ComedyLab';
// Import the CompanyEvaluation component
import CompanyEvaluation from './components/CompanyEvaluation';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [knowledge, setKnowledge] = useState<KnowledgeEntry[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('company_knowledge');
    if (saved) {
      setKnowledge(JSON.parse(saved));
    }
  }, []);

  const activeContext = knowledge
    .filter(k => k.isActive)
    .map(k => `[${k.title}]: ${k.content}`)
    .join('\n\n');

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        toggle={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      <main className={`flex-1 overflow-y-auto p-4 md:p-8 transition-all duration-300`}>
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-slate-800">
                  {activeTab === AppTab.DASHBOARD && "早间资讯 & 监管视点"}
                  {activeTab === AppTab.BENCHMARK && "市场收益对标实验室"}
                  {activeTab === AppTab.STRATEGY && "分红险销售逻辑实验室"}
                  {activeTab === AppTab.COMEDY && "脱口秀产品剧场"}
                  {activeTab === AppTab.MEME && "社交金句 & 热梗实验站"}
                  {activeTab === AppTab.OBJECTION && "异议处理与反超方案"}
                  {activeTab === AppTab.THEORY && "经济理论与名人堂"}
                  {activeTab === AppTab.CONTEXT && "知识大脑中心"}
                  {/* Title for the new evaluation tab */}
                  {activeTab === AppTab.EVALUATION && "险企评价与投资穿透"}
                </h1>
              </div>
              <p className="text-slate-500 mt-1">复星保德信四川分公司 · 专属AI助理</p>
            </div>
          </header>

          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {activeTab === AppTab.DASHBOARD && <Dashboard context={activeContext} />}
            {activeTab === AppTab.BENCHMARK && <BenchmarkLab />}
            {activeTab === AppTab.STRATEGY && <StrategyLab context={activeContext} />}
            {activeTab === AppTab.COMEDY && <ComedyLab context={activeContext} />}
            {activeTab === AppTab.MEME && <MemeMarketing context={activeContext} />}
            {activeTab === AppTab.OBJECTION && <ObjectionMaster context={activeContext} />}
            {activeTab === AppTab.THEORY && <KnowledgeBase />}
            {activeTab === AppTab.CONTEXT && <KnowledgeManager knowledge={knowledge} setKnowledge={setKnowledge} />}
            {/* Conditional rendering for CompanyEvaluation */}
            {activeTab === AppTab.EVALUATION && <CompanyEvaluation />}
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
