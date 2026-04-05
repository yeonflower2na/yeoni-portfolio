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

  // Progress bar ?좊땲硫붿씠??
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

  // ?띿뒪???꾪솚 ?좊땲硫붿씠??
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
