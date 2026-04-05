# PROJECT_ANALYSIS

## 문서 목적
이 문서는 `yeoni-portfolio` 프로젝트를 앞으로 수정, 확장, 리팩터링할 때 Codex와 사람이 공통으로 참고하는 작업 기준 문서다.

이 문서의 목적은 다음 세 가지다.

- 수정 전에 프로젝트 구조와 책임 범위를 빠르게 파악한다.
- 특정 변경이 어떤 파일과 동작에 영향을 주는지 판단한다.
- 반복 수정 대신 구조 개선이 필요한 지점을 우선순위로 정리한다.

이 문서는 소개용 문서가 아니라 실무 참조용 문서다. 코드 전문을 복사하지 않고, 구조, 책임, 의존성, 리스크, 변경 시 주의점을 중심으로 정리한다.

---

## 1. 프로젝트 개요

### 프로젝트 성격
이 프로젝트는 개인 포트폴리오 사이트다. 디자인 배경에서 UX/UI와 퍼블리싱 역량으로 확장된 정체성을 보여주는 멀티 페이지 정적 웹사이트로 구성되어 있다.

핵심 메시지는 `From Designer to Deblisher`이며, 단순 소개보다 인터랙션 중심의 경험을 강조한다.

### 실행 방식
- 빌드 도구 없는 정적 사이트 구조다.
- 각 HTML 파일을 브라우저에서 직접 서빙하는 방식이다.
- 공통 레이아웃 일부는 `fetch()`로 HTML partial을 주입한다.
- 페이지별 CSS/JS가 직접 연결된다.

### 기술 스택
- HTML
- CSS
- Vanilla JavaScript
- GSAP
- ScrollTrigger
- Three.js
- Font Awesome CDN

### 현재 프로젝트 루트
- 실제 작업 루트: `D:\#yeonhui\portfolio\yeoni-portfolio`

---

## 2. 전체 구조 지도

### 최상위 구조
- `index.html`: 인트로 진입 페이지
- `main.html`: 메인 경험 페이지
- `about.html`: 소개/이력/스킬 페이지
- `project.html`: 웹 프로젝트 전시 페이지
- `design.html`: 디자인 아카이브 페이지
- `detailPage01.html` ~ `detailPage05.html`: 프로젝트 상세 설명 페이지
- `header.html`: 공통 헤더 partial
- `contact.html`: 공통 연락처 모달 partial
- `footer.html`: 공통 푸터 partial
- `styles/`: 페이지별 스타일
- `scripts/`: 페이지별 스크립트
- `assets/`: 폰트/이미지/3D 모델 등 자산

### 페이지 흐름
`index.html -> main.html -> about.html / project.html / design.html -> detailPage*.html`

실제 사용 흐름은 메인에서 다른 섹션으로 확장되는 구조다.

### 공통 자원 구조
- 공통 partial: `header.html`, `contact.html`, `footer.html`
- 공통 스타일 성격 파일: `reset.css`, `header.css`, `footer.css`
- 페이지별 스타일: `intro.css`, `main.css`, `about.css`, `project.css`, `design.css`, `detailPage.css`
- 페이지별 스크립트: `intro.js`, `main.js`, `about.js`, `project.js`, `design.js`, `detailPage.js`, `modeling.js`

### 외부 의존성
- GSAP / ScrollTrigger: 메인, 프로젝트 페이지 인터랙션
- Three.js: 메인 3D 모델 렌더링
- Font Awesome: 아이콘

---

## 3. 파일 책임 매핑

### HTML -> CSS/JS 매핑

#### `index.html`
- CSS: `styles/reset.css`, `styles/header.css`, `styles/intro.css`
- JS: `scripts/intro.js`
- 역할: 인트로 텍스트 애니메이션, 로딩 바, 메인 페이지 이동

#### `main.html`
- CSS: `styles/reset.css`, `styles/header.css`, `styles/footer.css`, `styles/main.css`
- JS: `scripts/main.js`, `scripts/modeling.js`
- 역할: 메인 브랜드 경험, 휠 기반 슬라이드 이동, 3D D 모델, preview 섹션

#### `about.html`
- CSS: `styles/reset.css`, `styles/header.css`, `styles/footer.css`, `styles/about.css`
- JS: `scripts/about.js`
- 역할: 이력/경험/자격/자기소개/스킬 전시

#### `project.html`
- CSS: `styles/reset.css`, `styles/header.css`, `styles/footer.css`, `styles/project.css`
- JS: `scripts/project.js`
- 역할: 프로젝트 카드 전시, 텍스트-프레임 동기 이동, 상세 링크 연결

