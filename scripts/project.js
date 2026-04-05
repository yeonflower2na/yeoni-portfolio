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

// frame怨?text ?숈떆 ?대룞
function syncScroll() {
  const index = Math.round(scrollAmount / (frameHeight + frameGap));
  const targetText = texts[Math.min(index, texts.length - 1)];
  const offset = -targetText.offsetLeft + (window.innerWidth / 2) - (targetText.offsetWidth / 2);
  const targetFrame = frames[Math.min(index, frames.length - 1)];

  // frame ?몃줈 ?ㅽ겕濡?
  gsap.to(frames, {
    y: -scrollAmount + (window.innerHeight / 2 - frameHeight / 2) - window.innerHeight * 0.025,
    opacity: 1,
    duration: 1,
    ease: "power2.out"
  });

  // text 媛濡??ㅽ겕濡?
  gsap.to(track, {
    x: offset,
    duration: 1,
    ease: "power2.out"
  });

  // dynamicDescription
  typeDescription(targetFrame.dataset.desc);
  updateTextVisibility(index);

  // other project ?깆옣 ??dynamicDescription ?④린湲?
  if (targetText.dataset.index === "5") {
    description.style.display = 'none';
  } else {
    description.style.display = 'block';
  }
}

// dynamicDescription ??댄븨 以묐났 ?쒓굅
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

// text active 異붽?
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

// detailPage
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.project_frame').forEach(frame => {
    frame.addEventListener('click', () => {
      const idx = frame.getAttribute('data-index');
      if (idx === "0") window.location.href = "detailPage01.html";
      else if (idx === "1") window.location.href = "detailPage02.html";
      else if (idx === "2") window.location.href = "detailPage03.html";
      else if (idx === "3") window.location.href = "detailPage04.html";
    });
  });
});
