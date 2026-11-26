# 대동인테리어 시공 포트폴리오

## 1. 프로젝트 개요

| 항목 | 내용 |
| --- | --- |
| 프로젝트 목적 | 부모님(아버지)을 위한 개인 시공 포트폴리오 홈페이지 제작 |
| 대상 | 숨고에서 활동 중인 아버지 — 이헌오 (대동인테리어) |
| 서비스 분야 | 도배 / 장판 |
| 홈페이지 형태 | 독립적인 웹 포트폴리오 |
| 주요 목적 | 실제 시공 경험과 작업 결과물을 보여주는 것 |
| 배포 방식 | GitHub Pages |
| 개발 방식 | React로 직접 개발 |

### 가장 중요한 방향성

일반적인 업체 홍보 홈페이지가 아니라, 아버지가 숨고에서 활동하면서 고객에게 보여줄 수 있는 **개인 포트폴리오**를 만드는 것이 목적이다.

다른 사람들이 Notion으로 포트폴리오를 만드는 것처럼, 개발자인 내가 직접 React로 제작해서 조금 더 완성도 있고 차별화된 결과물을 선물해 드리려는 프로젝트다.

## 2. 숨고 프로필 정보

- 프로필: https://soomgo.com/profile/users/8186032
- 아래 값은 2026-11-26에 프로필에서 확인한 것. 사이트의 수치·후기는 이 값만 쓴다.

| 항목 | 값 |
| --- | --- |
| 이름 / 상호 | 이헌오 / 대동인테리어 |
| 경력 | 20년 |
| 평점 / 리뷰 / 고용 | 4.9 / 45개 / 14회 |
| 지역 | 서울 강서구, 10km 이동 가능 |
| 작업 시간 | 06:00 – 23:00 |
| 결제 | 계좌이체, 현금 / 세금계산서 발행 가능 |
| 인원 | 직원 2명 |
| 응답 | 평균 2시간 내 |
| 제공 서비스 | 도배 시공, 집 인테리어, 도배장판 시공 |

- 사이트에 옮긴 리뷰 (순서대로):
  1. "[내돈내산] 구축 아파트 도배 & 장판 시공 후기" — 대표 후기(`featured: true`), 넓게 표시. 작성자 이름 미확인(`숨고 고객`으로 표기 중)
  2. 조\*\*, 3. 박\*\* — 프로필 첫 화면에 보이는 리뷰
- 리뷰 개수(45개)는 사이트에 표시하지 않는다.
- 숨고 페이지는 JavaScript로 그려져서 일반 웹 요청으로는 내용이 안 보인다. 다시 확인할 때는 브라우저(헤드리스 Chrome `--dump-dom`)로 렌더링해서 읽는다.

## 3. 기술 구성

- Vite + React 19 + TypeScript, 별도 UI 라이브러리 없음 (순수 CSS)
- 폰트: 제목·강조 = 고운바탕(Google Fonts), 본문 = Pretendard(jsdelivr CDN). 둘 다 `index.html`에서 불러오고, 제목 글꼴은 `src/index.css`의 `--font-display`로 바꾼다.
- 배포: `.github/workflows/deploy.yml` — `main` 브랜치에 push하면 GitHub Pages로 자동 배포
  - 저장소 Settings → Pages → Source를 **GitHub Actions**로 설정해야 함
  - `vite.config.ts`의 `base: './'` 덕분에 저장소 이름과 관계없이 경로가 동작함

## 4. 폴더 구조

```
src/
  data/portfolio.ts     ← 모든 문구·시공 사례·후기·연락처 (내용 수정은 여기만)
  components/
    Header.tsx          상단 고정 메뉴 (모바일은 햄버거 메뉴)
    Hero.tsx            첫 화면: 헤드라인, 경력/평점/리뷰 수, 대표 사진 3장
    About.tsx           인사말 + 작업 원칙 3가지
    Services.tsx        도배 / 장판 시공 분야, 활동 지역·작업 시간 등 이용 안내
    Works.tsx           시공 사례 목록(필터·더보기) + 상세 모달(전/후 비교, 사진)
    Sections.tsx        진행 과정, 후기(평점 요약·리뷰), FAQ, 문의, 푸터, 모바일 하단 CTA
    Photo.tsx           사진 표시 (사진이 없으면 "사진 준비 중" 자리표시)
public/works/           사이트에 쓰는 시공 사진 (줄인 것)
photos-original/        휴대폰 원본 사진 (git 제외)
scripts/resize-photos.ps1  원본 → public/works 로 크기 줄이기 + 회전 보정
```

