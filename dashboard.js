async function loadProducts(){

try{

const res = await fetch("/api/products");

if(!res.ok) throw new Error("API error");

const data = await res.json();

const grid = document.getElementById("products");

grid.innerHTML="";

(data.products || []).forEach(p=>{

const card=document.createElement("div");
card.className="product-card";

card.innerHTML=`
<h3>${p.name}</h3>
<p>${p.price}L</p>
<button onclick="editProduct('${p.id}')">Edit</button>
`;

grid.appendChild(card);

});

}catch(e){

console.error("Products failed",e);

}

}



async function loadVendors(){

try{

const res = await fetch("/api/get-vendors");

if(!res.ok) throw new Error("API error");

const data = await res.json();

const table=document.getElementById("vendorTable");

table.innerHTML="";

(data.vendors || []).forEach(v=>{

const lastSeen=new Date(v.last_seen);
const online=(Date.now()-lastSeen.getTime())<120000;

const row=document.createElement("tr");

row.innerHTML=`
<td>${v.name||"Vendor"}</td>
<td>${v.region||"-"}</td>
<td>${v.position||"-"}</td>
<td class="${online?"online":"offline"}">
${online?"ONLINE":"OFFLINE"}
</td>
`;

table.appendChild(row);

});

}catch(e){

console.error("Vendor load failed",e);

}

}



function editProduct(id){

window.location="/edit-product.html?id="+id;

}



async function logout(){

await fetch("/api/logout",{method:"POST"});

window.location="/login.html";

}



document.getElementById("logoutBtn").addEventListener("click",logout);



loadProducts();
loadVendors();

setInterval(loadVendors,10000);
