var WEATHER_API_BASE_URL='api.openweathermap.org';
var WEATHER_API_KEY = 'a785ed23ab5e676b328a50472e2ce8ea';
var MAX_DAILY_FORECAST = 5;


var getLocation = function getLocation () {
    //Getting the location entered by the user
    var userLocation = locationInput.value;
    //Verifying that the location is valid and looking it up
    if (userLocation === '') {
        setLocationError('Please enter a valid location.');
    } else {
        lookupLocation(userLocation);
    }
}

// Connect search input and button
var locationInput = document.getElementById('location');
var searchButton = document.getElementById('search');

//Event listener on search button
searchButton.addEventListener('click', getLocation);

//Lookup location to get lat/lon
var lookupLocation = function search () {

var apiUrl = `${WEATHER_API_BASE_URL}/geo/1.0/direct?q=${search}&limit=5&appid=${WEATHER_API_KEY}`;
fetch(apiUrl)
    .then function response () {
        response.json();
    }
    .then function data () {
        //Getting the first location from the results
        var location = data[0];

        //Adding the location to recent locations list
        addRecentLocation(location);

        //Display the weather
        displayWeather(location);
    }