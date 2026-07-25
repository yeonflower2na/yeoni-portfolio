'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Header from '@/components/Header'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// ── Skill data ────────────────────────────────────────────────────────────────
const SKILLS = [
  { name: 'VScode',      image: '/assets/images/skill1.png',  level: 85,  desc: 'HTML, CSS, JavaScript 등 다양한 코드를 작성하고 수정하며, 자동으로 코드를 정리하고 오류를 확인합니다. 터미널에서 명령어를 실행하고 Git과 연동해 파일을 저장하고 관리합니다. 프로젝트에서는 팀과 함께 코드를 수정하고 피드백을 주고받으며 작업한 경험이 있습니다.' },
  { name: 'Figma',       image: '/assets/images/skill2.png',  level: 90,  desc: '디자인 작업에서 Figma를 사용하며, 웹사이트의 와이어프레임과 프로토타입을 만듭니다. 컴포넌트를 활용해 디자인을 체계적으로 정리하고, 팀원들과 함께 실시간으로 디자인을 수정합니다. 디자인을 마친 후에는 HTML/CSS 퍼블리싱을 고려해 요소별로 정리합니다.' },
  { name: 'HTML',        image: '/assets/images/skill3.png',  level: 85,  desc: 'HTML을 사용하여 웹 페이지의 구조를 작성하며, 태그의 의미와 역할에 맞게 사용하는 것을 중요하게 생각합니다. 웹 표준을 준수하며, 다양한 요소를 활용해 웹사이트를 구성합니다.' },
  { name: 'CSS',         image: '/assets/images/skill4.png',  level: 88,  desc: 'CSS로 웹사이트의 스타일을 적용하고, 레이아웃을 설계합니다. 주로 Flexbox와 Grid를 활용하며, 반응형 웹 디자인을 구현합니다. 애니메이션 효과를 사용하여 사용자 경험을 향상시킵니다.' },
  { name: 'JavaScript', image: '/assets/images/skill5.png',  level: 75,  desc: 'JavaScript로 웹 페이지에 인터랙티브 기능을 추가합니다. DOM을 조작하고, 이벤트를 처리하며, 비동기 프로그래밍을 활용합니다. 주로 웹 페이지의 동적인 요소를 구현하는 데 사용합니다.' },
  { name: 'React',       image: '/assets/images/skill6.png',  level: 70,  desc: 'React를 사용하여 컴포넌트 기반의 웹 애플리케이션을 개발합니다. useState, useEffect 등의 훅을 활용하며, 컴포넌트 간 데이터 전달을 위해 props를 사용합니다.' },
  { name: 'Sass',        image: '/assets/images/skill7.png',  level: 75,  desc: 'CSS 전처리기인 Sass를 사용하여 CSS를 더 효율적으로 작성합니다. 변수, 믹스인, 중첩 등의 기능을 활용하여 코드를 모듈화하고 유지보수성을 높입니다.' },
  { name: 'Photoshop',  image: '/assets/images/skill8.png',  level: 90,  desc: 'Photoshop을 사용하여 이미지를 편집하고 그래픽 디자인 작업을 합니다. 레이어, 마스크, 필터 등의 기능을 활용하며, 다양한 포맷의 이미지를 처리합니다.' },
  { name: 'Illustrator',image: '/assets/images/skill9.png',  level: 95,  desc: 'Illustrator를 사용하여 벡터 그래픽을 제작합니다. 로고 디자인, 일러스트레이션, 인포그래픽 등 다양한 작업을 수행합니다.' },
  { name: 'Indesign',   image: '/assets/images/skill10.png', level: 88,  desc: 'InDesign을 사용하여 출판물, 브로셔, 카탈로그 등의 편집 디자인 작업을 수행합니다. 텍스트와 이미지를 조합하여 전문적인 레이아웃을 만듭니다.' },
  { name: 'Github',     image: '/assets/images/skill11.png', level: 60,  desc: 'GitHub를 사용하여 코드를 관리하고 협업합니다. 브랜치를 생성하고 병합하며, Pull Request를 통해 코드 리뷰를 진행합니다.' },
]

const POSITIONS = [
  'left-4', 'left-3', 'left-2', 'left-1', 'left',
  'center',
  'right', 'right-1', 'right-2', 'right-3', 'right-4',
]

