const api = {
    key: '3fcfad03daf113a090890ec6e575aa0d',
    baseurl: 'https://api.openweathermap.org/data/2.5/'
}

$('.dropdown-item').click(function() {
    let city = ( $(this).text() );
    console.log(city);
    getResult(city);
})

function getResult(query){
    fetch(`${api.baseurl}weather?q=${query}&units=imperial&appid=${api.key}`)
    .then(weather => {
        return weather.json()
    }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now)
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