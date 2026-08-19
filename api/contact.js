export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message' });
  }

  // Here you can send emails via Resend/SendGrid or store in MongoDB/Supabase/Postgres
  return res.status(200).json({
    success: true,
    message: `Message received from ${name} (${email})! Dispatching stream notification...`,
    timestamp: new Date().toISOString()
  });
}
