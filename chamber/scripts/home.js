document.addEventListener("DOMContentLoaded", () => {
    console.log("home.js loaded");

    // ==================== WEATHER SCRIPT ====================
    const currentTemp = document.querySelector("#current-temp");
    const condition = document.querySelector("#condition");
    const high = document.querySelector("#high");
    const low = document.querySelector("#low");
    const humidity = document.querySelector("#humidity");
    const sunrise = document.querySelector("#sunrise");
    const sunset = document.querySelector("#sunset");
    const weatherIcon = document.querySelector("#weather-icon");
    const captionDesc = document.querySelector("figcaption");

    const appid = "dde05de069b95d55b10b570d58412b52";
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=40.30&lon=-111.70&units=imperial&appid=${appid}`;

    async function fetchWeather() {
        try {
            const response = await fetch(weatherURL);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            console.log("Weather Data:", data);

            displayWeather(data);
        } catch (error) {
            console.error("Weather fetch error:", error);
        }
    }

    function displayWeather(data) {
        currentTemp.innerHTML = `${data.main.temp} °F`;
        condition.innerHTML = `${data.weather[0].main}`;
        high.innerHTML = `High: ${data.main.temp_max}`;
        low.innerHTML = `Low: ${data.main.temp_min}`;
        humidity.innerHTML = `Humidity: ${data.main.humidity}`;
        sunrise.innerHTML = `Sunrise: ${convertTimestamp(data.sys.sunrise)}`;
        sunset.innerHTML = `Sunset: ${convertTimestamp(data.sys.sunset)}`;

        const iconCode = data.weather[0].icon;
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        weatherIcon.setAttribute("src", iconURL);
        weatherIcon.setAttribute("alt", data.weather[0].description);
        captionDesc.textContent = data.weather[0].description;
    }

    function convertTimestamp(timestamp) {
        return new Date(timestamp * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    }

    fetchWeather();

    // ==================== FEATURED BUSINESSES SCRIPT ====================
    const businessURL = "https://hollypie.github.io/wdd231/chamber/businesses.json";
    const featured = document.querySelector(".featured");

    async function fetchBusinessData() {
        try {
            const response = await fetch(businessURL);
            if (!response.ok) throw new Error("Failed to fetch data");

            const data = await response.json();
            return data.businesses;
        } catch (error) {
            console.error("Error loading business data:", error);
            return [];
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
            description.textContent = business.description || "No description available.";
            email.textContent = `Email: ${business.email}`;
            phoneNumber.textContent = `Phone: ${business.phonenumber}`;
            address.textContent = `${business.streetaddress}, ${business.city}, ${business.state} ${business.zipcode}`;

            image.setAttribute("src", business.imageurl);
            image.setAttribute("alt", `Logo of ${business.name}`);
            image.setAttribute("loading", "lazy");
            image.setAttribute("width", "300");
            image.setAttribute("height", "auto");
            image.onerror = () => { image.src = "images/default-business.jpg"; };

            businessURL.href = business.url.startsWith("http") ? business.url : `https://${business.url}`;
            businessURL.textContent = "Visit Website";
            businessURL.setAttribute("target", "_blank");

            card.append(name, tagline, line, image, description, email, phoneNumber, businessURL, address);
            featured.appendChild(card);
        });
    }

    async function displayFeatured() {
        const allBusinesses = await fetchBusinessData();
        const filteredBusinesses = getFilteredArray(allBusinesses);
        const randomBusinesses = getRandomBusinesses(filteredBusinesses, 3);
        displayFeaturedBusinesses(randomBusinesses);
    }

    displayFeatured();
});
