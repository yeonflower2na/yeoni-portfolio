'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import Header from '@/components/Header'
import Contact from '@/components/Contact'

// ── Project data ──────────────────────────────────────────────────────────────
interface ProjectItem {
  index: number
  image: string
  alt: string
  desc: string
  textName: string
  siteLabel: string
  siteHref: string
  detailHref: string
}

const PROJECTS: ProjectItem[] = [
  {
    index: 0,
    image: '/assets/images/project1.jpg',
    alt: '한국소비자원 리뉴얼 디자인',
    desc: '01_ 한국소비자원 리뉴얼 디자인',
    textName: 'Korea Consumer Agency',
    siteLabel: '사이트 바로가기',
    siteHref: 'https://yeonflower2na.github.io/Korea-Consumer-Agency-Renual/',
    detailHref: '/detail/01',
  },
  {
    index: 1,
    image: '/assets/images/project2-2.JPG',
    alt: '인터파크티켓 리뉴얼 디자인',
    desc: '02_ [팀프로젝트] 인터파크티켓 리뉴얼 디자인',
    textName: 'Interpark Ticket',
    siteLabel: '사이트 바로가기',
    siteHref: 'https://yeonflower2na.github.io/InterparkTicket-renewal/',
    detailHref: '/detail/02',
  },
  {
    index: 2,
    image: '/assets/images/project3.jpg',
    alt: '포트폴리오 디자인',
    desc: '03_ 포트폴리오 디자인',
    textName: 'Portfolio',
    siteLabel: '사이트 바로가기',
    siteHref: '/',
    detailHref: '/detail/03',
  },
  {
    index: 3,
    image: '/assets/images/project3-1.png',
    alt: '[REACT] Jurnee',
    desc: '04_ React [ 팀프로젝트 - 여행 플랜사이트 기획]',
    textName: 'Jurnee',
    siteLabel: '피그마 바로가기',
    siteHref: 'https://www.figma.com/design/JNciWgiMjkwY96yDsCd1Re/Shift-Left_Figma?node-id=1-2&t=hz56c0sZ4B0unay7-1',
    detailHref: '/detail/04',
  },
  {
    index: 4,
    image: '/assets/images/project6.JPG',
    alt: '[SASS] 클래스101 클론코딩',
    desc: '05_ [SASS] 클래스101 클론코딩',
    textName: 'Class101',
    siteLabel: '사이트 바로가기',
    siteHref: 'https://yeonflower2na.github.io/class101/#none',
    detailHref: '/detail/05',
  },
]

