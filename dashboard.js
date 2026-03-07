async function loadDashboard(){

loadProducts();
loadVendors();

}

async function loadProducts(){

const res = await fetch("/api/products");
const data = await res.json();

const grid = document.getElementById("products");

grid.innerHTML = "";

data.products.forEach(p => {

const card = document.createElement("div");
card.className = "product-card";

card.innerHTML = `

<h3>${p.name}</h3>

<p>${p.price}L</p>

<button onclick="editProduct(${p.id})">Edit</button>

`;

grid.appendChild(card);

});

}


async function loadVendors(){

const res = await fetch("/api/get-vendors");
const data = await res.json();

const table = document.getElementById("vendorTable");

table.innerHTML = "";

data.vendors.forEach(v => {

const lastSeen = new Date(v.last_seen);
const now = new Date();

const online = (now - lastSeen) < 120000;

const row = document.createElement("tr");

row.innerHTML = `

<td>${v.name || "Vendor"}</td>
<td>${v.region || "Unknown"}</td>
<td>${v.position || "Unknown"}</td>
<td class="${online ? "online":"offline"}">
${online ? "ONLINE":"OFFLINE"}
</td>

`;

table.appendChild(row);

});

}

function editProduct(id){

window.location = "/edit-product.html?id=" + id;

}

function logout(){

fetch("/api/logout").then(()=>{

window.location="/login.html"

})

}

loadDashboard();

setInterval(loadVendors,10000);
