const url = "https://hollypie.github.io/wdd231/chamber/businesses.json";
const cards = document.querySelector('#cards');

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

        address.textContent = `${business.streetaddress}, ${business.city}, ${business.state}  ${business.zipcode}`;
        image.setAttribute('src', business.imageurl);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '340');
        image.setAttribute('height', 'auto');
        email.textContent = `${business.email} Email here`;
        name.textContent = `${business.name}`;
        phoneNumber.textContent = `${business.phonenumber}`;
        description.textContent = `${business.description}`;
        businessURL.setAttribute('href', business.url);
        businessURL.textContent = "Visit Website";
        businessURL.setAttribute('target', '_blank');

        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(line);
        card.appendChild(email);
        card.appendChild(phoneNumber);
        card.appendChild(businessURL);
        card.appendChild(address);

        cards.appendChild(card);
    });
}