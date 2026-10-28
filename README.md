# Mentor

Mentor is a personal AI mentor web app for conversations, objectives, learning, journaling, progress tracking, and routine reminders.

## What's in this repository

- `index.html` — application UI and browser-side behavior.
- `api/chat.js` — server-side chat endpoint; calls OpenRouter without exposing its key to the browser.
- `api/health.js` — safe configuration diagnostic at `/api/health`; reports whether required environment variables exist, not their values.
- `sw.js` — notification display/click handling for supported browsers.
- `README-Mentor-Agent-and-Reminders.md` — additional notes about the current AI and reminder behavior.
- `.github/workflows/validate.yml` — syntax-only CI checks.

## Important notes

- Do not commit `.env.local`, API keys, `*.token`, or Vercel project metadata.
- `OPENROUTER_API_KEY` must be configured as a server-side Vercel Environment Variable.
- Reminder schedules and completion history in this build are stored in the current browser's local storage. Browser notifications are best-effort while the app/browser environment can run; they are not guaranteed after the browser is fully closed or the operating system stops it.
- The automated workflow checks syntax. It does not prove the OpenRouter key is valid, that production environment variables are set, or that mobile UI behavior has been tested on physical devices.

## Environment variables

Configure the following under **Vercel → Project → Settings → Environment Variables**:

| Variable | Required | Purpose |
|---|---|---|
| `OPENROUTER_API_KEY` | Yes, for AI chat | Private OpenRouter API key used by `api/chat.js` |
| `UPSTASH_REDIS_REST_URL` | Optional | Upstash REST URL for shared rate-limit storage |
| `UPSTASH_REDIS_REST_TOKEN` | Optional with URL | Upstash REST token; configure together with the URL |
| `RATE_LIMIT_SALT` | Recommended | Random salt used when hashing rate-limit identifiers |

Set the key for the environment where you are testing. Never place the OpenRouter key inside `index.html`, commit it to GitHub, or paste it into chat.

## Local development

Install the Vercel CLI and run the app through Vercel so `/api/chat` and `/api/health` are available:

```bash
npm i -g vercel
vercel login
vercel dev
```

Use Vercel's environment-variable workflow for local secrets. Do not commit local environment files.

## Production and test deployments

**Keep production on your existing production branch** (usually `main`). Do not push test-only changes to that branch until you've tested them.

A recommended testing workflow:

1. Fetch and update the production branch.
2. Create a separate branch named `mentor-reminders-test`.
3. Apply the update files on that branch, commit, and push it to GitHub.
4. If this GitHub repository is connected to Vercel, the push should create a **Preview Deployment** with its own URL. It should not replace production unless your Vercel Production Branch is configured incorrectly.
5. Set `OPENROUTER_API_KEY` in Vercel's **Preview** environment. Add optional Upstash variables there only if using that service. Avoid sharing production data or credentials unnecessarily.
6. Test the preview URL before merging anything into the production branch.

Before pushing, inspect `git status` and `git diff --cached` to ensure no secrets are staged. `.gitignore` prevents new `.env*` files from being added by normal `git add`, except the safe `.env.example` template, but it cannot remove a secret that was committed previously. If a secret was ever committed, rotate it in the provider dashboard.

See `TESTING-CHECKLIST.md` for a manual acceptance checklist.

## Early-access positioning

The onboarding screen presents Mentor as an evolving early-access product and invites people to share feedback. Keep these claims honest: do not add fake countdowns, invented user counts, or claims that access is limited unless a real access limit is enforced. See `LAUNCH-COPY.md` for reusable Product Hunt and social copy.
