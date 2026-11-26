import { profile, services } from '../data/portfolio'

export function Services() {
  return (
    <section id="services" className="section section-alt">
      <div className="container">
        <p className="eyebrow">시공 분야</p>
        <h2 className="section-title">도배와 장판, 두 가지에 집중합니다</h2>
        <div className="services">
          {services.map((s) => (
            <article key={s.title} className={`service-card ${s.category === '장판' ? 'is-floor' : 'is-wall'}`}>
              <div className="service-swatch" aria-hidden="true" />
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <ul>
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <dl className="info-list">
          <div>
            <dt>활동 지역</dt>
            <dd>{profile.regions.join(' · ')}</dd>
          </div>
          {profile.info.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
