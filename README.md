# StudioSphere Pulse MCP

StudioSphere Pulse is a hosted audio intelligence API and remote MCP server for music producers, catalog teams, and AI agents that need structured audio metadata before acting.

Pulse v1.0 describes the current capability set. The latest MCP Registry metadata package is `1.0.1`; the hosted API currently reports service version `0.1.0` from its health and root descriptors.

Pulse v1.0 analyzes public audio URLs and returns:

- BPM detection
- Musical key detection
- Waveform peak data for visualization

Track structure segmentation and chord transcription are marked as coming soon and are not available in v1.0.

## Service URLs

- Product API: https://pulse.studiosphere.space
- Remote MCP server: https://mcp.studiosphere.space/mcp
- Tool metadata: https://pulse.studiosphere.space/tools
- Health check: https://pulse.studiosphere.space/health
- Official MCP Registry package: `space.studiosphere/pulse`
- Contact: pulse@studiosphere.space

## Why Agents Use Pulse

Pulse gives agents a narrow, reliable way to inspect audio before making creative or operational decisions. It is useful for:

- Sample-pack tagging and search
- Agent-assisted DAW and session preparation
- Remix and mashup compatibility checks
- Licensed music-library enrichment
- Sync and catalog metadata workflows
- Content-creator music selection from approved libraries

Agents should only submit audio when the user confirms they have the right to analyze that audio.

## Available Tools

| Tool | Status | Output |
| --- | --- | --- |
| `waveform` | Available | Peak data suitable for waveform rendering |
| `bpm` | Available | Tempo estimate and related confidence data |
| `key` | Available | Musical key estimate and confidence data |
| `structure` | Coming soon | Planned section segmentation |
| `chords` | Coming soon | Planned timestamped chord progression |

Current public pricing metadata is available from:

```bash
curl https://pulse.studiosphere.space/tools
```

## MCP Workflow

1. Call `estimate_cost` with a public audio URL and selected tools.
2. Show the user the returned cost display.
3. Confirm the user has the right to submit the audio.
4. Use `analyze_track` with a Pulse API key, or `request_payment_link` for one-time checkout.
5. Poll `get_job_status` until the job is `completed`, `partial`, or `failed`.

## Client Configuration

Use Streamable HTTP:

```json
{
  "mcpServers": {
    "studiosphere-pulse": {
      "url": "https://mcp.studiosphere.space/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_PULSE_API_KEY"
      }
    }
  }
}
```

Some MCP clients also support passing the API key as a query parameter during initialization:

```text
https://mcp.studiosphere.space/mcp?api_key=YOUR_PULSE_API_KEY
```

The MCP endpoint is `https://mcp.studiosphere.space/mcp`. A plain browser or unauthenticated GET request may return `session_required`; that is expected for Streamable HTTP clients before session initialization.

`estimate_cost`, `request_payment_link`, and `get_job_status` can be used without an API key. `analyze_track` and `get_token_balance` require a Pulse API key.

## Example Agent Prompt

```text
Estimate the cost to analyze this licensed audio URL for BPM, key, and waveform.
Show me the price before starting. I confirm I have the right to submit this audio.
```

## Repository Scope

This repository intentionally contains only public-facing documentation, registry metadata, and client examples for the hosted StudioSphere Pulse MCP service. It does not contain production service source code, deployment configuration, credentials, private infrastructure notes, migrations, or internal operational documentation.

## Security

Do not send private, copyrighted, or third-party audio unless you have the right to submit it for analysis. Do not publish Pulse API keys in client configs, prompts, logs, or issue reports.

For security questions, contact pulse@studiosphere.space.
