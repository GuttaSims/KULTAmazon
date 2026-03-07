// Check if user is logged in
const user = JSON.parse(localStorage.getItem("user"))

if (!user) {
window.location.href = "/login.html"
}

// Display username
const usernameDisplay = document.getElementById("usernameDisplay")
if (usernameDisplay) {
usernameDisplay.innerText = user.username
}

// Logout function
function logout() {

localStorage.removeItem("user")

window.location.href = "/login.html"

}

window.logout = logout



// LOAD PRODUCTS
async function loadProducts() {

const res = await fetch("/api/get-products", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
user_id: user.id
})
})

const data = await res.json()

const container = document.getElementById("productList")

if (!container) return

container.innerHTML = ""

data.products.forEach(product => {

const div = document.createElement("div")
div.className = "productCard"

div.innerHTML = `
<h3>${product.name}</h3>
<p>Price: L$${product.price}</p>
<p>Box Size: ${product.box_size}</p>
`

container.appendChild(div)

})

}



// LOAD VENDORS
async function loadVendors() {

const res = await fetch("/api/get-vendors", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
user_id: user.id
})
})

const data = await res.json()

const container = document.getElementById("vendorList")

if (!container) return

container.innerHTML = ""

data.vendors.forEach(vendor => {

const div = document.createElement("div")
div.className = "vendorCard"

div.innerHTML = `
<h3>Vendor UUID</h3>
<p>${vendor.vendor_uuid}</p>
<p>Product: ${vendor.product_id || "None Assigned"}</p>
`

container.appendChild(div)

})

}



// ASSIGN PRODUCT TO VENDOR
async function assignProduct(vendor_uuid, product_id) {

await fetch("/api/assign-product", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
vendor_uuid,
product_id
})

})

alert("Product assigned!")

loadVendors()

}



window.assignProduct = assignProduct



// INITIAL LOAD
loadProducts()
loadVendors()
