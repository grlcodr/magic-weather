const api = {
    key: '3fcfad03daf113a090890ec6e575aa0d',
    baseurl: 'https://api.openweathermap.org/data/2.5/'
}

let city_div = document.querySelector('.city');
let gif_div = document.querySelector('.rainbow-gif');
let chooseText_div = document.querySelector('.choose-text');
let weatherIcon_div = document.querySelector('.weather-icon');
let time_p = document.querySelector('.time');
let homeIcon = document.querySelector('.fa-fort-awesome');

$('.dropdown-item').click(function() {
    let city = ( $(this).text() );
    city_div.style.display = 'block';
    gif_div.style.display = 'none';
    chooseText_div.style.display = 'none';
    getResult(city);
})

function getResult(query){
    fetch(`${api.baseurl}weather?q=${query}&units=imperial&appid=${api.key}`)
    .then(weather => {
        return weather.json()
    }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather)
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°f</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    weatherIcon_div.innerHTML = `<img src="/icons/${weather.weather[0].icon}.png">`
    
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.floor(weather.main.temp_min)}°f / ${Math.floor(weather.main.temp_max)}°f`;
}

function dateBuilder(d){
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]; 
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}