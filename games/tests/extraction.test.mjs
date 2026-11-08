import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const source = readFileSync(join(root, "app/games/monopoly/ComePlayersMarbleGame.tsx"), "utf8");
const css = readFileSync(join(root, "app/games/monopoly/monopoly.module.css"), "utf8");
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap(e => {
  if (["node_modules", ".next", ".git"].includes(e.name)) return [];
  const p = join(dir, e.name);
  return e.isDirectory() ? walk(p) : [p];
});

test("solo extraction has no production backend or online engine", () => {
  assert.doesNotMatch(source, /getSupabaseBrowserClient|process\.env|showOnlineEngine|ComePlayersMonopolyGame|ONLINE MULTIPLAYER/);
  assert.doesNotMatch(source, /\bfetch\s*\(|XMLHttpRequest|new\s+WebSocket\b|https?:\/\//);
  assert.match(source, /START SOLO/);
  assert.match(source, /startConfiguredGame/);
});

test("all image references are local new placeholders", () => {
  const paths = [...source.matchAll(/"(\/(?:avatars\/[^"]+|brand\.svg))"/g)].map(m => m[1]);
  assert.equal(new Set(paths).size, 5);
  for (const p of paths) assert.equal(existsSync(join(root, "public", p)), true, p);
  assert.doesNotMatch(source, /\.(?:png|jpe?g|webp|gif|mp3|wav|ogg)\b/i);
  assert.doesNotMatch(css, /url\s*\(|@import/i);
});

test("sound is generated, not bundled recorded audio", () => {
  assert.match(source, /AudioContext/);
  assert.match(source, /createOscillator/);
  assert.doesNotMatch(source, /new Audio\(|audio\.src|decodeAudioData/);
});

test("source distribution excludes environment files and opaque binary bundles", () => {
  for (const p of walk(root)) {
    assert.doesNotMatch(p.slice(root.length), /(?:^|\/)\.env(?:\.|$)|\.(?:exe|dll|zip|7z|swf|apk|p12|pem|jks|keystore|mp3|wav|ogg|xlsx|csv)$/i);
  }
});

test("approved MIT license is scoped while npm publication stays disabled", () => {
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  assert.equal(pkg.license, "MIT");
  assert.equal(pkg.private, true);
  assert.equal(existsSync(join(root, "LICENSE")), true);
});

test("high-confidence secret patterns are absent from staged sources", () => {
  const patterns = [
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
    /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}\b/,
    /\bgithub_pat_[A-Za-z0-9_]{40,}\b/,
    /\bAKIA[A-Z0-9]{16}\b/,
    /\bsk-(?:proj-)?[A-Za-z0-9_-]{30,}\b/,
    /\beyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/,
    /(?:api[_-]?key|client[_-]?secret|password|access[_-]?token)\s*[:=]\s*["'][^"']{12,}["']/i,
  ];
  for (const p of walk(join(root, "app")).concat(walk(join(root, "public")))) {
    const content = readFileSync(p, "utf8");
    for (const pattern of patterns) assert.doesNotMatch(content, pattern, p);
  }
});

