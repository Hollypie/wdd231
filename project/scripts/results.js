// scripts/results.js
console.log("results.js loaded");

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    const selectedPlayers = params.get("players");
    const selectedComplexity = params.get("complexity");
    const selectedGenres = params.getAll("genre[]");
    const selectedMechanics = params.getAll("mechanics[]");
    const selectedLength = params.get("length");

    fetch("data/small_games.json")  // adjust this path to match your folder structure
        .then(response => response.json())
        .then(games => {
            const filteredGames = games.filter(game => {
                return (
                    matchesPlayers(game, selectedPlayers) &&
                    game.complexity === selectedComplexity &&
                    matchesAny(game.genres, selectedGenres) &&
                    matchesAny(game.mechanics, selectedMechanics) &&
                    matchesLength(game.length, selectedLength)
                );
            });

            displayResults(filteredGames);
        });

    function matchesPlayers(game, selected) {
        const min = game.min_players;
        const max = game.max_players;

        switch (selected) {
            case "1": return min <= 1 && max >= 1;
            case "2": return min <= 2 && max >= 2;
            case "3-4": return max >= 3 && min <= 4;
            case "5-6": return max >= 5 && min <= 6;
            case "7+": return max >= 7;
            default: return true;
        }
    }

    function matchesLength(gameLength, selected) {
        const length = gameLength.toLowerCase();

        if (selected === "under-30") return parseInt(length) < 30;
        if (selected === "30-60") return length.includes("30") || length.includes("45") || length.includes("60");
        if (selected === "1-2-hours") return length.includes("60") || length.includes("90") || length.includes("120");
        if (selected === "2-plus-hours") return parseInt(length) > 120;

        return true;
    }

    function matchesAny(gameTags, selectedTags) {
        return selectedTags.length === 0 || selectedTags.some(tag => gameTags.includes(tag));
    }

    function displayResults(games) {
        const container = document.getElementById("results");
        container.innerHTML = "";

        if (games.length === 0) {
            container.innerHTML = "<p>No games match your criteria.</p>";
            return;
        }

        games.forEach(game => {
            const card = document.createElement("div");
            card.classList.add("game-card");
            card.innerHTML = `
                <h3>${game.name}</h3>
                <img class="gamePic" src="images/${game.id}.jpg" width="300px" alt="${game.name}" loading="lazy">
                <p><strong>Players:</strong> ${game.players}</p>
                <p><strong>Complexity:</strong> ${game.complexity}</p>
                <p><strong>Genres:</strong> ${game.genres.join(", ")}</p>
                <p><strong>Mechanics:</strong> ${game.mechanics.join(", ")}</p>
                <p><strong>Length:</strong> ${game.length} minutes</p>
            `;
            container.appendChild(card);
        });
    }
});
