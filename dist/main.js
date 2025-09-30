// ========== Slideshow ==========
const imageElement = document.getElementById("slideshow_image");

if (imageElement) {
  const images = ["./assets/images/image-2.png", "./assets/images/image-1.png"];
  let imageIndex = 0;
  let intervalId;

  function showImages() {
    imageElement.classList.add("fade-out");

    setTimeout(() => {
      imageIndex = (imageIndex + 1) % images.length;
      imageElement.src = images[imageIndex];
      imageElement.classList.remove("fade-out");
    }, 500);
  }

  function startSlideshow() {
    intervalId = setInterval(showImages, 4000);
  }

  function stopSlideshow() {
    clearInterval(intervalId);
  }

  window.addEventListener("load", () => {
    startSlideshow();

    imageElement.addEventListener("mouseenter", stopSlideshow);
    imageElement.addEventListener("mouseleave", startSlideshow);
  });
}

// ========== Contact Form ==========
const form = document.getElementById("contact-form");
const message = document.getElementById("form-message");
const spinner = document.getElementById("spinner");

if (form && message && spinner) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    spinner.style.display = "block";
    message.textContent = "";

    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/kgmokgobi@gmail.com",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );

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
}

// ========== Image Zoom Modal ==========
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".image-modal");
  const modalImg = document.querySelector(".modal-content-img");
  const captionText = document.querySelector(".modal-caption");
  const closeModal = document.querySelector(".close-modal");

  if (!modal || !modalImg || !captionText || !closeModal) return;

  // Open modal on image card click
  document.querySelectorAll(".image-card").forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector(".preview-img");
      if (!img) return;

      const caption = card.dataset.caption || img.alt || "";
      modalImg.src = img.src;
      captionText.textContent = caption;

      modal.classList.add("active");
    });
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // Prevent modal from opening on download click
  document.querySelectorAll(".download-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });
});

//prevent right clicking an image for coping it.
document.addEventListener("contextmenu", function (e) {
  if (e.target.tagName === "IMG") {
    e.preventDefault();
  }
});
