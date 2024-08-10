
const API_KEY = '5ae9df340b53491eb262e1d930da1030'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const location = document.getElementById('location').value;
    const weatherData = await fetchWeatherData(location);
    displayWeatherData(weatherData.current);
    displayForecast(weatherData.forecast);
});

async function fetchWeatherData(location) {
    const response = await fetch(`${BASE_URL}/weather?q=${location}&appid=${API_KEY}&units=metric`);
    const current = await response.json();

    const forecastResponse = await fetch(`${BASE_URL}/forecast?q=${location}&appid=${API_KEY}&units=metric`);
    const forecastData = await forecastResponse.json();

    return {
        current,
        forecast: forecastData.list.slice(0, 5).map((data) => ({
            date: data.dt_txt,
            temp: data.main.temp,
            weather: data.weather[0].description,
        })),
    };
}

function displayWeatherData(data) {
    const weatherContainer = document.getElementById('weather-data');
    weatherContainer.innerHTML = `
        <div class="weather-card">
            <h3>Current Weather</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>Condition: ${data.weather[0].description}</p>
        </div>
    `;
}

function displayForecast(forecast) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = forecast.map(day => `
        <div class="forecast-card">
            <h3>${new Date(day.date).toDateString()}</h3>
            <p>Temperature: ${day.temp}°C</p>
            <p>Condition: ${day.weather}</p>
        </div>
    `).join('');
}
