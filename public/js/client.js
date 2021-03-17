window.onload = () => {
  // Make sure DOMContentLoaded event is triggered before assigning click listener
  document.addEventListener("DOMContentLoaded", () => {
    document
      .querySelector(".submitSearch")
      .addEventListener("click", () => {}, false);
    // window.addEventListener("scroll", trottleHandler);
  });
  // handleLoad = () => {
  //   if (
  //     window.innerHeight + window.scrollY >=
  //     document.body.offsetHeight - pixel_offset
  //   ) {
  //     page = page + 1;
  //     if (page <= last_page) {
  //       window.removeEventListener("scroll", trottleHandler);
  //       getData(page).then((res) => {
  //         window.addEventListener("scroll", trottleHandler);
  //       });
  //     }
  //   }
  // };
};
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("/sw.js");
  });
}

const validateForm = () => {
  var search = document.getElementById("searchVal");
  var error = document.getElementById("errortext");
  var noResults = document.getElementById("no-results");
  var resultsCount = parseInt(noResults.options[noResults.selectedIndex].value);

  if (search.value == "") {
    error.innerHTML = "Search field cannot be empty";
    return false;
  } else {
    // caches.open("FlickrCache").then((cache) => {
    //   // search.value = encodeURIComponent(search.value.trim());
    //   console.log(
    //     "Trying to match: " + `/home/${search.value}/${resultsCount}`
    //   );
    //   cache
    //     .match(`/home/${search.value}/${resultsCount}`)
    //     .then((res) => {
    //       //res is the Response Object
    //       console.log("Cache exists");
    //       if (!res) throw Error("No data");
    //       return res.json();
    //     })
    //     .then((res) => {
    //       // don't overwrite newer network data
    //       console.log(" don't overwrite newer network data");
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log("Cache does not exist");
    //       console.log(err);
    //     });
    // });
    getImages(search.value, resultsCount);
  }
};
const createNode = (element) => {
  return document.createElement(element);
};

const append = (parent, el) => {
  return parent.appendChild(el);
};

let handleLoad;

let trottleHandler = () => {
  throttle(handleLoad.call(this), 1000);
};

const getImages = (searchVal, resultsCount) => {
  const header = document.getElementById("header");
  const container = document.getElementById("gallery");
  showSpinner();

  fetch(`/home/${searchVal}/${resultsCount}`, {
    method: "GET",
  })
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

      // Create Images title only when images are loaded
      let title = createNode("h1");
      title.innerHTML = "Images";
      append(header, title);
      return images.map(function (image) {
        let imageURL = new URL(
          `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_w.jpg`
        );
        let img = createNode("img"); // new Image();
        img.src = imageURL;
        let tile = createNode("div");
        tile.classList.add("cell");
        append(container, tile);
        append(tile, img);
      });
    })
    .catch(function (err) {
      console.warn("Something went wrong.", err);
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

/* Resize all the grid items on the load and resize events */
// var masonryEvents = ["load", "resize"];
// masonryEvents.forEach(function (event) {
//   window.addEventListener(event, resizeAllMasonryItems);
// });
