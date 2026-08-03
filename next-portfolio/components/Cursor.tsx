'use client';

import { useEffect, useRef } from 'react';

/** 커서가 커지는 대상 — 실제로 누를 수 있는 요소만 */
const INTERACTIVE =
  'a, button, input, textarea, select, label, summary, [role="button"], .nav-item, .ax-zoom, .contact';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const toast = toastRef.current;

    // ── 전역 헬퍼 (커서 활성 여부와 무관하게 항상 등록) ──────────────
    let toastTimer: ReturnType<typeof setTimeout> | null = null;

    window.showToast = (message: string) => {
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add('show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
    };

    window.copyToClipboard = async (targetId: string) => {
      const target = document.getElementById(targetId);
      if (!target) return;
      const text = (target.textContent || '').trim();
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
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

    // ── 커스텀 커서 ────────────────────────────────────────────────
    // 마우스가 있는 환경에서만 사용한다 (터치·펜은 기본 동작 유지)
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!dot || !finePointer) {
      return () => {
        if (toastTimer) clearTimeout(toastTimer);
      };
    }

    const root = document.documentElement;

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;

      // 보간 없이 좌표를 그대로 반영 — 지연이 생기지 않는다
      dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;

      // 첫 이동이 확인된 뒤에야 기본 커서를 숨긴다 (스크립트 실패 시 커서가 사라지지 않도록)
      if (!root.classList.contains('has-custom-cursor')) {
        root.classList.add('has-custom-cursor');
      }
      // 창 포커스가 돌아온 뒤에도 반드시 다시 보이도록 가드 밖에서 처리
      dot.classList.add('is-visible');

      const target = event.target as Element | null;
      dot.classList.toggle(
        'is-interactive',
        Boolean(target?.closest?.(INTERACTIVE))
      );
    };

    const hide = () => dot.classList.remove('is-visible');
    const show = () => dot.classList.add('is-visible');
    const press = () => dot.classList.add('is-pressed');
    const release = () => dot.classList.remove('is-pressed');

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerdown', press, { passive: true });
    document.addEventListener('pointerup', release, { passive: true });
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseenter', show);
    window.addEventListener('blur', hide);
    window.addEventListener('focus', show);

    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerdown', press);
      document.removeEventListener('pointerup', release);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseenter', show);
      window.removeEventListener('blur', hide);
      window.removeEventListener('focus', show);
      root.classList.remove('has-custom-cursor');
      if (toastTimer) clearTimeout(toastTimer);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true">
        <span className="cursor-core" />
        <span className="cursor-ring" />
      </div>
      <div className="global-toast" ref={toastRef} />
    </>
  );
}
