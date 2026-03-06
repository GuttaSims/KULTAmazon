import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ppfptnbnafnyjvpjlqch.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZnB0bmJuYWZueWp2cGpscWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NTAyNTAsImV4cCI6MjA4ODMyNjI1MH0.US9eA7wEKFv3U6v4_nhlhl-pr62tKfYctZd46Gj9sIg"
);

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { product_name, price } = req.body;

  console.log("Product received:", req.body);

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        product_name: product_name,
        price: price
      }
    ]);

  if (error) {
    console.log("Insert error:", error);
    return res.status(500).json({ error });
  }

  return res.status(200).json({ success: true, data });
}
