'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const toast = toastRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isMouseMoved = false;
    let rafId: number;

    cursor.style.opacity = '0';

    const onMouseMove = (event: MouseEvent) => {
      if (!isMouseMoved) {
        cursorX = event.clientX;
        cursorY = event.clientY;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        isMouseMoved = true;
      }
      mouseX = event.clientX;
      mouseY = event.clientY;
      cursor.style.opacity = '1';

      const target = event.target as Element;
      const hoverTarget = target.closest('span, button, h1, h2, h3, h4, h5, h6, p, img');
      const footerTarget = target.closest('.footer-include, footer');

      cursor.classList.toggle('cursor-hover', Boolean(hoverTarget));
      cursor.classList.toggle('cursor-footer', Boolean(footerTarget));
    };

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      rafId = requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(animateCursor);

    // Toast functionality
    let toastTimer: ReturnType<typeof setTimeout> | null = null;

    window.showToast = (message: string) => {
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 2000);
    };

    window.copyToClipboard = async (targetId: string) => {
      const target = document.getElementById(targetId);
      if (!target) return;
      const text = (target.textContent || '').trim();
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          // textarea fallback
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
        window.showToast?.('복사되었습니다');
      } catch (error) {
        console.error(error);
      }
    };

    window.scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      if (toastTimer) clearTimeout(toastTimer);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="global-toast" ref={toastRef} />
    </>
  );
}
