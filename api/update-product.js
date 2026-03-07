import { supabase } from "../lib/supabase.js"

export default async function handler(req,res){

if(req.method !== "POST"){
return res.status(405).json({})
}

try{

const {
id,
name,
price,
stock,
vendor_username
} = req.body

const { error } = await supabase
.from("products")
.update({
name,
price,
stock,
vendor_username
})
.eq("id",id)

if(error){
console.error(error)
return res.status(500).json({})
}

res.status(200).json({success:true})

}catch(err){

console.error(err)
res.status(500).json({})

}

}
