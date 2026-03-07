import { createClient } from "@supabase/supabase-js"

export default async function handler(req, res) {

try {

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

const { data, error } = await supabase
.from("vendors")
.select("username, region, position, status")

if(error){
return res.status(500).json({ error: error.message })
}

return res.json({
vendors: data || []
})

} catch(err){

console.error("GET VENDORS ERROR:", err)

return res.status(500).json({
vendors: []
})

}

}
