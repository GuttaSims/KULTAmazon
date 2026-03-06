const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://ppfptnbnafnyjvpjlqch.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZnB0bmJuYWZueWp2cGpscWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NTAyNTAsImV4cCI6MjA4ODMyNjI1MH0.US9eA7wEKFv3U6v4_nhlhl-pr62tKfYctZd46Gj9sIg'
)

module.exports = async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {

    const { product_id, buyer_uuid } = req.body

    console.log("Purchase request:", product_id)

    // Get product info
    const { data: product, error } = await supabase
      .from("products")
      .select("*")
      .eq("product_id", product_id)
      .single()

    if (error || !product) {
      console.log("Product not found:", error)
      return res.status(404).json({ error: "Product not found" })
    }

    // Log purchase
    const { error: purchaseError } = await supabase
      .from("purchases")
      .insert([
        {
          product_id: product.product_id,
          buyer_uuid: buyer_uuid,
          creator_uuid: product.creator_uuid,
          price: product.price
        }
      ])

    if (purchaseError) {
      console.log("Purchase log error:", purchaseError)
    }

    console.log("Purchase successful")

    // Send delivery info back to SL
    return res.status(200).json({
      success: true,
      delivery_item: product.delivery_item,
      box_size: product.box_size
    })

  } catch (err) {

    console.log("Server error:", err)

    return res.status(500).json({
      error: "Internal Server Error"
    })

  }
}
