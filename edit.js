const params = new URLSearchParams(window.location.search)

const id = params.get("id")

async function saveProduct(){

const name=document.getElementById("name").value
const price=document.getElementById("price").value
const stock=document.getElementById("stock").value
const vendor=document.getElementById("vendor").value

await fetch("/api/update-product",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
id,
name,
price,
stock,
vendor_username:vendor
})

})

alert("Saved")

window.location="/dashboard.html"

}
function goBack(){

window.location.href = "/dashboard.html"

}
