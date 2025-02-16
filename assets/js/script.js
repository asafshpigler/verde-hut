'use strict';

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

/**
 * HEADER & BACK TOP BTN
 */
const header = document.querySelector("[data-header]");

let lastScrollPos = 0;

// const hideHeader = function () {
//   const isScrollBottom = lastScrollPos < window.scrollY;
//   if (isScrollBottom) {
//     header.classList.add("hide");
//   } else {
//     header.classList.remove("hide");
//   }

//   lastScrollPos = window.scrollY;
// }

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("light-mode");
    // hideHeader();
  } else {
    header.classList.remove("light-mode");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

/**
 * ROTATING CAKES
 */
const cakes = document.querySelectorAll('.cake');
let RADIUS = window.innerWidth < 768 ? 150 : 350; // Smaller radius for mobile
let rotationAngle = 0;
let lastTime = performance.now();
const ROTATION_SPEED = 10; // Degrees per second - adjust this to change speed

// Update radius when window is resized
window.addEventListener('resize', () => {
  RADIUS = window.innerWidth < 768 ? 150 : 350;
});

function rotateCakes(currentTime) {
  // Calculate time elapsed since last frame in seconds
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  // Update rotation angle based on time elapsed
  rotationAngle = (rotationAngle + ROTATION_SPEED * deltaTime) % 360;

  cakes.forEach(cake => {
    const baseAngle = parseInt(cake.dataset.angle);
    const currentAngle = (baseAngle + rotationAngle) * (Math.PI / 180); // Convert to radians
    
    // Calculate x and y positions on the circle
    const x = RADIUS * Math.cos(currentAngle);
    const y = RADIUS * Math.sin(currentAngle);
    
    // Apply the transform
    cake.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  });

  requestAnimationFrame(rotateCakes);
}

requestAnimationFrame(rotateCakes);

// // Modify the existing parallax effect to work with the rotating cakes
// window.addEventListener("mousemove", function (event) {
//   x = (event.clientX / window.innerWidth * 10) - 5;
//   y = (event.clientY / window.innerHeight * 10) - 5;

//   // reverse the number eg. 20 -> -20, -5 -> 5
//   x = x - (x * 2);
//   y = y - (y * 2);

//   for (let i = 0, len = parallaxItems.length; i < len; i++) {
//     const item = parallaxItems[i];
//     if (item.classList.contains('cake')) {
//       // Skip cakes as they're handled by the rotation animation
//       continue;
//     }
//     const parallaxX = x * Number(item.dataset.parallaxSpeed);
//     const parallaxY = y * Number(item.dataset.parallaxSpeed);
//     item.style.transform = `translate3d(${parallaxX}px, ${parallaxY}px, 0px)`;
//   }
// });
