# Pulse MCP free trial validation

On October 29, 2026 at 09:43 Toronto time, one explicitly approved trial completed the 180-second Copper Step CC0 demo through the production MCP JavaScript SDK. The original job remained recoverable after keyed and anonymous reconnections. No payment, token-pack purchase or second analysis was made.

## Observed journey

| Step | Result |
|---|---|
| Rights and source | First-party [CC0 provenance](https://pulse.studiosphere.space/assets/pulse-demo.json) verified for the canonical demo |
| Anonymous initialize | MCP `1.0.3`; free estimate available |
| Reviewed quote | BPM, key and waveform; 180 seconds; 47 estimated tokens, displayed $0.24 |
| Trial issuance | One key; 78 tokens; one analysis; 300-second initial cap; 24-hour expiry |
| Existing anonymous session | Balance remained `no_api_key`; issuing a key did not upgrade its authentication |
| Keyed reconnect | New session with the same issued key; allowance verified before processing |
| Submission | One approved `analyze_track` with the reviewed source/tools/estimate and lawful-basis attestation |
| Disconnect and resume | Keyed reconnect polled the original saved job; pending then completed |
| Result exits | MCP results, Studio notes and image content; result HTML, PNG and SVG returned HTTP 200 |
| Trial settlement | All three tools were cache hits; 10 tokens used, 68 remained; reported usage value $0.047; cash payment $0 |
| Remaining entitlement | `trial_allowance.state=used`, `analyses_remaining=0`; remaining tokens do not authorize another song |
| Fresh anonymous recovery | Same completed status and identical result data from the original job |

## Results and review context

- BPM candidate: **120.19**, confidence **1.0**, `estimated / needs_review`; warning `bpm_unknown_asset_type`.
- Musical-key candidate: **A minor**, confidence **0.812**, `estimated / needs_review`; warning `key_unknown_asset_type`. Alternatives included C major, A major and F major.
- Waveform: **3,602 peak values**, mono, 44.1 kHz; PNG **3,392 bytes**. No failed tools reported.
- BPM and key are estimates requiring review. Confidence values are not accuracy guarantees; preserve half-time/double-time and ambiguous-key checks.

The source's compositional metadata is 120 BPM/A minor, but one cached result is not a detector accuracy benchmark. This run verifies live trial admission, job delivery, token settlement and saved-job recovery. It does not prove fresh Python tool execution, a process restart/expired-session fault, second-analysis rejection or compatibility inside an LLM host.

## Retained evidence

- [Redacted event evidence](qa/pulse-cc0-trial-2026-10-29-evidence.json)
- [Studio notes with private job reference removed](qa/pulse-cc0-trial-2026-10-29-studio-notes.txt)
- [Delivered waveform PNG](qa/pulse-cc0-trial-2026-10-29-waveform.png)
- [Current compatibility matrix](mcp-compatibility.md)

The key and original job reference are retained only outside the checkout in a mode-0600 private recovery file under a mode-0700 directory. Public artifacts contain neither. Do not rerun trial issuance or resubmit this completed job for recovery.
