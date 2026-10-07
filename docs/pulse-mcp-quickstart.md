# Pulse MCP quickstart

Discover free, licensed loops and analyze authorized audio for BPM, musical key and waveform data. Start with free discovery and see estimated costs before paid analysis.

## Useful first connection

Human guide: https://pulse.studiosphere.space/connect (also reached from the product `/mcp` entry). The actual Streamable HTTP endpoint is:

```text
https://mcp.studiosphere.space/mcp
```

Connect without authentication. Call `search_open_loops`, then `get_open_loop` for a returned `pol_id`. Show preview/download and preserve license, license URL and attribution; follow each sample's terms. No key, account, tokens or payment is needed.

Claude remote setup uses Customize → Connectors → Add custom connector, the public endpoint and No sign in; organization permissions and labels can vary. Do not use Desktop's local configuration editor for this remote connection.

Claude Code candidate command (quoted for zsh):

```bash
claude mcp add --transport http studiosphere-pulse 'https://mcp.studiosphere.space/mcp'
claude mcp list
```

Host-specific instructions and primary references are on `/connect`. Actual Claude, ChatGPT, Cline and Smithery host tests are unperformed; SDK/protocol checks are distinct. Paid-host support is unverified. ChatGPT cannot present custom Pulse API keys; Pulse currently has no OAuth flow.

## Optional trial, with human approval

`start_trial` creates a private temporary key. End the anonymous connection and reconnect to initialize with the private query-key URL in a trusted client before using it. A later request key does not upgrade an existing session. MCP OAuth and bearer authentication are unsupported; REST Bearer support is separate.

```text
https://mcp.studiosphere.space/mcp?api_key=YOUR_PULSE_API_KEY
```

Keep actual keys out of shared logs, screenshots, prompts and version control. Query URLs can leak through client history/configuration. Do not create or rotate credentials automatically.

Read `get_token_balance` for the returned allowance. October 7 defaults are 78 tokens, up to 300 seconds, 24-hour expiry, one completed/partial URL analysis and at most two queued attempts if the first fails. Read live https://pulse.studiosphere.space/tools; configuration and per-key limits may differ. Unused tokens do not grant another song.

Use the original 180-second CC0 example when it fits the allowance:
https://pulse.studiosphere.space/assets/pulse-demo.mp3

Provenance/license: https://pulse.studiosphere.space/assets/pulse-demo.json

Call `estimate_cost`, review the estimate, confirm rights/permission/lawful access/another legal basis, then `analyze_track` with the quote ID and `attestation_confirmed:true`. Poll `get_job_status`; BPM and musical key are estimates requiring review. Structure and chords are unavailable roadmap items.

If interrupted, retain the private key and job ID, reconnect and poll before retrying. Do not mint another key or resubmit an uncertain job. On `estimate_pricing_changed`, get a fresh free estimate and obtain approval again before processing or payment.

## Ongoing analysis

October 7 default three-minute BPM/key/waveform example estimates 47 tokens, exact $0.235 displayed $0.24; five minutes estimates 78 tokens/$0.39. Final costs use measured duration. Current tiers are returned by `list_token_packs`, including 1K/$5 Starter; do not rely on fixed examples for purchasing. One-off Checkout has a $0.50 floor; banked usage has no per-job minimum.

Private account flow: `get_token_balance` → `estimate_cost` → review cost/rights → `analyze_track` → `get_job_status`. Checkout-link creation is not collected revenue. Keep paid promotion gated on payment/refund readiness and tested host authentication.

[Privacy](https://pulse.studiosphere.space/privacy) · [Terms](https://pulse.studiosphere.space/terms) · [Docs](https://pulse.studiosphere.space/docs) · [Journey inventory](https://pulse.studiosphere.space/.well-known/pulse/agent-journey.json)

Support: support@studiosphere.space; never send a key.
