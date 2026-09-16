

const sliders = (slide, dir, prev, next) => {
  const slidesArr = document.querySelectorAll(slide);
  let slideIndex = 1,
      isAnimating = false,
      intervalId;

  initSlides(slideIndex);
  setAnimation();

  function initSlides(n) {
    let height = 0;

    slidesArr.forEach(slide => {
      height = Math.max(height, slide.offsetHeight);
      slide.classList.add('animated');
      slide.style.display = 'none';
      slide.style.position = 'absolute';
    }); 

    slidesArr[0].parentNode.style.minHeight = height + 'px';
    slidesArr[n - 1].style.display = 'block';
  }

  function makeBigFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1)
  }

  function showSlides(from, to) {

    if (isAnimating) return;

    isAnimating = true;

    const currentSlide = slidesArr[slideIndex - 1];

    if (from === 'right' || from === 'up') {
      slideIndex++;

      if (slideIndex > slidesArr.length) {
        slideIndex = 1; 
      }
    }

    if (from === 'left' || from === 'down') {
      slideIndex--;

      if (slideIndex < 1) {
        slideIndex = slidesArr.length;
      }
    }

    const nextSlide = slidesArr[slideIndex - 1];

    nextSlide.classList.remove(`slideOut${makeBigFirstLetter(from)}`, `slideOut${makeBigFirstLetter(to)}`, `slideIn${makeBigFirstLetter(to)}`);
    currentSlide.classList.add(`slideOut${makeBigFirstLetter(to)}`);
    nextSlide.classList.add(`slideIn${makeBigFirstLetter(from)}`);
    nextSlide.style.display = 'block';
  
    currentSlide.addEventListener('animationend', () => isAnimating = false, {once: true});
  }

  try {
    const prevBtn = document.querySelector(prev),
          nextBtn = document.querySelector(next);


    prevBtn.addEventListener("click", () => {
      showSlides('left', 'right');
    });

    nextBtn.addEventListener("click", () => {
      showSlides('right', 'left');
    });

  } catch(e) {}

  function setAnimation() {
    if (dir === 'vertical') {
      intervalId = setInterval(() => {
        showSlides('up', 'up');
      }, 3000);
    } else {
      intervalId = setInterval(() => {
        showSlides('right', 'left');
      }, 3000);
    }
  }

  slidesArr[0].parentNode.addEventListener("mouseenter", () => {
    clearInterval(intervalId);
  });

  slidesArr[0].parentNode.addEventListener("mouseleave", () => {
    setAnimation();
  });
}

export default sliders;