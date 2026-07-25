'use client'

import { useState, useEffect, useRef } from 'react'

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false)
  const contactBtnRef = useRef<HTMLButtonElement>(null)
  const holoContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const footerInclude = document.querySelector('.footer-include')
    if (!footerInclude) return

    const handleMouseEnter = () => {
      contactBtnRef.current?.classList.add('footer-hover')
      holoContainerRef.current?.classList.add('footer-hover')
    }

    const handleMouseLeave = () => {
      contactBtnRef.current?.classList.remove('footer-hover')
      holoContainerRef.current?.classList.remove('footer-hover')
    }

    footerInclude.addEventListener('mouseenter', handleMouseEnter)
    footerInclude.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      footerInclude.removeEventListener('mouseenter', handleMouseEnter)
      footerInclude.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <>
      <button
        ref={contactBtnRef}
        className="contact"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Contact
      </button>
      <div
        ref={holoContainerRef}
        className={isOpen ? 'holo-container active' : 'holo-container'}
      >
        <div className="holo-content">
          <h3>CONTACT</h3>
          <h5>
            정연희 <em>Jeong yeon hui</em>
          </h5>
          <ul>
            <li>
              <a
                href="https://github.com/yeonflower2na?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/yeonflower2na
              </a>
            </li>
            <li>
              <a href="mailto:yeonpireo@naver.com" id="email">
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
              <a
                href="https://www.instagram.com/dongppu_daejeon/"
                target="_blank"
                rel="noopener noreferrer"
              >
                INSTAGRAM
              </a>
            </li>
            <li>Daejeon, Republic of Korea</li>
          </ul>
          <button
            className="holo-close"
            aria-label="Close contact form"
            onClick={() => setIsOpen(false)}
          ></button>
        </div>
      </div>
    </>
  )
}
