'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface NavItem {
  href: string;
  label: React.ReactNode;
  navLabel: string;
  dataLeft: string;
  dataRight: string;
  /** href 하위 경로는 아니지만 이 항목에 속하는 경로 (예: /uiux → /detail/01) */
  matchPrefixes?: string[];
}

const NAV_ITEMS: NavItem[] = [
  {
    href: '/main',
    label: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/assets/images/nav-home.svg" alt="Home" />
    ),
    navLabel: '홈',
    dataLeft: 'Intro',
    dataRight: 'Home',
  },
  {
    href: '/about',
    label: 'ABOUT ME',
    navLabel: '자기소개',
    dataLeft: 'Explore',
    dataRight: 'About',
  },
  {
    href: '/uiux',
    label: 'UI/UX',
    navLabel: 'UI/UX 디자인',
    dataLeft: 'Create',
    dataRight: 'UI/UX',
    // 자세히보기(/detail/01~05)도 UI/UX 항목으로 취급
    matchPrefixes: ['/detail'],
  },
  {
    href: '/graphic',
    label: 'GRAPHIC',
    navLabel: '편집디자인 & 시각디자인',
    dataLeft: 'Inspire',
    dataRight: 'Graphic',
  },
  {
    href: '/ax',
    label: 'AX',
    navLabel: 'AI Transformation',
    dataLeft: 'Innovate',
    dataRight: 'AX',
  },
];

// 하위 경로(/ax/[slug], /detail/01 등)에서도 상위 nav 항목을 활성 상태로 유지
function isActiveNav(pathname: string, item: NavItem): boolean {
  if (pathname === item.href || pathname.startsWith(`${item.href}/`)) return true;
  return (item.matchPrefixes ?? []).some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export default function Header() {
  const pathname = usePathname();

  // Update nav-left2 and nav-right text based on the active nav item
  useEffect(() => {
    const activeItem = NAV_ITEMS.find((item) => isActiveNav(pathname, item));
    const navLeft2 = document.getElementById('nav-left2');
    const navRight = document.getElementById('nav-right');

    if (navLeft2) {
      navLeft2.textContent = activeItem ? activeItem.dataLeft : '';
    }
    if (navRight) {
      navRight.textContent = activeItem ? activeItem.dataRight : '';
    }
  }, [pathname]);

  return (
    <header>
      <nav className="nav header-text">
        <div className="nav-left">
          <Link href="/" prefetch={false}>
            Jeong Yeon Hui <br /> Portfolio
          </Link>
        </div>

        <div id="nav-left2">
          <a href="#none" />
        </div>

        <ul className="navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = isActiveNav(pathname, item);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-item${isActive ? ' active' : ''}`}
                  data-left={item.dataLeft}
                  data-right={item.dataRight}
                  prefetch={false}
                >
                  {item.label}
                </Link>
                <span className="nav-label">{item.navLabel}</span>
              </li>
            );
          })}
        </ul>

        <div id="nav-right">
          <a href="#none" />
        </div>

        <div className="nav-right2">
          <a href="#none">Daejeon, Korea</a>
        </div>
      </nav>
    </header>
  );
}
