export default function handler(req, res) {
  const startTime = Date.now();
  res.status(200).json({
    status: "OK",
    service: "Sujal Warke Portfolio API Core",
    environment: process.env.NODE_ENV || "production",
    timestamp: new Date().toISOString(),
    latencyMs: Date.now() - startTime,
    message: "Serverless Vercel API backend is active & healthy ⚡"
  });
}
