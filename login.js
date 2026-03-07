const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

module.exports = async (req, res) => {

res.setHeader("Content-Type", "application/json")

if (req.method !== "POST") {
return res.status(405).json({ error: "Method not allowed" })
}

try {

const { username, password } = req.body || {}

if (!username || !password) {
return res.json({ error: "Missing username or password" })
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
return res.json({ error: "Incorrect password" })
}

return res.json({
success: true,
user: data.username
})

} catch (err) {

console.error("LOGIN ERROR:", err)

return res.status(500).json({
error: "Server error"
})

}

}
