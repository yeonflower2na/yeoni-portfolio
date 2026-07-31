'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Contact from '@/components/Contact'

interface AxPost {
  id: string
  no: number
  category: string
  title: string
  summary: string
  date: string
  file: string
}

export default function AxPage() {
  const [posts, setPosts] = useState<AxPost[]>([])

  useEffect(() => {
    document.body.style.backgroundColor = 'var(--background)'
    return () => { document.body.style.backgroundColor = '' }
  }, [])

  useEffect(() => {
    fetch('/ax/posts.json')
      .then(res => res.json())
      .then((data: AxPost[]) => setPosts([...data].sort((a, b) => b.no - a.no)))
      .catch(err => console.error('Failed to load posts.json', err))
  }, [])

  return (
    <>
      <Header />

      <section className="ax-hero">
        <h1>AX</h1>
        <p>AI를 직접 업무에 적용해보며 바꿔온 방식과 결과를 기록했습니다.</p>
      </section>

      <section className="ax-board">
        <div className="ax-board-top">
          <span className="ax-board-count">
            총 <strong>{posts.length}</strong>건
          </span>
        </div>

        <ul className="ax-list">
          <li className="ax-list-head">
            <span className="ax-col-no">NO</span>
            <span className="ax-col-cat">CATEGORY</span>
            <span className="ax-col-title">TITLE</span>
            <span className="ax-col-date">DATE</span>
          </li>

          {posts.length === 0 && (
            <li className="ax-list-empty">등록된 글이 없습니다.</li>
          )}

          {posts.map(post => (
            <li key={post.id} className="ax-list-row">
              <Link href={`/ax/${post.id}`}>
                <span className="ax-col-no">{String(post.no).padStart(2, '0')}</span>
                <span className="ax-col-cat">
                  <em className="ax-chip">{post.category}</em>
                </span>
                <span className="ax-col-title">
                  <strong>{post.title}</strong>
                  {post.summary && <small>{post.summary}</small>}
                </span>
                <span className="ax-col-date">{post.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Contact />
    </>
  )
}
