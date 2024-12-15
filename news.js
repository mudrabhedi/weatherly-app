document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById("newsContainer");
    const loadingMessage = document.getElementById("loading");

    // Replace with your NewsAPI key
    const API_KEY = "8ef31c34805240c6bbda742af5f2711a";

    // Fetch weather-related news based on the city
    async function fetchNews(city = "global") {
        try {
            const response = await fetch(
                `https://newsapi.org/v2/everything?q=weather ${city}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch news.");
            }

            const data = await response.json();
            displayNews(data.articles);
        } catch (error) {
            console.error(error);
            newsContainer.innerHTML = `
                <p class="text-center text-gray-600">Unable to fetch news at the moment. Please try again later.</p>
            `;
        } finally {
            loadingMessage.style.display = "none";
        }
    }

    // Function to display news articles
    function displayNews(articles) {
        newsContainer.innerHTML = ""; // Clear existing content

        if (articles.length === 0) {
            newsContainer.innerHTML = `
                <p class="text-center text-gray-600">No weather news found for this location.</p>
            `;
            return;
        }

        articles.forEach((article) => {
            const newsCard = document.createElement("div");
            newsCard.className = "bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-4";

            // Conditionally include the image if available
            const imageMarkup = article.urlToImage
                ? `
                <img 
                    src="${article.urlToImage}" 
                    alt="Article Image" 
                    class="w-full md:w-1/3 rounded-lg object-cover h-40"
                >
                `
                : "";

            newsCard.innerHTML = `
                ${imageMarkup}
                <div class="flex flex-col">
                    <h3 class="text-xl font-bold text-purple-700 mb-2">
                        <a href="${article.url}" target="_blank" class="hover:underline">
                            ${article.title}
                        </a>
                    </h3>
                    <p class="text-gray-700 text-sm mb-4">${article.description || "No description available."}</p>
                    <p class="text-gray-500 text-xs">
                        Published on: ${new Date(article.publishedAt).toLocaleDateString()} by ${article.source.name}
                    </p>
                </div>
            `;

            newsContainer.appendChild(newsCard);
        });
    }

    // Fetch the city name from localStorage or use a default city
    const city = localStorage.getItem("selectedCity") || "global";

    // Fetch and display news
    fetchNews(city);
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
