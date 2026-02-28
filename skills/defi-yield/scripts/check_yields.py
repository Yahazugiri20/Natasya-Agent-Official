#!/usr/bin/env python3
import json
import urllib.request
import argparse
import os
import sys

CONFIG_PATH = os.path.expanduser("~/.openclaw/workspace/skills/defi-yield/config.json")

def load_config():
    if os.path.exists(CONFIG_PATH):
        with open(CONFIG_PATH) as f:
            return json.load(f)
    return {"min_apy": 20, "min_tvl_usd": 1000000, "chains": ["Base", "Ethereum", "Solana", "Polygon"], "top_n": 5, "exclude_protocols": []}

def fetch_pools():
    url = "https://yields.llama.fi/pools"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read())
    return data.get("data", [])

def filter_pools(pools, config, chain=None):
    min_apy = config["min_apy"]
    min_tvl = config["min_tvl_usd"]
    chains = [chain] if chain else config["chains"]
    exclude = [p.lower() for p in config.get("exclude_protocols", [])]
    filtered = []
    for p in pools:
        apy = p.get("apy") or 0
        tvl = p.get("tvlUsd") or 0
        pool_chain = p.get("chain", "")
        project = p.get("project", "").lower()
        if apy < min_apy: continue
        if tvl < min_tvl: continue
        if pool_chain not in chains: continue
        if project in exclude: continue
        if p.get("outlier"): continue
        filtered.append(p)
    return sorted(filtered, key=lambda x: x.get("apy", 0), reverse=True)

def format_output(pools, top_n=5):
    if not pools:
        return "No pools match your criteria right now."
    lines = ["🌾 Top DeFi Yields Right Now\n"]
    emojis = ["🔥", "⚡", "💰", "✨", "🎯"]
    for i, p in enumerate(pools[:top_n]):
        emoji = emojis[i] if i < len(emojis) else "•"
        symbol = p.get("symbol", "?")
        project = p.get("project", "?")
        chain = p.get("chain", "?")
        apy = p.get("apy", 0)
        tvl = p.get("tvlUsd", 0)
        if tvl >= 1e9:
            tvl_str = f"${tvl/1e9:.2f}B"
        elif tvl >= 1e6:
            tvl_str = f"${tvl/1e6:.2f}M"
        elif tvl >= 1e3:
            tvl_str = f"${tvl/1e3:.1f}K"
        else:
            tvl_str = f"${tvl:.0f}"
        lines.append(f"{i+1}. {emoji} {symbol} on {project} ({chain})")
        lines.append(f"   APY: {apy:.1f}% | TVL: {tvl_str}\n")
    lines.append("Data from DeFiLlama. Always DYOR before depositing!")
    return "\n".join(lines)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--min-apy", type=float, default=None)
    parser.add_argument("--chain", type=str, default=None)
    parser.add_argument("--top", type=int, default=None)
    args = parser.parse_args()
    config = load_config()
    if args.min_apy: config["min_apy"] = args.min_apy
    if args.top: config["top_n"] = args.top
    pools = fetch_pools()
    filtered = filter_pools(pools, config, chain=args.chain)
    print(format_output(filtered, config["top_n"]))

if __name__ == "__main__":
    main()
