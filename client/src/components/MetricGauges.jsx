import React from 'react';
import { Activity, Flame, Clock, ShieldAlert, AlertTriangle } from 'lucide-react';

// Reusable Circular SVG Gauge Component with glowing gradient fills
function CircularGauge({ value, max = 100, label, sublabel, colorScheme = 'violet', unit = '' }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(value, max) / max) * circumference;

  const gradientId = `gauge-gradient-${label.replace(/\s+/g, '-').toLowerCase()}`;

  // Gradients for colors
  let startColor = '#8B5CF6';
  let endColor = '#06B6D4';
  let glowColor = 'rgba(139, 92, 246, 0.4)';

  if (colorScheme === 'emerald') {
    startColor = '#10B981';
    endColor = '#34D399';
    glowColor = 'rgba(16, 185, 129, 0.4)';
  } else if (colorScheme === 'amber') {
    startColor = '#F59E0B';
    endColor = '#EF4444';
    glowColor = 'rgba(245, 158, 11, 0.4)';
  } else if (colorScheme === 'rose') {
    startColor = '#F43F5E';
    endColor = '#FB7185';
    glowColor = 'rgba(244, 63, 94, 0.4)';
  }

  return (
    <div className="flex flex-col items-center justify-center p-3 relative">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={startColor} />
              <stop offset="100%" stopColor={endColor} />
            </linearGradient>
            <filter id={`glow-${gradientId}`}>
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={startColor} floodOpacity="0.6"/>
            </filter>
          </defs>

          {/* Background Track Ring */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="#1E293B"
            strokeWidth="9"
            fill="transparent"
            strokeLinecap="round"
          />

          {/* Glowing Animated Gradient Ring */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={`url(#${gradientId})`}
            strokeWidth="9"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{ filter: `drop-shadow(0 0 6px ${glowColor})` }}
          />
        </svg>

        {/* Center Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-extrabold tracking-tight text-white font-sans">
            {value}<span className="text-xs font-mono font-normal text-slate-400">{unit}</span>
          </span>
          <span className="text-[10px] uppercase font-mono text-slate-400">
            {sublabel}
          </span>
        </div>
      </div>

      <span className="text-xs font-semibold text-slate-200 mt-2 font-sans tracking-tight text-center">
        {label}
      </span>
    </div>
  );
}

export default function MetricGauges({ results }) {
  const health = results?.codeHealthIndex ?? 42;
  const complexity = results?.cyclomaticComplexityAvg ?? 16.4;
  const debtHours = results?.technicalDebtHours ?? 36.5;

  return (
    <div className="glass-panel rounded-2xl p-6 border border-[#1E293B] relative">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-sans">
            <Activity className="w-4 h-4 text-cyan-400" />
            Code Health Index & Telemetry Gauges
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Deterministic AST metrics evaluated against clean architecture baselines.
          </p>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 font-mono font-medium">
          Status: High Technical Debt
        </span>
      </div>

      {/* Grid of Minimalist SVG Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        
        {/* Health Index Ring */}
        <div className="bg-[#090D16]/60 rounded-xl p-2 border border-slate-800/80">
          <CircularGauge
            value={health}
            max={100}
            unit="/100"
            label="Code Health Index"
            sublabel="Health Rating"
            colorScheme={health > 70 ? 'emerald' : health > 50 ? 'amber' : 'rose'}
          />
        </div>

        {/* Cyclomatic Complexity Ring */}
        <div className="bg-[#090D16]/60 rounded-xl p-2 border border-slate-800/80">
          <CircularGauge
            value={complexity}
            max={30}
            unit=" avg"
            label="Cyclomatic Complexity"
            sublabel="Branch Density"
            colorScheme="amber"
          />
        </div>

        {/* Estimated Debt Payoff Time */}
        <div className="bg-[#090D16]/60 rounded-xl p-4 border border-slate-800/80 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Estimated Remediation</span>
            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="my-2">
            <div className="text-3xl font-extrabold text-white font-sans tracking-tight">
              {debtHours} <span className="text-sm font-mono text-violet-400">hours</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Estimated engineering time saved through automated AI refactoring.
            </p>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-violet-500 to-cyan-500 h-full rounded-full w-3/4 animate-pulse"></div>
          </div>
        </div>

        {/* Security & Smells Breakdown */}
        <div className="bg-[#090D16]/60 rounded-xl p-4 border border-slate-800/80 flex flex-col justify-between h-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Flaw Breakdown</span>
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 my-2 text-center">
            <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-800/40">
              <span className="text-lg font-bold text-rose-400 font-mono">3</span>
              <p className="text-[10px] font-mono text-slate-400 uppercase">Critical</p>
            </div>
            <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-800/40">
              <span className="text-lg font-bold text-amber-400 font-mono">5</span>
              <p className="text-[10px] font-mono text-slate-400 uppercase">Warning</p>
            </div>
            <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40">
              <span className="text-lg font-bold text-cyan-400 font-mono">2</span>
              <p className="text-[10px] font-mono text-slate-400 uppercase">Info</p>
            </div>
          </div>

          <span className="text-[11px] text-slate-400 font-mono">
            OWASP Top 10 • CWE-89 • CWE-798
          </span>
        </div>

      </div>
    </div>
  );
}

