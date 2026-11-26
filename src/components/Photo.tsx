import type { Category } from '../data/portfolio'

/** public/ 기준 경로를 GitHub Pages 하위 경로(base)에 맞게 변환 */
function assetUrl(path: string) {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '')
}

interface PhotoProps {
  src?: string
  alt: string
  category?: Category
  label?: string
  className?: string
}

/** 사진이 있으면 사진을, 없으면 벽지/장판 느낌의 "사진 준비 중" 자리표시를 보여줍니다. */
export function Photo({ src, alt, category = '도배', label, className = '' }: PhotoProps) {
  if (src) {
    return (
      <div className={`photo ${className}`}>
        <img src={assetUrl(src)} alt={alt} loading="lazy" />
        {label && <span className="photo-label">{label}</span>}
      </div>
    )
  }
  return (
    <div
      className={`photo photo-placeholder ${category === '장판' ? 'is-floor' : 'is-wall'} ${className}`}
      role="img"
      aria-label={`${alt} (사진 준비 중)`}
    >
      <span className="photo-placeholder-text">사진 준비 중</span>
      {label && <span className="photo-label">{label}</span>}
    </div>
  )
}
