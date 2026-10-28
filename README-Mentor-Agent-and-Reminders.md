# Mentor — AI diagnostics and local reminders update

## Included
- `index.html`: the uploaded Mentor UI plus schedule/reminder management in the Objectives tab.
- `api/chat.js`: the server-side OpenRouter handler needed by the frontend's `/api/chat` requests.
- `api/health.js`: safe diagnostic endpoint at `/api/health` (shows whether required env vars are present without exposing them).
- `sw.js`: service worker for notification display and notification clicks on supported browsers.
- `package.json`: minimal project manifest.

## Fixing the AI agent
The browser calls `POST /api/chat`. Deploy **both** `index.html` and `api/chat.js` from the same project root. In Vercel → Project → Settings → Environment Variables, set `OPENROUTER_API_KEY` using your private OpenRouter key; do not put it in HTML or commit it to Git. If you use Upstash, set both `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`, or remove the incomplete pair. Redeploy after changing environment variables.

After deployment, visit `/api/health`. `aiKeyConfigured` should be `true`. This only confirms that a value is present; it does not validate the key or provider credit. If `false`, the AI cannot work until the key is configured. If `/api/chat` gives a 404, `api/chat.js` was not deployed from the project root.

## Reminder functionality
The app adds schedules with title, reminder message, local time, and frequency: daily (7 days), 3 days/week (Mon/Wed/Fri), 5 days/week (Mon–Fri), or custom weekdays. Schedules can be edited, paused/resumed, and removed. The calendar tracks completion history by date. Data is stored in this browser's existing `localStorage` state, on this device.

Tap **Enable notifications** and grant browser permission. When this page can run in the foreground/background, the app checks due schedules and displays notifications through `/sw.js`; it also schedules a “session is waiting” notice after a conversation tab remains hidden for 10 minutes.

**Important limit:** because this version stores schedules locally and does not have a persistent remote reminder database or an active server push scheduler, alerts are not guaranteed if the browser/site is fully closed, the OS kills the browser, or the app is on another device. A true closed-app push reminder requires push subscriptions, durable server-side storage, VAPID keys, and a scheduler/cron setup. The service worker alone cannot wake itself at a future local time.

## Test before production
1. Open the app and use `/api/health`.
2. Send a short chat message; if it fails, note the visible message and inspect Vercel → Logs → `/api/chat`.
3. In Objectives → Schedules & reminders, enable notifications, create a reminder one minute in the future, move the tab to the background, and verify the notification.
4. Mark a past routine as complete in the calendar, refresh, and verify it remains completed.
5. Check mobile layout, light/dark mode, edit/pause/delete actions.
