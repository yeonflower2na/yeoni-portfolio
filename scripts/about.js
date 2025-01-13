document.addEventListener('DOMContentLoaded', () => {
  let cursor = document.querySelector('.cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
  }

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  cursor.style.opacity = '0';
  let isMouseMoved = false;

  document.addEventListener('mousemove', (e) => {
      if (!isMouseMoved) {
          cursorX = e.clientX;
          cursorY = e.clientY;
          cursor.style.left = `${cursorX}px`;
          cursor.style.top = `${cursorY}px`;
          isMouseMoved = true;
      }
      
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = '1';
  });

  function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.1; 
      cursorY += (mouseY - cursorY) * 0.1;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverTargets = document.querySelectorAll('span, button, h1, h2, h3, h4, h5, h6, p, img');
  hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => {
          cursor.classList.add('cursor-hover');
      });
      target.addEventListener('mouseleave', () => {
          cursor.classList.remove('cursor-hover');
      });
  });

  const footer = document.querySelector('.footer-include');
  if (footer) {
      footer.addEventListener('mouseenter', () => {
          cursor.classList.add('cursor-footer');
      });
      footer.addEventListener('mouseleave', () => {
          cursor.classList.remove('cursor-footer');
      });
  }
});


// header-include
fetch("header.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelectorAll(".header-include").forEach((a) => {
      a.innerHTML = data;
      
      const navItems = document.querySelectorAll('.nav-item');
      const navLeft2 = document.getElementById('nav-left2');
      const navRight = document.getElementById('nav-right');

      // about 탭 active 설정
      const aboutNav = document.querySelector('.nav-item[href="about.html"]');
      if (aboutNav) {
        navItems.forEach(nav => nav.classList.remove('active'));
        aboutNav.classList.add('active');

        navLeft2.textContent = aboutNav.dataset.left;
        navRight.textContent = aboutNav.dataset.right;

        sessionStorage.setItem('activeNav', aboutNav.getAttribute('href'));
      }

      navItems.forEach(item => {
        item.addEventListener('click', (e) => {
          const href = item.getAttribute('href');

          sessionStorage.setItem('activeNav', href);
          
          navItems.forEach(nav => nav.classList.remove('active'));
          item.classList.add('active');
          
          navLeft2.textContent = item.dataset.left;
          navRight.textContent = item.dataset.right;

          if (href === '#none' || href === '#') {
            e.preventDefault();
          } else {
            window.location.href = href;
          }
        });
      });
    });
  })
  .catch((err) => console.log("Header load error:", err));
  
// contact-include
fetch("contact.html")
  .then((res) => res.text())
  .then((contactData) => {
    document.querySelectorAll(".contact-include").forEach((contactInclude) => {
      contactInclude.innerHTML = contactData;

      const contactButton = contactInclude.querySelector('.contact');
      const holoContainer = contactInclude.querySelector('.holo-container');
      const holoClose = contactInclude.querySelector('.holo-close');

      contactButton.addEventListener('click', () => {
        holoContainer.classList.toggle('active');
      });

      holoClose.addEventListener('click', () => {
        holoContainer.classList.remove('active');
      });

      fetch("footer.html")
        .then((res) => res.text())
        .then((footerData) => {
          document.querySelectorAll(".footer-include").forEach((footerInclude) => {
            footerInclude.innerHTML = footerData;

            const footer = footerInclude;

            if (footer) {
              footer.addEventListener('mouseenter', () => {
                footer.classList.add('footer-hover');
                contactButton.classList.add('footer-hover');
                holoContainer.classList.add('footer-hover');
              });

              footer.addEventListener('mouseleave', () => {
                contactButton.classList.remove('footer-hover');
                holoContainer.classList.remove('footer-hover');

                if (!holoContainer.classList.contains('active')) {
                  holoContainer.classList.remove('active');
                }
              });

              contactButton.addEventListener('mouseenter', () => {
                footer.classList.add('footer-hover');
                holoContainer.classList.add('footer-hover');
              });

              contactButton.addEventListener('mouseleave', () => {
                footer.classList.add('footer-hover');
                holoContainer.classList.add('footer-hover');
              });

              footer.addEventListener('click', (event) => {
                if (event.target.closest('.contact')) {
                  holoContainer.classList.add('active');
                }
              });
            }
          });
        })
        .catch((err) => console.log("Footer load error:", err));
    });
  })
  .catch((err) => console.log("Contact load error:", err));


