import { displayInterestedGames } from './display.js';

// This function sets up event listeners for checkboxes.
export function setupCheckboxListeners(games) { 
    const checkboxes = document.querySelectorAll('input[name="gameInterest"]');
    console.log("Setting up checkboxes for games:", games);

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const gameId = parseInt(this.value);
            console.log(`Checkbox changed for game ID ${gameId}, checked: ${this.checked}`);

            if (this.checked) {
                addGameToInterested(gameId, games);
            } else {
                removeInterestedGame(gameId);
            }
        });
    });
}

// Adds a game to the 'gamesOfInterest' list and updates the display.
export function addGameToInterested(gameId, games) {
    const game = games.find(g => g.id === gameId);
    if (game) {
        let gamesOfInterest = JSON.parse(localStorage.getItem('gamesOfInterest')) || [];
        console.log("Adding game to interest:", game);
        
        // Check if game is already in the list to avoid duplicates
        if (!gamesOfInterest.some(g => g.id === game.id)) {
            gamesOfInterest.push(game);
            localStorage.setItem('gamesOfInterest', JSON.stringify(gamesOfInterest));
            
            // Re-render the interested games list
            displayInterestedGames();
        }
    }
}

// Removes a game from the 'gamesOfInterest' list and updates the display.
export function removeInterestedGame(gameId) {
    let gamesOfInterest = JSON.parse(localStorage.getItem('gamesOfInterest')) || [];
    
    // Convert gameId to number if it's a string
    const parsedId = parseInt(gameId);
    
    console.log("Removing game with ID:", parsedId);
    console.log("Before removal, games:", gamesOfInterest);
    
    // Remove the game by filtering out the game with the matching ID
    const updatedGames = gamesOfInterest.filter(game => game.id !== parsedId);
    
    console.log("After removal, games:", updatedGames);
    
    // Save the updated list back to localStorage
    localStorage.setItem('gamesOfInterest', JSON.stringify(updatedGames));
    
    // Re-render the interested games list after removal
    displayInterestedGames();
}