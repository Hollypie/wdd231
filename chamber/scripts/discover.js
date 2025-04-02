const url = "discover.json";
const cards = document.querySelector("#cards");

async function fetchDiscoverData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error("Error loading business data:", error);
        return [];
    }
}
function displayDiscoverCards(items) {
    cards.innerHTML = "";
    
    items.forEach((item) => {
        let card = document.createElement("section");
        let name = document.createElement("h2");
        let line = document.createElement('hr');
        let address = document.createElement("p");
        let description = document.createElement("p");
        let itemUrl = document.createElement("a"); // Change from button to just an anchor
        let photo = document.createElement("img");

        name.textContent = item.name;
        address.textContent = item.address;
        description.textContent = item.description;
        itemUrl.href = item.url;
        itemUrl.textContent = "Visit Website";
        itemUrl.setAttribute("target", "_blank");
        itemUrl.classList.add("btn"); // Apply button styles to the link

        photo.setAttribute("src", `images/discover/${item.photo}`);
        photo.setAttribute("loading", "lazy");
        photo.setAttribute("width", "300");
        photo.setAttribute("height", "200");

        card.append(name, line, address, description, photo, itemUrl); // Remove `urlButton`
        cards.appendChild(card);
    });
}

(async function init() {
    let items = await fetchDiscoverData();
    displayDiscoverCards(items);
})();

fetchDiscoverData().then(displayDiscoverCards);

