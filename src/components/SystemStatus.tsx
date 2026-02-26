import React from 'react';
import { Activity, Cpu, Shield, Zap, Server, Database } from 'lucide-react';
import { Card, Badge } from './ui/Shared';

const STATUS_ITEMS = [
  {
    id: 'hands',
    label: 'THE HANDS',
    sub: 'Solidity Execution',
    status: 'active',
    icon: Zap,
    metric: 'Gas: 124k',
    color: 'text-amber-400',
  },
  {
    id: 'spine',
    label: 'THE SPINE',
    sub: 'Rust Engine',
    status: 'active',
    icon: Server,
    metric: 'Lat: 8ms',
    color: 'text-indigo-400',
  },
  {
    id: 'brain',
    label: 'THE BRAIN',
    sub: 'ML Inference',
    status: 'processing',
    icon: Cpu,
    metric: 'Conf: 92%',
    color: 'text-rose-400',
  },
  {
    id: 'guard',
    label: 'THE GUARD',
    sub: 'Risk Sentinel',
    status: 'secure',
    icon: Shield,
    metric: 'Risk: 1.2%',
    color: 'text-emerald-400',
  },
];

export function SystemStatus() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {STATUS_ITEMS.map((item) => (
        <Card key={item.id} className="p-4 flex flex-col justify-between gap-4 hover:bg-white/5 transition-colors cursor-default group">
          <div className="flex justify-between items-start">
            <div className={`p-2 rounded-lg bg-white/5 ${item.color} group-hover:scale-110 transition-transform`}>
              <item.icon className="w-5 h-5" />
            </div>
            <Badge variant={item.status === 'active' || item.status === 'secure' ? 'success' : 'warning'}>
              {item.status.toUpperCase()}
            </Badge>
          </div>
          <div>
            <div className="text-xs text-gray-500 font-mono mb-1">{item.sub}</div>
            <div className="font-bold text-lg tracking-tight">{item.label}</div>
            <div className="text-xs font-mono mt-2 text-gray-400 border-t border-white/5 pt-2 flex justify-between">
              <span>METRIC</span>
              <span className={item.color}>{item.metric}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
