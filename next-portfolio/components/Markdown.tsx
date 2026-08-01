'use client'

import React, { useEffect, useState } from 'react'

/**
 * 의존성 없는 경량 마크다운 렌더러.
 * 지원: #~#### 제목, - / * 목록, 1. 순서 목록, > 인용, --- 구분선,
 *       ``` 코드블록, **굵게**, `인라인 코드`, [링크](url), ![캡션](이미지)
 * 문단 내 줄바꿈은 원문 그대로 <br />로 유지한다.
 * 한 줄 전체가 이미지면 캡션이 붙은 figure로 렌더링하고, 클릭하면 확대해서 볼 수 있다.
 */

interface ZoomTarget {
  src: string
  alt: string
}

/** 확대 보기 상태 — 같은 묶음의 이미지를 넘겨볼 수 있도록 목록과 현재 위치를 함께 갖는다 */
interface ZoomState {
  items: ZoomTarget[]
  index: number
}

const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`|!?\[[^\]]*\]\([^)]+\))/g
const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)]+)\)$/

function renderInline(text: string, keyBase: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  let cursor = 0
  let seq = 0
  let match: RegExpExecArray | null

  INLINE_PATTERN.lastIndex = 0
  while ((match = INLINE_PATTERN.exec(text)) !== null) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index))
    const token = match[0]
    const key = `${keyBase}-in${seq++}`

    if (token.startsWith('**')) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('`')) {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>)
    } else if (token.startsWith('![')) {
      const split = token.indexOf('](')
      nodes.push(
        // eslint-disable-next-line @next/next/no-img-element
        <img key={key} src={token.slice(split + 2, -1)} alt={token.slice(2, split)} />
      )
    } else {
      const split = token.indexOf('](')
      nodes.push(
        <a
          key={key}
          href={token.slice(split + 2, -1)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {token.slice(1, split)}
        </a>
      )
    }
    cursor = match.index + token.length
  }
  if (cursor < text.length) nodes.push(text.slice(cursor))
  return nodes
}

function renderMultiline(text: string, keyBase: string): React.ReactNode[] {
  return text
    .split('\n')
    .flatMap((line, i) =>
      i === 0
        ? renderInline(line, `${keyBase}-l${i}`)
        : [<br key={`${keyBase}-br${i}`} />, ...renderInline(line, `${keyBase}-l${i}`)]
    )
}