// footer-include
fetch("footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelectorAll(".footer-include").forEach((a) => {
      a.innerHTML = data;
    });
  })
.catch((err) => console.log("footer load error:", err));



// about
const rightScroll = document.querySelector('.right-scroll');
const horizontalScroll = document.querySelector('.horizontal-scroll');
const footer = document.getElementById('about-footer');
const circleButton = document.getElementById('circleButton'); // 버튼

let isScrolling = false;
let currentPage = 0;
let atFooter = false;

let scrollCount = 0;
const scrollThreshold = 3;

// 스크롤 이벤트
window.addEventListener('wheel', (e) => {
  if (isScrolling) return;

  if (e.deltaY > 0) {
    handleScrollDown();
  } else {
    handleScrollUp();
  }
});

// 아래로 스크롤
function handleScrollDown() {
  if (currentPage === 0) {
    smoothScrollTo(rightScroll, rightScroll.scrollTop + window.innerHeight, 700, () => {
      currentPage = 1;
      scrollCount = 0;
    });
  } else if (currentPage === 1) {
    scrollCount++;

    if (scrollCount >= scrollThreshold) {
      moveToPage3(); // page3로 이동
      scrollCount = 0;
    }
  } else if (currentPage === 2 && !atFooter) {
    scrollCount++;

    if (scrollCount >= scrollThreshold) {
      footer.classList.add('visible');
      atFooter = true;
      scrollCount = 0;
    }
  }
  updateCircleButtonVisibility();
}

// 위로 스크롤
function handleScrollUp() {
  if (atFooter) {
    scrollCount++;

    if (scrollCount >= scrollThreshold) {
      footer.classList.remove('visible');
      atFooter = false;
      horizontalScroll.style.transform = 'translateX(-100vw)';
      currentPage = 2;
      scrollCount = 0;
    }
    return;
  }

  if (currentPage === 2) {
    moveToPage2(); // page2로 이동
    scrollCount = 0;
  } else if (currentPage === 1) {
    if (scrollCount > 0) {
      scrollCount--;
    }
    if (scrollCount === 0) {
      smoothScrollTo(rightScroll, rightScroll.scrollTop - window.innerHeight, 700, () => {
        currentPage = 0;
        scrollCount = 0;
      });
    }
  }
  updateCircleButtonVisibility();
}

// page3로 이동
function moveToPage3() {
  if (isScrolling) return;
  isScrolling = true;

  // page3로 이동
  horizontalScroll.style.transform = 'translateX(-100vw)';
  currentPage = 2;

  setTimeout(() => {
    isScrolling = false;
  }, 800);

  updateCircleButtonVisibility();
}

// page2로 이동
function moveToPage2() {
  if (isScrolling) return;
  isScrolling = true;

  // page2로 이동
  horizontalScroll.style.transform = 'translateX(0vw)';
  currentPage = 1;

  setTimeout(() => {
    isScrolling = false;
  }, 800);

  updateCircleButtonVisibility();
}

