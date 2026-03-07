document.addEventListener("DOMContentLoaded", () => {

  // If already logged in, go to dashboard
  const existingUser = localStorage.getItem("kultUser")
  if (existingUser) {
    window.location.href = "/index.html"
    return
  }

  const form = document.getElementById("loginForm")
  const error = document.getElementById("error")

  if (!form) {
    console.error("Login form not found")
    return
  }

  form.addEventListener("submit", async (e) => {

    e.preventDefault()

    const username = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value.trim()

    error.innerText = ""

    try {

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })

      const data = await response.json()

      if (data.success) {

        // store logged-in user
        localStorage.setItem("kultUser", username)

        // redirect to dashboard
        window.location.href = "/index.html"

      } else {

        error.innerText = data.error || "Login failed"

      }

    } catch (err) {

      console.error("Login error:", err)
      error.innerText = "Server error"

    }

  })

})
