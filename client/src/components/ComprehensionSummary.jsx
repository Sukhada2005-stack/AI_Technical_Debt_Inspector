import React from 'react';
import { Sparkles, BrainCircuit, CheckCircle, ArrowRight, ShieldAlert, GitPullRequest } from 'lucide-react';

export default function ComprehensionSummary({ results }) {
  const summary = results?.comprehensionSummary || "The inspected codebase exhibits significant architectural debt...";
  const plan = results?.actionablePlan || [];

  return (
    <div className="glass-panel rounded-2xl p-6 border border-[#1E293B] relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col gap-5">
        
        {/* Title */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/30">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-sans">
                AI Code Comprehension Engine
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Functional intent comprehension generated prior to autonomous refactoring.
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-violet-500/10 text-violet-300 border border-violet-500/30">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            Intent Verified
          </span>
        </div>

        {/* The Plain-English Explanation Box */}
        <div className="bg-[#090D16]/90 rounded-xl p-4 border border-violet-500/20 relative">
          <div className="flex items-start gap-3">
            <span className="text-lg">🤖</span>
            <div className="space-y-1">
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-violet-400">
                Senior Developer Assessment:
              </span>
              <p className="text-sm text-slate-200 leading-relaxed font-sans">
                {summary}
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Remediation Plan */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <span>Actionable Refactoring Roadmap</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              4 Steps
            </span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {plan.map((item) => (
              <div 
                key={item.step} 
                className="p-3.5 rounded-xl bg-[#090D16]/60 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-violet-400">
                    Step 0{item.step}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {item.impact}
                  </span>
                </div>
                <h5 className="text-sm font-semibold text-white mb-1">
                  {item.title}
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

