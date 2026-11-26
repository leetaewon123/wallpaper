import { profile, works } from '../data/portfolio'
import { Photo } from './Photo'

export function Hero() {
  const featured = works.slice(0, 3)
  const stats = [
    { value: `${profile.careerYears}년`, label: '시공 경력' },
    ...(profile.soomgoRating != null ? [{ value: `★ ${profile.soomgoRating.toFixed(1)}`, label: '숨고 평점' }] : []),
  ]

  return (
    <section id="top" className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">
            {profile.business} · {profile.name} · {profile.role}
          </p>
          <h1>
            {profile.headline.split('\n').map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="lead">{profile.intro}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={profile.soomgoUrl} target="_blank" rel="noreferrer">
              숨고에서 견적 받기
            </a>
            <a className="btn btn-ghost" href="#works">
              시공 사례 보기
            </a>
          </div>
          <dl className="stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="hero-visual" aria-hidden="true">
          {featured.map((w, i) => (
            <Photo key={w.id} src={w.images[0]} alt={w.title} category={w.category} className={`hero-photo hero-photo-${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
