const params=new URLSearchParams(window.location.search)
const id=params.get("id")

const name=document.getElementById("name")
const price=document.getElementById("price")
const image=document.getElementById("image")
const box=document.getElementById("box")
const vendor=document.getElementById("vendor")

async function loadProduct(){

const res=await fetch("/api/get-product?id="+id)

const p=await res.json()

name.value=p.vendor_name||p.product_name
price.value=p.vendor_price||p.price
image.value=p.image||""
box.value=p.box_size||"small"

}

async function loadVendors(){

const res=await fetch("/api/get-vendors")

const vendors=await res.json()

vendors.forEach(v=>{

const opt=document.createElement("option")

opt.value=v.vendor_uuid
opt.textContent=v.vendor_uuid

vendor.appendChild(opt)

})

}

document.getElementById("saveBtn").onclick=async()=>{

await fetch("/api/update-product",{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({

product_id:id,
vendor_price:price.value,
image:image.value,
vendor_name:name.value,
box_size:box.value,
vendor_uuid:vendor.value

})
})

alert("Product Updated")

}

loadProduct()
loadVendors()
