document.addEventListener('DOMContentLoaded', function() {
    const gameSelect = document.getElementById('gameSelect');
    const gameTitle = document.getElementById('gameTitle');
    const gameCover = document.getElementById('gameCover');
    const gameDescription = document.getElementById('gameDescription');

    // Function to fetch game info
    async function fetchGameInfo(gameName) {
        const response = await fetch(`games/${gameName}.txt`);
        const text = await response.text();
        const [title, description, imageUrl, gameUrl] = text.split('\n');
        return { title, description, imageUrl, gameUrl };
    }

    // Function to populate game select
    async function populateGameSelect() {
        const response = await fetch('games/');
        const files = await response.text();
        const gameFiles = files.match(/href="([^"]+\.txt)"/g);
        
        if (gameFiles) {
            for (const file of gameFiles) {
                const gameName = file.match(/"([^"]+)"/)[1].replace('.txt', '');
                const option = document.createElement('option');
                option.value = gameName;
                option.textContent = gameName;
                gameSelect.appendChild(option);
            }
        }
    }

    // Event listener for game selection
    gameSelect.addEventListener('change', async function() {
        const selectedGame = this.value;
        if (selectedGame) {
            const gameInfo = await fetchGameInfo(selectedGame);
            gameTitle.textContent = gameInfo.title;
            gameCover.src = gameInfo.imageUrl;
            gameCover.alt = `${gameInfo.title} cover`;
            gameDescription.textContent = gameInfo.description;
        } else {
            gameTitle.textContent = '';
            gameCover.src = '';
            gameCover.alt = '';
            gameDescription.textContent = '';
        }
    });

    // Populate game select on page load
    populateGameSelect();
});