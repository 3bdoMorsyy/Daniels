window.onload = function () {
  let loader = document.getElementById("loader-bg");
  loader.classList.add("fade-out");
  setTimeout(() => {
    loader.style.display = "none";
    document.getElementById("content").style.display = "block";
    document.getElementById("content").style.width = "100%";
  }, 2000); // Matches the transition duration
};

const texts = ["Developer", "Designer", "Larry Daniels"];
let i = 0;
const animatedText = document.querySelector("h1 span");
animatedText.textContent = texts[2];

function changeText() {
  animatedText.textContent = texts[i];
  i = (i + 1) % texts.length;
}

setInterval(changeText, 4000); // Adjust the timing to allow for smooth text transition

window.onscroll = function (e) {
  if (document.getElementById("about").offsetTop <= scrollY) {
    document.querySelector(".navbar").classList.add("fixed-top");
    document.querySelector(".navbar").classList.remove("position-absolute");
    document.querySelector(".navbar").classList.add("bg-white");
    document.querySelector(".navbar").classList.add("box-shadow");
    document.documentElement.style.setProperty("--nav-text-color", "black");
    document.querySelector(".navbar .container").classList.add("py-1");
    document.querySelector(".navbar .container").classList.remove("py-3");
  } else {
    document.querySelector(".navbar").classList.remove("fixed-top");
    document.querySelector(".navbar").classList.add("position-absolute");
    document.querySelector(".navbar").classList.remove("bg-white");
    document.querySelector(".navbar").classList.remove("box-shadow");
    document.documentElement.style.setProperty("--nav-text-color", "white");
    document.querySelector(".navbar .container").classList.remove("py-1");
    document.querySelector(".navbar .container").classList.add("py-3");
  }
};
// Counter

(() => {
  const counters = document.querySelectorAll(".counter-v");
  const counterArray = Array.from(counters);

  function startCounter(item) {
    // Convert text content to an integer
    let targetValue = parseInt(item.textContent, 10);
    let count = 0;
    let speed = item.dataset.speed / targetValue;

    function counterUp() {
      count += Math.ceil(targetValue / 750); // Increase by a factor (e.g., 1% of targetValue)
      if (count >= targetValue) {
        count = targetValue; // Ensure it stops at the target value
        clearInterval(timer);
      }
      item.textContent = count;
    }

    const timer = setInterval(counterUp, speed);
  }

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          observer.unobserve(entry.target); // Stop observing once animation starts
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the element is visible
    }
  );

  counterArray.forEach((counter) => {
    observer.observe(counter);
  });
})();

// Progress Animation

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar");
  progressBars.forEach((bar) => {
    if (isInViewport(bar) && !bar.classList.contains("animated")) {
      bar.style.width = bar.getAttribute("data-width");
      bar.classList.add("animated");
    }
  });
}

window.addEventListener("scroll", animateProgressBars);
window.addEventListener("load", animateProgressBars); // Trigger on page load