const SKILL_LEVELS: Record<string, number> = {
  VScode: 85, Figma: 90, HTML: 85, CSS: 88, JavaScript: 75,
  React: 70, Sass: 75, Photoshop: 90, Illustrator: 95, Indesign: 88, Github: 60,
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const autoRotateRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const circleButtonRef = useRef<HTMLDivElement>(null)
  const horizontalScrollRef = useRef<HTMLElement>(null)
  const skillsWrapperRef = useRef<HTMLDivElement>(null)

  // Set body background
  useEffect(() => {
    document.body.style.backgroundColor = 'var(--white)'
    return () => { document.body.style.backgroundColor = '' }
  }, [])

  // ── Page navigation (circle button only, matching original) ────────────────
  const moveToPage3 = useCallback(() => {
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.style.transform = 'translateX(-100vw)'
    }
    if (circleButtonRef.current) {
      circleButtonRef.current.classList.add('hidden')
    }
  }, [])

  const moveToPage2 = useCallback(() => {
    if (horizontalScrollRef.current) {
      horizontalScrollRef.current.style.transform = 'translateX(0vw)'
    }
    setTimeout(() => {
      if (circleButtonRef.current) {
        circleButtonRef.current.classList.remove('hidden')
      }
    }, 800)
  }, [])

  // ── about01 hover (matching original) ────────────────────────────────────
  useEffect(() => {
    const about01 = document.querySelector<HTMLElement>('.about01')
    if (!about01) return
    const onEnter = () => about01.classList.add('hover')
    const onLeave = () => about01.classList.remove('hover')
    about01.addEventListener('mouseenter', onEnter)
    about01.addEventListener('mouseleave', onLeave)
    return () => {
      about01.removeEventListener('mouseenter', onEnter)
      about01.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  // ── Modal span animation (matching original showModalSpans) ───────────────
  useEffect(() => {
    if (isModalOpen) {
      const spans = document.querySelectorAll<HTMLElement>('.modal-content h4 span')
      spans.forEach((span, i) => {
        setTimeout(() => span.classList.add('fade-in'), i * 100)
      })
    }
  }, [isModalOpen])

  // ── Close modal on outside click (matching original) ─────────────────────
  useEffect(() => {
    if (!isModalOpen) return
    const onWindowClick = (e: MouseEvent) => {
      const modal = document.querySelector('.modal')
      const btn = document.querySelector('.aboutme-text')
      if (modal && btn && !modal.contains(e.target as Node) && !btn.contains(e.target as Node)) {
        setIsModalOpen(false)
      }
    }
    window.addEventListener('click', onWindowClick)
    return () => window.removeEventListener('click', onWindowClick)
  }, [isModalOpen])

  // ── Skills auto-rotate ─────────────────────────────────────────────────────
  const startAutoRotate = useCallback(() => {
    if (autoRotateRef.current) clearInterval(autoRotateRef.current)
    autoRotateRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % SKILLS.length)
    }, 5000)
  }, [])

  useEffect(() => {
    startAutoRotate()
    return () => { if (autoRotateRef.current) clearInterval(autoRotateRef.current) }
  }, [startAutoRotate])

  // ── Carousel drag ──────────────────────────────────────────────────────────
  useEffect(() => {
    const wrapper = skillsWrapperRef.current
    if (!wrapper) return

    const DRAG_THRESHOLD = 80

    const onMouseDown = (e: MouseEvent) => { isDraggingRef.current = true; dragStartXRef.current = e.clientX; clearInterval(autoRotateRef.current!) }
    const onTouchStart = (e: TouchEvent) => { isDraggingRef.current = true; dragStartXRef.current = e.touches[0].clientX }
    const onMouseEnter = () => { if (autoRotateRef.current) clearInterval(autoRotateRef.current) }
    const onMouseLeave = () => { isDraggingRef.current = false; startAutoRotate() }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return
      const diff = e.clientX - dragStartXRef.current
      if (diff > DRAG_THRESHOLD) { setCurrentIndex(prev => (prev - 1 + SKILLS.length) % SKILLS.length); isDraggingRef.current = false }
      else if (diff < -DRAG_THRESHOLD) { setCurrentIndex(prev => (prev + 1) % SKILLS.length); isDraggingRef.current = false }
    }
    const onMouseUp = () => { isDraggingRef.current = false }
    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return
      const diff = e.touches[0].clientX - dragStartXRef.current
      if (diff > DRAG_THRESHOLD) { setCurrentIndex(prev => (prev - 1 + SKILLS.length) % SKILLS.length); isDraggingRef.current = false }
      else if (diff < -DRAG_THRESHOLD) { setCurrentIndex(prev => (prev + 1) % SKILLS.length); isDraggingRef.current = false }
    }
    const onTouchEnd = () => { isDraggingRef.current = false }

    wrapper.addEventListener('mousedown', onMouseDown)
    wrapper.addEventListener('touchstart', onTouchStart)
    wrapper.addEventListener('mouseenter', onMouseEnter)
    wrapper.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('touchmove', onTouchMove)
    document.addEventListener('touchend', onTouchEnd)

    return () => {
      wrapper.removeEventListener('mousedown', onMouseDown)
      wrapper.removeEventListener('touchstart', onTouchStart)
      wrapper.removeEventListener('mouseenter', onMouseEnter)
      wrapper.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
    }
  }, [startAutoRotate])

  // ── Skills progress bar animation (matching original updateProgressBar) ────
  function getPositionClass(cardIndex: number, total: number): string {
    const offset = ((cardIndex - currentIndex) % total + total) % total
    if (offset < POSITIONS.length) return `skills-card-${POSITIONS[offset]}`
    return 'skills-card-left-4'
  }

  function isCenter(cardIndex: number): boolean {
    return ((cardIndex - currentIndex) % SKILLS.length + SKILLS.length) % SKILLS.length === 0
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <Header />
      <div className="about-page">
        {/* Left fixed panel */}
        <section className="left-fixed">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/profile.png" alt="프로필사진" />
        </section>

        {/* Right scroll panel (native scroll, 200vh) */}
        <section className="right-scroll">
          {/* Page 1 */}
          <div className="page" id="page1">
            <div className="education">
              <div className="about-container">
                <h2 className="serif-text">Education</h2>
                <div className="about-box">
                  <h6>2011 ~ 2014</h6>
                  <p>원광정보예술고등학교 <span>[ 미술과 ]</span></p>
                </div>
                <div className="about-box">
                  <h6>2014 ~ 2018</h6>
                  <p>목원대학교 미술교육과 <span>[ 서양화 전공 ]</span></p>
                </div>
                <div className="about-box">
                  <h6>2018.09 ~ 2019.01</h6>
                  <p>시각디자인 과정 <span>[ 그린컴퓨터아트학원 ]</span></p>
                </div>
                <div className="about-box">
                  <h6>2024.07 <span>-강연-</span></h6>
                  <p>인디자인 프로그램 기초 <span>[ 한밭대학교 ]</span></p>
                </div>
              </div>
              <div className="about-item about-item1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/about01.png" alt="about01" className="about01" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/about02.png" alt="about02" className="about02" />
              </div>
            </div>

            <div className="experience">
              <div className="about-container">
                <h2 className="serif-text">Experience</h2>
                <div className="about-box">
                  <h6>2018.01 ~ 2018.03</h6>
                  <p>관저음악미술센터 <span>[ 아동미술교사 ]</span></p>
                </div>
                <div className="about-box">
                  <h6>2019.04 ~ 2024.08</h6>
                  <p>서우기획 (충청투데이) <span>[ 편집디자인 ] - 대리</span></p>
                </div>
                <div className="about-box">
                  <h6>2025.02 ~</h6>
                  <p>사미텍 <span>[ UIUX 디자이너 &amp; 퍼블리셔 ]</span></p>
                </div>
              </div>
              <div className="about-item about-item2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/about03.png" alt="about03" className="about03" />
              </div>
            </div>
          </div>

          {/* Page 2 */}
          <div className="page" id="page2">
            <div className="about-me">
              <div className="about-item about-item3">
                <button className="modal-open" onClick={() => setIsModalOpen(true)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/images/aboutme.png" alt="About me" className="aboutme-text" />
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/about04.png" alt="about04" className="about04" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/profile2.png" alt="profile2" className="profile2" />
              </div>

              <div className="about-container certification">
                <h2 className="serif-text">Certification</h2>
                <div className="about-box">
                  <h6>2024.12</h6>
                  <p>웹디자인기능사</p>
                </div>
                <div className="about-box">
                  <h6>2019.04</h6>
                  <p>컴퓨터그래픽스운용기능사</p>
                </div>
                <div className="about-box">
                  <h6>2018.02</h6>
                  <p>중등학교 정교사 2급 <span>[ 미술 ]</span></p>
                </div>
                <div className="about-box">
                  <h6>2016.02</h6>
                  <p>미술치료자격증 1급</p>
                </div>
                <div className="about-box">
                  <h6>2016.02</h6>
                  <p>미술치료자격증 2급</p>
                </div>
              </div>

              {/* Modal */}
              <div className={`modal${isModalOpen ? ' show' : ''}`}>
                <button className="modal-close" onClick={() => setIsModalOpen(false)} />
                <div className="modal-content">
                  <h4>
                    <span>기획과 개발을 연결해</span>
                    <span>가치를 만드는 디자이너</span>
                    <span>정연희입니다.</span>
                  </h4>
                  <div className="modal-desc">
                    <p>
                      디자인은 문제를 해결하고, 메시지를 쉽게 전달하는 도구라고 생각합니다.<br />
                      신문사에서 그래픽 디자이너로 일하며 복잡한 정보를 시각적으로 정리하고,<br />
                      기자들과 협업해 독자가 이해하기 쉬운 결과물을 만들었습니다.
                    </p>
                    <p>
                      이 경험을 바탕으로 웹에 관심이 생겼고,<br />
                      &apos;어떻게 하면 더 편하게 쓸 수 있을까&apos;를 고민하며<br />
                      UX/UI 설계와 퍼블리싱까지 함께하게 되었습니다.
                    </p>
                    <p>
                      지금은 사용자 흐름을 고려한 화면을 직접 만들며,<br />
                      기획 의도를 이해하고 디자인과 마크업을 함께 다룹니다.<br />
                      작은 인터랙션도 사용자 입장에서 접근하려고 노력합니다.
                    </p>
                    <p>
                      협업을 통해 더 나은 결과를 만드는 데 보람을 느끼며,<br />
                      앞으로도 꾸준히 배우고 성장하는 디자이너가 되겠습니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* Circle button — click goes to page3 */}
              <div
                className="circle-button"
                id="circleButton"
                ref={circleButtonRef}
                onClick={moveToPage3}
              >
                <p className="scroll-btn">클릭하면 <br /> 다음 섹션으로 넘어갑니다</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/circle.png" alt="circle" className="circle" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/circle-arrow.svg" alt="circle-arrow" className="circle-arrow" />
              </div>
            </div>
          </div>
        </section>

        {/* Horizontal scroll: page3 + footer (fixed, slides in from right) */}
        <section className="horizontal-scroll" id="aboutMe" ref={horizontalScrollRef}>
          <div className="page" id="page3">
            <div className="skills-section">
              <h2 className="slide-title serif-text">SKILLS</h2>
              <div className="skills-container">
                <div
                  className="skills-wrapper"
                  ref={skillsWrapperRef}
                >
                  {SKILLS.map((skill, i) => {
                    const posClass = getPositionClass(i, SKILLS.length)
                    const center = isCenter(i)
                    const percentage = SKILL_LEVELS[skill.name] || 50
                    return (
                      <div key={skill.name} className={`skills-card ${posClass}`}>
                        <a href="#none">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={skill.image} alt={skill.name} />
                          <h2>{skill.name}</h2>
                          <div className="skills-progress" style={{ display: center ? 'block' : 'none' }}>
                            <div
                              className="skills-progress-bar"
                              style={{ width: center ? `${percentage}%` : '0%' }}
                            />
                            <span
                              className="skills-progress-percent"
                              style={{ color: center && percentage >= 50 ? 'white' : 'var(--black)' }}
                            >
                              {center ? `${percentage}%` : '0%'}
                            </span>
                          </div>
                          <p>{skill.desc}</p>
                        </a>
                        <span className="tag">#{skill.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="footer-include" id="about-footer">
            <Footer />
          </div>
        </section>
      </div>

      <Contact />
    </>
  )
}
