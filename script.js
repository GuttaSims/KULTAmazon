document.addEventListener("DOMContentLoaded", () => {

loadVendors()
loadProducts()

})

async function loadVendors() {

try {

const res = await fetch("/api/get-vendors")
const data = await res.json()

const table = document.getElementById("vendorsTable")

if (!table || !data.vendors) return

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

} catch (err) {

console.error("Vendor error:", err)

}

}

async function loadProducts() {

const vendor = localStorage.getItem("kultUser")

if (!vendor) return

try {

const res = await fetch(`/api/get-products?vendor=${vendor}`)
const data = await res.json()

const grid = document.getElementById("productsGrid")

if (!grid || !data.products) return

grid.innerHTML = ""

data.products.forEach(product => {

const card = document.createElement("div")

card.className = "product-card"

card.innerHTML = `
<div class="product-name">${product.name}</div>
<div>$${product.price}</div>
<div>Stock: ${product.stock}</div>
<button onclick="editProduct(${product.id})">Edit</button>
`

grid.appendChild(card)

})

} catch (err) {

console.error("Product error:", err)

}

}

function editProduct(id) {

window.location.href = `/edit-product.html?id=${id}`

}

function logout() {

localStorage.removeItem("kultUser")
window.location.href = "/login.html"

}
