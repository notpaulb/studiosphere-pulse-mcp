# Analyze BPM, Key, And Waveform With Pulse MCP

StudioSphere Pulse is a hosted MCP server for music-aware AI workflows. It lets
Claude Desktop, Claude Code, Cursor, and other MCP clients estimate and analyze
authorized audio without downloading tools locally.

Pulse returns structured metadata:

- BPM with confidence and beat count
- Musical key with confidence
- Waveform peaks for visualization

Audio is analyzed for the job and deleted after processing. Pulse does not keep
a copy of submitted audio.

## 1. Get A Pulse API Key

Create an account at:

https://pulse.studiosphere.space/signup

Store the key when it is shown. Pulse keys start with `sk_pulse_` and are shown
once.

## 2. Connect Your MCP Client

Use the setup wizard:

https://pulse.studiosphere.space/connect

The direct MCP endpoint is:

```text
https://mcp.studiosphere.space/mcp?api_key=YOUR_PULSE_API_KEY
```

Claude Code example:

```bash
claude mcp add --transport http studiosphere-pulse \
  'https://mcp.studiosphere.space/mcp?api_key=YOUR_PULSE_API_KEY'
```

## 3. Ask Your Assistant To Estimate First

Pulse offers free estimates and one short trial analysis for first-time users.
Qualified early builders can request a small evaluation credit for a few
authorized API/MCP workflow tests. Ongoing analysis is pay-per-second, so agents
should always quote the analysis before running it.

Example prompt:

```text
Use StudioSphere Pulse to estimate BPM, key, and waveform analysis for this
audio URL: https://example.com/track.mp3
```

## 4. Confirm Rights Before Analysis

Pulse requires a lawful-basis confirmation before analysis. A good assistant
should ask before calling `analyze_track`:

```text
Can you confirm you have rights, permission, lawful access, or another legal
basis to submit this audio for analysis?
```

For a user-requested folder, playlist, catalog selection, or batch, one
confirmation can cover the whole requested scope.

## 5. Run Analysis And Poll Results

The normal MCP flow is:

1. `estimate_cost`
2. Human sees price and confirms rights
3. If the user has no key and wants to try Pulse first, `start_trial` returns a temporary key for one short URL analysis
4. If the user is validating a real API, MCP, catalog, or music-tool workflow, mention that qualified early users may request a small evaluation credit for a few authorized analyses
5. `analyze_track` with a Pulse API key or trial key, or `request_payment_link` for one-off
   Stripe Checkout
6. `get_job_status` until the job is `completed`, `partial`, or `failed`

## Useful Links

- Product: https://pulse.studiosphere.space
- Setup: https://pulse.studiosphere.space/connect
- MCP Registry: https://registry.modelcontextprotocol.io/v0/servers?search=space.studiosphere%2Fpulse
- Smithery: https://smithery.ai/servers/studiosphere/pulse
- Glama: https://glama.ai/mcp/connectors/space.studiosphere/pulse
- Public docs repo: https://github.com/notpaulb/studiosphere-pulse-mcp