#### `design.html`
- CSS: `styles/reset.css`, `styles/header.css`, `styles/footer.css`, `styles/design.css`
- JS: `scripts/design.js`
- 역할: 디자인 작업 목록 렌더링, 카테고리 필터, hover 미리보기

#### `detailPage01.html` ~ `detailPage05.html`
- CSS: `styles/reset.css`, `styles/header.css`, `styles/footer.css`, `styles/project.css`, `styles/detailPage.css`
- JS: `scripts/detailPage.js`
- 역할: 각 프로젝트 소개와 외부 링크 제공

---

## 4. 페이지별 동작 분석

### `index.html`

#### 담당 기능
- 커스텀 커서 생성 및 이동
- `header.html`, `contact.html` partial 로드
- 인트로 문구 전환
- 로딩 퍼센트 애니메이션
- 완료 후 `main.html` 자동 이동

#### 의존성
- `.intro-box`, `.intro-text`, `#dynamic-from`, `#dynamic-to`, `#progress-bar`, `#progress-text`

#### 수정 시 주의점
- 인트로 문구 변경 시 박스 너비 계산 로직도 영향을 받는다.
- 로딩 완료 타이밍과 텍스트 전환 카운트가 함께 완료되어야 다음 페이지로 넘어간다.

---

### `main.html`

#### 담당 기능
- 헤더, 연락처, 푸터 partial 로드
- 커스텀 커서
- 휠 기반 가로 슬라이드 이동
- 슬라이드 3에서 텍스트가 양옆으로 벌어지는 전환
- 슬라이드 4 preview 카드 3D 캐러셀
- footer 등장/복귀 처리
- Three.js 기반 `D.glb` 모델 렌더링 및 OrbitControls 제공

#### 주요 섹션
- `slide1`: 메인 메시지 + 3D 모델
- `slide2`: 소개 텍스트 + 마우스 반응 이미지
- `slide3`: 전환용 텍스트 페이지
- `slide4`: preview 카드 섹션

#### 의존성
- `#prologue`, `.slide`, `#slide-footer`, `.preview-wrapper`, `.preview-card`, `#model-container`
- 외부 CDN: GSAP, ScrollTrigger, Three.js import map
- 로컬 자산: `assets/images/D.glb`

#### 수정 시 주의점
- 휠 이동은 일반 스크롤이 아니라 `currentLocation` 기반 커스텀 이동이다.
- `slide4`, footer, 텍스트 벌어짐이 서로 상태값으로 연결되어 있어 일부만 수정하면 전환이 어긋날 수 있다.
- 3D 모델 영역은 DOM과 Three.js 모듈이 결합되어 있으므로 레이아웃 변경 시 캔버스 크기와 카메라 비율도 함께 봐야 한다.

---

### `about.html`

#### 담당 기능
- 헤더, 연락처, 푸터 partial 로드
- 커스텀 커서
- 세로 스크롤 페이지 전환
- 가로 이동 기반 스킬 섹션 진입
- About Me 모달
- 스킬 카드 캐러셀
- 중앙 카드 진행률 바 애니메이션

#### 주요 구간
- `page1`: Education / Experience
- `page2`: Certification / About Me 모달
- `page3`: Skills 캐러셀

#### 의존성
- `.right-scroll`, `.horizontal-scroll`, `#about-footer`, `.skills-wrapper`, `.modal`
- 카드 제목 텍스트와 `skillLevels` 키가 일치해야 진행률이 올바르게 반영된다.

#### 수정 시 주의점
- 세로 스크롤, 가로 전환, footer 노출이 모두 상태 변수로 연결되어 있다.
- `moveToPage2`, `moveToPage3`, `updateCarousel` 함수가 파일 내에서 중복 선언되어 있어 일부 수정 시 의도와 다르게 마지막 선언이 적용될 수 있다.
- 스킬 카드 DOM 구조를 바꾸면 진행률 표시 로직이 쉽게 깨진다.

---

### `project.html`

#### 담당 기능
- 헤더, 연락처, 푸터 partial 로드
- GSAP 기반 프로젝트 프레임 애니메이션
- 프로젝트 텍스트 트랙의 가로 이동
- 선택 프로젝트 설명 타이핑 출력
- 프레임 클릭 시 상세 페이지 이동

#### 데이터 구조
- 각 `.project_frame`의 `data-index`, `data-desc`
- 각 `.project_text`의 `data-index`

