import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FolderGit2, 
  ChevronRight, 
  ChevronLeft,
  LogOut
} from 'lucide-react';

export default function Sidebar({ 
  currentView, 
  onViewChange, 
  currentUser, 
  onLogout 
}) {
  const [isHovered, setIsHovered] = useState(false);

  const navItems = [
    {
      id: 'dashboard',
      label: 'Debt Inspector',
      sublabel: 'Orchestrated Multi-Agent',
      icon: LayoutDashboard,
      badge: 'Live'
    },
    {
      id: 'workspaces',
      label: 'Workspaces',
      sublabel: 'Connected Repositories',
      icon: FolderGit2,
      badge: 'GitHub'
    }
  ];

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-[65px] left-0 bottom-0 z-40 flex flex-col bg-[#090D16]/95 backdrop-blur-xl border-r border-[#1E293B] shadow-2xl shadow-black/80 transition-all duration-300 ease-in-out ${
        isHovered ? 'w-64' : 'w-16'
      }`}
    >
      {/* Main Navigation Links */}
      <div className="flex-1 pt-6 pb-4 px-2 space-y-2 overflow-y-auto overflow-x-hidden">
        {isHovered && (
          <div className="px-2.5 pb-1 text-[10px] font-mono uppercase tracking-wider text-slate-500">
            Core Gateways
          </div>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center px-2.5 py-2.5 rounded-xl transition-all group relative ${
                isActive
                  ? 'bg-violet-600/20 text-violet-300 border border-violet-500/40 shadow-lg shadow-violet-950/40'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent'
              }`}
              title={!isHovered ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-violet-400' : 'text-slate-400 group-hover:text-slate-200'}`} />

              {isHovered && (
                <div className="ml-3 flex items-center justify-between flex-1 overflow-hidden animate-fadeIn text-left">
                  <div className="truncate">
                    <div className="text-xs font-semibold text-slate-200 font-sans group-hover:text-white">
                      {item.label}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono truncate">
                      {item.sublabel}
                    </div>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-md ${
                      isActive 
                        ? 'bg-violet-500/30 text-violet-200 border border-violet-500/40' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              )}

              {/* Active Indicator Strip on Left */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-violet-500 to-cyan-400 rounded-r-full"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer / User Card */}
      <div className="p-2 border-t border-[#1E293B] space-y-1">
        {currentUser && (
          <div className={`flex items-center px-2 py-2 rounded-xl bg-slate-900/60 border border-slate-800/80 ${
            isHovered ? 'justify-between' : 'justify-center'
          }`}>
            <div className="flex items-center space-x-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {currentUser.firstName?.[0] || 'U'}
              </div>
              {isHovered && (
                <div className="min-w-0 truncate">
                  <div className="text-xs font-semibold text-white truncate">
                    {currentUser.firstName} {currentUser.lastName}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono truncate">
                    {currentUser.email}
                  </div>
                </div>
              )}
            </div>

            {isHovered && (
              <button
                onClick={onLogout}
                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Hover Expand Hint */}
        <div className="py-1 flex items-center justify-center text-slate-600 text-[10px] font-mono">
          {isHovered ? (
            <span className="flex items-center gap-1 text-slate-500">
              <ChevronLeft className="w-3 h-3" /> Auto-slides on hover
            </span>
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-slate-500 animate-pulse" />
          )}
        </div>
      </div>
    </aside>
  );
}
