// Function to display the games (with checkboxes for interest)
function displayGames(games) {
    const resultsDiv = document.getElementById('results');
    if (games.length === 0) {
        resultsDiv.innerHTML = "<p>No matching games found. Try different filters!</p>";
        return;
    }

    resultsDiv.innerHTML = games.map(game => `
        <div class="game-card">
            <img src="${game.imageUrl}" alt="${game.name}" style="max-width: 200px;">
            <h3>${game.name}</h3>
            <p><strong>Players:</strong> ${game.players}</p>
            <p><strong>Complexity:</strong> ${game.complexity}</p>
            <p><strong>Genres:</strong> ${game.genres.join(', ')}</p>
            <p><strong>Mechanics:</strong> ${game.mechanics.join(', ')}</p>
            <p><strong>Play Time:</strong> ${game.length} min</p>

            <!-- Add a checkbox for users to mark if they're interested in this game -->
            <label>
                <input type="checkbox" name="gameInterest" value="${game.name}">
                Interested
            </label>
        </div>
    `).join('');
}

// Save the selected games to localStorage when the form is submitted
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    const selectedGames = [];
    const checkboxes = document.querySelectorAll('input[name="gameInterest"]:checked');
    checkboxes.forEach(checkbox => {
        selectedGames.push(checkbox.value);
    });

    // Store the selected games in localStorage
    localStorage.setItem('gamesOfInterest', JSON.stringify(selectedGames));

    // Optionally, update the "Your Interested Games" section here
    displayInterestedGames();
});

// Function to display previously selected interested games
function displayInterestedGames() {
    const gamesOfInterest = JSON.parse(localStorage.getItem('gamesOfInterest')) || [];
    const interestedListDiv = document.getElementById('interestedList');

    if (gamesOfInterest.length > 0) {
        interestedListDiv.innerHTML = gamesOfInterest.join('<br>');
    } else {
        interestedListDiv.innerHTML = '<p>No games selected yet.</p>';
    }
}

// Call this function when the page loads to display saved games
displayInterestedGames();

// When the page is ready, fetch and display filtered games
document.addEventListener('DOMContentLoaded', async () => {
    const filters = getQueryParams();
    const games = await fetchGames(); // or use inline JSON
    const filteredGames = filterGames(games, filters);
    displayGames(filteredGames);  // Display the games with checkboxes
});
