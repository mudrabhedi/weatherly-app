// Select the menu toggle button and the mobile menu
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

// Add click event listener to the toggle button
menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden"); // Toggle the 'hidden' class
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


