
import React, { useState } from 'react';

const KnowledgeBase: React.FC = () => {
  const [activeTheory, setActiveTheory] = useState(0);
  const [filter, setFilter] = useState<'all' | 'invest' | 'mechanism' | 'behavior' | 'macro'>('all');

  const theories = [
    // --- 机制类 ---
    {
      name: "收益平滑机制 (Return Smoothing)",
      desc: "保险公司通过设立平滑准备金，在投资丰年留存部分收益，在荒年补齐缺口，确保分红稳定性。",
      bridge: "这是分红险的‘灵魂’。告诉代理人：我们不追求一时的暴利，而是追求给客户一个‘稳稳的幸福’，对抗市场波动的躁动。",
      icon: "fa-wave-square",
      tag: "mechanism"
    },
    {
      name: "盈余分配理论 (Surplus Distribution)",
      desc: "保险公司将实际经营成果优于预期的部分（死差、利差、费差），按比例分配给保单持有人。",
      bridge: "复星保德信作为股东，愿意将至少70%的可分配盈余分给客户。这不仅是契约，更是利益共同体的体现。",
      icon: "fa-pie-chart",
      tag: "mechanism"
    },
    {
      name: "风险共担机制 (Risk Pooling)",
      desc: "大数法则的应用。通过大量同类风险的汇聚，实现风险在时间与空间上的分摊。",
      bridge: "保险是唯一的‘我为人人，人人为我’的金融工具。在不确定的时代，加入复星的资产池就是加入了高信用的避风港。",
      icon: "fa-users-rays",
      tag: "mechanism"
    },
    {
      name: "剩余索取权 (Residual Claim)",
      desc: "在履行完保底承诺后，客户对公司投资盈余拥有‘分红’形式的索取权。",
      bridge: "客户不仅是保单持有人，更像是公司的‘影子股东’。分红险让客户间接拥有了参与全球优质资产分配的入场券。",
      icon: "fa-hand-holding-dollar",
      tag: "mechanism"
    },

    // --- 投资类 ---
    {
      name: "非对称收益 (Asymmetric Returns)",
      desc: "下行风险受限（保底），而上行获利空间开放（分红）。",
      bridge: "分红险是完美的‘输了不跳楼，赢了能吃肉’的资产。保底利率是我们的底线，分红是给客户的惊喜，风险收益极度不对称。",
      icon: "fa-balance-scale-left",
      tag: "invest"
    },
    {
      name: "波动率拖累 (Volatility Drag)",
      desc: "资产波动越大，复合收益率越低。50%的亏损需要100%的盈利才能回本。",
      bridge: "代理人应向客户强调：低波动就是高收益。分红险通过平滑机制消除了波动带来的减损，长期复利效应更惊人。",
      icon: "fa-chart-line-down",
      tag: "invest"
    },
    {
      name: "均值回归 (Mean Reversion)",
      desc: "价格或收益率无论偏离多远，最终都会回到历史平均水平。",
      bridge: "当前的低利率环境是暂时的。分红险通过长周期投资，锁定跨越周期的平均收益水平，避免在估值底部错失机会。",
      icon: "fa-arrows-left-right",
      tag: "invest"
    },
    {
      name: "看涨期权理论 (Call Option Theory)",
      desc: "分红权本质上是客户持有的一份关于公司投资能力的‘看涨期权’。",
      bridge: "买分红险 = 买入一个‘保底债’ + 一个‘看涨期权’。保底保命，期权增值。复星的全球投资能力就是这份期权的底层资产。",
      icon: "fa-ticket",
      tag: "invest"
    },
    {
      name: "序列风险 (Sequence of Returns Risk)",
      desc: "投资收益出现的先后顺序对结果影响巨大，尤其是在领取阶段（如养老）。",
      bridge: "养老金领取最怕‘先亏后赚’。分红险平滑了收益序列，确保客户在领取养老金时不会因为某年的市场大跌而入不敷出。",
      icon: "fa-list-ol",
      tag: "invest"
    },
    {
      name: "动态资产配置 (Dynamic Asset Allocation)",
      desc: "根据市场环境实时调整股债比，以捕捉不同阶段的超额收益。",
      bridge: "复星保德信背后的专家团队每天都在做这个工作。客户买入保险，就是外包了这种高难度的动态配置能力。",
      icon: "fa-sliders",
      tag: "invest"
    },

    // --- 宏观与经济类 ---
    {
      name: "费雪效应 (The Fisher Effect)",
      desc: "名义利率 = 实际利率 + 预期通货膨胀率。",
      bridge: "如果通胀抬头，名义利率会上升。分红险的红利具有‘随行就市’的特征，是天然的抗通胀资产。",
      icon: "fa-temperature-arrow-up",
      tag: "macro"
    },
    {
      name: "货币幻觉 (Money Illusion)",
      desc: "人们往往只关注货币的的名义价值，而忽视了其实际购买力。",
      bridge: "现在的100万不等于20年后的100万。我们需要分红险的‘增值’部分来抵消购买力的流失，打破幻觉。",
      icon: "fa-eye-slash",
      tag: "macro"
    },
    {
      name: "机会成本 (Opportunity Cost)",
      desc: "为了得到某种东西而放弃的其他东西的价值。",
      bridge: "犹豫不决的代价是‘时间’。现在锁定复星保德信的利率环境，其机会成本是未来可能再也买不到的高预定利率产品。",
      icon: "fa-hourglass-start",
      tag: "macro"
    },
    {
      name: "风险溢价 (Risk Premium)",
      desc: "投资者要求对承担风险给予的额外补偿。",
      bridge: "保险公司作为专业机构，能通过多元化手段获取个人投资者无法触达的‘风险溢价’并分享给客户。",
      icon: "fa-gem",
      tag: "macro"
    },

    // --- 行为金融类 ---
    {
      name: "后悔厌恶 (Regret Aversion)",
      desc: "人们为了避免将来可能产生的后悔，而倾向于采取保守或跟随大众的行为。",
      bridge: "帮代理人消除客户心理负担：买保险不是投机。买保德信是跟从全球主流精英的稳健选择，绝不会因为贪婪而后悔。",
      icon: "fa-heart-crack",
      tag: "behavior"
    },
    {
      name: "锚定效应 (Anchoring Effect)",
      desc: "人们在决策时，会过度依赖之前获取的第一笔信息（锚点）。",
      bridge: "帮客户建立‘安全锚点’。先谈家庭必须保障的底线金额，再谈增值。当安全感被锚定后，分红就是锦上添花的加分项。",
      icon: "fa-anchor",
      tag: "behavior"
    },
    {
      name: "帕累托改进 (Pareto Improvement)",
      desc: "在不损害任何一方的前提下，使至少一方变得更好。",
      bridge: "保险就是一种全社会的帕累托改进：客户得到了保障，代理人得到了绩效，社会减少了负担。它是金融的终极善意。",
      icon: "fa-up-right-and-down-left-from-center",
      tag: "behavior"
    }
  ];

  const celebrities = [
    { name: "沃伦·巴菲特", category: "invest", quote: "“只有在潮水退去时，你才会知道谁一直在裸泳。”", usage: "强调复星保德信合资背景的稳健性。" },
    { name: "查理·芒格", category: "invest", quote: "“反过来想，总是反过来想。”", usage: "引导客户思考：如果未来是低增长时代，确定性有多值钱？" },
    { name: "阿尔伯特·爱因斯坦", category: "scholar", quote: "“复利是世界第八大奇迹。”", usage: "分红险红利再投资的终极背书。" },
    { name: "约翰·博格", category: "invest", quote: "“保持简单。投资不需要复杂。”", usage: "保险合同的确定性是应对复杂市场的最简方案。" },
    { name: "纳西姆·塔勒布", category: "invest", quote: "“黑天鹅不可预测，但反脆弱可以构建。”", usage: "保险是家庭财务结构中最具反脆弱性的‘盾牌’。" },
    { name: "霍华德·马克斯", category: "invest", quote: "“周期永远存在。”", usage: "用美林时钟和周期论阐述分红险的配置窗口。" },
    { name: "瑞·达利欧", category: "invest", quote: "“不进行多样化投资是最大的风险。”", usage: "保险作为‘全天候’资产篮子的底座。" },
    { name: "丹尼尔·卡尼曼", category: "scholar", quote: "“比起获得，人们更厌恶损失。”", usage: "运用前景理论话术，强调资产缩水的痛苦感。" },
    { name: "理查德·塞勒", category: "scholar", quote: "“人们需要被温柔地‘推一把’（Nudge）去做出对长期有利的决策。”", usage: "解释代理人催单的职业正当性：在帮客户做正确的事。" },
    { name: "罗伯特·席勒", category: "scholar", quote: "“金融应服务于好的社会。”", usage: "提升保险的社会价值定位。" },
    { name: "摩根·豪塞尔", category: "scholar", quote: "“理财成功的关键是活得够久。”", usage: "强调保险的长存续期优势。" },
    { name: "陈志武", category: "china", quote: "“金融跨越时空配置价值。”", usage: "用‘金融替代养儿防老’逻辑进行生态闭环。" },
    { name: "任泽平", category: "china", quote: "“未来是慢时代，长期主义是唯一护城河。”", usage: "对抗短线思维，推销分红险的跨周期逻辑。" },
    { name: "吴晓波", category: "china", quote: "“把资产留在大概率增长的地方。”", usage: "阐述复星全球化配置的底层逻辑。" },
    { name: "香帅 (唐涯)", category: "china", quote: "“在不确定的世界里，寻找确定的现金流。”", usage: "强调分红险保底+分红的现金流魅力。" },
    { name: "李嘉诚", category: "china", quote: "“我并不富有，我只是为我家人买足了保险。”", usage: "处理高净值客户异议。" },
    { name: "乔治·克拉森", category: "wealth", quote: "“先存下收入的1/10。”", usage: "引导理财意识。" },
    { name: "博多·舍费尔", category: "wealth", quote: "“不要杀掉为你下金蛋的鹅。”", usage: "形容本金与分红的最佳比喻。" },
    { name: "拿破仑·希尔", category: "wealth", quote: "“成功的关键在于对目标坚定不移的保护。”", usage: "保险的契约锁死能力。" },
    { name: "托马斯·斯坦利", category: "wealth", quote: "“真正的富人生活方式其实充满防御性。”", usage: "揭示富豪的稳健真相。" }
  ];

  const filteredTheories = filter === 'all' 
    ? theories 
    : theories.filter(t => t.tag === filter);

  return (
    <div className="space-y-12 pb-20">
      {/* 理论智库 */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-1.5 h-8 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]"></div>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">金融理论智库</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: '全部' },
              { id: 'mechanism', label: '险企机制' },
              { id: 'invest', label: '投资策略' },
              { id: 'behavior', label: '行为金融' },
              { id: 'macro', label: '宏观经济' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === tab.id ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-100 hover:border-slate-300'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredTheories.map((t, i) => (
            <div 
              key={i} 
              className={`group p-6 rounded-[2rem] border transition-all duration-500 cursor-pointer flex flex-col ${activeTheory === i ? 'bg-white border-blue-600 shadow-2xl scale-105 z-10' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1'}`}
              onClick={() => setActiveTheory(i)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${activeTheory === i ? 'bg-blue-600 text-white shadow-lg rotate-6' : 'bg-white text-slate-400 group-hover:text-blue-500 shadow-sm'}`}>
                  <i className={`fas ${t.icon} text-xl`}></i>
                </div>
                <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full ${activeTheory === i ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-500'}`}>
                  {t.tag === 'mechanism' && '险企机制'}
                  {t.tag === 'invest' && '投资策略'}
                  {t.tag === 'behavior' && '行为金融'}
                  {t.tag === 'macro' && '宏观经济'}
                </span>
              </div>
              <h4 className="font-bold text-slate-800 mb-2 text-md leading-tight">{t.name}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-4 flex-grow">
                {activeTheory === i ? t.desc : `${t.desc.substring(0, 30)}...`}
              </p>
              
              <div className={`mt-auto p-3 rounded-xl border transition-all ${activeTheory === i ? 'bg-blue-50 border-blue-100 opacity-100' : 'bg-transparent border-transparent opacity-0'}`}>
                <p className="text-[10px] font-bold text-blue-800 leading-normal">
                  <span className="text-blue-600 mr-1">💡</span> 话术桥梁：{t.bridge}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 名人堂 */}
      <section>
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-1.5 h-8 bg-slate-800 rounded-full"></div>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">智者名人堂</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {celebrities.map((c, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <i className="fas fa-quote-right text-6xl"></i>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <i className="fas fa-user-tie"></i>
                </div>
                <div>
                  <h5 className="font-black text-slate-800 text-sm">{c.name}</h5>
                  <span className="text-[9px] text-blue-500 font-bold uppercase tracking-widest">
                    {c.category === 'invest' ? '投资大师' : c.category === 'scholar' ? '专家学者' : c.category === 'china' ? '中国视点' : '财富教育'}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-slate-700 italic font-medium text-[13px] leading-snug">“{c.quote}”</p>
              </div>

              <div className="pt-4 border-t border-slate-50 mt-auto">
                <p className="text-[10px] text-slate-600 leading-normal">
                  <span className="font-bold text-slate-400 uppercase mr-1">引用逻辑:</span>
                  {c.usage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default KnowledgeBase;
