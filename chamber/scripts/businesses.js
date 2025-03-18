const url = "https://hollypie.github.io/wdd231/chamber/businesses.json";
const cards = document.querySelector('#cards');
const buttons = document.querySelectorAll(".filter-buttons");

async function getBusinessData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        displayBusinesses(data.businesses);
    } catch (error) {
        console.error("Error loading business data:", error);
    }
}

getBusinessData();

const displayBusinesses = (businesses) => {
    businesses.forEach((business) => {
        let card = document.createElement("section");
        let name = document.createElement("h2");
        let image = document.createElement("img");
        let address = document.createElement("p");
        let phoneNumber = document.createElement("p");
        let description = document.createElement("p");
        let businessURL = document.createElement("a");
        let email = document.createElement('p');
        let line = document.createElement('hr');
        let tagline = document.createElement('p');

        address.textContent = `${business.streetaddress}, ${business.city}, ${business.state}  ${business.zipcode}`;
        tagline.textContent = `${business.tagline}`;
        image.setAttribute('src', business.imageurl);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '300');
        image.setAttribute('height', 'auto');
        email.textContent = `${business.email}`;
        name.textContent = `${business.name}`;
        phoneNumber.textContent = `${business.phonenumber}`;
        description.textContent = `${business.description}`;
        businessURL.setAttribute('href', business.url);
        businessURL.textContent = "Visit Website";
        businessURL.setAttribute('target', '_blank');

        card.appendChild(name);
        card.appendChild(tagline);
        card.appendChild(line);
        card.appendChild(image);
        card.appendChild(description);
        card.appendChild(email);
        card.appendChild(phoneNumber);
        card.appendChild(businessURL);
        card.appendChild(address);

        cards.appendChild(card);
    });
}

// Function to display businesses in grid format
function displayBusinessesGrid() {
    cards.innerHTML = ""; // Clear existing content
    cards.classList.add("grid-view");
    cards.classList.remove("list-view");
    getBusinessData();
}

// Function to display businesses in list format
function displayBusinessesList() {
    cards.innerHTML = ""; // Clear existing content
    
    
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("active")); // removes active from all buttons
        button.classList.add('active'); // add active to the clicked button
        const displayType = button.textContent.toLowerCase(); // Get the value (grid or list) based on button text

        if (displayType === "grid") {
            displayBusinessesGrid();
        }
        else if (displayType === "list") {
            displayBusinessesList();
        }
    });
});