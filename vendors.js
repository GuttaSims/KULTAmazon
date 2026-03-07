async function loadVendors(){

const res = await fetch("/api/get-vendors");
const data = await res.json();

const vendors = data.vendors || [];

const grid = document.getElementById("vendors");

grid.innerHTML = "";

vendors.forEach(v => {

const lastSeen = new Date(v.last_seen);
const now = new Date();

const secondsAgo = (now - lastSeen) / 1000;

const online = secondsAgo < 120;

const card = document.createElement("div");
card.className = "product-card";

card.innerHTML = `

<div class="product-header">
<span class="status ${online ? "online":"offline"}"></span>
</div>

<div class="product-body">

<h3>Vendor</h3>

<p class="uuid">${v.vendor_uuid}</p>

<p class="creator">Creator: ${v.creator_uuid}</p>

<p class="seen">
Last Seen<br>
${lastSeen.toLocaleString()}
</p>

</div>

`;

grid.appendChild(card);

});

}

loadVendors();

setInterval(loadVendors,10000);
