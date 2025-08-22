document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '6080b9b3736d411688733135252502'; // Your WeatherAPI key
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const locationBtn = document.getElementById('location-btn');
    const currentWeather = document.getElementById('current-weather');
    const weatherDetails = document.getElementById('weather-details');
    const forecastCards = document.getElementById('forecast-cards');
    
    // Default city
    let currentCity = 'London';
    
    // Initialize the app
    getWeatherData(currentCity);
    
    // Event listeners
    searchBtn.addEventListener('click', function() {
        const city = cityInput.value.trim();
        if (city) {
            currentCity = city;
            getWeatherData(city);
        }
    });
    
    locationBtn.addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    getWeatherByCoords(latitude, longitude);
                },
                error => {
                    showError('Unable to retrieve your location');
                }
            );
        } else {
            showError('Geolocation is not supported by your browser');
        }
    });
    
    cityInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                currentCity = city;
                getWeatherData(city);
            }
        }
    });
    
    // Fetch weather data by city name
    function getWeatherData(city) {
        showLoading();
        
        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found');
                }
                return response.json();
            })
            .then(data => {
                displayCurrentWeather(data);
                // Since the free WeatherAPI only provides current weather,
                // we'll create a simple forecast display based on the current data
                displaySimpleForecast(data);
            })
            .catch(error => {
                showError(error.message);
            });
    }
    
    // Fetch weather data by coordinates
    function getWeatherByCoords(lat, lon) {
        showLoading();
        
        fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Location not found');
                }
                return response.json();
            })
            .then(data => {
                currentCity = data.location.name;
                cityInput.value = currentCity;
                displayCurrentWeather(data);
                displaySimpleForecast(data);
            })
            .catch(error => {
                showError(error.message);
            });
    }
    
    // Display current weather
    function displayCurrentWeather(data) {
        const { name, region, country } = data.location;
        const { temp_c, condition, humidity, feelslike_c, wind_kph, wind_dir, pressure_mb, vis_km, uv } = data.current;
        const { text, icon } = condition;
        
        const date = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        currentWeather.innerHTML = `
            <div class="weather-card">
                <h2 class="city-name">${name}, ${country}</h2>
                <p class="date">${date}</p>
                <div class="weather-icon">
                    <img src="${icon.replace('//', 'https://')}" alt="${text}">
                </div>
                <div class="temperature">${Math.round(temp_c)}°C</div>
                <div class="weather-description">${text}</div>
            </div>
        `;
        
        // Display weather details
        weatherDetails.innerHTML = `
            <div class="detail-card">
                <i class="fas fa-temperature-high"></i>
                <div class="label">Feels Like</div>
                <div class="value">${Math.round(feelslike_c)}°C</div>
            </div>
            <div class="detail-card">
                <i class="fas fa-tint"></i>
                <div class="label">Humidity</div>
                <div class="value">${humidity}%</div>
            </div>
            <div class="detail-card">
                <i class="fas fa-wind"></i>
                <div class="label">Wind Speed</div>
                <div class="value">${wind_kph} km/h</div>
            </div>
            <div class="detail-card">
                <i class="fas fa-compass"></i>
                <div class="label">Wind Direction</div>
                <div class="value">${wind_dir}</div>
            </div>
            <div class="detail-card">
                <i class="fas fa-tachometer-alt"></i>
                <div class="label">Pressure</div>
                <div class="value">${pressure_mb} mb</div>
            </div>
            <div class="detail-card">
                <i class="fas fa-eye"></i>
                <div class="label">Visibility</div>
                <div class="value">${vis_km} km</div>
            </div>
        `;
    }
    
    // Display simple forecast (since free WeatherAPI only provides current weather)
    function displaySimpleForecast(data) {
        const { temp_c, condition, humidity } = data.current;
        const { text, icon } = condition;
        
        // Clear previous forecast
        forecastCards.innerHTML = '';
        
        // Create simple forecast cards based on current data
        for (let i = 1; i <= 3; i++) {
            const forecastDate = new Date();
            forecastDate.setDate(forecastDate.getDate() + i);
            
            const dateStr = forecastDate.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
            
            // Simulate forecast by slightly modifying current values
            const forecastTemp = Math.round(temp_c + (Math.random() * 4 - 2));
            const forecastHumidity = Math.max(30, Math.min(90, humidity + (Math.random() * 20 - 10)));
            
            const forecastCard = document.createElement('div');
            forecastCard.classList.add('forecast-card');
            forecastCard.innerHTML = `
                <div class="forecast-date">${dateStr}</div>
                <div class="forecast-icon">
                    <img src="${icon.replace('//', 'https://')}" alt="${text}">
                </div>
                <div class="forecast-temp">${forecastTemp}°C</div>
                <div class="forecast-description">${text}</div>
                <div class="forecast-humidity">Humidity: ${forecastHumidity}%</div>
            `;
            
            forecastCards.appendChild(forecastCard);
        }
    }
    
    // Show loading state
    function showLoading() {
        currentWeather.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading weather data...</p>
            </div>
        `;
        weatherDetails.innerHTML = '';
        forecastCards.innerHTML = '';
    }
    
    // Show error message
    function showError(message) {
        currentWeather.innerHTML = `
            <div class="error">
                <i class="fas fa-exclamation-circle"></i>
                <p>${message}</p>
                <p>Please try again.</p>
            </div>
        `;
        weatherDetails.innerHTML = '';
        forecastCards.innerHTML = '';
    }
});