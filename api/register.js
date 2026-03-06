import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_KEY
)

export default async function handler(req,res){

if(req.method !== "POST"){
return res.status(405).json({message:"Method not allowed"})
}

const {username,email,password,sl_name,sl_uuid} = req.body

const {error} = await supabase
.from("users")
.insert([{
username,
email,
password,
sl_name,
sl_uuid
}])

if(error){
return res.status(500).json({message:error.message})
}

res.json({message:"Account created successfully!"})

}
