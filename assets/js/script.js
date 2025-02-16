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

// heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

// heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

// addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
//   clearInterval(autoSlideInterval);
// });

// addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);

/**
 * PARALLAX CAKES
 */
const cakes = document.querySelectorAll('.cake');

window.addEventListener('scroll', () => {
  requestAnimationFrame(parallaxEffect);
});

function parallaxEffect() {
  const scrolled = window.scrollY;

  if (scrolled >= 100) {
    header.classList.add("light-mode");
    // hideHeader();
  } else {
    header.classList.remove("light-mode");
  }

  cakes.forEach((cake) => {
    const speed = cake.dataset.speed || 0; // Default to 0 if not specified
    const offset = scrolled * speed;
    cake.style.transform = `translateY(${offset/10}px)`;
  });
}