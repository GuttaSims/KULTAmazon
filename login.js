const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

module.exports = async (req, res) => {

if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" })
}

try {

const { username, password } = req.body

if (!username || !password) {
return res.json({ error: "Missing fields" })
}

const { data, error } = await supabase
.from("vendors")
.select("*")
.eq("username", username)
.single()

if (error || !data) {
return res.json({ error: "User not found" })
}

if (data.password !== password) {
return res.json({ error: "Invalid password" })
}

return res.json({ success: true })

} catch (err) {

console.error(err)
return res.status(500).json({ error: "Server error" })

}

}
