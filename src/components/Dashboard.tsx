import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, FileCode, BookOpen, Activity, Settings, Bell } from 'lucide-react';
import { SystemStatus } from './SystemStatus';
import { PerformanceChart } from './PerformanceChart';
import { Terminal } from './Terminal';
import { FileViewer } from './FileViewer';

// Import content via Vite's raw loader
import readmeContent from '../../README.md?raw';
import contractContent from '../contracts/L2AggregatorFacet.sol?raw';

const TABS = [
  { id: 'overview', label: 'Command Center', icon: LayoutDashboard },
  { id: 'contracts', label: 'Smart Contracts', icon: FileCode },
  { id: 'docs', label: 'Documentation', icon: BookOpen },
];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-emerald-500/30">
      {/* Header */}
      <header className="h-16 border-b border-white/10 bg-black/40 backdrop-blur-md fixed top-0 w-full z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-900/20">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-100 tracking-tight leading-none">QUANT<span className="text-emerald-500">SYSTEM</span></h1>
            <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">v2026.1.0-RC2</div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/30 border border-emerald-900/50">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400">SYSTEM ONLINE</span>
          </div>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <Bell className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <Settings className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed left-0 top-16 bottom-0 w-64 border-r border-white/10 bg-black/20 backdrop-blur-sm hidden md:flex flex-col">
        <nav className="p-4 space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-white/10 text-white shadow-sm border border-white/5' 
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-emerald-400' : ''}`} />
              {tab.label}
            </button>
          ))}
        </nav>
        
        <div className="mt-auto p-4 border-t border-white/10">
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20">
            <div className="text-xs font-mono text-indigo-300 mb-2">NETWORK STATUS</div>
            <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
              <span>Arbitrum</span>
              <span className="text-emerald-400">Connected</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>Block</span>
              <span className="font-mono">182,930,124</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-20 pb-8 px-6 md:pl-72 max-w-[1920px] mx-auto h-screen flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full flex flex-col gap-6"
          >
            {activeTab === 'overview' && (
              <>
                <SystemStatus />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
                  <div className="lg:col-span-2 h-full min-h-[300px]">
                    <PerformanceChart />
                  </div>
                  <div className="h-full min-h-[300px]">
                    <Terminal />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'contracts' && (
              <div className="h-full">
                <FileViewer 
                  title="L2AggregatorFacet.sol" 
                  content={contractContent} 
                  language="solidity"
                  icon={FileCode}
                />
              </div>
            )}

            {activeTab === 'docs' && (
              <div className="h-full">
                <FileViewer 
                  title="README.md" 
                  content={readmeContent} 
                  language="markdown"
                  icon={BookOpen}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
