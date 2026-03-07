async function loadVendors(){

try {

const res = await fetch("/api/get-vendors")
const data = await res.json()

const table = document.getElementById("vendorsTable")

data.vendors.forEach(vendor => {

const row = document.createElement("tr")

row.innerHTML = `
<td>${vendor.username}</td>
<td>${vendor.region || "-"}</td>
<td>${vendor.position || "-"}</td>
<td>${vendor.status || "offline"}</td>
`

table.appendChild(row)

})

} catch(err){

console.error("Vendor load error:", err)

}

async function loadProducts() {

const vendor = localStorage.getItem("kultUser")

if (!vendor) {
console.log("No vendor logged in")
return
}

try {

const res = await fetch(`/api/get-products?vendor=${vendor}`)

if (!res.ok) {
console.error("Server returned error:", res.status)
return
}

const data = await res.json()

console.log("Products from server:", data)

const grid = document.getElementById("productsGrid")

grid.innerHTML = ""

if (!data.products || data.products.length === 0) {
grid.innerHTML = "<p>No products found</p>"
return
}

data.products.forEach(product => {

const card = document.createElement("div")

card.className = "product-card"

card.innerHTML = `
<img src="${product.image || '/placeholder.png'}">

<div class="product-name">${product.name}</div>

<div class="product-price">$${product.price}</div>

<div class="product-stock">
Stock: ${product.stock}
</div>

<div class="product-buttons">
<button onclick="editProduct(${product.id})">Edit</button>
<button onclick="deleteProduct(${product.id})">Delete</button>
</div>
`

grid.appendChild(card)

})

} catch (err) {

console.error("Failed to load products:", err)

}

}
function editProduct(id){
window.location.href = `/edit-product.html?id=${id}`
}

function logout(){
localStorage.removeItem("kultUser")
window.location.href = "/login.html"
}
loadVendors()
loadProducts()
