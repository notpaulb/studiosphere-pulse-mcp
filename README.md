# StudioSphere Pulse — Free Loops and Audio Intelligence MCP

Discover free, licensed loops and analyze authorized audio for BPM, musical key and waveform data. Start with free discovery and see estimated costs before paid analysis.

[Pulse](https://pulse.studiosphere.space) · [Connection guide](https://pulse.studiosphere.space/connect) · [Open Loops](https://pulse.studiosphere.space/open-loops) · [Quickstart](docs/pulse-mcp-quickstart.md)

## Start without an account

Try the anonymous browser demonstration on [the connection guide](https://pulse.studiosphere.space/connect): search one CC0 loop, retrieve its licence and source credit, then preview or download it. No key, account, analysis job or payment is created. This is a browser demonstration, not assistant-host certification.

Connect anonymously using **Streamable HTTP**:

```text
https://mcp.studiosphere.space/mcp
```

The product-domain [MCP entry](https://pulse.studiosphere.space/mcp) leads to the human `/connect` instructions; it is not the protocol endpoint.

Ask your assistant:

> Use Pulse to search for five free licensed loops. Get one with `get_open_loop` and show its preview, download, exact license and attribution. Do not create a key, account, analysis job or payment link.

Call `search_open_loops`, then `get_open_loop` with a returned `pol_id`. Retain the license, license URL and attribution with the sample. Follow each sample's terms; CC-BY samples require credit. Free discovery costs no tokens. Sample tags are creator hints; BPM and musical key are estimates requiring review.

## Connection examples and host limits

**Claude remote connector:** use **Customize → Connectors → Add custom connector**, enter StudioSphere Pulse and the anonymous URL above, choose **No sign in**, and enable the connector in the conversation. Labels and organization permissions can vary. Use the remote interface rather than local Desktop JSON configuration. See [Claude's instructions](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp).

**Claude Code:** the quoted URL also works with zsh query characters:

```bash
claude mcp add --transport http studiosphere-pulse 'https://mcp.studiosphere.space/mcp'
claude mcp list
```

This follows [Claude Code HTTP setup](https://code.claude.com/docs/en/mcp); it is not an actual Claude Code test result.

**Cline:** follow [Cline MCP setup](https://docs.cline.bot/mcp/mcp-overview), with an anonymous remote configuration:

```json
{
  "mcpServers": {
    "studiosphere-pulse": {
      "type": "streamableHttp",
      "url": "https://mcp.studiosphere.space/mcp"
    }
  }
}
```

**ChatGPT:** where custom MCP connections are available, the public URL with **No authentication** is the candidate discovery setup. ChatGPT cannot present custom Pulse API keys, and Pulse does not implement OAuth. Authenticated ChatGPT use is not supported by the current authentication boundary. See [OpenAI's custom MCP guide](https://developers.openai.com/api/docs/guides/custom-mcp-server) and [auth requirements](https://developers.openai.com/plugins/build/auth).

One paid workflow through an existing Claude connector was validated on October 12, 2026, including BPM/waveform results, receipt and automatic refund. Other host/authentication setups and real minimum-charge purchases remain untested. HTTP/SDK fixtures are separate evidence, not host certification or directory approval.

## Ten tools

| Tool | Key needed | Behavior |
|---|---|---|
| `search_open_loops` | No | Search free licensed samples. |
| `get_open_loop` | No | Exact license, attribution, preview and download. |
| `estimate_cost` | No | Free estimated cost/duration and quote ID. |
| `start_trial` | No | Creates a private temporary key; reconnect before use. |
| `analyze_track` | Yes | Submit authorized audio for BPM/key estimates and waveform. |
| `request_payment_link` | No | Creates one-off Checkout after rights confirmation; human completes payment. |
| `get_job_status` | No | Saved-job continuation, results and review notes. |
| `get_token_balance` | Yes | Private account/trial balance and allowance. |
| `list_token_packs` | No | Current tiers, including Starter. |
| `purchase_token_pack` | Yes | Creates Checkout to fund an account; human completes payment. |

For eligible quotes, `analysis_options.checkout.upfront_payment_estimate` previews the current upfront USD payment using Pulse's existing Checkout charge builder. It is not a reserved price or the charge on a saved link; review the hosted amount before paying. Admission follows the gateway's rounded-cent rule.

`structure` and `chords` are coming soon and unavailable. This public repository contains documentation and metadata, not the production implementation.

## Choose how to continue after a free estimate

`estimate_cost` works anonymously and now returns `analysis_options`. Read these before choosing a payment or trial tool:

- **One-off Checkout:** `checkout.eligible` checks the current admission minimum. `request_payment_link` requires explicit human approval and rights confirmation, but no Pulse account or API key. Present the saved link and the upfront `charged_display` when returned. A reused link may omit charge fields: review its hosted amount rather than treating the usage estimate as the charge. Checkout may collect a buffer, and minimum charges/refund thresholds can leave net payment above measured analysis cost. [Review pricing and refunds](https://pulse.studiosphere.space/terms#pricing).
- **Trial:** `trial.duration_within_public_policy` is advisory, not an entitlement. Get approval before creating a key, reconnect, and check the per-key allowance. Recover an existing trial instead of minting another key.
- **Banked tokens:** the estimate does not verify a balance. Use an existing trusted key-aware connection, check `get_token_balance`, and run `analyze_track` within an approved rights/spending scope. A trial key cannot buy packs.

No payment or key is created by estimation. Never increase analysis scope to reach a charge floor or automatically retry an uncertain purchase. MCP initialization also supplies this route-selection guidance; protocol/SDK validation remains separate from actual host compatibility.

## Resume one-off Checkout analysis

For eligible authorized audio, stay on the anonymous connection: estimate → review costs and rights → approve link creation → `request_payment_link` → human payment → `get_job_status`. No Pulse account, key or pack is required.

Save the returned `job_id`, `payment_url` and `continuation.review_url` privately before presenting `payment_url`. After payment or an interrupted connection, reconnect anonymously and call `get_job_status` for the same job. Follow `continuation`: human Checkout pauses for the user, waiting supplies a suggested interval and attempt limit, results need review, and recovery requires checking the saved job or contacting support. Pause after the waiting limit; do not create another analysis or purchase to resume it.

`continuation.financial_status_verified` is false. A link, redirect, completed analysis or analysis cost does not prove payment or refund settlement. Status and result pages cannot restore a lost Checkout link; contact support with the saved job ID rather than creating another purchase. Terminal Checkout result pages show billing separately; during recovery use the optional receipt API on demand; `receipt_api_url` is an existing on-demand REST read, not another MCP tool. SDK fixtures test reconnection and synthetic payment states, not real payments or assistant-host compatibility.

## Optional authorized audio trial

Create credentials only with the human's approval. First-time users can call `start_trial` for a private temporary key. **End the anonymous connection and reconnect to initialize with that key** in a trusted key-aware client. Authentication is bound at initialization; adding a key to a later request does not upgrade an existing session.

```text
https://mcp.studiosphere.space/mcp?api_key=YOUR_PULSE_API_KEY
```

This private URL illustrates the current transport, not universal host support. Quote it in shell commands. Query credentials can leak through client configuration, history or logs; never put real keys in shared prompts, screenshots, issues or version control. Pulse's MCP boundary **does not support OAuth or bearer authentication**. The REST API's Bearer support is a different interface.

Read `get_token_balance` for the per-key allowance. The October 7 live default is **78 tokens, up to 300 seconds, 24-hour expiry, one completed/partial URL analysis, at most two queued attempts if the first fails**. Read [live `/tools`](https://pulse.studiosphere.space/tools) and the returned allowance because configuration can differ. Remaining tokens do not grant a second song; no ongoing free tier is promised.

Authorized first-party example: [Copper Step CC0 MP3](https://pulse.studiosphere.space/assets/pulse-demo.mp3), 180 seconds; [CC0 provenance](https://pulse.studiosphere.space/assets/pulse-demo.json).

1. Call `estimate_cost` with that URL and selected tools; review cost and duration.
2. Confirm rights, permission, lawful access or another legal basis to submit the audio.
3. Call `analyze_track` with the quote ID and `attestation_confirmed: true`.
4. Poll `get_job_status`; review BPM/key estimates and confidence notes.

If interrupted, retain the private key/job ID, reconnect and poll before retrying. Do not mint another key or resubmit an uncertain job. If pricing changes, request a fresh free estimate and obtain approval again before processing or payment.

## Estimated costs and ongoing use

Live October 7 defaults: $0.005/token, cached analysis $0.001/token; waveform 0.06, BPM 0.10 and key 0.10 tokens/second, rounded up per tool. A three-minute full-suite example estimates **47 tokens, exact $0.235 displayed $0.24**; five minutes estimates **78 tokens/$0.39**. Final costs use measured duration; request a fresh estimate, not a fixed-price promise.

[Current packs](https://pulse.studiosphere.space/account/packs): Starter **1K/$5**, 10K/$50, 50K/$250, 200K/$1,000 (USD). Read `list_token_packs` before purchase. Banked usage has no per-job minimum; one-off Checkout has a **$0.50 minimum**. A short track can stay below that floor; do not increase scope just to trigger a charge.

Humans fund accounts through the [token shop](https://pulse.studiosphere.space/tokens). Agents need a trusted key-aware connection, a spending limit and an authorized rights policy. Checkout creation is not payment success. Refund requests, pending refunds and confirmed money returned are different states; consult receipts and support for attention cases.

## Privacy, support and discovery

Audio is processed for analysis and not stored as user audio; temporary processing can use disk. Stripe hosts payment entry; Pulse retains operational account/job/billing records and payment identifiers. See the [privacy policy](https://pulse.studiosphere.space/privacy) for privacy and retention details. Public pages also request typography from Google Fonts.

[Terms](https://pulse.studiosphere.space/terms) · [API docs](https://pulse.studiosphere.space/docs) · [Machine-readable journey](https://pulse.studiosphere.space/.well-known/pulse/agent-journey.json) · [MCP health](https://mcp.studiosphere.space/health)

Existing listings: [Official Registry](https://registry.modelcontextprotocol.io/v0.1/servers?search=space.studiosphere%2Fpulse) (`space.studiosphere/pulse`,1.0.3), [Smithery](https://smithery.ai/servers/studiosphere/pulse), [Glama connector](https://glama.ai/mcp/connectors/space.studiosphere/pulse). A listing is not a compatibility endorsement.

Support/security questions: **support@studiosphere.space**. Never send your API key.

Operated by StudioSphere Inc., Quebec, Canada. See `LICENSE` for this documentation repository; sample rights are defined by each sample's own license.

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
