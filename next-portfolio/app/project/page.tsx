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
    image: '/assets/images/project7.png',
    alt: 'Samitech',
    desc: '01_ Samitech',
    textName: 'Samitech',
    siteLabel: '사이트 바로가기',
    siteHref: 'https://www.samitech.kr/',
    detailHref: 'https://www.samitech.kr/',
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
    image: '/assets/images/project1.jpg',
    alt: '한국소비자원 리뉴얼 디자인',
    desc: '03_ 한국소비자원 리뉴얼 디자인',
    textName: 'Korea Consumer Agency',
    siteLabel: '사이트 바로가기',
    siteHref: 'https://yeonflower2na.github.io/Korea-Consumer-Agency-Renual/',
    detailHref: '/detail/01',
  },
  {
    index: 3,
    image: '/assets/images/project3.jpg',
    alt: '포트폴리오 디자인',
    desc: '04_ 포트폴리오 디자인',
    textName: 'Portfolio',
    siteLabel: '사이트 바로가기',
    siteHref: '/',
    detailHref: '/detail/03',
  },
  {
    index: 4,
    image: '/assets/images/project3-1.png',
    alt: '[REACT] Jurnee',
    desc: '05_ React [ 팀프로젝트 - 여행 플랜사이트 기획]',
    textName: 'Jurnee',
    siteLabel: '피그마 바로가기',
    siteHref: 'https://www.figma.com/design/JNciWgiMjkwY96yDsCd1Re/Shift-Left_Figma?node-id=1-2&t=hz56c0sZ4B0unay7-1',
    detailHref: '/detail/04',
  },
  {
    index: 5,
    image: '/assets/images/project6.JPG',
    alt: '[SASS] 클래스101 클론코딩',
    desc: '06_ [SASS] 클론코딩 클래스101',
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
  const wheelHandlerRef = useRef<((e: WheelEvent) => void) | null>(null)

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

    const frameGap = 150

    // Initial GSAP state
    gsap.set(frames, { y: 100, opacity: 0 })
    gsap.set(track, { x: window.innerWidth })

    const onLoad = () => {
      // Measure actual rendered height of each frame (after images load)
      const frameHeights = frames.map(f => f.offsetHeight)

      // Cumulative Y offset of each frame in the flex column
      const offsets: number[] = []
      let acc = 0
      for (const h of frameHeights) {
        offsets.push(acc)
        acc += h + frameGap
      }

      // Container height based on actual image heights
      container.style.height = `${acc + frameHeights[frameHeights.length - 1]}px`

      // Track width
      const totalTextWidth = texts.reduce((sum, t) => sum + t.offsetWidth, 0)
      track.style.width = `${totalTextWidth + window.innerWidth / 3}px`

      // Find nearest frame index by closest offset
      function findActiveIndex() {
        let idx = 0
        let minDist = Math.abs(scrollAmountRef.current - offsets[0])
        for (let i = 1; i < offsets.length; i++) {
          const dist = Math.abs(scrollAmountRef.current - offsets[i])
          if (dist < minDist) { minDist = dist; idx = i }
        }
        return idx
      }

      function syncScroll() {
        const maxScroll = offsets[frames.length - 1] + frameHeights[frames.length - 1] + frameGap
        scrollAmountRef.current = Math.max(0, Math.min(scrollAmountRef.current, maxScroll))

        const activeIndex = findActiveIndex()
        const activeHeight = frameHeights[activeIndex]
        const activeOffset = offsets[activeIndex]
        const centerY = window.innerHeight / 2 - activeHeight / 2 - window.innerHeight * 0.025

        // All frames move together as one strip
        gsap.to(frames, {
          y: -activeOffset + centerY,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        })

        const clampedTextIndex = Math.min(activeIndex, texts.length - 1)
        const targetText = texts[clampedTextIndex]
        if (targetText) {
          const offset = -targetText.offsetLeft + window.innerWidth / 2 - targetText.offsetWidth / 2
          gsap.to(track, { x: offset, duration: 1, ease: 'power2.out' })
        }

        const targetFrame = frames[Math.min(activeIndex, frames.length - 1)]
        if (targetFrame) typeDescription(targetFrame.dataset.desc ?? '')
        updateTextVisibility(activeIndex)

        if (desc) {
          desc.style.display = targetText?.dataset.index === '5' ? 'none' : 'block'
        }
      }

      function handleWheel(e: WheelEvent) {
        scrollAmountRef.current += e.deltaY
        syncScroll()
      }

      // Initial animation: center first frame at its actual height
      const initY = window.innerHeight / 2 - frameHeights[0] / 2 - window.innerHeight * 0.05
      gsap.to(frames[0], { y: initY, opacity: 1, duration: 1, ease: 'power2.out' })

      if (texts[0]) {
        const offset = -texts[0].offsetLeft + window.innerWidth / 2 - texts[0].offsetWidth / 2
        gsap.to(track, { x: offset, duration: 1, ease: 'power2.out' })
      }

      typeDescription(frames[0]?.dataset.desc ?? '')
      updateTextVisibility(0)

      wheelHandlerRef.current = handleWheel
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
      if (wheelHandlerRef.current) window.removeEventListener('wheel', wheelHandlerRef.current)
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
                onClick={() => {
                  if (project.detailHref.startsWith('http')) {
                    window.open(project.detailHref, '_blank')
                  } else {
                    router.push(project.detailHref)
                  }
                }}
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
                    {' '}
                    <a
                      href={project.detailHref}
                      target={project.detailHref.startsWith('http') ? '_blank' : undefined}
                      rel={project.detailHref.startsWith('http') ? 'noopener noreferrer' : undefined}
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
                  OTHER UI/UX
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
