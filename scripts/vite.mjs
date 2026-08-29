// scripts/vite.mjs
//
// Wrapper around the `vite` binary that filters the noisy esbuild warning:
//
//   ▲ [WARNING] Cannot find base config file "expo/tsconfig.base" [tsconfig.json]
//
// The warning is emitted by esbuild when it walks up the directory tree
// during dep optimization and finds a sibling Expo project's tsconfig.json
// (which extends "expo/tsconfig.base"). This wrapper removes the warning
// (and the multi-line code-frame that follows it) from stderr so the dev
// server output stays clean. We do not modify any actual project behavior —
// only the noisy output is filtered.

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

// Exact first line of the noisy warning. esbuild prefixes with `▲ [WARNING]`.
const EXPO_TSCONFIG_NOISE = /^▲ \[WARNING\] Cannot find base config file "expo\/tsconfig\.base"/;
// Match a code-frame line: indented "<file>.json:<line>:<col>:"
const CODE_FRAME_HEADER = /^[ \t]*\S+\.json:\d+:\d+:\s*$/;
// Match a code-frame gutter line. esbuild uses Unicode box-drawing
// characters in its code frames: "  N │ content" (U+2502 or ASCII "|") or
// "       ╵ content" (U+2575). We use Unicode escapes so the regex
// stays ASCII-safe regardless of how the source file is encoded.
const CODE_FRAME_GUTTER = /(^\s*\d+\s+[\u2502|])|(.*[\u2575\u2574].*)/;

const args = process.argv.slice(2);

const proc = spawn(
  process.execPath,
  [join(projectRoot, "node_modules/vite/bin/vite.js"), ...args],
  {
    cwd: projectRoot,
    env: process.env,
    stdio: ["inherit", "inherit", "pipe"],
  }
);

let stderrBuf = "";
let dropping = false; // true while we are skipping a noisy block
proc.stderr.setEncoding("utf8");
proc.stderr.on("data", (chunk) => {
  stderrBuf += chunk;
  let idx;
  while ((idx = stderrBuf.indexOf("\n")) !== -1) {
    const line = stderrBuf.slice(0, idx + 1);
    stderrBuf = stderrBuf.slice(idx + 1);
    const trimmed = line.trim();

    if (EXPO_TSCONFIG_NOISE.test(trimmed)) {
      // Start dropping this warning + the code-frame that follows.
      dropping = true;
      continue;
    }

    if (dropping) {
      // While dropping, swallow code-frame lines and the blank line that
      // ends the block. Stop dropping on any other non-blank line.
      if (trimmed === "") {
        // Blank line ends the block — drop it too.
        continue;
      }
      if (CODE_FRAME_HEADER.test(trimmed) || CODE_FRAME_GUTTER.test(trimmed)) {
        continue;
      }
      // Any other line: stop dropping and emit it.
      dropping = false;
    }

    process.stderr.write(line);
  }
});
proc.stderr.on("end", () => {
  if (stderrBuf) process.stderr.write(stderrBuf);
});

proc.on("exit", (code) => process.exit(code ?? 0));

// Forward signals so Ctrl-C still works.
for (const sig of ["SIGINT", "SIGTERM", "SIGHUP"]) {
  process.on(sig, () => proc.kill(sig));
}
