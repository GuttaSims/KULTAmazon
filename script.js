async function loadProducts(){

const vendor = localStorage.getItem("kultUser")

if(!vendor){
window.location.href = "/login.html"
return
}

try {

const res = await fetch(`/api/get-products?vendor=${vendor}`)

const data = await res.json()

const table = document.getElementById("productsTable")

table.innerHTML = `
<tr>
<th>Name</th>
<th>Price</th>
<th>Stock</th>
<th>Edit</th>
</tr>
`

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

loadProducts()
