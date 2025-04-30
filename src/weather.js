import DisplayHandler from "./display";

const WeatherManager = (() => {
  const convertCityNameToUrlForm = (city) => {
    const cityName = city.replace(" ", "%20").replace(",", "%2C");
    return cityName;
  };
  const organizeWeatherData = (data) => {
    const organizedData = {
      currentConditions: {
        temperature: data.currentConditions.temp,
        condition: data.currentConditions.conditions,
        icon: data.currentConditions.icon,
        precip: data.currentConditions.precip,
        snow: data.currentConditions.snow,
        sunrise: data.currentConditions.sunrise,
        sunset: data.currentConditions.sunset,
        uvindex: data.currentConditions.uvindex,
      },
      description: data.description,
      location: data.resolvedAddress,
    };
    return organizedData;
  };
  const getWeatherData = async (city) => {
    const API_KEY = "GP39W3JAU68PNB484QEFBA2F8";
    const convertedCityName = convertCityNameToUrlForm(city);
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${convertedCityName}?unitGroup=us&key=${API_KEY}&contentType=json`;
    DisplayHandler.renderLoadingScreen();
    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const displayData = organizeWeatherData(data);
      return displayData;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    } finally {
      DisplayHandler.removeLoadingScreen();
    }
  };

  const createWeatherData = async (location) => {
    const weatherData = await getWeatherData(location);
    return weatherData;
  };
  const displayWeatherData = async (location) => {
    const data = await createWeatherData(location);
    DisplayHandler.renderWeather(data);
  };

  return {
    displayWeatherData,
  };
})();
export { WeatherManager };
