import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {

if (req.method !== 'POST') {
return res.status(405).json({ error: 'Method not allowed' })
}

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_KEY
)

const { username, email, password, sl_uuid, sl_name } = req.body

const { data, error } = await supabase
.from("users")
.insert([
{
username,
email,
password,
sl_uuid,
sl_name
}
])

if (error) {
console.log(error)
return res.status(500).json({ error: error.message })
}

return res.status(200).json({
message: "Account created",
data
})

}
