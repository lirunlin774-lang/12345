
import React, { useState, useRef } from 'react';
import { KnowledgeEntry } from '../types';

interface Props {
  knowledge: KnowledgeEntry[];
  setKnowledge: (k: KnowledgeEntry[]) => void;
}

const KnowledgeManager: React.FC<Props> = ({ knowledge, setKnowledge }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newType, setNewType] = useState<KnowledgeEntry['type']>('product');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const entry: KnowledgeEntry = {
        id: Date.now().toString(),
        title: file.name,
        content: result.substring(0, 5000), // 提取部分文本或Base64预览
        type: 'file',
        fileName: file.name,
        fileType: file.type || file.name.split('.').pop() || 'unknown',
        fileSize: file.size,
        isActive: true,
        uploadDate: new Date().toLocaleDateString()
      };
      const updated = [...knowledge, entry];
      setKnowledge(updated);
      localStorage.setItem('company_knowledge', JSON.stringify(updated));
    };

    // 如果是常见文本格式，直接读文本内容，否则读DataURL
    const isText = file.type.startsWith('text') || 
                   ['.md', '.json', '.txt', '.csv'].some(ext => file.name.toLowerCase().endsWith(ext));
    
    if (isText) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  };

  const handleAddManual = () => {
    if (!newTitle || !newContent) return;
    const entry: KnowledgeEntry = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      type: newType,
      isActive: true,
      uploadDate: new Date().toLocaleDateString()
    };
    const updated = [...knowledge, entry];
    setKnowledge(updated);
    localStorage.setItem('company_knowledge', JSON.stringify(updated));
    setIsAdding(false);
    setNewTitle('');
    setNewContent('');
  };

  const getFileIcon = (fileName?: string) => {
    const name = (fileName || '').toLowerCase();
    if (name.endsWith('.pdf')) return 'fa-file-pdf text-rose-500';
    if (name.endsWith('.doc') || name.endsWith('.docx')) return 'fa-file-word text-blue-500';
    if (name.endsWith('.xls') || name.endsWith('.xlsx') || name.endsWith('.csv')) return 'fa-file-excel text-emerald-600';
    if (name.endsWith('.ppt') || name.endsWith('.pptx')) return 'fa-file-powerpoint text-orange-500';
    if (name.endsWith('.zip') || name.endsWith('.rar') || name.endsWith('.7z')) return 'fa-file-archive text-amber-600';
    if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].some(ext => name.endsWith(ext))) return 'fa-file-image text-indigo-500';
    return 'fa-file-alt text-slate-400';
  };

  const deleteEntry = (id: string) => {
    const updated = knowledge.filter(k => k.id !== id);
    setKnowledge(updated);
    localStorage.setItem('company_knowledge', JSON.stringify(updated));
  };

  const toggleActive = (id: string) => {
    const updated = knowledge.map(k => k.id === id ? { ...k, isActive: !k.isActive } : k);
    setKnowledge(updated);
    localStorage.setItem('company_knowledge', JSON.stringify(updated));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">专属知识武器库</h2>
          <p className="text-sm text-slate-500 mt-1">上传 PDF 产品彩页、PPT 课件、Word 政策文件或图片素材</p>
        </div>
        <div className="flex space-x-3 w-full md:w-auto">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.txt,.md,.json"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 md:flex-none bg-slate-900 text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-xl hover:bg-black transition-all flex items-center justify-center group"
          >
            <i className="fas fa-cloud-upload-alt mr-2 group-hover:scale-110 transition-transform"></i>
            上传本地文件
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex-1 md:flex-none bg-blue-600 text-white px-5 py-3 rounded-2xl text-sm font-bold shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center group"
          >
            <i className="fas fa-plus mr-2 group-hover:rotate-90 transition-transform"></i>
            手动录入
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="bg-white p-8 rounded-[2.5rem] border-2 border-blue-600 shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">文档标题</label>
              <input 
                placeholder="例如: 复星保德信四川分公司Q3分红策略" 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">知识分类</label>
              <select 
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={newType}
                onChange={e => setNewType(e.target.value as any)}
              >
                <option value="product">产品手册/亮点</option>
                <option value="ecosystem">复星生态/康养</option>
                <option value="policy">监管政策/口径</option>
                <option value="other">其他业务资料</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">具体内容/关键摘要</label>
            <textarea 
              placeholder="请粘贴详细的产品条款、销售逻辑或需要AI学习的材料..."
              className="w-full h-48 p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button onClick={() => setIsAdding(false)} className="px-6 py-2 text-slate-400 font-bold hover:text-slate-600">取消</button>
            <button onClick={handleAddManual} className="px-10 py-3 bg-blue-600 text-white rounded-2xl font-black shadow-lg hover:bg-blue-700 transition-all">存储至大脑</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {knowledge.length === 0 ? (
          <div className="col-span-full py-32 bg-white border-2 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center text-slate-300">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-brain text-4xl opacity-10"></i>
            </div>
            <p className="font-bold text-lg text-slate-400">目前暂无私有知识</p>
            <p className="text-xs mt-2 text-slate-400">上传后，AI 助手将具备复星保德信四川分公司的深度业务能力</p>
          </div>
        ) : (
          knowledge.map(entry => (
            <div key={entry.id} className={`group p-6 rounded-[2rem] border transition-all duration-300 hover:shadow-xl ${entry.isActive ? 'bg-white border-slate-100' : 'bg-slate-50/50 border-transparent opacity-50 grayscale'}`}>
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center space-x-4 overflow-hidden">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all ${entry.isActive ? 'bg-slate-100 group-hover:bg-blue-50' : 'bg-slate-200'}`}>
                    <i className={`fas ${entry.type === 'file' ? getFileIcon(entry.fileName) : 'fa-lightbulb text-blue-500'} text-xl`}></i>
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-black text-slate-800 text-sm truncate">{entry.title}</h4>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                      {entry.uploadDate} · {entry.fileSize ? `${(entry.fileSize/1024).toFixed(0)}KB` : entry.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => toggleActive(entry.id)} className={`p-2 rounded-xl hover:bg-slate-100 ${entry.isActive ? 'text-green-500' : 'text-slate-400'}`}>
                    <i className={`fas ${entry.isActive ? 'fa-check-circle' : 'fa-circle'}`}></i>
                  </button>
                  <button onClick={() => deleteEntry(entry.id)} className="p-2 rounded-xl hover:bg-red-50 text-slate-300 hover:text-red-500">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
              <div className="h-16 overflow-hidden relative">
                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3 italic">
                  {entry.type === 'file' ? `已关联本地文件资源: ${entry.fileName}。AI 已掌握该文档内容摘要，可用于后续对话参考。` : entry.content}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent"></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KnowledgeManager;
