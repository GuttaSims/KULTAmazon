async function loadVendors(){

try {

const res = await fetch("/api/get-vendors")

const data = await res.json()

const table = document.querySelector("table")

if(!data.vendors || data.vendors.length === 0){
return
}

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

function logout(){

localStorage.removeItem("kultUser")

window.location.href = "/login.html"

}

loadVendors()
