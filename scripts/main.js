// main
let prologue = document.getElementById('prologue');
let slides = document.querySelectorAll('.slide');
let leftText = document.querySelector('.serif-text.left');
let rightText = document.querySelector('.serif-text.right');
let slide3 = document.getElementById('slide3');
let slide4 = document.getElementById('slide4');
let body = document.body;

let totalSlides = slides.length;
let currentLocation = 0;
let slide3Progress = 0;
let slide3Locked = false;
let slide4Animated = false;
let slide3Hold = false;
let scrollCounter = 0;
let isTransitioning = false;
let hasSlide4Appeared = false;

const textMoveSpeed = 40;
const textReturnSpeed = 35;
const maxTextDistance = 500;

slide4.style.opacity = '0';
slide4.style.transition = 'opacity 1s ease';

// 배경 전환 함수
function updateBackground() {
  if (currentLocation >= 40) {
    body.classList.add('change-background');
    body.classList.remove('default-background');
  } else {
    body.classList.add('default-background');
    body.classList.remove('change-background');
  }
}

function handleScrollDirection(isScrollingDown) {
  if (isTransitioning) return;

  if (isScrollingDown) {
    if (currentLocation < 40 && !slide3Locked) {
      currentLocation++;
      prologue.style.left = currentLocation * -5 + '%';
    }

    // 3페이지에서 4페이지로 넘어가기
    if (currentLocation === 40) {
      slide3Hold = true;
      slide3Locked = true;

      slide3Progress += textMoveSpeed;
      leftText.style.transform = `translateX(-${80 + slide3Progress}%)`;
      rightText.style.transform = `translateX(${80 + slide3Progress}%)`;

      if (slide3Progress >= maxTextDistance) {
        slide3Locked = false;
        slide3Hold = false;

        if (!slide4Animated) {
          slide4.style.opacity = '1';
          slide4Animated = true;
          hasSlide4Appeared = true;

          setTimeout(() => {
            currentLocation = 60;
            prologue.style.left = currentLocation * -5 + '%';
          }, 1000);
        }
      }
    }
    // slide4에서 아래 스크롤은 네이티브 스크롤(footer)로 처리됨
  } else {
    // 위로 스크롤
    if (currentLocation === 60) {
      scrollCounter++;
      if (scrollCounter === 1) {
        slide4.style.opacity = '0.8';
      } else if (scrollCounter === 2) {
        slide4.style.opacity = '0.5';
      } else if (scrollCounter >= 3) {
        isTransitioning = true;
        slide4.style.opacity = '0';
        currentLocation = 40;

        setTimeout(() => {
          prologue.style.left = currentLocation * -5 + '%';
          isTransitioning = false;
          hasSlide4Appeared = false;
        }, 500);

        scrollCounter = 0;
      }
    } else if (currentLocation === 40) {
      if (!hasSlide4Appeared) {
        slide3Progress -= textReturnSpeed;
        leftText.style.transform = `translateX(-${80 + slide3Progress}%)`;
        rightText.style.transform = `translateX(${80 + slide3Progress}%)`;

        if (slide3Progress <= 0) {
          slide3Progress = 0;
          slide3Locked = false;
          slide3Hold = false;
          currentLocation = 39;
          prologue.style.left = currentLocation * -5 + '%';
        }
      } else {
        slide4.style.opacity = '0';
        hasSlide4Appeared = false;
        slide4Animated = false;
      }
    } else if (currentLocation > 0 && currentLocation < 40 && !slide3Locked) {
      currentLocation--;
      prologue.style.left = currentLocation * -5 + '%';
    }

    if (currentLocation === 0) {
      slide3Progress = 0;
      slide3Locked = false;
      slide3Hold = false;
      slide4Animated = false;
      hasSlide4Appeared = false;
    }
  }

  updateBackground();
}

// ── footer 노출 (네이티브 스크롤) ─────────────────────────────────────────────
// slide4(preview) 이후로는 preventDefault를 풀어 브라우저 기본 스크롤로 footer를 노출
let footerMode = false;

// ── Wheel ────────────────────────────────────────────────────────────────────
window.addEventListener('wheel', (e) => {
  const isScrollingDown = e.deltaY > 0;

  // slide4에서 아래 스크롤 → 네이티브 스크롤 모드로 전환(footer 노출)
  if (isScrollingDown && currentLocation === 60 && slide4Animated && !footerMode) {
    footerMode = true;
    return; // preventDefault 하지 않음 → 기본 스크롤 허용
  }

  if (footerMode) {
    // 최상단에서 위로 스크롤하면 슬라이드 nav로 복귀
    if (!isScrollingDown && window.scrollY <= 0) {
      footerMode = false;
      // 아래 슬라이드 nav 로직으로 이어짐
    } else {
      return; // 네이티브 스크롤 유지
    }
  }

  e.preventDefault();
  handleScrollDirection(isScrollingDown);
}, { passive: false });

// ── Touch ────────────────────────────────────────────────────────────────────
let touchStartY = 0;
let touchStartX = 0;

window.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
  touchStartX = e.touches[0].clientX;
}, { passive: true });

window.addEventListener('touchmove', (e) => {
  if (footerMode) return; // footer 구간은 네이티브 스크롤 처리
  if (e.cancelable) e.preventDefault();
}, { passive: false });

