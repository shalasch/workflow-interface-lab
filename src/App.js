import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Github, Play, Workflow, Bot, Database, Layers } from "lucide-react";

/* ── CURSOR ─────────────────────────────────────────────────────────────────── */
function Cursor() {
  const dot = useRef(null);
  const tgt = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = e => { tgt.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    let raf;
    const loop = () => {
      if (dot.current) dot.current.style.transform = `translate(${tgt.current.x - 2}px,${tgt.current.y - 2}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={dot} style={{ position:"fixed",top:0,left:0,width:4,height:4,background:"#fff",pointerEvents:"none",zIndex:9999,mixBlendMode:"difference" }} />
  );
}

/* ── MARQUEE ────────────────────────────────────────────────────────────────── */
function Marquee({ items }) {
  return (
    <div style={{ overflow:"hidden",borderTop:"1px solid #111",borderBottom:"1px solid #111",padding:"10px 0",whiteSpace:"nowrap",userSelect:"none" }}>
      <div style={{ display:"inline-block",animation:"marquee 34s linear infinite" }}>
        {[...items,...items].map((item,i) => (
          <span key={i} style={{ fontSize:8,fontFamily:"'JetBrains Mono',monospace",letterSpacing:3,color:"#777",marginRight:40 }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ── REVEAL ─────────────────────────────────────────────────────────────────── */
function Reveal({ children, delay=0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold:0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(14px)", transition:`opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s` }}>
      {children}
    </div>
  );
}

/* ── SCAN LINES ─────────────────────────────────────────────────────────────── */
function ScanLines() {
  return (
    <div style={{ position:"fixed",inset:0,zIndex:0,pointerEvents:"none",backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.008) 2px,rgba(255,255,255,0.008) 4px)",backgroundSize:"100% 4px",opacity:1 }} />
  );
}

/* ── DATA ───────────────────────────────────────────────────────────────────── */
const PROJECTS = [
  // FLAGSHIP
  { id:13, n:"00", cat:"AI WORKFLOW SYSTEMS", hasDemo:false, complete:true, featured:true, icon:<Layers size={13}/>,
    PT:{ title:"HYBRID AI WHATSAPP RUNTIME", sub:"n8n · LangGraph · LangSmith · RAG", desc:"Runtime operacional híbrido combinando intake via WhatsApp, orquestração n8n, roteamento com IA, state management estruturado, fluxos com memória, retrieval RAG, experimentação LangGraph, padrões de observabilidade LangSmith, execução retry-safe e sistemas de handoff humano." },
    EN:{ title:"HYBRID AI WHATSAPP RUNTIME", sub:"n8n · LangGraph · LangSmith · RAG", desc:"Hybrid operational AI runtime combining WhatsApp intake, n8n orchestration, AI routing, structured state handling, memory-aware workflows, RAG-based retrieval, LangGraph experimentation, LangSmith observability patterns, retry-safe execution, and human handoff systems." },
    tags:["n8n","LangGraph","LangSmith","RAG","WhatsApp","AI Routing","State Management","Memory Layer","Observability","Human Handoff","Workflow Runtime","Reliability"] },

  // OPERATIONAL AUTOMATION
  { id:7, n:"01", cat:"OPERATIONAL AUTOMATION", hasDemo:false, complete:true, icon:<Database size={13}/>,
    PT:{ title:"PRODUCT DATA IMPORT RUNTIME", sub:"CSV → Selenium → SQLite", desc:"Interface de ingestão de produtos orientada a workflow com validação estruturada, pipelines de transformação e tratamento operacional de imports." },
    EN:{ title:"PRODUCT DATA IMPORT RUNTIME", sub:"CSV → Selenium → SQLite", desc:"Workflow-driven product ingestion interface with structured validation, transformation pipelines, and operational import handling." },
    tags:["Python","Selenium","SQLite","Workflow Runtime"], github:"https://github.com/shalasch/product-import-automation" },

  // INTEGRATION INFRASTRUCTURE
  { id:8, n:"02", cat:"INTEGRATION INFRASTRUCTURE", hasDemo:false, complete:true, icon:<Workflow size={13}/>,
    PT:{ title:"WHATSAPP LEAD ROUTING SYSTEM", sub:"n8n · Twilio · Airtable", desc:"Workflow operacional de intake para captura de leads via WhatsApp, roteamento, normalização, sincronização com CRM e tratamento estruturado de conversas." },
    EN:{ title:"WHATSAPP LEAD ROUTING SYSTEM", sub:"n8n · Twilio · Airtable", desc:"Operational intake workflow for WhatsApp-based lead capture, routing, normalization, CRM synchronization, and structured conversation handling." },
    tags:["n8n","Twilio","Airtable","CRM","Lead Routing"] },

  // AI WORKFLOW SYSTEMS
  { id:9, n:"03", cat:"AI WORKFLOW SYSTEMS", hasDemo:false, complete:true, icon:<Workflow size={13}/>,
    PT:{ title:"AI-ASSISTED LEAD QUALIFICATION WORKFLOW", sub:"Make.com · Gmail · CRM", desc:"Sistema de qualificação baseado em workflow combinando lógica de roteamento estruturado, gerenciamento de estado conversacional e categorização de leads assistida por IA." },
    EN:{ title:"AI-ASSISTED LEAD QUALIFICATION WORKFLOW", sub:"Make.com · Gmail · CRM", desc:"Workflow-based qualification system combining structured routing logic, conversational state handling, and AI-assisted lead categorization." },
    tags:["Make.com","Gmail","CRM","State Handling","AI Routing"] },

  { id:5, n:"04", cat:"AI WORKFLOW SYSTEMS", hasDemo:false, complete:true, icon:<Bot size={13}/>,
    PT:{ title:"MULTI-FORMAT CONTENT REPURPOSING PIPELINE", sub:"1 vídeo → 10 formatos", desc:"Workflow de transformação de conteúdo assistido por IA para repurposing multi-plataforma estruturado e fluxos de publicação operacional." },
    EN:{ title:"MULTI-FORMAT CONTENT REPURPOSING PIPELINE", sub:"1 video → 10 formats", desc:"AI-assisted content transformation workflow designed for structured multi-platform repurposing and operational publishing flows." },
    tags:["AI Workflow","Multi-format","Automation","Publishing Pipeline"] },

  { id:6, n:"05", cat:"AI WORKFLOW SYSTEMS", hasDemo:false, complete:true, icon:<Bot size={13}/>,
    PT:{ title:"KNOWLEDGE-BASED SUPPORT RUNTIME", sub:"FAQ · Lead Capture · Embed", desc:"Workflow de suporte assistido por retrieval usando geração de respostas contextuais, recuperação estruturada de conhecimento e fluxos de suporte com awareness de escalação." },
    EN:{ title:"KNOWLEDGE-BASED SUPPORT RUNTIME", sub:"FAQ · Lead Capture · Embed", desc:"Retrieval-assisted support workflow using contextual response generation, structured knowledge retrieval, and escalation-aware support flows." },
    tags:["RAG","Knowledge Base","Escalation Paths","Embed","B2B"] },

  { id:10, n:"06", cat:"AI WORKFLOW SYSTEMS", hasDemo:false, complete:true, icon:<Bot size={13}/>,
    PT:{ title:"YOUTUBE METADATA OPTIMIZATION WORKFLOW", sub:"Título · Tags · Capítulos", desc:"Workflow de geração de metadados assistido por IA focado em descobribilidade, lógica de otimização estruturada e eficiência de publicação." },
    EN:{ title:"YOUTUBE METADATA OPTIMIZATION WORKFLOW", sub:"Title · Tags · Chapters", desc:"AI-assisted metadata generation workflow focused on discoverability, structured optimization logic, and publishing efficiency." },
    tags:["AI Workflow","SEO","YouTube","Metadata Optimization"] },

  { id:11, n:"07", cat:"INTEGRATION INFRASTRUCTURE", hasDemo:false, complete:true, icon:<Bot size={13}/>,
    PT:{ title:"INSTAGRAM LEAD INTAKE WORKFLOW", sub:"Resposta automática · Qualificação", desc:"Workflow estruturado de intake para Instagram para qualificação de leads, roteamento de mensagens e tratamento operacional de respostas." },
    EN:{ title:"INSTAGRAM LEAD INTAKE WORKFLOW", sub:"Auto-reply · Lead Qualification", desc:"Structured Instagram intake workflow for lead qualification, message routing, and operational response handling." },
    tags:["Instagram","Lead Routing","State Management","Message Handling"] },

  { id:2, n:"08", cat:"AI WORKFLOW SYSTEMS", hasDemo:false, complete:true, icon:<Bot size={13}/>,
    PT:{ title:"PAID MEDIA COPY GENERATION SYSTEM", sub:"Meta · Google · VSL · A/B Test", desc:"Workflow de geração de copy assistido por IA para campanhas publicitárias estruturadas e fluxos de teste multi-variação." },
    EN:{ title:"PAID MEDIA COPY GENERATION SYSTEM", sub:"Meta · Google · VSL · A/B Test", desc:"AI-assisted copy generation workflow for structured advertising campaigns and multi-variation testing flows." },
    tags:["AI Workflow","Meta Ads","Google Ads","A/B Testing","Copy Gen"] },

  { id:3, n:"09", cat:"AI WORKFLOW SYSTEMS", hasDemo:false, complete:true, icon:<Bot size={13}/>,
    PT:{ title:"NEWSLETTER GENERATION WORKFLOW", sub:"Ghostwriter · Beehiiv API", desc:"Sistema operacional de geração de conteúdo para rascunho estruturado de newsletters, formatação e suporte à publicação." },
    EN:{ title:"NEWSLETTER GENERATION WORKFLOW", sub:"Ghostwriter · Beehiiv API", desc:"Operational content generation system for structured newsletter drafting, formatting, and publishing support." },
    tags:["AI Workflow","Beehiiv","Content Generation","Publishing"] },

  { id:4, n:"10", cat:"AI WORKFLOW SYSTEMS", hasDemo:false, complete:true, icon:<Bot size={13}/>,
    PT:{ title:"CREATOR POSITIONING ANALYSIS SYSTEM", sub:"Criadores · Relatório PDF", desc:"Workflow de análise estruturada para posicionamento de audiência, identificação de nicho e suporte à direção de conteúdo." },
    EN:{ title:"CREATOR POSITIONING ANALYSIS SYSTEM", sub:"Creators · PDF Report", desc:"Structured analysis workflow for audience positioning, niche identification, and content direction support." },
    tags:["AI Workflow","Audience Analysis","Niche Identification","PDF"] },

  { id:1, n:"11", cat:"AI WORKFLOW SYSTEMS", hasDemo:false, complete:true, icon:<Bot size={13}/>,
    PT:{ title:"VIDEO SCRIPT GENERATION WORKFLOW", sub:"Shorts & Reels · Hook · CTA", desc:"Workflow de geração de roteiros orientado a tema e nicho com estrutura de hook, desenvolvimento e CTA otimizados para vídeos curtos." },
    EN:{ title:"VIDEO SCRIPT GENERATION WORKFLOW", sub:"Shorts & Reels · Hook · CTA", desc:"Topic and niche-driven script generation workflow with structured hook, body, and CTA outputs optimized for short-form video formats." },
    tags:["AI Workflow","Shorts","Reels","Script Generation"] },

  { id:12, n:"12", cat:"INTEGRATION INFRASTRUCTURE", hasDemo:false, complete:true, icon:<Workflow size={13}/>,
    PT:{ title:"WHATSAPP CRM AUTOMATION RUNTIME", sub:"Onboarding · Follow-up · CRM", desc:"Runtime de automação WhatsApp para onboarding estruturado, follow-up sequencial, tratamento de FAQ e sincronização com CRM." },
    EN:{ title:"WHATSAPP CRM AUTOMATION RUNTIME", sub:"Onboarding · Follow-up · CRM", desc:"WhatsApp automation runtime for structured onboarding, sequential follow-up, FAQ handling, and CRM synchronization." },
    tags:["WhatsApp","CRM","Onboarding","Follow-up","Integration"] },
];

const MARQUEE_ITEMS = [
  "WORKFLOW ORCHESTRATION","N8N","LANGGRAPH","LANGSMITH","RAG",
  "WHATSAPP","CRM INTEGRATION","OBSERVABILITY","STATE MANAGEMENT",
  "MEMORY LAYER","API INTEGRATION","HUMAN HANDOFF","MAKE.COM",
  "PYTHON","AIRTABLE","RELIABILITY","DETERMINISTIC ROUTING"
];

/* ── ROW ────────────────────────────────────────────────────────────────────── */
function Row({ p, lang, onDemo }) {
  const [hov, setHov] = useState(false);
  const d = p[lang];
  const catColor = {
    "OPERATIONAL AUTOMATION": "#fff",
    "AI WORKFLOW SYSTEMS":    "#888",
    "INTEGRATION INFRASTRUCTURE": "#aaa",
  }[p.cat] || "#888";

  const bg = p.featured
    ? (hov ? "#05050e" : "#030308")
    : (hov ? "#070707" : "transparent");

  const numColor = p.featured
    ? (hov ? "#8888ff" : "#3a3a88")
    : (hov ? "#fff" : "#666");

  const titleColor = p.featured
    ? (hov ? "#ccccff" : "#9999ee")
    : (hov ? "#fff" : "#666");

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"grid",
        gridTemplateColumns:"56px 1fr 130px",
        gap:"0 20px",
        padding: p.featured ? "28px 20px" : "22px 0",
        borderBottom:"1px solid #222",
        borderLeft: p.featured ? `2px solid ${hov ? "#5555bb" : "#1c1c55"}` : "none",
        background: bg,
        transition:"background 0.2s, border-left-color 0.2s",
      }}
    >
      {/* Number */}
      <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:8, color:numColor, paddingTop:4, lineHeight:1.6, transition:"color 0.2s" }}>
        {p.n}
      </div>

      {/* Content */}
      <div>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:9, flexWrap:"wrap" }}>
          <span style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:catColor, letterSpacing:3, border:`1px solid ${hov?catColor:"#151515"}`, padding:"2px 8px", transition:"border-color 0.2s" }}>
            {p.cat}
          </span>
          {p.featured && (
            <span style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"#6666cc", letterSpacing:2, border:"1px solid #252560", padding:"2px 8px" }}>
              FLAGSHIP
            </span>
          )}
          {!p.complete && (
            <span style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"#666", letterSpacing:2 }}>
              {`// ${lang==="PT" ? "EM BREVE" : "COMING SOON"}`}
            </span>
          )}
        </div>

        <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:"clamp(10px,1.6vw,15px)", color:titleColor, letterSpacing:0, lineHeight:1.8, marginBottom:10, transition:"color 0.2s" }}>
          {d.title}
        </div>

        <div style={{ fontSize:8, fontFamily:"'JetBrains Mono',monospace", color:hov?"#bbb":"#777", letterSpacing:2, marginBottom:10, transition:"color 0.2s" }}>
          {d.sub}
        </div>

        <div style={{ fontSize:11.5, color:hov?"#ccc":"#999", lineHeight:1.8, maxWidth:p.featured?620:500, fontWeight:300, letterSpacing:0.2, transition:"color 0.2s" }}>
          {d.desc}
        </div>

        <div style={{ display:"flex", gap:5, marginTop:12, flexWrap:"wrap" }}>
          {p.tags.map(t => (
            <span key={t} style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:hov?"#aaa":"#777", border:`1px solid ${hov?"#444":"#333"}`, padding:"2px 7px", letterSpacing:1, transition:"all 0.2s" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Action */}
      <div style={{ display:"flex", flexDirection:"column", gap:6, alignItems:"flex-end", paddingTop:2 }}>
        {p.hasDemo ? (
          <button
            onClick={() => onDemo(p.id)}
            style={{ padding:"8px 14px", border:`1px solid ${hov?"#fff":"#181818"}`, background:hov?"#fff":"transparent", color:hov?"#000":"#2a2a2a", fontSize:7, cursor:"pointer", fontFamily:"'Press Start 2P',monospace", letterSpacing:1, display:"flex", alignItems:"center", gap:7, transition:"all 0.2s", lineHeight:1.6 }}
          >
            <Play size={7} strokeWidth={2.5}/>DEMO
          </button>
        ) : (
          <a href="https://wa.me/5521967533689" target="_blank" rel="noreferrer"
            style={{ padding:"8px 14px", border:"1px solid #141414", color:"#777", fontSize:7, textDecoration:"none", fontFamily:"'JetBrains Mono',monospace", letterSpacing:2, display:"flex", alignItems:"center", gap:6, transition:"all 0.2s",
              ...(hov ? { borderColor:"#fff", color:"#fff" } : {}) }}>
            {lang==="PT" ? "CONTATO" : "CONTACT"} <ArrowUpRight size={9}/>
          </a>
        )}
        {p.github && (
          <a href={p.github} target="_blank" rel="noreferrer"
            style={{ padding:"8px 14px", border:"1px solid #2a2a2a", color:"#666", fontSize:7, textDecoration:"none", fontFamily:"'JetBrains Mono',monospace", letterSpacing:2, display:"flex", alignItems:"center", gap:6 }}>
            <Github size={8}/>SRC
          </a>
        )}
      </div>
    </div>
  );
}

