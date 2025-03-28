// WEATHER FUNCTIONALITY

const container = document.querySelector('.weather');

// This API call is mostly based on the way we learned it in Front-End Development class; may change to async/await later so it actually returns
function getCurrentWeather() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current=temperature_2m,is_day,weather_code&timezone=auto')
    .then(
        response => response.json()
    )
    .then(
        response => {
            // console.log(response);
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
    let weatherCode = dataObject.current.weather_code;
    console.log(weatherCode);
    let weatherIcon;



    container.innerHTML = `<span>${dataObject.current.weather_code}/${dataObject.current.temperature_2m}&deg;C</span>`
}

// const setTheme = theme => document.documentElement.className = theme;
// setTheme('light');

getCurrentWeather();
