import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {

    const { username, email, password, sl_uid, sl_name } = req.body

    console.log("Incoming data:", req.body)

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          username: username,
          email: email,
          password: password,
          sl_uuid: sl_uid,
          sl_name: sl_name
        }
      ])

    if (error) {
      console.error("Supabase Error:", error)
      return res.status(500).json({
        message: "Database error",
        error: error.message
      })
    }

    return res.status(200).json({
      message: "User created successfully",
      data: data
    })

  } catch (err) {

    console.error("Server error:", err)

    return res.status(500).json({
      message: "Server crashed",
      error: err.message
    })
  }
}