function updateCircleButtonVisibility() {
  if (currentPage === 2) {
    // 3페이지에서는 버튼 숨김
    circleButton.classList.add('hidden');
  } else if (currentPage === 1) {
    // 3페이지 -> 2페이지로 돌아올 때 버튼을 약간의 지연 후 표시
    circleButton.classList.add('hidden'); // 일단 숨김 유지
    setTimeout(() => {
      // 3페이지가 완전히 사라진 후 버튼 표시
      if (currentPage === 1) {
        circleButton.classList.remove('hidden');
      }
    }, 800); // 지연 시간 (애니메이션 완료 후 등장)
  } else {
    // 1페이지에서는 즉시 버튼 표시
    circleButton.classList.remove('hidden');
  }
}


// smoothScroll
function smoothScrollTo(element, target, duration, callback) {
  const start = element.scrollTop;
  const distance = target - start;
  const startTime = performance.now();

  function scrollAnimation(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    element.scrollTop = start + distance * easeInOutQuad(progress);

    if (elapsed < duration) {
      requestAnimationFrame(scrollAnimation);
    } else {
      isScrolling = false;
      if (callback) callback();
    }
  }
  isScrolling = true;
  requestAnimationFrame(scrollAnimation);
}

// easing 함수
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}



// about01
document.addEventListener('DOMContentLoaded', () => {
  const about01 = document.querySelector('.about01');

  about01.addEventListener('mouseenter', () => {
    about01.classList.add('hover');
  });
  
  about01.addEventListener('mouseleave', () => {
    about01.classList.remove('hover');
  });
});



// page2
const modal = document.querySelector('.modal');
const modalButton = document.querySelector('.aboutme-text');
const closeButton = document.querySelector('.modal-close');

modalButton.addEventListener('click', () => {
  modal.classList.add('show');
  showModalSpans();
});

closeButton.addEventListener('click', () => {
  closeModal();
});

window.addEventListener('click', (e) => {
  if (!modal.contains(e.target) && !modalButton.contains(e.target)) {
    closeModal();
  }
});
function closeModal() {
  modal.classList.remove('show');
}
function showModalSpans() {
  const spans = document.querySelectorAll('.modal-content h4 span');
  spans.forEach((span, index) => {
    setTimeout(() => {
      span.classList.add('fade-in');
    }, index * 100);
  });
}

// circleButton
document.getElementById('circleButton').addEventListener('click', function () {
  this.classList.add('hidden');
  moveToPage3();
});

function moveToPage3() {
  if (isScrolling) return;
  isScrolling = true;

  horizontalScroll.style.transform = 'translateX(-100vw)';
  currentPage = 2;

  setTimeout(() => {
    isScrolling = false;
  }, 800);
}

function moveToPage2() {
  if (isScrolling) return;
  isScrolling = true;

  horizontalScroll.style.transform = 'translateX(0vw)';
  currentPage = 1;

  const circleButton = document.getElementById('circleButton');
  circleButton.classList.remove('hidden'); 
  setTimeout(() => {
    isScrolling = false;
  }, 800);
}





// page3
const skillsWrapper = document.querySelector('.skills-wrapper');
const skillsCards = Array.from(skillsWrapper.children);
let currentIndex = 0;

const positions = [
  { class: 'skills-card-left-4' },
  { class: 'skills-card-left-3' },
  { class: 'skills-card-left-2' },
  { class: 'skills-card-left-1' },
  { class: 'skills-card-left' }, 
  { class: 'skills-card-center' },
  { class: 'skills-card-right' }, 
  { class: 'skills-card-right-1' },
  { class: 'skills-card-right-2' },
  { class: 'skills-card-right-3' },
  { class: 'skills-card-right-4' }
];

// 캐러셀 업데이트
function updateCarousel() {
  skillsCards.forEach((card, index) => {
    card.classList.remove(
      'skills-card-left-4',
      'skills-card-left-3',
      'skills-card-left-2',
      'skills-card-left-1',
      'skills-card-left',
      'skills-card-center',
      'skills-card-right',
      'skills-card-right-1',
      'skills-card-right-2',
      'skills-card-right-3',
      'skills-card-right-4'
    );

    const positionIndex = 
      (index - currentIndex + skillsCards.length) % skillsCards.length;

    if (positions[positionIndex]) {
      card.classList.add(positions[positionIndex].class);
    }

    const skillName = card.querySelector('h2').textContent.trim();
    const percentage = skillLevels[skillName] || 50;
    updateProgressBar(card, percentage);
  });
}


