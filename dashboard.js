const user = JSON.parse(localStorage.getItem("user"))

if(!user){
window.location.href="/login.html"
}

// display username if element exists
const nameDisplay = document.getElementById("usernameDisplay")

if(nameDisplay){
nameDisplay.innerText = user.username
}

// logout function
function logout(){

localStorage.removeItem("user")

window.location.href="/login.html"

}

// expose logout to HTML
window.logout = logout
