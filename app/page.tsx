"use client";

import { useMemo, useState } from "react";

type Insight = {
  id: string; session: "上午" | "下午"; type: "观点" | "方法论" | "案例" | "工具";
  theme: string; title: string; summary: string; detail: string; image?: string; editor?: string;
};

const insights: Insight[] = [
  { id:"01", session:"上午", type:"观点", theme:"人 × AI", title:"人不是工作流里被保留的一环，而是指数项", summary:"人机协作不是简单相加。人的经验、意图与生命感，会放大机器能力的最终边界。", detail:"演讲以智能演化史进入艺术与 AI 的关系：AI 生成影像打破摄影影像对现实的索引，艺术的不可言说性与人的生命经验重新成为核心。提出 O = (H + A) × e^(λH) 的协作模型。", image:"/d20/am-1.png", editor:"我更愿意把设计理解为一种带有人文学科属性的实践：代码解决可执行，人的感受决定为何执行。" },
  { id:"02", session:"上午", type:"观点", theme:"品味与作者性", title:"当“品味”被封装成 Skill，它也开始贬值", summary:"AI 能遵守约束，却无法真正拥有敏感性。可复制的风格越普及，越容易成为新的默认美学。", detail:"品味被拆解为约束与敏感性。设计规范可以被编码，风格可以被 Scale 化，但当所有人调用同一套能力时，结果会趋向最大公约数。竞争从会不会操作工具，转向能否判断、取舍与表达。", image:"/d20/am-2.png", editor:"这里存在一个迷人的悖论：品味一旦被完整说明，它是否就不再是品味？" },
  { id:"03", session:"上午", type:"案例", theme:"创作产业", title:"生成不等于创作：创造力向生成之前位移", summary:"真正的作者性发生在数据选择、训练、清洗、取舍和判断之中。", detail:"北影节 AIGC 单元三年收稿从 430 部增长到 3000 部，同时 44.9% 作品集中于超写实风格。突破者不只是生成得更像，而是把模型幻觉、个人经历与非物理语言变成作品不可替代的理由。" },
  { id:"04", session:"上午", type:"方法论", theme:"Agent 协作", title:"把设计流程翻译成 Agent Loop", summary:"确认边界、制定计划、获取上下文、生成产物、质量门禁，再以 Nudge 与 Frame 完成对齐。", detail:"设计交付从静态结果转为一套可持续运行的机制。设计系统进入代码库，Agent CMD 保护核心组件，UI Check 扫描违规实现，巡检 Agent 监控绕过评审的行为。", image:"/d20/am-4.png" },
  { id:"05", session:"上午", type:"方法论", theme:"设计工程", title:"Design in Runtime：交付物不再是一张图", summary:"规则、Token、组件和交互全部代码化，设计在运行时被调用、组合与验证。", detail:"面向 Agent 的网站不只需要可读，还需要可操作。页面同时服务人的感知与 Agent 的执行：清晰语义、结构化描述、可访问代码、Design.md 与可调用 Skill 共同组成新的设计资产。", image:"/d20/am-6.png", editor:"这也直接改变了作品集：设计师不再只展示最终页面，而要展示一个系统如何持续地产生正确结果。" },
  { id:"06", session:"下午", type:"观点", theme:"Vibe Designing", title:"从 Pixels 到 Intent：设计对象正在改变", summary:"设计师不再逐像素指定结果，而是定义意图、规则与组织方式。", detail:"Vibe Designing 不是放弃专业判断，而是把判断放到更高层：设计实时组织、临时界面和可变体验。设计师由结果的绘制者，迁移为生成系统的导演与校准者。", image:"/d20/pm-1.png", editor:"这是下午场最强的转折：界面可以是临时的，但体验原则不能是临时的。" },
  { id:"07", session:"下午", type:"工具", theme:"知识资产", title:"参考不只是图片，而是可检索的解决方案", summary:"优秀项目被结构化沉淀后，参考库会从情绪板变成组织的决策记忆。", detail:"企业内部的案例、原则、组件与项目经验，经由标签、语义搜索和 AI 检索被重新调用。它减少的不只是找图时间，更是重复理解问题与重新发明解决方案的成本。", editor:"我做作品集时常把四分之一以上时间花在找参考。真正有价值的库，应该同时返回视觉样式与它背后的解法。" },
  { id:"08", session:"下午", type:"案例", theme:"传统与技术", title:"书法遇见 AI：器是客，人才是魂", summary:"算法负责数据、模型与生成；人负责气韵、心性、意境与审美甄别。", detail:"中国美院书法学院与阿里云设计中心以经典碑帖训练模型，并进行风格杂糅、篆刻生成与数字版权存证。技术不是把传统冻结为样式，而是让传统在新的媒介中继续生长。" },
  { id:"09", session:"下午", type:"方法论", theme:"AI 可读设计", title:"让风格成为资产，让内容拥有结构", summary:"Design.md、Token、组件和场景模式，构成大模型可以理解和复用的设计语言。", detail:"从 Logo、Banner、设计稿，转向体验、系统与可执行资产。AI 可理解的设计不等于牺牲人读体验，而是建立同一系统的两种阅读层：Human Read 与 Agent Read。" },
  { id:"10", session:"下午", type:"观点", theme:"设计师角色", title:"真正的文化创造，是创造能创造的人", summary:"AI 教育的目标不是批量生产结果，而是培养判断力、感受力和跨界整合能力。", detail:"面对技术变革，设计师需要的不只是更多工具技能，而是贯通技术与文化、感知与系统、个体经验与公共价值的能力。人的温度、直觉与探索未知仍是创作主体性的来源。", editor:"我听到的共同答案不是“设计师会不会被替代”，而是“设计师愿不愿意重新定义自己的专业边界”。" },
];

