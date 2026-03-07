const API="/api/get-products"

const grid=document.getElementById("productGrid")
const logout=document.getElementById("logoutBtn")

logout.onclick=()=>{
localStorage.removeItem("user")
window.location="login.html"
}

async function loadProducts(){

const res=await fetch(API)

const products=await res.json()

grid.innerHTML=""

products.forEach(p=>{

const card=document.createElement("div")
card.className="product-card"

card.innerHTML=`

<img src="${p.image || 'https://via.placeholder.com/300'}">

<h3>${p.product_name}</h3>

<p>${p.price}L</p>

<button class="editBtn" onclick="editProduct('${p.product_id}')">
Edit
</button>

`

grid.appendChild(card)

})

}

function editProduct(id){
window.location="edit.html?id="+id
}

loadProducts()
