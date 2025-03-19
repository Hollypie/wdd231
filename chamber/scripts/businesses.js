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

async function getBusinessDataList() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        displayBusinessesList(data.businesses);
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
function displayBusinessesList(businesses) {
    cards.innerHTML = ""; // Clear existing content
    let table = document.createElement('table');
    let tablehead = document.createElement('thead');
    let titleRow = document.createElement('tr');
    let businessTitle = document.createElement('th');
    let addressTitle = document.createElement('th');
    let phoneTitle = document.createElement('th');
    let websiteTitle = document.createElement('th');
    let tBody = document.createElement('tbody');
    
    cards.appendChild(table);
    table.appendChild(tablehead);
    tablehead.appendChild(titleRow);
    titleRow.appendChild(businessTitle);
    titleRow.appendChild(addressTitle);
    titleRow.appendChild(phoneTitle);
    titleRow.appendChild(websiteTitle);
    table.appendChild(tBody);

    businesses.forEach((business) => {
        
        let businessRow = document.createElement('tr');
        let name = document.createElement('td');
        let address = document.createElement('td');
        let phone = document.createElement('td');
        let website = document.createElement('td');
        let link = document.createElement('a');

        tBody.appendChild(businessRow);
        businessRow.appendChild(name);
        businessRow.appendChild(address);
        businessRow.appendChild(phone);
        businessRow.appendChild(website);
        website.appendChild(link);

        name.textContent(`${business.name}`);
        address.textContent(`${business.streetaddress}, ${business.city}, ${business.state}, ${business.zipcode}`);
        phone.textContent(`${business.phonenumber}`);
        website.textContent("Website");
        link.href = `${business.url}`;
        link.target = "_blank";

    }
    

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