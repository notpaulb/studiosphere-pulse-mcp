# Pulse MCP quickstart

Discover free, licensed loops and analyze authorized audio for BPM, musical key and waveform data. Start with free discovery and see estimated costs before paid analysis.

## Useful first connection

Human guide: https://pulse.studiosphere.space/connect (also reached from the product `/mcp` entry). The actual Streamable HTTP endpoint is:

```text
https://mcp.studiosphere.space/mcp
```

Connect without authentication. Call `search_open_loops`, then `get_open_loop` for a returned `pol_id`. Show preview/download and preserve license, license URL and attribution; follow each sample's terms. No key, account, tokens or payment is needed.

Claude remote setup uses Customize → Connectors → Add custom connector, the public endpoint and No sign in; organization permissions and labels can vary. Do not use Desktop's local configuration editor for this remote connection.

Claude Code candidate command (quoted for zsh):

```bash
claude mcp add --transport http studiosphere-pulse 'https://mcp.studiosphere.space/mcp'
claude mcp list
```

Host-specific instructions and primary references are on `/connect`. Actual Claude, ChatGPT, Cline and Smithery host tests are unperformed; SDK/protocol checks are distinct. Paid-host support is unverified. ChatGPT cannot present custom Pulse API keys; Pulse currently has no OAuth flow.

## Optional trial, with human approval

`start_trial` creates a private temporary key. End the anonymous connection and reconnect to initialize with the private query-key URL in a trusted client before using it. A later request key does not upgrade an existing session. MCP OAuth and bearer authentication are unsupported; REST Bearer support is separate.

```text
https://mcp.studiosphere.space/mcp?api_key=YOUR_PULSE_API_KEY
```

Keep actual keys out of shared logs, screenshots, prompts and version control. Query URLs can leak through client history/configuration. Do not create or rotate credentials automatically.

Read `get_token_balance` for the returned allowance. October 7 defaults are 78 tokens, up to 300 seconds, 24-hour expiry, one completed/partial URL analysis and at most two queued attempts if the first fails. Read live https://pulse.studiosphere.space/tools; configuration and per-key limits may differ. Unused tokens do not grant another song.

Use the original 180-second CC0 example when it fits the allowance:
https://pulse.studiosphere.space/assets/pulse-demo.mp3

Provenance/license: https://pulse.studiosphere.space/assets/pulse-demo.json

Call `estimate_cost`, review the estimate, confirm rights/permission/lawful access/another legal basis, then `analyze_track` with the quote ID and `attestation_confirmed:true`. Poll `get_job_status`; BPM and musical key are estimates requiring review. Structure and chords are unavailable roadmap items.

For eligible quotes, `analysis_options.checkout.upfront_payment_estimate` previews the current upfront USD payment using Pulse's existing Checkout charge builder. It is not a reserved price or the charge on a saved link; review the hosted amount before paying. Admission follows the gateway's rounded-cent rule.

If interrupted, retain the private key and job ID, reconnect and poll before retrying. Do not mint another key or resubmit an uncertain job. On `estimate_pricing_changed`, get a fresh free estimate and obtain approval again before processing or payment.

## Ongoing analysis

October 7 default three-minute BPM/key/waveform example estimates 47 tokens, exact $0.235 displayed $0.24; five minutes estimates 78 tokens/$0.39. Final costs use measured duration. Current tiers are returned by `list_token_packs`, including 1K/$5 Starter; do not rely on fixed examples for purchasing. One-off Checkout has a $0.50 floor; banked usage has no per-job minimum.

Private account flow: `get_token_balance` → `estimate_cost` → review cost/rights → `analyze_track` → `get_job_status`. Checkout-link creation is not collected revenue. Keep paid promotion gated on payment/refund readiness and tested host authentication.

[Privacy](https://pulse.studiosphere.space/privacy) · [Terms](https://pulse.studiosphere.space/terms) · [Docs](https://pulse.studiosphere.space/docs) · [Journey inventory](https://pulse.studiosphere.space/.well-known/pulse/agent-journey.json)

Support: support@studiosphere.space; never send a key.

## Estimate continuation options

Read `estimate_cost.analysis_options`. An eligible anonymous one-off quote can use `request_payment_link` without a Pulse key, after explicit link-creation approval and rights confirmation. The human reviews and completes hosted Checkout. A buffer, measured-cost floor and refund thresholds can keep net payment above measured analysis cost; read https://pulse.studiosphere.space/terms#pricing. Reused links can omit charge fields; never present `cost_display` as the captured amount.

Trial duration fit is not entitlement: approval is required before key issuance, then reconnect and verify the per-key allowance. Banked analysis requires an existing initialized key and separately verified balance. These are advisory choices, not paid-host certification or automatic purchase authority.

## Resume anonymous one-off analysis

An eligible estimate can continue through `request_payment_link` without an account or key, after rights confirmation and explicit human approval. Save its `job_id`, `payment_url` and `continuation.review_url` privately, then present the Checkout link for hosted amount review and human payment. After the human returns or a disconnected session, reconnect anonymously and call `get_job_status` for that same job. Follow its advisory `continuation` and pause after the suggested waiting limit. Never create a replacement purchase simply to resume.

Analysis completion is not receipt/refund evidence: `financial_status_verified` remains false. Status and result pages cannot restore a lost Checkout link; contact support with the saved job ID instead of creating another purchase. Review terminal Checkout billing on the saved result page, or during recovery read the existing REST `receipt_api_url` on demand; it is not an MCP tool. Local SDK fixtures cover this handoff with synthetic states; one separate existing Claude connector paid workflow was validated, while minimum-charge purchases and other host setups remain untested.

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
retain the original job and payment link privately and poll that job. These are
local protocol/fixture-tested controls, not evidence of a real minimum-charge purchase.
