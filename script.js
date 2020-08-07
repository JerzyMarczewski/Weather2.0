const key = "3689d929240342b33aea6989590ae476";
    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

let search_box = document.querySelector(".search-box");
search_box.addEventListener("keypress", activate);
let home = document.querySelector(".fa-home");
home.addEventListener("click", homeWeather)


function activate(e){
    if(e.keyCode == 13){
        getResultsByCity(search_box.value);
        search_box.value = "";
    } 
}

function homeWeather(e){
    getResultsByCoords();
}

function getResultsByCity(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${key}`)
        .then(weather => {
            return weather.json()
        }).then(displayResults);
}

function getResultsByCoords(){
    if(!navigator.geolocation){
        alert("Geolocation is not supported by your browser");
    }else{
        navigator.geolocation.getCurrentPosition(function (positon){
            let lat = positon.coords.latitude;
            let long = positon.coords.longitude;

            console.log(lat);
            console.log(long);

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=${key}`)
                .then(weather =>{
                    return weather.json();
                }).then(displayResults);

        }),function (){
            alert("Unable to get coordinates");
        };
    }
}


function displayResults(weather){
    console.log(weather);

    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name} / ${weather.sys.country}`;

    let date = document.querySelector(".location .date");
    date.innerText = getDate();

    let temp = document.querySelector(".current .temp");
    temp.innerText = Math.round(weather.main.temp) + " °C";

    let desc = document.querySelector(".current .weather");
    desc.innerText = weather.weather[0].main;

}
function getDate(){
    let d = new Date();
    let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}