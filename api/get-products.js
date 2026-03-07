import { supabase } from "/api/supabase.js"

export default async function handler(req,res){

try{

const { data, error } = await supabase
.from("products")
.select("*")
.order("id",{ascending:false})

if(error){
console.error(error)
return res.status(500).json({products:[]})
}

res.status(200).json({
products:data
})

}catch(err){

console.error(err)

res.status(500).json({
products:[]
})

}

}
