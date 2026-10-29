import React, { useState } from 'react';
import { Network, GitFork, AlertOctagon, CheckCircle2, Info } from 'lucide-react';

export default function DependencyGraph({ graphData }) {
  const [selectedNode, setSelectedNode] = useState(graphData?.nodes?.[0] || null);

  const nodes = graphData?.nodes || [
    { id: '1', label: 'routes/auth.js', type: 'debt', complexity: 'High (18.2)', incoming: 8, outgoing: 12, x: 260, y: 150 },
    { id: '2', label: 'config/db.js', type: 'healthy', complexity: 'Low (1.1)', incoming: 2, outgoing: 1, x: 100, y: 60 },
    { id: '3', label: 'services/token.js', type: 'healthy', complexity: 'Low (2.0)', incoming: 1, outgoing: 2, x: 420, y: 60 },
    { id: '4', label: 'models/user.js', type: 'debt', complexity: 'Medium (6.5)', incoming: 5, outgoing: 6, x: 100, y: 260 },
    { id: '5', label: 'utils/email.js', type: 'healthy', complexity: 'Low (1.4)', incoming: 1, outgoing: 0, x: 420, y: 260 },
    { id: '6', label: 'middleware/auth.js', type: 'debt', complexity: 'Medium (5.0)', incoming: 4, outgoing: 3, x: 260, y: 310 }
  ];

  // Helper positions for static display
  const nodePositions = {
    '1': { x: 300, y: 150 },
    '2': { x: 110, y: 70 },
    '3': { x: 490, y: 70 },
    '4': { x: 110, y: 250 },
    '5': { x: 490, y: 250 },
    '6': { x: 300, y: 310 }
  };

  const edges = graphData?.edges || [
    { source: '1', target: '2', type: 'tightly-coupled', label: 'raw query' },
    { source: '1', target: '3', type: 'tightly-coupled', label: 'sync token' },
    { source: '1', target: '4', type: 'tightly-coupled', label: 'direct mutation' },
    { source: '1', target: '5', type: 'healthy', label: 'async dispatch' },
    { source: '6', target: '1', type: 'tightly-coupled', label: 'circular leak' }
  ];

  return (
    <div className="glass-panel rounded-2xl border border-[#1E293B] p-6 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-sans flex items-center gap-2">
              <span>Interactive Dependency & Coupling Graph</span>
              <span className="text-xs font-mono text-slate-400">({nodes.length} Nodes • {edges.length} Vectors)</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              AST import tree visualizer showing architectural coupling and God Class bottlenecks.
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-rose-500"></span>
            <span className="text-rose-400">Tight Coupling / God Class</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-emerald-500"></span>
            <span className="text-emerald-400">Healthy Imports</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 items-center">
        
        {/* SVG Network Graph Canvas */}
        <div className="lg:col-span-8 bg-[#090D16]/90 rounded-xl border border-slate-800/80 p-2 relative h-[360px] overflow-hidden flex items-center justify-center">
          
          <svg className="w-full h-full" viewBox="0 0 600 360">
            <defs>
              {/* Marker for red arrows */}
              <marker id="arrow-red" markerWidth="8" markerHeight="8" refX="16" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#EF4444" />
              </marker>
              {/* Marker for green arrows */}
              <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="16" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#10B981" />
              </marker>
            </defs>

            {/* Connection Vectors / Edges */}
            {edges.map((edge, idx) => {
              const src = nodePositions[edge.source] || { x: 300, y: 150 };
              const dst = nodePositions[edge.target] || { x: 100, y: 100 };
              const isTightlyCoupled = edge.type === 'tightly-coupled';
              const strokeColor = isTightlyCoupled ? '#EF4444' : '#10B981';
              const strokeDash = isTightlyCoupled ? '4,4' : 'none';

              // Midpoint for vector label
              const midX = (src.x + dst.x) / 2;
              const midY = (src.y + dst.y) / 2;

              return (
                <g key={idx}>
                  <line
                    x1={src.x}
                    y1={src.y}
                    x2={dst.x}
                    y2={dst.y}
                    stroke={strokeColor}
                    strokeWidth={isTightlyCoupled ? 2 : 1.5}
                    strokeDasharray={strokeDash}
                    markerEnd={`url(#${isTightlyCoupled ? 'arrow-red' : 'arrow-green'})`}
                    className="transition-all opacity-80 hover:opacity-100"
                  />
                  <text
                    x={midX}
                    y={midY - 4}
                    fill={isTightlyCoupled ? '#FCA5A5' : '#6EE7B7'}
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="select-none bg-[#090D16] px-1"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {/* Translucent Dark Nodes */}
            {nodes.map((node) => {
              const pos = nodePositions[node.id] || { x: 300, y: 150 };
              const isSelected = selectedNode?.id === node.id;
              const isDebt = node.type === 'debt';
              const borderColor = isDebt ? '#EF4444' : '#10B981';
              const glowColor = isDebt ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)';

              return (
                <g 
                  key={node.id} 
                  transform={`translate(${pos.x - 70}, ${pos.y - 25})`}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer"
                >
                  {/* Node Background */}
                  <rect
                    width="140"
                    height="50"
                    rx="10"
                    fill="rgba(15, 23, 42, 0.85)"
                    stroke={borderColor}
                    strokeWidth={isSelected ? 2.5 : 1.2}
                    style={{
                      filter: isSelected ? `drop-shadow(0 0 10px ${glowColor})` : undefined
                    }}
                    className="transition-all hover:fill-slate-800"
                  />

                  {/* Indicator Dot */}
                  <circle
                    cx="15"
                    cy="25"
                    r="4"
                    fill={borderColor}
                  />

                  {/* Node Title */}
                  <text
                    x="26"
                    y="22"
                    fill="#F8FAFC"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="600"
                  >
                    {node.label.length > 15 ? node.label.substring(0, 14) + '…' : node.label}
                  </text>

                  {/* Subtitle / Metrics */}
                  <text
                    x="26"
                    y="37"
                    fill={isDebt ? '#F87171' : '#34D399'}
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {isDebt ? '⚠ God Component' : '✓ Clean Module'}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Interactive Hint */}
          <div className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-500 bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
            Click any node to inspect coupling
          </div>
        </div>

        {/* Selected Node Details Card */}
        <div className="lg:col-span-4 bg-[#090D16]/90 rounded-xl border border-slate-800/80 p-4 h-[360px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <span className="text-xs font-mono uppercase text-slate-400">Node Inspection</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                selectedNode?.type === 'debt' 
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' 
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              }`}>
                {selectedNode?.type === 'debt' ? 'High Coupling Debt' : 'Modular Standard'}
              </span>
            </div>

            <h4 className="text-base font-bold text-white font-mono mb-1">
              {selectedNode?.label || 'routes/auth.js'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {selectedNode?.type === 'debt' 
                ? 'Monolithic node with excessive incoming dependencies and direct database client entanglement. Violates Single Responsibility Principle.' 
                : 'Isolated module adhering to loose coupling and clean boundaries.'}
            </p>

            {/* In/Out Metrics */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-lg font-bold text-white font-mono">
                  {selectedNode?.incoming ?? 8}
                </span>
                <p className="text-[10px] font-mono text-slate-400 uppercase">Incoming Imports</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-lg font-bold text-white font-mono">
                  {selectedNode?.outgoing ?? 12}
                </span>
                <p className="text-[10px] font-mono text-slate-400 uppercase">Outgoing Calls</p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Cyclomatic Index:</span>
                <span className="text-amber-400 font-bold">{selectedNode?.complexity ?? '18.2 (Spike)'}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Refactoring Planner suggests extracting into 3 sub-services.</span>
          </div>
        </div>

      </div>
    </div>
  );
}

