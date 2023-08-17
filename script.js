//weather fetch
const apiKey = "22068bd3146d4952848212736231608";

function fetchWeatherData(location) {
  const endpoint = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const processedData = processWeatherData(data);
      console.log(processedData);
      getGif(processedData.condition);
    })
    .catch((error) => {
      console.error("Error fetching the weather data:", error);
    });
}

function processWeatherData(data) {
  const requiredData = {
    location: data.location.name,
    temperature: data.current.temp_f,
    condition: data.current.condition.text,
    icon: data.current.condition.icon,
  };
  return requiredData;
}

document
  .getElementById("weatherForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the form from actually submitting
    const location = document.getElementById("locationInput").value;
    fetchWeatherData(location);
  });

//weather gif
const img = document.querySelector("img");
async function getGif(conditionText) {
  const apiUrl = `https://api.giphy.com/v1/gifs/translate?api_key=ioOWdJ8FcDZHhx3mP2KnHepN3DFuP6u9&s=${conditionText}`;

  const response = await fetch(apiUrl, { mode: "cors" });
  const gifData = await response.json();

  img.src = gifData.data.images.original.url;
}
