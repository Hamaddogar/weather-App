const APIkey = "f792ea86435d6d03093ac74cf0bb3026";
const formTagEl = document.getElementById('form-test');
const searchHistoryEl = document.getElementById('search-history');
const cityNameEl = document.getElementById('city');
//City Display Elements
const currentTempEl = document.getElementById('temperature');
const currentCityEl = document.getElementById('city');
const currentWindSpeedEl = document.getElementById('wind-speed');
const currentHumidityEl = document.getElementById('humid');
const searchInputEl = document.getElementById("input");
const fiveDayEl = document.querySelector('.five-day');
const singleDayIcon = document.getElementById('single-day-icon');
//Save Searches to Local Storage
let pastSearch = JSON.parse(localStorage.getItem('pastSearch')) || [];

//Store Searched City and Create a Clickable Button
function storeSearch(cityName) {
    const pastSearchBtn = document.createElement('button');
    pastSearchBtn.setAttribute('class', 'btn btn-secondary');
    pastSearchBtn.innerText = cityName;
    searchHistoryEl.appendChild(pastSearchBtn);

    pastSearchBtn.addEventListener('click', function () {
        const cityName = pastSearchBtn.innerText;
        currentWeather(cityName)
        fiveDay(cityName)
    })
}
//Put Past Searches in LocalStorage
function appendStorage() {
    localStorage.setItem('pastSearch', JSON.stringify(pastSearch))
}

//Get Past Searches from Local Storage
function getStorage() {
    let storage = JSON.parse(localStorage.getItem('pastSearch'));
    if (storage) {
        storage.forEach(storeSearch)
    }
}
// Current Conditions of City
function currentWeather(cityName) {
    let cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey + "&units=imperial"

    fetch(cityURL)
        .then((response) => response.json())
        .then((data) => {
            //Get Informational Data
            const place = data.name;
            var today = moment().format('l');
            const temp = data.main.temp;
            const wind = data.wind.speed;
            const humidity = data.main.humidity;
            storeSearch(cityName)

            //Appends variables into HTML
            currentCityEl.textContent = place + ' ' + '(' + today + ')'
            singleDayIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
            currentTempEl.textContent = 'Temp: ' + temp + '°F';
            currentWindSpeedEl.textContent = 'Wind: ' + wind + ' MPH';
            currentHumidityEl.textContent = 'Humidity: ' + humidity + "%";
        });
}

