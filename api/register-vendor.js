import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {

 if (req.method !== "POST") {
  return res.status(405).json({ error: "Method not allowed" })
 }

 try {

  const { vendor_uuid, creator_uuid } = req.body

  if (!vendor_uuid || !creator_uuid) {
   return res.status(400).json({ error: "Missing vendor_uuid or creator_uuid" })
  }

  const { data, error } = await supabase
   .from("vendors")
   .insert([
    {
     vendor_uuid: vendor_uuid,
     creator_uuid: creator_uuid
    }
   ])

  if (error) {
   console.error(error)
   return res.status(500).json({ error: error.message })
  }

  return res.status(200).json({ success: true, vendor: data })

 } catch (err) {

  console.error(err)
  return res.status(500).json({ error: "Server crash" })

 }

}
