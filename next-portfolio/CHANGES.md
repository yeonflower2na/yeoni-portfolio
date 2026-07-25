# Next.js 포트폴리오 수정 내역

## 결과: Playwright 38/38 테스트 통과

---

## 1. `app/main/page.tsx` — 전면 재작성

### 문제
- 슬라이드 전환이 `0 → 1 → 2 → 3` 인덱스 방식으로 구현되어 `left: -100vw` 단위로 즉시 이동
- 원본은 `currentLocation` 0 → 40 스텝으로 이동하며 스크롤 1회당 5% 이동

### 수정 내용

**스크롤 로직 완전 재구현 (원본 `main.js` 로직 일치)**
```
원본: currentLocation (0 ~ 40 ~ 60), pEl.style.left = currentLocation * -5 + '%'
수정: 동일한 상태변수와 수식으로 휠 이벤트 처리
```

| 변수 | 원본값 | 역할 |
|------|--------|------|
| `currentLocation` | 0~40~60 | 전체 이동 진행값 |
| `textMoveSpeed` | 40 | slide3 텍스트 이동 속도 |
| `maxTextDistance` | 500 | slide3 텍스트 최대 이동 |
| `footerScrollThreshold` | 80 | 푸터 표시 스크롤 임계값 |

**Slide1 SVG 애니메이션**
- `linearGradient`로 `aurora-gradient` 색상 애니메이션 적용
- "From Designer" / "to Deblisher" stroke 텍스트 두 개 SVG

**Slide3 텍스트 퍼짐 효과**
- `currentLocation === 40` 상태에서 `slide3Progress += 40` 누적
- 누적값 500 초과 시 slide4 등장 + `currentLocation = 60` 점프

**미리보기 카드 (Slide4)**
- 6개 카드에 한국어 태그 (#한국소비자원 리뉴얼 등) 정확하게 반영
- 각 카드 href 연결 (`/project`, `/detail/01` 등)

**ThreeModel 중복 div 제거**
- 이전: `<div id="model-container"><ThreeModel /></div>` → ID 중복
- 수정: `<ThreeModel />` 직접 사용

---

## 2. `app/about/page.tsx` — 휠 이벤트 제거

### 문제
- `window.addEventListener('wheel', handleWheel, { passive: false })` + `e.preventDefault()` 로 네이티브 스크롤 차단
- 원본 `about.js`에는 wheel 이벤트 리스너가 **존재하지 않음**

### 수정 내용

**휠 이벤트 완전 제거**
- 원본은 `.right-scroll`이 `overflow-y: auto; height: 200vh`로 자연스럽게 스크롤
- `e.preventDefault()` 제거로 네이티브 스크롤 복원

**Page3 전환 방식 유지 (원본 일치)**
```js
// 원형 버튼 클릭 시만 전환
horizontalScrollRef.current.style.transform = 'translateX(-100vw)'
```

**스킬 캐러셀 개선**
- 11개 스킬 카드 POSITIONS 배열로 위치 관리
- 5초 자동 회전 + 드래그 80px 임계값

---

## 3. `app/globals.css` — footer CSS 충돌 수정

### 문제
- `about.css`의 `.footer-include { position: relative }` 가 파일 뒤쪽에 선언된 `design.css`의 `.footer-include { position: fixed }` 에 덮어씌워짐
- CSS가 `globals.css` 하나로 통합되어 있어 마지막 선언이 우선됨

### 수정 내용
```css
/* 수정 전 */
.footer-include {
  position: relative !important;
}

/* 수정 후 — about 페이지에만 적용되도록 선택자 강화 */
.horizontal-scroll .footer-include {
  transform: translateY(0) !important;
  opacity: 1;
  position: relative !important;
  bottom: auto !important;
  left: auto !important;
  transition: none;
}
```

---

## 4. 서버 빌드 이슈 해결

### 문제
- `reuseExistingServer: true` 설정으로 구버전 빌드 서버를 재사용
- Playwright 테스트 3건 실패 (`loading bar`, `contact button`, `contact modal`)

### 해결
- `npm run build` 재실행 후 구 서버 종료 → 새 서버 시작
- 38/38 모두 통과 확인

---

## Playwright 최종 결과

```
38 passed (1.4m)
- Navigation: 8/8 ✓
- Intro page: 2/2 ✓  
- Main page: 4/4 ✓
- About page: 5/5 ✓
- Project page: 3/3 ✓
- Design page: 3/3 ✓
- Detail pages: 3/3 ✓
- Contact modal: 2/2 ✓
- Footer: 1/1 ✓
- Visual screenshots: 5/5 ✓
```
