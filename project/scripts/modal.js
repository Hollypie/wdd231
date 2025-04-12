export function showGameModal(game) {
    document.getElementById('modalGameName').textContent = game.name;
    document.getElementById('modalGameImage').src = `images/${game.id}.webp`;
    document.getElementById('modalGameImage').alt = game.name;
    document.getElementById('modalGamePlayers').textContent = `Players: ${game.players}`;
    document.getElementById('modalGameComplexity').textContent = `Complexity: ${game.complexity}`;
    document.getElementById('modalGameGenres').textContent = `Genres: ${game.genres.join(', ')}`;
    document.getElementById('modalGameMechanics').textContent = `Mechanics: ${game.mechanics.join(', ')}`;
    document.getElementById('modalGameLength').textContent = `Play Time: ${game.length} min`;

    document.getElementById('gameModal').style.display = 'block';
}

export function setupModalListeners() {
    const closeBtn = document.getElementById('closeModalBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.getElementById('gameModal').style.display = 'none';
        });
    }

    const modal = document.getElementById('gameModal');
    if (modal) {
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}
