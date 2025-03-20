const url = "https://hollypie.github.io/wdd231/chamber/businesses.json";
const featured = document.querySelector(".featured");

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

function getFilteredArray(businesses) {
    return businesses.filter(business => business.membership === 2 || business.membership === 3);
}

function getRandomBusinesses(arr, count) {
    let shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displayFeaturedBusinesses(businesses) {

    // Clear previous entries
    featured.innerHTML = "";

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
        image.setAttribute("alt", `Logo of ${business.name}`);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "300");
        image.setAttribute("height", "auto");

        businessURL.href = business.url;
        businessURL.textContent = "Visit Website";
        businessURL.setAttribute("target", "_blank");

        card.append(name, tagline, line, image, description, email, phoneNumber, businessURL, address);
        featured.appendChild(card);
    });
}

// **Asynchronous function to handle the process**
async function display() {
    const allBusinesses = await fetchBusinessData();  // Wait for data to be fetched
    const filteredBusinesses = getFilteredArray(allBusinesses); // Filter the businesses
    const randomBusinesses = getRandomBusinesses(filteredBusinesses, 3); // Pick 3 random ones
    displayFeaturedBusinesses(randomBusinesses); // Display on page
}

// Call the function to load businesses
document.addEventListener("DOMContentLoaded", display);