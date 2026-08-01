'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <div className="footer-include">
      <footer>
        <div className="white-bg"></div>
        <div className="footer-content">
          <h1 className="footer-tit">UIUX 디자이너 &amp; 퍼블리셔 정연희입니다</h1>
          <div className="footer-logo header-text">
            <a href="#none">
              Jeong Yeon Hui <br /> Portfolio
            </a>
          </div>
          <ul>
            <li>
              <a href="mailto:yeonpireo@naver.com" id="email" target="_blank" rel="noopener noreferrer">
                yeonpireo@naver.com
              </a>
              <button
                className="copy-btn"
                aria-label="Copy email"
                onClick={() => window.copyToClipboard?.('email')}
              ></button>
            </li>
            <li id="phone">
              +82)10 2025 3605
              <button
                className="copy-btn"
                aria-label="Copy phone"
                onClick={() => window.copyToClipboard?.('phone')}
              ></button>
            </li>
            <li>
              <a href="https://github.com/yeonflower2na" target="_blank" rel="noopener noreferrer">
                github.com/yeonflower2na
              </a>
            </li>
          </ul>
          <p className="thank-you neodgm-text">THANK YOU FOR YOUR TIME</p>
          <div className="footer-icon">
            <Image
              src="/assets/images/footer-icon.svg"
              alt="footer-icon"
              width={100}
              height={100}
            />
          </div>
          <Link
            href="/main"
            className="home-btn serif-text"
            prefetch={false}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            HOME
          </Link>
        </div>
      </footer>
    </div>
  )
}
