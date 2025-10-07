const apiKey = "c0695f3fde87665f79673fafda2374c4";

async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const weatherResult = document.getElementById('weatherResult');
  if (!city) {
    weatherResult.innerHTML = 'Please enter a city name.';
    return;
  }

  weatherResult.innerHTML = 'Loading...';

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod === '404') {
      weatherResult.innerHTML = 'City not found.';
    } else {
      const { name, main, weather } = data;
      weatherResult.innerHTML = `
        <h3>${name}</h3>
        <p>${weather[0].main} - ${weather[0].description}</p>
        <p>🌡️ Temp: ${main.temp}°C</p>
        <p>💧 Humidity: ${main.humidity}%</p>
      `;
    }
  } catch (error) {
    weatherResult.innerHTML = 'Error fetching weather data.';
  }
}