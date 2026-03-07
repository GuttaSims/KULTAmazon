async function loadProducts(){

const res=await fetch("/api/products");

const data=await res.json();

const container=document.getElementById("products");

container.innerHTML="";

(data.products||[]).forEach(p=>{

const div=document.createElement("div");

div.innerHTML=`
<b>${p.name}</b> - ${p.price}L
`;

container.appendChild(div);

});

}


async function loadVendors(){

const res=await fetch("/api/get-vendors");

const data=await res.json();

const table=document.getElementById("vendorTable");

table.innerHTML="";

data.vendors.forEach(v=>{

const row=document.createElement("tr");

row.innerHTML=`
<td>${v.name}</td>
<td>${v.region}</td>
<td>${v.position}</td>
<td>ONLINE</td>
`;

table.appendChild(row);

});

}


async function logout(){

await fetch("/api/logout",{method:"POST"});

window.location="/login.html";

}


loadProducts();
loadVendors();
