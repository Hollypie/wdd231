import { getQueryParams, filterGames } from './filters.js';
import { fetchGames } from './data.js';
import { displayGames, displayInterestedGames } from './display.js';
import { setupCheckboxListeners } from './interested.js';
import { showGameModal, setupModalListeners } from './modal.js';

let games = [];

document.addEventListener('DOMContentLoaded', async () => {
    const isResultsPage = window.location.pathname.includes('results.html');

    if (isResultsPage) {
        const filters = getQueryParams();
        games = await fetchGames();
        const filteredGames = filterGames(games, filters);
        displayGames(filteredGames, showGameModal, setupCheckboxListeners);  // Display filtered games
    }

    // Ensure interested games are always displayed
    displayInterestedGames();

    // Attach modal listeners
    setupModalListeners();
});

// Optional: Add event listener to trigger re-rendering when games of interest are added/removed
window.addEventListener('storage', () => {
    displayInterestedGames();  // Re-render the list if there are changes in localStorage
});

