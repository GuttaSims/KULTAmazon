const form = document.getElementById("registerForm")

if(form){

form.addEventListener("submit", async (e)=>{

e.preventDefault()

const username = document.getElementById("username").value
const email = document.getElementById("email").value
const password = document.getElementById("password").value
const sl_name = document.getElementById("sl_name").value
const sl_uuid = document.getElementById("sl_uuid").value

const res = await fetch("/api/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username,
email,
password,
sl_name,
sl_uuid
})
})

const data = await res.json()

if(data.success){

alert("Account created!")

window.location.href="/login.html"

}else{

alert(data.error)

}

})

}
