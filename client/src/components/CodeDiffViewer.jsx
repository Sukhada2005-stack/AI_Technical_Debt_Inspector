import React, { useState } from 'react';
import { GitCompare, Copy, Check, GitPullRequest, ExternalLink, Code2 } from 'lucide-react';

export default function CodeDiffViewer({ diffData }) {
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [copiedRefactored, setCopiedRefactored] = useState(false);
  const [prCreated, setPrCreated] = useState(false);

  const originalCode = diffData?.originalCode || '';
  const refactoredCode = diffData?.refactoredCode || '';
  const fileName = diffData?.fileName || 'routes/auth.js → src/modules/auth/*';

  const copyToClipboard = (text, isOriginal) => {
    navigator.clipboard.writeText(text);
    if (isOriginal) {
      setCopiedOriginal(true);
      setTimeout(() => setCopiedOriginal(false), 2000);
    } else {
      setCopiedRefactored(true);
      setTimeout(() => setCopiedRefactored(false), 2000);
    }
  };

  const handleCreatePR = () => {
    setPrCreated(true);
    setTimeout(() => setPrCreated(false), 4000);
  };

  // Helper to render code with line numbers and simple syntax highlighting
  const renderCodeWithLines = (codeStr, isDebt = false) => {
    const lines = codeStr.split('\n');
    return (
      <div className="font-mono text-xs leading-relaxed overflow-x-auto py-2">
        {lines.map((line, idx) => {
          const lineNum = idx + 1;
          const isVulnerable = isDebt && (
            line.includes('super_secret_db_password') || 
            line.includes('SELECT * FROM users WHERE email') || 
            line.includes('INSERT INTO users')
          );

          return (
            <div 
              key={idx} 
              className={`flex items-start px-3 py-0.5 group hover:bg-slate-800/40 ${
                isVulnerable ? 'bg-rose-950/40 border-l-2 border-rose-500 text-rose-200' : ''
              }`}
            >
              <span className="w-8 shrink-0 text-slate-600 select-none text-right pr-3 font-mono text-[11px]">
                {lineNum}
              </span>
              <pre className="font-mono whitespace-pre flex-1 text-slate-300">
                {line}
              </pre>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div id="diff-viewer" className="glass-panel rounded-2xl border border-[#1E293B] overflow-hidden">
      
      {/* Top Header Bar */}
      <div className="px-6 py-4 bg-[#090D16]/80 border-b border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/30">
            <GitCompare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white font-sans">
                Monaco Comparative Code Diff
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                {fileName}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Synthesized by Refactoring Planner • Isolated Controller-Service Pattern
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCreatePR}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md ${
              prCreated 
                ? 'bg-emerald-600 text-white shadow-emerald-900/40' 
                : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-900/40 border border-violet-400/30'
            }`}
          >
            {prCreated ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Pull Request #42 Created!</span>
              </>
            ) : (
              <>
                <GitPullRequest className="w-3.5 h-3.5" />
                <span>Create Autonomous PR</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Side-by-Side Monaco Comparative Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#1E293B]">
        
        {/* Left Side: Original Debt Code */}
        <div className="flex flex-col bg-[#090D16]/95">
          <div className="px-4 py-2.5 bg-rose-950/20 border-b border-[#1E293B] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span className="text-xs font-mono font-semibold text-rose-300">
                Original Debt Code (God Class & Insecure)
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(originalCode, true)}
              className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 hover:underline"
            >
              {copiedOriginal ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedOriginal ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="h-[460px] overflow-y-auto bg-[#090D16]">
            {renderCodeWithLines(originalCode, true)}
          </div>
        </div>

        {/* Right Side: Refactored Modular Code */}
        <div className="flex flex-col bg-[#090D16]/95">
          <div className="px-4 py-2.5 bg-emerald-950/20 border-b border-[#1E293B] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-mono font-semibold text-emerald-300">
                Refactored Modular Code (Clean Architecture)
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(refactoredCode, false)}
              className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1 hover:underline"
            >
              {copiedRefactored ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedRefactored ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="h-[460px] overflow-y-auto bg-[#090D16]">
            {renderCodeWithLines(refactoredCode, false)}
          </div>
        </div>

      </div>

      {/* Footer Info */}
      <div className="px-6 py-2.5 bg-[#0F172A]/80 border-t border-[#1E293B] flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          Red highlights: CWE-89 injection & CWE-798 credential leakage
        </span>
        <span className="text-emerald-400 font-semibold">
          Result: Zero regressions, parameterized DB pool, 86% complexity reduction
        </span>
      </div>

    </div>
  );
}

