# Tools

StudioSphere Pulse exposes audio analysis capabilities through a hosted MCP server and API.

## Anonymous MCP discovery

Connect at `https://mcp.studiosphere.space/mcp`; call `search_open_loops`, then `get_open_loop`. Preserve the returned exact license, license URL and attribution. These two tools cost no tokens and require no account/key. See [connection instructions](https://pulse.studiosphere.space/connect).

## Available analysis outputs

### `waveform`

Generates waveform peak data for an audio URL. Use this when an agent needs a compact waveform representation for visualization, preview, timeline navigation, or downstream UI work.

### `bpm`

Estimates tempo in beats per minute. Use this for sample tagging, DJ/remix compatibility checks, playlist preparation, and music-library metadata.

### `key`

Detects likely musical key. Use this for harmonic compatibility checks, remix planning, catalog search, and agent-assisted session preparation.

## Coming Soon

### `structure`

Planned support for section segmentation such as intro, verse, chorus, bridge, and outro.

### `chords`

Planned support for timestamped chord progression analysis.

## Public Metadata

The live tool list and pricing metadata are available at:

```bash
curl https://pulse.studiosphere.space/tools
```

October7 default snapshot (read `/tools` for current values; costs and BPM/key are estimates requiring review):

```json
{
  "token_price_usd": 0.005,
  "cache_hit_price_usd": 0.001,
  "tools": [
    { "name": "waveform", "tokens_per_second": 0.06, "status": "available" },
    { "name": "bpm", "tokens_per_second": 0.10, "status": "available" },
    { "name": "key", "tokens_per_second": 0.10, "status": "available" }
  ],
  "coming_soon": [
    { "name": "structure", "tokens_per_second": 0.7, "status": "coming_soon" },
    { "name": "chords", "tokens_per_second": 1.3, "status": "coming_soon" }
  ]
}
```

