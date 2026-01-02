
import React from 'react';
import { AppTab } from '../types';

interface SidebarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, toggle }) => {
  const menuItems = [
    { id: AppTab.DASHBOARD, label: '每日视点', icon: 'fa-chart-line' },
    { id: AppTab.BENCHMARK, label: '对标实验室', icon: 'fa-chart-area' },
    { id: AppTab.STRATEGY, label: '销售实验室', icon: 'fa-lightbulb' },
    // Added Evaluation tab to sidebar menu
    { id: AppTab.EVALUATION, label: '险企评价', icon: 'fa-magnifying-glass-chart' },
    { id: AppTab.COMEDY, label: '脱口秀剧场', icon: 'fa-microphone-lines' },
    { id: AppTab.MEME, label: '热梗实验站', icon: 'fa-fire-flame-curved' },
    { id: AppTab.OBJECTION, label: '异议应答器', icon: 'fa-shield-halved' },
    { id: AppTab.THEORY, label: '理论名人库', icon: 'fa-book-open' },
    { id: AppTab.CONTEXT, label: '知识大脑', icon: 'fa-brain' },
  ];

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} h-full bg-white border-r border-slate-200 transition-all duration-300 flex flex-col shadow-sm z-50`}>
      <div className="p-6 flex items-center justify-between">
        <div className={`flex items-center space-x-3 ${!isOpen && 'hidden'}`}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
            <i className="fas fa-robot"></i>
          </div>
          <span className="font-bold text-slate-800 text-lg whitespace-nowrap">保德信助手</span>
        </div>
        <button onClick={toggle} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
          <i className={`fas ${isOpen ? 'fa-chevron-left' : 'fa-bars'}`}></i>
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <i className={`fas ${item.icon} w-5 text-center`}></i>
            <span className={`font-medium ${!isOpen && 'hidden'}`}>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-100">
        <div className={`flex items-center space-x-3 ${!isOpen && 'hidden'}`}>
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-100">
            <img src="https://picsum.photos/100" alt="Avatar" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-800 truncate">渠道经理</p>
            <p className="text-xs text-slate-500 truncate">四川分公司</p>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
};

export default Sidebar;
