'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import Header from '@/components/Header'
import Contact from '@/components/Contact'

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

export default function ProjectPage() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const framesRef = useRef<(HTMLDivElement | null)[]>([])
  const textsRef = useRef<(HTMLDivElement | null)[]>([])
  const trackRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const scrollAmountRef = useRef(0)
  const typeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  const updateTextVisibility = useCallback((index: number) => {
    textsRef.current.forEach((text, i) => {
      if (!text || text.dataset.index === '5') return
      text.classList.remove('active')
      if (i === index) text.classList.add('active')
    })
  }, [])

  useEffect(() => {
    document.body.style.backgroundColor = 'var(--background)'

    const frames = framesRef.current.filter(Boolean) as HTMLDivElement[]
    const texts = textsRef.current.filter(Boolean) as HTMLDivElement[]
    const track = trackRef.current
    const container = containerRef.current
    const desc = descriptionRef.current

    if (!track || !container || frames.length === 0) return

    const frameHeight = window.innerHeight * 0.7
    const frameGap = 150

    // Set container height (matches original)
    container.style.height = `${frames.length * (frameHeight + frameGap) + frameHeight * 2}px`

    // Set track width (matches original)
    const totalTextWidth = texts.reduce((acc, t) => acc + t.offsetWidth, 0)
    track.style.width = `${totalTextWidth + window.innerWidth / 3}px`

    // Initial GSAP state (matches original)
    gsap.set(frames, { y: 100, opacity: 0 })
    gsap.set(track, { x: window.innerWidth })

    // syncScroll — all frames move together with same y (matches original)
    function syncScroll() {
      const maxScroll = frames.length * (frameHeight + frameGap) + frameHeight
      scrollAmountRef.current = Math.max(0, Math.min(scrollAmountRef.current, maxScroll))

      const centerY = (window.innerHeight / 2 - frameHeight / 2) - window.innerHeight * 0.025
      const index = Math.round(scrollAmountRef.current / (frameHeight + frameGap))
      const clampedTextIndex = Math.min(index, texts.length - 1)
      const clampedFrameIndex = Math.min(index, frames.length - 1)
      const targetText = texts[clampedTextIndex]
      const targetFrame = frames[clampedFrameIndex]

      // All frames move together as one strip
      gsap.to(frames, {
        y: -scrollAmountRef.current + centerY,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      })

      // Text track centers on active text using offsetLeft (matches original)
      if (targetText) {
        const offset = -targetText.offsetLeft + window.innerWidth / 2 - targetText.offsetWidth / 2
        gsap.to(track, { x: offset, duration: 1, ease: 'power2.out' })
      }

      if (targetFrame) typeDescription(targetFrame.dataset.desc ?? '')
      updateTextVisibility(index)

      // Hide description on other project (matches original)
      if (desc) {
        desc.style.display = targetText?.dataset.index === '5' ? 'none' : 'block'
      }
    }

    function handleWheel(e: WheelEvent) {
      scrollAmountRef.current += e.deltaY
      syncScroll()
    }

    const onLoad = () => {
      // Only first frame animates in (matches original)
      if (frames[0]) {
        gsap.to(frames[0], {
          y: (window.innerHeight / 2 - frameHeight / 2) - window.innerHeight * 0.05,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        })
      }

      // Center track on first text
      if (texts[0]) {
        const offset = -texts[0].offsetLeft + window.innerWidth / 2 - texts[0].offsetWidth / 2
        gsap.to(track, { x: offset, duration: 1, ease: 'power2.out' })
      }

      typeDescription(frames[0]?.dataset.desc ?? '')
      updateTextVisibility(0)

      window.addEventListener('wheel', handleWheel)
    }

    if (document.readyState === 'complete') {
      onLoad()
    } else {
      window.addEventListener('load', onLoad, { once: true })
    }

    return () => {
      document.body.style.backgroundColor = ''
      if (typeTimerRef.current) clearTimeout(typeTimerRef.current)
      window.removeEventListener('wheel', handleWheel)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeDescription, updateTextVisibility])

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
                onClick={() => router.push(project.detailHref)}
                style={{ cursor: 'pointer' }}
              >
                <a href="#none" onClick={e => e.preventDefault()}>
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
