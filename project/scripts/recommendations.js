document.addEventListener('DOMContentLoaded', async () => {
    // Check if we're on the results page or index page
    const isResultsPage = window.location.pathname.includes('results.html');
    
    if (isResultsPage) {
        // Results page functionality
        const filters = getQueryParams();
        const games = await fetchGames();
        const filteredGames = filterGames(games, filters);
        displayGames(filteredGames);
        
        // Add event listener for the "Save Interested Games" button
        const saveButton = document.getElementById('saveInterested');
        if (saveButton) {
            saveButton.addEventListener('click', saveInterestedGames);
        }
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
        return await response.json();
    } catch (error) {
        console.error('Error fetching game data:', error);
        return [];
    }
}

// Filter the games based on form input
function filterGames(games, filters) {
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
    const resultsDiv = document.getElementById('results');
    if (!resultsDiv) {
        console.error("No 'results' div found.");
        return;
    }

    if (games.length === 0) {
        resultsDiv.innerHTML = "<p>No matching games found. Try different filters!</p>";
        return;
    }

    // Get the current list of interested games
    const gamesOfInterest = JSON.parse(localStorage.getItem('gamesOfInterest')) || [];
    const interestedIds = new Set(gamesOfInterest.map(game => game.id || game.name));
    
    // Create HTML for game cards with checkboxes
    let gamesHTML = `
        <div class="game-results">
            <h2>${games.length} Games Found</h2>
            <div class="game-grid">
    `;
    
    games.forEach(game => {
        // Construct the image path using the game ID
        const gameId = game.id || game.name.toLowerCase().replace(/\s+/g, '-');
        const imagePath = `images/${gameId}.jpg`; // Adjust extension if needed (.png, .webp, etc.)
        
        const isInterested = interestedIds.has(game.id || game.name);
            
        gamesHTML += `
            <div class="game-card">
                <img src="${imagePath}" alt="${game.name}" loading="lazy">
                <h3>${game.name}</h3>
                <p><strong>Players:</strong> ${game.players}</p>
                <p><strong>Complexity:</strong> ${game.complexity}</p>
                <p><strong>Genres:</strong> ${game.genres.join(', ')}</p>
                <p><strong>Mechanics:</strong> ${game.mechanics.join(', ')}</p>
                <p><strong>Play Time:</strong> ${game.length} min</p>
                <div class="interest-checkbox">
                    <label>
                        <input type="checkbox" name="gameInterest" 
                               value="${game.id || game.name}" 
                               data-game-name="${game.name}"
                               data-game-image="${imagePath}"
                               ${isInterested ? 'checked' : ''}>
                        I'm interested in this game
                    </label>
                </div>
            </div>
        `;
    });
    
    gamesHTML += `
            </div>
            <button id="saveInterested" type="button" class="save-button">Save My Interested Games</button>
        </div>
    `;
    
    resultsDiv.innerHTML = gamesHTML;
    
    // Set up checkbox event listeners and save button
    setupCheckboxListeners();
    
    // Add event listener for the "Save Interested Games" button
    const saveButton = document.getElementById('saveInterested');
    if (saveButton) {
        saveButton.addEventListener('click', saveInterestedGames);
    }
}

// Save the selected games to localStorage
// Save the selected games to localStorage
function saveInterestedGames() {
    const checkboxes = document.querySelectorAll('input[name="gameInterest"]:checked');
    
    // Get existing games of interest first
    const existingGames = JSON.parse(localStorage.getItem('gamesOfInterest')) || [];
    
    // Create a map of existing game IDs for easy lookup
    const existingGameIds = new Set(existingGames.map(game => game.id || game.name));
    
    // Create an array to hold new games
    const newGames = [];
    
    // Process checked games
    checkboxes.forEach(checkbox => {
        const gameId = checkbox.value;
        
        // Skip if this game is already in our interested list
        if (existingGameIds.has(gameId)) return;
        
        const gameName = checkbox.getAttribute('data-game-name');
        let imagePath = checkbox.getAttribute('data-game-image');
        
        // Ensure we're storing the proper image path
        if (!imagePath || !imagePath.includes('/')) {
            // Construct path if needed
            imagePath = `images/${gameId}.jpg`; // Adjust extension if needed
        }
        
        newGames.push({
            id: gameId,
            name: gameName,
            imageUrl: imagePath
        });
    });
    
    // Combine existing and new games
    const allGames = [...existingGames, ...newGames];
    
    // Store the combined list in localStorage
    localStorage.setItem('gamesOfInterest', JSON.stringify(allGames));
    
    // Show confirmation and update the displayed list
    alert(`${newGames.length} new game(s) added to your interested list!`);
    displayInterestedGames();
}

// Function to display selected games on any page
// Function to display selected games on any page
function displayInterestedGames() {
    const interestedListDiv = document.getElementById('interestedList');
    if (!interestedListDiv) return;
    
    const gamesOfInterest = JSON.parse(localStorage.getItem('gamesOfInterest')) || [];
    
    if (gamesOfInterest.length === 0) {
        interestedListDiv.innerHTML = '<p>No games selected yet. Find games and mark them as "interested" to save them here.</p>';
        return;
    }
    
    let html = '<div class="interested-games-grid">';
    
    gamesOfInterest.forEach(game => {
        // Check if the image path is already a local path or needs to be constructed
        let imagePath = game.imageUrl;
        if (!imagePath || !imagePath.includes('/')) {
            // Construct path if it's not already a complete path
            const gameId = game.id || game.name.toLowerCase().replace(/\s+/g, '-');
            imagePath = `images/${gameId}.jpg`; // Adjust extension if needed
        }
        
        html += `
            <div class="interested-game">
                <img src="${imagePath}" alt="${game.name}" loading="lazy">
                <h4>${game.name}</h4>
                <button class="remove-interest" data-game-id="${game.id || game.name}">Remove</button>
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
    let gamesOfInterest = JSON.parse(localStorage.getItem('gamesOfInterest')) || [];
    gamesOfInterest = gamesOfInterest.filter(game => (game.id || game.name) !== gameId);
    localStorage.setItem('gamesOfInterest', JSON.stringify(gamesOfInterest));
    
    // Update the checkbox if we're on the results page
    const checkbox = document.querySelector(`input[name="gameInterest"][value="${gameId}"]`);
    if (checkbox) checkbox.checked = false;
    
    // Update the display
    displayInterestedGames();
}

// Setup event listeners after displaying games
function setupCheckboxListeners() {
    // Get existing games of interest
    const existingGames = JSON.parse(localStorage.getItem('gamesOfInterest')) || [];
    const existingGameIds = new Set(existingGames.map(game => game.id || game.name));
    
    // Update all checkboxes to match localStorage
    document.querySelectorAll('input[name="gameInterest"]').forEach(checkbox => {
        const gameId = checkbox.value;
        checkbox.checked = existingGameIds.has(gameId);
        
        // Add change event listener to handle immediate updates
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // Add game to interested list if not already there
                if (!existingGameIds.has(gameId)) {
                    const gameName = this.getAttribute('data-game-name');
                    let imagePath = this.getAttribute('data-game-image');
                    
                    // Ensure proper image path
                    if (!imagePath || !imagePath.includes('/')) {
                        imagePath = `images/${gameId}.jpg`;
                    }
                    
                    existingGames.push({
                        id: gameId,
                        name: gameName,
                        imageUrl: imagePath
                    });
                    
                    existingGameIds.add(gameId);
                    localStorage.setItem('gamesOfInterest', JSON.stringify(existingGames));
                    displayInterestedGames();
                }
            } else {
                // Remove game from interested list if checkbox is unchecked
                const updatedGames = existingGames.filter(game => 
                    (game.id || game.name) !== gameId);
                localStorage.setItem('gamesOfInterest', JSON.stringify(updatedGames));
                existingGameIds.delete(gameId);
                displayInterestedGames();
            }
        });
    });
}