import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Shield, Zap, Terminal as TerminalIcon, FileText, BarChart3, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("bg-black/40 border border-white/10 backdrop-blur-md rounded-xl overflow-hidden", className)}>
    {children}
  </div>
);

export const Badge = ({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'danger' }) => {
  const variants = {
    default: "bg-gray-800 text-gray-300 border-gray-700",
    success: "bg-emerald-950/50 text-emerald-400 border-emerald-900/50",
    warning: "bg-amber-950/50 text-amber-400 border-amber-900/50",
    danger: "bg-rose-950/50 text-rose-400 border-rose-900/50",
  };
  return (
    <span className={cn("px-2 py-0.5 text-xs font-mono border rounded-full", variants[variant])}>
      {children}
    </span>
  );
};
