
import { GoogleGenAI, Type } from "@google/genai";

const formatContext = (knowledge: string) => {
  if (!knowledge) return "";
  return `\n--- 背景知识 ---\n${knowledge}\n--- 背景知识结束 ---\n`;
};

// 获取实时热梗：针对用户要求的“抖音洗脑金句”风格进行深度提示词优化
export const fetchRealtimeTrends = async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const date = new Date();
  const currentMonthStr = `${date.getFullYear()}年${date.getMonth() + 1}月`;
  
  const prompt = `你是一个抖音/小红书深度冲浪选手。现在是${currentMonthStr}。
  请立即通过实时搜索总结当前最火的抖音洗脑梗、神曲配音、职场发疯文学。
  必须包含并延展类似于以下风格的最新爆梗（这些是${currentMonthStr}的顶流）：
  - “我鸟都不鸟你”（态度发疯类）
  - “阿米噶帝朵米喵喵”（洗脑旋律/猫咪类）
  - “i'm back”（回归/变装类）
  - “不讲不讲”（拒绝交流/反内卷类）
  
  请提供50个左右的条目。
  请按以下 JSON 格式返回：
  {
    "categories": [
      { "name": "🔥 ${currentMonthStr} 抖音洗脑神梗", "items": ["我鸟都不鸟你", "阿米噶帝...", "不讲不讲", "i'm back", ...] },
      { "name": "🎤 洗脑BGM/旋律梗", "items": [...] },
      { "name": "💡 职场/态度发疯文学", "items": [...] },
      { "name": "✨ 流量密码金句", "items": [...] }
    ]
  }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { 
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json"
      },
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Trends fetch failed:", error);
    return null;
  }
};

// 1. 金融资讯：精简为1-2条，极速生成
export const fetchFinancialNews = async (location: string, companyContext: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `搜索并精简输出【今日】对分红险最有利的1-2条金融快讯。要求：一句话标题 + 一句话重点。`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { tools: [{ googleSearch: {} }] },
    });
    return { text: response.text || "", chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] };
  } catch (error) {
    return { text: "今日资讯暂未获取，请稍后刷新。", chunks: [] };
  }
};

// 2. 监管政策：极速精炼版
export const fetchRegulatoryUpdates = async (companyContext: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `检索NFRA最新的一条关于利率或分红险的实质性动作。仅输出：政策核心(20字内) + 建议。`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { tools: [{ googleSearch: {} }] },
    });
    return { text: response.text || "", chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] };
  } catch (error) {
    return { text: "政策动态更新中...", chunks: [] };
  }
};

// 3. 市场对标：时间跨度缩短至6个月，提升速度
export const fetchMarketBenchmarkData = async (bankNames: string[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const names = bankNames.join('、');
  const prompt = `快速返回最近6个月国债、货基及【${names}】3年定存利率。返回JSON数组 [{date, bond, mFund, rate3y_银行名}]`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { 
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json"
      },
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    return [];
  }
};

export const fetchCompanyEvaluation = async (companyName: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `极速透视【${companyName}】实力。返回极简 JSON：股东、评级、最新收益。`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { tools: [{ googleSearch: {} }], responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return null;
  }
};

export const generateSalesScript = async (topic: string, need: string, ctx: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({ model: "gemini-3-flash-preview", contents: `生成100字内销售话术: ${topic}, 需求: ${need}. 背景: ${ctx}` });
  return response.text;
};

export const solveObjection = async (obj: string, ctx: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({ model: "gemini-3-flash-preview", contents: `一句话异议处理: ${obj}. 背景: ${ctx}` });
  return response.text;
};

export const generateMemeCopy = async (t: string, h: string, s: string, ctx: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({ model: "gemini-3-flash-preview", contents: `梗: ${t}, 亮点: ${h}, 风格: ${s}. 背景: ${ctx}. 生成抖音风格朋友圈短文案。` });
  return response.text;
};

export const generateComedyScript = async (h: string, c: string, ctx: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({ model: "gemini-3-flash-preview", contents: `300字脱口秀: ${c}, 亮点: ${h}. 背景: ${ctx}` });
  return response.text;
};
