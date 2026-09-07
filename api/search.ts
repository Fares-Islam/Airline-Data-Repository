import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Always set CORS headers FIRST
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Origin", `${process.env.VERCEL_URL}`);

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const {
      type,
      departure_id,
      arrival_id,
      outbound_date,
      return_date,
      currency,
    } = req.query;

    if (!type || !departure_id || !arrival_id || !outbound_date) {
      console.error("Missing parameters.");
      return res.status(400).json({ error: "Missing parameters" });
    }

    const apiKey = process.env.SerpAPIKey;

    if (!apiKey) {
      console.error("SerpAPIKey environment variable is undefined.");
      return res.status(500).json({
        error: "SerpAPIKey environment variable is undefined.",
      });
    }

    const params = new URLSearchParams({
      api_key: apiKey!,
      engine: "google_flights",
      type: String(type),
      departure_id: String(departure_id),
      arrival_id: String(arrival_id),
      outbound_date: String(outbound_date),
      currency: String(currency || "USD"),
      deep_search: "true",
    });

    if (return_date) {
      params.append("return_date", String(return_date));
    }

    const serpAPIRes = await fetch(
      `https://serpapi.com/search.json?${params.toString()}`,
    );

    if (!serpAPIRes.ok) {
      console.error("Unable to contact SerpApi.");
      console.log("SerpApi response:", await serpAPIRes.text());
      return res.status(serpAPIRes.status).json({
        error: "Unable to contact SerpApi.",
      });
    }

    const data = await serpAPIRes.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
