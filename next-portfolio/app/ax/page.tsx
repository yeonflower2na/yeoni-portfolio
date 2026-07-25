'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import Contact from '@/components/Contact'

export default function AxPage() {
  useEffect(() => {
    document.body.style.backgroundColor = 'var(--background)'
    return () => { document.body.style.backgroundColor = '' }
  }, [])

  return (
    <>
      <Header />
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        gap: '20px',
      }}>
        <h1 style={{ fontSize: '5rem', fontWeight: 700, letterSpacing: '-2px' }}>AX</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--dimblack)', fontWeight: 300 }}>
          AI Transformation — Coming Soon
        </p>
      </section>
      <Contact />
    </>
  )
}
