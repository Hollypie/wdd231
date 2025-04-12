import { removeInterestedGame } from './interested.js';

export function displayGames(games, showGameModal, setupCheckboxListeners) {
    const resultsDiv = document.getElementById('results');
    if (!resultsDiv) return;

 
    const gamesOfInterest = JSON.parse(localStorage.getItem('gamesOfInterest')) || [];
    const savedGameIds = gamesOfInterest.map(game => game.id);

    resultsDiv.innerHTML = games.map(game => `
      <div class="gameCard">
        <img src="images/${game.id}.webp" alt="${game.name}" style="max-width: 200px;">
        <div class="cardDetails">
            <h3>${game.name}</h3>
            <p><strong>Players:</strong> ${game.players}</p>
            <p><strong>Complexity:</strong> ${game.complexity}</p>
            <p><strong>Genres:</strong> ${game.genres.join(', ')}</p>
            <p><strong>Mechanics:</strong> ${game.mechanics.join(', ')}</p>
            <p><strong>Play Time:</strong> ${game.length} min</p>
            <label>
              <input class="check" type="checkbox" name="gameInterest" value="${game.id}"
                     data-game-image="images/${game.id}.webp"
                     data-game-name="${game.name}"
                     ${savedGameIds.includes(game.id) ? 'checked' : ''}>
              Save this Game in My Favorites List
            </label>
        </div>
        <button class="more-info-btn" data-gamename="${game.name}">More Info</button>
      </div>
    `).join('');

    const infoButtons = document.querySelectorAll('.more-info-btn');
    infoButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedGame = games.find(g => g.name === button.dataset.gamename);
            if (selectedGame) showGameModal(selectedGame);
        });
    });

    requestAnimationFrame(() => {
        setupCheckboxListeners(games);
    });
}

export function displayInterestedGames() {
    const interestedListDiv = document.getElementById('interestedList');
    if (!interestedListDiv) return;

    const gamesOfInterest = JSON.parse(localStorage.getItem('gamesOfInterest')) || [];
    if (gamesOfInterest.length === 0) {
        interestedListDiv.innerHTML = '<p>You have no games saved yet.</p>';
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

    
    document.querySelectorAll('.remove-interest').forEach(button => {
        button.addEventListener('click', function() {
            const gameId = parseInt(this.getAttribute('data-game-id'));
            console.log("Remove button clicked for game ID:", gameId);
            removeInterestedGame(gameId);
        });
    });
}