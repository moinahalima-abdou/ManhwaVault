let favorites = JSON.parse(localStorage.getItem("fav")) || [];

async function loadManga(search = "solo") {
    let container = document.getElementById("list");
    container.innerHTML = "Chargement... ⏳";

    let res = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=10`);
    let data = await res.json();

    container.innerHTML = "";

    data.data.forEach((m) => {
        container.innerHTML += `
        <div class="card">
            <img src="${m.images.jpg.image_url}">
            <h3>${m.title}</h3>
            <p>Score: ${m.score || "N/A"}</p>
            <button onclick="addFav('${m.title}')">⭐ Favori</button>
        </div>
        `;
    });
}

function addFav(title) {
    favorites.push(title);
    localStorage.setItem("fav", JSON.stringify(favorites));
    alert("Ajouté aux favoris ⭐");
}

function search() {
    let val = document.getElementById("search").value;
    loadManga(val);
}

loadManga();