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
      const activeItem = document.querySelector('.nav-item.active');

      // 페이지 로드 시 현재 active 상태 복구 (sessionStorage 활용)
      const activeHref = sessionStorage.getItem('activeNav');
      if (activeHref) {
        const currentActive = document.querySelector(`.nav-item[href='${activeHref}']`);
        if (currentActive) {
          navItems.forEach(nav => nav.classList.remove('active'));
          currentActive.classList.add('active');
          navLeft2.textContent = currentActive.dataset.left;
          navRight.textContent = currentActive.dataset.right;
        }
      } else if (activeItem) {
        navLeft2.textContent = activeItem.dataset.left;
        navRight.textContent = activeItem.dataset.right;
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
          }
          else {
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
    const contactButton = document.querySelector('.contact');
    const holoContainer = document.querySelector('.holo-container');
    const holoClose = document.querySelector('.holo-close');
    contactButton.addEventListener('click', () => {
      holoContainer.classList.toggle('active');
    });
    holoClose.addEventListener('click', () => {
      holoContainer.classList.remove('active');
    })
    });
  })
.catch((err) => console.log("Contact load error:", err));



// intro
window.onload = () => {
  const introBox = document.querySelector('.intro-box');
  const introText = document.querySelector('.intro-text');
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");
  let dynamicFrom = document.getElementById('dynamic-from');
  let dynamicTo = document.getElementById('dynamic-to');

  let textPairs = [
    { from: "Sketch", to: "Screen" },
    { from: "Idea", to: "Interaction" }
  ];

  let currentIndex = -1;
  let isAnimating = false;
  let progress = 0;
  let totalSteps = textPairs.length;
  let animationCount = 0;
  let progressComplete = false;

  const switchInterval = 2300;

  function adjustBoxSize() {
    const textWidth = introText.offsetWidth;
    introBox.style.width = `${textWidth + 60}px`;
  }

  setTimeout(() => {
    adjustBoxSize();
    introBox.style.transform = 'translate(-50%, -50%) scaleX(1)';
  }, 300);

  setTimeout(() => {
    introText.classList.add('active');
  }, 500);

  // Progress bar 애니메이션
  function loadingAnimation() {
    const duration = totalSteps * switchInterval;
    const startTime = Date.now();

    function animateProgress() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const progressRatio = Math.min(elapsedTime / (duration * 0.35), 1);

      progress = Math.floor(progressRatio * 100);
      progressBar.style.width = `${progress}%`;
      progressText.textContent = `${progress}%`;

      if (progress === 100) {
        progressText.style.color = "#010000";
        progressText.style.fontWeight = "600";
        progressComplete = true;
        checkCompletion();
      } else {
        requestAnimationFrame(animateProgress);
      }
    }
    requestAnimationFrame(animateProgress);
  }

  // 텍스트 전환 애니메이션
  function switchText() {
    if (isAnimating || animationCount >= totalSteps) return;
    isAnimating = true;

    dynamicFrom.classList.add('exit');
    dynamicTo.classList.add('exit');

    setTimeout(() => {
      currentIndex++;

      if (currentIndex < totalSteps) {
        dynamicFrom.textContent = textPairs[currentIndex].from;
        dynamicTo.textContent = textPairs[currentIndex].to;
      }

      adjustBoxSize();

      dynamicFrom.classList.remove('exit');
      dynamicTo.classList.remove('exit');
      dynamicFrom.classList.add('start');
      dynamicTo.classList.add('start');

      requestAnimationFrame(() => {
        dynamicFrom.classList.remove('start');
        dynamicFrom.classList.add('enter');
        dynamicTo.classList.remove('start');
        dynamicTo.classList.add('enter');
      });

      setTimeout(() => {
        dynamicFrom.classList.remove('enter');
        dynamicTo.classList.remove('enter');
        isAnimating = false;

        animationCount++;
        checkCompletion();
      }, 650);
    }, 650);
  }

  function checkCompletion() {
    if (progressComplete && animationCount >= totalSteps) {
      setTimeout(() => {
        document.body.classList.add('fade-out');
        setTimeout(() => {
          window.location.href = "main.html";
        }, 1000);
      }, 1000);
    }
  }

  loadingAnimation();

  setTimeout(() => {
    let interval = setInterval(() => {
      if (animationCount < totalSteps) {
        switchText();
      } else {
        clearInterval(interval); 
      }
    }, switchInterval);
    switchText();
  }, 1200);
};
