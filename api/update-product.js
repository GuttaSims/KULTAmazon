import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE
)

export default async function handler(req,res){

const { id,name,price } = req.body

const { error } = await supabase
.from("products")
.update({
name:name,
price:price
})
.eq("id",id)

if(error){
return res.status(500).json({error:error.message})
}

res.status(200).json({success:true})

}
