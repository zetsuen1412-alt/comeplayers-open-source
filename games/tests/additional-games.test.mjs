import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
import test from 'node:test';
const root=resolve(import.meta.dirname,'..');
const walk=d=>readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(d,e.name)):[join(d,e.name)]);
const files=['match','strike','arrow'].flatMap(g=>walk(join(root,'app/games',g)));
test('added games are isolated from production and external network',()=>{
 for(const p of files){const s=readFileSync(p,'utf8');assert.doesNotMatch(s,/https?:\/\/|\bfetch\s*\(|XMLHttpRequest|new\s+WebSocket|process\.env|supabase|authenticatedFetch|@\//i,p);assert.doesNotMatch(s,/EnemyModelLibrary|AlexiaFirstPersonLibrary|jokowi|prabowo/i,p);}
});
test('all added artwork uses present neutral local SVGs',()=>{
 for(const p of files){const s=readFileSync(p,'utf8');assert.doesNotMatch(s,/\.(png|jpe?g|webp|gif|mp3|wav|ogg|glb)\b/i,p);for(const [,asset] of s.matchAll(/["'](\/placeholders\/[^"']+)["']/g)){assert.ok(existsSync(join(root,'public',asset)),asset);}}
});
test('only implemented Arrow menu remains',()=>{
 const s=readFileSync(join(root,'app/games/arrow/ComePlayersArcade.tsx'),'utf8');const menu=s.match(/const arcadeGames = \[([\s\S]*?)\] as const/)[1];assert.equal((menu.match(/id:/g)||[]).length,1);assert.match(menu,/id: "arrow"/);
});
test('procedural Strike retains five offline modes and required notices',()=>{
 const s=readFileSync(join(root,'app/games/strike/StrikeGame.ts'),'utf8');for(const mode of ['team-deathmatch','bomb-defusal','free-for-all','zombie','zombie-adventure'])assert.ok(s.includes('"'+mode+'"'));assert.match(s,/import \* as THREE from "three"/);assert.ok(existsSync(join(root,'THIRD_PARTY_NOTICES_STRIKE.md')));
});
