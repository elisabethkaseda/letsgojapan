// WEATHER FUNCTIONALITY

const container = document.querySelector('.weather');

// This APi call is based on the way we learned it in Front-End Development class; apparently this is a spaghetti code way of doing it and it should be done using async/await try/catch and returning data (this current version returns undefined), but it's good enough for now. Will fix later when converting to a React site, after I've had a few weeks to study JavaScript and React more.
function getCurrentWeather() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current=temperature_2m,is_day,weather_code&timezone=auto')
    .then(
        response => response.json()
    )
    .then(
        response => {
            console.log(response);
            displayWeather(response);
        }
    )
    // Added a catch for error checking
    .catch(
        error => {
            console.error('Error fetching data:', error);
            container.innerHTML = `<span>No data available.</span>`
            }
    )
}

function displayWeather(dataObject) {
    container.innerHTML = `<span>${dataObject.current.weather_code}/${dataObject.current.temperature_2m}&deg;C</span>`
}

const setTheme = theme => document.documentElement.className = theme;
setTheme('light');

getCurrentWeather();
