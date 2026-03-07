import { createClient } from "@supabase/supabase-js"

export default async function handler(req, res) {

try {

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE
)

const { data, error } = await supabase
.from("vendors")
.select("*")
.order("last_seen", { ascending: false })

if (error) {
console.error("SUPABASE ERROR:", error)
return res.status(500).json({ error: error.message })
}

return res.status(200).json({
vendors: data || []
})

} catch (err) {

console.error("SERVER CRASH:", err)

return res.status(500).json({
error: "Server crashed",
details: err.message
})

}

}
