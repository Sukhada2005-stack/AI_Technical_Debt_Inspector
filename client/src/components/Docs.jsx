import React, { useState } from 'react';
import { 
  Terminal, 
  ArrowLeft, 
  BookOpen, 
  Layers, 
  ChevronRight 
} from 'lucide-react';

export default function Docs({ onBackToLanding, onOpenLogin, onOpenSignup }) {
  const [activeSection, setActiveSection] = useState('overview');

  const navSections = [
    { id: 'overview', title: 'System Overview' },
    { id: 'agents', title: '4 Autonomous Agents' }
  ];

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans">
      
      {/* ========================================================= */}
      {/* 1. Docs Navigation Bar                                     */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 border-b border-[#1E293B] bg-[#090D16]/90 backdrop-blur-md px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand & Back Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToLanding}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-[#0F172A] text-xs font-mono text-slate-300 hover:text-white transition-colors"
              title="Return to Landing Page"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-violet-400" />
              <span>Back</span>
            </button>

            <div 
              onClick={onBackToLanding}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 via-indigo-700 to-cyan-500 shadow-md border border-violet-500/30">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm tracking-tight text-white font-sans">
                  AI Technical Debt <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Inspector</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/30">
                  DOCS v1.0
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenLogin}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              Log In
            </button>
            <button
              onClick={onOpenSignup}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-violet-900/30 transition-all border border-violet-400/20"
            >
              Get Started
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. Main Documentation Layout                               */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col md:flex-row px-4 sm:px-6 lg:px-8 py-8 gap-8">
        
        {/* Sticky Table of Contents */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="p-4 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-violet-400 mb-3 uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Documentation</span>
              </div>

              <nav className="space-y-1 text-xs font-mono">
                {navSections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setActiveSection(sec.id)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${
                      activeSection === sec.id
                        ? 'bg-violet-600/20 text-violet-300 border border-violet-500/40 font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    <span>{sec.title}</span>
                    {activeSection === sec.id && (
                      <ChevronRight className="w-3.5 h-3.5 text-violet-400" />
                    )}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Documentation Content */}
        <main className="flex-1 space-y-12 min-w-0">
          
          {/* Section 1: Overview */}
          <section id="overview" className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <Layers className="w-3.5 h-3.5" />
              <span>Architecture Specification</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              AI Technical Debt Inspector
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              The AI Technical Debt Inspector is a multi-agent autonomous engineering platform designed to eliminate architectural decay, cyclomatic complexity spikes, and security vulnerabilities in legacy codebases. Unlike traditional static linters, it combines Tree-sitter Abstract Syntax Trees (AST), Static Application Security Testing (SAST), and LLM intent comprehension to synthesize ready-to-merge refactored Pull Requests.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B]">
                <div className="text-lg font-bold font-mono text-emerald-400">Zero Hallucination</div>
                <p className="text-xs text-slate-400 font-sans mt-1">Every code recommendation is grounded against verified Tree-sitter parse trees.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B]">
                <div className="text-lg font-bold font-mono text-cyan-400">Deterministic SAST</div>
                <p className="text-xs text-slate-400 font-sans mt-1">Mathematical cyclomatic complexity calculations evaluated prior to LLM generation.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B]">
                <div className="text-lg font-bold font-mono text-violet-400">Autonomous PRs</div>
                <p className="text-xs text-slate-400 font-sans mt-1">Auto-dispatches clean architecture modular diffs directly into your GitHub repository.</p>
              </div>
            </div>
          </section>

          {/* Section 2: 4 Autonomous Agents */}
          <section id="agents" className="space-y-6 pt-4 border-t border-[#1E293B]">
            <div>
              <h2 className="text-2xl font-bold text-white font-sans">
                The 4 Autonomous Worker Agents
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
                An Orchestrator-Worker architecture sharing a synchronized Blackboard State.
              </p>
            </div>

            <div className="space-y-4">
              
              {/* Agent 1 */}
              <div className="p-5 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-sm font-bold text-white font-mono">1. Repository Scanner Agent</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    AST Ingestion
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Crawls the repository tree, constructs language-specific Abstract Syntax Trees using Tree-sitter, indexes dependency imports, and maps functional call graphs into vector embeddings for semantic retrieval.
                </p>
                <div className="text-[11px] font-mono text-slate-400 bg-[#090D16] p-2.5 rounded-lg border border-slate-800">
                  <code className="text-emerald-300">Parser:</code> Multi-AST Tree-sitter • <code className="text-emerald-300">Graph:</code> Cytoscape Dependency Matrix
                </div>
              </div>

              {/* Agent 2 */}
              <div className="p-5 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                    <span className="text-sm font-bold text-white font-mono">2. Static Analysis Agent</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    SAST & Complexity
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Calculates cyclomatic complexity across branch decision nodes ($M = E - N + 2P$). Identifies monolithic "God Classes" exceeding 300 lines of procedural handlers, DRY code duplications, and dead execution paths.
                </p>
                <div className="text-[11px] font-mono text-slate-400 bg-[#090D16] p-2.5 rounded-lg border border-slate-800">
                  <code className="text-cyan-300">Target Metrics:</code> Cyclomatic Complexity &gt; 15 • DRY Duplication &gt; 12% • God Methods &gt; 250 LOC
                </div>
              </div>

              {/* Agent 3 */}
              <div className="p-5 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="text-sm font-bold text-white font-mono">3. Security Guard Agent</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    CWE Vulnerabilities
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Scans AST string literals and concatenation patterns for CWE-89 SQL Injection vectors, hardcoded JWT secrets, plaintext database credentials, and unpinned vulnerable dependency manifests.
                </p>
                <div className="text-[11px] font-mono text-slate-400 bg-[#090D16] p-2.5 rounded-lg border border-slate-800">
                  <code className="text-amber-300">Rules:</code> CWE-89 (SQLi) • CWE-798 (Hardcoded Credentials) • CWE-327 (Weak Crypto)
                </div>
              </div>

              {/* Agent 4 */}
              <div className="p-5 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-violet-400"></span>
                    <span className="text-sm font-bold text-white font-mono">4. Refactoring Planner Agent</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/30">
                    PR Synthesis
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Synthesizes high-level comprehension models to decouple monolithic routes into Clean Architecture (Controller-Service-Repository patterns), generating side-by-side Monaco diffs and production pull requests.
                </p>
                <div className="text-[11px] font-mono text-slate-400 bg-[#090D16] p-2.5 rounded-lg border border-slate-800">
                  <code className="text-violet-300">Output:</code> Modular Clean Architecture • Parameterized Queries • Automated GitHub PR
                </div>
              </div>

            </div>
          </section>

        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#1E293B] bg-[#090D16] py-6 px-6 text-center text-xs font-mono text-slate-500">
        AI Technical Debt Inspector • Multi-Agent Autonomous Code Quality Documentation
      </footer>

    </div>
  );
}
