'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Header from '@/components/Header'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// ── Types ──────────────────────────────────────────────────────────────────────
type Category = 'all' | 'editorial' | 'poster' | 'newspaper'

interface DesignItem {
  year: string
  category: string
  title: string
  image: string
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function parseYear(year: string): number {
  const match = year.match(/\d{4}\.\d{2}|\d{4}/)
  if (match) {
    const parts = match[0].split('.')
    return new Date(`${parts[0]}-${parts[1] || '01'}-01`).getTime()
  }
  return 0
}

const TAB_LABELS: { label: string; cat: Category }[] = [
  { label: 'ALL',        cat: 'all' },
  { label: 'EDITORIAL',  cat: 'editorial' },
  { label: 'POSTER',     cat: 'poster' },
  { label: 'NEWSPAPER',  cat: 'newspaper' },
]

// ── Component ──────────────────────────────────────────────────────────────────
export default function DesignPage() {
  const [designData, setDesignData]           = useState<DesignItem[]>([])
  const [activeCategory, setActiveCategory]   = useState<Category>('all')
  const [footerVisible, setFooterVisible]     = useState(false)
  const [hoverImageSrc, setHoverImageSrc]     = useState('')
  const [hoverVisible, setHoverVisible]       = useState(false)
  const [imgOrientation, setImgOrientation]   = useState<'landscape' | 'portrait'>('portrait')
  const [zoomedIndex, setZoomedIndex]         = useState<number | null>(null)

  const designSectionRef = useRef<HTMLElement>(null)
  const hoverImgRef      = useRef<HTMLImageElement>(null)
  const hoverDivRef      = useRef<HTMLDivElement>(null)
  const footerWrapRef    = useRef<HTMLDivElement>(null)

  // ── Fetch design data ──────────────────────────────────────────────────────
  useEffect(() => {
    fetch('/designData.json')
      .then(res => res.json())
      .then((data: DesignItem[]) => setDesignData(data))
      .catch(err => console.error('Failed to load designData.json', err))
  }, [])

  // ── Set body background on mount ───────────────────────────────────────────
  useEffect(() => {
    document.body.style.backgroundColor = 'var(--background)'
    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [])

  // ── Footer visibility via scroll ───────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const section = designSectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const bottom = rect.bottom
      // Show footer when the section bottom reaches viewport bottom
      if (bottom <= window.innerHeight + 10) {
        setFooterVisible(true)
      } else {
        setFooterVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Mouse move for hover image (direct DOM — no React state lag) ─────────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (hoverDivRef.current) {
        hoverDivRef.current.style.transform = `translate(${e.clientX + 20}px, ${e.clientY + 20}px)`
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // ── Filter & sort items ────────────────────────────────────────────────────
  const filteredItems = designData
    .filter(item =>
      activeCategory === 'all' || item.category.toLowerCase() === activeCategory
    )
    .slice()
    .sort((a, b) => parseYear(b.year) - parseYear(a.year))

  // ── 확대 보기: Esc로 닫고, 좌우 방향키로 넘기고, 배경 스크롤을 막는다 ────────
  const itemCount = filteredItems.length
  useEffect(() => {
    if (zoomedIndex === null) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomedIndex(null)
        return
      }
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      const step = e.key === 'ArrowRight' ? 1 : -1
      setZoomedIndex(prev => (prev === null ? prev : (prev + step + itemCount) % itemCount))
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [zoomedIndex, itemCount])

  // ── Row hover handlers ─────────────────────────────────────────────────────
  const handleRowMouseEnter = useCallback((imagePath: string) => {
    // designData.json이 이미 /assets/... 절대경로라 앞에 슬래시를 덧붙이면 //assets/ 가 된다
    setHoverImageSrc(imagePath)
    setHoverVisible(true)
  }, [])

  const handleRowMouseLeave = useCallback(() => {
    setHoverVisible(false)
    setHoverImageSrc('')
  }, [])

  // Determine orientation once the image loads
  const handleImgLoad = useCallback(() => {
    const img = hoverImgRef.current
    if (!img) return
    setImgOrientation(img.naturalWidth >= img.naturalHeight ? 'landscape' : 'portrait')
  }, [])

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <Header />

      <section className="design-section" ref={designSectionRef}>
        <div className="design">
          {/* Tab menu */}
          <div className="tab-menu">
            {TAB_LABELS.map(({ label, cat }) => (
              <button
                key={cat}
                className={`tab-btn${activeCategory === cat ? ' active' : ''}`}
                data-cat={cat}
                onClick={() => setActiveCategory(cat)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Items list */}
          <div className="items-container">
            {filteredItems.map((item, i) => (
              <div
                key={`${item.title}-${i}`}
                className="row"
                role="button"
                tabIndex={0}
                onMouseEnter={() => handleRowMouseEnter(item.image)}
                onMouseLeave={handleRowMouseLeave}
                onClick={() => setZoomedIndex(i)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setZoomedIndex(i)
                  }
                }}
              >
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="category">{item.category}</span>
                <span className="title">{item.title}</span>
                <span className="year">{item.year}</span>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Hover image — outside section so position:fixed is viewport-relative */}
      <div
        ref={hoverDivRef}
        className={`hover-image${hoverVisible ? ' visible' : ''}`}
        id="hover-image"
      >
        {/* src가 빈 문자열이면 브라우저가 현재 페이지를 다시 요청하므로 값이 있을 때만 렌더 */}
        {hoverImageSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={hoverImgRef}
            src={hoverImageSrc}
            alt="hover image"
            className={imgOrientation}
            onLoad={handleImgLoad}
          />
        )}
      </div>

      {/* 확대 보기 */}
      {zoomedIndex !== null && filteredItems[zoomedIndex] && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setZoomedIndex(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setZoomedIndex(null)}
            aria-label="닫기"
          >
            ×
          </button>

          {filteredItems.length > 1 && (
            <button
              type="button"
              className="lightbox-nav prev"
              onClick={e => {
                e.stopPropagation()
                setZoomedIndex(prev =>
                  prev === null ? prev : (prev - 1 + filteredItems.length) % filteredItems.length
                )
              }}
              aria-label="이전 이미지"
            >
              ‹
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={filteredItems[zoomedIndex].image}
            alt={filteredItems[zoomedIndex].title}
            onClick={e => e.stopPropagation()}
          />

          {filteredItems.length > 1 && (
            <button
              type="button"
              className="lightbox-nav next"
              onClick={e => {
                e.stopPropagation()
                setZoomedIndex(prev =>
                  prev === null ? prev : (prev + 1) % filteredItems.length
                )
              }}
              aria-label="다음 이미지"
            >
              ›
            </button>
          )}

          <div className="lightbox-info">
            <p className="lightbox-caption">
              {filteredItems[zoomedIndex].title} · {filteredItems[zoomedIndex].year}
            </p>
            <p className="lightbox-count">
              {zoomedIndex + 1} / {filteredItems.length}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        className={`footer-include${footerVisible ? ' visible' : ''}`}
        ref={footerWrapRef}
      >
        <Footer />
      </div>

      <Contact />
    </>
  )
}
