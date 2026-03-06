document.getElementById("registerForm").addEventListener("submit", async function(e){

e.preventDefault()

const sl_name = document.getElementById("sl_name").value
const uuid = document.getElementById("uuid").value
const email = document.getElementById("email").value
const password = document.getElementById("password").value

const res = await fetch("/api/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
sl_name,
uuid,
email,
password
})
})

const data = await res.json()

document.getElementById("message").innerText = data.message

})
