var buttonSearch = document.querySelector('#buttonSearch');

var buttonSearch = function (event) {
    event.preventDefault();

    var location = locationInputEl.value.trim();

    if (location) {
        getLocation(city);

        locationContainerEl.textContent = '';
        locationInputEl.value = '';
    } else {
        alert('Please enter a valid location');
    }

    };

    var getLocation = function (city) {
        var apiURL = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={a785ed23ab5e676b328a50472e2ce8ea}';

        fetch(apiCity)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayCity(data, city);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
            })
        };

    var displayCity = function (city, searchTerm) {
        if (city.length === 0) {
            cityContainerEl.textContent = 'No Weather Results Found.';
            return;
        }
    }

