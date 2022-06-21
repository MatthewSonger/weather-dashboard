var userFormEl = document.querySelector("#user-form");
var cityEl = document.querySelector("#city");
var forecastContainerEl = document.querySelector("#weatherdata");
var currentWeatherContainer = document.getElementById("current");
var forecastWeatherContainer = document.getElementById("forecast");
var fiveDayTitle = document.getElementById("five-day");
var btn2El = document.querySelector("#button2");



var formSubmitHandler = function (event) {
    //prevent page from refreshing
    event.preventDefault();
    //get value from input element
    var cityArray = JSON.parse(localStorage.getItem("searchHistory")) || [];
    var cityName = cityEl.value.trim();
    console.log('cityArray: ', cityArray);
    console.log('cityName: ', cityName);
    
    console.log(cityArray);
    if (cityName) {
        if (!cityArray.includes(cityName)) {
            // first zero means put new item in 0 place, second zero means do not delete other items
            cityArray.splice(0, 0, cityName);
        }
        localStorage.setItem("searchHistory", JSON.stringify(cityArray))
        getCityGeo(cityName)
            .then(function (latLon) {
                //console.log('latLon: ', latLon);
                return getWeatherData(latLon)
            })
            cityEl.value = "";
    
    } else {
        alert("Please enter a city name")
    }
};

function getCityGeo(city) {
    //find the latitude and longitude for the city
    var apiUrlGeo = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=8d03dfd7dbf3df23ffe6a5d84a5e5242";
    return fetch(apiUrlGeo)
        .then(function (response) {
            if (response.ok) {
                return response.json()
            } else {
                alert("Error: city not found");
            }
        })
        .then(function (data) {
            //console.log('data: ', data);
            forecastWeatherContainer.innerHTML = "";
            var currentCity = data[0].name;
            var todayDate = moment().format("MM/DD/YYYY");
            var currentCityDateEl = document.createElement("h2")
            currentCityDateEl.textContent = currentCity + " " + "(" + todayDate + ")";
            currentWeatherContainer.textContent = "";
            currentCityDateEl.classList.add("inline");
            currentWeatherContainer.append(currentCityDateEl);

            return {
                lat: data[0].lat,
                lon: data[0].lon
            }

        })
}