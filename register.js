document.getElementById("registerBtn").addEventListener("click", register);

async function register(){

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

const error = document.getElementById("error");
error.innerText = "";

try{

const res = await fetch("/api/register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
username:username,
password:password
})
});

const data = await res.json();

if(data.success){

alert("Account created. Please login.");

window.location.href = "login.html";

}else{

error.innerText = data.error || "Registration failed";

}

}catch(err){

console.error(err);
error.innerText = "Server error";

}

}