#### 의존성
- `.project_frame`, `.project_text`, `.project_texts`, `.container`
- `data-index` 순서와 상세 페이지 연결 로직이 맞아야 한다.

#### 수정 시 주의점
- 프레임 개수 변경 시 높이 계산, 인덱스 계산, 상세 연결 로직을 같이 봐야 한다.
- 현재 `data-index="4"`인 항목은 상세 링크는 있지만 클릭 핸들러에서 직접 매핑되지 않는다.

---

### `design.html`

#### 담당 기능
- `designData.json` fetch
- 카테고리 탭 필터
- 연도 기준 정렬
- 리스트 렌더링
- hover 이미지 미리보기
- 헤더, 연락처, 푸터 partial 로드

#### 데이터 소스
- 구조화된 데이터는 `scripts/designData.json` 하나다.
- 각 항목은 `year`, `category`, `title`, `image`를 가진다.

#### 의존성
- `.tab-btn`, `.items-container`, `#hover-image`
- `category` 값은 탭 `data-cat` 값과 대응되어야 한다.

#### 수정 시 주의점
- `renderItems()` 내부에서 원본 배열을 직접 정렬하므로, 향후 원본 보존이 필요하면 구조를 바꿔야 한다.
- `year` 문자열 파싱은 `YYYY.MM` 또는 `YYYY` 형태를 전제로 한다.
- JSON 데이터 자체에 인코딩 깨짐이 있어 텍스트 수정 전 저장 인코딩 확인이 필요하다.

---

### `detailPage*.html`

#### 담당 기능
- 헤더, 연락처 partial 로드
- 공통 뒤로가기 버튼으로 `project.html` 이동
- 프로젝트 소개 텍스트와 외부 링크 제공

#### 의존성
- `.detail-button`
- 공통 스크립트 `detailPage.js`

#### 수정 시 주의점
- 상세 페이지는 거의 정적 문서이지만 공통 partial 구조에 의존한다.
- 일부 페이지에서 참조하는 영상 경로가 실제 자산 구조와 맞지 않는다.

---

## 5. 공통 아키텍처와 데이터 흐름

### 공통 partial 주입 구조
대부분의 페이지는 `fetch("header.html")`, `fetch("contact.html")`, `fetch("footer.html")` 방식으로 공통 레이아웃을 삽입한다.

이 구조의 장점:
- 공통 레이아웃을 분리할 수 있다.
- 페이지별 HTML 반복을 줄인다.

이 구조의 단점:
- partial 주입 로직이 각 JS 파일에 중복 구현되어 있다.
- 공통 이벤트 바인딩도 각 파일에 복제되어 있다.
- 로딩 순서와 DOM 삽입 타이밍에 따라 수정 난이도가 올라간다.

### 네비게이션 상태 유지
- `sessionStorage.activeNav`를 사용한다.
- 각 페이지 스크립트가 자신에게 맞는 nav 항목을 강제로 `active` 처리한다.

주의:
- 공통 로직이라기보다 페이지별 하드코딩이 반복되어 있다.
- 헤더 구조 변경 시 여러 JS를 함께 수정해야 한다.

### 구조화 데이터 흐름
- 구조화된 JSON 데이터는 `scripts/designData.json` 하나다.
- 나머지 콘텐츠는 HTML 본문과 `data-*` 속성에 직접 박혀 있다.

즉, 현재 데이터 흐름은 다음처럼 분산되어 있다.
- 페이지 콘텐츠: HTML 직접 작성
- 프로젝트 설명: `data-desc`
- 디자인 목록: JSON
- 네비게이션 상태: sessionStorage

### 인터랙션 구조
현재 인터랙션은 공통 모듈이 아니라 페이지별 독립 스크립트에 분산되어 있다.

대표 예시:
- cursor: 여러 파일에 중복
- header/contact/footer fetch: 여러 파일에 중복
- 캐러셀, 스크롤 상태, 모달 제어: 페이지별 로컬 상태

---

## 6. 수정 시 주의 포인트

### 1) 공통 로직이 복제되어 있음
`header/contact/footer/cursor` 로직이 여러 JS 파일에 반복된다.

영향:
- 한 페이지에서 수정해도 다른 페이지는 그대로 남을 수 있다.
- 동작 차이가 생기기 쉽다.

### 2) JS가 DOM 구조에 강하게 결합되어 있음
대부분의 스크립트가 class/id 셀렉터에 직접 의존한다.

