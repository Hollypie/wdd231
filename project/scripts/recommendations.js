let games = [];

document.addEventListener('DOMContentLoaded', async () => {
    // Check if we're on the results page or index page
    const isResultsPage = window.location.pathname.includes('results.html');
    console.log('Is Results Page:', isResultsPage);  // Debug: check if on results page

    if (isResultsPage) {
        // Results page functionality
        const filters = getQueryParams();
        console.log('Filters:', filters); // Debug: check filters
        games = await fetchGames();  // Populate games globally
        console.log('Fetched Games:', games); // Debug: check if games were fetched
        const filteredGames = filterGames(games, filters);
        console.log('Filtered Games:', filteredGames); // Debug: check if filtering works
        displayGames(filteredGames);
    }

    // Display interested games on both pages
    displayInterestedGames();
});

// Function to get the query parameters from the URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        players: params.get('players'),
        complexity: params.get('complexity'),
        genres: params.getAll('genre[]'),
        mechanics: params.getAll('mechanics[]'),
        length: params.get('length')
    };
}

// Fetch game data
async function fetchGames() {
    try {
        const response = await fetch('data/small_games.json');
        const gamesData = await response.json();
        console.log('Games fetched:', gamesData);  // Debug: check fetched data
        return gamesData;  // Return the fetched data
    } catch (error) {
        console.error('Error fetching game data:', error);
        return [];
    }
}

// Filter the games based on form input
function filterGames(games, filters) {
    console.log('Filtering games with filters:', filters); // Debug: see the filters being applied
    return games.filter(game => {
        const playerMatch = (() => {
            const min = game.min_players;
            const max = game.max_players;
            switch (filters.players) {
                case '1': return min <= 1 && max >= 1;
                case '2': return min <= 2 && max >= 2;
                case '3-4': return min <= 4 && max >= 3;
                case '5-6': return min <= 6 && max >= 5;
                case '7+': return max >= 7;
                default: return true;
            }
        })();

        const complexityMatch = game.complexity === filters.complexity;
        const genreMatch = filters.genres.length === 0 || filters.genres.some(genre => game.genres.includes(genre));
        const mechanicsMatch = filters.mechanics.length === 0 || filters.mechanics.some(mechanic => game.mechanics.includes(mechanic));
        const lengthMatch = (() => {
            const length = game.length;
            switch (filters.length) {
                case 'under-30': return parseInt(length) < 30;
                case '30-60': return length.includes("30") || length.includes("45") || length === "60";
                case '1-2-hours': return length.includes("60") || length.includes("90") || length === "120";
                case '2-plus-hours': return parseInt(length) > 120;
                default: return true;
            }
        })();

        return playerMatch && complexityMatch && genreMatch && mechanicsMatch && lengthMatch;
    });
}

// Display games on the results page
function displayGames(games) {
    console.log('Displaying games:', games); // Debug: check which games are being displayed
    const resultsDiv = document.getElementById('results');
    if (!resultsDiv) return;

    resultsDiv.innerHTML = games.map(game => `
      <div class="gameCard">
        <img src="images/${game.id}.webp" alt="${game.name}" style="max-width: 200px;">
        <div class=cardDetails>
            <h3>${game.name}</h3>
            <p><strong>Players:</strong> ${game.players}</p>
            <p><strong>Complexity:</strong> ${game.complexity}</p>
            <p><strong>Genres:</strong> ${game.genres.join(', ')}</p>
            <p><strong>Mechanics:</strong> ${game.mechanics.join(', ')}</p>
            <p><strong>Play Time:</strong> ${game.length} min</p>

            <label>
            <input class="check" type="checkbox" name="gameInterest" value="${game.id}" 
                    data-game-image="images/${game.id}.webp"
                    data-game-name="${game.name}">
            Save this Game in My Favorites List
            </label>
        </div>
        <button class="more-info-btn" data-gamename="${game.name}">More Info</button>
      </div>
    `).join('');

    // Add event listeners for "More Info" buttons
    const infoButtons = document.querySelectorAll('.more-info-btn');
    infoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedGame = games.find(g => g.name === button.dataset.gamename);
            if (selectedGame) showGameModal(selectedGame);
        });
    });

    // Setup checkbox event listeners with games data
    setupCheckboxListeners(games);
}

