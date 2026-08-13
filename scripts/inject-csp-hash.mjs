#!/usr/bin/env node
// Nuxt SSR always emits one inline bootstrap script — `<script>window.__NUXT__=...`
// — to make runtime config available before hydration. The CSP baseline
// (public/_headers) has no 'unsafe-inline' for script-src, so that inline
// script needs a hash allow-listed explicitly (nonces aren't viable for a
// fully-prerendered SSG site — there's no per-request server to mint one).
//
// The script's content is built from static `runtimeConfig.public` values, so
// it's byte-identical across every prerendered page. This computes its real
// hash from the JUST-generated output and patches the _headers file that ships
// in that same output directory — never the source public/_headers — so the
// hash can't drift out of sync with the HTML actually being deployed.

import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = existsSync("dist") ? "dist" : ".output/public";
const indexPath = join(outDir, "index.html");
const headersPath = join(outDir, "_headers");

if (!existsSync(indexPath)) {
  console.error(
    `inject-csp-hash: no build output at ${indexPath} — run the build first`,
  );
  process.exit(1);
}
if (!existsSync(headersPath)) {
  console.error(`inject-csp-hash: no _headers file at ${headersPath}`);
  process.exit(1);
}

const html = readFileSync(indexPath, "utf8");
const match = html.match(/<script>(window\.__NUXT__=.*?)<\/script>/s);
if (!match) {
  console.error(
    `inject-csp-hash: could not find the inline __NUXT__ bootstrap script in ${indexPath}`,
  );
  process.exit(1);
}

// CSP hash-source covers exactly the bytes between the tags — no re-serializing.
const hash = createHash("sha256").update(match[1], "utf8").digest("base64");
const directive = `'sha256-${hash}'`;

let headers = readFileSync(headersPath, "utf8");
if (!headers.includes("script-src 'self'")) {
  console.error(
    "inject-csp-hash: expected \"script-src 'self'\" in _headers — CSP shape changed, update this script",
  );
  process.exit(1);
}
if (headers.includes(directive)) {
  console.log("inject-csp-hash: hash already present, no change needed");
  process.exit(0);
}

headers = headers.replace(
  "script-src 'self'",
  `script-src 'self' ${directive}`,
);
writeFileSync(headersPath, headers);
console.log(`inject-csp-hash: added ${directive} to ${headersPath}`);
