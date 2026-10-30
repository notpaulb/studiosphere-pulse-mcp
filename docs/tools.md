# Tools

Current tested workflows and authentication limits: [compatibility matrix](mcp-compatibility.md). The October 29 SDK trial validates cached result delivery and reconnection; it does not extend this document’s host-specific evidence.

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


## Search interpretation

In MCP 1.0.4, musical-key filters accept common spellings such as `Am` and `a minor` for `A minor`; major/minor remain distinct. Enharmonic spellings and Camelot codes are not converted. BPM, pack and licence constraints are never silently widened.

Keyword search ranks any matching term. Read each returned `search_match`: `matched_terms`, `missing_terms` and `complete` distinguish partial results. A drums-only match for “lofi drums” does not establish a lo-fi genre. Empty results remain empty; ask before relaxing a hard filter. Older deployments may omit this additive field. These explanations are query matching, not musical quality or harmonic-fit scores. Preserve exact licence, licence URL and attribution, and audition samples before use.

## Curated loops, project matching and portable exports


Use [Find loops for your project](https://pulse.studiosphere.space/open-loops/project) for released loops, without an account or analysis. Existing individually auditioned source loops are separate from technically checked original synthesis; automated checks are not listening approval. The catalogue and complete-kit player remain available.

In your existing connected assistant, call `search_open_loops` with, for example:

```json
{"project_bpm":120,"bpm_tolerance":5,"key":"Am","role":"bass","review_basis":"original_synthesis","limit":5}
```

Read `project_match` reasons and `search_match.missing_terms`. Project mode requires an explicit major/minor key when supplied; it cannot combine with `bpm_min`/`bpm_max`. Keys stay exact: no relative-key, enharmonic or transposition inference. `include_unkeyed_percussion:true` optionally admits unspecified-key percussion tag hints, requiring audition; this is not proof of atonality or musical fit. No additional MCP tool is added.

`get_open_loop` and search items include `provenance_url` and `metadata_export_url`. For several selected IDs use `/open-loops/export?ids=POL_ID_1,POL_ID_2&format=json`, `csv` or `zip`. Select 1–8 unique released IDs. ZIP includes unchanged WAVs, manifest, spreadsheet-safe metadata, per-file rights and credits, limited to 16 MiB audio plus 1 MiB metadata and a 30-second build. If busy, respect Retry-After; if too large, export metadata and download WAVs individually. Interrupted or unavailable exports publish no partial archive; retry the same selection rather than starting audio analysis.

Follow each file's exact licence. Mixed CC0/CC-BY selections have no blanket CC0 licence. Released hashes and source/applicability records support traceability, not proof of authorship or distributor acceptance. Audition the loops together and retain required credits in your project. This flow creates no trial, credentials, analysis or payment. Native assistant-host and DAW import testing require separate evidence.
