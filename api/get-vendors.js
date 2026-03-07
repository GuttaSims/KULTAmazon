import { createClient } from "@supabase/supabase-js"

export default async function handler(req, res) {

try {

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const { data, error } = await supabase
  .from("vendors")
  .select("*")

if (error) {
  console.error(error)
  return res.status(500).json({ vendors: [] })
}

return res.status(200).json({
  vendors: data || []
})

} catch (err) {

console.error("API error:", err)

return res.status(500).json({
  vendors: []
})

}

}
