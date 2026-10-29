import React from 'react';
import { Terminal, GitPullRequest, LogOut, User } from 'lucide-react';

export default function Navbar({ currentUser, onLogout, onBackToLanding }) {
  return (
    <header className="sticky top-0 z-50 border-b border-canvas-border bg-[#090D16]/90 backdrop-blur-md px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={onBackToLanding}
          title="Return to Landing Page"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-700 to-cyan-500 shadow-lg shadow-violet-900/30 border border-violet-500/30">
            <Terminal className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base tracking-tight text-white font-sans">
                AI Technical Debt <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Inspector</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/30">
                MULTI-AGENT V1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Orchestrated AST • SAST • LLM Comprehension
            </p>
          </div>
        </div>

        {/* Right Action / Status Info */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#0F172A] border border-canvas-border text-xs text-slate-300 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Orchestrator: <strong className="text-emerald-400">Online</strong></span>
          </div>

          <a 
            href="#diff-viewer" 
            className="flex items-center space-x-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-canvas-border hover:border-slate-700 transition-colors bg-[#0F172A]/50 font-sans"
          >
            <GitPullRequest className="w-3.5 h-3.5 text-violet-400" />
            <span>PR Review</span>
          </a>

          <div className="hidden md:flex items-center space-x-1 text-xs text-slate-400 border-l border-slate-800 pl-4 font-mono">
            <span className="text-[11px] text-slate-400">Model: Gemini 1.5 Pro</span>
          </div>

          {/* User profile / Logout */}
          {currentUser ? (
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
              <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/30 text-xs text-violet-300 font-mono">
                <User className="w-3.5 h-3.5 text-violet-400" />
                <span className="max-w-[100px] truncate">{currentUser.firstName || 'Developer'}</span>
              </div>
              <button
                onClick={onLogout}
                title="Log Out to Landing Page"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onBackToLanding}
              className="text-xs font-mono text-slate-400 hover:text-slate-200 px-2 py-1 rounded bg-slate-900 border border-slate-800"
            >
              Exit to Home
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
