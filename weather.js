// select elements
const container = document.querySelector(".container");
const search = document.querySelector(".searchbox button"); // button, not div
const weatherbox = document.querySelector(".weather-box");
const weatherdetails = document.querySelector(".weather");
const error404 = document.querySelector(".not-found");

// add event listener on search button
search.addEventListener("click", () => {
    const APIKey = "7b85df972fa87361fcdaff8767d981b9";
    const city = document.querySelector(".searchbox input").value.trim();

    if (city === "") return;

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    )
        .then(response => response.json())
        .then(json => {

            if (json.cod === "404") {
                container.style.height = "400px";
                weatherbox.style.display = "none";
                weatherdetails.style.display = "none";
                error404.style.display = "block";
                error404.classList.add("fadeIn");
                return;
            }

            error404.style.display = "none";
            error404.classList.remove("fadeIn");

            // select required elements
            const image = document.querySelector(".weather-box img");
            const temperature = document.querySelector(".temperature");
            const description = document.querySelector(".description");

            const humidity = document.querySelector(".humidity-details span");
            const wind = document.querySelector(".wind-details span");
            const pressure = document.querySelector(".pressure-details span");
            const visibility = document.querySelector(".visibility-details span");

            switch (json.weather[0].main) {
                case "Clear":
                    image.src = "./Images/clear.png";
                    break;
                case "Rain":
                    image.src = "./Images/rain.png";
                    break;
                case "Snow":
                    image.src = "./Images/snow.png";
                    break;
                case "Clouds":
                    image.src = "./Images/cloud.png";
                    break;
                case "Mist":
                case "Smoke":
                case "Haze":
                    image.src = "./Images/mist.png";
                    break;
                default:
                    image.src = "./Images/clear.png";
            }
            image.style.width = "120px";
            image.style.height = "auto";

            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${Math.round(json.wind.speed)} km/h`;
            pressure.innerHTML = `${json.main.pressure} hPa`;
            visibility.innerHTML = `${(json.visibility / 1000).toFixed(1)} km`;

            weatherbox.style.display = "block";
            weatherdetails.style.display = "flex";

            weatherbox.classList.add("fadeIn");
            weatherdetails.classList.add("fadeIn");

            container.style.height = "540px";
        })
        //.catch(error => console.error("Error fetching weather:", error));
});

