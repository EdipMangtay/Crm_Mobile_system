<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:TRAVIA-CODEX -->

# TRAVIA Codex Harness

## Repository map
- `apps/website`: public luxury travel website
- `apps/crm`: operational CRM and backend/API
- `apps/mobile`: Expo mobile application
- `docs`: architecture and product documentation

## Context efficiency
- Do not scan the whole repository by default.
- Search for relevant files and symbols first.
- Read only files required for the current task.
- Do not repeatedly reopen unchanged files.
- Ignore `node_modules`, generated files, build outputs, caches and logs unless needed.
- Prefer targeted checks before full-repository checks.
- Do not use subagents for trivial work.
- Keep final explanations concise.

## Engineering
- Preserve existing architecture and functionality unless change is justified.
- Reuse existing components, utilities and design tokens.
- Do not rewrite unrelated working code.
- Avoid unnecessary dependencies.
- Preserve type safety, accessibility and responsive behavior.
- Never hardcode secrets.

## UI work
For significant frontend work:
- use relevant ECC frontend skills when useful
- implement the actual UI
- run the application
- visually inspect the rendered result
- verify responsive layouts
- fix visual defects before finishing

<!-- END:TRAVIA-CODEX -->