// ── Component ─────────────────────────────────────────────────────────────────
export default function ProjectPage() {
  const router = useRouter()

  // DOM refs
  const containerRef = useRef<HTMLDivElement>(null)
  const framesRef = useRef<(HTMLDivElement | null)[]>([])
  const textsRef = useRef<(HTMLDivElement | null)[]>([])
  const trackRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)

  // Scroll state
  const scrollAmountRef = useRef(0)
  const frameHeightRef = useRef(0)
  const frameGapRef = useRef(150)
  const currentIndexRef = useRef(0)
  const typeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isAnimatingRef = useRef(false)

  // ── Typing effect ──────────────────────────────────────────────────────────
  const typeDescription = useCallback((text: string) => {
    if (typeTimerRef.current) clearTimeout(typeTimerRef.current)
    const el = descriptionRef.current
    if (!el) return
    el.textContent = ''
    let i = 0
    const type = () => {
      if (i < text.length) {
        el.textContent += text[i]
        i++
        typeTimerRef.current = setTimeout(type, 50)
      }
    }
    type()
  }, [])

  // ── Update text visibility ─────────────────────────────────────────────────
  const updateTextVisibility = useCallback((activeIndex: number) => {
    textsRef.current.forEach((text, i) => {
      if (!text) return
      const isActive = i === activeIndex
      text.classList.toggle('active', isActive)
      text.classList.toggle('hidden', false) // never hide, just active class
    })
  }, [])

  // ── Sync scroll ────────────────────────────────────────────────────────────
  const syncScroll = useCallback(() => {
    const frameHeight = frameHeightRef.current
    const frameGap = frameGapRef.current
    const totalStep = frameHeight + frameGap
    const frames = framesRef.current
    const maxIndex = PROJECTS.length - 1

    // Clamp scrollAmount
    const minScroll = 0
    const maxScroll = maxIndex * totalStep
    scrollAmountRef.current = Math.max(minScroll, Math.min(maxScroll, scrollAmountRef.current))

    const rawIndex = scrollAmountRef.current / totalStep
    const targetIndex = Math.round(rawIndex)
    currentIndexRef.current = Math.max(0, Math.min(maxIndex, targetIndex))

    // Animate frames
    frames.forEach((frame, i) => {
      if (!frame) return
      const offset = i - currentIndexRef.current
      const yTarget = offset * totalStep
      gsap.to(frame, {
        y: yTarget,
        opacity: i === currentIndexRef.current ? 1 : 0.4,
        duration: 0.6,
        ease: 'power2.out',
      })
    })

    // Animate text track
    animateTrack(currentIndexRef.current)
    updateTextVisibility(currentIndexRef.current)
    typeDescription(PROJECTS[currentIndexRef.current]?.desc ?? '')
  }, [typeDescription, updateTextVisibility])

  // ── Animate text track ─────────────────────────────────────────────────────
  const animateTrack = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const textEls = textsRef.current
    if (!textEls[index]) return

    // Calculate cumulative width up to the active text element
    let totalOffset = 0
    for (let i = 0; i < index; i++) {
      const el = textEls[i]
      if (el) totalOffset += el.offsetWidth
    }
    const activeEl = textEls[index]
    const activeWidth = activeEl ? activeEl.offsetWidth : 0
    const centerOffset = window.innerWidth / 2 - totalOffset - activeWidth / 2
    gsap.to(track, {
      x: centerOffset,
      duration: 0.6,
      ease: 'power2.out',
    })
  }

  // ── Wheel handler ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const frameHeight = frameHeightRef.current
      const frameGap = frameGapRef.current
      const totalStep = frameHeight + frameGap
      const maxScroll = (PROJECTS.length - 1) * totalStep

      scrollAmountRef.current += e.deltaY
      scrollAmountRef.current = Math.max(0, Math.min(maxScroll, scrollAmountRef.current))
      syncScroll()
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [syncScroll])

  // ── Mount/init ─────────────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.backgroundColor = 'var(--background)'

    frameHeightRef.current = window.innerHeight * 0.7
    frameGapRef.current = 150

    const frames = framesRef.current
    const track = trackRef.current

    // Set initial positions with gsap
    frames.forEach(frame => {
      if (!frame) return
      gsap.set(frame, { y: 100, opacity: 0 })
    })

    if (track) {
      gsap.set(track, { x: window.innerWidth })
    }

    // On window load, animate first frame to center and track to center first text
    const onLoad = () => {
      // Animate first frame to y:0, opacity:1
      if (frames[0]) {
        gsap.to(frames[0], { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' })
      }
      // Animate remaining frames to stacked positions
      frames.forEach((frame, i) => {
        if (!frame || i === 0) return
        const totalStep = frameHeightRef.current + frameGapRef.current
        gsap.to(frame, { y: i * totalStep, opacity: 0.4, duration: 0.8, ease: 'power2.out', delay: i * 0.05 })
      })

      // Center track on first text
      animateTrack(0)
      updateTextVisibility(0)
      typeDescription(PROJECTS[0].desc)
    }

    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    return () => {
      document.body.style.backgroundColor = ''
      if (typeTimerRef.current) clearTimeout(typeTimerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Frame click: navigate ──────────────────────────────────────────────────
  const handleFrameClick = (index: number) => {
    const padded = String(index + 1).padStart(2, '0')
    router.push(`/detail/${padded}`)
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <Header />
      <section className="project">
        <div className="container" ref={containerRef}>
          <div className="project_frames">
            {PROJECTS.map((project, i) => (
              <div
                key={project.index}
                className="project_frame"
                data-index={project.index}
                data-desc={project.desc}
                ref={el => { framesRef.current[i] = el }}
                onClick={() => handleFrameClick(project.index)}
                style={{ cursor: 'pointer' }}
              >
                <a
                  href="#none"
                  onClick={e => e.preventDefault()}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.image} alt={project.alt} />
                </a>
              </div>
            ))}
          </div>

          <div className="scroll-wrapper">
            <div className="project_texts" ref={trackRef}>
              {PROJECTS.map((project, i) => (
                <div
                  key={project.index}
                  className="project_text"
                  data-index={project.index}
                  ref={el => { textsRef.current[i] = el }}
                >
                  <span className="num">({String(project.index + 1).padStart(2, '0')})</span>
                  {project.textName}
                  <div className="shoutcut">
                    <a
                      href={project.siteHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                    >
                      {project.siteLabel}
                    </a>
                    <a
                      href={project.detailHref}
                      onClick={e => e.stopPropagation()}
                    >
                      자세히보기
                    </a>
                  </div>
                </div>
              ))}
              <div
                className="project_text other_projectt"
                data-index={5}
                data-nav="other"
                ref={el => { textsRef.current[PROJECTS.length] = el }}
              >
                <a
                  href="https://github.com/yeonflower2na?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OTHER PROJECT
                </a>
              </div>
            </div>
          </div>

          <div className="description">
            <p id="dynamicDescription" ref={descriptionRef}></p>
          </div>
        </div>
      </section>
      <Contact />
    </>
  )
}
