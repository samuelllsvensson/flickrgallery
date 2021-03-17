import axios from "axios";
import { DEFAULT_PARAMS } from "./constants.js";

export async function makeAPICall(query, resultsCount) {
  let URL = `${DEFAULT_PARAMS.API_url}?method=${DEFAULT_PARAMS.API_method}`;
  console.log("Making API Call to: " + URL);
  console.log("With: " + JSON.stringify(prepareOptions(query, resultsCount)));
  return await axios.get(URL, {
    params: prepareOptions(query, resultsCount),
  });
}

// Utility
const prepareOptions = (query = "error", resultsCount = 10) => {
  return {
    api_key: DEFAULT_PARAMS.api_key,
    text: query,
    per_page: resultsCount,
    media: "photos",
    extras: "o_dims, url_m",
    format: DEFAULT_PARAMS.format,
    nojsoncallback: 1,
  };
};
