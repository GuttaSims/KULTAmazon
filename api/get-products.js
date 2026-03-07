import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE

if (!supabaseUrl || !supabaseKey) {
  return res.status(500).json({
    error: "Server crashed",
    details: "supabaseKey is required."
  })
}

const supabase = createClient(supabaseUrl, supabaseKey)

const { data, error } = await supabase
  .from('products')
  .select('*')

if (error) {
  return res.status(500).json(error)
}

res.status(200).json(data)

}

    return res.status(200).json(data)

  } catch (err) {
    return res.status(500).json({
      error: "Server crashed",
      details: err.message
    })
  }

}
