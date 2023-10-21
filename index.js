const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const searchBox = document.querySelector(".search-box");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
        const APIKey = "46d0ab0c8a4e0b1bdcf8ac04ba4e0be2";
        const city = document.querySelector(".search-box input").value;

        if (city === "")
            return;

        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=sp&appid=${APIKey}`
        )
          .then((response) => response.json())
          .then((json) => {
            if (json.cod === "404") {
              container.style.height = "400px";
              weatherBox.style.display = "none";
              weatherDetails.style.display = "none";
              error404.style.display = "block";
              error404.classList.add("fadeIn");
              return;
            }

            error404.style.display = "none";
            error404.classList.remove("fadeIn");

            const image = document.querySelector(".weather-box img");
            const temperature = document.querySelector(
              ".weather-box .temperature"
            );
            const description = document.querySelector(
              ".weather-box .description"
            );
            const humidity = document.querySelector(
              ".weather-details .humidity span"
            );
            const wind = document.querySelector(".weather-details .wind span");

            switch (json.weather[0].main) {
              case "Clear":
                image.src = "imagenes/clear.png";
                break;

              case "Rain":
                image.src = "imagenes/rain.png";
                break;

              case "Snow":
                image.src = "imagenes/snow.png";
                break;

              case "Clouds":
                image.src = "imagenes/cloud.png";
                break;

              case "Haze":
                image.src = "imagenes/mist.png";
                break;

              default:
                image.src = "";
            }

            temperature.innerHTML = `${parseInt(
              json.main.temp
            )}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${+(json.wind.speed * 3.6).toFixed(2)}Km/h`;

            weatherBox.style.display = "";
            weatherDetails.style.display = "";
            weatherBox.classList.add("fadeIn");
            weatherDetails.classList.add("fadeIn");
            container.style.height = "590px";
          });
    });
searchBox.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    search.click();
  }
});