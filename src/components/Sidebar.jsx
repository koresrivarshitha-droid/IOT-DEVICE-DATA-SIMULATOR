import React from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Cpu, 
  BellRing, 
  Globe, 
  Activity 
} from 'lucide-react';

export default function Sidebar({ activeView, onViewChange }) {
  const menuItems = [
    { id: 'dashboard', label: 'IoT Admin Dashboard', icon: LayoutDashboard },
    { id: 'trainer', label: 'Workshop Trainer Panel', icon: GraduationCap },
    { id: 'simulator', label: 'Sensor Simulator', icon: Cpu },
    { id: 'alerts', label: 'Alert Configuration', icon: BellRing },
    { id: 'geofences', label: 'Geofence Setup', icon: Globe },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-zinc-200 bg-white px-4 py-6 text-zinc-950 dark:border-zinc-800 dark:bg-[#0c0c0f] dark:text-zinc-50">
      {/* Brand Logo */}
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
          <Activity className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight tracking-tight">TelemetryHub</h1>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">IoT Simulator Platform</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-400 dark:text-zinc-500'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom info section */}
      <div className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800/50 dark:bg-zinc-900/30">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Simulator Status</span>
        </div>
        <p className="text-[11px] leading-normal text-zinc-500 dark:text-zinc-400">
          Auto-generating logs. Replaces manual WhatsApp/calls/spreadsheets pipelines.
        </p>
      </div>
    </aside>
  );
}
