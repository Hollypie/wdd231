const url = "https://hollypie.github.io/wdd231/chamber/businesses.json";
const cards = document.querySelector("#cards");
const buttons = document.querySelectorAll(".filter-buttons");

// Fetch business data once and store it
async function fetchBusinessData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        return data.businesses; // Return businesses array
    } catch (error) {
        console.error("Error loading business data:", error);
        return []; // Return empty array if fetch fails
    }
}

// Display businesses as grid cards
function displayBusinessesGrid(businesses) {
    cards.innerHTML = ""; // Clear previous content
    cards.classList.add("grid-view");
    cards.classList.remove("list-view");

    businesses.forEach((business) => {
        let card = document.createElement("section");
        let name = document.createElement("h2");
        let tagline = document.createElement("p");
        let line = document.createElement("hr");
        let image = document.createElement("img");
        let description = document.createElement("p");
        let email = document.createElement("p");
        let phoneNumber = document.createElement("p");
        let businessURL = document.createElement("a");
        let address = document.createElement("p");

        name.textContent = business.name;
        tagline.textContent = business.tagline || "";
        description.textContent = business.description;
        email.textContent = `Email: ${business.email}`;
        phoneNumber.textContent = `Phone: ${business.phonenumber}`;
        address.textContent = `${business.streetaddress}, ${business.city}, ${business.state} ${business.zipcode}`;
        
        image.setAttribute("src", business.imageurl);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "300");
        image.setAttribute("height", "auto");

        businessURL.href = business.url;
        businessURL.textContent = "Visit Website";
        businessURL.setAttribute("target", "_blank");

        card.append(name, tagline, line, image, description, email, phoneNumber, businessURL, address);
        cards.appendChild(card);
    });
}

// Display businesses as a list (table format)
function displayBusinessesList(businesses) {
    cards.innerHTML = ""; // Clear previous content
    cards.classList.add("list-view");
    cards.classList.remove("grid-view");

    let table = document.createElement("table");
    let tableHead = document.createElement("thead");
    let titleRow = document.createElement("tr");

    ["Business Name", "Address", "Phone", "Website"].forEach(title => {
        let th = document.createElement("th");
        th.textContent = title;
        titleRow.appendChild(th);
    });

    tableHead.appendChild(titleRow);
    table.appendChild(tableHead);

    let tBody = document.createElement("tbody");
    businesses.forEach(business => {
        let businessRow = document.createElement("tr");
        let name = document.createElement("td");
        let address = document.createElement("td");
        let phone = document.createElement("td");
        let website = document.createElement("td");
        let link = document.createElement("a");

        name.textContent = business.name;
        address.textContent = `${business.streetaddress}, ${business.city}, ${business.state}, ${business.zipcode}`;
        phone.textContent = business.phonenumber;

        link.href = business.url;
        link.textContent = "Website";
        link.target = "_blank";
        website.appendChild(link);

        businessRow.append(name, address, phone, website);
        tBody.appendChild(businessRow);
    });

    table.appendChild(tBody);
    cards.appendChild(table);
}

// Initialize page with default grid view
(async function init() {
    let businesses = await fetchBusinessData();
    displayBusinessesGrid(businesses); // Show grid by default
})();

// Event listeners for filter buttons
buttons.forEach(button => {
    button.addEventListener("click", async () => {
        buttons.forEach(btn => btn.classList.remove("active")); // Remove active class
        button.classList.add("active"); // Add active class to clicked button

        let businesses = await fetchBusinessData(); // Ensure data is fetched
        const displayType = button.textContent.toLowerCase(); // Get button text

        if (displayType === "grid") {
            displayBusinessesGrid(businesses);
        } else if (displayType === "list") {
            displayBusinessesList(businesses);
        }
    });
});

// this function show return an array of businesses that have been filtered to only include the ones with a membership of 2 or 3.
function getFilteredArray() {
    
}

function getRandomBusinesses(arr, count) {
    let shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displayfeaturedbusinesses(businesses) {
    const selectedBusinesses = getRandomBusinesses(businesses, 3)

}
