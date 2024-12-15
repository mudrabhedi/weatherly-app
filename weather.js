// Extract the city name from the URL query string
const params = new URLSearchParams(window.location.search);
const city = params.get('city') || 'Surat'; // Default to Surat if no city is provided

// API Key and Base URL
const API_KEY = '47e12f5dc70a68d41724b692d55c5336';
const CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

async function fetchWeather() {
    try {
        console.log('Fetching current weather data for:', city);

        const response = await fetch(CURRENT_WEATHER_URL);
        if (!response.ok) throw new Error("City not found!");

        const data = await response.json();
        console.log('Current Weather Data:', data);

        const weatherIconCode = data.weather[0].icon; 
        const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
        document.getElementById("weatherIcon").src = weatherIconUrl; 
        document.getElementById("weatherIcon").alt = data.weather[0].description; 

        document.getElementById("temperature").textContent = `${(data.main.temp - 273.15).toFixed(1)}°C`;
        document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById("weatherDescription").textContent = `${data.weather[0].description}, ${new Date().toLocaleDateString()}`;
        document.getElementById("humidity").textContent = `${data.main.humidity || 'N/A'}%`;
        document.getElementById("pressure").textContent = `${data.main.pressure || 'N/A'} hPa`;
        document.getElementById("windSpeed").textContent = `${data.wind.speed || 'N/A'} m/s`;
        document.getElementById("windDirection").textContent = `${data.wind.deg || 'N/A'}°`;
        document.getElementById("cloudCoverage").textContent = `${data.clouds?.all || 'N/A'}%`;
        document.getElementById("visibility").textContent = `${data.visibility ? (data.visibility / 1000).toFixed(1) : 'N/A'} km`;
        document.getElementById("sunrise").textContent = data.sys.sunrise
            ? new Date(data.sys.sunrise * 1000).toLocaleTimeString()
            : "N/A";
        document.getElementById("sunset").textContent = data.sys.sunset
            ? new Date(data.sys.sunset * 1000).toLocaleTimeString()
            : "N/A";

    } catch (error) {
        console.error("Error fetching current weather data:", error);
        document.getElementById("temperature").textContent = "N/A";
        document.getElementById("cityName").textContent = "City not found!";
        document.getElementById("weatherDescription").textContent = "Error fetching weather data.";
    }
}

async function fetchForecast() {
    try {
        console.log('Fetching 5-day forecast for:', city);

        const response = await fetch(FORECAST_URL);
        if (!response.ok) throw new Error("Unable to fetch forecast!");

        const data = await response.json();
        console.log('5-Day Forecast Data:', data);

        const forecastContainer = document.getElementById("forecastContainer");
        forecastContainer.innerHTML = "";

        const dates = [];
        const temperatures = [];

        const filteredData = data.list.filter(item => item.dt_txt.includes("12:00:00"));
        filteredData.forEach(item => {
            const date = new Date(item.dt * 1000).toLocaleDateString();
            const temp = item.main.temp.toFixed(1); // Temperature for graph

            dates.push(date); // Add date to graph data
            temperatures.push(temp); // Add temperature to graph data

            const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

            const forecastCard = document.createElement("div");
            forecastCard.className = "p-6 bg-white/30 border border-teal-500 rounded-lg shadow-lg text-center backdrop-blur-lg transition-colors duration-300 hover:bg-white/50 hover:border-teal-700";

            forecastCard.innerHTML = `
                <p class="text-xl font-bold text-white">${date}</p>
                <img src="${icon}" alt="Weather Icon" class="h-12 w-12 mx-auto my-2">
                <p class="text-lg font-medium">Temp: <span class="font-bold">${temp}°C</span></p>
            `;
            forecastContainer.appendChild(forecastCard);
        });

        // Render the temperature graph with the collected data
        renderGraph(dates, temperatures);

    } catch (error) {
        console.error("Error fetching forecast data:", error);
        document.getElementById("forecastContainer").innerHTML = "<p class='text-red-500'>Unable to fetch forecast data.</p>";
    }
}


function renderGraph(dates, temperatures) {
    const ctx = document.getElementById('weatherGraph').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                borderColor: 'rgba(210, 158, 232, 1)', // Deep pastel purple for the line
                backgroundColor: 'rgba(210, 158, 232, 0.2)', // Lighter pastel purple for the area fill
                fill: true,
                tension: 0.3,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Prevents automatic resizing
            plugins: {
                legend: { display: false },
            },
            scales: {
                x: { title: { display: true, text: 'Dates' } },
                y: { title: { display: true, text: 'Temperature (°C)' } }
            }
        }
    });
}

window.addFavoriteCity = (cityName) => {
    const cities = JSON.parse(localStorage.getItem("favoriteCities")) || [];
    if (!cities.includes(cityName)) {
        cities.push(cityName); // Add the city to the array
        localStorage.setItem("favoriteCities", JSON.stringify(cities)); // Update localStorage
        alert(`${cityName} added to favorites!`);
    } else {
        alert(`${cityName} is already in your favorites.`);
    }
};

function addCityToSearchHistory(cityName) {
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if (!searchHistory.includes(cityName)) {
        searchHistory.push(cityName);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }
}


function updateCityAndFetch() {
    const cityInput = document.getElementById("cityInput").value.trim();
    if (cityInput) {
        // Redirect to the weather.html page with the new city as a query parameter
        window.location.href = `weather.html?city=${cityInput}`;
    } else {
        alert("Please enter a valid city name.");
    }
}

// Add event listeners for Enter key and Search button
document.getElementById("cityInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        updateCityAndFetch();
    }
});

document.getElementById("searchBtn").addEventListener("click", () => {
    updateCityAndFetch();
});

document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    // Fetch the current search history from localStorage
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    // Avoid duplicate entries and store the new city
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }

    // Optionally: Redirect or fetch weather data for the searched city
    console.log(`City "${city}" added to search history.`);
})

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-link"); // Select all nav links
    const currentPage = window.location.pathname; // Get the current page's URL path

    links.forEach(link => {
        // Check if the link's href matches the current page
        if (link.href.includes(currentPage)) {
            link.classList.add("active"); // Add active class
        } else {
            link.classList.remove("active"); // Ensure other links are not active
        }
    });
});
// Select the menu toggle button and the mobile menu
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

// Add click event listener to the toggle button
menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden"); // Toggle the 'hidden' class
});

fetchWeather();
fetchForecast();
