var WEATHER_API_BASE_URL='api.openweathermap.org';
var WEATHER_API_KEY = 'a785ed23ab5e676b328a50472e2ce8ea';
var MAX_DAILY_FORECAST = 5;

function getLocation(event) {
    event.preventDefault();
    //Getting the location entered by the user
    var userLocation = locationInput.value;
    console.log(locationInput);
    //Verifying that the location is valid and looking it up
    if (userLocation === '') {
        setLocationError('Please enter a valid location.');
    } else {
        lookupLocation();
    }
}

//Lookup location to get lat/lon
function lookupLocation(search) {
var apiUrl = `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;
fetch(apiUrl)
    .then(function (response) {
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then(function (data) {
        var location = data[0];
        console.log(location);

        //Getting the first location from the results
        var location = data[0];
        console.log(location);

        //Adding the location to recent locations list
        //addRecentLocation(location);

        //Display the weather
        displayWeather(location);
    })
}

function displayWeatherForecast(weatherData) {

    //Get the daily forecasts
    var dailyData = weatherData.daily;

    // Show section for the forecasts
    document.getElementById('forecast').style.display = 'block';

    //Clear current forecasts
    var forecastList = document.getElementById('forecast-days');
    forecastList.innerHTML = '';

    //Add new forecast and display

    for (var i = 0; i < MAX_DAILY_FORECAST; i++) {
        var displayForecast = dailyData[i];
        var day = new Date(dailyForecast.dt * 1000).toLocaleDateString('en-GB', {weekday: 'long'});
        var temp = `${dailyForecast.temp.day}`;
        var humidity = `${dailyForecast.humidity}%`;
        var wind = `${dailyForecast.wind_speed}MPH`;

        var newForecast = document.createElement('div');
        newForecast.classList.add('forecast-day');
        newForecast.innerHTML = `<div class="weather-info">
                <div class="date">
                    <span>${day}</span>
                </div>
                <div class="temperature">
                    <span>${temp}</span>
                </div>
                <div class="humidity">
                    <span>${humidity}</span>
                </div>
                <div class="wind">
                    <span>${wind}</span>
                </div>
            </div>`;
            forecastList.appendChild(newForecast);
    }
}


function getWeather(lat, lon) {
    //Get the weather from cache
    var apiUrl = `${WEATHER_API_BASE_URL}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;
    fetch(apiUrl)
    .then(function (response) {
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        //Show the current weather forecast
        displayCurrentWeather(data);

        //Show 5 day weather forecast
        displayWeatherForecast(data);
    })
}

function displayCurrentWeather(weatherData) {
    var currentWeather = weatherData.current;

    //Display current weather on the dashboard
    document.getElementById('temp_value').textContent = `${currentWeather.temp}`;
    document.getElementById('wind_value').textContent = `${currentWeather.wind_speed}MPH`;
    document.getElementById('humid_value').textContent = `${currentWeather.humidity}%`;
    document.getElementById('uvi_value').textContent = `${currentWeather.uvi}`;
}

//Display weather to cache
function displayWeather(weatherData) {
    document.getElementById('location-name').textContent = `${weatherData.name},${weatherData.country}`;

    getWeather(weatherData.lat, weatherData.lon);
}

// Connect search input and button
var locationInput = document.getElementById('location');
var buttonSearch = document.getElementById('search');

//Event listener on search button
searchButton.addEventListener('click', getLocation);