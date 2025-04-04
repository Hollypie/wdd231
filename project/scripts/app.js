document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const players = formData.get("players");
    const complexity = formData.get("complexity");
    const genres = formData.getAll("genre[]");
    const mechanics = formData.getAll("mechanics[]");
    const length = formData.get("length");

    const results = filterGames({ players, complexity, genres, mechanics, length });
    displayResults(results);
});

const games = [
    {
        id: 13,
        name: "Catan",
        players: [3, 4],
        complexity: "medium",
        genres: ["strategy", "family"],
        mechanics: ["trading", "tile-placement"],
        length: "1-2-hours"
    },
    {
        id: 822,
        name: "7 Wonders",
        players: [3, 4, 5, 6, 7],
        complexity: "medium",
        genres: ["strategy"],
        mechanics: ["drafting", "set-collection"],
        length: "30-60"
    },
    {
        id: 174430,
        name: "Gloomhaven",
        players: [1, 2, 3, 4],
        complexity: "heavy",
        genres: ["cooperative", "thematic"],
        mechanics: ["tile-placement", "hand-management"],
        length: "2-plus-hours"
    }
    // Add more games!
];

function filterGames(criteria) {
    return games.filter(game => {
        return (
            matchesPlayers(game.players, criteria.players) &&
            game.complexity === criteria.complexity &&
            criteria.genres.every(g => game.genres.includes(g)) &&
            criteria.mechanics.every(m => game.mechanics.includes(m)) &&
            game.length === criteria.length
        );
    });
}

function matchesPlayers(gamePlayers, formPlayers) {
    const count = parseInt(formPlayers);
    if (!isNaN(count)) return gamePlayers.includes(count);

    if (formPlayers === "3-4") return gamePlayers.includes(3) || gamePlayers.includes(4);
    if (formPlayers === "5-6") return gamePlayers.includes(5) || gamePlayers.includes(6);
    if (formPlayers === "7+") return gamePlayers.some(p => p >= 7);
    return false;
}

function displayResults(results) {
    const container = document.getElementById("results");
    container.innerHTML = results.length
        ? results.map(game => `<p><strong>${game.name}</strong> (ID: ${game.id})</p>`).join("")
        : "<p>No matching games found. Try different filters!</p>";
}
