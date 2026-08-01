'use client'

import { useEffect, useLayoutEffect, useRef, useCallback } from 'react'
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
    detailHref: '/detail/06',
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

export default function UiuxPage() {
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
      if (!text) return
      if (text.dataset.nav === 'other') {
        // OTHER element: active only when scroll reaches the virtual OTHER stop (index = PROJECTS.length)
        text.classList.toggle('active', index >= PROJECTS.length)
      } else {
        text.classList.remove('active')
        if (i === index) text.classList.add('active')
      }
    })
  }, [])

  // Phase 1 — useLayoutEffect: runs synchronously before browser paints
  // This ensures texts are visible immediately on both SSR hydration and client navigation
  useLayoutEffect(() => {
    const texts = textsRef.current.filter(Boolean) as HTMLDivElement[]
    const track = trackRef.current
    const container = containerRef.current
    const frames = framesRef.current.filter(Boolean) as HTMLDivElement[]

    if (!track || !container || frames.length === 0) return

    const frameGap = 150
    const snapStride = window.innerHeight * 0.7 + frameGap

    document.body.style.backgroundColor = 'var(--background)'

    // Kill any lingering tweens from a previous mount before touching the track
    gsap.killTweensOf(track)
    gsap.killTweensOf(frames)

    // Hide frames before first paint
    gsap.set(frames, { y: 100, opacity: 0 })

    // Set container height
    container.style.height = `${frames.length * snapStride + window.innerHeight * 0.7 * 2}px`

    // Reset inline width so flex items measure against natural container width (1280px),
    // not a stale value from a previous mount (Strict Mode reuses DOM elements)
    track.style.width = ''
    const totalTextWidth = texts.reduce((sum, t) => sum + t.offsetWidth, 0)
    track.style.width = `${totalTextWidth + window.innerWidth / 3}px`
    if (texts[0]) {
      const offset = -texts[0].offsetLeft + window.innerWidth / 2 - texts[0].offsetWidth / 2
      gsap.set(track, { x: offset })
    }
    typeDescription(frames[0]?.dataset.desc ?? '')
    updateTextVisibility(0)

    return () => {
      document.body.style.backgroundColor = ''
      if (typeTimerRef.current) clearTimeout(typeTimerRef.current)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeDescription, updateTextVisibility])

  // Phase 2 — useEffect: async image loading, frame animation, wheel listener
  useEffect(() => {
    const frames = framesRef.current.filter(Boolean) as HTMLDivElement[]
    const texts = textsRef.current.filter(Boolean) as HTMLDivElement[]
    const track = trackRef.current
    const desc = descriptionRef.current

    if (!track || frames.length === 0) return

    const frameGap = 150
    const snapStride = window.innerHeight * 0.7 + frameGap

    scrollAmountRef.current = 0

    let frameHeights: number[] = []
    let offsets: number[] = []

    function syncScroll() {
      const maxScroll = frames.length * snapStride + window.innerHeight * 0.7
      scrollAmountRef.current = Math.max(0, Math.min(scrollAmountRef.current, maxScroll))

      const index = Math.round(scrollAmountRef.current / snapStride)
      const frameIndex = Math.min(index, frames.length - 1)

      const activeHeight = frameHeights[frameIndex] || window.innerHeight * 0.7
      const activeOffset = index < frames.length
        ? (offsets[frameIndex] ?? 0)
        : (offsets[offsets.length - 1] ?? 0)
      const centerY = window.innerHeight / 2 - activeHeight / 2 - window.innerHeight * 0.025

      gsap.to(frames, { y: -activeOffset + centerY, opacity: 1, duration: 1, ease: 'power2.out' })

      const clampedTextIndex = Math.min(index, texts.length - 1)
      const targetText = texts[clampedTextIndex]
      if (targetText) {
        const offset = -targetText.offsetLeft + window.innerWidth / 2 - targetText.offsetWidth / 2
        gsap.to(track, { x: offset, duration: 1, ease: 'power2.out' })
      }

      if (index < frames.length) typeDescription(frames[frameIndex]?.dataset.desc ?? '')
      updateTextVisibility(index)

      if (desc) {
        desc.style.display = targetText?.dataset.nav === 'other' ? 'none' : 'block'
      }
    }

    const afterImagesLoaded = () => {
      frameHeights = frames.map(f => f.offsetHeight)
      let acc = 0
      for (const h of frameHeights) {
        offsets.push(acc)
        acc += h + frameGap
      }
      offsets.push(acc) // virtual OTHER stop

      const initHeight = frameHeights[0] || window.innerHeight * 0.7
      const initCenterY = window.innerHeight / 2 - initHeight / 2 - window.innerHeight * 0.025
      gsap.to(frames[0], { y: initCenterY, opacity: 1, duration: 1, ease: 'power2.out' })

      wheelHandlerRef.current = (e: WheelEvent) => {
        scrollAmountRef.current += e.deltaY
        syncScroll()
      }
      window.addEventListener('wheel', wheelHandlerRef.current)
    }

    const frameImages = frames.flatMap(f => Array.from(f.querySelectorAll<HTMLImageElement>('img')))
    let loadRemaining = frameImages.filter(img => !img.complete || img.naturalHeight === 0).length

    if (loadRemaining === 0) {
      afterImagesLoaded()
    } else {
      const onImgDone = () => {
        loadRemaining--
        if (loadRemaining <= 0) afterImagesLoaded()
      }
      frameImages.forEach(img => {
        if (img.complete && img.naturalHeight !== 0) return
        img.addEventListener('load', onImgDone, { once: true })
        img.addEventListener('error', onImgDone, { once: true })
      })
    }

    return () => {
      if (typeTimerRef.current) clearTimeout(typeTimerRef.current)
      if (wheelHandlerRef.current) window.removeEventListener('wheel', wheelHandlerRef.current)
      // Kill all tweens so they don't survive into the next mount
      if (track) gsap.killTweensOf(track)
      gsap.killTweensOf(frames)
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
                className="project_text other_project"
                data-index={5}
                data-nav="other"
                ref={el => { textsRef.current[PROJECTS.length] = el }}
              >
                <a
                  href="https://github.com/yeonflower2na?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Other Project
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
