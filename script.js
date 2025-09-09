const apiKey = 'a1ce8e50f57b56c1e77634aa4f37ace4';
let options = { method: 'GET' };

let loadingSpinnerEl = document.getElementById('loadingSpinner');
let errorMsgEl = document.getElementById('errorMsg');
let cityNameEl = document.getElementById('cityName');
let cityCountryEl = document.getElementById('cityCountry');
let latitudeEl = document.getElementById('latitude');
let longitudeEl = document.getElementById('longitude');
let temperatureEl = document.getElementById('temperature');
let descriptionEl = document.getElementById('description');
let weatherIconEl = document.getElementById('weatherIcon');
let feelsLikeEl = document.getElementById('feelsLike');
let humidityEl = document.getElementById('humidity');
let pressureEl = document.getElementById('pressure');
let visibilityEl = document.getElementById('visibility');
let windSpeedEl = document.getElementById('windSpeed');
let windDegEl = document.getElementById('windDeg');
let cloudsEl = document.getElementById('clouds');
let sunriseEl = document.getElementById('sunrise');
let sunsetEl = document.getElementById('sunset');

function printAndUpdate(data) {
    cityNameEl.textContent = data.name;
    cityCountryEl.textContent = data.sys.country;
    latitudeEl.textContent = `Latitude: ${data.coord.lat}`;
    longitudeEl.textContent = `Longitude: ${data.coord.lon}`;
    temperatureEl.innerHTML = `${data.main.temp}&deg;C`;
    descriptionEl.textContent = data.weather[0].description;
    weatherIconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    feelsLikeEl.textContent = `${data.main.feels_like}°C`;
    humidityEl.textContent = `${data.main.humidity}%`;
    pressureEl.textContent = `${data.main.pressure} hPa`;
    visibilityEl.textContent = `${data.visibility} m`;
    windSpeedEl.textContent = `${data.wind.speed} m/s`;
    windDegEl.textContent = `${data.wind.deg}°`;
    cloudsEl.textContent = `${data.clouds.all}%`;
    sunriseEl.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    sunsetEl.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
}

function fetchWeather(url) {
    document.getElementById('weatherResult').classList.add('d-none');
    errorMsgEl.innerHTML = "";
    loadingSpinnerEl.classList.remove('d-none');

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            loadingSpinnerEl.classList.add('d-none');
            if (data.cod === 200) {
                document.getElementById('weatherResult').classList.remove('d-none');
                printAndUpdate(data);
            } else {
                errorMsgEl.innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
            }
        })
        .catch(error => {
            loadingSpinnerEl.classList.add('d-none');
            errorMsgEl.innerHTML = `<div class="alert alert-danger">Error fetching data. ${error}</div>`;
        });
}

document.getElementById('getWeatherBtn').addEventListener('click', function () {
    let city = document.getElementById('cityInput').value.trim();
    if (city === "") {
        errorMsgEl.innerHTML = `<div class="alert alert-danger">Please enter a city.</div>`;
        return;
    }
    fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
});


const locationBtn = document.getElementById("getLocationBtn");
locationBtn.addEventListener("click", function (){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        }, function() {
            errorMsgEl.innerHTML = `<div class="alert alert-danger">Unable to retrieve your location.</div>`;
        });
    } else {
        errorMsgEl.innerHTML = `<div class="alert alert-danger">Geolocation is not supported by this browser.</div>`;
    }
});

