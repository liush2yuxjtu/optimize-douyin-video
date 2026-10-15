---
name: verify
description: Verify the optimize-douyin-video MCP path and Douyin read-only workflow against the real Mac mini service.
---

# Project Verify

## Goal

Verify the real Douyin MCP path from an external client.

Do not treat a skill, config file, or HTTP status alone as proof.

## Required checks

1. Read the current Tailscale Funnel route.
2. Confirm the public route maps to the MCP endpoint path:
   - Public: `https://<tailnet-host>/selfmedia-mcp`
   - Backend: `http://127.0.0.1:18790/mcp`
3. Confirm the service listens on port `18790`.
4. Send an unauthenticated request.
   - Expected result: `401 Unauthorized`.
   - A `401` proves the auth boundary is active.
5. Run a real Streamable HTTP MCP client with the token read from the Mac mini Keychain.
   - Never print the token.
   - Run in the Mac mini Aqua user session when SSH cannot access Keychain.
6. Complete MCP protocol checks:
   - `initialize`
   - `tools/list`
   - `douyin_status`
   - `douyin_list_videos(source=remote)`
7. Verify safety checks:
   - create/update/delete tests use `dry_run=true`
   - `douyin_publish` is disabled or refused
   - no real Douyin publish occurs
8. Verify cleanup:
   - remove one-off LaunchAgents
   - remove temporary scripts and output files
   - do not remove the production `selfmedia-mcp` launchd job

## Route failure rules

- Public route to backend root `/` is a failure when the MCP endpoint is `/mcp`.
- Authenticated MCP POST returning `404` means the Funnel target path is wrong.
- Fix the proxy target to include `/mcp`, then rerun the client.
- Do not mark a browser `ERR_BLOCKED_BY_CLIENT` as service failure. Verify with an external `curl.exe` or MCP client.
- A local `curl` success does not prove external access.

## Authentication rules

- Read tokens only from the authorized Mac mini Keychain.
- Never print, log, commit, or paste token values.
- Do not put tokens in source files, GitHub code, URLs, or command output.
- If SSH returns Keychain status `36`, use a temporary Aqua `LaunchAgent` for the verifier.
- Remove the temporary LaunchAgent after the test.

## Verdicts

Use these exact verdicts:

- **PASS**: external MCP client completes protocol negotiation and the approved read-only Douyin checks.
- **PARTIAL**: transport and protocol pass, but an upstream platform is not authenticated or a required read-only check is unavailable.
- **BLOCKED**: the service, route, authentication, or MCP protocol cannot be tested.
- **FAIL**: a required check returns an unexpected result.

A skill or config file alone is never **PASS**.
