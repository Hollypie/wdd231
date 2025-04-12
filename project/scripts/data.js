export async function fetchGames() {
    try {
        const response = await fetch('data/small_games.json');
        return await response.json();
    } catch (error) {
        console.error('Error fetching game data:', error);
        return [];
    }
}
