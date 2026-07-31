'use client'

import React from 'react'

/**
 * 의존성 없는 경량 마크다운 렌더러.
 * 지원: #~#### 제목, - / * 목록, 1. 순서 목록, > 인용, --- 구분선,
 *       ``` 코드블록, **굵게**, `인라인 코드`, [링크](url)
 * 문단 내 줄바꿈은 원문 그대로 <br />로 유지한다.
 */

const INLINE_PATTERN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g

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

  return <div className="ax-markdown">{blocks}</div>
}
