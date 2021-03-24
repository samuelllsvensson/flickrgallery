"use strict";
/* prepareImages constructs a div "cell" with an <img> element containing the source URL of the image.
  It also creates the modal and handles potential feedback from the server 
  (f.e if no images could be found for a specific search). */
export const prepareImages = (data) => {
  const container = document.getElementById("gallery");

  return data.map(function (srcImg) {
    let tile = document.createElement("div");
    tile.classList.add("cell");
    container.appendChild(tile);

    const modal = addModalElement();
    const imageElement = addImageElement(srcImg, modal);
    tile.appendChild(imageElement);
    tile.appendChild(modal);
  });
};

// Creates a modal element with content, caption and a close button.
const addModalElement = () => {
  let modal = document.createElement("div");
  modal.classList.add("modal");

  let modalCloseButton = document.createElement("span");
  modalCloseButton.classList.add("close");
  modalCloseButton.innerHTML = "&times;";
  modalCloseButton.onclick = () => {
    modal.style.display = "none";
  };

  let modalImg = new Image();
  modalImg.classList.add("modal-content");

  let modalCaption = document.createElement("div");
  modalCaption.id = "caption";

  modal.appendChild(modalCloseButton);
  modal.appendChild(modalImg);
  modal.appendChild(modalCaption);

  return modal;
};

// Creates the thumbnail image element and connects the modal image to the full size image.
const addImageElement = (image, modal) => {
  // URL to original full size image
  let imageURL = new URL(
    `https://live.staticflickr.com/${image.server}/${image.id}_${image.originalsecret}_o.${image.originalformat}`
  );
  // URL to small image with max width of 400px
  let thumbnailURL = new URL(
    `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}_w.jpg`
  );
  let img = new Image();
  img.src = thumbnailURL;
  img.alt = image.title;

  // Fallback to thumbnail URL if we don't have permission to view original image
  let permittedURL;
  if (typeof image.originalsecret === "undefined") {
    permittedURL = thumbnailURL;
  } else {
    permittedURL = imageURL;
  }

  img.onclick = () => {
    modal.style.display = "block";
    modal.children[1].src = permittedURL;
    modal.children[1].alt = image.title;
    modal.children[2].innerHTML = image.title;
  };

  return img;
};
