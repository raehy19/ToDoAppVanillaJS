const API_KEY = "5dbe09f141a6e50ccc165440f6d66a27";

const weather = document.querySelector("#weather");
const icon = weather.querySelector("img");
const temp = weather.querySelector("#temp");
const description = weather.querySelector("#description");
const tempMaxMin = weather.querySelector("#temp-max-min");
const city = weather.querySelector("#city");

function onGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;

  console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      temp.innerText = `${data.main.temp} °C`;
      description.innerText = `${data.weather[0].description}`;
      tempMaxMin.innerText = `${data.main.temp_max}° / ${data.main.temp_min}°`;
      city.innerText = `📍 ${data.name}`;
    });
}
function onGeoError() {
  alert("Error occurred while finding your location.");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
