'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const ThreeModel = dynamic(() => import('@/components/ThreeModel'), { ssr: false });

export default function MainPage() {
  const prologueRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const slide3LeftRef = useRef<HTMLSpanElement>(null);
  const slide3RightRef = useRef<HTMLSpanElement>(null);
  const slide4Ref = useRef<HTMLDivElement>(null);
  const previewWrapperRef = useRef<HTMLDivElement>(null);
  const myselfContainerRef = useRef<HTMLDivElement>(null);
  const floatingImageRef = useRef<HTMLImageElement>(null);

  // Remove fade-out class left by intro page (Next.js preserves body across SPA navigations)
  useEffect(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.classList.remove('fade-out');
    document.body.style.opacity = '1';
    return () => {
      document.body.style.transition = '';
      document.body.style.opacity = '';
    };
  }, []);

  // Entry animation (matches original IntersectionObserver on prologue)
  useEffect(() => {
    const prologue = prologueRef.current;
    if (!prologue) return;

    prologue.classList.remove('show');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          prologue.classList.add('show');
          const slideFrom = prologue.querySelector<HTMLElement>('.slide-from');
          const slideTo = prologue.querySelector<HTMLElement>('.slide-to');
          setTimeout(() => slideFrom?.classList.add('show'), 400);
          setTimeout(() => slideTo?.classList.add('show'), 1000);
          setTimeout(() => {
            prologue.querySelectorAll<HTMLElement>('.slide1-content p').forEach((p) => {
              p.classList.add('fade-in');
            });
          }, 1500);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(prologue);
    return () => observer.disconnect();
  }, []);

  // Slide2 text animation (IntersectionObserver matching original)
  useEffect(() => {
    const slide2 = document.getElementById('slide2');
    if (!slide2) return;

    let animated = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          const texts = slide2.querySelectorAll<HTMLElement>('.myself, .myself-desc');
          texts.forEach((el, i) => {
            setTimeout(() => el.classList.add('animate'), i * 300);
          });
          animated = true;
        }
      });
    }, { threshold: 0.3 });

    observer.observe(slide2);
    return () => observer.disconnect();
  }, []);

  // Model container drag text hover (matches original)
  useEffect(() => {
    const modelContainer = document.getElementById('model-container');
    const dragText = document.querySelector<HTMLElement>('.drag');
    if (!modelContainer || !dragText) return;

    const onEnter = () => dragText.classList.remove('hidden');
    const onLeave = () => dragText.classList.add('hidden');
    modelContainer.addEventListener('mouseenter', onEnter);
    modelContainer.addEventListener('mouseleave', onLeave);
    return () => {
      modelContainer.removeEventListener('mouseenter', onEnter);
      modelContainer.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // Slide2 floating image parallax (matches original)
  useEffect(() => {
    const container = myselfContainerRef.current;
    const floatingImg = floatingImageRef.current;
    if (!container || !floatingImg) return;

    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const mouseX = e.clientX - (left + width / 2);
      const mouseY = e.clientY - (top + height / 2);
      floatingImg.style.transform = `translate(${mouseX * 0.1}px, ${mouseY * 0.1}px)`;
    };
    const onLeave = () => {
      floatingImg.style.transform = 'translate(0, 0)';
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // Preview carousel drag (matches original)
  useEffect(() => {
    const wrapper = previewWrapperRef.current;
    if (!wrapper) return;

    const previewCards = wrapper.querySelectorAll<HTMLElement>('.preview-card');
    let currentIndex = 3.63;
    const totalItems = previewCards.length;

    previewCards.forEach((card, i) => {
      card.style.setProperty('--i', String(i));
    });

    wrapper.style.transition = 'none';
    const angle = 180 + currentIndex * 30;
    wrapper.style.transform = `rotateY(${angle}deg)`;

    setTimeout(() => {
      wrapper.style.transition = 'transform 1s ease-in-out';
    }, 100);

    function updateCarousel() {
      const deg = 180 + currentIndex * 30;
      wrapper!.style.transform = `rotateY(${deg}deg)`;
    }
    function moveNext() { currentIndex = (currentIndex + 1) % totalItems; updateCarousel(); }
    function movePrev() { currentIndex = (currentIndex - 1 + totalItems) % totalItems; updateCarousel(); }

    let startX = 0;
    let isDragging = false;

    const onMouseDown = (e: MouseEvent) => { isDragging = true; startX = e.clientX; };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const diff = e.clientX - startX;
      if (diff > 50) { movePrev(); isDragging = false; }
      else if (diff < -50) { moveNext(); isDragging = false; }
    };
    const onMouseUp = () => { isDragging = false; };
    const onTouchStart = (e: TouchEvent) => { isDragging = true; startX = e.touches[0].clientX; };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const diff = e.touches[0].clientX - startX;
      if (diff > 150) { movePrev(); isDragging = false; }
      else if (diff < -150) { moveNext(); isDragging = false; }
    };
    const onTouchEnd = () => { isDragging = false; };

    wrapper.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    wrapper.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      wrapper.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      wrapper.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // Tag follow mouse on preview cards (matches original)
  useEffect(() => {
    const slide4 = slide4Ref.current;
    if (!slide4) return;

    const cards = slide4.querySelectorAll<HTMLElement>('.preview-card');

    cards.forEach((card) => {
      const tag = card.querySelector<HTMLElement>('.tag');
      if (!tag) return;

      const onEnter = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        tag.style.left = `${e.clientX - rect.left}px`;
        tag.style.top = `${e.clientY - rect.top}px`;
        tag.style.opacity = '1';
      };
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        tag.style.left = `${e.clientX - rect.left}px`;
        tag.style.top = `${e.clientY - rect.top}px`;
      };
      const onLeave = () => { tag.style.opacity = '0'; };

      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }, []);

  // ── Wheel navigation — exactly matches original main.js ────────────────────
  useEffect(() => {
    const prologue = prologueRef.current;
    const footer = footerRef.current;
    const leftText = slide3LeftRef.current;
    const rightText = slide3RightRef.current;
    const slide4 = slide4Ref.current;

    if (!prologue || !footer || !slide4) return;

    // Non-null refs for use inside closure
    const pEl = prologue;
    const fEl = footer;
    const s4El = slide4;

    // Initial state
    s4El.style.opacity = '0';
    s4El.style.transition = 'opacity 1s ease';
    fEl.style.transform = 'translateY(100vh)';
    fEl.style.transition = 'transform 0.8s ease';

    // Mutable state (closure vars, matching original)
    let currentLocation = 0;
    let atFooter = false;
    let slide3Progress = 0;
    let slide3Locked = false;
    let slide4Animated = false;
    let slide3Hold = false;
    let footerScrollProgress = 0;
    let scrollCounter = 0;
    let isTransitioning = false;
    let hasSlide4Appeared = false;

    const textMoveSpeed = 40;
    const textReturnSpeed = 35;
    const maxTextDistance = 500;
    const footerScrollThreshold = 80;

    function updateBackground() {
      if (currentLocation >= 40) {
        document.body.classList.add('change-background');
        document.body.classList.remove('default-background');
      } else {
        document.body.classList.add('default-background');
        document.body.classList.remove('change-background');
      }
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const isScrollingDown = e.deltaY > 0;

      if (isTransitioning) return;

      if (isScrollingDown) {
        if (!atFooter) {
          if (currentLocation < 40 && !slide3Locked) {
            currentLocation++;
            pEl.style.left = currentLocation * -5 + '%';
          }

          if (currentLocation === 40) {
            slide3Hold = true;
            slide3Locked = true;

            slide3Progress += textMoveSpeed;
            if (leftText) leftText.style.transform = `translateX(-${80 + slide3Progress}%)`;
            if (rightText) rightText.style.transform = `translateX(${80 + slide3Progress}%)`;

            if (slide3Progress >= maxTextDistance) {
              slide3Locked = false;
              slide3Hold = false;

              if (!slide4Animated) {
                s4El.style.opacity = '1';
                slide4Animated = true;
                hasSlide4Appeared = true;

                setTimeout(() => {
                  currentLocation = 60;
                  pEl.style.left = currentLocation * -5 + '%';
                }, 1000);
              }
            }
          }

          if (currentLocation === 60 && slide4Animated) {
            footerScrollProgress += 10;
            if (footerScrollProgress >= footerScrollThreshold) {
              atFooter = true;
              fEl.style.transform = 'translateY(0)';
            }
          }
        }
      } else {
        if (atFooter) {
          atFooter = false;
          fEl.style.transform = 'translateY(100vh)';
          currentLocation = 60;
          pEl.style.left = currentLocation * -5 + '%';
          footerScrollProgress = 0;
        } else if (currentLocation === 60) {
          scrollCounter++;
          if (scrollCounter === 1) {
            s4El.style.opacity = '0.8';
          } else if (scrollCounter === 2) {
            s4El.style.opacity = '0.5';
          } else if (scrollCounter >= 3) {
            isTransitioning = true;
            s4El.style.opacity = '0';
            currentLocation = 40;

            setTimeout(() => {
              pEl.style.left = currentLocation * -5 + '%';
              isTransitioning = false;
              hasSlide4Appeared = false;
            }, 500);

            scrollCounter = 0;
          }
        } else if (currentLocation === 40) {
          if (!hasSlide4Appeared) {
            slide3Progress -= textReturnSpeed;
            if (leftText) leftText.style.transform = `translateX(-${80 + slide3Progress}%)`;
            if (rightText) rightText.style.transform = `translateX(${80 + slide3Progress}%)`;

            if (slide3Progress <= 0) {
              slide3Progress = 0;
              slide3Locked = false;
              slide3Hold = false;
              currentLocation = 39;
              pEl.style.left = currentLocation * -5 + '%';
            }
          } else {
            s4El.style.opacity = '0';
            hasSlide4Appeared = false;
            slide4Animated = false;
          }
        } else if (currentLocation > 0 && currentLocation < 40 && !slide3Locked) {
          currentLocation--;
          pEl.style.left = currentLocation * -5 + '%';
        }

        if (currentLocation === 0) {
          slide3Progress = 0;
          slide3Locked = false;
          slide3Hold = false;
          slide4Animated = false;
          footerScrollProgress = 0;
          hasSlide4Appeared = false;
        }
      }

      updateBackground();
    }

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <>
      <Header />
      <Contact />
      <main className="main">
        <section
          className="prologue-container"
          id="prologue"
          ref={prologueRef}
        >
          {/* ── SLIDE 1 ── */}
          <div className="slide" id="slide1">
            <h1 className="slide-from">
              <svg className="svg-wide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 1000">
                <defs>
                  <linearGradient id="aurora-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f9c5d1">
                      <animate attributeName="stop-color" values="#f9c5d1;#c3b6f7;#b7eaff;#c3b6f7;#f9c5d1" keyTimes="0;0.25;0.5;0.75;1" dur="8s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="100%" stopColor="#b7eaff">
                      <animate attributeName="stop-color" values="#b7eaff;#c3b6f7;#f9c5d1;#c3b6f7;#b7eaff" keyTimes="0;0.25;0.5;0.75;1" dur="8s" repeatCount="indefinite" />
                    </stop>
                  </linearGradient>
                </defs>
                <text x="50%" y="40%" fontSize="380" textAnchor="middle" dominantBaseline="middle" fill="none" stroke="url(#aurora-gradient)" strokeWidth="5">
                  From Designer
                </text>
              </svg>
            </h1>
            <h1 className="slide-to">
              <svg className="svg-wide" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 1000">
                <defs>
                  <linearGradient id="aurora-gradient-to" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c3b6f7">
                      <animate attributeName="stop-color" values="#c3b6f7;#b7eaff;#f9c5d1;#b7eaff;#c3b6f7" keyTimes="0;0.25;0.5;0.75;1" dur="8s" repeatCount="indefinite" />
                    </stop>
                    <stop offset="100%" stopColor="#b7eaff">
                      <animate attributeName="stop-color" values="#b7eaff;#f9c5d1;#c3b6f7;#f9c5d1;#b7eaff" keyTimes="0;0.25;0.5;0.75;1" dur="8s" repeatCount="indefinite" />
                    </stop>
                  </linearGradient>
                </defs>
                <text x="50%" y="60%" fontSize="380" textAnchor="middle" dominantBaseline="middle" fill="url(#aurora-gradient-to)">
                  to Deblisher
                </text>
              </svg>
            </h1>

            <div className="slide1-content">
              <p className="slide1-title">
                안녕하세요. UX/UI 디자이너이자 퍼블리셔, 정연희입니다.
              </p>
              <p className="light-text">
                기획부터 디자인, 퍼블리싱까지 함께 고민하며<br />
                누구나 보기 쉽고, 쓰기 편한 웹을 만듭니다.<br />
                사용자 입장에서 먼저 생각하고, 만들어갑니다.
              </p>
              <div className="drag"># 오브젝트를 움직여보세요</div>
            </div>

            <div className="circle-button" id="circleButton">
              <p className="scroll-btn">스크롤하면 <br /> 다음 섹션으로 넘어갑니다</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/circle.png" alt="circle" className="circle" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/circle-arrow.svg" alt="circle-arrow" className="circle-arrow" />
            </div>

            <ThreeModel />
          </div>

          {/* ── SLIDE 2 ── */}
          <div className="slide" id="slide2">
            <div className="myself">
              <p className="myself-desc">
                편집디자인을 하며 단순히 &apos;보여주는 것&apos;을 넘어,<br />
                <em>&apos;정보를 어떻게 더 쉽게 전달할 수 있을지&apos;</em>에 관심을 갖게 되었습니다.
              </p>
              <div className="myself-container" ref={myselfContainerRef}>
                <a href="#none">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/images/cloud.svg" alt="Fixed line" className="fixed-image" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img ref={floatingImageRef} src="/assets/images/cloud-picture.png" alt="myself" className="floating-image" />
                </a>
              </div>
              <p className="myself-desc">
                그 관심이 웹으로 이어지면서,<br />
                지금은 <em>사용자가 더 편하게 사용하는 화면</em>을 만들고자 합니다.
              </p>
            </div>
          </div>

          {/* ── SLIDE 3 ── */}
          <div className="slide" id="slide3">
            <span className="serif-text left" ref={slide3LeftRef}>From Designer</span>
            <span className="serif-text right" ref={slide3RightRef}>To Deblisher</span>
          </div>

          {/* ── SLIDE 4 ── */}
          <div className="slide" id="slide4" ref={slide4Ref}>
            <section className="preview-section">
              <h2 className="slide-title serif-text">PREVIEW</h2>
              <div className="preview-container">
                <div className="preview-wrapper" ref={previewWrapperRef}>
                  <div className="preview-card">
                    <a href="/project">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/images/3d-icon1.png" alt="feather" />
                    </a>
                    <span className="tag neodgm-text">#한국소비자원 리뉴얼</span>
                  </div>
                  <div className="preview-card">
                    <a href="/project">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/images/3d-icon2.png" alt="clock" />
                    </a>
                    <span className="tag neodgm-text">#인터파크티켓 리뉴얼</span>
                  </div>
                  <div className="preview-card">
                    <a href="/">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/images/3d-icon3.png" alt="bolt" />
                    </a>
                    <span className="tag neodgm-text">#포트폴리오</span>
                  </div>
                  <div className="preview-card">
                    <a href="/project">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/images/3d-icon4.png" alt="bolt" />
                    </a>
                    <span className="tag neodgm-text">#Journee</span>
                  </div>
                  <div className="preview-card">
                    <a href="/project">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/images/3d-icon5.png" alt="bolt" />
                    </a>
                    <span className="tag neodgm-text">#클래스101</span>
                  </div>
                  <div className="preview-card">
                    <a href="/design">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/images/3d-icon6.png" alt="star" />
                    </a>
                    <span className="tag neodgm-text">#디자인 작품</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* Footer — slides up from bottom */}
        <div className="footer-include" id="slide-footer" ref={footerRef}>
          <Footer />
        </div>
      </main>
    </>
  );
}
