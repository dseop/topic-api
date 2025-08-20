# Repository Guidelines

## Project Structure & Module Organization
- `app.js`: Express app setup, middleware, error handling.
- `bin/www`: Server bootstrap (`PORT`, `debug` logs).
- `routes/`: HTTP routes (`index.js`, `users.js`, `topic.js`).
- `services/`: Business logic (`topicService.js`).
- `data/`: In‑memory dataset (`topics.js`).
- `views/`: Pug templates; `public/`: static assets.
- `documents/`: Design docs (see `documents/api-design.md`).

## Build, Test, and Development Commands
- `npm start`: Run the API on `http://localhost:3000` (use `PORT=4000` to change).
- `DEBUG=topic-api:* npm start`: Enable verbose server logs.
- `npx prettier --check .` / `--write .`: Check/format code before PRs.

Example local run: `PORT=4000 DEBUG=topic-api:* npm start`.

## Coding Style & Naming Conventions
- Indentation 2 spaces; single quotes; semicolons; 80‑col wrap (Prettier 3).
- Prettier config: `. prettierrc` (note the space in filename).
- Filenames: `routes/*.js` lower case; services in `camelCase` when singular (e.g., `topicService.js`).
- Functions/vars: lowerCamelCase; constants: UPPER_SNAKE_CASE.
- Keep route handlers thin; put logic in `services/` and pure helpers.

## Testing Guidelines
- No formal tests yet. Prefer Jest + Supertest for API.
- Suggested layout: `__tests__/routes/*.test.js`, `__tests__/services/*.test.js` mirroring source.
- Include sample requests in PR description (e.g., `curl "/topic/random?category=tech"`).
- Aim for coverage on edge cases: invalid category, empty results, date parsing.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, etc. Example: `feat(topic): add by-category endpoint`.
- PRs should include: purpose, scope, linked issues, API changes, request/response examples, and any UI/log screenshots if relevant.
- Keep diffs focused; update `documents/api-design.md` when behavior changes.

## Security & Configuration Tips
- Do not commit real secrets; use `.env` for local settings (`PORT`, etc.).
- Validate and sanitize query params; return errors per the documented JSON shape.
- Cache headers for read endpoints should match design docs where applicable.
