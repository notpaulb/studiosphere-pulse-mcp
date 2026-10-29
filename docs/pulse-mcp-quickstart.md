# Pulse MCP quickstart

Current workflow evidence is maintained in [the compatibility matrix](mcp-compatibility.md). On October 29, 2026, one approved production SDK trial completed the 180-second CC0 demo through keyed reconnection, analysis, results and fresh anonymous saved-job recovery. All three tools were cache hits. This verifies trial delivery and recovery, not fresh detector execution or an LLM-host workflow. See [the redacted trial report](pulse-mcp-trial-validation-2026-10-29.md).

Discover free, licensed loops and analyze authorized audio for BPM, musical key and waveform data. Start with free discovery and see estimated costs before paid analysis.

## Useful first connection

Human guide: https://pulse.studiosphere.space/connect (also reached from the product `/mcp` entry). The actual Streamable HTTP endpoint is:

```text
https://mcp.studiosphere.space/mcp
```

Connect without authentication. Call `search_open_loops`, then `get_open_loop` for a returned `pol_id`. Show preview/download and preserve license, license URL and attribution; follow each sample's terms. No key, account, tokens or payment is needed.

Claude: open the existing [StudioSphere Pulse Community listing](https://claude.ai/directory/studiosphere-pulse), published by StudioSphere Inc. Reuse Pulse if already connected; do not add a second connector. Community means automated review, not Anthropic verification. Workspace availability can vary. Manual remote setup uses Customize → Connectors → Add custom connector, the public endpoint and No sign in. Do not use Desktop's local configuration editor for this remote connection.

After free discovery, use the analysis-task builder on `/connect#one-off-analysis`: choose an accessible public HTTPS audio URL and only the tools your project needs. BPM and key are initially selected; waveform is optional. Review and copy the estimate-only task to your existing connected assistant. The initial Copper Step demo retains its CC0 licence and source credit; changing to your own URL does not assign it the demo's licence. Choices remain on the page without a network request or storage. URLs with recognized credential or signed-query parameters are rejected; this cannot identify every private link. Keep all private keys and signed links out, and use the browser analysis flow for local files. Copy failure opens selectable text for manual copying.

The task requests one free estimate, separates estimated analysis cost from upfront/minimum Checkout costs, and describes conditional Studio notes without inventing analyzed results. It stops before payment, analysis or credential creation. Preserve lawful-basis confirmation and explicit spending approval before later processing. Resume an existing saved job rather than starting another purchase. The existing homepage quote handoff remains the path for a quote you already obtained.

Claude Code candidate command (quoted for zsh):

```bash
claude mcp add --transport http studiosphere-pulse 'https://mcp.studiosphere.space/mcp'
claude mcp list
```

Host-specific instructions and primary references are on `/connect`. Two scoped workflows through one existing configured Claude connector were validated on October 12, 2026: buffered Checkout with an automatic refund, and explicit minimum-charge Checkout after tool refresh and a fresh conversation. The short-track BPM/key/waveform job completed; provider-backed receipts confirmed US$0.50 captured, US$0 refunded and US$0.50 net. This does not certify anonymous initialization, OAuth, trial/banked-token workflows, other hosts or live over-cap rejection; cap rejection and uncertain-submission controls have local fixture evidence. ChatGPT cannot present custom Pulse API keys; Pulse currently has no OAuth flow.

## Optional trial, with human approval

`start_trial` creates a private temporary key. End the anonymous connection and reconnect to initialize with the private query-key URL in a trusted client before using it. A later request key does not upgrade an existing session. MCP OAuth and bearer authentication are unsupported; REST Bearer support is separate.

```text
https://mcp.studiosphere.space/mcp?api_key=YOUR_PULSE_API_KEY
```

Keep actual keys out of shared logs, screenshots, prompts and version control. Query URLs can leak through client history/configuration. Do not create or rotate credentials automatically.

Read `get_token_balance` for the returned allowance. The October 29 issued trial had 78 tokens, a 300-second initial cap, 24-hour expiry, one completed/partial URL analysis and at most two queued attempts if the first fails. Read live https://pulse.studiosphere.space/tools; configuration and per-key limits may differ. Unused tokens do not grant another song.

Use the original 180-second CC0 example when it fits the allowance:
https://pulse.studiosphere.space/assets/pulse-demo.mp3

Provenance/license: https://pulse.studiosphere.space/assets/pulse-demo.json

Call `estimate_cost`, review the estimate, confirm rights/permission/lawful access/another legal basis, then `analyze_track` with the quote ID and `attestation_confirmed:true`. Poll `get_job_status`; BPM and musical key are estimates requiring review. Structure and chords are unavailable roadmap items.

For eligible quotes, `analysis_options.checkout.upfront_payment_estimate` previews the current upfront USD payment using Pulse's existing Checkout charge builder. It is not a reserved price or the charge on a saved link; review the hosted amount before paying. Admission follows the gateway's rounded-cent rule.

If interrupted, retain the private key and job ID, reconnect and poll before retrying. Do not mint another key or resubmit an uncertain job. On `estimate_pricing_changed`, get a fresh free estimate and obtain approval again before processing or payment.

## Ongoing analysis

October 7 default three-minute BPM/key/waveform example estimates 47 tokens, exact $0.235 displayed $0.24; five minutes estimates 78 tokens/$0.39. Final costs use measured duration and cache hits; cached usage may settle below the fresh-tool estimate. Current tiers are returned by `list_token_packs`, including 1K/$5 Starter; do not rely on fixed examples for purchasing. One-off Checkout has a $0.50 floor; banked usage has no per-job minimum.

Private account flow: `get_token_balance` → `estimate_cost` → review cost/rights → `analyze_track` → `get_job_status`. Checkout-link creation is not collected revenue. Keep paid promotion gated on payment/refund readiness and tested host authentication.

[Privacy](https://pulse.studiosphere.space/privacy) · [Terms](https://pulse.studiosphere.space/terms) · [Docs](https://pulse.studiosphere.space/docs) · [Journey inventory](https://pulse.studiosphere.space/.well-known/pulse/agent-journey.json)

Support: support@studiosphere.space; never send a key.

## Studio notes for your creative workflow

Before spending approval, read `estimate_cost.analysis_options.result_delivery`. It describes the selected analysis deliverable: Studio notes for a DAW session, sample-library tags or project notes. This is advisory, not an analyzed result or a reason to add tools the user does not need.

After analysis, `get_job_status` may include `studio_notes` only when the job is `completed` or `partial` with usable observed results. Paste the notes into your DAW session or project notes. Preserve warnings, provenance, suppressed values and failed tools; do not fill in missing values or infer structure/chords. BPM and key are estimates requiring review, including half-time/double-time tempo checks and ambiguous key centers. Keep the job ID private when sharing.

`studio_notes` is not payment confirmation. Read receipts/refund evidence separately and on demand. The notes add no MCP tool or input, do not include audio or the source URL, and grant no spending or rights approval. Local fixture evidence does not establish a new paid-host test or conversion uplift.

## Estimate continuation options

On the [Pulse homepage](https://pulse.studiosphere.space/), **Copy task for Claude** appears after a current anonymous free estimate. It copies the source, selected tools and advisory quote, including the estimated upfront payment and any minimum final-cost floor. It makes no API call and grants no payment consent. The action is unavailable with a key, after submission or uncertainty, or when the quote expires or its source changes. Review the private quote and URL before sharing them with your existing Pulse connector; confirm rights and explicitly approve spending before human-completed Checkout. After interruption, preserve and poll the original saved job rather than buying again. This new handoff has local browser clipboard and helper-fixture evidence only; the two previously validated existing-connector Checkout workflows do not constitute an actual host test of it. No new MCP tool is added.

Read `estimate_cost.analysis_options`. An eligible anonymous one-off quote can use `request_payment_link` without a Pulse key, after explicit link-creation approval and rights confirmation. The human reviews and completes hosted Checkout. A buffer, measured-cost floor and refund thresholds can keep net payment above measured analysis cost; read https://pulse.studiosphere.space/terms#pricing. Reused links can omit charge fields; never present `cost_display` as the captured amount.

Trial duration fit is not entitlement: approval is required before key issuance, then reconnect and verify the per-key allowance. Banked analysis requires an existing initialized key and separately verified balance. These are advisory choices, not paid-host certification or automatic purchase authority.

## Resume anonymous one-off analysis

An eligible estimate can continue through `request_payment_link` without an account or key, after rights confirmation and explicit human approval. Save its `job_id`, `payment_url` and `continuation.review_url` privately, then present the Checkout link for hosted amount review and human payment. After the human returns or a disconnected session, reconnect anonymously and call `get_job_status` for that same job. Follow its advisory `continuation` and pause after the suggested waiting limit. Never create a replacement purchase simply to resume.

Analysis completion is not receipt/refund evidence: `financial_status_verified` remains false. Status and result pages cannot restore a lost Checkout link; contact support with the saved job ID instead of creating another purchase. Review terminal Checkout billing on the saved result page, or during recovery read the existing REST `receipt_api_url` on demand; it is not an MCP tool. Local SDK fixtures cover this handoff with synthetic states; two scoped existing-connector Claude Checkout workflows, including one minimum-charge purchase, were validated separately. Anonymous Claude initialization, other host/authentication setups and live over-cap rejection remain unverified.

## Explicit short-track Checkout offer

Below the normal admission minimum, `checkout.eligible` remains false. Read
`analysis_options.checkout.minimum_charge_offer`, when present. Show the estimated
upfront payment and `minimum_final_cost_usd`; the existing final-cost floor is
US$0.50, and refund thresholds can leave a higher net payment. Free trial and
already-funded tokens remain alternatives. Never increase analysis scope to qualify.

Only after explicit human acceptance, call `request_payment_link` with the same
`job_estimate_id`, `attestation_confirmed:true`, `accept_minimum_charge:true`, and
`max_upfront_amount_cents` set to the approved upfront ceiling in whole USD cents.
Rights approval alone is not spending approval. A quote or buffer change above that
ceiling returns `checkout_amount_exceeds_approval` before a new purchase is created.
Review again; never raise the ceiling or retry automatically. On interruption,
retain the original job and payment link privately and poll that job. Live minimum-charge completion and receipt evidence covers the one scoped Claude purchase described above; live over-cap rejection and broader host compatibility remain unverified.

## Existing Claude connector: stale tools or interrupted chat

Use these steps only if an existing StudioSphere Pulse connector is missing the new `request_payment_link` fields. In Claude, open **Settings → Customize → Connectors → Yours → StudioSphere Pulse → More options → Refresh tools list** (labels can vary). Keep the saved connector URL, private key and tool approval permissions unchanged; do not remove/recreate the connector or create a new key.

Start a **fresh conversation using the same existing connector**. A refresh did not update the already-open conversation in the observed test. Confirm the loaded tool includes `accept_minimum_charge` (boolean) and `max_upfront_amount_cents` (integer) before any approved minimum-charge request. If those fields are still missing, stop and contact support; do not submit using the older schema or omit the acceptance/ceiling.

Carry the original `job_id`, `payment_url` and `continuation.review_url` privately into the fresh conversation. After an interruption, call `get_job_status` for the original saved job; never create a replacement purchase, new analysis or new key to resume it. If the payment URL is lost, contact support. Refreshing tools or starting a chat is not spending approval: the human must explicitly accept the minimum final cost and upfront ceiling and complete Checkout themselves.

## Search interpretation

In the prepared MCP user-experience release, musical-key filters accept common spellings such as `Am` and `a minor` for `A minor`; major/minor remain distinct. Enharmonic spellings and Camelot codes are not converted. BPM, pack and licence constraints are never silently widened.

Keyword search ranks any matching term. Read each returned `search_match`: `matched_terms`, `missing_terms` and `complete` distinguish partial results. A drums-only match for “lofi drums” does not establish a lo-fi genre. Empty results remain empty; ask before relaxing a hard filter. Older deployments may omit this additive field. These explanations are query matching, not musical quality or harmonic-fit scores. Preserve exact licence, licence URL and attribution, and audition samples before use.

## Choose an assistant host

The prepared connection guide offers Claude, Claude Code, Cursor, Codex, ChatGPT, Gemini CLI, Cline and generic transport instructions. Existing connections should be reused. Guides start with anonymous licensed discovery or a free estimate, retain the selected source/tools, and do not create credentials, jobs or payment links. Gemini CLI uses `httpUrl`; this is not consumer Gemini Connected Apps certification. Codex CLI/IDE uses `codex mcp add studiosphere-pulse --url 'https://mcp.studiosphere.space/mcp'`. Cursor manual configuration uses a remote `url` entry. Setup instructions are candidates until the specific host workflow is tested; the recorded Cursor/Grok plugin and existing-Claude-Checkout evidence remain scoped as shown in the compatibility matrix.

References checked October 29: [Codex](https://developers.openai.com/learn/docs-mcp), [Cursor](https://cursor.com/docs/mcp), [Gemini CLI](https://geminicli.com/docs/tools/mcp-server/), [ChatGPT](https://developers.openai.com/api/docs/guides/custom-mcp-server), [Claude Code](https://code.claude.com/docs/en/mcp) and [Cline](https://docs.cline.bot/mcp/mcp-overview).
