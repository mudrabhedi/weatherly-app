// Define the toggleFavorite function globally
window.toggleFavorite = function (cityName, button) {
    let favoriteCities = JSON.parse(localStorage.getItem("favoriteCities")) || [];

    if (favoriteCities.includes(cityName)) {
        // Remove from favorites
        favoriteCities = favoriteCities.filter(city => city !== cityName);
        localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
        alert(`${cityName} has been removed from your favorites.`);
    } else {
        // Add to favorites
        favoriteCities.push(cityName);
        localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
        alert(`${cityName} has been added to your favorites.`);
    }

    // Update the button icon
    const isFavorite = favoriteCities.includes(cityName);
    const svg = button.querySelector("svg");
    svg.setAttribute("fill", isFavorite ? "currentColor" : "none");
    button.classList.toggle("text-purple-800", isFavorite);
    button.classList.toggle("text-purple-300", !isFavorite);
};

document.addEventListener("DOMContentLoaded", () => {
    const historyContainer = document.getElementById("historyContainer");
    const clearHistoryBtn = document.getElementById("clearHistory");

    // Retrieve search history from localStorage
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    // Function to display search history
    function displayHistory() {
        historyContainer.innerHTML = ""; // Clear previous content
    
        if (searchHistory.length === 0) {
            historyContainer.innerHTML = `<p class="text-gray-600">No search history available.</p>`;
            return;
        }
    
        // Fetch favorite cities
        const favoriteCities = JSON.parse(localStorage.getItem("favoriteCities")) || [];
    
        searchHistory.forEach((city, index) => {
            const isFavorite = favoriteCities.includes(city); // Check if the city is already a favorite
    
            const cityCard = document.createElement("div");
            cityCard.className = "flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4";
    
            cityCard.innerHTML = `
                <span class="text-lg font-bold text-purple-300">${city}</span>
                <div class="flex flex-row">
                    <button 
                        class="mr-5 text-sm ${isFavorite ? "text-purple-800" : "text-purple-300"} hover:text-purple-800" 
                        onclick="toggleFavorite('${city}', this)"
                        aria-label="Toggle Favorite"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="${isFavorite ? "currentColor" : "none"}" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>
                    <button 
                        class="text-red-200 hover:text-red-700" 
                        onclick="removeCity(${index})"
                        aria-label="Remove City"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m4 0H6m6 0h6"/>
                        </svg>
                    </button>
                </div>
            `;
    
            historyContainer.appendChild(cityCard);
        });
    }
    
    // Define the toggleFavorite function
    function toggleFavorite(cityName, button) {
        let favoriteCities = JSON.parse(localStorage.getItem("favoriteCities")) || [];
    
        if (favoriteCities.includes(cityName)) {
            // Remove from favorites
            favoriteCities = favoriteCities.filter(city => city !== cityName);
            localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
            alert(`${cityName} has been removed from your favorites.`);
        } else {
            // Add to favorites
            favoriteCities.push(cityName);
            localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
            alert(`${cityName} has been added to your favorites.`);
        }
    
        // Update the button icon
        const isFavorite = favoriteCities.includes(cityName);
        const svg = button.querySelector("svg");
        svg.setAttribute("fill", isFavorite ? "currentColor" : "none");
        button.classList.toggle("text-purple-800", isFavorite);
        button.classList.toggle("text-purple-300", !isFavorite);
    }
    
    // Define the removeCity function globally
    window.removeCity = function (index) {
        const removedCity = searchHistory[index]; // Get the city to be removed
        if (confirm(`Are you sure you want to remove ${removedCity} from search history?`)) {
            searchHistory.splice(index, 1); // Remove the city from the array
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory)); // Update localStorage
            displayHistory(); // Re-render the history
            alert(`${removedCity} has been removed from the search history.`);
        }
    };

    // Function to clear all history
    clearHistoryBtn.addEventListener("click", () => {
        if (searchHistory.length === 0) {
            alert("No search history available to clear.");
            return;
        }

        if (confirm("Are you sure you want to clear all search history?")) {
            // Clear localStorage
            localStorage.removeItem("searchHistory");

            // Update search history array
            searchHistory = [];

            // Refresh the display
            displayHistory();
            alert("All search history has been cleared.");
        }
    });

    // Display history on page load
    displayHistory();
});
// Function to update the city and fetch data
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
});
// Select the menu toggle button and the mobile menu
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

// Add click event listener to the toggle button
menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden"); // Toggle the 'hidden' class
});

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

