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

// Contact

const form = document.getElementById("contact-form");
const message = document.getElementById("form-message");
const spinner = document.getElementById("spinner");

form.addEventListener("submit", async function (e) {
  e.preventDefault(); // Stop form reload

  const formData = new FormData(form);

  // Show spinner and clear previous message
  spinner.style.display = "block";
  message.textContent = "";

  try {
    const res = await fetch("https://formsubmit.co/ajax/kgmokgobi@gmail.com", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    const result = await res.json();
    spinner.style.display = "none";

    if (res.ok) {
      message.textContent = "✅ Message sent successfully!";
      message.style.color = "green";
      form.reset();
    } else {
      message.textContent = "❌ Failed to send. Try again later.";
      message.style.color = "red";
    }
  } catch (error) {
    spinner.style.display = "none";
    message.textContent = "⚠️ Network error. Please try again.";
    message.style.color = "orange";
  }
});
