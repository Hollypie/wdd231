const currentTemp = document.querySelector('#current-temp');
const condition = document.querySelector('#condition');
const high = document.querySelector('#high');
const low = document.querySelector('#low');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const appid = "dde05de069b95d55b10b570d58412b52"; 

const url = `https://api.openweathermap.org/data/2.5/weather?lat=40.30&lon=-111.70&units=imperial&appid=${appid}`;

console.log("Fetching data from:", url); // Debugging

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Debugging

        displayResults(data);
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp} °F`;
    condition.innerHTML = `${data.weather.main}`;
    high.innerHTML = `High: ${data.main.temp_max}`;
    low.innerHTML = `Low: ${data.main.temp_min}`;
    humidity.innerHTML = `Humidity: ${data.humidity}`;
    sunrise.innerHTML = `${data.sys.sunrise}`;
    sunset.innerHTML = `${data.sys.sunset}`;

    const iconCode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    weatherIcon.setAttribute("src", iconURL);
    weatherIcon.setAttribute("alt", data.weather[0].description);
    
    captionDesc.textContent = data.weather[0].description;
}

apiFetch();
