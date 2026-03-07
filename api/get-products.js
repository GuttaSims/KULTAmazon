import { createClient } from "@supabase/supabase-js"

export default async function handler(req, res) {

try {

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE

if (!supabaseUrl || !supabaseKey) {
return res.status(500).json({
error: "Missing Supabase environment variables"
})
}

const supabase = createClient(supabaseUrl, supabaseKey)

const { data, error } = await supabase
.from("products")
.select("*")

if (error) {
return res.status(500).json({
error: error.message
})
}

res.status(200).json(data)

} catch (err) {

res.status(500).json({
error: err.message
})

}

}
