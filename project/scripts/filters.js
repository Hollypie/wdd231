export function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        players: params.get('players'),
        complexity: params.get('complexity'),
        genres: params.getAll('genre[]'),
        mechanics: params.getAll('mechanics[]'),
        length: params.get('length')
    };
}

export function filterGames(games, filters) {
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