영향:
- HTML 구조를 조금만 바꿔도 이벤트 바인딩이나 애니메이션이 깨질 수 있다.
- 리팩터링 전 DOM-스크립트 대응 관계를 먼저 확인해야 한다.

### 3) 커스텀 휠/드래그 인터랙션 비중이 큼
기본 스크롤 대신 상태값 기반 이동이 많다.

영향:
- 접근성
- 모바일 대응
- 유지보수 복잡도
- 브라우저별 입력 처리 차이

### 4) 인코딩 이슈 가능성
README, 일부 HTML, JSON 텍스트가 현재 깨진 상태로 읽힌다.

영향:
- 텍스트 수정 시 저장 인코딩이 섞이면 문제가 더 커질 수 있다.
- 대량 텍스트 수정 전 인코딩 정책을 먼저 정해야 한다.

### 5) 문서와 실제 구조가 다름
기존 README 설명과 현재 실제 파일 구조가 일부 다르다.

영향:
- 문서만 믿고 수정하면 진입 파일을 잘못 잡을 수 있다.

---

## 7. 확인된 문제와 리스크

### 동작 오류 가능성
- `copyToClipboard()` 함수가 정의되어 있지 않다.
- `scrollToTop()` 함수가 정의되어 있지 않다.

참조 위치:
- `contact.html`
- `footer.html`

### 자산 참조 불일치
- 상세 페이지는 `assets/videos/...` 경로의 영상을 참조한다.
- 실제 프로젝트에는 `assets/videos` 폴더가 없다.

결과:
- 상세 페이지의 비디오가 재생되지 않을 가능성이 크다.

### 코드 중복
- `header/contact/footer` 로드 코드 중복
- cursor 코드 중복
- 일부 hover/footer 연계 코드 중복

결과:
- 유지보수 비용 증가
- 페이지별 동작 차이 발생 가능

### 함수 중복 선언
- `about.js` 안의 `moveToPage2`, `moveToPage3`, `updateCarousel`은 중복 선언 흔적이 보인다.

결과:
- 나중에 읽는 사람이 실제 적용 함수 버전을 헷갈릴 수 있다.
- 일부 수정이 무효화될 수 있다.

### 텍스트/링크 정합성 문제
- 일부 텍스트가 인코딩 문제로 깨져 있다.
- README 설명과 실제 디렉터리/파일명이 일치하지 않는 부분이 있다.
- 상세 페이지 내 일부 외부 링크 설명도 혼선이 있다.

### 구조적 리스크
- 데이터가 여러 방식으로 분산되어 있어 일괄 개편이 어렵다.
- 디자인 데이터는 JSON인데 프로젝트 정보는 HTML과 `data-*`로 분산된다.
- 공통 상태 관리 체계 없이 페이지별 개별 구현이다.

---

## 8. 개선 우선순위

### 1순위: 즉시 동작 문제 복구
- 누락 함수 `copyToClipboard`, `scrollToTop` 정리
- 없는 `assets/videos` 참조 정리
- 깨진 링크와 잘못된 참조 확인

이 단계는 사이트가 실제로 문제 없이 동작하게 만드는 최소 안정화 작업이다.

### 2순위: 공통 로직 모듈화
- `header/contact/footer` 주입 로직 통합
- cursor 로직 통합
- nav 활성화 처리 통합

목표는 공통 동작을 한 군데에서 관리하게 만드는 것이다.

### 3순위: 페이지별 스크립트 책임 정리
- `about.js` 중복 함수 제거
- `main.js` 상태 관리 정리
- `project.js` 인덱스/상세 페이지 매핑 명확화

목표는 페이지별 로직을 읽기 쉽게 만드는 것이다.

### 4순위: 인코딩 및 문서 정합성 복구
- HTML/JSON/README 인코딩 통일
- 실제 구조와 문서 내용 일치화
- 링크, 텍스트, 제목 정리

### 5순위: 품질 강화
- 접근성 개선
- 모바일 인터랙션 개선
- 성능 최적화
- 자산 용량 최적화

---

## 9. Codex 작업 가이드

### 수정 전 반드시 확인할 섹션
작업 전에 최소한 아래를 먼저 읽는다.

- 이 문서의 `파일 책임 매핑`
- 작업 대상 페이지의 `페이지별 동작 분석`
- `수정 시 주의 포인트`
- `확인된 문제와 리스크`

### 작업 유형별 진입 루트

#### 레이아웃 수정
먼저 볼 파일:
- 공통 영역이면 `header.html`, `contact.html`, `footer.html`
- 페이지별 영역이면 해당 HTML + 대응 CSS

