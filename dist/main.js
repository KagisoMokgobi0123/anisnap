const images = ["./assets/images/image-2.png", "./assets/images/image-1.png"];

let imageIndex = 0;
const imageElement = document.getElementById("slideshow-image");
let intervalId;

function showImages() {
  // Add fade-out class
  imageElement.classList.add("fade-out");

  // Wait for fade-out, then switch image
  setTimeout(() => {
    imageIndex = (imageIndex + 1) % images.length;
    imageElement.src = images[imageIndex];
    imageElement.classList.remove("fade-out");
  }, 500); // Half of the transition time
}

function startSlideshow() {
  intervalId = setInterval(showImages, 4000); // 4s per slide
}

function stopSlideshow() {
  clearInterval(intervalId);
}

// Start everything on page load
window.addEventListener("load", () => {
  startSlideshow();

  // Pause on hover
  imageElement.addEventListener("mouseenter", stopSlideshow);
  imageElement.addEventListener("mouseleave", startSlideshow);
});
