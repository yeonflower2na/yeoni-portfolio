'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Contact from '@/components/Contact';

export default function IntroPage() {
  const router = useRouter();
  const introBoxRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const dynamicFromRef = useRef<HTMLSpanElement>(null);
  const dynamicToRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    document.body.style.backgroundColor = 'var(--white)';

    const introBox = introBoxRef.current;
    const introText = introTextRef.current;
    const progressBar = progressBarRef.current;
    const progressText = progressTextRef.current;
    const dynamicFrom = dynamicFromRef.current;
    const dynamicTo = dynamicToRef.current;

    if (!introBox || !introText || !progressBar || !progressText || !dynamicFrom || !dynamicTo) {
      return;
    }

    // Non-null aliases for use inside closures (TS cannot narrow through closures)
    const box = introBox!;
    const text = introText!;
    const bar = progressBar!;
    const pText = progressText!;
    const dynFrom = dynamicFrom!;
    const dynTo = dynamicTo!;

    const textPairs = [
      { from: 'Sketch', to: 'Screen' },
      { from: 'Idea', to: 'Interaction' },
    ];
    let currentIndex = -1;
    let isAnimating = false;
    let progress = 0;
    const totalSteps = 2;
    let animationCount = 0;
    let progressComplete = false;
    const switchInterval = 2300;

    function adjustBoxSize() {
      box.style.width = `${text.offsetWidth + 60}px`;
    }

    setTimeout(() => {
      adjustBoxSize();
      box.style.transform = 'translate(-50%, -50%) scaleX(1)';
    }, 300);

    setTimeout(() => {
      text.classList.add('active');
    }, 500);

    function checkCompletion() {
      if (progressComplete && animationCount >= totalSteps) {
        setTimeout(() => {
          document.body.classList.add('fade-out');
          setTimeout(() => {
            router.push('/main');
          }, 1000);
        }, 1000);
      }
    }

    function loadingAnimation() {
      const duration = totalSteps * switchInterval;
      const startTime = Date.now();
      function animateProgress() {
        const elapsedTime = Date.now() - startTime;
        const progressRatio = Math.min(elapsedTime / (duration * 0.35), 1);
        progress = Math.floor(progressRatio * 100);
        bar.style.width = `${progress}%`;
        pText.textContent = `${progress}%`;
        if (progress === 100) {
          pText.style.color = '#010000';
          pText.style.fontWeight = '600';
          progressComplete = true;
          checkCompletion();
        } else {
          requestAnimationFrame(animateProgress);
        }
      }
      requestAnimationFrame(animateProgress);
    }

    function switchText() {
      if (isAnimating || animationCount >= totalSteps) return;
      isAnimating = true;
      dynFrom.classList.add('exit');
      dynTo.classList.add('exit');

      setTimeout(() => {
        currentIndex++;
        dynFrom.textContent = textPairs[currentIndex].from;
        dynTo.textContent = textPairs[currentIndex].to;
        adjustBoxSize();
        dynFrom.classList.remove('exit');
        dynTo.classList.remove('exit');
        dynFrom.classList.add('start');
        dynTo.classList.add('start');

        requestAnimationFrame(() => {
          dynFrom.classList.remove('start');
          dynFrom.classList.add('enter');
          dynTo.classList.remove('start');
          dynTo.classList.add('enter');
        });

        setTimeout(() => {
          dynFrom.classList.remove('enter');
          dynTo.classList.remove('enter');
          isAnimating = false;
          animationCount++;
          checkCompletion();
        }, 650);
      }, 650);
    }

    loadingAnimation();

    let intervalId: ReturnType<typeof setInterval>;
    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (animationCount < totalSteps) {
          switchText();
        } else {
          clearInterval(intervalId);
        }
      }, switchInterval);
      switchText();
    }, 1200);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId!);
      document.body.style.backgroundColor = '';
    };
  }, [router]);

  return (
    <div id="wrap">
      <Header />
      <Contact />
      <section className="intro-container">
        <div className="intro-box" ref={introBoxRef}></div>
        <div className="intro-text" ref={introTextRef}>
          <span className="static-text">From</span>
          <span className="dynamic-wrapper">
            <span className="dynamic-text" ref={dynamicFromRef}>
              Designer
            </span>
          </span>
          <span className="static-text">to</span>
          <span className="dynamic-wrapper">
            <span className="dynamic-text" ref={dynamicToRef}>
              Developer
            </span>
          </span>
        </div>
        <div className="loading-bar">
          <div className="progress" id="progress-bar" ref={progressBarRef}></div>
          <span className="progress-text" id="progress-text" ref={progressTextRef}>
            0%
          </span>
        </div>
      </section>
    </div>
  );
}
