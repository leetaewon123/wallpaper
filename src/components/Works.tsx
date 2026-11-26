import { useEffect, useRef, useState } from 'react'
import { works, type Category, type Work } from '../data/portfolio'
import { Photo } from './Photo'

type Filter = '전체' | Category
const FILTERS: Filter[] = ['전체', '도배', '장판']
const PAGE = 6

export function Works() {
  const [filter, setFilter] = useState<Filter>('전체')
  const [limit, setLimit] = useState(PAGE)
  const [selected, setSelected] = useState<Work | null>(null)

  const filtered = filter === '전체' ? works : works.filter((w) => w.category === filter)
  const visible = filtered.slice(0, limit)

  return (
    <section id="works" className="section">
      <div className="container">
        <div className="works-head">
          <div>
            <p className="eyebrow">시공 사례</p>
            <h2 className="section-title">직접 작업한 현장들입니다</h2>
          </div>
          <div className="filters" role="tablist" aria-label="시공 분야 필터">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                className={`chip ${filter === f ? 'is-active' : ''}`}
                onClick={() => {
                  setFilter(f)
                  setLimit(PAGE)
                }}
              >
                {f}
                <span className="chip-count">{f === '전체' ? works.length : works.filter((w) => w.category === f).length}</span>
              </button>
            ))}
          </div>
        </div>

        <ul className="works-grid">
          {visible.map((w) => (
            <li key={w.id}>
              <button type="button" className="work-card" onClick={() => setSelected(w)}>
                <Photo src={w.images[0] ?? w.after} alt={w.title} category={w.category} className="work-thumb" />
                <div className="work-body">
                  <span className={`badge ${w.category === '장판' ? 'is-floor' : 'is-wall'}`}>{w.category}</span>
                  <h3>{w.title}</h3>
                  <p className="work-meta">
                    {w.place} · {w.date}
                  </p>
                  <p className="work-summary">{w.summary}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>

        {filtered.length > limit && (
          <div className="more">
            <button type="button" className="btn btn-ghost" onClick={() => setLimit((l) => l + PAGE)}>
              사례 더 보기 ({filtered.length - limit})
            </button>
          </div>
        )}
      </div>

      <WorkModal work={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

function WorkModal({ work, onClose }: { work: Work | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (work && !dialog.open) dialog.showModal()
    if (!work && dialog.open) dialog.close()
  }, [work])

  return (
    <dialog
      ref={ref}
      className="modal"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      aria-labelledby="work-modal-title"
    >
      {work && (
        <div className="modal-inner">
          <button type="button" className="modal-close" onClick={onClose} aria-label="닫기">
            ×
          </button>
          <span className={`badge ${work.category === '장판' ? 'is-floor' : 'is-wall'}`}>{work.category}</span>
          <h3 id="work-modal-title">{work.title}</h3>
          <p className="work-meta">
            {work.place} · {work.date}
          </p>

          {(work.before || work.after) && (
            <div className="before-after">
              <Photo src={work.before} alt={`${work.title} 시공 전`} category={work.category} label="시공 전" />
              <Photo src={work.after} alt={`${work.title} 시공 후`} category={work.category} label="시공 후" />
            </div>
          )}

          <p className="modal-summary">{work.summary}</p>
          {work.details && work.details.length > 0 && (
            <ul className="modal-details">
              {work.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          )}

          <div className="modal-gallery">
            {work.images.length > 0 ? (
              work.images.map((src, i) => <Photo key={src} src={src} alt={`${work.title} 사진 ${i + 1}`} category={work.category} />)
            ) : (
              <Photo alt={work.title} category={work.category} />
            )}
          </div>

          {work.tags && (
            <p className="tags">
              {work.tags.map((t) => (
                <span key={t}>#{t}</span>
              ))}
            </p>
          )}
        </div>
      )}
    </dialog>
  )
}