같이 볼 파일:
- 해당 페이지 JS

#### 인터랙션 수정
먼저 볼 파일:
- 해당 페이지 JS
- 관련 DOM이 있는 HTML

같이 볼 파일:
- 대응 CSS 애니메이션/상태 클래스

#### 콘텐츠 수정
먼저 볼 파일:
- 정적 텍스트면 해당 HTML
- 디자인 목록이면 `scripts/designData.json`

같이 볼 파일:
- 텍스트가 JS 상태값이나 `data-*` 속성에 들어있는지 확인

#### 공통 로직 리팩터링
먼저 볼 파일:
- `scripts/main.js`
- `scripts/about.js`
- `scripts/project.js`
- `scripts/design.js`
- `scripts/detailPage.js`
- `scripts/intro.js`

집중 포인트:
- partial fetch 중복
- cursor 중복
- nav 상태 처리 중복

---

## 10. 변경 영향도 기준

### `header.html`을 수정하면 같이 봐야 할 파일
- `scripts/intro.js`
- `scripts/main.js`
- `scripts/about.js`
- `scripts/project.js`
- `scripts/design.js`
- `scripts/detailPage.js`

이유:
- nav 구조와 셀렉터에 모두 의존한다.

### `contact.html`을 수정하면 같이 봐야 할 파일
- `scripts/intro.js`
- `scripts/main.js`
- `scripts/about.js`
- `scripts/project.js`
- `scripts/design.js`
- `scripts/detailPage.js`

이유:
- `.contact`, `.holo-container`, `.holo-close`에 직접 이벤트를 건다.

### `footer.html`을 수정하면 같이 봐야 할 파일
- `scripts/main.js`
- `scripts/about.js`
- `scripts/project.js`
- `scripts/design.js`

이유:
- footer hover 및 노출 처리가 페이지별로 다르게 묶여 있다.

### `main.html` 구조를 수정하면 같이 봐야 할 파일
- `scripts/main.js`
- `scripts/modeling.js`
- `styles/main.css`

### `about.html` 구조를 수정하면 같이 봐야 할 파일
- `scripts/about.js`
- `styles/about.css`

### `project.html` 구조를 수정하면 같이 봐야 할 파일
- `scripts/project.js`
- `styles/project.css`

### `design.html` 구조를 수정하면 같이 봐야 할 파일
- `scripts/design.js`
- `styles/design.css`
- `scripts/designData.json`

---

## 11. 빠른 참조 체크리스트

작업 시작 전에 아래를 빠르게 점검한다.

- 어떤 페이지를 수정하는가?
- 이 변경이 공통 partial에 영향을 주는가?
- HTML class/id 변경이 JS 셀렉터를 깨뜨리지는 않는가?
- `data-*` 속성이나 JSON 데이터 구조를 함께 바꿔야 하는가?
- 이 페이지와 비슷한 공통 로직이 다른 JS 파일에도 복제되어 있는가?
- 인코딩 문제를 악화시키지 않도록 파일 저장 형식을 확인했는가?
- 현재 작업이 동작 복구인지, 구조 개선인지, UI 강화인지 목표를 분리했는가?

---

## 12. 앞으로 문서를 갱신해야 하는 경우

다음 작업을 한 뒤에는 이 문서를 함께 업데이트하는 것이 좋다.

- 공통 로직 모듈화
- 새 페이지 추가
- JSON/데이터 구조 변경
- 네비게이션 구조 변경
- 3D/애니메이션 구조 변경
- 인코딩 정리
- 프로젝트 상세 페이지 구성 변경

---

## 13. 최종 판단
현재 프로젝트는 “정적 멀티 페이지 포트폴리오 + 강한 인터랙션 + 공통 partial 주입 구조”로 이해하면 된다.

가장 중요한 유지보수 포인트는 다음 세 가지다.

- 공통 로직이 여러 파일에 복제되어 있다.
- DOM 구조와 JS 의존성이 매우 강하다.
- 일부 동작 오류와 인코딩 문제가 이미 존재한다.

따라서 이후 Codex 작업은 항상 다음 순서로 접근하는 것이 안전하다.

1. 대상 페이지와 관련 파일 매핑 확인
2. 공통 partial 영향 여부 확인
3. 기존 리스크와 중복 구현 여부 확인
4. 변경 후 영향 범위 재확인

이 문서는 그 판단을 빠르게 하기 위한 기준 문서로 사용한다.
