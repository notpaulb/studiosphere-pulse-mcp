# Pulse MCP compatibility and evidence

Reviewed October 29, 2026. Compatibility belongs to a specific host, authentication method and workflow. A listing, package import or SDK test does not establish every workflow in that host. This document is the current evidence index; dated reports retain their original scope.

Release preparation: runtime/package/descriptor candidate **1.0.4** contains the UX changes. The latest verified production runtime and official Registry observation below remain **1.0.3** until deployment/publication is separately verified. A public-repository push does not itself publish to the Registry.

## Connection contract

| Property | Current contract |
|---|---|
| Product and human setup | https://pulse.studiosphere.space/connect |
| Protocol endpoint | `https://mcp.studiosphere.space/mcp` |
| Transport and identity | Streamable HTTP; `space.studiosphere/pulse`; MCP version `1.0.3` observed October 29 |
| Anonymous operations | Licensed-loop search/retrieval, free estimates, saved-job status and token-pack information |
| Trial and banked analysis | Private query key bound during `initialize`; reconnect after obtaining a key |
| OAuth and MCP Bearer | Unsupported; REST Bearer authentication is a separate interface |
| Analysis outputs | BPM and musical-key estimates requiring review; waveform peak data |
| Unavailable outputs | Transcription, stems, mastering, loudness correction, chords and structure analysis |

Use a host's remote MCP connection interface. The product-domain `/mcp` leads to human instructions and is not the protocol endpoint. Keep real keys, keyed URLs, job references and payment links private. Do not change an existing connector or create replacement credentials to recover a job.

## Workflow evidence

