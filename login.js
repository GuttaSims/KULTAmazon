if(localStorage.getItem("kultUser")){
window.location.href = "index.html";
}

document.getElementById("loginBtn").addEventListener("click", login);

async function login(){

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

const error = document.getElementById("error");
error.innerText = "";

try{

const res = await fetch("/api/login",{
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

localStorage.setItem("kultUser", username);

window.location.href = "index.html";

}else{

error.innerText = data.error || "Invalid login";

}

}catch(err){

console.error(err);
error.innerText = "Server error";

}

}
