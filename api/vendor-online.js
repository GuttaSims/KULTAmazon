import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
)

export default async function handler(req,res){

const { vendor_uuid, vendor_name, region, position, owner } = req.body

await supabase
.from("vendors")
.upsert({
 vendor_uuid,
 vendor_name,
 region,
 position,
 owner,
 last_seen: new Date()
})

res.status(200).json({status:"ok"})
}
