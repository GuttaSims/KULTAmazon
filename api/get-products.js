import supabase from "./supabase.js";

export default async function handler(req, res) {

  const { owner } = req.query;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("owner", owner);

  if (error) {
    return res.status(500).json(error);
  }

  res.status(200).json(data);
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
