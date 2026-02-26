import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from './ui/Shared';
import { BarChart3 } from 'lucide-react';

const data = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  pnl: 1000 + Math.random() * 500 + (i * 50),
  vol: Math.random() * 1000,
}));

export function PerformanceChart() {
  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/60">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-indigo-400" />
          <span className="text-gray-400 uppercase tracking-wider font-mono text-xs">24h Performance (PnL)</span>
        </div>
        <div className="flex gap-4 text-xs font-mono">
          <div className="text-emerald-400">
            <span className="text-gray-500 mr-1">NET:</span>
            +$2,492.10
          </div>
          <div className="text-indigo-400">
            <span className="text-gray-500 mr-1">VOL:</span>
            $1.2M
          </div>
        </div>
      </div>
      <div className="flex-1 w-full min-h-[200px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPnL" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#666" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              interval={4}
            />
            <YAxis 
              stroke="#666" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#000', borderColor: '#333', color: '#fff' }}
              itemStyle={{ color: '#818cf8' }}
            />
            <Area 
              type="monotone" 
              dataKey="pnl" 
              stroke="#6366f1" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorPnL)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