window.addEventListener('touchend', (e) => {
  const diffY = touchStartY - e.changedTouches[0].clientY;
  const diffX = touchStartX - e.changedTouches[0].clientX;

  if (Math.abs(diffY) < 40) return;
  if (Math.abs(diffX) > Math.abs(diffY)) return;

  const isDown = diffY > 0;

  // slide4에서 아래로 스와이프 → 네이티브 스크롤 모드(footer 노출)
  if (isDown && currentLocation === 60 && slide4Animated && !footerMode) {
    footerMode = true;
    return;
  }
  if (footerMode) {
    if (!isDown && window.scrollY <= 0) {
      footerMode = false; // 최상단에서 위로 스와이프 시 슬라이드 nav 복귀
    } else {
      return; // 네이티브 스크롤 유지
    }
  }

  if (currentLocation === 40) {
    handleScrollDirection(isDown);
    handleScrollDirection(isDown);
    handleScrollDirection(isDown);
  }
  handleScrollDirection(isDown);
}, { passive: true });


//slide1
const slide1From = document.querySelector('.slide-from');
const slide1To = document.querySelector('.slide-to');
const slide1ModelContainer = document.getElementById('model-container');
const slide1DragText = document.querySelector('.drag');

prologue.classList.remove('show');

const slide1ObserverOptions = {
  threshold: 0.1,
};

const slide1Observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      prologue.classList.add('show');

      setTimeout(() => slide1From.classList.add('show'), 400);
      setTimeout(() => slide1To.classList.add('show'), 1000);
      setTimeout(() => {
        const slide1Content = document.querySelectorAll('.slide1-content p');
        slide1Content.forEach(p => {
          p.classList.add('fade-in');
        });
      }, 1500);
    }
  });
}, slide1ObserverOptions);

slide1Observer.observe(prologue);

slide1ModelContainer.addEventListener('mouseenter', () => {
  slide1DragText.classList.remove('hidden');
});

slide1ModelContainer.addEventListener('mouseleave', () => {
  slide1DragText.classList.add('hidden');
});

// slide1 drag
const modelContainer = document.getElementById('model-container');
const dragText = document.querySelector('.drag');

modelContainer.addEventListener('mouseenter', () => {
  dragText.classList.remove('hidden');
});

modelContainer.addEventListener('mouseleave', () => {
  dragText.classList.add('hidden');
});


// slide2 마우스 효과
const floatingImage = document.querySelector('.floating-image');
const container = document.querySelector('.myself-container');

container.addEventListener('mousemove', (e) => {
  const { left, top, width, height } = container.getBoundingClientRect();
  const mouseX = e.clientX - (left + width / 2);
  const mouseY = e.clientY - (top + height / 2);
  const moveX = mouseX * 0.1;
  const moveY = mouseY * 0.1;

  floatingImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
});
container.addEventListener('mouseleave', () => {
  floatingImage.style.transform = 'translate(0, 0)';
});

// slide2 텍스트 애니메이션
let slide2 = document.querySelector('#slide2');
let slide2Text = slide2.querySelectorAll('.myself, .myself-desc');
let slide2Animated = false;

const observerOptions = {
  threshold: 0.3,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !slide2Animated) {
      slide2Text.forEach((text, index) => {
        setTimeout(() => {
          text.classList.add('animate');
        }, index * 300);
      });
      slide2Animated = true;
    }
  });
}, observerOptions);
observer.observe(slide2);


// slide4
const previewWrapper = document.querySelector('.preview-wrapper');
const previewCards = document.querySelectorAll('.preview-card');
let currentIndex = 3.63;
const totalItems = previewCards.length;

previewCards.forEach((card, i) => {
  card.style.setProperty('--i', i);
});

previewWrapper.style.transition = 'none';
updateCarousel();

setTimeout(() => {
  previewWrapper.style.transition = 'transform 1s ease-in-out';
}, 100);

function updateCarousel() {
  const angle = 180 + currentIndex * 30;
  previewWrapper.style.transform = `rotateY(${angle}deg)`;
}

function moveNext() {
  currentIndex = (currentIndex + 1) % totalItems;
  updateCarousel();
}
function movePrev() {
  currentIndex = (currentIndex - 1 + totalItems) % totalItems;
  updateCarousel();
}

let startX = 0;
let isDragging = false;

previewWrapper.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const diff = e.clientX - startX;
  if (diff > 50) {
    movePrev();
    isDragging = false;
  } else if (diff < -50) {
    moveNext();
    isDragging = false;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

previewWrapper.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
});

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const diff = e.touches[0].clientX - startX;
  if (diff > 150) {
    movePrev();
    isDragging = false;
  } else if (diff < -150) {
    moveNext();
    isDragging = false;
  }
});

document.addEventListener('touchend', () => {
  isDragging = false;
});

updateCarousel();

previewCards.forEach(card => {
  const tag = card.querySelector('.tag');

  card.addEventListener('mouseenter', (e) => {
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    tag.style.left = `${mouseX}px`;
    tag.style.top = `${mouseY}px`;
    tag.style.opacity = 1;
  });

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    tag.style.left = `${mouseX}px`;
    tag.style.top = `${mouseY}px`;
  });

  card.addEventListener('mouseleave', () => {
    tag.style.opacity = 0;
  });
});
