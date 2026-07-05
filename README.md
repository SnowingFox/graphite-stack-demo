# graphite-stack-demo

A tiny TODO CLI, built to demo **[Graphite](https://graphite.dev/)** stacked PRs.

Each PR in this repo stacks on top of the previous one:

1. `feat/scaffold` — project layout + README
2. `feat/storage` — JSON-backed store
3. `feat/commands` — `add` / `list` / `done`
4. `feat/tests` — unit tests

Instead of one giant PR, reviewers get 4 small, focused diffs — and Graphite
keeps the chain rebased automatically as the bottom of the stack merges.
