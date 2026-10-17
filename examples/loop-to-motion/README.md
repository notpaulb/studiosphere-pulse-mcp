# Licensed loop → reviewed tempo grid → motion cuts

A small, tool-neutral creative example using one existing Pulse Open Loop. It runs locally, creates no credentials, and never calls analysis or payment endpoints. No new package, MCP tool, video-provider integration or production feature is introduced. The example scripts are optional; the portable plugin does not execute or bundle them.

## Try the local player

From this repository's root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open <http://127.0.0.1:8765/examples/loop-to-motion/>. Use Play/Pause, Stop and the position slider; all support keyboard input. No autoplay or native browser control bar is used. Reduced-motion preference keeps scene changes while freezing within-scene animation. No fonts, tracking, storage or external services are fetched by the example. Source/privacy links open their named external sites only when selected.

1. Check the source and CC0 licence. The local WAV is hash-verified before playback.
2. Listen, then review working tempo and first-beat offset. Check half/double-time interpretations; the correct starting phase cannot be inferred from a BPM number.
3. Enter a reviewer/project label and a review note. Only then confirm that you listened. This is a human attestation, not independent Pulse verification. Timing or review-text changes clear confirmation. Saved human attestations are bound to the source hash and exact timing settings; recomputing cuts with a prior review is rejected.
4. Download JSON and/or timing CSV. Both preserve source credit, licence, source hash/URLs, timing and the review record; JSON also carries the complete binding. Formula-like review text is prefixed with an apostrophe in CSV to keep spreadsheet imports inert; JSON retains the original text. A provisional export stays explicitly provisional. Keep the JSON with any editor import.

## Source and honest timing

[**Copper Step 120 drums**](https://pulse.studiosphere.space/open-loops/pol-original-copper-step-120-drums) — **StudioSphere Pulse**, [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/), original synthesis. The source WAV is eight seconds / 352,800 samples at 44.1 kHz, mono PCM16. Its SHA-256 and source/download URLs are in `source.json` and `assets/NOTICE.txt`. This is creator-defined 120 BPM metadata; **no Pulse analysis was run**. The source is not represented as listening-reviewed.

The default starting offset of zero is **provisional**. The demo does not supply a reviewed musical timing reference or prove audible alignment. It lets a human establish one. CC0 provenance does not guarantee immunity from third-party claims or takedowns. Audio retains CC0; example code and original graphics use this repository's MIT licence. The Pulse logo remains the existing brand asset.

Cuts use `offset + n × 4 × 60 / working_bpm`, calculated independently for each four-beat boundary, then rounded to the nearest frame. Frame zero begins the first scene; it includes any leading audio before the first reviewed beat. Offset means the first beat at or after file start and must be nonnegative and less than one beat. This example accepts 40–240 BPM and 24/30/60 fps. Audio is neither trimmed nor stretched.

At provisional 120 BPM / offset 0 / 30 fps, internal cuts are 2, 4 and 6 seconds (frames 60, 120 and 180). The endpoint is 8 seconds / 240 frames, excluded from the cut list. `grid_time_seconds` is the requested estimated boundary; `time_seconds` is its frame-rounded position. Rounding contributes at most half a frame. That arithmetic bound is **not** a guarantee of musical accuracy: phase error and tempo drift require listening review at the beginning, middle and end. A proposed acceptance criterion is within one frame of independently reviewed reference points; this has not been established by the arithmetic tests.

Graphics are original abstract motion studies, not audio-reactive analysis. Pulse BPM output provides tempo/confidence/count/candidates but no beat timestamps. This example does not detect downbeats, create music, control a DAW or certify beat-aligned cuts. It does not use or establish compatibility with Kling or another video provider.

## Discover the same loop through your existing Pulse connector

Use the canonical Streamable HTTP endpoint `https://mcp.studiosphere.space/mcp` and the [current connection guide](https://pulse.studiosphere.space/connect). Reuse a connector already present. Example tool arguments:

```json
{"tool":"search_open_loops","arguments":{"q":"Copper Step","license":"CC0-1.0","bpm_min":120,"bpm_max":120,"limit":4}}
```

Select the returned `pol-original-copper-step-120-drums`, then:

```json
{"tool":"get_open_loop","arguments":{"pol_id":"pol-original-copper-step-120-drums"}}
```

These are illustrative tool-name/argument pairs, not a raw JSON-RPC envelope. Preserve the returned licence, licence URL, attribution and source links. Free discovery needs no key. The bundled example can be used completely offline after starting the local server; it does not silently contact Pulse.

For your own authorized audio, optionally ask the existing connector for `estimate_cost` with only the needed tools. A quote is not consent. Preserve rights/permission/lawful-basis confirmation, explicit spending limits, minimum-charge acceptance and human-completed Checkout. Trial issuance requires approval and reconnection; OAuth/bearer MCP authentication is unsupported. An interrupted job resumes through its original `get_job_status` and bounded `continuation`, never an automatic replacement purchase. Read [the playbook](../../docs/agent-playbook.md). Neither local tests nor a rendered clip certify a Claude/ChatGPT/other-host workflow.

## Optional local MP4

Requires Node.js 20+ and existing FFmpeg with `libx264`/AAC. Tests additionally use FFprobe. No npm install, lifecycle hook or account is needed. SVG caption sources remain editable; their PNG counterparts are typeset with Avenir Next and shipped for headless rendering without a font dependency.

For a clearly labelled **provisional review preview**, from the repository root:

```sh
mkdir -p examples/loop-to-motion/output
node examples/loop-to-motion/render.mjs --allow-provisional --output examples/loop-to-motion/output/provisional.mp4
```

For a cut list you exported after your own listening review:

```sh
node examples/loop-to-motion/render.mjs --cuts '/absolute/path/pulse-motion-cuts.json' --output examples/loop-to-motion/output/reviewed.mp4
```

The renderer verifies the pinned local source, cut arithmetic and review state. It makes no network calls. Provisional input is refused unless explicitly allowed and receives a visible pending-review caption; a human-attested input receives a caption saying so. The MP4 also embeds the full cut-list JSON in its comment metadata and shows the CC0 source credit. Review names/notes travel with exported files: check them before sharing. It never invents a review. Existing outputs and symlinks are refused. If rendering fails, retain your source/cut list, inspect the error and retry only after fixing the local issue. Nothing is submitted to Pulse. Generated videos stay in the ignored `output/` folder; no media is uploaded automatically.

## Local checks

```sh
node --test examples/loop-to-motion/test.mjs examples/loop-to-motion/render-test.mjs
```

Tests cover exact source hash/PCM duration, provisional/human-attested states, independent frame rounding, invalid settings, modified exports, corrupted audio, output overwrite/symlink refusal and actual FFmpeg video duration, frame count, audio/video start times and scene changes. These establish technical timing only. Human review, musical phase, perceptual quality and editor-specific import behavior remain separate checks. No hosted CI, paid jobs, new keys or credentials are needed.
