"use strict";

const weatherForm = document.forms["weather-form"];
const cityInput = weatherForm["city-input"];
const card = document.querySelector(".card");
const apiKey = "841df6e75d20f450a5f6d62ec281853b";

weatherForm.onsubmit = async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const data = await getWeatherData(city);
            displayWeatherData(data);
        } catch (error) {
            displayError(error)
        }
    } else {
        displayError("Please enter a city");
    }
};

async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherData(data) {
    const { name, main: { temp, humidity }, weather: [{ main, icon }] } = data;

    card.innerHTML = `
        <h1 class="city-display">${name}</h1>
        <p class="temp-display">${((temp - 273.15)).toFixed(1)}℃</p>
        <p class="humidity-display">Humidity: ${humidity}%</p>
        <p class="descr-display">${main}</p>
        <img src="https://openweathermap.org/img/wn/${icon}@4x.png"
             alt="icon"
             class="weather-icon">
    `;

    card.style.display = "block";
}

function displayError(msg) {
    card.innerHTML = `
        <p class="error-display">${msg}</p>
    `;
} 