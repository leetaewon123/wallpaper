import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio'

const NAV = [
  { href: '#about', label: '소개' },
  { href: '#services', label: '시공 분야' },
  { href: '#works', label: '시공 사례' },
  { href: '#process', label: '진행 과정' },
  { href: '#contact', label: '문의' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#top" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true" />
          {profile.brand}
        </a>
        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">메뉴</span>
          <span aria-hidden="true" className={`menu-icon ${open ? 'is-open' : ''}`} />
        </button>
        <nav id="site-nav" className={`nav ${open ? 'is-open' : ''}`}>
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
       
        </nav>
      </div>
    </header>
  )
}
