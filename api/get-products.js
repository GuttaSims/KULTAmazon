import { createClient } from "@supabase/supabase-js"

export default async function handler(req, res) {

try {

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

const { vendor } = req.query

if (!vendor) {
return res.status(400).json({ products: [] })
}

const { data, error } = await supabase
.from("products")
.select("*")
.eq("vendor_username", vendor)

if (error) {
console.error("Supabase error:", error)
return res.status(500).json({ products: [] })
}

return res.status(200).json({
products: data || []
})

} catch (err) {

console.error("API crash:", err)

return res.status(500).json({
products: []
})

}

}