// Function to add a game to the interested list
function addGameToInterested(gameId) {
    console.log('Games array:', games);  // Use the correct variable 'games'
    console.log('GameId:', gameId);

    // Find the game in the 'games' array
    const game = games.find(g => g.id === parseInt(gameId)); // Ensure `game.id` matches your data structure
    if (game) {
        // If the game exists, save it to the interested list in localStorage
        let gamesOfInterest = JSON.parse(localStorage.getItem('gamesOfInterest')) || [];
        gamesOfInterest.push(game); // Add the game to the interest list
        localStorage.setItem('gamesOfInterest', JSON.stringify(gamesOfInterest)); // Update localStorage

        console.log('Game found:', game);
        displayInterestedGames();  // Refresh the Interested Games list immediately
    } else {
        console.log('Game not found');
    }
}

// Function to display selected games on any page
function displayInterestedGames() {
    console.log('Displaying interested games'); // Debug: track when we are displaying interested games
    const interestedListDiv = document.getElementById('interestedList');
    if (!interestedListDiv) return;
    
    const gamesOfInterest = JSON.parse(localStorage.getItem('gamesOfInterest')) || [];
    console.log('Games of Interest:', gamesOfInterest); // Debug: check what games are in the interest list
    
    if (gamesOfInterest.length === 0) {
        interestedListDiv.innerHTML = '<p>You have no games saved yet. Do a search and if you find a game you are interested in the results, click the checkbox to save and they will be added you a list of your favorites.</p>';
        return;
    }
    
    let html = '<div class="interested-games-grid">';
    
    gamesOfInterest.forEach(game => {
        html += `
            <div class="interested-game">
                <img src="images/${game.id}.webp" alt="${game.name}" width="300" loading="lazy">
                <div class="interest-gameinfo">
                    <h4>${game.name}</h4>
                    <button class="remove-interest" data-game-id="${game.id}">Remove</button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    interestedListDiv.innerHTML = html;
    
    // Add event listeners to the remove buttons
    document.querySelectorAll('.remove-interest').forEach(button => {
        button.addEventListener('click', function() {
            const gameId = this.getAttribute('data-game-id');
            removeInterestedGame(gameId);
        });
    });
}

// Function to remove a game from the interested list
function removeInterestedGame(gameId) {
    console.log('Removing game from interested:', gameId); // Debug: check game being removed
    let gamesOfInterest = JSON.parse(localStorage.getItem('gamesOfInterest')) || [];
    gamesOfInterest = gamesOfInterest.filter(game => game.id !== parseInt(gameId));  // Ensure correct comparison

    localStorage.setItem('gamesOfInterest', JSON.stringify(gamesOfInterest));  // Update localStorage

    // Refresh the interested games list
    displayInterestedGames();
}

function setupCheckboxListeners() {
    console.log('Setting up checkbox listeners'); // Debug: track checkbox listener setup
    const existingGames = JSON.parse(localStorage.getItem('gamesOfInterest')) || [];
    const existingGameIds = new Set(existingGames.map(game => game.id)); // Use game.id directly

    document.querySelectorAll('input[name="gameInterest"]').forEach(checkbox => {
        const gameId = checkbox.value;
        checkbox.checked = existingGameIds.has(gameId);

        checkbox.addEventListener('change', function() {
            console.log(`Checkbox for ${gameId} was clicked. Checked: ${this.checked}`); // Debug: track checkbox changes

            if (this.checked) {
                addGameToInterested(gameId);  // Pass the gameId directly
            } else {
                removeInterestedGame(gameId);
            }
        });
    });
}

console.log('Path:', window.location.pathname);  // Debug: check page path

// Function to show the modal with game details
function showGameModal(game) {
    // Populate the modal with game data
    document.getElementById('modalGameName').textContent = game.name;
    document.getElementById('modalGameImage').src = `images/${game.id}.webp`;
    document.getElementById('modalGameImage').alt = game.name;
    document.getElementById('modalGamePlayers').textContent = `Players: ${game.players}`;
    document.getElementById('modalGameComplexity').textContent = `Complexity: ${game.complexity}`;
    document.getElementById('modalGameGenres').textContent = `Genres: ${game.genres.join(', ')}`;
    document.getElementById('modalGameMechanics').textContent = `Mechanics: ${game.mechanics.join(', ')}`;
    document.getElementById('modalGameLength').textContent = `Play Time: ${game.length} min`;
    
    // Display the modal
    document.getElementById('gameModal').style.display = 'block';
}

// Add event listeners when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Existing code here...
    
    // Close modal when clicking the X button
    const closeBtn = document.getElementById('closeModalBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            document.getElementById('gameModal').style.display = 'none';
        });
    }
    
    // Close modal when clicking outside the modal content
    const modal = document.getElementById('gameModal');
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});
