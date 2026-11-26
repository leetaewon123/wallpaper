import { useEffect } from 'react'
import { About } from './components/About'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Contact, Faq, Footer, MobileCta, Process, Reviews } from './components/Sections'
import { Services } from './components/Services'
import { Works } from './components/Works'
import { profile } from './data/portfolio'
import './App.css'

function App() {
  useEffect(() => {
    document.title = `${profile.brand} | 숨고 도배·장판 시공 포트폴리오`
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Works />
        <Process />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileCta />
    </>
  )
}

export default App
