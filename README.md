# 💎 Enterprise AI-Driven Quant Trading System (v2026.1)

An institutional-grade, hybrid HFT system utilizing the **EIP-2535 Diamond Proxy** standard, **Rust** execution, and **Transformer-based** ML inference.

## 🏗 System Architecture
- **The Hands (Solidity):** Modular Diamond Proxy for on-chain settlement and risk guardrails.
- **The Spine (Rust):** Sub-10ms WebSocket ingestor and nonce-managed transaction manager.
- **The Brain (Python):** LSTM-Transformer hybrid for confidence-based signal generation.
- **The Guard (K8s):** High-availability orchestration with GPU-accelerated inference pods.

## 🚀 Quick Start (Simulation)

### 1. Prerequisites
- Docker & Docker Compose (with NVIDIA Container Toolkit)
- Foundry (Anvil/Forge)
- Python 3.11+ / Rust 1.75+

### 2. Environment Setup
```bash
cp .env.example .env
# Fill in RPC_URL (Alchemy/Infura) and PRIVATE_KEY
```

### 3. Launch the Stack
```bash
# 1. Start the Local Mainnet Fork & ML Brain
docker-compose up -d blockchain-node ai-brain

# 2. Deploy Smart Contracts to Local Node
make contracts-deploy

# 3. Start the Rust Execution Engine
docker-compose up -d quant-engine
```

## 🛠 Management Commands
- Check System Health: `make status`
- Audit Diamond Facets: `npx hardhat diamond:loupe`
- Run Backtest: `make ml-backtest`
- Manual Halt: `cast send $DIAMOND "toggleCircuitBreaker(bool)" true --rpc-url $RPC_URL`

## 📊 Performance Targets
- Target Gas: < 140,000 units per swap.
- Execution Latency: < 25ms (End-to-End).
- Inference Threshold: 0.82+ Confidence for 5% AUM risk.

## 🔒 Security
This system utilizes Flashbots Protect by default. To change RPC endpoints, update `config/engine.toml`.

---

# 2. Custom Facet: `L2AggregatorFacet.sol`

In 2026, liquidity is fragmented across L2s. This facet integrates with a **Cross-L2 Liquidity Aggregator** (like a 2026 version of 1inch or Paraswap) to ensure the Diamond always finds the deepest path for its Kelly-sized trades.

## How to Integrate this Facet:
1. **Deploy**: Deploy `L2AggregatorFacet.sol` to your target L2.
2. **Cut**: Use your `deploy_diamond.ts` script to add `executeAggregatedSwap` to the Diamond Proxy.
3. **Execute**: Update your Rust Engine's `tx_manager.rs` to call this new function when the AI identifies a fragmented liquidity opportunity.

## Final Deployment Status (Feb 2026)
The system is now fully consolidated, documented, and modularly expandable. You have the infrastructure to trade, the brain to think, and the guardrails to stay safe.

Launch complete. 🚀
