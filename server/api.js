import axios from "axios";
import { DEFAULT_PARAMS } from "./constants.js";

export async function makeAPICall(data) {
  let URL = `${DEFAULT_PARAMS.API_url}?method=${DEFAULT_PARAMS.API_method}`;
  console.log(
    "API options: " +
      JSON.stringify(prepareOptions(data.text, data.resultsCount))
  );
  return await axios.get(URL, {
    params: data.isRadiusSearch
      ? prepareRadiusOptions(data.text, data.resultsCount)
      : prepareOptions(data.text, data.resultsCount),
  });
}

// Utility
const prepareOptions = (text = "error", resultsCount = 10) => {
  return {
    api_key: DEFAULT_PARAMS.api_key,
    text: text,
    per_page: resultsCount,
    media: "photos",
    extras: "o_dims, url_m",
    format: DEFAULT_PARAMS.format,
    nojsoncallback: 1,
  };
};

const prepareRadiusOptions = (text = "error", resultsCount = 10) => {
  return {
    api_key: DEFAULT_PARAMS.api_key,
    text: text,
    per_page: resultsCount,
    media: "photos",
    has_geo: 1,
    lat: 59.32537412128745,
    lon: 18.06989121620471,
    radius_units: 25,
    extras: "o_dims, url_m",
    format: DEFAULT_PARAMS.format,
    nojsoncallback: 1,
  };
};
