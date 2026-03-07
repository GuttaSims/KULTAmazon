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

}
async function loadProducts(){

const vendor = localStorage.getItem("kultUser")

if(!vendor) return

try {

const res = await fetch(`/api/get-products?vendor=${vendor}`)
const data = await res.json()

const table = document.getElementById("productsTable")

if(!table) return

data.products.forEach(product => {

const row = document.createElement("tr")

row.innerHTML = `
<td>${product.name}</td>
<td>$${product.price}</td>
<td>${product.stock}</td>
<td>
<button onclick="editProduct(${product.id})">Edit</button>
</td>
`

table.appendChild(row)

})

} catch(err){

console.error("Product load error:", err)

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
