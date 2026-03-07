document.addEventListener("DOMContentLoaded", async () => {

const user = JSON.parse(localStorage.getItem("user"))

if (!user) {
window.location.href = "/login.html"
return
}

loadProducts(user.sl_uuid)

})

async function loadProducts(uuid){

const response = await fetch(`/api/get-products?creator_uuid=${uuid}`)
const products = await response.json()

const container = document.getElementById("products")

container.innerHTML = ""

products.forEach(product => {

const div = document.createElement("div")

div.className = "productCard"

div.innerHTML = `
<h3>${product.product_name}</h3>
<p>Price: ${product.price}L</p>
<p>Delivery Item: ${product.delivery_item}</p>
`

container.appendChild(div)

})

}
