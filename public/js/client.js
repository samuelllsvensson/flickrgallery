// Make sure DOMContentLoaded event is triggered before assigning click listener
window.onload = () => {
  document.addEventListener("DOMContentLoaded", () => {
    document
      .querySelector(".submitSearch")
      .addEventListener("click", () => {}, false);
  });
};

// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js");
  });
}

const validateForm = () => {
  var search = document.getElementById("searchVal");
  var error = document.getElementById("errortext");
  var noResults = document.getElementById("no-results");
  var container = document.getElementById("gallery");

  // TODO: Clean up existing images in a better way
  if (container.children.length > 0) {
    container.innerHTML = "";
  }
  var resultsCount = parseInt(noResults.options[noResults.selectedIndex].value);

  if (search.value == "") {
    error.innerHTML = "Search field cannot be empty";
    return false;
  } else {
    getImages(search.value, resultsCount);
  }
};
const createNode = (element) => {
  return document.createElement(element);
};

const append = (parent, el) => {
  return parent.appendChild(el);
};

const getImages = (searchVal, resultsCount) => {
  const container = document.getElementById("gallery");
  showSpinner();

  fetch(`/home/${searchVal}/${resultsCount}`)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      //console.log(data.photos.photo);
      let images = data.photos.photo;
      hideSpinner();

      return images.map(function (image) {
        let imageURL = new URL(
          `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_w.jpg`
        );
        let img = new Image();
        img.src = imageURL;
        let tile = createNode("div");
        tile.classList.add("cell");
        append(container, tile);
        append(tile, img);
      });
    })
    .catch(function (err) {
      console.warn("Something went wrong when fetching images:", err);
      hideSpinner();
    });
};

const loader = document.querySelector("#loading");

function showSpinner() {
  loader.classList.add("display");
  // to stop loading after some time
  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
}

function hideSpinner() {
  loader.classList.remove("display");
}
