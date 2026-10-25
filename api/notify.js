// api/notify.js
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // ⚠️ Replace with YOUR ntfy topic – keep it secret!
  const NTFY_TOPIC = process.env.NTFY_TOPIC || 'timjosh-portfolio-x7k2';

  try {
    const response = await fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
      method: 'POST',
      headers: {
        'Title': 'New message from portfolio chat',
        'Priority': 'high',
        'Tags': 'speech_balloon',
      },
      body: message,
    });

    if (!response.ok) {
      throw new Error(`ntfy responded with ${response.status}`);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('ntfy error:', err);
    return res.status(500).json({ error: 'Failed to send notification' });
  }
}
