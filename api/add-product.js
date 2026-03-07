import { supabase } from "../lib/supabase.js"

export default async function handler(req,res){

if(req.method !== "POST"){
return res.status(405).json({error:"Method not allowed"})
}

try{

const {
name,
price,
image,
stock
} = req.body

const { data, error } = await supabase
.from("products")
.insert([
{
name,
price,
image,
stock,
vendor_username:null
}
])

if(error){
console.error(error)
return res.status(500).json({error:error.message})
}

res.status(200).json({success:true})

}catch(err){

console.error(err)
res.status(500).json({error:"Server error"})

}

}
