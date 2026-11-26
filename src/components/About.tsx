import { principles, profile } from '../data/portfolio'

export function About() {
  return (
    <section id="about" className="section">
      <div className="container about">
        <div>
          <p className="eyebrow">인사말</p>
          <h2 className="section-title">보이지 않는 곳부터 정성을 들입니다</h2>
          <div className="greeting">
            {profile.greeting.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="signature">— {profile.name} 드림</p>
          </div>
        </div>
        <ol className="principles">
          {principles.map((p, i) => (
            <li key={p.title}>
              <span className="principle-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
