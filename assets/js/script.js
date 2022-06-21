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