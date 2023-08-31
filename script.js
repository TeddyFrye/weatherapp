//weather fetch
const apiKey = "22068bd3146d4952848212736231608";

function fetchWeatherData(location) {
  const endpoint = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

  fetch(endpoint)
    .then((response) => {
      document.getElementById("loading").value = 40; // 40% loaded
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("loading").value = 60; // 60% loaded
      if (data.error) {
        throw new Error(data.error.message);
      }
      const processedData = processWeatherData(data);
      getGif(processedData.condition);
    })
    .catch((error) => {
      document.getElementById("loading").value = 0; // reset loading bar
      document.getElementById("error").textContent =
        "Error fetching the weather data: " + error;
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
async function getGif(conditionText) {
  const apiUrl = `https://api.giphy.com/v1/gifs/translate?api_key=ioOWdJ8FcDZHhx3mP2KnHepN3DFuP6u9&s=${conditionText}`;
  const img = document.getElementById("weatherImage");
  const loading = document.getElementById("loading");

  try {
    loading.style.display = "block";
    const response = await fetch(apiUrl, { mode: "cors" });
    document.getElementById("loading").value = 80; // 80% loaded
    const gifData = await response.json();
    const newImgSrc = gifData.data.images.original.url;
    const preloadImg = new Image();

    preloadImg.onload = function () {
      img.style.opacity = 0;
      document.getElementById("loading").value = 100; // 100% loaded
      img.src = newImgSrc;
      img.style.opacity = 1;
      loading.style.display = "none";
    };

    preloadImg.src = newImgSrc;
  } catch (error) {
    loading.style.display = "none";
    document.getElementById("error").textContent =
      "Error fetching the GIF: " + error;
    console.error("Error fetching the GIF:", error);
  }
}
