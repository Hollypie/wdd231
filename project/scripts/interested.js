
// localstorage users saved interested games.
document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById("interestedList");
    const gamesOfInterest = JSON.parse(localStorage.getItem("gamesOfInterest")) || [];

    if (gamesOfInterest.length === 0) {
        listContainer.innerHTML = "<p>No games saved yet. Go explore and add some!</p>";
        return;
    }

    gamesOfInterest.forEach(game => {
        const item = document.createElement("div");
        item.classList.add("interested-game");

        item.innerHTML = `
            <span>${game}</span>
            <button class="remove-btn" title="Remove">❌</button>
        `;

        item.querySelector(".remove-btn").addEventListener("click", () => {
            const updatedList = gamesOfInterest.filter(g => g !== game);
            localStorage.setItem("gamesOfInterest", JSON.stringify(updatedList));
            item.remove();

            if (updatedList.length === 0) {
                listContainer.innerHTML = "<p>No games saved yet. Go explore and add some!</p>";
            }
        });

        listContainer.appendChild(item);
    });
});


