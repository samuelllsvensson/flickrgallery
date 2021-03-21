window.onload = () => {
  // Make sure DOMContentLoaded event is triggered before assigning click listener
  document.addEventListener("DOMContentLoaded", () => {
    document
      .querySelector(".submit-search")
      .addEventListener("click", () => {}, false);
  });
};

const validateForm = () => {
  const search = document.getElementById("search-val");
  let error = document.getElementById("error-feedback");
  const noResults = document.getElementById("results");
  const container = document.getElementById("gallery");

  // TODO: Clean up existing images in a better way
  if (container.children.length > 0) {
    container.innerHTML = "";
  }
  const resultsCount = parseInt(
    noResults.options[noResults.selectedIndex].value
  );

  if (search.value == "") {
    error.innerHTML = "Search field cannot be empty.";
    return false;
  } else {
    var isRadiusSearch = document.getElementById("radius-search").checked;
    getImages(search.value, resultsCount, isRadiusSearch);
  }
};

const getImages = (searchVal, resultsCount, isRadiusSearch) => {
  showSpinner();
  fetch(
    `/gallery/?search=${searchVal}&per_page=${resultsCount}&radiusSearch=${isRadiusSearch}`
  )
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      const images = data.photos.photo;
      addImages(images);
      hideSpinner();
    })
    .catch(function (err) {
      console.warn("Something went wrong when fetching images:", err);
      hideSpinner();
    });
};

const addImages = (images) => {
  const container = document.getElementById("gallery");
  const search = document.getElementById("search-val");
  let feedback = document.getElementById("gallery-feedback");
  let error = document.getElementById("error-feedback");

  if (images.length === 0) {
    feedback.innerHTML = `No images related to "${search.value}" could be found on Flickr, please try again.`;
  } else {
    feedback.innerHTML = "";
    error.innerHTML = "";

    return images.map(function (image) {
      let imageURL = new URL(
        `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_w.jpg`
      );
      let img = new Image();
      img.src = imageURL;
      let tile = document.createElement("div");
      tile.classList.add("cell");
      append(container, tile);
      append(tile, img);
    });
  }
};

const loader = document.getElementById("loading");

const showSpinner = () => {
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 5000);
};

const hideSpinner = () => {
  loader.classList.remove("display");
};

const append = (parent, el) => {
  return parent.appendChild(el);
};
