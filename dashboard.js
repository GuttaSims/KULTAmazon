// Supabase connection
const supabase = window.supabase.createClient(
"https://ppfptnbnafnjyvpjlqch.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZnB0bmJuYWZueWp2cGpscWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NTAyNTAsImV4cCI6MjA4ODMyNjI1MH0.US9eA7wEKFv3U6v4_nhlhl-pr62tKfYctZd46Gj9sIg"
);


// -----------------------------
// Check login session
// -----------------------------

async function checkUser() {

const { data: { session } } = await supabase.auth.getSession()

if(!session){

window.location = "login.html"

}

}

checkUser()


// -----------------------------
// Load products
// -----------------------------

async function loadProducts(){

const { data, error } = await supabase
.from("products")
.select("*")

if(error){

console.log("Error loading products:", error)
return

}

const container = document.getElementById("products")

container.innerHTML = ""

data.forEach(product => {

container.innerHTML += `
<div class="product-card">

<div class="product-name">
${product.name}
</div>

<div class="product-price">
${product.price}L
</div>

</div>
`

})

}

loadProducts()


// -----------------------------
// Add product
// -----------------------------

async function addProduct(){

const name = document.getElementById("name").value
const price = document.getElementById("price").value

if(!name || !price){

alert("Fill out all fields")
return

}

const { data: { user } } = await supabase.auth.getUser()

const { error } = await supabase
.from("products")
.insert([
{
name: name,
price: price,
user_id: user.id
}
])

if(error){

alert(error.message)
return

}

document.getElementById("name").value = ""
document.getElementById("price").value = ""

loadProducts()

}


// -----------------------------
// Logout
// -----------------------------

async function logout(){

await supabase.auth.signOut()

window.location = "login.html"

}
