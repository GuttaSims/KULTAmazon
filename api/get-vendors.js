async function fetchVendors() {

  const response = await fetch("/api/get-vendors")
  const vendors = await response.json()

  const container = document.getElementById("vendorsContainer")
  container.innerHTML = ""

  const now = Date.now()

  vendors.forEach(vendor => {

    const lastSeen = new Date(vendor.last_seen).getTime()

    const online = now - lastSeen < 120000

    const card = document.createElement("div")
    card.className = "product-card"

    card.innerHTML = `
      <h3>${vendor.vendor_name}</h3>
      <p>${vendor.region}</p>
      <p>${vendor.position}</p>

      <p style="color:${online ? "#00ff88" : "#ff4444"}">
        ${online ? "ONLINE" : "OFFLINE"}
      </p>

      <button onclick="manageVendor('${vendor.vendor_uuid}')">
        Manage
      </button>
    `

    container.appendChild(card)

  })
}

fetchVendors()
setInterval(fetchVendors, 10000)