export default function Markdown({ source }: { source: string }) {
  const [zoomed, setZoomed] = useState<ZoomState | null>(null)

  // 확대 보기 중에는 Esc로 닫고, 좌우 방향키로 넘기고, 배경 스크롤을 막는다
  useEffect(() => {
    if (!zoomed) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setZoomed(null)
        return
      }
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      const step = e.key === 'ArrowRight' ? 1 : -1
      setZoomed((prev) =>
        prev
          ? { ...prev, index: (prev.index + step + prev.items.length) % prev.items.length }
          : prev
      )
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [zoomed])

  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const blocks: React.ReactNode[] = []
  let paragraph: string[] = []
  let seq = 0
  let i = 0

  const flushParagraph = () => {
    if (paragraph.length === 0) return
    const key = `p${seq++}`
    blocks.push(<p key={key}>{renderMultiline(paragraph.join('\n'), key)}</p>)
    paragraph = []
  }

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    // 빈 줄 → 문단 종료
    if (trimmed === '') {
      flushParagraph()
      i++
      continue
    }

    // 코드 블록
    if (trimmed.startsWith('```')) {
      flushParagraph()
      const code: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        code.push(lines[i])
        i++
      }
      i++ // 닫는 펜스 소비
      blocks.push(
        <pre key={`code${seq++}`}>
          <code>{code.join('\n')}</code>
        </pre>
      )
      continue
    }

    // 한 줄 전체가 이미지 → figure. 연달아 오면 한 줄 갤러리로 묶는다.
    if (IMAGE_LINE.test(trimmed)) {
      flushParagraph()
      const figures: RegExpMatchArray[] = []

      while (i < lines.length) {
        const current = lines[i].trim()
        if (current === '') {
          // 빈 줄 뒤에도 이미지가 이어지면 같은 묶음으로 본다
          let next = i + 1
          while (next < lines.length && lines[next].trim() === '') next++
          if (next < lines.length && IMAGE_LINE.test(lines[next].trim())) {
            i = next
            continue
          }
          break
        }
        const matched = current.match(IMAGE_LINE)
        if (!matched) break
        figures.push(matched)
        i++
      }

      const key = `fig${seq++}`
      // 같은 묶음의 이미지는 확대 상태에서 서로 넘겨볼 수 있다
      const groupItems: ZoomTarget[] = figures.map((fig) => ({ src: fig[2], alt: fig[1] }))
      const rendered = figures.map((fig, idx) => (
        <figure key={`${key}-${idx}`}>
          <button
            type="button"
            className="ax-zoom"
            onClick={() => setZoomed({ items: groupItems, index: idx })}
            aria-label={fig[1] ? `${fig[1]} 크게 보기` : '이미지 크게 보기'}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={fig[2]} alt={fig[1]} loading="lazy" />
          </button>
          {fig[1] && <figcaption>{fig[1]}</figcaption>}
        </figure>
      ))

      blocks.push(
        figures.length > 1
          ? <div className="ax-gallery" key={key}>{rendered}</div>
          : <div key={key}>{rendered}</div>
      )
      continue
    }

    // 구분선
    if (/^(-{3,}|_{3,}|\*{3,})$/.test(trimmed)) {
      flushParagraph()
      blocks.push(<hr key={`hr${seq++}`} />)
      i++
      continue
    }

    // 제목
    const heading = trimmed.match(/^(#{1,4})\s+(.*)$/)
    if (heading) {
      flushParagraph()
      const key = `h${seq++}`
      const content = renderInline(heading[2], key)
      const Tag = (['h1', 'h2', 'h3', 'h4'] as const)[heading[1].length - 1]
      blocks.push(<Tag key={key}>{content}</Tag>)
      i++
      continue
    }

    // 인용
    if (trimmed.startsWith('>')) {
      flushParagraph()
      const quote: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quote.push(lines[i].trim().replace(/^>\s?/, ''))
        i++
      }
      const key = `bq${seq++}`
      blocks.push(<blockquote key={key}>{renderMultiline(quote.join('\n'), key)}</blockquote>)
      continue
    }

    // 순서 있는 목록
    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph()
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''))
        i++
      }
      const key = `ol${seq++}`
      blocks.push(
        <ol key={key}>
          {items.map((item, idx) => (
            <li key={`${key}-${idx}`}>{renderInline(item, `${key}-${idx}`)}</li>
          ))}
        </ol>
      )
      continue
    }

    // 순서 없는 목록
    if (/^[-*+]\s+/.test(trimmed)) {
      flushParagraph()
      const items: string[] = []
      while (i < lines.length && /^[-*+]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*+]\s+/, ''))
        i++
      }
      const key = `ul${seq++}`
      blocks.push(
        <ul key={key}>
          {items.map((item, idx) => (
            <li key={`${key}-${idx}`}>{renderInline(item, `${key}-${idx}`)}</li>
          ))}
        </ul>
      )
      continue
    }

    // 일반 문단
    paragraph.push(trimmed)
    i++
  }

  flushParagraph()

  return (
    <>
      <div className="ax-markdown">{blocks}</div>

      {zoomed && (
        <div
          className="ax-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setZoomed(null)}
        >
          <button
            type="button"
            className="ax-lightbox-close"
            onClick={() => setZoomed(null)}
            aria-label="닫기"
          >
            ×
          </button>

          {zoomed.items.length > 1 && (
            <button
              type="button"
              className="ax-lightbox-nav prev"
              onClick={(e) => {
                e.stopPropagation()
                setZoomed((prev) =>
                  prev
                    ? { ...prev, index: (prev.index - 1 + prev.items.length) % prev.items.length }
                    : prev
                )
              }}
              aria-label="이전 이미지"
            >
              ‹
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={zoomed.items[zoomed.index].src}
            alt={zoomed.items[zoomed.index].alt}
            onClick={(e) => e.stopPropagation()}
          />

          {zoomed.items.length > 1 && (
            <button
              type="button"
              className="ax-lightbox-nav next"
              onClick={(e) => {
                e.stopPropagation()
                setZoomed((prev) =>
                  prev ? { ...prev, index: (prev.index + 1) % prev.items.length } : prev
                )
              }}
              aria-label="다음 이미지"
            >
              ›
            </button>
          )}

          <div className="ax-lightbox-info">
            {zoomed.items[zoomed.index].alt && (
              <p className="ax-lightbox-caption">{zoomed.items[zoomed.index].alt}</p>
            )}
            {zoomed.items.length > 1 && (
              <p className="ax-lightbox-count">
                {zoomed.index + 1} / {zoomed.items.length}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
