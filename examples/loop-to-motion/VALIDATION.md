# Local validation — October 17, 2026

Source base: public repository `14aa86b`. This example is not a production server change or a new package. No hosted CI, paid analysis, trial/account/credential creation, directory submission or video-provider call was used.

## Passed

- `node --test examples/loop-to-motion/test.mjs examples/loop-to-motion/render-test.mjs`: 16 tests, zero failures. Node 22.22.2, FFmpeg/FFprobe 8.1 on macOS.
- Pinned CC0 WAV: 705,644 bytes; 352,800 mono PCM16 frames at 44.1 kHz; eight seconds. SHA-256 matches `source.json` and the exact live Open Loops download.
- Actual local MP4: 240 frames at 30 fps, eight seconds, audio/video start-time difference below one frame. Decoded frames around all three cuts match the shared renderer with compression tolerance. Visible provisional/CC0 caption and embedded source/review JSON verified.
- Fractional 119.7 BPM / 0.037-second offset / 24 fps grid: independently calculated boundaries round within half a frame. This is arithmetic, not measured musical accuracy.
- Invalid settings/source, changed timing with an old review, changed exports, corrupted audio, preexisting output/symlink, missing/crashing FFmpeg and owned temporary-file cleanup checks.
- Actual Chrome keyboard playback, Stop and slider seeking; fractional-offset/24 fps changes; synthetic review confirmation followed by invalid input cleared review badge, canvas, timeline and exports. The synthetic confirmation was discarded; it is not listening approval.
- Actual Chrome-downloaded JSON and CSV parsed and validated against the source, review state and expected cuts.
- Chrome at 390 × 760: no horizontal overflow; player precedes review form. Desktop layout checked. Temporary viewport override reset. Browser console reported no warnings/errors on the final clean load.
- JavaScript syntax, JSON examples/manifests and patch whitespace checks. Root plugin/MCP/Registry manifests unchanged.

## Limits

No human musical listening review or first-beat offset approval is claimed. Default timing and the generated preview remain provisional. Half/double-time interpretation, audible phase/drift and perceptual quality need a listener. Encoder start times do not by themselves prove perceptual synchronization. Editor imports, other browsers/assistant hosts, actual reduced-motion preference emulation and the 60-second renderer timeout were not exercised. The reduced-motion branch freezes within-scene animation when the browser preference is enabled. No Pulse–Kling compatibility is established.

Download automation did not return its event path; actual Chrome-created files in Downloads were subsequently read and validated. This was a browser-control limitation, not a claimed successful event assertion.

Independent review found stale attestation/visual-state and export-provenance gaps. They were reproduced, corrected and covered with fresh local checks; no remote publication was performed. Keep reviewing names/notes before sharing exports: they accompany the files.
