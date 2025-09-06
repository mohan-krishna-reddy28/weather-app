const apiKey = 'a1ce8e50f57b56c1e77634aa4f37ace4';
let options = { method: 'GET' };

let loadingSpinnerEl = document.getElementById('loadingSpinner');
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

document.getElementById('getWeatherBtn').addEventListener('click', function () {
    let city = document.getElementById('cityInput').value.trim();
    if (city === "") {
        document.getElementById('weatherResult').innerHTML = `<div class="alert alert-danger">Please Enter a City.</div>`;
        return;
    }

    document.getElementById('weatherResult').classList.add('d-none');
    loadingSpinnerEl.classList.remove('d-none');

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            document.getElementById('weatherResult').classList.remove('d-none');
            loadingSpinnerEl.classList.add('d-none');
            if (data.cod === 200) {
                printAndUpdate(data);
            } else {
                document.getElementById('weatherResult').innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
            }
        })
        .catch(function (error) {
            document.getElementById('weatherResult').innerHTML = `<div class="alert alert-danger">Error fetching data. ${error}</div>`;
        });
});
const enterBtn = document.getElementById("enterBtn");
const curtain = document.getElementById("curtain");

document.body.classList.add("no-scroll"); // lock scroll when curtain shows

enterBtn.addEventListener("click", () => {
  curtain.classList.add("open"); // animate curtain opening
  document.body.classList.remove("no-scroll");
  setTimeout(() => {
    curtain.style.display = "none";
  }, 1200);
});



