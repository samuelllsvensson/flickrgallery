"use strict";
import { prepareImages } from "./utility.js";

window.onload = () => {
  /* I have to (sadly) expose the form submission function to the HTML as a global because webpack 
     doesn't make it globally available by default and the bundled code is in a different scope.*/
  window.validateForm = validateForm;
  // Make sure DOMContentLoaded event is triggered before assigning click listener
  document.addEventListener("DOMContentLoaded", () => {
    document
      .getElementById("submit-search")
      .addEventListener("click", validateForm);
  });
};

/* validateForm is called when the search is submitted. 
  It removes existing images (if there are any from previous queries) and checks if the user anything. 
  If the search is valid, it sends all necessary form data to getImages(). */
const validateForm = () => {
  const search = document.getElementById("search-val");
  let error = document.getElementById("error-feedback");
  const noResults = document.getElementById("results");
  const container = document.getElementById("gallery");

  // Remove existing cells containing images
  if (container.children.length > 0) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  if (search.value === "") {
    error.innerHTML = "Search field cannot be empty.";
    return false;
  } else {
    const isRadiusSearch = document.getElementById("radius-search").checked;
    // Get amount of results chosen as integer
    const resultsCount = parseInt(
      noResults.options[noResults.selectedIndex].value
    );
    getImages(search.value, resultsCount, isRadiusSearch);
  }
};

/* getImages performs the actual API call to the server with the given form data.
  If the request was successful, we call addImages with the data.
  The function also handles the loading feedback. */
const getImages = (searchVal, resultsCount, isRadiusSearch) => {
  const loader = document.getElementById("loading");
  loader.classList.add("display");

  fetch(
    `/gallery/?search=${searchVal}&per_page=${resultsCount}&radiusSearch=${isRadiusSearch}`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then((data) => {
      const images = data.photos.photo;
      addImages(images);
      loader.classList.remove("display");
    })
    .catch((err) => {
      console.warn("Something went wrong when fetching images:", err);
      loader.classList.remove("display");
    });
};

/* addImages is a helper function which returns the first feedback given the response from the server.
  It then delegates the data to the utility function prepareImages. */
const addImages = (images) => {
  const search = document.getElementById("search-val");
  let feedback = document.getElementById("gallery-feedback");
  let error = document.getElementById("error-feedback");
  const noResults = document.getElementById("results");
  const resultsVal = noResults.options[noResults.selectedIndex].value;

  if (images.length === 0) {
    feedback.innerHTML = `No images related to "${search.value}" could be found on Flickr, please try again.`;
  } else {
    if (images.length < resultsVal) {
      feedback.innerHTML = `Only found ${images.length} images for "${search.value}" even though you requested ${resultsVal} results. Try doing a more general search!`;
    } else {
      feedback.innerHTML = "";
    }
    error.innerHTML = "";
    return prepareImages(images);
  }
};
