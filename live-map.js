document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "47e12f5dc70a68d41724b692d55c5336"; // Replace with your API key

    // Ensure the map container exists
    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
        console.error("Map container not found!");
        return; // Stop execution if the map container is missing
    }

    // Initialize the map
    const map = L.map("map").setView([51.505, -0.09], 3); // Default zoom-out view
    window.map = map;

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    console.log("Map initialized successfully.");

    // Function to fetch weather data and add a marker to the map
    function fetchWeatherForCity(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then((response) => {
                if (!response.ok) throw new Error(`City not found: ${response.statusText}`);
                return response.json();
            })
            .then((data) => {
                const lat = data.coord.lat;
                const lon = data.coord.lon;
                const weather = `${data.weather[0].description}, ${data.main.temp}°C`;

                // Add marker for the searched city
                addMarker(lat, lon, city, weather);

                // Move the map view to the searched city
                map.setView([lat, lon], 10);
            })
            .catch((error) => {
                console.error(`Error fetching data:`, error.message);
                alert("City not found! Please try again.");
            });
    }

    // Function to add a marker to the map
    function addMarker(lat, lon, city, weather) {
        L.marker([lat, lon])
            .addTo(map)
            .bindPopup(`
                <h3 class="font-bold text-lg">${city}</h3>
                <p>Weather: ${weather}</p>
            `)
            .openPopup();
    }

    // Event handler for city search
    function updateCityAndFetch() {
        const cityInput = document.getElementById("cityInput").value.trim();
        if (cityInput) {
            fetchWeatherForCity(cityInput);
            addToSearchHistory(cityInput);
        } else {
            alert("Please enter a valid city name.");
        }
    }

    // Function to add search history to localStorage
    function addToSearchHistory(city) {
        let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
        if (!searchHistory.includes(city)) {
            searchHistory.push(city);
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        }
    }

    // Add event listeners to the search input and button
    const cityInput = document.getElementById("cityInput");
    const searchBtn = document.getElementById("searchBtn");

    if (cityInput && searchBtn) {
        cityInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                updateCityAndFetch();
            }
        });

        searchBtn.addEventListener("click", () => {
            updateCityAndFetch();
        });
    } else {
        console.error("City input or search button not found!");
    }
});