function moveNext() {
  currentIndex = (currentIndex + 1) % skillsCards.length;
  updateCarousel();
}
function movePrev() {
  currentIndex = (currentIndex - 1 + skillsCards.length) % skillsCards.length;
  updateCarousel();
}

// Drag
let startX = 0;
let isDragging = false;
let dragThreshold = 80;

skillsWrapper.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const diff = e.clientX - startX;

  if (diff > dragThreshold) {
    movePrev();
    isDragging = false;
  } else if (diff < -dragThreshold) {
    moveNext();
    isDragging = false;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

skillsWrapper.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
});

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const diff = e.touches[0].clientX - startX;

  if (diff > dragThreshold) {
    movePrev();
    isDragging = false;
  } else if (diff < -dragThreshold) {
    moveNext();
    isDragging = false;
  }
});

document.addEventListener('touchend', () => {
  isDragging = false;
});

// autoplay
let interval = setInterval(moveNext, 5000);

skillsWrapper.addEventListener('mouseenter', () => {
  clearInterval(interval);
});

skillsWrapper.addEventListener('mouseleave', () => {
  interval = setInterval(moveNext, 5000);
});

window.addEventListener('resize', updateCarousel);


// skills
const skillLevels = {
  VScode: 85,
  Figma: 90,
  HTML: 85,
  CSS: 88,
  JavaScript: 75,
  React: 70,
  Sass: 75,
  Photoshop: 90,
  Illustrator: 95,
  Indesign: 88,
  Github: 60
};

function animateProgressBar(progressBar, progressText, targetPercentage) {
  let currentPercentage = 0;

  function step() {
    if (currentPercentage <= targetPercentage) {
      progressBar.style.width = `${currentPercentage}%`;
      progressText.textContent = `${currentPercentage}%`;

      if (currentPercentage >= 50) {
        progressText.style.color = 'white';
      } else {
        progressText.style.color = 'var(--black)';
      }

      currentPercentage++;
      requestAnimationFrame(step);
    } else {
      progressBar.style.width = `${targetPercentage}%`;
      progressText.textContent = `${targetPercentage}%`;
    }
  }
  requestAnimationFrame(step);
}


// progressbar
function updateProgressBar(skillCard, percentage) {
  const progressBar = skillCard.querySelector('.skills-progress-bar');
  const progressText = skillCard.querySelector('.skills-progress-percent');
  const progressContainer = skillCard.querySelector('.skills-progress');

  if (skillCard.classList.contains('skills-card-center')) {
    progressContainer.style.display = 'block';
    animateProgressBar(progressBar, progressText, percentage);
  } else {
    progressContainer.style.display = 'none';
    progressBar.style.width = '0%';
    progressText.textContent = '0%';
    progressText.style.color = 'var(--black)';
  }
}

function updateCarousel() {
  skillsCards.forEach((card, index) => {
    card.classList.remove(
      'skills-card-left-4',
      'skills-card-left-3',
      'skills-card-left-2',
      'skills-card-left-1',
      'skills-card-left',
      'skills-card-center',
      'skills-card-right',
      'skills-card-right-1',
      'skills-card-right-2',
      'skills-card-right-3',
      'skills-card-right-4'
    );

    const positionIndex = 
      (index - currentIndex + skillsCards.length) % skillsCards.length;

    if (positions[positionIndex]) {
      card.classList.add(positions[positionIndex].class);
    }

    const skillName = card.querySelector('h2').textContent.trim();
    const percentage = skillLevels[skillName] || 50;
    updateProgressBar(card, percentage);
  });
}
updateCarousel();
