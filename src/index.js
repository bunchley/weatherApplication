import "./style.css";
import GiphyHandler from "./giphy.js";
import { WeatherManager } from "./weather.js";
import DisplayHandler from "./display.js";

const home = (() => {
  DisplayHandler.renderMainPage();
  const inputLocation = document.querySelector(".input-element");
  const tempContainer = document.querySelector(".temp-container");
  WeatherManager.displayWeatherData("Denver, CO");

  inputLocation.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const location = inputLocation.value;
      if (location === "") {
        alert("Please enter a location");
        return;
      }
      WeatherManager.displayWeatherData(location);
      inputLocation.value = "";
    }
  });
})();

home;
