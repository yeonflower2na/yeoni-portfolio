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
    href: '/project',
    label: 'PROJECT',
    navLabel: '웹디자인 & 웹퍼블리싱',
    dataLeft: 'Create',
    dataRight: 'Projects',
  },
  {
    href: '/design',
    label: 'DESIGN',
    navLabel: '편집디자인 & 인포그래픽',
    dataLeft: 'Inspire',
    dataRight: 'Design',
  },
];

export default function Header() {
  const pathname = usePathname();

  // Update nav-left2 and nav-right text based on the active nav item
  useEffect(() => {
    const activeItem = NAV_ITEMS.find((item) => item.href === pathname);
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
          <Link href="/">
            Jeong Yeon Hui <br /> Portfolio
          </Link>
        </div>

        <div id="nav-left2">
          <a href="#none" />
        </div>

        <ul className="navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-item${isActive ? ' active' : ''}`}
                  data-left={item.dataLeft}
                  data-right={item.dataRight}
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
