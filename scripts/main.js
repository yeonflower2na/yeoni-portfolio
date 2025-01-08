// cursor
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

  const hoverTargets = document.querySelectorAll('span, button, h1, h2, h3, h4, h5, h6, p');
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

      // main 탭 active 설정
      const mainNav = document.querySelector('.nav-item[href="main.html"]');
      if (mainNav) {
        navItems.forEach(nav => nav.classList.remove('active'));
        mainNav.classList.add('active');

        // 좌우 텍스트 업데이트
        navLeft2.textContent = mainNav.dataset.left;
        navRight.textContent = mainNav.dataset.right;

        // sessionStorage에 active 상태 저장
        sessionStorage.setItem('activeNav', mainNav.getAttribute('href'));
      }

      // nav-item 클릭 이벤트 설정
      navItems.forEach(item => {
        item.addEventListener('click', (e) => {
          const href = item.getAttribute('href');

          // 현재 active 상태 저장
          sessionStorage.setItem('activeNav', href);
          
          // 클릭된 메뉴에 active 추가
          navItems.forEach(nav => nav.classList.remove('active'));
          item.classList.add('active');
          
          // 좌우 텍스트 업데이트
          navLeft2.textContent = item.dataset.left;
          navRight.textContent = item.dataset.right;

          // 페이지 이동 방지 조건
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
  .then((data) => {
    document.querySelectorAll(".contact-include").forEach((a) => {
      a.innerHTML = data;

      const contactButton = a.querySelector('.contact');
      const holoContainer = a.querySelector('.holo-container');
      const holoClose = a.querySelector('.holo-close');

      contactButton.addEventListener('click', () => {
        holoContainer.classList.toggle('active');
      });

      holoClose.addEventListener('click', () => {
        holoContainer.classList.remove('active');
      });

      const footer = document.querySelector('.footer-include');
      if (footer) {
        footer.addEventListener('mouseenter', () => {
          contactButton.classList.add('footer-hover');
          holoContainer.classList.add('footer-hover');
        });

        footer.addEventListener('mouseleave', () => {
          contactButton.classList.remove('footer-hover');
          holoContainer.classList.remove('footer-hover');
        });
      }
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



// main
let prologue = document.getElementById('prologue');
let footer = document.getElementById('slide-footer');
let slides = document.querySelectorAll('.slide');
let leftText = document.querySelector('.serif-text.left');
let rightText = document.querySelector('.serif-text.right');
let slide3 = document.getElementById('slide3');
let slide4 = document.getElementById('slide4');
let body = document.body;

let totalSlides = slides.length;
let currentLocation = 0;
let atFooter = false;
let slide3Progress = 0;
let slide3Locked = false;
let slide4Animated = false;
let footerLock = false;
let slide3Hold = false;

slide4.style.opacity = '0';
slide4.style.transition = 'opacity 1s ease';
footer.style.transform = 'translateY(100vh)';
footer.style.transition = 'transform 0.8s ease';

const textMoveSpeed = 40;
const textReturnSpeed = 35;
const maxTextDistance = 500;

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

// wheel 이벤트 - 슬라이드 이동 및 배경색 전환
window.addEventListener('wheel', (e) => {
  if (e.deltaY > 0) {
    // 아래로 스크롤
    if (!atFooter) {
      if (currentLocation < 40 && !slide3Locked) {
        currentLocation++;
        prologue.style.left = currentLocation * -5 + '%';
      }

      if (currentLocation === 40) {
        if (!slide3Hold) {
          slide3Hold = true;
        } else {
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

              setTimeout(() => {
                currentLocation = 60;
                prologue.style.left = currentLocation * -5 + '%';
              }, 1000);
            }
          }
        }
      }

      if (currentLocation === 60 && slide4Animated) {
        atFooter = true;
        footer.style.transform = 'translateY(0)';
      }
    }
  } else {
    // 위로 스크롤
    if (atFooter) {
      atFooter = false;
      footer.style.transform = 'translateY(100vh)';
      currentLocation = 60;
      prologue.style.left = currentLocation * -5 + '%';
    } else if (currentLocation === 60 && !footerLock) {
      currentLocation = 40;
      prologue.style.left = currentLocation * -5 + '%';
    } 
    else if (currentLocation === 40) {
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
    }
    if (currentLocation === 39) {
      slide3Progress = 0;
      slide3Hold = false;
      slide3Locked = false;
    }
    if (currentLocation > 0 && currentLocation < 40 && !slide3Locked) {
      currentLocation--;
      prologue.style.left = currentLocation * -5 + '%';
    }
    if (currentLocation === 0) {
      slide3Progress = 0;
      slide3Locked = false;
      slide3Hold = false;
      slide4Animated = false;
    }
  }
  updateBackground();
});



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
