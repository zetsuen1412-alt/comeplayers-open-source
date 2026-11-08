# ComePlayers source snapshot

A clean extraction of selected legacy ComePlayers code. Original production configuration, credentials, operational records, unverified game art/audio, binaries, and prior Git history are not included.

## Standalone offline games

The `games/` directory contains Marble, Match, procedural Strike, and Alexia Arrow in one Next.js application. See its README for installation and limitations. It uses neutral geometric artwork and synthesized sound, without ComePlayers production accounts or API connections.

TypeScript, production compilation, ten extraction checks, and HTTP responses for all four routes pass. Browser gameplay and visual behavior have not been verified; compilation is not a gameplay guarantee. Strike social/lobby/currency/rank displays are explicitly fictional prototype UI.

## Source references

The `source/` directory also preserves reviewed excerpts from:

- Android and Windows BoostMonitor.
- Payroll calculations, UI, types, exports and schema migrations.
- Mobile/desktop clients, shared chat utilities and an Expo updater module.
- Selected tooling.
- Frontline engine definitions.
- Separately licensed Raise the Empires engine modules.

These references are incomplete selections, not a deployable monorepo. Production adapters, configuration, questionable fixtures, and unverified assets are omitted. Imports or build resources may therefore be unresolved. Do not deploy them as-is or run database migrations against production. No independent security audit is claimed.

## Licenses

Original ComePlayers code and new geometric placeholders use MIT, with the rights holder’s approval. Third-party code and dependencies retain their own licenses. In particular, `source/game-services/empires-allies/` remains GPL-3.0-or-later, and the Expo updater retains its original MIT notice. See LICENSE, LICENSE_SCOPE.md, and the notices inside each component.

A clean snapshot does not reproduce the original repository’s development history. Making a repository private later cannot withdraw permissions already granted to copies distributed under an open-source license.
