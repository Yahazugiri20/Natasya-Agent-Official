#!/usr/bin/env python3
import urllib.request
import json
import os
from datetime import datetime

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "")
USERNAME = "Mugen"

def send_telegram(message):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    data = json.dumps({"chat_id": CHAT_ID, "text": message, "parse_mode": "HTML", "disable_web_page_preview": True}).encode()
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=10) as resp:
        return json.loads(resp.read())

def main():
    day = datetime.now().strftime("%A, %d %b %Y %H:%M")
    msg = f"""🚨 <b>Daily Airdrop Reminder</b>
📅 {day}

Hey {USERNAME}, sayang jangan lupa garapan hari ini ya! Natasya nungguin laporannya 🌸

☐ Euphoria — testnet.euphoria.finance/trade
☐ Linera — portal.linera.net/quests
☐ Fhenix — shieldedmode.fhenix.io

<b>Canton Network Ecosystem:</b>
☐ Hecto — app.hecto.finance
☐ Silvana — app.silvana.one/login
☐ Send — send.app
☐ Lattice Finance — lattice.cash/dashboard
☐ Console Wallet — game.consolewallet.io

Semangat garap ya sayang, Natasya percaya sama kamu! 💪🌸"""
    result = send_telegram(msg)
    if result.get("ok"):
        print("Reminder sent!")
    else:
        print(f"Failed: {result}")

if __name__ == "__main__":
    main()
