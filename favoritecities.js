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

document.addEventListener("DOMContentLoaded", () => {
    const favoriteContainer = document.getElementById("favoriteContainer");

    // Fetch favorite cities from localStorage
    const getFavoriteCities = () => JSON.parse(localStorage.getItem("favoriteCities")) || [];

    // Render favorite cities
    const renderFavorites = () => {
        const cities = getFavoriteCities();
        favoriteContainer.innerHTML = ""; // Clear container
        if (cities.length === 0) {
            favoriteContainer.innerHTML = `<p class="text-gray-600">No favorite cities added.</p>`;
            return;
        }
        cities.forEach((city, index) => {
            const cityCard = document.createElement("div");
            cityCard.className = "flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4";
            cityCard.innerHTML = `
                <span class="text-lg font-bold text-purple-300">${city}</span>
                <button 
                    class="text-red-300 hover:text-red-600 transition" 
                    onclick="removeCity(${index})"
                    aria-label="Remove City"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m4 0H6m6 0h6" />
                    </svg>
                </button>
            `;
            favoriteContainer.appendChild(cityCard);
        });
    };
    

    // Remove a single city from favorites
    window.removeCity = (index) => {
        const cities = JSON.parse(localStorage.getItem("favoriteCities")) || [];
        const removedCity = cities[index]; // Get the name of the city to be removed
        
        // Ask for confirmation before removing the city
        if (confirm('Are you sure you want to remove it from favorite cities?')) {
            cities.splice(index, 1); // Remove the city from the array
            localStorage.setItem("favoriteCities", JSON.stringify(cities)); // Update localStorage
            renderFavorites(); // Re-render the favorites list
            
            // Show an alert message confirming the removal
            alert(`${removedCity} has been removed from your favorites.`);
        }
    };
    



    const clearFavoritesBtn = document.getElementById("clearFavorites");

    // Clear all favorite cities
    clearFavoritesBtn.addEventListener("click", () => {
        const cities = JSON.parse(localStorage.getItem("favoriteCities")) || [];
        
        if (cities.length === 0) {
            alert("No favorite cities to clear!");
            return;
        }

        if (confirm("Are you sure you want to clear all favorite cities?")) {
            localStorage.removeItem("favoriteCities");
            renderFavorites();
            alert("All favorite cities have been cleared.");
        }
    });

    // Initial render
    renderFavorites();
});
