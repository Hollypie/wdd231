const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets);
    displayProphets(data.prophets);
};

getProphetData();

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let ordinalSuffix = "";
        if (prophet.order === 1) {
            ordinalSuffix = "st";
        }
        else if (prophet.order === 2) {
            ordinalSuffix = "nd";
        }
        else if (prophet.order === 3) {
            ordinalSuffix = "rd";
        }
        else {
            ordinalSuffix = "th";
        }

        let card = document.createElement("section");
        let fullName = document.createElement("h2");
        let portrait = document.createElement("img");
        let birthdate = document.createElement('p');
        let birthplace = document.createElement('p');
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order}${ordinalSuffix} Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');
        birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;

        card.appendChild(fullName);
        card.appendChild(birthdate);
        card.appendChild(birthplace);
        card.appendChild(portrait);
        
        cards.appendChild(card);
    });
}
