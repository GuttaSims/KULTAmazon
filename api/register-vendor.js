import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req,res){

const { vendor_uuid, creator_uuid } = req.body

await supabase
.from('vendors')
.insert({
vendor_uuid,
creator_uuid
})

res.json({status:"vendor registered"})

}
