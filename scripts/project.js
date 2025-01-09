// header-include
fetch("header.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelectorAll(".header-include").forEach((a) => {
      a.innerHTML = data;
      
      const navItems = document.querySelectorAll('.nav-item');
      const navLeft2 = document.getElementById('nav-left2');
      const navRight = document.getElementById('nav-right');

      // project 탭 active 설정
      const projectNav = document.querySelector('.nav-item[href="project.html"]');
      if (projectNav) {
        navItems.forEach(nav => nav.classList.remove('active'));
        projectNav.classList.add('active');

        navLeft2.textContent = projectNav.dataset.left;
        navRight.textContent = projectNav.dataset.right;

        sessionStorage.setItem('activeNav', projectNav.getAttribute('href'));
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



// project
gsap.registerPlugin(ScrollTrigger);

const frames = document.querySelectorAll('.project_frame');
const texts = document.querySelectorAll('.project_text');
const track = document.querySelector('.project_texts');
const description = document.createElement('p');
description.id = 'dynamicDescription';
document.body.appendChild(description);

let scrollAmount = 0;
const frameHeight = window.innerHeight * 0.7;
const frameGap = 150;
let typingTimer;

gsap.set(frames, { y: 100, opacity: 0 });
gsap.set(track, { x: window.innerWidth });

const totalWidth = Array.from(texts).reduce((acc, text) => acc + text.offsetWidth, 0);
track.style.width = `${totalWidth + window.innerWidth / 3}px`;

document.querySelector('.container').style.height = `${
  frames.length * (frameHeight + frameGap) + frameHeight * 2
}px`;

// frame, text
window.addEventListener('load', () => {
  const firstText = texts[0];
  const firstFrame = frames[0];
  
  gsap.to(firstFrame, {
    y: (window.innerHeight / 2 - frameHeight / 2) - window.innerHeight * 0.05,
    opacity: 1,
    duration: 1,
    ease: "power2.out"
  });

  const textOffset = -firstText.offsetLeft + (window.innerWidth / 2) - (firstText.offsetWidth / 2);
  gsap.to(track, {
    x: textOffset,
    duration: 1,
    ease: "power2.out"
  });

  typeDescription(firstFrame.dataset.desc);
  updateTextVisibility(0);
  
  window.addEventListener('wheel', handleWheelScroll);
});

// wheelEvent
function handleWheelScroll(e) {
  scrollAmount += e.deltaY;

  // maxScroll
  const maxScroll = (frames.length * (frameHeight + frameGap)) + frameHeight;
  scrollAmount = Math.max(0, Math.min(scrollAmount, maxScroll));

  syncScroll();
}

// frame과 text 동시 이동
function syncScroll() {
  const index = Math.round(scrollAmount / (frameHeight + frameGap));
  const targetText = texts[Math.min(index, texts.length - 1)];
  const offset = -targetText.offsetLeft + (window.innerWidth / 2) - (targetText.offsetWidth / 2);
  const targetFrame = frames[Math.min(index, frames.length - 1)];

  // frame 세로 스크롤
  gsap.to(frames, {
    y: -scrollAmount + (window.innerHeight / 2 - frameHeight / 2) - window.innerHeight * 0.025,
    opacity: 1,
    duration: 1,
    ease: "power2.out"
  });

  // text 가로 스크롤
  gsap.to(track, {
    x: offset,
    duration: 1,
    ease: "power2.out"
  });

  // dynamicDescription
  typeDescription(targetFrame.dataset.desc);
  updateTextVisibility(index);

  // other project 등장 시 dynamicDescription 숨기기
  if (targetText.dataset.index === "5") {
    description.style.display = 'none';
  } else {
    description.style.display = 'block';
  }
}

// dynamicDescription 타이핑 중복 제거
function typeDescription(text) {
  let i = 0;
  const speed = 50;

  clearTimeout(typingTimer);
  description.textContent = '';

  function typeWriter() {
    if (i < text.length) {
      description.textContent += text.charAt(i);
      i++;
      typingTimer = setTimeout(typeWriter, speed);
    }
  }
  typeWriter();
}

// text active 추가
function updateTextVisibility(index) {
  texts.forEach((text, i) => {
    if (text.dataset.index !== "5") {
      text.classList.remove('active');
      if (i === index) {
        text.classList.add('active');
      }
    }
  });
}
