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
        displayGames(filteredGames, showGameModal, setupCheckboxListeners); 
    }

  
    displayInterestedGames();

  
    setupModalListeners();
});


window.addEventListener('storage', () => {
    displayInterestedGames(); 
});

