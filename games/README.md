# ComePlayers offline games

This standalone extraction uses MIT for original ComePlayers code, with the rights holder’s approval. npm metadata remains `private: true` to prevent accidental package publication.

## Included games

- `/games/monopoly`: existing standalone Marble, solo board game with AI opponents.
- `/games/match`: Match puzzle, local progress and synthesized audio.
- `/games/strike`: procedural Three.js shooter, five offline bot modes. Social, currency, ranks, and lobby panels are fictional prototype UI, not connected functionality.
- `/games/arrow`: Alexia Arrow canvas survival game, local high score. Unimplemented game-menu entries are removed.

The home page links to all four. Original raster artwork, model files, recorded audio, real-person enemy models, production website configuration, accounts, API connections, customer/staff data, apps/payroll, and Git history are excluded. Twenty-three new neutral geometric SVGs replace added image references. Existing Marble geometric assets remain. Audio is synthesized in code, not copied from original recordings.

## Run and checks

Use Node.js 20.9 or later. `npm ci`, then `npm run dev`. Open `http://localhost:3000`.

- `npm run typecheck`: TypeScript checks.
- `npm test`: extraction boundary and credential-pattern checks, not comprehensive gameplay tests.
- `npm run build`: production compilation and static-route generation.

No environment variables or backend accounts are needed. Local progress is stored in the browser. Strike requires browser WebGL. Browser interaction/visual validation is not completed in this environment; a successful build does not establish gameplay correctness or visual polish. New pages preserve existing game logic with minimal extraction changes.

## Rights and publication

Original ComePlayers source in this extraction is licensed under MIT with the rights holder’s approval; see LICENSE. Third-party dependencies and icon collections retain their separate licenses and notices in this directory and `third-party-licenses`. MIT does not cover third-party materials. Copies distributed under MIT retain those permissions even if a repository later becomes private.
