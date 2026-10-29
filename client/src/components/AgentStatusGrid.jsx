import React from 'react';
import { Database, SearchCode, ShieldCheck, Wrench, CheckCircle2, Loader2, Clock } from 'lucide-react';

export default function AgentStatusGrid({ activeStep, scanResults }) {
  const agents = [
    {
      id: 0,
      name: '1. Repository Scanner',
      alias: 'The Fetcher',
      role: 'AST Ingestion & Graph Mapping',
      icon: Database,
      color: 'emerald',
      activeBorder: 'border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.3)]',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      pulseColor: 'bg-emerald-400',
      description: 'Crawling repository structure, parsing Tree-sitter ASTs, and indexing semantic code embeddings in pgvector.'
    },
    {
      id: 1,
      name: '2. Static Analysis Agent',
      alias: 'The Code Reviewer',
      role: 'Complexity & Architectural Debt',
      icon: SearchCode,
      color: 'cyan',
      activeBorder: 'border-cyan-500/80 shadow-[0_0_20px_rgba(6,182,212,0.3)]',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      pulseColor: 'bg-cyan-400',
      description: 'Identifying God Classes, cyclomatic complexity spikes, DRY duplications, and dead code execution paths.'
    },
    {
      id: 2,
      name: '3. Security Agent',
      alias: 'The Guard',
      role: 'Vulnerability & Secret Exposure',
      icon: ShieldCheck,
      color: 'amber',
      activeBorder: 'border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.3)]',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      pulseColor: 'bg-amber-400',
      description: 'Scanning for hardcoded credentials, SQL injection vectors (CWE-89), and CVE dependency vulnerabilities.'
    },
    {
      id: 3,
      name: '4. Refactoring Planner',
      alias: 'The Fixer',
      role: 'Synthesis & PR Generation',
      icon: Wrench,
      color: 'violet',
      activeBorder: 'border-violet-500/80 shadow-[0_0_20px_rgba(139,92,246,0.3)]',
      badgeBg: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
      pulseColor: 'bg-violet-400',
      description: 'Synthesizing comprehension models, generating clean modular diffs, and formatting automated Pull Requests.'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide text-slate-300 uppercase font-sans flex items-center gap-2">
          <span>Multi-Agent Orchestrator Pipeline</span>
          <span className="text-xs font-mono text-slate-500 normal-case">(Orchestrator-Worker Architecture)</span>
        </h3>
        <span className="text-xs font-mono text-slate-400">
          Agent Coordination: <span className="text-violet-400">Central Blackboard State</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agent) => {
          const Icon = agent.icon;
          const isDone = activeStep > agent.id;
          const isActive = activeStep === agent.id;
          const isPending = activeStep < agent.id;

          return (
            <div
              key={agent.id}
              className={`glass-panel rounded-xl p-4 transition-all duration-300 relative overflow-hidden ${
                isActive 
                  ? `${agent.activeBorder} bg-[#0F172A]/90 scale-[1.01]` 
                  : isDone
                  ? 'border-slate-800 bg-[#0F172A]/70'
                  : 'border-slate-800/60 bg-[#0F172A]/40 opacity-70'
              }`}
            >
              {/* Neon Glow Corner accent */}
              {isActive && (
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-xl opacity-20 pointer-events-none ${
                  agent.color === 'emerald' ? 'bg-emerald-400' :
                  agent.color === 'cyan' ? 'bg-cyan-400' :
                  agent.color === 'amber' ? 'bg-amber-400' : 'bg-violet-400'
                }`} />
              )}

              {/* Top row: Agent Icon & Status Indicator */}
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg border ${
                  isActive 
                    ? `${agent.badgeBg}` 
                    : isDone 
                    ? 'bg-slate-800 border-slate-700 text-slate-300' 
                    : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Status Badges */}
                <div>
                  {isActive && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-slate-900 border border-slate-700">
                      <span className={`w-2 h-2 rounded-full ${agent.pulseColor} animate-ping`}></span>
                      <span className={`w-2 h-2 -ml-3.5 rounded-full ${agent.pulseColor}`}></span>
                      <span className="text-white">Active</span>
                    </span>
                  )}
                  {isDone && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Ready</span>
                    </span>
                  )}
                  {isPending && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-slate-900/60 text-slate-500 border border-slate-800">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>Standby</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Agent Titles */}
              <div>
                <h4 className="font-bold text-sm text-white tracking-tight font-sans">
                  {agent.name}
                </h4>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                  {agent.alias} • <span className="text-slate-300">{agent.role}</span>
                </p>
              </div>

              {/* Agent Description / Findings */}
              <p className="text-xs text-slate-400 mt-2.5 leading-relaxed line-clamp-3">
                {agent.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

