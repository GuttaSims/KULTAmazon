async function loadProducts(){

const res = await fetch("/api/get-products")

const data = await res.json()

const grid = document.getElementById("productsGrid")

grid.innerHTML = ""

data.products.forEach(product=>{

const card = document.createElement("div")

card.className="product-card"

card.innerHTML=`

<img src="${product.image || ''}">

<h3>${product.name}</h3>

<p>$${product.price}</p>

<p>Stock: ${product.stock}</p>

<button onclick="editProduct(${product.id})">
Edit
</button>

`

grid.appendChild(card)

})

}

function editProduct(id){

window.location.href=`/edit-product.html?id=${id}`

}

function logout(){

localStorage.removeItem("kultUser")
window.location="/login.html"

}

loadProducts()