/* ── MAIN ───────────────────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [lang, setLang] = useState("PT");
  const [cat, setCat] = useState("all");
  const [loaded, setLoaded] = useState(false);
  const [, setDemoId] = useState(null);
  const [, setTick] = useState(0);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);
  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const now = new Date();
  const timeStr = now.toLocaleTimeString("pt-BR", { hour:"2-digit", minute:"2-digit", second:"2-digit" });

  const cats = lang === "PT"
    ? { all:"TODOS", "op-automation":"AUTOMAÇÃO OPERACIONAL", "ai-workflow":"FLUXOS DE IA", integration:"INTEGRAÇÕES" }
    : { all:"ALL", "op-automation":"OPERATIONAL AUTOMATION", "ai-workflow":"AI WORKFLOW SYSTEMS", integration:"INTEGRATION INFRA" };

  const filtered = cat === "all" ? PROJECTS : PROJECTS.filter(p => {
    if (cat === "op-automation") return p.cat === "OPERATIONAL AUTOMATION";
    if (cat === "ai-workflow")   return p.cat === "AI WORKFLOW SYSTEMS";
    if (cat === "integration")   return p.cat === "INTEGRATION INFRASTRUCTURE";
    return true;
  });

  return (
    <div style={{ minHeight:"100vh", background:"#000", color:"#fff", fontFamily:"'JetBrains Mono',monospace", cursor:"none", overflowX:"hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
      <Cursor/>
      <ScanLines/>
      <style>{`
        @keyframes marquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink    { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes scandown { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        ::selection { background:#fff; color:#000 }
        * { box-sizing:border-box }
      `}</style>

      {/* Moving scan line */}
      <div style={{ position:"fixed",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.03),transparent)",animation:"scandown 8s linear infinite",zIndex:1,pointerEvents:"none" }} />

      {/* ── NAV ── */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"0 40px",height:50,display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(0,0,0,0.97)",backdropFilter:"blur(20px)",borderBottom:"1px solid #222" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <span style={{ fontFamily:"'Press Start 2P',monospace", fontSize:11, color:"#fff", letterSpacing:1, lineHeight:1 }}>SHALA</span>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:8, color:"#666", letterSpacing:2 }}>.DEV</span>
        </div>

        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"#555", letterSpacing:3, fontVariantNumeric:"tabular-nums" }}>
          {timeStr}<span style={{ animation:"blink 1s step-end infinite", marginLeft:3, color:"#777" }}>_</span>
        </div>

        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <div style={{ display:"flex", border:"1px solid #2a2a2a" }}>
            {["PT","EN"].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ padding:"5px 12px", fontSize:8, background:lang===l?"#fff":"transparent", color:lang===l?"#000":"#1e1e1e", border:"none", cursor:"pointer", fontFamily:"'JetBrains Mono',monospace", letterSpacing:2, transition:"all 0.15s" }}>{l}</button>
            ))}
          </div>
          <a href="https://github.com/shalasch" target="_blank" rel="noreferrer" style={{ width:32,height:32,border:"1px solid #2a2a2a",display:"flex",alignItems:"center",justifyContent:"center",color:"#666",textDecoration:"none" }}>
            <Github size={11}/>
          </a>
          <a href="https://wa.me/5521967533689" target="_blank" rel="noreferrer" style={{ padding:"6px 16px",background:"#fff",color:"#000",fontSize:7,fontWeight:700,textDecoration:"none",letterSpacing:2,fontFamily:"'Press Start 2P',monospace",lineHeight:1.6 }}>
            {lang==="PT" ? "CONTATO" : "CONTACT"}
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ paddingTop:50,minHeight:"100vh",display:"flex",flexDirection:"column",position:"relative",overflow:"hidden" }}>

        {/* Pixel grid bg */}
        <div style={{ position:"absolute",inset:0,zIndex:0,pointerEvents:"none",backgroundImage:"radial-gradient(circle, #0f0f0f 1px, transparent 1px)",backgroundSize:"24px 24px",opacity:0.5 }} />

        {/* Big `</>` decoration */}
        <div style={{ position:"absolute",right:"-3%",bottom:"-4%",fontFamily:"'Press Start 2P',monospace",fontSize:"clamp(80px,16vw,220px)",color:"transparent",WebkitTextStroke:"1px #0c0c0c",lineHeight:1,pointerEvents:"none",userSelect:"none",opacity:loaded?1:0,transition:"opacity 1.4s ease 0.4s",letterSpacing:-4 }}>
          &lt;/&gt;
        </div>

        <div style={{ flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"80px 40px 60px",position:"relative",zIndex:2 }}>

          {/* Status */}
          <div style={{ opacity:loaded?1:0, animation:loaded?"fadeUp 0.5s ease 0.1s both":"none" }}>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:44 }}>
              <div style={{ width:6,height:6,borderRadius:0,background:"#fff",boxShadow:"0 0 0 2px #000, 0 0 0 3px #fff" }} />
              <span style={{ fontSize:7,color:"#777",letterSpacing:3,fontFamily:"'JetBrains Mono',monospace" }}>
                {lang==="PT" ? "STATUS: DISPONÍVEL PARA PROJETOS" : "STATUS: AVAILABLE FOR PROJECTS"}
              </span>
            </div>
          </div>

          {/* ── HERO HEADLINE ── */}
          <div style={{ opacity:loaded?1:0, animation:loaded?"fadeUp 0.6s ease 0.2s both":"none" }}>
            <div style={{ fontFamily:"'Press Start 2P',monospace", lineHeight:1.6, marginBottom:0 }}>
              <div style={{ fontSize:"clamp(20px,5.5vw,68px)", color:"#fff", marginBottom:8 }}>OPERATIONAL</div>
              <div style={{ fontSize:"clamp(20px,5.5vw,68px)", color:"#666", marginBottom:8 }}>AI</div>
              <div style={{ fontSize:"clamp(20px,5.5vw,68px)", color:"#fff" }}>
                SYSTEMS
                <span style={{ animation:"blink 1s step-end infinite", color:"#fff" }}>█</span>
              </div>
            </div>
          </div>

          {/* Sub + CTA */}
          <div style={{ opacity:loaded?1:0, animation:loaded?"fadeUp 0.6s ease 0.4s both":"none", marginTop:48, display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, maxWidth:840 }}>
            <p style={{ margin:0,fontSize:12,color:"#888",lineHeight:1.9,fontWeight:300,letterSpacing:0.3 }}>
              {lang==="PT"
                ? "Construindo sistemas de IA operacionais focados em orquestração de workflows, integrações, confiabilidade, automação com memória e processos human-in-the-loop."
                : "Building operational AI systems focused on workflow orchestration, integrations, reliability, memory-aware automation, and human-in-the-loop processes."}
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <a href="https://wa.me/5521967533689" target="_blank" rel="noreferrer"
                style={{ padding:"14px 20px",background:"#fff",color:"#000",fontSize:7,fontWeight:700,textDecoration:"none",display:"flex",justifyContent:"space-between",alignItems:"center",letterSpacing:2,fontFamily:"'Press Start 2P',monospace",lineHeight:1.6 }}>
                WHATSAPP <ArrowUpRight size={13}/>
              </a>
            </div>
          </div>

          {/* Stats */}
          <div style={{ opacity:loaded?1:0, animation:loaded?"fadeUp 0.6s ease 0.6s both":"none", marginTop:60, display:"flex", borderTop:"1px solid #1a1a1a", paddingTop:24, gap:0, flexWrap:"wrap" }}>
            {[
              ["13+", lang==="PT" ? "SISTEMAS"  : "SYSTEMS"],
              ["5+",  "STACKS"],
              ["100%","CUSTOM"],
              ["LIVE", lang==="PT" ? "FLUXOS"   : "WORKFLOWS"],
            ].map(([v,l],i) => (
              <div key={l} style={{ paddingRight:32, marginRight:32, borderRight:i<3?"1px solid #0c0c0c":"none", marginBottom:8 }}>
                <div style={{ fontFamily:"'Press Start 2P',monospace",fontSize:"clamp(14px,2.5vw,28px)",color:"#fff",lineHeight:1.4,letterSpacing:-1 }}>{v}</div>
                <div style={{ fontSize:7,fontFamily:"'JetBrains Mono',monospace",color:"#666",letterSpacing:3,marginTop:6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee items={MARQUEE_ITEMS}/>

      {/* ── SYSTEMS ── */}
      <section style={{ padding:"72px 40px", maxWidth:1060, margin:"0 auto" }}>
        <Reveal>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:36, flexWrap:"wrap", gap:16 }}>
            <div>
              <div style={{ fontSize:7,fontFamily:"'JetBrains Mono',monospace",color:"#666",letterSpacing:3,marginBottom:12 }}>
                {`// ${lang==="PT" ? "SISTEMAS" : "SYSTEMS"}`}
              </div>
              <div style={{ fontFamily:"'Press Start 2P',monospace",fontSize:"clamp(13px,2.5vw,24px)",color:"#fff",lineHeight:1.6,letterSpacing:0 }}>
                {lang==="PT" ? "O QUE\nCONSTRUO" : "WHAT I\nBUILD"}
              </div>
            </div>

            {/* Category filter */}
            <div style={{ display:"flex", gap:2, flexWrap:"wrap" }}>
              {Object.entries(cats).map(([k,v]) => (
                <button key={k} onClick={() => setCat(k)}
                  style={{ padding:"7px 14px", background:cat===k?"#fff":"transparent", color:cat===k?"#000":"#1a1a1a", border:`1px solid ${cat===k?"#fff":"#111"}`, fontSize:7, cursor:"pointer", fontFamily:"'JetBrains Mono',monospace", letterSpacing:2, transition:"all 0.15s" }}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Column headers */}
        <div style={{ display:"grid", gridTemplateColumns:"56px 1fr 130px", gap:"0 20px", paddingBottom:10, borderBottom:"1px solid #1a1a1a" }}>
          {["NO.", lang==="PT"?"SISTEMA / PROJETO":"SYSTEM / PROJECT", "—"].map(h => (
            <span key={h} style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"#555", letterSpacing:3 }}>{h}</span>
          ))}
        </div>

        {filtered.map((p,i) => (
          <Reveal key={p.id} delay={i * 0.04}>
            <Row p={p} lang={lang} onDemo={setDemoId}/>
          </Reveal>
        ))}
      </section>

      {/* ── ABOUT / CONTACT ── */}
      <section style={{ padding:"60px 40px 96px", maxWidth:1060, margin:"0 auto", borderTop:"1px solid #0a0a0a" }}>
        <Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"start" }}>
            <div>
              <div style={{ fontSize:7,fontFamily:"'JetBrains Mono',monospace",color:"#666",letterSpacing:3,marginBottom:20 }}>
                {`// ${lang==="PT" ? "SOBRE" : "ABOUT"}`}
              </div>
              <div style={{ fontFamily:"'Press Start 2P',monospace",fontSize:"clamp(14px,3vw,30px)",color:"#fff",lineHeight:1.8,marginBottom:20 }}>
                {lang==="PT" ? "VAMOS\nCONSTRUIR\nJUNTOS." : "LET'S\nBUILD\nTOGETHER."}
              </div>
              <p style={{ fontSize:12,color:"#888",lineHeight:1.9,fontWeight:300,maxWidth:340,letterSpacing:0.3 }}>
                {lang==="PT"
                  ? "Focado em construir sistemas de IA operacionais: orquestração com n8n e LangGraph, integrações via API e Airtable, automação WhatsApp com CRM, retrieval RAG, observabilidade LangSmith e workflows human-in-the-loop com roteamento determinístico."
                  : "Focused on building operational AI systems: orchestration with n8n and LangGraph, API and Airtable integrations, WhatsApp automation with CRM, RAG retrieval, LangSmith observability, and human-in-the-loop workflows with deterministic routing."}
              </p>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:2, paddingTop:52 }}>
              {[
                { label:"WHATSAPP", href:"https://wa.me/5521967533689", primary:true },
                { label:"GITHUB",   href:"https://github.com/shalasch" },
                { label:"EMAIL",    href:"mailto:shaladrive@gmail.com" },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                  style={{ padding:"15px 20px", background:c.primary?"#fff":"transparent", color:c.primary?"#000":"#1e1e1e", border:`1px solid ${c.primary?"#fff":"#0f0f0f"}`, fontSize:c.primary?7:8, textDecoration:"none", display:"flex", justifyContent:"space-between", alignItems:"center", letterSpacing:2, transition:"all 0.18s", fontFamily:c.primary?"'Press Start 2P',monospace":"'JetBrains Mono',monospace", lineHeight:1.6, cursor:"none" }}
                  onMouseEnter={e => { if (!c.primary) { e.currentTarget.style.borderColor="#fff"; e.currentTarget.style.color="#fff"; }}}
                  onMouseLeave={e => { if (!c.primary) { e.currentTarget.style.borderColor="#0f0f0f"; e.currentTarget.style.color="#1e1e1e"; }}}>
                  {c.label} <ArrowUpRight size={12}/>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding:"14px 40px", borderTop:"1px solid #080808", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
        <span style={{ fontFamily:"'Press Start 2P',monospace", fontSize:9, color:"#0f0f0f", letterSpacing:0 }}>SHALA.DEV</span>
        <span style={{ fontSize:7, fontFamily:"'JetBrains Mono',monospace", color:"#444", letterSpacing:3 }}>© 2026 · OPERATIONAL AI SYSTEMS · WORKFLOW AUTOMATION</span>
      </footer>
    </div>
  );
}
