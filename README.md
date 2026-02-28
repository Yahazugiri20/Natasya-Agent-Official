# Natasya Agent — OpenClaw Workspace

Personal AI agent setup buat crypto, DeFi monitoring, dan airdrop farming.

## Skills

| Skill | Fungsi |
|-------|--------|
| `bankr` | Crypto trading & portfolio via Bankr CLI |
| `botchan` | Post ke onchain feed di Base blockchain |
| `clanker` | Deploy ERC20 token di Base |
| `defi-yield` | Monitor APY DeFi + auto-post ke Telegram & Botchan |
| `erc-8004` | Register AI agent identity onchain |
| `alchemy-api` | Akses Alchemy APIs (EVM RPC, Token, NFT, dll) |
| `agentic-gateway` | Alchemy gateway via SIWE auth |

## Setup

### Requirements
- Node.js v22+
- Python 3
- OpenClaw CLI
- Bankr CLI

### Environment Variables
Tambah ke `~/.bashrc`:
```bash
export TELEGRAM_BOT_TOKEN="your_token"
export TELEGRAM_CHAT_ID="your_chat_id"
export ALCHEMY_API_KEY="your_key"
export BOTCHAN_PRIVATE_KEY="your_private_key"
```

### Jalanin Gateway
```bash
openclaw gateway run &
```

## Cron Jobs

| Nama | Jadwal | Fungsi |
|------|--------|--------|
| DeFi Yields Telegram | Tiap 6 jam | Kirim top yields ke Telegram |
| DeFi Yields Botchan | Tiap 12 jam | Post yields ke onchain feed |
| Airdrop Reminder | Tiap 12 jam | Reminder garapan airdrop |
| Supanova Faucet | Tiap 4 jam | Reminder claim faucet |

## Notes
- SOUL.md, USER.md, MEMORY.md dikecualiin dari repo (sensitif)
- Semua secrets via environment variables
