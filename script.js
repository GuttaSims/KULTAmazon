const user = localStorage.getItem("kultUser");

if(!user){

window.location.href = "login.html";

}

async function loadVendors(){

try{

const res = await fetch("/api/get-vendors");

const data = await res.json();

const table = document.getElementById("vendorTable");

table.innerHTML = "";

data.vendors.forEach(vendor => {

const row = document.createElement("tr");

row.innerHTML = `
<td>${vendor.name}</td>
<td>${vendor.region}</td>
<td>${vendor.position}</td>
<td>${vendor.online ? "ONLINE" : "OFFLINE"}</td>
`;

table.appendChild(row);

});

}catch(err){

console.error(err);

}

}

function logout(){

localStorage.removeItem("kultUser");

window.location.href = "login.html";

}

loadVendors();
