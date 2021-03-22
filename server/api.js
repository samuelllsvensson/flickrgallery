import axios from "axios";
import { DEFAULT_PARAMS } from "./constants.js";

// Async function which performs GET request with Axios to Flickr API
export async function makeAPICall(data) {
  let URL = `${DEFAULT_PARAMS.API_url}?method=${DEFAULT_PARAMS.API_method}`;
  return await axios.get(URL, {
    params: prepareOptions(data.text, data.resultsCount, data.isRadiusSearch),
  });
}

// Utility function which returns object literal depending on isRadiusSearch
const prepareOptions = (
  text = "",
  resultsCount = 10,
  isRadiusSearch = false
) => {
  const options = {
    api_key: DEFAULT_PARAMS.api_key,
    text: text,
    per_page: resultsCount,
    media: DEFAULT_PARAMS.media,
    extras: "original_format",
    format: DEFAULT_PARAMS.format,
    nojsoncallback: DEFAULT_PARAMS.jsonCallback,
  };
  const geoOptions = {
    has_geo: 1,
    lat: 59.32537412128745,
    lon: 18.06989121620471,
    radius_units: 25,
  };
  if (isRadiusSearch) {
    return { ...options, ...geoOptions };
  } else {
    return { ...options };
  }
};
