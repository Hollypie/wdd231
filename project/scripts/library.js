const url = "data/small_games.json";
const library = document.querySelector("#library");

async function fetchGameData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error loading game data:", error);
        return [];
    }
}

function displayGameLibrary(games) {
    library.innerHTML = "";

    games.forEach((game) => {
        let card = document.createElement("section");
        let name = document.createElement("h2");
        let image = document.createElement("img");

        name.textContent = game.name;
        image.setAttribute("src", `images/${game.id}.jpg`);
        image.setAttribute("alt", game.name); 
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "300px");
        image.setAttribute("height", "auto");
        image.setAttribute("class", "gamePic");

        card.append(name, image);
        library.appendChild(card);
    });
}

window.addEventListener("DOMContentLoaded", async () => {
    const games = await fetchGameData();
    displayGameLibrary(games);
});

