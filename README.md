
> **Privacy-first audio intelligence over the Model Context Protocol.**
> BPM, musical key, and waveform peaks for any public audio URL. Audio is
> processed in memory and never stored. Pay-per-second, no subscription.

[![MCP Registry](https://img.shields.io/badge/MCP%20Registry-space.studiosphere%2Fpulse-22d3ee)](https://registry.modelcontextprotocol.io/v0/servers?search=space.studiosphere%2Fpulse)
[![Hosted](https://img.shields.io/badge/hosted-pulse.studiosphere.space-60a5fa)](https://pulse.studiosphere.space)
[![Smithery](https://img.shields.io/badge/Smithery-studiosphere%2Fpulse-a78bfa)](https://smithery.ai/servers/studiosphere/pulse)
[![Glama](https://img.shields.io/badge/Glama-connector-22d3ee)](https://glama.ai/mcp/connectors/space.studiosphere/pulse)

**Keywords:** audio MCP · BPM detection · musical key detection · waveform analysis · music information retrieval · audio intelligence API · remote MCP server · Streamable HTTP transport.

---

## What it does

Pulse analyses any public audio URL (or a direct upload, with an account) and returns structured metadata your AI assistant can act on. Shareable Google Drive, Dropbox, and other document-repository links work when the user has permission and the file is accessible to anyone with the link:

- **BPM** — tempo with confidence and beat count
- **Musical key** — root + scale (e.g. `B minor`) with confidence
- **Waveform** — peak-amplitude array suitable for visualization

Track structure segmentation and chord transcription are marked **coming soon** and are intentionally rejected by v1.0 routes.

## Why creators and agents trust Pulse

| | |
|---|---|
| ✅ **Audio never stored.** | Files are downloaded into a temporary directory, analyzed, and deleted in the same job. Pulse never keeps a copy. |
| ✅ **Payment details never touch Pulse.** | Payment entry happens on Stripe's hosted page. Pulse only sees opaque Stripe IDs and dollar amounts — no card number, no CVV, no billing address, no bank or device token. PCI-DSS scope: out. |
| ✅ **No tracking, no analytics.** | No Google Analytics, no Mixpanel, no third-party tags. Outbound calls only to Stripe (payments) and Google Fonts (typography). |
| ✅ **Money back when we under-deliver.** | Failed jobs are free. Estimate-vs-actual overages refund automatically through Stripe. |

Full transparency at <https://pulse.studiosphere.space/terms>.

For a short setup walkthrough, see
[`docs/pulse-mcp-quickstart.md`](docs/pulse-mcp-quickstart.md).
For agent and builder scenarios, see
[`docs/agent-playbook.md`](docs/agent-playbook.md).

## Service URLs

| | |
|---|---|
| Marketing site | https://pulse.studiosphere.space |
| Product REST API | https://pulse.studiosphere.space |
| Remote MCP server | `https://mcp.studiosphere.space/mcp` |
| MCP setup wizard | https://pulse.studiosphere.space/connect |
| Agent playbook | https://pulse.studiosphere.space/for-agents |
| Account signup | https://pulse.studiosphere.space/signup |
| Tool metadata | https://pulse.studiosphere.space/tools |
| Server descriptor | https://pulse.studiosphere.space/.well-known/mcp/server.json |
| Health check | https://pulse.studiosphere.space/health |
| MCP Registry | `space.studiosphere/pulse` |
| Smithery | https://smithery.ai/servers/studiosphere/pulse |
| Glama | https://glama.ai/mcp/connectors/space.studiosphere/pulse |
| Support | pulse@studiosphere.space |

## MCP client setup

The Pulse MCP server uses **Streamable HTTP** transport. Authentication is by Pulse API key passed as the `api_key` query parameter on the connection URL.

### Claude Desktop

Open `Settings → Developer → Edit Config`, then merge:

```json
{
  "mcpServers": {
    "studiosphere-pulse": {
      "type": "http",
      "url": "https://mcp.studiosphere.space/mcp?api_key=YOUR_PULSE_API_KEY"
    }
  }
}
```

Restart Claude Desktop.

### Claude Code (CLI)

```bash
claude mcp add --transport http studiosphere-pulse \
  https://mcp.studiosphere.space/mcp?api_key=YOUR_PULSE_API_KEY
```

Verify with `claude mcp list`.

### Cursor

Add to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "studiosphere-pulse": {
      "type": "http",
      "url": "https://mcp.studiosphere.space/mcp?api_key=YOUR_PULSE_API_KEY"
    }
  }
}
```

### ChatGPT

The Pulse server speaks Streamable HTTP at `https://mcp.studiosphere.space/mcp`. Add it via whichever connector / GPT-action surface your account exposes; supply the API key as the `api_key` query parameter.

### Get an API key

Register at <https://pulse.studiosphere.space/signup>. Keys begin with `sk_pulse_` and are shown once — store them in a password manager.

The hosted **`/connect`** page (<https://pulse.studiosphere.space/connect>) generates the per-client config snippet with your key stamped in for one-click copy.

## Tools available to the assistant

| Tool | Auth | Description |
|---|---|---|
| `estimate_cost` | none | Quote a price for a public audio URL. |
| `analyze_track` | API key | Run analysis. Tools: `bpm`, `key`, `waveform`. |
| `request_payment_link` | none | Stripe Checkout link for one-off use without an account. |
| `get_job_status` | none | Poll a running job and fetch the result. |
| `get_token_balance` | API key | Banked-token balance. |
| `list_token_packs` | none | Available token packs (10K/$50, 50K/$250, 200K/$1000). |
| `purchase_token_pack` | API key | Stripe Checkout link to buy a pack. |

## Workflow agents should follow

1. Call `estimate_cost` with the audio URL and selected tools.
2. Show the user the returned `cost_display` and `duration_estimate_sec`.
3. Confirm the user has the right to submit the audio.
4. Call `analyze_track` (banked tokens) **or** `request_payment_link` (anonymous one-time payment).
5. Poll `get_job_status` until terminal (`completed`, `partial`, `failed`).
6. Surface the result.

Pricing is per-second of audio analyzed × per-tool multiplier. Banked-token pricing skips the $0.50 Stripe minimum and the per-job Checkout redirect.

## Why agents use Pulse

- DJ beat matching and harmonic set planning
- Sample-pack tagging and search
- Shared-drive and document-repository audio links
- DAW and session preparation
- App metadata for BPM, key, and waveform features
- Licensed music-library enrichment
- Sync and catalog metadata workflows
- Reference-track planning for producers and songwriters

Agents must only submit audio when the user confirms rights to analyze it. The `analyze_track` tool requires an explicit `attestation_confirmed: true` for this reason.

## Repository scope

This repository contains **only public-facing documentation, registry metadata, and client examples**. It does not contain production service source code, deployment configuration, credentials, private infrastructure notes, migrations, or internal operational documentation.

## Security

Do not send private, copyrighted, or third-party audio unless you have the right to submit it for analysis. Do not publish Pulse API keys in client configs, prompts, logs, or issue reports.

Security questions: pulse@studiosphere.space.

## License

See `LICENSE` in this repository. Pulse is operated by StudioSphere Inc., Quebec, Canada.
