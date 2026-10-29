import React from 'react';
import { GitBranch, Github, Play, Sparkles, Code2, RefreshCw, FolderGit2 } from 'lucide-react';

export default function IngestionBar({ 
  repoUrl, 
  setRepoUrl, 
  branch, 
  setBranch, 
  onStartScan, 
  isScanning, 
  onLoadDemo,
  activeTab,
  setActiveTab
}) {
  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden border border-[#1E293B]">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col gap-5">
        
        {/* Top Header & Ingestion Mode Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-violet-400" />
              Repository Ingestion & Analysis Gateway
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Specify a codebase or load a legacy monolith to trigger the 4 autonomous worker agents.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLoadDemo}
              disabled={isScanning}
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 transition-all flex items-center gap-1.5 hover:border-violet-500/50"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Load Monolith Benchmark Demo</span>
            </button>
          </div>
        </div>

        {/* Input Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Repo URL Input */}
          <div className="md:col-span-8 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Github className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/organization/target-repository"
              disabled={isScanning}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#090D16]/90 border border-[#1E293B] text-slate-100 placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors"
            />
          </div>

          {/* Branch Selector */}
          <div className="md:col-span-2 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <GitBranch className="w-4 h-4 text-slate-400" />
            </div>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              disabled={isScanning}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#090D16]/90 border border-[#1E293B] text-slate-200 text-sm font-mono focus:outline-none focus:border-violet-500 transition-colors appearance-none cursor-pointer"
            >
              <option value="main">main</option>
              <option value="master">master</option>
              <option value="develop">develop</option>
              <option value="feature/auth">feature/auth</option>
            </select>
          </div>

          {/* CTA Trigger Button */}
          <div className="md:col-span-2">
            <button
              onClick={onStartScan}
              disabled={isScanning}
              className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                isScanning
                  ? 'bg-violet-700/50 text-violet-200 cursor-not-allowed border border-violet-500/30'
                  : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-violet-900/40 hover:shadow-violet-600/30 border border-violet-400/40 active:scale-[0.98]'
              }`}
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-violet-200" />
                  <span>Agents Active...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Inspect Debt</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Informative quick hints */}
        <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Trigger: Webhook / CLI / UI Gateway
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            Parser: Tree-sitter Multi-AST
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
            Autonomous PR Dispatch: Ready
          </span>
        </div>

      </div>
    </div>
  );
}

