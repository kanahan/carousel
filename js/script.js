!(function (d) {
  let itemClassName = "carousel__photo",
    items = d.querySelectorAll(`.${itemClassName}`),
    totalItems = items.length,
    slide = 0,
    moving = false,
    transformTime = 500;

  // Set classes
  function setInitialClasses() {
    if (totalItems === 1) {
      document.querySelector(".carousel__button--prev").style.display = 'none';
      document.querySelector(".carousel__button--next").style.display = 'none';
    } else {
      items[totalItems - 1].classList.add("prev");
      items[0].classList.add("active");
      items[1].classList.add("next");
    }
  }

  // Set event listeners
  function setEventListeners() {
    let next = d.querySelector('.carousel__button--next'),
      prev = d.querySelector('.carousel__button--prev');
    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);

    if (totalItems === 2) {
      next.addEventListener('mouseover', hoverNext);
      prev.addEventListener('mouseover', hoverPrev);
    }
  }

  // Next navigation handler
  function moveNext() {
    if (!moving) {
      // If it's the last slide, reset to 0, else +1
      if (slide === (totalItems - 1)) {
        slide = 0;
      } else {
        slide++;
      }
      // Move carousel to updated slide
      moveCarouselTo(slide, true);
    }
  }

  // Previous navigation handler
  function movePrev() {
    if (!moving) {
      // If it's the first slide, set as the last slide, else -1
      if (slide === 0) {
        slide = (totalItems - 1);
      } else {
        slide--;
      }

      // Move carousel to updated slide
      moveCarouselTo(slide, false);
    }
  }


  function hoverNext() {
    let prev = slide === 0 ? 1 : 0;
    console.log(prev);
    items[prev].className = itemClassName + " hide_next";
  }


  function hoverPrev() {
    let prev = slide === 0 ? 1 : 0;
    items[prev].className = itemClassName + " hide_prev";
  }

  function disableInteraction() {
    moving = true;
    // setTimeout runs its function once after the given time
    setTimeout(function () {
      moving = false
    }, transformTime);
  }

  function moveCarouselTo(slide, moveToNext) {
    // temporarily disable interactivity
    disableInteraction();
    // Update the "old" adjacent slides with "new" ones
    let newPrevious = slide - 1,
      newNext = slide + 1;

    if (newPrevious < 0) {
      newPrevious = totalItems - 1;
    }
    if (newNext > totalItems - 1) {
      newNext = 0;
    }
    if (slide > totalItems - 1) {
      slide = 0;
    }

    console.log(newPrevious, slide, newNext)

    // Reset elements to default classes
    Array.prototype.slice.call(items).map((x) => {
      x.className = itemClassName;
    })


    if (totalItems === 2) {
      items[newPrevious].className = itemClassName + (moveToNext ? " prev" : " next");
      items[slide].className = itemClassName + " active";
      setTimeout(() => {
        items[newPrevious].className = itemClassName + (moveToNext ? " hide_next" : " hide_prev");
      }, transformTime);
    } else {
      // Add new classes
      items[newPrevious].className = itemClassName + " prev";
      items[slide].className = itemClassName + " active";
      items[newNext].className = itemClassName + " next";
    }
  }

  function initCarousel() {
    setInitialClasses();
    setEventListeners();
  }

  initCarousel();
}(document));

