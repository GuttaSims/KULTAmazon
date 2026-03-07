async function fetchVendors() {

  const response = await fetch("/api/get-vendors")
  const vendors = await response.json()

  const table = document.getElementById("vendorsBody")
  table.innerHTML = ""

  const now = Date.now()

  vendors.forEach(vendor => {

    const lastSeen = new Date(vendor.last_seen).getTime()

    const online = now - lastSeen < 120000

    const row = document.createElement("tr")

    row.innerHTML = `
      <td>${vendor.vendor_name}</td>
      <td>${vendor.region}</td>
      <td>${vendor.position}</td>
      <td style="color:${online ? "lime" : "red"}">
        ${online ? "ONLINE" : "OFFLINE"}
      </td>
    `

    table.appendChild(row)

  })
}

fetchVendors()

setInterval(fetchVendors, 10000)
