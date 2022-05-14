// //get items
const URL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const KEY = '&appid=d3277bf4d8bcdeb684f1c9deef807c70';
const searchInput = document.querySelector('#search');
const overlayInput = document.querySelector('#overlay__input');
const searchButton = document.querySelector('.weather__btn');
const weatherIcon = document.querySelector('.weather__icon');
const cityTemperature = document.querySelector('.weather__temperature');
const cityName = document.querySelector('.weather__city');
const maxTemperature = document.querySelector('.max-temperature');
const minTemperature = document.querySelector('.min-temperature');
const feelsLikeTemperature = document.querySelector('.feelsLike');
const humidityPercents = document.querySelector('.humidity');
const descriptionWeather = document.querySelector('.description');
const countryRegion = document.querySelector('.country');
const weatherMainDiv = document.querySelector('.weather__main');
const overlay = document.querySelector('.overlay');



//Listeners
searchButton.addEventListener('click', fetchWeather)
searchInput.addEventListener('keypress', inputHandler)
overlayInput.addEventListener('keypress', overlayInputHandler)

//Functions

function fetchWeather() {
  fetch(URL + searchInput.value + KEY, {
    method: 'get'
  }).then(response => response.json())
    .then(data => {
      console.log(data);
      displayProperties(data)
      searchInput.value = ''
    })
}

function inputHandler(e) {
  if (e.key === 'Enter') {
    fetch(URL + searchInput.value + KEY, {
      method: 'get'
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        displayProperties(data)
        changeBackground(data)
        searchInput.value = '';
      })
  }
}

function overlayInputHandler(e) {
  if (e.key === 'Enter') {
    fetch(URL + overlayInput.value + KEY, {
      method: 'get'
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        displayProperties(data)
        changeBackground(data)
        overlayInput.value = '';
        overlay.classList.add('hidden__overlay')
      })
  }
}

function displayProperties(data) {
  const { temp_max } = data.main;
  const { temp_min } = data.main;
  const { feels_like } = data.main
  const { humidity } = data.main
  const { description } = data.weather[0]
  const { name } = data;
  const { temp } = data.main;
  const { country } = data.sys;
  // change values on page
  cityName.innerHTML = name;
  cityTemperature.innerHTML = Math.floor(temp - 273) + '&#8451;'
  maxTemperature.innerHTML = 'Max temperature: ' + Math.floor(temp_max - 273) + '&#8451;'
  minTemperature.innerHTML = 'Min temperature: ' + Math.floor(temp_min - 273) + '&#8451;'
  feelsLikeTemperature.innerHTML = 'Feels like: ' + Math.floor(feels_like - 273) + '&#8451;'
  humidityPercents.innerHTML = 'Humidity: ' + humidity + '%';
  descriptionWeather.innerHTML = 'Description: ' + description;
  countryRegion.innerHTML = 'Country: ' + country;
}

function changeBackground(data) {
  const { description } = data.weather[0]

  if (description === 'scattered clouds' || description === 'few clouds') {

    weatherMainDiv.classList.remove('most-cloud', 'rain', 'sun', 'ligth-snow', 'broken-cloud')
    weatherMainDiv.classList.add('scattered-cloud')

  } else if (description === 'overcast clouds') {

    weatherMainDiv.classList.remove('scattered-cloud', 'rain', 'sun', 'ligth-snow', 'broken-cloud')
    weatherMainDiv.classList.add('most-cloud')

  }

  else if (description === 'broken clouds') {
    weatherMainDiv.classList.remove('scattered-cloud', 'most-cloud', 'sun', 'rain', 'ligth-snow')
    weatherMainDiv.classList.add('broken-cloud')
  }

  else if (description === 'light rain' || description === 'heavy intensity rain' || description ===  'moderate rain') {

    weatherMainDiv.classList.remove('scattered-cloud', 'most-cloud', 'sun', 'ligth-snow', 'broken-cloud')
    weatherMainDiv.classList.add('rain')

  }
  else if (description === 'clear sky') {
    console.log(description);
    weatherMainDiv.classList.remove('scattered-cloud', 'most-cloud', 'rain', 'ligth-snow', 'broken-cloud')
    weatherMainDiv.classList.add('sun')

  }
  else if (description === 'light snow') {

    weatherMainDiv.classList.remove('scattered-cloud', 'most-cloud', 'rain', 'sun', 'broken-cloud')
    weatherMainDiv.classList.add('ligth-snow')

  }

}
