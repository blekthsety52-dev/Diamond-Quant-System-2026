import React, { useEffect, useState, useRef } from 'react';
import { Card } from './ui/Shared';
import { Terminal as TerminalIcon } from 'lucide-react';

const LOG_MESSAGES = [
  "[RUST] Connection established to Arbitrum WebSocket (latency: 8ms)",
  "[BRAIN] Model inference: CONFIDENCE 0.92 | ACTION: BUY | PAIR: ETH/USDC",
  "[HANDS] Diamond Proxy: Executing Facet 0x4a...2b via L2Aggregator",
  "[GUARD] Risk Check: PASSED (Exposure < 5% AUM)",
  "[RUST] Tx Submitted: 0x8f...2a (Nonce: 4201)",
  "[RUST] Tx Confirmed: Block 18293012 | Gas Used: 124,000",
  "[BRAIN] Re-training loop initiated on new block data...",
  "[HANDS] Circuit Breaker: MONITORING (State: ACTIVE)",
  "[SPINE] Mempool scan: 14 pending arbitrage opportunities detected",
  "[GUARD] Flashbots bundle constructed. Target block: +1",
];

export function Terminal() {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomLog = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      const timestamp = new Date().toISOString().split('T')[1].slice(0, 12);
      setLogs(prev => [...prev.slice(-20), `[${timestamp}] ${randomLog}`]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <Card className="h-full flex flex-col font-mono text-xs">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-black/60">
        <TerminalIcon className="w-4 h-4 text-emerald-500" />
        <span className="text-gray-400 uppercase tracking-wider">System Logs</span>
      </div>
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-1 text-emerald-500/80">
        {logs.map((log, i) => (
          <div key={i} className="break-all">
            <span className="text-emerald-700 mr-2">$</span>
            {log}
          </div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
    </Card>
  );
}
