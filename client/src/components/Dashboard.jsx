import React from 'react';
import IngestionBar from './IngestionBar';
import AgentStatusGrid from './AgentStatusGrid';
import MetricGauges from './MetricGauges';
import ComprehensionSummary from './ComprehensionSummary';
import CodeDiffViewer from './CodeDiffViewer';
import DependencyGraph from './DependencyGraph';

export default function Dashboard({
  repoUrl,
  setRepoUrl,
  branch,
  setBranch,
  onStartScan,
  isScanning,
  onLoadDemo,
  activeStep,
  scanResults
}) {
  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Entry Gateway: Ingestion Bar */}
      <IngestionBar
        repoUrl={repoUrl}
        setRepoUrl={setRepoUrl}
        branch={branch}
        setBranch={setBranch}
        onStartScan={onStartScan}
        isScanning={isScanning}
        onLoadDemo={onLoadDemo}
      />

      {/* Neon Agent Status Indicators (4 Workers) */}
      <AgentStatusGrid activeStep={activeStep} scanResults={scanResults} />

      {/* Minimalist Circular SVG Data Gauges & Telemetry */}
      <MetricGauges results={scanResults} />

      {/* Code Comprehension Engine & Step-by-Step Remediation Plan */}
      <ComprehensionSummary results={scanResults} />

      {/* Monaco-Style Comparative Code Diff View */}
      <CodeDiffViewer diffData={scanResults?.codeDiff} />

      {/* Interactive Dependency Graph Visualizer */}
      <DependencyGraph />

      {/* Clean Sleek Footer (College group text completely removed) */}
      <footer className="border-t border-slate-900/80 bg-[#090D16] py-6 text-center text-xs text-slate-500 font-mono">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>AI Technical Debt Inspector • Automated Multi-Agent Code Remediation</span>
          <span>© 2026. Enterprise Code Quality Platform.</span>
        </div>
      </footer>

    </main>
  );
}

