// Safe diagnostic endpoint. It never returns secret values.
module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  const payload = {
    ok: true,
    app: 'Mentor',
    apiVersion: '2026-10-28-reminders-1',
    aiKeyConfigured: Boolean(process.env.OPENROUTER_API_KEY),
    rateLimitStoreConfigured: Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
    reminderMode: 'local-browser',
    note: 'This endpoint reports configuration presence only; it does not verify that OpenRouter credentials or model routing are valid.'
  };
  return res.status(200).json(payload);
};
