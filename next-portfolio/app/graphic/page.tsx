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
    document.body.style.backgroundColor = 'var(--white)'
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

  // ── Row hover handlers ─────────────────────────────────────────────────────
  const handleRowMouseEnter = useCallback((imagePath: string) => {
    setHoverImageSrc(`/${imagePath}`)
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
                onMouseEnter={() => handleRowMouseEnter(item.image)}
                onMouseLeave={handleRowMouseLeave}
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={hoverImgRef}
          src={hoverImageSrc}
          alt="hover image"
          className={imgOrientation}
          onLoad={handleImgLoad}
        />
      </div>

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
