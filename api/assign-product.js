import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {

    const { vendor_uuid, product_id, creator_uuid } = req.body;

    if (!vendor_uuid || !product_id || !creator_uuid) {
      return res.status(400).json({
        error: "Missing vendor_uuid, product_id, or creator_uuid"
      });
    }

    const { data, error } = await supabase
      .from("vendor_products")
      .insert([
        {
          vendor_uuid: vendor_uuid,
          product_id: product_id,
          creator_uuid: creator_uuid
        }
      ]);

    if (error) {
      console.log("Supabase error:", error);
      return res.status(500).json({ error: error.message });
    }

    console.log("Product assigned:", vendor_uuid, product_id);

    res.status(200).json({
      success: true,
      vendor_uuid: vendor_uuid,
      product_id: product_id
    });

  } catch (err) {
    console.log("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
