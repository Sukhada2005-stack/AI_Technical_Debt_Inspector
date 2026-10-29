import React, { useState } from 'react';
import { 
  Github, 
  GitBranch, 
  FolderGit2, 
  CheckCircle2, 
  ExternalLink, 
  RefreshCw, 
  Search, 
  Sliders, 
  Terminal, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  AlertCircle, 
  Layers, 
  Play, 
  Settings,
  Lock,
  Globe,
  Code2,
  FileCode,
  Sparkles
} from 'lucide-react';

export default function Workspaces({ onLaunchInspect, currentRepoUrl = '' }) {
  // Active Tab
  const [activeTab, setActiveTab] = useState('git-provider'); // 'git-provider' | 'public-repo' | 'existing-image'

  // GitHub Connection State
  const [isGitHubConnected, setIsGitHubConnected] = useState(true);
  const [githubUser, setGithubUser] = useState({
    username: 'sukhadabhalerao',
    displayName: 'Sukhada Bhalerao',
    avatar: 'https://avatars.githubusercontent.com/u/9919?v=4',
    reposCount: 6
  });

  // Permission Scope: 'all' | 'select'
  const [permissionScope, setPermissionScope] = useState('all');

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Repository for Configuration (Render-style drawer/panel)
  const [selectedRepo, setSelectedRepo] = useState(null);

  // Configuration Form State for Selected Repository
  const [branch, setBranch] = useState('main');
  const [rootDir, setRootDir] = useState('server');
  const [buildCommand, setBuildCommand] = useState('npm install');
  const [startCommand, setStartCommand] = useState('npm start');
  const [autoPrEnabled, setAutoPrEnabled] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Initial repositories catalog
  const [repositories, setRepositories] = useState([
    {
      id: 'repo-1',
      name: 'legacy-auth-service',
      fullName: 'acube-ai/legacy-auth-service',
      url: 'https://github.com/acube-ai/legacy-auth-service',
      description: 'Legacy Express & Postgres monolithic auth service with high cyclomatic complexity and embedded SQL.',
      isPrivate: false,
      language: 'JavaScript',
      defaultBranch: 'main',
      branches: ['main', 'staging', 'dev', 'refactor-auth-v2'],
      rootDir: 'routes',
      buildCommand: 'npm install',
      startCommand: 'npm start',
      isConnected: true,
      lastInspected: 'Today, 04:30 AM',
      debtScore: 42,
      debtHours: 36.5,
      grantedInScope: true
    },
    {
      id: 'repo-2',
      name: 'payment-gateway-service',
      fullName: 'sukhadabhalerao/payment-gateway-service',
      url: 'https://github.com/sukhadabhalerao/payment-gateway-service',
      description: 'Distributed payment orchestration service handling Stripe & Razorpay webhooks with idempotency.',
      isPrivate: true,
      language: 'TypeScript',
      defaultBranch: 'main',
      branches: ['main', 'production', 'v1.4-hotfix'],
      rootDir: 'src',
      buildCommand: 'npm run build',
      startCommand: 'node dist/index.js',
      isConnected: false,
      lastInspected: 'Not yet inspected',
      debtScore: null,
      debtHours: null,
      grantedInScope: true
    },
    {
      id: 'repo-3',
      name: 'ai-code-indexer-pipeline',
      fullName: 'acube-ai/ai-code-indexer-pipeline',
      url: 'https://github.com/acube-ai/ai-code-indexer-pipeline',
      description: 'Tree-sitter AST parser worker generating vector embeddings for AST semantic dependency graphs.',
      isPrivate: false,
      language: 'Python',
      defaultBranch: 'master',
      branches: ['master', 'feature/ast-graph'],
      rootDir: 'app',
      buildCommand: 'pip install -r requirements.txt',
      startCommand: 'uvicorn main:app --host 0.0.0.0',
      isConnected: false,
      lastInspected: 'Not yet inspected',
      debtScore: null,
      debtHours: null,
      grantedInScope: false
    },
    {
      id: 'repo-4',
      name: 'react-portfolio-dashboard',
      fullName: 'sukhadabhalerao/react-portfolio-dashboard',
      url: 'https://github.com/sukhadabhalerao/react-portfolio-dashboard',
      description: 'Developer portfolio web application built with React, Vite, and Tailwind CSS.',
      isPrivate: false,
      language: 'JavaScript',
      defaultBranch: 'main',
      branches: ['main', 'preview'],
      rootDir: '/',
      buildCommand: 'npm run build',
      startCommand: 'npm run preview',
      isConnected: true,
      lastInspected: 'Yesterday',
      debtScore: 88,
      debtHours: 4.2,
      grantedInScope: true
    }
  ]);

  // Filter repositories based on search and scope
  const filteredRepos = repositories.filter((repo) => {
    const matchesSearch = 
      repo.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (permissionScope === 'select') {
      return matchesSearch && repo.grantedInScope;
    }
    return matchesSearch;
  });

  // Select repo to open configuration modal
  const handleSelectRepo = (repo) => {
    setSelectedRepo(repo);
    setBranch(repo.defaultBranch || 'main');
    setRootDir(repo.rootDir || 'server');
    setBuildCommand(repo.buildCommand || 'npm install');
    setStartCommand(repo.startCommand || 'npm start');
    setSaveSuccess(false);
  };

  // Toggle granted in scope for 'select' scope mode
  const handleToggleRepoScope = (repoId) => {
    setRepositories((prev) =>
      prev.map((r) => (r.id === repoId ? { ...r, grantedInScope: !r.grantedInScope } : r))
    );
  };

  // Save configuration
  const handleSaveConfig = () => {
    if (!selectedRepo) return;
    setRepositories((prev) =>
      prev.map((r) =>
        r.id === selectedRepo.id
          ? {
              ...r,
              isConnected: true,
              defaultBranch: branch,
              rootDir,
              buildCommand,
              startCommand
            }
          : r
      )
    );
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Launch Inspection in Dashboard
  const handleTriggerInspection = () => {
    if (!selectedRepo) return;
    handleSaveConfig();
    if (onLaunchInspect) {
      onLaunchInspect(selectedRepo.url, branch);
    }
  };

  return (
    <div className="flex-1 bg-[#090D16] text-slate-100 p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#1E293B] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-2">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Git Workspace Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
              Workspaces & Repositories
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0F172A] border border-[#1E293B] text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>GitHub App: <strong className="text-emerald-400">Active</strong></span>
            </div>
          </div>
        </div>

        {/* Render-Style Provider Tabs */}
        <div className="flex items-center gap-2 border-b border-[#1E293B] pb-1 text-xs font-mono">
          <button
            onClick={() => setActiveTab('git-provider')}
            className={`px-4 py-2.5 rounded-t-xl font-semibold transition-all relative ${
              activeTab === 'git-provider'
                ? 'text-violet-400 bg-[#0F172A] border-t border-x border-[#1E293B]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            Git Provider
            {activeTab === 'git-provider' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('public-repo')}
            className={`px-4 py-2.5 rounded-t-xl font-semibold transition-all relative ${
              activeTab === 'public-repo'
                ? 'text-violet-400 bg-[#0F172A] border-t border-x border-[#1E293B]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            Public Git Repository
            {activeTab === 'public-repo' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('existing-image')}
            className={`px-4 py-2.5 rounded-t-xl font-semibold transition-all relative text-slate-500 cursor-not-allowed`}
            title="Container inspection coming soon"
          >
            Existing Image
          </button>
        </div>

        {/* Tab 1: Render-Style Git Provider Section */}
        {activeTab === 'git-provider' && (
          <div className="space-y-6">
            
            {/* Git Provider Connection Box (Render Exact Reference) */}
            <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-xl shadow-black/50">
              <div className="text-center max-w-xl mx-auto mb-6">
                <h2 className="text-lg font-bold text-white font-sans">
                  Connect Git provider
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
                  Connect your Git provider to inspect and refactor from your existing repositories.
                </p>
              </div>

              {/* Provider Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsGitHubConnected(!isGitHubConnected)}
                  className={`px-5 py-3 rounded-xl border flex items-center gap-2.5 text-xs font-semibold font-sans transition-all ${
                    isGitHubConnected
                      ? 'bg-slate-900 border-violet-500/50 text-white shadow-lg shadow-violet-950/40 ring-1 ring-violet-500/30'
                      : 'bg-[#090D16] border-slate-700 hover:border-slate-500 text-slate-200'
                  }`}
                >
                  <Github className="w-4 h-4 text-white" />
                  <span>GitHub</span>
                  {isGitHubConnected && (
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      Connected
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  disabled
                  className="px-5 py-3 rounded-xl border border-slate-800 bg-[#090D16]/50 text-slate-500 text-xs font-semibold font-sans flex items-center gap-2.5 cursor-not-allowed opacity-60"
                  title="GitLab integration coming in v1.1"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path fill="#FC6D26" d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 5.48 2h.06a.43.43 0 0 1 .41.3l2.43 7.51h7.24l2.43-7.51a.43.43 0 0 1 .41-.3h.06a.42.42 0 0 1 .41.16l2.44 7.51 1.22 3.78c.08.26 0 .58-.24.94z"/>
                  </svg>
                  <span>GitLab</span>
                </button>

                <button
                  type="button"
                  disabled
                  className="px-5 py-3 rounded-xl border border-slate-800 bg-[#090D16]/50 text-slate-500 text-xs font-semibold font-sans flex items-center gap-2.5 cursor-not-allowed opacity-60"
                  title="Bitbucket integration coming in v1.1"
                >
                  <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.778 1.213a.768.768 0 0 0-.768.892l3.262 19.81c.084.5.517.868 1.022.873H19.95a.772.772 0 0 0 .77-.646l3.27-20.036a.77.77 0 0 0-.77-.893H.778zM14.52 14.71H9.462L8.27 8.085h7.45l-1.2 6.626z"/>
                  </svg>
                  <span>Bitbucket</span>
                </button>

                <button
                  type="button"
                  disabled
                  className="px-5 py-3 rounded-xl border border-slate-800 bg-[#090D16]/50 text-slate-500 text-xs font-semibold font-sans flex items-center gap-2.5 cursor-not-allowed opacity-60"
                >
                  <FolderGit2 className="w-4 h-4 text-slate-400" />
                  <span>Cursor Origin</span>
                </button>
              </div>

              {/* Connected GitHub Status & Permissions Scope Selector */}
              {isGitHubConnected && (
                <div className="mt-6 pt-6 border-t border-[#1E293B] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#090D16] p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-white font-bold text-sm">
                        {githubUser.displayName[0]}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5">
                          <span>{githubUser.displayName}</span>
                          <span className="text-slate-400 font-mono text-xs">(@{githubUser.username})</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Authorized via AI Inspector GitHub App</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href="https://github.com/settings/installations"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-violet-400 hover:text-violet-300"
                    >
                      <span>Configure on GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Render-Style Permission Scope Section */}
                  <div className="p-4 rounded-xl bg-[#090D16]/80 border border-slate-800 space-y-3">
                    <div className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                      Repository Selection (Permission Scope)
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Option 1: All Repositories */}
                      <label 
                        onClick={() => setPermissionScope('all')}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                          permissionScope === 'all'
                            ? 'bg-violet-600/10 border-violet-500/50 shadow-md ring-1 ring-violet-500/30'
                            : 'bg-[#0F172A]/50 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="scope"
                          checked={permissionScope === 'all'}
                          onChange={() => setPermissionScope('all')}
                          className="mt-0.5 text-violet-600 focus:ring-violet-500"
                        />
                        <div>
                          <div className="text-xs font-semibold text-white font-sans flex items-center gap-1.5">
                            <span>All repositories</span>
                            <span className="text-[10px] font-mono text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded">
                              Render Default
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-sans mt-0.5 leading-relaxed">
                            Grants permission to read, inspect ASTs, and submit automated refactoring PRs across all repositories in your account.
                          </p>
                        </div>
                      </label>

                      {/* Option 2: Only Select Repositories */}
                      <label 
                        onClick={() => setPermissionScope('select')}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                          permissionScope === 'select'
                            ? 'bg-violet-600/10 border-violet-500/50 shadow-md ring-1 ring-violet-500/30'
                            : 'bg-[#0F172A]/50 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="scope"
                          checked={permissionScope === 'select'}
                          onChange={() => setPermissionScope('select')}
                          className="mt-0.5 text-violet-600 focus:ring-violet-500"
                        />
                        <div>
                          <div className="text-xs font-semibold text-white font-sans flex items-center gap-1.5">
                            <span>Only select repositories</span>
                            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                              Custom Scope
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-sans mt-0.5 leading-relaxed">
                            You choose only the specific repository (or repositories) you want AI Inspector to access.
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Notice if 'select' scope is chosen */}
                    {permissionScope === 'select' && (
                      <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-800/40 text-[11px] text-cyan-300 font-mono flex items-center justify-between">
                        <span>Showing only repositories granted in custom scope ({repositories.filter(r => r.grantedInScope).length} of {repositories.length} repos)</span>
                        <span className="text-[10px] text-slate-400">Click checkboxes below to toggle access</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Repositories Search and List */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-sans">
                    Available GitHub Repositories
                  </h3>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {filteredRepos.length} Repos
                  </span>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search repositories..."
                    className="w-full pl-8 pr-4 py-2 rounded-xl bg-[#0F172A] border border-[#1E293B] text-slate-100 placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>

              {/* Repository Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRepos.map((repo) => {
                  const isCurrentActive = currentRepoUrl && currentRepoUrl.includes(repo.name);

                  return (
                    <div
                      key={repo.id}
                      className={`p-5 rounded-2xl bg-[#0F172A] border transition-all flex flex-col justify-between group ${
                        isCurrentActive
                          ? 'border-violet-500/60 shadow-lg shadow-violet-950/30'
                          : 'border-[#1E293B] hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Repo Title Row */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Github className="w-4 h-4 text-slate-300" />
                            <a
                              href={repo.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-bold text-white font-mono hover:text-violet-400 transition-colors flex items-center gap-1.5"
                            >
                              <span>{repo.fullName}</span>
                              <ExternalLink className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {repo.isPrivate ? (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                                <Lock className="w-2.5 h-2.5" /> Private
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                                <Globe className="w-2.5 h-2.5" /> Public
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-400 font-sans line-clamp-2 leading-relaxed">
                          {repo.description}
                        </p>

                        {/* Badges / Tech Specs */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-slate-400">
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                            {repo.language}
                          </span>

                          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                            <GitBranch className="w-3 h-3 text-cyan-400" />
                            {repo.defaultBranch}
                          </span>

                          {repo.debtScore !== null && (
                            <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                              Debt: {repo.debtHours}h ({repo.debtScore}/100)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                        {permissionScope === 'select' && (
                          <label className="flex items-center gap-1.5 text-xs font-mono text-slate-400 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={repo.grantedInScope}
                              onChange={() => handleToggleRepoScope(repo.id)}
                              className="rounded text-violet-600 focus:ring-violet-500"
                            />
                            <span>Granted in Scope</span>
                          </label>
                        )}

                        <div className="flex items-center gap-2 ml-auto">
                          <button
                            type="button"
                            onClick={() => handleSelectRepo(repo)}
                            className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <Settings className="w-3 h-3 text-slate-400" />
                            <span>{repo.isConnected ? 'Configure' : 'Connect'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              handleSelectRepo(repo);
                              if (onLaunchInspect) onLaunchInspect(repo.url, repo.defaultBranch);
                            }}
                            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-violet-950/40 transition-all"
                          >
                            <Play className="w-3 h-3 text-white fill-white" />
                            <span>Inspect</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Public Git Repository URL */}
        {activeTab === 'public-repo' && (
          <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-xl space-y-4 max-w-2xl">
            <h2 className="text-base font-bold text-white font-sans">
              Connect Public Git Repository
            </h2>
            <p className="text-xs text-slate-400 font-sans">
              Directly inspect any open-source GitHub, GitLab, or Bitbucket repository without installing the app.
            </p>

            <div className="space-y-3">
              <label className="block text-xs font-mono font-medium text-slate-300">
                Public Repository Clone URL
              </label>
              <div className="relative">
                <Github className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="https://github.com/owner/repository"
                  defaultValue="https://github.com/acube-ai/legacy-auth-service"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#090D16] border border-[#1E293B] text-slate-100 placeholder-slate-500 text-xs sm:text-sm font-mono focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => onLaunchInspect && onLaunchInspect('https://github.com/acube-ai/legacy-auth-service', 'main')}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-violet-900/40"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Connect & Inspect Repository</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Render-Style Repository Linking & Branch Selection Modal / Drawer */}
      {selectedRepo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 sm:p-7 shadow-2xl shadow-black/90 text-slate-100 overflow-hidden">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#1E293B] pb-4 mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-white" />
                  <h3 className="text-lg font-bold text-white font-mono">
                    {selectedRepo.fullName}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 font-sans mt-1">
                  Configure branch, root directory, and execution commands (Render architecture).
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRepo(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors text-xs"
              >
                ✕
              </button>
            </div>

            {/* Success Alert Banner */}
            {saveSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Configuration saved to workspace registry!</span>
              </div>
            )}

            {/* Configuration Form */}
            <div className="space-y-4">
              
              {/* 1. Branch Selection */}
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                  Branch
                </label>
                <div className="relative">
                  <GitBranch className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#090D16] border border-[#1E293B] text-slate-100 text-xs sm:text-sm font-mono focus:outline-none focus:border-violet-500 transition-colors"
                  >
                    {selectedRepo.branches.map((b) => (
                      <option key={b} value={b} className="bg-[#090D16] text-white">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                  The branch to parse ASTs, evaluate debt metrics, and target automated pull requests.
                </span>
              </div>

              {/* 2. Root Directory */}
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                  Root Directory <span className="text-slate-500">(Optional)</span>
                </label>
                <div className="relative">
                  <FolderGit2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={rootDir}
                    onChange={(e) => setRootDir(e.target.value)}
                    placeholder="e.g. server for backend, client for frontend, or /"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#090D16] border border-[#1E293B] text-slate-100 placeholder-slate-500 text-xs sm:text-sm font-mono focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                  Specify if your repository is a monorepo containing multiple independent sub-services.
                </span>
              </div>

              {/* 3. Build & Start Commands (Render Standard) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Build Command
                  </label>
                  <div className="relative">
                    <Terminal className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={buildCommand}
                      onChange={(e) => setBuildCommand(e.target.value)}
                      placeholder="e.g. npm install"
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#090D16] border border-[#1E293B] text-slate-100 placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5">
                    Start Command
                  </label>
                  <div className="relative">
                    <Play className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={startCommand}
                      onChange={(e) => setStartCommand(e.target.value)}
                      placeholder="e.g. npm start"
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#090D16] border border-[#1E293B] text-slate-100 placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Autonomous PR Dispatch Checkbox */}
              <div className="p-3 rounded-xl bg-[#090D16] border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-white font-sans">
                      Autonomous PR Dispatch
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Allow Refactoring Planner agent to branch and draft PRs directly to GitHub
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={autoPrEnabled}
                  onChange={(e) => setAutoPrEnabled(e.target.checked)}
                  className="rounded text-violet-600 focus:ring-violet-500 cursor-pointer"
                />
              </div>

            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-4 border-t border-[#1E293B] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleSaveConfig}
                className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                Save Configuration
              </button>

              <button
                type="button"
                onClick={handleTriggerInspection}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-violet-950/40 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch Technical Debt Inspection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

