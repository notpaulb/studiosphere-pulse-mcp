# Smithery retirement and Pulse connections

Reviewed November 10, 2026 (America/Toronto).

## What changed

[Smithery's official notice](https://www.smithery.ai/future) dates its connection-service retirement to **October 31, 2026**. This covers proxy addresses on `run.tools` and `server.smithery.ai`, managed identity, accounts/API keys, API, Connect and Toolbox. Its CLI and SDKs are deprecated. Old scan, publish and connection-management instructions must not be reused.

Smithery has **not closed its entire directory**. The [current site](https://www.smithery.ai/) remains a public registry under Arcade, with curated entries pointing to vendors' direct MCP addresses. This does not require Pulse users to adopt Arcade or another intermediary.

## Pulse connection guidance

Use the existing direct **Streamable HTTP** endpoint:

```text
https://mcp.studiosphere.space/mcp
```

The human setup guide is https://pulse.studiosphere.space/connect; it is not the protocol endpoint. A Pulse connection already using the direct endpoint needs no Smithery-related configuration or credential change.

If an existing Pulse connection still uses a retired Smithery proxy:

1. In the client's authorized remote-MCP settings, replace only that Pulse entry's proxy address with the direct endpoint above. Reuse the entry rather than adding a duplicate.
2. Connect anonymously for discovery. Preserve saved-job references and existing spending limits. Private Pulse analysis keys bind during initialization; keep keyed URLs private and follow the [quickstart](pulse-mcp-quickstart.md) for an existing keyed workflow. A retired Smithery key is not a Pulse key.
3. Reconnect and confirm initialization and `tools/list`. This checks the connection without starting a trial, submitting audio, making a purchase or rotating credentials. A host-specific failure needs its own investigation; directory presence is not host compatibility evidence.

## Listing and verification status

The [former Pulse Smithery listing](https://www.smithery.ai/servers/studiosphere/pulse) returned **HTTP 404 on November 10**; it had returned 200 on October 29. Pulse's presence elsewhere in the retained directory is **unconfirmed**. This does not establish why that URL disappeared or justify recreating a listing or the retired transitionary namespace.

On November 10, direct Pulse MCP health and the human setup page returned HTTP 200. The setup page contained the direct endpoint. An anonymous MCP SDK connection initialized as `studiosphere-pulse` version `1.0.4` and listed ten tools, then closed. No tools were called and no credentials, trial, analysis or financial operations were used. This does not certify a particular assistant host or paid workflow.

No new workstation, other-device or cloud-connector configuration sweep was performed. Earlier dated configuration and compatibility checks retain their original scope; see the [compatibility evidence](mcp-compatibility.md). No client migration, credential rotation or directory submission was performed as part of this documentation update.