## 5. 작업 원칙

- **콘텐츠와 코드 분리**: 문구·사진·연락처는 `src/data/portfolio.ts`에서만 바꾼다. 컴포넌트에 문구를 직접 쓰지 않는다.
- **모바일 우선**: 고객 대부분이 숨고 앱/모바일에서 링크를 열어본다. 320px 폭까지 가로 스크롤 없이 보여야 하고, 모바일 하단 "숨고에서 견적 받기" 버튼은 항상 보이게 유지한다.
- **업체 홍보 톤 금지**: 과장된 문구보다 실제 사례·사진 중심. 아버지 본인의 목소리로 쓴다.
- **꾸며낸 정보 금지**: 후기·평점·시공 건수는 숨고에서 확인한 실제 값만 넣는다. 후기는 원문 그대로 옮기고(맞춤법 포함), 고객 이름은 숨고처럼 가린다(`유**`).
- **사진**: `dist/`가 아니라 `photos-original/`에 원본을 넣고 스크립트로 줄여 `public/works/`에 둔다. 파일명은 영문 소문자·숫자·`-`만 (GitHub Pages는 대소문자 구분). 아이폰 HEIC는 jpg로 변환.

## 6. 남은 할 일 (TODO)

`src/data/portfolio.ts`에서 `TODO` 검색:

- [x] 이름·상호, 경력, 평점·리뷰 수, 활동 지역, 숨고 URL — 숨고 프로필 반영 완료
- [x] 숨고 리뷰 3건 반영 (첫 번째는 구축 아파트 대표 후기로 교체)
- [ ] 대표 후기 작성자 이름(숨고에 표시된 `김**` 형식) 확인
- [ ] 숨고 나머지 리뷰 추가 (선택)
- [ ] 시공 사례 — 사진 1~5번을 연결한 3건의 제목·지역·평수·설명을 실제 내용으로 수정
- [ ] 사진 없는 예시 사례 3건을 실제 사례로 교체하거나 삭제
- [ ] 숨고 포트폴리오 "34평형 도배장판 시공" 사진·내용 옮겨오기
- [ ] (선택) 전화번호 공개 여부
- [ ] FAQ 답변을 아버지께 확인
- [ ] `index.html`의 og 메타 태그(카톡 공유 미리보기) 문구

## 7. 명령어

```bash
npm install      # 최초 1회
npm run dev      # 로컬 개발 서버
npm run build    # 타입 검사 + 빌드 (dist/)
npm run lint     # oxlint

# 사진 줄이기 (photos-original → public/works)
powershell -ExecutionPolicy Bypass -File scripts\resize-photos.ps1
```

## 8. GitHub Pages 배포

처음 한 번:

1. GitHub에서 새 저장소 생성 (예: `wallpaper-landing`). 무료 계정은 **Public**이어야 Pages 사용 가능. README 등은 추가하지 않는다.
2. 이 폴더에서:
   ```bash
   git init -b main
   git add .
   git commit -m "포트폴리오 사이트 첫 배포"
   git remote add origin https://github.com/<아이디>/wallpaper-landing.git
   git push -u origin main
   ```
3. 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 선택.
4. **Actions** 탭에서 "Deploy to GitHub Pages"가 초록색으로 끝나면 `https://<아이디>.github.io/wallpaper-landing/` 에서 확인.
   - 3번 전에 push했다면 Actions 탭에서 실패한 실행을 **Re-run** 하면 된다.

이후 수정할 때는 `git add . && git commit -m "내용" && git push` 만 하면 1~2분 뒤 자동 반영.

- `node_modules/`, `dist/`, `photos-original/`은 `.gitignore`로 올라가지 않는다.
- 저장소가 Public이면 이 Claude.md를 포함한 모든 파일이 공개된다.
