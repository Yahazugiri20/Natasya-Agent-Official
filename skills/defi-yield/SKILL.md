---
name: defi-yield
description: Monitor APY rates across DeFi protocols and send Telegram alerts when high-yield opportunities are found. Use this skill whenever the user wants to track DeFi yields, get notified about high APY pools, check best staking rates, monitor liquidity pools, or automate DeFi yield hunting. Trigger this skill for any mention of APY alerts, yield monitoring, DeFi opportunities, best yields, or passive crypto income.
---

# DeFi Yield Monitor

Monitor APY rates across DeFi protocols via DeFiLlama API and alert when opportunities exceed your threshold.

## How It Works

1. Fetch pool data from DeFiLlama API
2. Filter by chain, minimum TVL, and APY threshold
3. Send Telegram alert with top opportunities
4. Can be run manually or on a schedule via openclaw cron

## Quick Start

### Check Best Yields Right Now
```bash
python3 ~/.openclaw/workspace/skills/defi-yield/scripts/check_yields.py
```

### Set APY Alert Threshold

Edit `~/.openclaw/workspace/skills/defi-yield/config.json`:
```json
{
  "min_apy": 20,
  "min_tvl_usd": 1000000,
  "chains": ["Base", "Ethereum", "Solana", "Polygon"],
  "top_n": 5,
  "exclude_protocols": []
}
```

### Schedule Auto-Alerts (Every 6 Hours)
```bash
openclaw cron add "0 */6 * * *" "run defi yield check and alert me if anything is above my threshold"
```

## Commands Bot Understands

- "Check best DeFi yields" → runs check and shows top pools
- "Alert me when APY above 30%" → sets threshold and monitors
- "Show yields on Base" → filters by chain
- "Schedule yield check every 6 hours" → sets up cron job
- "What's the best staking rate right now?" → fetches and ranks pools

## Output Format

Bot will respond with:
```
🌾 Top DeFi Yields Right Now

1. 🔥 USDC-ETH on Uniswap V3 (Base)
   APY: 47.3% | TVL: $12.4M
   
2. ⚡ stETH on Aave V3 (Ethereum)  
   APY: 31.2% | TVL: $890M

3. 💰 SOL Staking on Marinade (Solana)
   APY: 24.1% | TVL: $2.1B
```

## Notes

- DeFiLlama data updates every ~1 hour
- APY can be volatile — always DYOR before depositing
- TVL filter helps avoid small/risky pools
- For actual deposit execution, use Bankr skill: "deposit X to [protocol]"
