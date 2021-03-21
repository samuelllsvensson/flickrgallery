const FLICKR_API_URL = "https://api.flickr.com/services/rest/";
const FLICKR_API_METHOD = "flickr.photos.search";
const FLICKR_CONSUMER_KEY = "8f5d31429770a0ad19c498d286c467bd";
const DEFAULT_FORMAT = "json";
export const DEFAULT_PARAMS = {
  api_key: FLICKR_CONSUMER_KEY,
  API_url: FLICKR_API_URL,
  API_method: FLICKR_API_METHOD,
  format: DEFAULT_FORMAT,
  jsonCallback: 1,
};
