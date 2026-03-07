const API = "/api"

document.addEventListener("DOMContentLoaded", async () => {

const user = JSON.parse(localStorage.getItem("user"))

if(!user){
window.location.href = "/login.html"
return
}

document.getElementById("logoutBtn").onclick = logout

loadProducts(user.sl_uuid)
loadVendors(user.sl_uuid)

})

function logout(){

localStorage.removeItem("user")
window.location.href = "/login.html"

}

async function loadProducts(uuid){

const res = await fetch(`${API}/get-products?creator_uuid=${uuid}`)
const products = await res.json()

const container = document.getElementById("products")
const dropdown = document.getElementById("productSelect")

container.innerHTML = ""
dropdown.innerHTML = ""

products.forEach(p=>{

const card = document.createElement("div")

card.className = "productCard"

card.innerHTML = `
<h3>${p.product_name}</h3>
<p>Price: ${p.price}L</p>
<p>Delivery Item: ${p.delivery_item}</p>
`

container.appendChild(card)

const option = document.createElement("option")
option.value = p.product_id
option.textContent = p.product_name

dropdown.appendChild(option)

})

}

async function loadVendors(uuid){

const res = await fetch(`${API}/get-vendors?creator_uuid=${uuid}`)
const vendors = await res.json()

const dropdown = document.getElementById("vendorSelect")
dropdown.innerHTML = ""

vendors.forEach(v=>{

if(v.active !== false){

const option = document.createElement("option")

option.value = v.vendor_uuid
option.textContent = v.vendor_uuid

dropdown.appendChild(option)

}

})

}
