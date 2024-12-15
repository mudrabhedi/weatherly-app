# Weatherly

Weatherly is a feature-rich weather application providing live weather updates, a favorite cities tracker, search history, dynamic weather maps, and weather-related news for users. It is built with HTML, CSS, JavaScript, and Node.js, and integrates various APIs for real-time functionality.

---

## Features

### 🌤️ **Weather Dashboard**
- Search for any city to view current weather data, including:
  - Temperature
  - Weather conditions (e.g., clear, cloudy, rainy)
  - Humidity, Pressure, and Wind Speed
  - Sunrise and Sunset times

### ⭐ **Favorite Cities**
- Add cities to your favorites list for quick access.
- Persistent storage of favorites using `localStorage`.

### 🔍 **Search History**
- View your recent searches.
- Clear individual search entries or the entire history.

### 🗺️ **Live Weather Map**
- Interactive map with weather overlays for:
  - Temperature
  - Wind Speed
  - Precipitation
- Dynamic weather markers for searched cities.

### 📰 **News Section**
- Displays the latest weather-related news articles from around the globe.

---

## Tech Stack

### Frontend
- **HTML5, CSS3, Tailwind CSS**: For responsive and modern UI.
- **JavaScript**: Interactive features and API integrations.
- **Toastr.js**: Notifications for user actions.
- **Chart.js**: Visualizing weather trends (e.g., temperature graphs).

### Backend
- **Node.js**: Server-side logic.
- **Express.js**: API routing and server setup.

### APIs Used
- [OpenWeather API](https://openweathermap.org/api): Weather data.
- [NewsAPI](https://newsapi.org/): Weather-related news.
- **Leaflet.js**: Interactive maps.

---

## Installation

### Prerequisites
- Node.js (v14 or above)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/mudrabhedi/weatherly.git
   cd weatherly
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5501
   ```

---

## Project Structure

```
WEATHERLY-APP/
├── .vscode/                  # VSCode workspace settings
├── assets/                   # Static assets (images, icons, etc.)
├── node_modules/             # Node.js dependencies (generated by npm install)
├── cityimages.html           # Page for displaying city images
├── cityimages.js             # JavaScript for city images functionality
├── favoritecities.html       # Page for managing favorite cities
├── favoritecities.js         # Logic for favorite cities functionality
├── index.html                # Main landing page (dashboard)
├── live-map.js               # Logic for interactive live weather map
├── livemap.html              # Page for live weather map
├── news.html                 # Page for weather news
├── news.js                   # JavaScript for fetching and displaying news
├── package-lock.json         # Auto-generated lockfile for npm dependencies
├── package.json              # Project metadata and npm dependencies
├── README.md                 # Project documentation
├── searchhistory.html        # Page for viewing search history
├── searchhistory.js          # Logic for managing search history
├── style.css                 # General stylesheet
├── style1.css                # Additional stylesheet
├── tailwind.config.js        # Tailwind CSS configuration
├── toggle.js                 # Logic for UI toggle functionalities
├── weather.html              # Page for detailed weather information
└── weather.js                # Logic for fetching and displaying weather data


---

## How to Use

### Searching for Weather
1. Enter the name of a city in the search bar.
2. Click "Search" or press "Enter".
3. View detailed weather information on the dashboard.

### Adding Favorites
1. Navigate to a city on the dashboard.
2. Click the "Add to Favorites" button.
3. View your favorite cities on the "Favorite Cities" page.

### Exploring Live Maps
1. Go to the "Live Map" section.
2. Use search to drop weather markers on specific locations.
3. Toggle weather layers to view additional information.

### Viewing Weather News
1. Open the "News" section.
2. Browse articles related to global and local weather.

---

## Future Enhancements
- User authentication for personalized experiences.
- PWA (Progressive Web App) support.
- Offline mode with cached weather data.
- Enhanced graphs and data visualization.

---

## Contributors
- [Mudra Bhedi](https://github.com/mudrabhedi)

---

## License
This project is licensed under the [MIT License](LICENSE).
