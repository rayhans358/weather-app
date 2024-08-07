"use strict";

import { updateWeather, error404 } from "./app.js";

const defaultLocation = "#/weather?lat=-0.0226903&lon=109.3447488";

const currentLocation = function () {
  window.navigator.geolocation.getCurrentPosition(
    (res) => {
      const { latitude, longitude } = res.coords;
      updateWeather(`lat=${latitude}`, `lon=${longitude}`);
    },
    (err) => {
      console.error("Error fetch data currentLocation:", err);
      window.location.hash = defaultLocation;
    }
  );
};

/**
 *@param {string} query Searched query
 */
const searchedLocation = (query) => updateWeather(...query.split("&"));

// updateWeather(lat=-0.0226903, lon=109.3447488)
// lat: -0.0226903, lon: 109.3447488

const routes = new Map([
  [["/current-location", currentLocation]],
  ["/weather", searchedLocation],
]);

const checkHash = function () {
  const requestURL = window.location.hash.slice(1);
  const [route, query] = requestURL.includes
    ? requestURL.split("?")
    : [requestURL];
  const routeFunction = routes.get(route);

  if (routeFunction) {
    routeFunction(query);
  } else {
    error404();
  }
};

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function () {
  if (!window.location.hash) {
    window.location.hash = "#/weather?lat=-0.0226903&lon=109.3447488";
  } else {
    checkHash();
  }
});
