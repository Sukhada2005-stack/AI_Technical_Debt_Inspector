import React from 'react';
import { 
  Terminal, 
  ArrowRight, 
  Database, 
  SearchCode, 
  ShieldCheck, 
  Wrench, 
  GitPullRequest, 
  Zap, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles, 
  Cpu, 
  Code2, 
  Layers, 
  GitFork, 
  Check, 
  X,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export default function LandingPage({ onOpenLogin, onOpenSignup, onOpenDocs, onDirectAccess }) {
  const agents = [
    {
      name: 'Repository Scanner',
      alias: 'The Fetcher',
      color: 'emerald',
      icon: Database,
      badge: 'AST & Embeddings',
      description: 'Ingests repositories via webhooks, maps AST call trees, and indexes code into pgvector for semantic retrieval.'
    },
    {
      name: 'Static Analysis Agent',
      alias: 'The Code Reviewer',
      color: 'cyan',
      icon: SearchCode,
      badge: 'Quality & DRY',
      description: 'Identifies monolithic God Classes, calculates cyclomatic complexity spikes, and flags duplicate logic patterns.'
    },
    {
      name: 'Security Agent',
      alias: 'The Guard',
      color: 'amber',
      icon: ShieldCheck,
      badge: 'Vulnerabilities',
      description: 'Detects hardcoded API keys, plaintext secrets, and OWASP Top 10 injection vectors like CWE-89.'
    },
    {
      name: 'Refactoring Planner',
      alias: 'The Fixer',
      color: 'violet',
      icon: Wrench,
      badge: 'Autonomous PRs',
      description: 'Translates code intent into clean, decoupled architecture and publishes ready-to-merge GitHub Pull Requests.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans selection:bg-violet-600/30 selection:text-violet-200">
      
      {/* ========================================================= */}
      {/* 1. Header / Navbar                                        */}
      {/* ========================================================= */}
      <nav className="sticky top-0 z-40 border-b border-[#1E293B] bg-[#090D16]/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onDirectAccess}>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-700 to-cyan-500 shadow-lg shadow-violet-900/30 border border-violet-500/30">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white font-sans">
                AI Technical Debt <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Inspector</span>
              </span>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                Multi-Agent Code Remediation
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6 text-xs font-mono text-slate-400">
            <a href="#agents" className="hover:text-white transition-colors">Agents</a>
            <a href="#comparison" className="hover:text-white transition-colors">Why It Matters</a>
            <a href="#workflow" className="hover:text-white transition-colors">Workflow</a>
            <button 
              onClick={onOpenDocs} 
              className="hover:text-white transition-colors flex items-center gap-1 text-slate-300"
            >
              <span>Docs</span>
            </button>
          </div>

        </div>
      </nav>

      {/* ========================================================= */}
      {/* 2. Hero Section                                           */}
      {/* ========================================================= */}
      <section className="relative px-6 pt-16 pb-20 max-w-7xl mx-auto w-full text-center flex flex-col items-center overflow-hidden">
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-violet-600/15 via-indigo-600/10 to-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Feature Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-mono mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Orchestrator-Worker Multi-Agent System</span>
          <span className="text-violet-400">v1.0</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl font-sans leading-[1.15]">
          Autonomous AI that Finds, Explains, and <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400">Refactors Technical Debt</span>
        </h1>

        {/* Subhead */}
        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl font-sans leading-relaxed">
          Traditional linters throw errors and walk away. The AI Technical Debt Inspector acts like a senior engineer inside your GitHub repo — comprehending functional intent and generating ready-to-merge clean code.
        </p>

        {/* Action Buttons: Sign Up, Log In & Docs (in succession) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-lg">
          <button
            onClick={onOpenSignup}
            className="w-full sm:w-auto px-7 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-xl shadow-violet-900/30 transition-all flex items-center justify-center gap-2 border border-violet-400/30 active:scale-95"
          >
            <span>Sign Up</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenLogin}
            className="w-full sm:w-auto px-7 py-3 rounded-xl font-semibold text-sm text-slate-200 bg-[#0F172A] hover:bg-slate-800 border border-[#1E293B] hover:border-slate-700 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Log In</span>
          </button>

          <button
            onClick={onOpenDocs}
            className="w-full sm:w-auto px-7 py-3 rounded-xl font-semibold text-sm text-slate-200 bg-[#0F172A] hover:bg-slate-800 border border-[#1E293B] hover:border-slate-700 transition-all flex items-center justify-center gap-2 active:scale-95 group"
          >
            <BookOpen className="w-4 h-4 text-violet-400 group-hover:text-violet-300 transition-colors" />
            <span>Docs</span>
          </button>
        </div>

        {/* Quick telemetry indicators */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl lg:max-w-5xl text-left">
          <div className="p-4 rounded-xl bg-[#0F172A]/70 border border-[#1E293B] flex flex-col justify-between">
            <div className="text-xl sm:text-2xl font-bold font-mono text-violet-400 tracking-tight whitespace-nowrap">25%</div>
            <p className="text-xs text-slate-400 font-sans mt-1">Developer time lost to legacy tech debt</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0F172A]/70 border border-[#1E293B] flex flex-col justify-between">
            <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 tracking-tight whitespace-nowrap">4 Agents</div>
            <p className="text-xs text-slate-400 font-sans mt-1">Orchestrated worker pipeline</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0F172A]/70 border border-[#1E293B] flex flex-col justify-between">
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 tracking-tight whitespace-nowrap">AST + SAST</div>
            <p className="text-xs text-slate-400 font-sans mt-1">Deterministic parsing before LLM call</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0F172A]/70 border border-[#1E293B] flex flex-col justify-between">
            <div className="text-base sm:text-lg lg:text-xl font-bold font-mono text-amber-400 tracking-tight whitespace-nowrap">Zero Hallucination</div>
            <p className="text-xs text-slate-400 font-sans mt-1">Ground-truth code refactoring diffs</p>
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 3. The 4 Autonomous Agents Section                        */}
      {/* ========================================================= */}
      <section id="agents" className="px-6 py-16 border-t border-[#1E293B] bg-[#090D16]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-violet-400 mb-2">
              Autonomous Architecture
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              The 4 Specialized AI Worker Agents
            </h3>
            <p className="text-sm text-slate-400 mt-2 font-sans">
              Instead of one monolithic AI, specialized agents collaborate through a central coordinator using the Orchestrator-Worker pattern.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {agents.map((agent, idx) => {
              const Icon = agent.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-6 bg-[#0F172A]/75 border border-[#1E293B] hover:border-slate-700 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                        {agent.badge}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white font-sans">
                      {agent.name}
                    </h4>
                    <span className="text-xs font-mono text-violet-400 block mb-2">
                      {agent.alias}
                    </span>

                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {agent.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center text-[11px] font-mono text-slate-500">
                    <span>Autonomous Worker #{idx + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. Comparison Table (The Gap in Existing Tools)           */}
      {/* ========================================================= */}
      <section id="comparison" className="px-6 py-16 border-t border-[#1E293B] bg-[#090D16]">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
              The Industry Gap
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              Traditional Static Analysis vs. AI Technical Debt Inspector
            </h3>
            <p className="text-sm text-slate-400 mt-2 font-sans">
              Why traditional rule-based tools and manual code reviews leave developers with alert fatigue.
            </p>
          </div>

          <div className="rounded-2xl border border-[#1E293B] bg-[#0F172A]/80 overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1E293B]">
              
              {/* Feature column */}
              <div className="p-6 bg-[#090D16]/50">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-4">
                  Feature / Capability
                </span>
                <ul className="space-y-4 text-xs font-medium text-slate-300">
                  <li className="py-1">Detection Logic</li>
                  <li className="py-1">Intent Comprehension</li>
                  <li className="py-1">Actionable Resolution</li>
                  <li className="py-1">Duplication Detection</li>
                  <li className="py-1">False Positives</li>
                  <li className="py-1">Autonomous Pull Requests</li>
                </ul>
              </div>

              {/* Traditional Tools */}
              <div className="p-6 bg-[#090D16]/30">
                <span className="text-xs font-mono uppercase tracking-wider text-rose-400 block mb-4 flex items-center gap-1.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Present Technical Debt Tools Available</span>
                </span>
                <ul className="space-y-4 text-xs text-slate-400">
                  <li className="py-1">Rigid regex pattern matching</li>
                  <li className="py-1">None (Flags without context)</li>
                  <li className="py-1">Manual rewrite required</li>
                  <li className="py-1">Exact text matching only</li>
                  <li className="py-1">High (causes alert fatigue)</li>
                  <li className="py-1 text-rose-400">Not supported</li>
                </ul>
              </div>

              {/* AI Technical Debt Inspector */}
              <div className="p-6 bg-violet-950/20 border-l border-violet-500/20">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-4 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>AI Technical Debt Inspector</span>
                </span>
                <ul className="space-y-4 text-xs text-slate-200">
                  <li className="py-1 text-emerald-300">AST parsing + LLM reasoning</li>
                  <li className="py-1 text-emerald-300">Plain-English intent summary</li>
                  <li className="py-1 text-emerald-300">Generates clean refactored code</li>
                  <li className="py-1 text-emerald-300">Semantic pgvector embeddings</li>
                  <li className="py-1 text-emerald-300">Minimized by context validation</li>
                  <li className="py-1 text-emerald-300 font-bold">1-Click Automated PR generation</li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. Interactive Teaser & CTA                               */}
      {/* ========================================================= */}
      <section className="px-6 py-20 border-t border-[#1E293B] bg-gradient-to-b from-[#090D16] to-[#0F172A] text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Ready to inspect your codebase?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl font-sans">
            Connect any repository or explore the built-in Express & PostgreSQL monolithic debt benchmark.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onOpenSignup}
              className="px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-xl shadow-violet-900/40 transition-all flex items-center gap-2"
            >
              <span>Sign Up for Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenLogin}
              className="px-6 py-3 rounded-xl font-semibold text-sm text-slate-300 hover:text-white bg-[#090D16] hover:bg-slate-800 border border-[#1E293B] transition-all"
            >
              <span>Existing Developer Log In</span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. Professional Footer                                    */}
      {/* ========================================================= */}
      <footer className="border-t border-[#1E293B] bg-[#090D16] py-8 px-6 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">AI Technical Debt Inspector</span>
            <span>•</span>
            <span>Autonomous Multi-Agent Platform</span>
          </div>

          <div>
            <span>© 2026. All rights reserved.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

