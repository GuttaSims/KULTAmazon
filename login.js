document.getElementById("loginBtn").addEventListener("click", login);

async function login(){

const username=document.getElementById("username").value;
const password=document.getElementById("password").value;

try{

const res=await fetch("/api/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({username,password})

});

const data=await res.json();

if(data.success){

window.location="/dashboard.html";

}else{

document.getElementById("error").innerText=data.error||"Login failed";

}

}catch(err){

console.error(err);
document.getElementById("error").innerText="Server error";

}

}
