<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:TRAVIA-CRM-UI -->

# CRM UI Direction

Build the CRM as a premium operational business application.

## Character
- refined
- calm
- professional
- dense but readable
- fast to scan
- workflow-first

## Prioritize
- excellent tables
- search and filtering
- clear customer/lead status
- timelines and activity
- obvious primary actions
- strong navigation
- keyboard-efficient workflows
- polished loading, empty, error and success states

## Avoid generic AI UI
- excessive rounded cards
- cards inside cards
- giant marketing headings
- purple gradients
- decorative blobs
- unnecessary glassmorphism
- random gradients
- excessive shadows
- decorative motion with no UX purpose
- turning every metric into a card

Use existing design tokens and components first.

For meaningful UI changes:
1. inspect only the relevant frontend files
2. establish the information hierarchy
3. implement
4. run the CRM
5. visually inspect the actual page
6. check desktop and responsive layouts
7. fix spacing, hierarchy, alignment and overflow
8. run relevant lint/build checks

Prefer ECC `frontend-design-direction` and `frontend-patterns` when relevant.

<!-- END:TRAVIA-CRM-UI -->
