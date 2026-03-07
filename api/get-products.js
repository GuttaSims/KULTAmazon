import supabase from "./supabase.js";

export default async function handler(req, res) {

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const { owner } = req.query;

    if (!owner) {
      return res.status(400).json({ error: "Owner is required" });
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("owner", owner)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);

  } catch (err) {

    return res.status(500).json({
      error: "Server error",
      details: err.message
    });

  }
}
