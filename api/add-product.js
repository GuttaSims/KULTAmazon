import { supabase } from "../lib/supabase.js"

export default async function handler(req,res){

if(req.method !== "POST"){
return res.status(405).json({})
}

try{

const {
name,
price,
image,
stock,
box_size
} = req.body

const { error } = await supabase
.from("products")
.insert([
{
name,
price,
image,
stock,
box_size
}
])

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
