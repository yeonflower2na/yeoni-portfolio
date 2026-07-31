'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Contact from '@/components/Contact'
import Markdown from '@/components/Markdown'

interface AxAttachment {
  name: string
  file: string
  size: string
}

interface AxPost {
  id: string
  no: number
  category: string
  title: string
  summary: string
  date: string
  file: string
  attachments?: AxAttachment[]
}

export default function AxPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)

  const [post, setPost] = useState<AxPost | null>(null)
  const [body, setBody] = useState('')
  const [status, setStatus] = useState<'loading' | 'ready' | 'notfound'>('loading')

  useEffect(() => {
    document.body.style.backgroundColor = 'var(--background)'
    return () => { document.body.style.backgroundColor = '' }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const posts: AxPost[] = await fetch('/ax/posts.json').then(res => res.json())
        const found = posts.find(p => p.id === slug)
        if (!found) {
          if (!cancelled) setStatus('notfound')
          return
        }
        const res = await fetch(found.file)
        if (!res.ok) throw new Error(`${res.status}`)
        const text = await res.text()
        if (cancelled) return
        setPost(found)
        setBody(text)
        setStatus('ready')
      } catch (err) {
        console.error('Failed to load AX post', err)
        if (!cancelled) setStatus('notfound')
      }
    }

    load()
    return () => { cancelled = true }
  }, [slug])

  return (
    <>
      <Header />

      <main className="ax-detail">
        {status === 'loading' && <p className="ax-detail-state">불러오는 중…</p>}

        {status === 'notfound' && (
          <div className="ax-detail-state">
            <p>글을 찾을 수 없습니다.</p>
            <Link href="/ax" className="ax-back">
              <i className="fa-solid fa-arrow-left"></i> 목록으로
            </Link>
          </div>
        )}

        {status === 'ready' && post && (
          <article>
            {/* 전역 `header { position: fixed }` 를 피하려고 div 사용 */}
            <div className="ax-detail-head">
              <Link href="/ax" className="ax-back">
                <i className="fa-solid fa-arrow-left"></i> 목록으로
              </Link>
              <span className="ax-chip">{post.category}</span>
              <h1>{post.title}</h1>
              <div className="ax-detail-meta">
                <span>NO. {String(post.no).padStart(2, '0')}</span>
                <span>{post.date}</span>
              </div>
            </div>

            {post.attachments && post.attachments.length > 0 && (
              <div className="ax-files">
                <span className="ax-files-label">첨부파일</span>
                <ul>
                  {post.attachments.map(file => (
                    <li key={file.file}>
                      <a href={file.file} download={file.name}>
                        <i className="fa-regular fa-file-lines"></i>
                        <span className="ax-file-name">{file.name}</span>
                        <span className="ax-file-size">{file.size}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Markdown source={body} />
          </article>
        )}
      </main>

      <Contact />
    </>
  )
}
