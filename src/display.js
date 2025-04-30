import cloudyImage from "../images/cloud.svg";
import partiallyCloudyImage from "../images/sun_cloud.svg";
import sunnyImage from "../images/sunny.svg";
import rainImage from "../images/cloud_rain.svg";
import snowImage from "../images/snowy_cloud.svg";
import windImage from "../images/windy.svg";
const createDomElement = (appendTo, tag, className, text = "") => {
  const element = document.createElement(tag);
  element.className = className;
  if (text) {
    element.textContent = text;
  }
  appendTo.appendChild(element);
  return element;
};
const createMainPage = () => {
  const contentContainer = document.getElementById("content");
  const formContainer = createDomElement(
    contentContainer,
    "div",
    "form-container"
  );
  const form = createDomElement(formContainer, "form", "form");
  const inputElement = createDomElement(form, "input", "input-element");
  inputElement.placeholder = "Enter location";
  //   form,
  //   "button",
  //   "submit-button",
  //   "Submit"
  // );
  const weatherContainer = createDomElement(
    contentContainer,
    "div",
    "weather-container"
  );
  const locationContainer = createDomElement(
    weatherContainer,
    "div",
    "location-container"
  );
  const locationName = createDomElement(
    locationContainer,
    "h2",
    "location-name"
  );
  const currentConditionsContainer = createDomElement(
    weatherContainer,
    "div",
    "current-conditions-container"
  );
  const currentConditions = createDomElement(
    currentConditionsContainer,
    "div",
    "current-conditions"
  );
  const currentConditionsIcon = createDomElement(
    currentConditions,
    "img",
    "current-conditions-icon"
  );

  const currentConditionsText = createDomElement(
    currentConditions,
    "div",
    "current-conditions-text"
  );
  const tempContainer = createDomElement(
    weatherContainer,
    "div",
    "temp-container"
  );
  const currentConditionsTemperature = createDomElement(
    tempContainer,
    "a",
    "current-conditions-temperature"
  );
  const descriptionContainer = createDomElement(
    weatherContainer,
    "div",
    "description-container"
  );
  const currentConditionsDescription = createDomElement(
    descriptionContainer,
    "h3",
    "current-conditions-description"
  );
  const currentConditionsPrecip = createDomElement(
    currentConditionsText,
    "h3",
    "current-conditions-precip"
  );
};
const displayLocation = (location) => {
  const locationName = document.querySelector(".location-name");
  locationName.textContent = location;
};
const clearPreviousWeather = () => {
  const iconContainer = document.querySelector(".current-conditions-icon");
  const conditionText = document.querySelector(".current-conditions-text");
  iconContainer.classList.remove("animate-sun");
  iconContainer.classList.remove("animate-cloud");
  iconContainer.classList.remove("animate-rain");
  iconContainer.classList.remove("animate-snow");
  iconContainer.classList.remove("animate-wind");
  iconContainer.classList.remove("animate-partially-cloudy");
  iconContainer.classList.remove("animate-overcast");
  iconContainer.classList.remove("animate-showers");
  iconContainer.textContent = "";
};
const displayCondition = (condition) => {
  const background = document.querySelector("body");
  const weatherContainer = document.querySelector("#content");
  const iconContainer = document.querySelector(".current-conditions-icon");
  const conditionText = document.querySelector(".current-conditions-text");
  const inputElement = document.querySelector(".input-element");
  clearPreviousWeather();

  if (condition === "Overcast" || condition === "Partially cloudy") {
    background.style.backgroundColor = `#343a40`;
    inputElement.style.backgroundColor = `#6c757d`;
    weatherContainer.style.backgroundColor = `#6c757d`;
    iconContainer.src = cloudyImage;
    iconContainer.alt = "cloudy";
    iconContainer.classList.add("animate-cloud");
    if (condition === "Partially cloudy") {
      iconContainer.src = partiallyCloudyImage;
      iconContainer.alt = "partially cloudy";
    }
  }
  if (condition === "Sunny" || condition === "Clear") {
    background.style.backgroundColor = `#89c2d9`;
    weatherContainer.style.backgroundColor = `#a9d6e5`;
    inputElement.style.backgroundColor = `#a9d6e5`;
    iconContainer.src = sunnyImage;
    iconContainer.alt = "sunny";
    iconContainer.classList.add("animate-sun");
  }
  if (condition === "Rain" || condition === "Showers") {
    background.style.backgroundColor = `#33415c`;
    weatherContainer.style.backgroundColor = `#7d8597`;
    inputElement.style.backgroundColor = `#7d8597`;
    iconContainer.src = rainImage;
    iconContainer.alt = "rain";
    iconContainer.classList.add("animate-rain");
  }
  conditionText.textContent = `${condition}`;
};
const displayTemperature = (temperature) => {
  const currentConditionsTemperature = document.querySelector(
    ".current-conditions-temperature"
  );
  currentConditionsTemperature.textContent = `${temperature}°F`;
  currentConditionsTemperature.addEventListener("click", () => {
    if (currentConditionsTemperature.textContent.includes("°F")) {
      currentConditionsTemperature.textContent = `${Math.round(
        ((temperature - 32) * 5) / 9
      )}°C`;
    } else {
      currentConditionsTemperature.textContent = `${temperature}°F`;
    }
  });
};
const displayDescription = (description) => {
  const currentConditionsDescription = document.querySelector(
    ".current-conditions-description"
  );
  currentConditionsDescription.textContent = `${description}`;
};
const DisplayHandler = (() => {
  const renderMainPage = () => {
    createMainPage();
  };
  const renderWeather = (data) => {
    displayLocation(data.location);
    displayCondition(data.currentConditions.condition);
    displayTemperature(data.currentConditions.temperature);
    displayDescription(data.description);
  };
  const renderLoadingScreen = () => {
    const weatherContainer = document.querySelector(".weather-container");
    const loadingText = createDomElement(
      weatherContainer,
      "h2",
      "loading-text",
      "Loading..."
    );
    loadingText.textContent = "Loading...";
  };
  const removeLoadingScreen = () => {
    const loadingText = document.querySelector(".loading-text");
    if (loadingText) {
      loadingText.remove();
    }
  };
  return {
    renderMainPage,
    renderWeather,
    renderLoadingScreen,
    removeLoadingScreen,
  };
})();
export default DisplayHandler;
