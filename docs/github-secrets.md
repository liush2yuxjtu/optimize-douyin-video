# GitHub repository secrets

The repository currently has these encrypted secrets:

| Secret | Use | Value in source code |
|---|---|---|
| `DOUYIN_MCP_URL` | Endpoint metadata for an external MCP deployment | Never committed |
| `DOUYIN_MCP_PORT` | Endpoint port metadata | Never committed |
| `DOUYIN_MCP_TOKEN` | External MCP authentication token | Never committed or printed |

The project server in `src/mcp-server.js` runs over local stdio on the Mac mini. It connects to the local Chrome CDP endpoint `127.0.0.1:9335`; it does not read `DOUYIN_MCP_TOKEN` and does not expose a public HTTP endpoint.

Secret presence can be checked with `gh secret list --repo liush2yuxjtu/optimize-douyin-video`. Never use `gh secret get`, print secret values, or commit a token to the repository.
