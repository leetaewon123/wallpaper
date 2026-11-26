import { faqs, process, profile, reviewHighlights, reviews } from '../data/portfolio'

export function Process() {
  return (
    <section id="process" className="section section-alt">
      <div className="container">
        <p className="eyebrow">진행 과정</p>
        <h2 className="section-title">문의부터 마무리까지</h2>
        <ol className="process">
          {process.map((step, i) => (
            <li key={step.title}>
              <span className="step-num">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Reviews() {
  return (
    <section id="reviews" className="section">
      <div className="container">
        <p className="eyebrow">고객 후기</p>
        <h2 className="section-title">숨고에 남겨주신 이야기</h2>

        {profile.soomgoRating != null && (
          <div className="review-summary">
            <div className="review-score">
              <strong>{profile.soomgoRating.toFixed(1)}</strong>
              <span className="stars" aria-hidden="true">
                ★★★★★
              </span>
              
            </div>
            <ul className="highlights" aria-label="고객들이 많이 선택한 특징">
              {reviewHighlights.map((h) => (
                <li key={h.label}>
                  <span className="highlight-label">{h.label}</span>
                  <span className="highlight-bar" aria-hidden="true">
                    <span style={{ width: `${(h.count / reviewHighlights[0].count) * 100}%` }} />
                  </span>
                  <span className="highlight-count">{h.count}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {reviews.length > 0 ? (
          <>
            <ul className="reviews">
              {reviews.map((r) => (
                <li key={`${r.author}-${r.text.slice(0, 20)}`} className={`review ${r.featured ? 'is-featured' : ''}`}>
                  <p className="stars" aria-label={`별점 ${r.rating}점`}>
                    {'★'.repeat(r.rating)}
                    <span className="stars-empty">{'★'.repeat(5 - r.rating)}</span>
                  </p>
                  {r.scope && (
                    <p className="review-scope">
                      {r.scope.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </p>
                  )}
                  {r.title && <h3 className="review-title">{r.title}</h3>}
                  {r.quote && <p className="review-quote">“{r.quote}”</p>}
                  <blockquote>{r.text}</blockquote>
                  {r.keywords && (
                    <p className="review-keywords">
                      {r.keywords.map((k) => (
                        <span key={k}>{k}</span>
                      ))}
                    </p>
                  )}
                  <p className="review-meta">
                    {[r.author, r.service, r.date].filter(Boolean).join(' · ')}
                  </p>
                </li>
              ))}
            </ul>
            <div className="more">
              <a className="btn btn-ghost" href={profile.soomgoUrl} target="_blank" rel="noreferrer">
                숨고에서 리뷰 모두 보기
              </a>
            </div>
          </>
        ) : (
          <div className="reviews-empty">
            <p>실제 고객님들의 후기는 숨고 프로필에서 확인하실 수 있습니다.</p>
            <a className="btn btn-ghost" href={profile.soomgoUrl} target="_blank" rel="noreferrer">
              숨고에서 후기 보기
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

export function Faq() {
  return (
    <section id="faq" className="section section-alt">
      <div className="container container-narrow">
        <p className="eyebrow">자주 묻는 질문</p>
        <h2 className="section-title">궁금하신 점</h2>
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container contact-inner">
        <p className="eyebrow">문의</p>
        <h2 className="section-title">벽지 고민, 편하게 물어보세요</h2>
        <p className="lead">
          {profile.regions.join(' · ')} 어디든 찾아갑니다.
          <br />
          숨고로 문의 주시면 빠르게 답변드리겠습니다.
        </p>
        <div className="hero-actions">
          <a className="btn btn-primary btn-lg" href={profile.soomgoUrl} target="_blank" rel="noreferrer">
            숨고에서 견적 받기
          </a>
          {profile.phone && (
            <a className="btn btn-light btn-lg" href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}>
              전화 {profile.phone}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          © {YEAR} {profile.brand}
        </p>
      </div>
    </footer>
  )
}

export function MobileCta() {
  return (
    <div className="mobile-cta">
      {profile.phone && (
        <a className="btn btn-light" href={`tel:${profile.phone.replace(/[^0-9+]/g, '')}`}>
          전화하기
        </a>
      )}
      <a className="btn btn-primary" href={profile.soomgoUrl} target="_blank" rel="noreferrer">
        숨고에서 견적 받기
      </a>
    </div>
  )
}
