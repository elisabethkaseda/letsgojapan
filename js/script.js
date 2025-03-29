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
    let weatherCode = dataObject.current.weather_code;
    let isDay = dataObject.current.is_day;
    
    // Create empty weatherIcon variable;
    let weatherIcon;

    // learned a new built-in method: .includes()
    if (weatherCode == 0) {
        // Clear
        if (isDay == 0) {
            weatherIcon = '<i class="ph-bold ph-moon"></i>';
        } else {
            weatherIcon = '<i class="ph-bold ph-sun"></i>';
        }
    } else if (weatherCode == 1 || weatherCode == 2) {
        // Partly Cloudy
        if (isDay == 0) {
            weatherIcon = '<i class="ph-bold ph-cloud-moon"></i>';
        } else {
            weatherIcon = '<i class="ph-bold ph-cloud-sun"></i>';
        }
    } else if (weatherCode == 3) {
        // Cloudy
        weatherIcon = '<i class="ph-bold ph-cloud"></i>';
    } else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81,82].includes(weatherCode)) {
        // Rainy (of any kind)
        weatherIcon = '<i class="ph-bold ph-cloud-rain"></i>';
    } else if ([71, 73, 75, 77, 85, 86, 96, 99].includes(weatherCode)) {
        // Snowy (of any kind) 
        weatherIcon = '<i class="ph-bold ph-cloud-snow"></i>';
    } else if (weatherCode == 45 || weatherCode == 48) {
        // Foggy
        weatherIcon = '<i class="ph-bold ph-cloud-fog"></i>';
    } else if (weatherCode == 95) {
        // Thunderstorms
        weatherIcon = '<i class="ph-bold ph-cloud-lightning"></i>';
    } else {
        weatherIcon = '<i class="ph-bold ph-thermometer"></i>';
    }

    container.innerHTML = `<span>${weatherIcon} ${dataObject.current.temperature_2m}&deg;C</span>`
}

// const setTheme = theme => document.documentElement.className = theme;
// setTheme('light');

getCurrentWeather();


// INTERACTIVITY

// function focusImage(thisElement, location) {
//     let thisImage = thisElement;
//     console.log(thisImage);
// }


// HIDING AND SHOWING POPUPS

const darkOverlay = document.querySelector('.overlay');

function showOverlay(overlay) {
    let theOverlay = document.querySelector(overlay);
    theOverlay.classList.remove('hidden');
    darkOverlay.classList.remove('hidden');
}

function hideOverlay(thisElement) {
    let thisOverlay = thisElement.parentElement;
    thisOverlay.classList.add('hidden');
    darkOverlay.classList.add('hidden');
}