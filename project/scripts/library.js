const url = "data/small_games.json";
const library = document.querySelector("#library");
let gamesData = []; // Store games data globally for reference

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
        let learnMore = document.createElement("button");

        card.setAttribute("class", "gameCard");
        name.textContent = game.name;
        image.setAttribute("src", `images/${game.id}.jpg`);
        image.setAttribute("alt", game.name); 
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "300px");
        image.setAttribute("height", "auto");
        image.setAttribute("class", "gamePic");
        learnMore.setAttribute("class", "more-info-btn");
        learnMore.setAttribute("data-gamename", `${game.name}`);
        learnMore.textContent = "Learn More";

        // Add event listener to the learn more button
        learnMore.addEventListener("click", () => {
            const selectedGame = games.find(g => g.name === game.name);
            if (selectedGame) {
                showGameModal(selectedGame);
            }
        });

        card.append(name, image, learnMore);
        library.appendChild(card);
    });
}

window.addEventListener("DOMContentLoaded", async () => {
    const games = await fetchGameData();
    gamesData = games; // Save games data globally
    displayGameLibrary(games);
});

function showGameModal(game) {
    document.getElementById('modalGameName').textContent = game.name;
    document.getElementById('modalGameImage').src = `images/${game.id}.jpg`;
    document.getElementById('modalGameImage').alt = game.name;
    document.getElementById('modalGamePlayers').textContent = `Players: ${game.min_players}-${game.max_players} players`;
    document.getElementById('modalGameComplexity').textContent = `Complexity: ${game.complexity}`;
    document.getElementById('modalGameGenres').textContent = `Genres: ${game.genres.join(', ')}`;
    document.getElementById('modalGameMechanics').textContent = `Mechanics: ${game.mechanics.join(', ')}`;
    document.getElementById('modalGameLength').textContent = `Play Time: ${game.length} min`;
    document.getElementById('modalGameReview').textContent = `Review: ${game.review}`;
    // Show the modal
    const modal = document.getElementById('gameModal');
    modal.style.display = 'block';
    
    // Set up close button right when we open the modal
    const closeBtn = document.getElementById('closeModalBtn');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };
}

// And update the window click handler to use the right modal ID
window.addEventListener("click", (event) => {
    if (event.target === document.getElementById("gameModal")) {
        document.getElementById("gameModal").style.display = 'none';
    }
});