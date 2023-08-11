let index = 0;
const slides = document.querySelectorAll(".carousel-slider img");
const totalSlides = slides.length;
const navDots = document.querySelector(".carousel-nav");

// Add navigation dots
for (let i = 0; i < totalSlides; i++) {
  let dot = document.createElement("span");
  dot.addEventListener("click", () => moveToSlide(i));
  navDots.appendChild(dot);
}

function updateCarousel() {
  const offset = -index * 500;
  document.querySelector(
    ".carousel-slider"
  ).style.transform = `translateX(${offset}%)`;

  // Update navigation dots
  let dots = document.querySelectorAll(".carousel-nav span");
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

function moveToSlide(slideIndex) {
  index = slideIndex;
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;
  updateCarousel();
}

document
  .getElementById("prevBtn")
  .addEventListener("click", () => moveToSlide(index - 1));
document
  .getElementById("nextBtn")
  .addEventListener("click", () => moveToSlide(index + 1));

// Automatic slide every 5 seconds
setInterval(() => moveToSlide(index + 1), 5000);

// Initial setup
updateCarousel();
