const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let cryptoData = [];

// ---------------------------
// FETCH USING ASYNC / AWAIT
// ---------------------------
async function fetchData() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        cryptoData = data;
        renderTable(data);
    } catch (err) {
        console.log("Error fetching API:", err);
    }
}

fetchData();

// ---------------------------
// RENDER TABLE
// ---------------------------
function renderTable(list) {
    const table = document.getElementById("cryptoTable");
    table.innerHTML = "";

    list.forEach((coin) => {
        table.innerHTML += `
            <tr>
                <td><img src="${coin.image}" alt=""></td>
                <td>${coin.id}</td>
                <td>${coin.name}</td>
                <td>${coin.symbol.toUpperCase()}</td>
                <td>$${coin.current_price}</td>
                <td>${coin.total_volume}</td>
                <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'};">
                    ${coin.price_change_percentage_24h.toFixed(2)}%
                </td>
            </tr>
        `;
    });
}

// ---------------------------
// SEARCH FUNCTIONALITY
// ---------------------------
document.getElementById("searchBtn").addEventListener("click", () => {
    const value = document.getElementById("searchInput").value.toLowerCase();

    const filtered = cryptoData.filter(
        (coin) =>
            coin.name.toLowerCase().includes(value) ||
            coin.symbol.toLowerCase().includes(value)
    );

    renderTable(filtered);
});

// ---------------------------
// SORT BY MARKET CAP
// ---------------------------
document.getElementById("sortMcap").addEventListener("click", () => {
    const sorted = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sorted);
});

// ---------------------------
// SORT BY % CHANGE (24h)
// ---------------------------
document.getElementById("sortChange").addEventListener("click", () => {
    const sorted = [...cryptoData].sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    renderTable(sorted);
});
