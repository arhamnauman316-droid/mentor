# Mentor test deployment checklist

Run these tests on the **Vercel Preview URL**, not your production URL.

## Deployment and AI
- [ ] `/api/health` returns JSON and `aiKeyConfigured` is `true` in the Preview environment.
- [ ] Send a short message in Mentor and receive an AI response.
- [ ] Check Vercel function logs if `/api/chat` reports an error; do not share API-key values in screenshots.
- [ ] Refresh after a conversation and confirm the app does not get stuck loading.

## Phone and accessibility
- [ ] Open Settings on a phone; confirm its content is visible, scrollable, and readable.
- [ ] Add an objective, edit it, and verify the saved item appears.
- [ ] Verify navigation does not overlap forms or the bottom tab bar.
- [ ] Check both light and dark themes, text contrast, and keyboard focus.

## Schedules and reminders
- [ ] Create a schedule a minute or two in the future and grant notification permission.
- [ ] Verify the calendar's scheduled days and completed days are correct.
- [ ] Edit a schedule, pause/resume it, and delete it.
- [ ] Mark a scheduled date complete, refresh, and verify the completion persists.
- [ ] Test the 10-minute away reminder separately.
- [ ] Confirm users see the app's limitation message: local browser reminders are not guaranteed when the browser is completely closed.

## Release checks
- [ ] Verify there are no secrets in `git status` or the staged diff.
- [ ] Check the Preview URL and production URL separately.
- [ ] Only merge to the production branch after the above items pass.
