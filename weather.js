const map = document.querySelector(".fa-map-marker-alt");
const tmp = document.querySelector(".fa-temperature-low");
const API_KEY = "b9fa747e9908fd29e4217a56cfba63eb";
const COORDS = 'coords';

function getWeather(lat,lon) {
    fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}&units=metric`
    )
    .then(function(response){
        return (response.json())
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        map.innerText = place;
        tmp.innerText = temperature;
    })
}
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = (position.coords.latitude);
    const longitude = (position.coords.longitude);
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();