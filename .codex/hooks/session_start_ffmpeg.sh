#!/bin/zsh
# Codex SessionStart hook for local video work.
# Checks FFmpeg on the current machine. Installs it with Homebrew only when
# ffmpeg or ffprobe is missing. It does not read credentials or publish content.

set -u

FFMPEG="$(command -v ffmpeg 2>/dev/null || true)"
FFPROBE="$(command -v ffprobe 2>/dev/null || true)"

if [[ -z "$FFMPEG" || -z "$FFPROBE" ]]; then
  BREW="$(command -v brew 2>/dev/null || true)"
  if [[ -z "$BREW" ]]; then
    print -r -- "FFmpeg hook: BLOCKED; ffmpeg/ffprobe missing and Homebrew is unavailable."
    exit 0
  fi

  print -r -- "FFmpeg hook: installing ffmpeg with Homebrew."
  "$BREW" install ffmpeg >/dev/null

  FFMPEG="$(command -v ffmpeg 2>/dev/null || true)"
  FFPROBE="$(command -v ffprobe 2>/dev/null || true)"
fi

if [[ -n "$FFMPEG" && -n "$FFPROBE" ]]; then
  VERSION="$("$FFMPEG" -version 2>/dev/null | head -1)"
  print -r -- "FFmpeg ready: $VERSION"
else
  print -r -- "FFmpeg hook: BLOCKED; installation did not expose ffmpeg and ffprobe."
fi
