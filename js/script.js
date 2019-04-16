!(function (d) {
  let itemClassName = "carousel__photo",
    items = null,
    totalItems = 0,
    slide = 0,
    moving = false,
    transformTime = 500;

  // Set classes
  function setInitialClasses() {
    items = d.querySelectorAll(`.${itemClassName}`);
    totalItems = items.length;
    slide = 0;
    if (totalItems === 0) {
      return false;
    } else if (totalItems === 1) {
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
    let input = d.querySelector('#inputCarousel');
    input.removeEventListener('keyup', generateBanners); // Remove event listener
    input.addEventListener('keyup', generateBanners);

    let next = d.querySelector('.carousel__button--next'),
      prev = d.querySelector('.carousel__button--prev');
    next.removeEventListener('click', moveNext); // Remove event listener
    prev.removeEventListener('click', movePrev); // Remove event listener
    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);

    if (totalItems === 2) {
      next.removeEventListener('mouseover', hoverNext); // Remove event listener
      prev.removeEventListener('mouseover', hoverPrev); // Remove event listener
      next.addEventListener('mouseover', hoverNext);
      prev.addEventListener('mouseover', hoverPrev);
    }
  }

  // Next navigation handler
  function moveNext() {
    if (!moving && totalItems > 0) {
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
    if (!moving && totalItems > 0) {
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

  function generateBanners() {
    let num = d.querySelector('#inputCarousel').value === "" ? 5 : d.querySelector('#inputCarousel').value,
      carouselElem = d.querySelector('.carousel');
    html = '';
    for (let i = 0; i < num; i++) {
      html += `<img class="carousel__photo ${i === 0 ? 'initial' : ''}" src="https://source.unsplash.com/random/1500x500?v=${i + 1}"></img>`;
    }
    html += `
      <div class="carousel__button--next"></div>
      <div class="carousel__button--prev"></div>
    `;

    carouselElem.innerHTML = html;
    initCarousel();
  }

  function initCarousel() {
    setInitialClasses();
    setEventListeners();
  }

  initCarousel();
}(document));

