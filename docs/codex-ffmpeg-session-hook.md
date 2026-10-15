# Codex FFmpeg SessionStart hook

This project includes a project-level Codex hook for local video work.

## Files

- `.codex/hooks/hooks.json`: registers the `SessionStart` hook.
- `.codex/hooks/session_start_ffmpeg.sh`: checks `ffmpeg` and `ffprobe`.

## Behavior

On `startup`, `resume`, `clear`, or `compact`:

1. Reuse an existing `ffmpeg` and `ffprobe) installation.
2. If either binary is missing and Homebrew is available, run `brew install ffmpeg`.
3. Print a short readiness or blocked message.
4. Never read credentials, cookies, or Douyin account data.
5. Never publish, comment, send messages, or change Douyin data.

The hook runs in the current Codex environment. A GitHub commit does not install FFmpeg on a machine.

## Local verification

Run from this repository:

```bash
zsh .codex/hooks/session_start_ffmpeg.sh
```

Expected output when the tools are available:

```text
FFmpeg ready: ffmpeg version ...
```

Codex may require a one-time trust review before an unmanaged project hook runs.