| Host or client | Model | Observed workflow | Evidence date and scope |
|---|---|---|---|
| MCP JavaScript SDK against production | No LLM | Anonymous connection, ten tools, licensed-loop search/retrieval, preview/WAV/attribution, free estimates and reconnect | October 29: live audit; protocol evidence |
| MCP JavaScript SDK against production | No LLM | One approved CC0 trial, keyed initialization, analysis submission, keyed reconnect, completed results, waveform/Studio notes, fresh anonymous recovery of the same job | October 29: [trial evidence](pulse-mcp-trial-validation-2026-10-29.md); all tools were cache hits; no fresh detector or assistant-host certification |
| Existing configured Claude connector | Not recorded in the scoped report | Buffered Checkout/refund and explicitly accepted minimum-charge Checkout | October 12: two human-completed purchases; fresh anonymous onboarding, trial, banked spending and live cap rejection remain unverified |
| Cursor Agents portable-plugin import | Grok 4.7 High Fast | Anonymous loop discovery, licence/attribution, estimate, pack information and missing-key response; bounded negative prompts | October 12: [published package evidence](https://github.com/notpaulb/studiosphere-pulse-mcp/blob/main/docs/plugin-package.md); trial, paid analysis and purchases were not run |
| OpenAI personal plugin import | Not recorded | Package, icon and manifest import | October 12: import only; runtime workflow and public publisher acceptance unverified |
| Claude Code, ChatGPT runtime, Codex runtime, Gemini, Cline | Not tested in this audit | Candidate remote setup depends on host features and workspace permissions | No new runtime certification; consult current host documentation before setup |
| Smithery | Not applicable to direct Pulse endpoint | Directory discovery is distinct from a client/proxy workflow | Existing configuration uses Pulse directly; managed proxy retirement is October 31; installed-client reliance remains to be checked |

Historical Claude purchases are operator QA, not organic acquisition or evidence for another host. Cursor/Grok evidence is specific to its recorded tasks. No host inherits SDK trial evidence.

## Trial and recovery sequence

1. Obtain explicit approval to issue one temporary key and run the selected tools on audio the user has rights, permission, lawful access or another legal basis to submit. Existing approval may cover a defined batch and spending limit.
2. Call `estimate_cost`; review its duration, tokens, expiry and advisory `analysis_options`. Read current public `trial_policy` from `/tools`.
3. With approval, call `start_trial` once. Store its key privately. End the anonymous connection and initialize a new connection with that same key.
4. Call `get_token_balance`; verify per-key `trial_allowance`, remaining analyses, duration and sufficient tokens. Public duration fit is not entitlement.
5. Call `analyze_track` with the same source/tools, current estimate ID and `attestation_confirmed:true`. Save the returned job reference privately.
6. After interruption, reconnect and call `get_job_status` for that original job. Status can be read anonymously. Follow bounded polling guidance; do not resubmit an uncertain job or mint another trial.
7. Review available results and `studio_notes`, preserving provenance, warnings, suppressed values and failed tools. Confidence is not an accuracy guarantee. Save outputs before their retention window ends.

The October 29 issued allowance was 78 tokens, one analysis, a 300-second initial cap and 24-hour expiry. These are dated observations, not a guaranteed grant. One completed or partial analysis consumes the trial even if tokens remain; always read the returned per-key allowance.

## Prices and financial evidence

Read `estimate_cost`, `/tools` and `list_token_packs` for current prices. Distinguish the analysis estimate, trial/banked token settlement, upfront Checkout amount and final payment/refund evidence. Cache hits may lower settled usage below a fresh-tool estimate.

For a below-minimum Checkout offer, show `minimum_final_cost_usd` and `upfront_payment_estimate`, then obtain explicit acceptance before sending `accept_minimum_charge:true` and an approved `max_upfront_amount_cents`. Rights confirmation alone is not spending approval. Humans complete Checkout. Preserve the original job/payment link; results and Studio notes are not receipts.

## Maintaining consistency

- Keep this matrix, the quickstart, README, `llms.txt`, `llms-full.txt` and machine journey metadata aligned when evidence changes.
- Use the same current guides in the private production repository and public documentation repository. Publishing docs does not deploy production files.
- Treat versioned release reports and dated validation notes as historical evidence; add a dated supersession pointer rather than rewriting their original observations.
- Record host, model, authentication, workflow, date, actual outcome and limits for each new test. Exclude secrets and private job/payment references.
- Do not resubmit existing directory entries or send correction requests without the existing exact-copy/destination approvals.

## Choose an assistant host

The prepared connection guide offers Claude, Claude Code, Cursor, Codex, ChatGPT, Gemini CLI, Cline and generic transport instructions. Existing connections should be reused. Guides start with anonymous licensed discovery or a free estimate, retain the selected source/tools, and do not create credentials, jobs or payment links. Gemini CLI uses `httpUrl`; this is not consumer Gemini Connected Apps certification. Codex CLI/IDE uses `codex mcp add studiosphere-pulse --url 'https://mcp.studiosphere.space/mcp'`. Cursor manual configuration uses a remote `url` entry. Setup instructions are candidates until the specific host workflow is tested; the recorded Cursor/Grok plugin and existing-Claude-Checkout evidence remain scoped as shown in the compatibility matrix.

References checked October 29: [Codex](https://developers.openai.com/learn/docs-mcp), [Cursor](https://cursor.com/docs/mcp), [Gemini CLI](https://geminicli.com/docs/tools/mcp-server/), [ChatGPT](https://developers.openai.com/api/docs/guides/custom-mcp-server), [Claude Code](https://code.claude.com/docs/en/mcp) and [Cline](https://docs.cline.bot/mcp/mcp-overview).

## Analysis response delivery measurement

The prepared UX release adds identifier-free `mcp_analysis_workflow` events, separate from existing anonymous discovery and estimate/purchase attribution. Phases are `estimate_delivered`, `analysis_submission_acknowledged` and `usable_result_delivered`, once per initialized connection after a successful HTTP response finishes. Key-aware connections can contribute; stateless recovery and aborted responses do not. Reconnecting creates another connection, not another identified person.

Only event/schema_version/phase/client_kind/observed_at are emitted. No job/quote references, content hashes, audio URLs, keys, caller names or user text enter these new events. The explicit approved-trial QA client is classified as declared validation; labels remain spoofable. Completed/partial results need a positive BPM candidate, nonempty key candidate or usable waveform; failed/suppressed-only results do not count. A partial result with one failed tool and another usable output can count. Warnings and result delivery remain unchanged.

The existing journal report adds a separate `analysis` section with aggregate counts and incomplete-coverage caveats. Missing analysis observations are unavailable, not historical zero. These counts are not unique users, confirmed client consumption, purchases, fresh detector execution or an organic conversion rate. Existing `mcp_estimate` attribution stays separate and unchanged.
