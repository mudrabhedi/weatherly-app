document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("cityInput");
    const searchBtn = document.getElementById("searchBtn");
    const imagesContainer = document.getElementById("imagesContainer");
    const loadingMessage = document.getElementById("loadingMessage");

    const UNSPLASH_API_KEY = "oMGgUjCY4XGdXyKJOq10Nmv0Wx7VHW86Cf0zsv8oNYA";
    let currentCity = ""; // Track the current city being searched
    let page = 1; // Track the current page
    let loading = false; // Prevent multiple simultaneous fetches

    // Fetch images from Unsplash API
    async function fetchCityImages(city, reset = false) {
        if (loading) return; // Prevent duplicate requests
        loading = true;

        if (reset) {
            page = 1; // Reset to the first page for a new city
            imagesContainer.innerHTML = ""; // Clear existing images
        }

        try {
            loadingMessage.classList.remove("hidden");
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${city}&page=${page}&per_page=30&client_id=${UNSPLASH_API_KEY}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch images.");
            }

            const data = await response.json();
            appendImages(data.results);

            if (data.results.length > 0) {
                page++; // Increment page number for the next fetch
            }
        } catch (error) {
            console.error(error);
            if (reset) {
                imagesContainer.innerHTML = `
                    <p class="text-center text-gray-600">Unable to fetch images for "${city}". Please try again later.</p>
                `;
            }
        } finally {
            loading = false;
            loadingMessage.classList.add("hidden");
        }
    }

    // Append images to the container
    function appendImages(images) {
        if (images.length === 0 && page === 1) {
            imagesContainer.innerHTML = `
                <p class="text-center text-gray-600">No images found for this city.</p>
            `;
            return;
        }

        images.forEach((image) => {
            const imageCard = document.createElement("div");
            imageCard.className = "bg-white rounded-lg shadow-lg overflow-hidden";

            imageCard.innerHTML = `
                <img 
                    src="${image.urls.small}" 
                    alt="${image.alt_description || "City Image"}" 
                    class="w-full h-48 object-cover"
                >
                <div class="p-4">
                    <p class="text-gray-700 text-sm">
                        Photo by <a href="${image.user.links.html}" target="_blank" class="text-purple-700 hover:underline">
                            ${image.user.name}
                        </a> on <a href="https://unsplash.com" target="_blank" class="text-purple-700 hover:underline">Unsplash</a>
                    </p>
                </div>
            `;

            imagesContainer.appendChild(imageCard);
        });
    }

    // Event listener for search button
    searchBtn.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (!city) {
            alert("Please enter a city name.");
            return;
        }

        currentCity = city; // Update the current city
        fetchCityImages(city, true); // Reset the search results for a new city
    });

    // Event listener for Enter key
    cityInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            searchBtn.click();
        }
    });

    // Infinite scrolling using Intersection Observer
    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && currentCity) {
                fetchCityImages(currentCity); // Fetch the next page of images
            }
        },
        { rootMargin: "200px" } // Trigger before reaching the bottom
    );

    // Add a sentinel element at the bottom of the page for the observer
    const sentinel = document.createElement("div");
    sentinel.style.height = "1px";
    imagesContainer.appendChild(sentinel);
    observer.observe(sentinel);
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

    // Select the menu toggle button and the mobile menu
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    // Add click event listener to the toggle button
    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden"); // Toggle the 'hidden' class
    });

