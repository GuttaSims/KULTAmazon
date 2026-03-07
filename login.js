document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("loginForm")
const message = document.getElementById("message")

form.addEventListener("submit", async (e) => {

e.preventDefault()

const username = document.getElementById("username").value
const password = document.getElementById("password").value

try {

const response = await fetch("/api/login", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
username,
password
})

})

const data = await response.json()

console.log(data)

if(data.success){

localStorage.setItem("user", JSON.stringify(data.user))

window.location.href = "/index.html"

}else{

message.innerText = "Invalid username or password"

}

}catch(err){

message.innerText = "Server error"

console.error(err)

}

})

})
