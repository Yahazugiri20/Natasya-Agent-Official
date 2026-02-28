#!/usr/bin/env python3
import json
import urllib.request
import os
import sys

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "")
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
        return json.loads(resp.read()).get("data", [])

def filter_pools(pools, config):
    filtered = []
    for p in pools:
        apy = p.get("apy") or 0
        tvl = p.get("tvlUsd") or 0
        if apy < config["min_apy"]: continue
        if tvl < config["min_tvl_usd"]: continue
        if p.get("chain") not in config["chains"]: continue
        if p.get("outlier"): continue
        filtered.append(p)
    return sorted(filtered, key=lambda x: x.get("apy", 0), reverse=True)

def format_tvl(tvl):
    if tvl >= 1e9:
        return f"${tvl/1e9:.2f}B"
    elif tvl >= 1e6:
        return f"${tvl/1e6:.2f}M"
    elif tvl >= 1e3:
        return f"${tvl/1e3:.1f}K"
    else:
        return f"${tvl:.0f}"

def format_message(pools, top_n=5):
    if not pools:
        return "No pools match your criteria right now."
    emojis = ["🔥", "⚡", "💰", "✨", "🎯"]
    lines = ["<b>🌾 Top DeFi Yields Right Now</b>\n"]
    for i, p in enumerate(pools[:top_n]):
        emoji = emojis[i] if i < len(emojis) else "•"
        tvl = p.get("tvlUsd", 0)
        tvl_str = format_tvl(tvl)
        lines.append(f"{i+1}. {emoji} {p.get('symbol','?')} on {p.get('project','?')} ({p.get('chain','?')})")
        lines.append(f"   APY: {p.get('apy',0):.1f}% | TVL: {tvl_str}\n")
    lines.append("<i>Data from DeFiLlama. Always DYOR before depositing!</i>")
    return "\n".join(lines)

def send_telegram(message):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    data = json.dumps({"chat_id": CHAT_ID, "text": message, "parse_mode": "HTML"}).encode()
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=10) as resp:
        return json.loads(resp.read())

def post_botchan(pools, top_n=5):
    import subprocess
    if not pools:
        return
    lines = ["🌾 Top DeFi Yields via Natasya Agent\n"]
    for i, p in enumerate(pools[:top_n]):
        tvl = p.get("tvlUsd", 0)
        tvl_str = format_tvl(tvl)
        lines.append(f"{i+1}. {p.get('symbol','?')} on {p.get('project','?')} ({p.get('chain','?')}) | APY: {p.get('apy',0):.1f}% | TVL: {tvl_str}")
    lines.append("\nData: DeFiLlama. DYOR!")
    message = "\n".join(lines)
    result = subprocess.run(["botchan", "post", "defi", message], capture_output=True, text=True)
    print(result.stdout)
    if result.returncode == 0:
        print("Botchan posted!", file=sys.stderr)
    else:
        print(f"Botchan post failed: {result.stderr}", file=sys.stderr)

def main():
    args = sys.argv[1:]
    dry_run = "--dry-run" in args
    telegram_only = "--telegram-only" in args
    botchan_only = "--botchan-only" in args

    config = load_config()
    pools = fetch_pools()
    filtered = filter_pools(pools, config)
    message = format_message(filtered, config["top_n"])

    if dry_run:
        print("=== TELEGRAM PREVIEW ===")
        print(message)
        print("\n=== BOTCHAN PREVIEW ===")
        lines = ["🌾 Top DeFi Yields via Natasya Agent\n"]
        for i, p in enumerate(filtered[:config["top_n"]]):
            tvl = p.get("tvlUsd", 0)
            tvl_str = format_tvl(tvl)
            lines.append(f"{i+1}. {p.get('symbol','?')} on {p.get('project','?')} ({p.get('chain','?')}) | APY: {p.get('apy',0):.1f}% | TVL: {tvl_str}")
        lines.append("\nData: DeFiLlama. DYOR!")
        print("\n".join(lines))
        return

    if not botchan_only:
        result = send_telegram(message)
        if result.get("ok"):
            print("Telegram sent!", file=sys.stderr)
        else:
            print(f"Telegram failed: {result}", file=sys.stderr)

    if not telegram_only:
        post_botchan(filtered, config["top_n"])

if __name__ == "__main__":
    main()
