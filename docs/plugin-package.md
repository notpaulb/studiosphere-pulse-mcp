# StudioSphere Pulse portable plugin

Publisher/developer: **StudioSphere Inc.** Plugin version: **0.1.0**.

The root `plugin.json` identifies the package. Root `mcp.json` configures one
remote Streamable HTTP server: https://mcp.studiosphere.space/mcp. The PNG in
`assets/icon.png` reuses the existing Pulse mark at 400 by 400 pixels.

## Installation and access

Cursor: copy the repository into a fresh folder under
`~/.cursor/plugins/local/studiosphere-pulse`, reload Cursor, and check Customize
for the local plugin and ten connected tools. Do not overwrite an existing
installation. Follow organization policy for local plugin imports.

OpenAI: package `plugin.json`, `mcp.json`, `LICENSE`, `assets/icon.png` and the
public documentation into a ZIP with the manifests at its root. Public submission
requires a verified business publisher, portal MCP setup, review materials and
automated checks. A personal import does not establish public acceptance or the
final publisher identity.

The plugin advertises six read-only tools and four write-style tools. Installation
does not make every call read-only. Review host tool approval settings. Trial and
Checkout creation require the relevant human approval; humans complete payment.
Analysis requires rights, permission, lawful access or another legal basis.

The public package supplies no credentials. `analyze_track`, `get_token_balance`
and `purchase_token_pack` return missing-key guidance on an anonymous connection.
OAuth and header authentication are not implemented. Trial issuance creates a
private temporary key and requires a fresh authenticated connection; authenticated
workflows are outside this public plugin's validated scope. Never commit or share
private connection URLs, keys, saved payment links or job references.

## Validation evidence — October 12, 2026

Both manifests passed the canonical Agent Plugins JSON schemas. The original
five-file ZIP matched its source and passed archive integrity, file allowlist,
credential-pattern and PNG-dimension checks. SDK validation connected anonymously,
listed ten tools, searched/retrieved a sample with licence and attribution, obtained
a free CC0-demo estimate, listed current token packs and confirmed missing-key
errors for the three account tools.

Actual Cursor Agents validation using Grok 4.7 High Fast:

- Loop search returned eight original 120 BPM percussion samples.
- A selected loop returned exact CC0 licence, attribution, preview and downloads.
- The demo estimate returned 180 seconds, 47 tokens and estimated USD 0.235.
  The minimum-charge offer was not accepted; this is a dated observation, not
  a fixed-price promise.
- Current pack information and anonymous balance rejection were observed.
- A combined stems/chords estimate returned `tool_coming_soon` for chords. This
  does not isolate stems behavior or test processing enforcement.
- Estimate-only and missing-lawful-basis scenarios caused no observed analysis,
  trial issuance, Checkout creation or purchase. Host restraint does not prove
  every server-side guard.

OpenAI personal import accepted the original archive, metadata, icon and MCP
configuration. Runtime host validation is incomplete. Paid workflows, trial/key
creation and account spending were not certified by these package checks.

MIT applies to the public package and documentation. Audio samples retain their
own exact licences and attribution requirements. No production code or private
operational evidence is included. Security reports: support@studiosphere.space.

## References

- [Cursor plugin formats and publishing](https://cursor.com/docs/plugins)
- [Cursor marketplace security](https://cursor.com/help/security-and-privacy/marketplace-security)
- [OpenAI packaging](https://developers.openai.com/plugins/build/plugins)
- [OpenAI submission](https://developers.openai.com/plugins/deploy/submission)
