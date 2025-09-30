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

document.addEventListener("DOMContentLoaded", () => {
  const images = [
    {
      src: "/assets/images/scenes/anisnap-boy-holding-a-book.jpg",
      alt: "Anime 1",
      caption: "Sky Dream",
    },
    {
      src: "/assets/images/seasonal/anisnap-ocean-waves-sundress.jpg",
      alt: "Anime 2",
      caption: "Night Train",
    },
    {
      src: "/assets/images/scenes/anisnap-girl-silver-hair.jpg",
      alt: "Anime 3",
      caption: "Library Silence",
    },
    {
      src: "/assets/images/scenes/anisnap-train-at-night.jpg",
      alt: "Anime 4",
      caption: "Streetlight Rain",
    },
    {
      src: "/assets/images/wallpaper/anisnap-waterfalls-pouring-into-the-clouds.jpg",
      alt: "Anime 5",
      caption: "Mountain Spirit",
    },
    {
      src: "/assets/images/scenes/anisnap-reflections-on-window.jpg",
      alt: "Anime 6",
      caption: "Blossom Wind",
    },
    {
      src: "https://via.placeholder.com/400x300?text=10",
      alt: "Anime 7",
      caption: "Whispered Forest",
    },
    {
      src: "https://via.placeholder.com/400x300?text=10",
      alt: "Anime 8",
      caption: "Sakura Lane",
    },
    {
      src: "/assets/images/scenes/anisnap-girl-hair-and-headphones.jpg",
      alt: "Anime 9",
      caption: "City Window",
    },
  ];

  const perPage = 6;
  let currentPage = 1;

  const grid = document.getElementById("paginated-image-grid");
  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");
  const pageIndicator = document.getElementById("pageIndicator");

  function renderPage() {
    // Clear
    grid.innerHTML = "";

    // Calculate slice
    const start = (currentPage - 1) * perPage;
    const pageImages = images.slice(start, start + perPage);

    // Create image cards
    pageImages.forEach((img) => {
      const card = document.createElement("div");
      card.classList.add("image-card");
      card.dataset.caption = img.caption;

      card.innerHTML = `
        <img src="${img.src}" alt="${img.alt}" class="preview-img" />
        <div class="overlay">
          <a href="${img.src}" download class="download-btn">Download</a>
        </div>
      `;

      grid.appendChild(card);
    });

    pageIndicator.textContent = `Page ${currentPage}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage * perPage >= images.length;

    // Re-bind zoom modal functionality
    bindZoomEvents();
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage * perPage < images.length) {
      currentPage++;
      renderPage();
    }
  });

  renderPage();
});

//make the website responsive for all devices
document.addEventListener("DOMContentLoaded", function () {
  const menuDiv = document.querySelector(".menu-div");
  const navList = document.querySelector(".head-list");

  menuDiv.addEventListener("click", () => {
    navList.classList.toggle("active");
  });

  // Optional: dropdown click toggle on mobile
  document.querySelectorAll(".list > a").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 900) {
        const parentLi = link.parentElement;

        // If it has a dropdown
        if (parentLi.querySelector(".drop-head-list")) {
          e.preventDefault(); // prevent link navigation
          parentLi.classList.toggle("active");
        }
      }
    });
  });
});

//prevent right clicking an image for coping it.
document.addEventListener("contextmenu", function (e) {
  if (e.target.tagName === "IMG") {
    e.preventDefault();
  }
});
