#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

RESULT=$(node "$SCRIPT_DIR/check-ts7-support.mjs")

echo "result=$RESULT" >> "$GITHUB_OUTPUT"
echo "$RESULT"
