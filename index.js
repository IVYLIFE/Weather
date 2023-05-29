localStorage.clear();

const apiKey = '55a06d9af6dfa19d9475b073801165eb';
const apiBase = 'https://api.openweathermap.org/data/2.5/weather?units=metric';


let input = document.getElementById('searchInput');
let searchBtn = document.getElementById('searchBtn');

let weatherImg = {
    'Clear': './media/clear.png',
    'Clouds': './media/clouds.png',
    'Drizzle': './media/drizzle.png',
    'Rain': './media/rain.png',
    'Snow': './media/snow.png',
    'Haze': './media/haze.png',
    'Mist': './media/mist.png',
}



async function getWeather(city) {
    const response = await fetch(apiBase + `&q=${city}&appid=${apiKey}`);

    if (response.status == 404) {
        document.getElementById('error').style.display = 'block';
        document.getElementById('weather').style.display = 'none';
    }
    else {
        const data = await response.json();

        let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

        weatherData = {
            'city': data.name,
            'country': regionNames.of(data.sys.country),
            'weather': data.weather[0].main,
            'temp': Math.round(data.main.temp),
            'humidity': data.main.humidity,
            'windSpeed': data.wind.speed,
            'icon': weatherImg[data.weather[0].main]
        }

        console.log(weatherData);
        changeDom(weatherData);

        document.getElementById('error').style.display = 'none';
        document.getElementById('weather').style.display = 'block';
    }

}

searchBtn.addEventListener('click', function () {
    console.log(input.value);
    getWeather(input.value);
});

function changeDom(weatherData) {
    let city = document.getElementById('city');
    let country = document.getElementById('country');
    let weather = document.getElementById('weatherDesc');
    let temp = document.getElementById('temp');
    let humidity = document.getElementById('humidity');
    let windSpeed = document.getElementById('windSpeed');
    let icon = document.getElementById('weatherIcon');

    city.innerHTML = weatherData.city;
    temp.innerHTML = weatherData.temp + '°C';
    humidity.innerHTML = weatherData.humidity + '%';
    windSpeed.innerHTML = weatherData.windSpeed + 'm/s';
    icon.src = weatherData.icon;
    if(country)country.innerHTML = weatherData.country;
    if(weather)weather.innerHTML = weatherData.weather;
}




