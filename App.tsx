import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import { UserInput, AnalysisState, AnalysisOptions } from './types';
import { analyzePerformance } from './services/geminiService';

// Pre-filling text to match the user's image content for better UX start
const DEFAULT_TEXT = `战功总结
思考方向：
1. 产出的业绩情况；
2. 达成的阶段性的项目里程碑等。

战功 1
【交付领凭，全国夺冠】在负责沪苏皖及后续沪浙闽区域期间，过去5个月累计完成交付 47,217台，整体达成率 超过100%，一直位列全国战区交付排名第一，内战比第一，稳固了区域在市场中的头部地位。

战功 2
【里程碑突破，屡创新高】
推动区域于9月29日实现累计交付突破 10万台，并于9月30日创下区域单月交付 破1万台 的历史纪录。
10月、11月连续获评“交付效率Top 1大区”；2025年上半年交付达成率与交付量双项全国第一。
12月带领上海区域赢得“人车家全生态荣誉奖”，助力多家门店刷新单日交付峰值。

战功 3
【新品上市承接“零差评”】在YU7上市期，确保所有一线人员熟练掌握产品与流程，一夜之间完成10个城市展车/试驾车换装，从容应对爆款压力，实现 首批VIP用户交付零差评。

战功 4
【团队专业能力登顶】区域荣获年度PDI技能大赛 团体第一，上海门店包揽个人赛 冠、亚军，彰显团队顶尖的技能标准与执行品质。

战功 5
【阵地快速拓展与加固】完成 江苏5店店长招聘与平稳交接；接手新区城后，高效推进宁波一店改造、宁波二店与上海二店开业、嘉兴二店选址及金华、福州原址扩建等项目，为业务扩张打下坚实基础。

内功总结
思考方向：
1. 组织建设：包括组织优化、知识沉淀、方法总结、文化建设、区域建设等；
2. 人才培养：包括梯队建设（人才引入/内部培养）、人才输出及经验分享，如担任青蓝导师、担任讲师、支持部门建设等。

内功 1
【整合邀约中心，疏通业务链路】自10月20日起，承接区域门店+邀约中心统筹管理职能，快速识别业务卡点，输出清晰指令，保障整体目标高效达成。

内功 2
【组织能力调研总分第一】在下半年组织能力调研中，所带领团队（含两个近百人邀约中心）荣获 综合总分第一名，体现团队在协同、执行力与文化认同上的显著优势。

内功 3
【销交服协同机制建设】主动协调，化解上海市经信委对业务审批的潜在风险；主导编写《上海市专属牌照政策销交服协同手册（2025版）》，确保上海区域新能源业务从销售到交付的全链路顺畅。

内功 4
【深度走访与座谈，推动前线协同】完成区域内所有门店 不低于2轮实地走访，对杭州邀约中心实施 每周一次 的跟进机制，并组织浙江、福建、嘉兴等多场“销交服”三端座谈会，促进问题闭环与流程优化。

内功 5
【高端接待与品牌输出】多次完成重要外事接待，如玛莎拉蒂全球CEO到访，系统阐释小米新零售理念，获得高度评价，提升公司高端合作形象。

内功 6
【赋能团队，辩论赛连战连捷】作为销交服店长辩论赛区域辅导员，指导福建、浙江、上海三支队伍，在初赛、复赛中 连胜对手，强化了团队的表达能力与跨职能协作意识。`;

const App: React.FC = () => {
  const [input, setInput] = useState<UserInput>({
    text: DEFAULT_TEXT,
    image: null,
    imagePreview: null
  });

  const [options, setOptions] = useState<AnalysisOptions>({
    style: 70, // Default to somewhat formal
    length: 30 // Default to somewhat concise
  });

  const [analysis, setAnalysis] = useState<AnalysisState>({
    isLoading: false,
    result: null,
    error: null
  });

  const handleAnalyze = async () => {
    if (!input.text && !input.image) return;

    setAnalysis({ isLoading: true, result: null, error: null });

    try {
      const result = await analyzePerformance(
        input.text, 
        options,
        input.imagePreview || undefined
      );
      setAnalysis({
        isLoading: false,
        result: result,
        error: null
      });
    } catch (err: any) {
      setAnalysis({
        isLoading: false,
        result: null,
        error: err.message || 'An unexpected error occurred'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-8rem)] min-h-[600px]">
          {/* Left Column: Input */}
          <section className="h-full">
            <InputSection 
              input={input} 
              setInput={setInput} 
              options={options}
              setOptions={setOptions}
              onAnalyze={handleAnalyze} 
              isAnalyzing={analysis.isLoading}
            />
          </section>
          
          {/* Right Column: Output */}
          <section className="h-full">
            <OutputSection analysis={analysis} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;