const filterGroups = { 场次:["全部","上午","下午"], 类型:["全部","观点","方法论","案例","工具"] };

export default function Home() {
  const [session,setSession] = useState("全部");
  const [type,setType] = useState("全部");
  const [query,setQuery] = useState("");
  const [open,setOpen] = useState<string | null>("01");
  const shown = useMemo(() => insights.filter(i =>
    (session === "全部" || i.session === session) && (type === "全部" || i.type === type) &&
    (`${i.title}${i.summary}${i.detail}${i.theme}${i.editor||""}`.toLowerCase().includes(query.toLowerCase()))
  ),[session,type,query]);

  return <main>
    <header className="masthead">
      <div className="topline"><span>D20 / 2026</span><span>AI 设计 · 新应用</span><span>07.11 / HANGZHOU</span></div>
      <div className="hero-grid">
        <div className="issue">FIELD<br/>NOTES<br/><b>№ 01</b></div>
        <div><p className="eyebrow">设计师现场研究档案</p><h1>设计正在<br/><i>被重新发明</i></h1></div>
        <div className="abstract"><div className="orb"/><p>从人的感受与作者性，<br/>到 Agent、Skill 与 Runtime。</p></div>
      </div>
      <div className="intro"><p>这不是一份压缩后的会议纪要，而是一张可以继续探索的认知地图。</p><p>10 条核心洞察 · 2 个场次 · 4 类内容</p></div>
    </header>

    <section className="thesis">
      <span>00 / EDITOR&apos;S NOTE</span>
      <blockquote>“AI 让实现越来越便宜，<em>判断、感受与定义问题</em>因此变得越来越贵。”</blockquote>
      <p>贯穿全天的隐性线索，是设计从“制作结果”迁移到“构建产生结果的系统”。人的价值没有消失，而是从执行层上移到了意图、约束、审美和责任。</p>
    </section>

    <section className="archive" id="archive">
      <div className="archive-head"><div><span>01 / KNOWLEDGE INDEX</span><h2>洞察索引</h2></div><div className="result">{String(shown.length).padStart(2,"0")} / {insights.length}</div></div>
      <div className="controls">
        <label className="search"><span>SEARCH</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索观点、主题或方法…" /></label>
        {Object.entries(filterGroups).map(([label,items]) => <div className="filter" key={label}><span>{label}</span><div>{items.map(item => <button key={item} className={(label==="场次"?session:type)===item?"active":""} onClick={()=>label==="场次"?setSession(item):setType(item)}>{item}</button>)}</div></div>)}
      </div>
      <div className="cards">
        {shown.map(item => <article className={`card ${open===item.id?"expanded":""}`} key={item.id}>
          <button className="card-main" onClick={()=>setOpen(open===item.id?null:item.id)} aria-expanded={open===item.id}>
            <span className="num">({item.id})</span><span className="meta">{item.session}场 · {item.type}<br/><b>{item.theme}</b></span>
            <span className="copy"><h3>{item.title}</h3><p>{item.summary}</p></span><span className="toggle">{open===item.id?"−":"+"}</span>
          </button>
          {open===item.id && <div className="detail">
            <div><span className="label">CONTEXT / 整理</span><p>{item.detail}</p>{item.editor&&<aside><span>FIELD NOTE / 我的观察</span>{item.editor}</aside>}</div>
            {item.image&&<figure><img src={item.image} alt={`${item.title}相关现场演示图片`} /><figcaption>现场图像 / 点击卡片收起</figcaption></figure>}
          </div>}
        </article>)}
        {!shown.length && <div className="empty">没有符合当前筛选的内容。试试减少条件。</div>}
      </div>
    </section>

    <section className="map">
      <span>02 / SHIFT MAP</span><h2>一天里，设计对象如何迁移</h2>
      <div className="map-grid"><div><b>过去</b><h3>Pixels</h3><p>图层、页面、静态交付</p></div><i>→</i><div><b>现在</b><h3>Intent</h3><p>意图、上下文、动态体验</p></div><i>→</i><div className="future"><b>正在发生</b><h3>Runtime</h3><p>规则、Skill、Agent 与持续验证</p></div></div>
    </section>

    <footer><div><b>D20 FIELD NOTES</b><br/>为未到场的设计同事整理</div><div>资料来源<br/>现场录音转写 · 现场图片 · 个人笔记<br/>Alibaba Design D20 2026 活动信息</div><div className="green">READ / QUESTION / REFRAME<br/>不要只接受结论，继续改写它。</div></footer>
  </main>
}
