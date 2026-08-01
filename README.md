# Yeoni's Portfolio

## 🖋️ From Designer to Deblisher

<div align="left">
  <img src="https://github.com/user-attachments/assets/c68f349e-2262-44b7-ae8f-9ff4623c6802" width="700"/>
</div>

안녕하세요, **UXUI 디자이너 & 퍼블리셔 정연희**입니다.  
편집디자인에서 출발해 지금은 UXUI 디자인과 퍼블리싱을 함께 다루고 있습니다.  <br/>
디자이너로서의 창의성과 개발자로서의 기술을 조화롭게 결합하여<br/>
사용자 경험을 중심으로 한 프로젝트와 작업물들을 담고 있습니다.<br/> 
**"From Designer to Deblisher"** 라는 주제로, 디자인과 개발이 만나는 지점을 시각적이고 상호작용적으로 표현했습니다.  

<br/><br/>

## 📝 링크

| 이름                          | 링크                                                                                               |
|-------------------------------|----------------------------------------------------------------------------------------------------|
| 포트폴리오 사이트            | [포트폴리오 Link](https://yeonflower2na.github.io/)          |
| 피그마 디자인 파일             | [피그마 Link](https://www.figma.com/design/52Z1kXW8xBte1H076f8MOL/portfolio?m=auto&t=samqyMTR5XNp228U-6)          |

<br/><br/>

## 🛠️ 기술 스택

| 구분 | 사용 기술 |
|------|-----------|
| 프레임워크 | Next.js 16 (App Router), React 19, TypeScript |
| 스타일 | CSS (전역 스타일시트), Tailwind CSS 4 |
| 애니메이션 | GSAP (ScrollTrigger) |
| 3D | Three.js (GLTF / DRACO) |
| 테스트 | Playwright |
| 배포 | GitHub Pages (GitHub Actions 자동 배포) |

<br/>

사이트는 처음 바닐라 HTML/CSS/JS로 제작한 뒤 **Next.js로 이전**했으며,<br/>
현재 배포되는 버전은 `next-portfolio/` 입니다. 저장소 루트의 HTML 파일들은 초기 버전 기록으로 남겨두었습니다.

<br/><br/>

## 📂 프로젝트 폴더 구조
<br/>

```bash
yeonflower2na.github.io/
├── .github/workflows/     # GitHub Pages 자동 배포 워크플로우
├── next-portfolio/        # 실제 배포되는 Next.js 프로젝트
│   ├── app/               # App Router 페이지
│   │   ├── page.tsx       # 인트로
│   │   ├── main/          # 메인 (3D 알파벳 D, Preview)
│   │   ├── about/         # 소개, 경력, 스킬
│   │   ├── uiux/          # UI/UX 프로젝트 목록
│   │   ├── graphic/       # 편집·그래픽 디자인 아카이브
│   │   ├── ax/            # AX 게시판 (목록 + 상세)
│   │   ├── detail/01~06/  # 프로젝트 상세 페이지
│   │   └── globals.css    # 전역 스타일
│   ├── components/        # Header, Footer, Contact, Cursor, Markdown, ThreeModel
│   ├── public/
│   │   ├── assets/        # 이미지, 폰트, 3D 모델
│   │   ├── ax/            # AX 게시글 데이터 (posts.json, 본문 md, 이미지, 첨부)
│   │   └── designData.json # 그래픽 아카이브 데이터
│   └── tests/             # Playwright 테스트
├── assets/ scripts/ styles/   # 초기 바닐라 버전 리소스
└── *.html                     # 초기 바닐라 버전 페이지
```

<br/><br/>

## 🚀 로컬 실행

```bash
cd next-portfolio
npm install
npm run dev      # http://localhost:3000
npm run build    # 정적 사이트 생성 (out/)
```

`main` 브랜치에 push하면 GitHub Actions가 빌드 후 GitHub Pages로 자동 배포합니다.

<br/><br/>

## 🏗️ 전체적인 구조
### Header
<div align="left">
  <img src="https://github.com/user-attachments/assets/4e84cf38-f5c2-43a9-8279-acbe55925b0a" width="700"/>
</div>
<br/>
Header는 화면 상단에 고정되어 있으며, 포트폴리오의 첫인상을 결정짓는 중요한 역할을 합니다.
중앙에는 내비게이션 메뉴가 위치하며, 좌우에는 포트폴리오의 제목과 지역 정보가 배치되어 균형감과 정체성을 제공합니다.
<br/>

**내비게이션 구성**

**- Home**: 아이콘 형태로 디자인되어 메인 섹션으로 이동.<br/>
**- ABOUT ME**: 저의 배경과 경력을 소개하는 섹션.<br/>
**- UI/UX**: 웹 기획·디자인·퍼블리싱 프로젝트를 소개하는 섹션.<br/>
**- GRAPHIC**: 편집디자인 및 시각디자인 작업물을 소개하는 섹션.<br/>
**- AX**: AI를 업무에 적용한 과정과 결과를 기록하는 섹션.<br/><br/>
내비게이션 양쪽 끝 텍스트는 고정되고, 중간 텍스트는 동적으로 변경되며, <br/>
각 섹션 주제를 반영한 단어로 사용자를 안내합니다.
<br/><br/>


### Footer
Footer는 페이지 하단에 위치하며, 포트폴리오를 마무리하고 중요한 정보를 전달합니다.<br/>
스크롤을 끝까지 내리면 등장하며, 사이트의 철학과 주요 연락 정보를 명확히 전달합니다.
<div align="left">
  <img src="https://github.com/user-attachments/assets/72c0d8b4-35a6-4f29-9525-8daeeedb10a2" width="700"/>
</div>
<br/>
구성 요소


문구: "Where Design Meets Development"라는 문구로 디자인과 개발의 조화를 표현.<br/>
연락처: 이메일, 연락처, GitHub 링크를 포함해 사용자가 쉽게 소통할 수 있도록 설계.<br/>
HOME 버튼: 오른쪽 하단에 위치하며, 클릭 시 메인 페이지 첫 번째 섹션으로 이동 가능.<br/>
Footer는 깔끔하고 직관적인 디자인으로 사용자 경험을 보완합니다.


<br/><br/>
### Contact
<div align="left">
  <img src="https://github.com/user-attachments/assets/b9c9c66f-89ba-4e56-bd74-5319cd4ae296" width="200"/>
</div>
<br/>
Contact는 화면 하단 중앙에 고정되어 있어 어디서든 빠르게 접근할 수 있습니다.
클릭 시 모달 창이 열리며, 화면 중앙에 필요한 정보를 명확히 보여줍니다.
<br/>
구성 요소

이름, 이메일, 연락처, 인스타그램 등의 정보를 포함하며 간결하고 직관적으로 정리.<br/>
닫기 버튼을 통해 모달을 쉽게 종료할 수 있도록 설계.<br/>
Contact는 직관적인 인터페이스로 사용자 편의를 극대화한 기능입니다.

<br/><br/>
### Cursor
마우스를 따라다니는 커스텀 커서를 사용합니다.<br/>
`mix-blend-mode`를 활용해 밝은 배경에서는 검정으로, 어두운 배경에서는 흰색으로 자동 반전되며,<br/>
링크·버튼 위에서는 링 형태로 바뀌어 클릭 가능한 요소임을 알려줍니다.



<br/><br/>
## Intro
인트로는 "From Designer to Deblisher"라는 핵심 주제를 텍스트 애니메이션으로 표현한 화면으로 시작됩니다.<br/>
<div align="left">
  <img src="https://github.com/user-attachments/assets/d97aaf6a-21ac-41e6-8914-7d6301f51644" width="700"/>
</div>
<br/>
중앙에 배치된 문구가 차례로 등장하며, 세 가지 메시지를 순차적으로 보여줍니다.<br/>
From: Designer To: Deblisher →
From: Sketch To: Screen →
From: Idea To: Interaction →
각 문구는 움직이는 그라데이션 애니메이션으로 강조되며, 화면의 주제를 전달합니다.<br/>
인트로가 끝나면 자연스럽게 메인 섹션으로 이어집니다.

<br/><br/>
## Main Page
1페이지는 포트폴리오의 메인 메시지를 전달하며,
시각적 효과와 인터랙티브 요소를 통해 강렬한 인상을 남기는 섹션입니다.
<div align="left">
  <img src="https://github.com/user-attachments/assets/f4b05a25-5455-48a6-a06d-a942e37b3d5f" width="700"/>
</div>
<br/>

"From Designer to Deblisher" <br/>
중앙에 배치된 핵심 텍스트는 차례로 등장하며, <br/>
움직이는 그라데이션 애니메이션 효과를 통해 시각적으로 강조됩니다. <br/>
이 텍스트는 디자인과 개발을 함께 다루는 저의 작업 방식을 상징적으로 보여줍니다. <br/>
<br/>

Three.js와 GSAP를 활용한 **3D 알파벳 D** <br/>

**D**esigner와 **D**eveloper를 모두 아우르는 알파벳 D는<br/>
Three.js를 활용해 3D 형태로 구현되었으며,<br/>
GSAP를 사용해 입체적이고 역동적인 애니메이션 효과를 추가했습니다.
<br/><br/>

**- 입체적 등장 효과** <br/>
알파벳 D는 초기에는 뒤에서 누워있는 형태로 보이지 않다가,<br/>
GSAP를 활용해 포물선을 그리며 앞으로 등장합니다.<br/>
이 움직임은 D가 화면 중심에 안정적으로 배치될 때까지 부드럽게 이어지며<br/>
사용자의 시선을 자연스럽게 끌어옵니다.<br/>
<br/><br/>
<div align="left">
  <img src="https://github.com/user-attachments/assets/25452536-4f98-4b88-a689-17c11d4608d1" width="300"/>
</div>
<br/>

**- 호버 및 드래그 기능**<br/>
알파벳 D 위에 마우스를 올리면 **"move Freely"**라는 안내 텍스트가 나타납니다.<br/>
드래그를 통해 D를 자유롭게 회전시키거나 움직일 수 있어,<br/>
사용자가 인터랙티브한 경험을 즐길 수 있습니다.<br/>
<br/><br/>
**- 스크롤 및 휠 클릭**<br/>
마우스 스크롤을 사용하면 알파벳 D의 크기를 확대할 수 있습니다.<br/>
휠 클릭 후 마우스를 움직이면 D의 크기를 세밀하게 조정할 수 있습니다.<br/>
이 3D 요소는 GSAP와 Three.js의 조화를 통해<br/>
사용자와 상호작용하며 흥미를 유발하는 시각적 중심점 역할을 합니다.<br/>
<br/><br/>
**- 설명 텍스트**<br/>
3D 알파벳 D와 함께 아래에는 설명 텍스트가 나타나며,<br/>
디자인과 개발의 융합이라는 주제를 구체적으로 전달합니다.<br/>
텍스트는 아래와 같이 구성되어 있습니다.
<br/><br/>
<div align="left">
  <img src="https://github.com/user-attachments/assets/a9bb9519-971c-4483-ac40-ca8cbdb57383" width="700"/>
</div>
<br/>
"Where the designer’s ideas meet the Deblisher’s ability to realize them,<br/>
I craft intuitive and practical experiences with care."<br/>
디자이너의 아이디어와 개발자의 실현 가능성이 만나,<br/>
창의와 세심함으로 직관적이고 실용적인 경험을 만들어갑니다.<br/><br/>
스크롤하면 "From Designer"와 "To Deblisher"라는 두 단어가 분리되며 Preview 섹션으로 전환됩니다.
<br/><br/>
<div align="left">
  <img src="readmeImg/preview.gif" width="700"/>
</div>

**Preview Section**<br/>
Preview 섹션은 작업물의 미리보기를 제공하며, UI/UX와 GRAPHIC 섹션으로 이동할 수 있습니다.<br/>
각 카드에 호버하면 작업물의 대표 이미지가 나타나고, 클릭하면 상세 페이지로 이동합니다.
<br/><br/><br/>

## About Page
About 섹션에서는 저의 성장 과정과 경력을 간략히 정리하고, 추가적으로 상세 정보를 확인할 수 있도록 구성했습니다.
<div align="left">
  <img src="readmeImg/about.gif" width="700"/>
</div>
<br/>

**- 구성:** 교육, 경력, 자격증 순서로 나열되어 있으며, 각 항목은 간결하고 명확하게 표현했습니다.<br/>
**- 'About Me' 모달창:** <br/>
'About Me' 버튼을 누르면 간단한 자기소개와 성장 배경을 담은 모달창이 나타납니다.<br/>
이 모달창은 디자인에서 출발해 퍼블리싱까지 다루게 된 배경을 한눈에 확인할 수 있도록 설계했습니다.<br/>
추가적으로 프론트엔드 기술을 익히며 진행한 주요 학습 과정도 포함되어 있습니다.
<br/><br/>
**skill Section** <br/>
Skill 섹션에서는 제가 익힌 기술들을 시각적으로 정리해 보여줍니다.
<br/>
퍼센트 바: 각 기술의 숙련도를 퍼센트로 나타내, 한눈에 이해할 수 있도록 설계했습니다.<br/>
**- 활용 사례:** <br/>
퍼센트 바 아래에는 각 기술에 대한 활용 숙련도, 설명을 작성했습니다.<br/>
스크롤 시 퍼센트 바가 채워지는 동적 효과를 추가했습니다.
<br/><br/><br/>


## UI/UX Page
UI/UX 섹션에서는 제가 진행한 주요 프로젝트를 소개하며, 인터랙티브한 요소를 통해 작업물의 세부 내용을 효과적으로 전달합니다.<br/>
각 프로젝트의 '자세히보기'를 누르면 기획 의도, 화면 구성, 디자인 방향성을 정리한 상세 페이지로 이동합니다.
<div align="left">
  <img src="readmeImg/project.gif" width="700"/>
</div>
<br/>

**사미텍 홈페이지 리뉴얼** <br/>
[사미텍 홈페이지 바로가기](https://www.samitech.kr/)
<br/>

**- 목적:** <br/>
AI 솔루션과 고용정보 시스템을 다루는 기업의 신뢰감을, 이미지가 아닌 **타이포그래피**로 전달하는 데 초점을 맞췄습니다.<br/><br/>
**- 구성 요소:** <br/>
회사의 비전 문장을 첫 화면 전체를 쓰는 크기로 배치해 메시지를 가장 먼저 읽히게 했습니다.<br/>
장식을 줄이고 글자 크기·굵기의 대비와 여백만으로 정보의 위계를 만들었습니다.
<br/><br/><br/>

**한국소비자원 리뉴얼** <br/>
[한국소비자원 리뉴얼 페이지 바로가기](https://github.com/yeonflower2na/Korea-Consumer-Agency-Renual) 
<br/>

**- 목적:** <br/>
기존 사이트의 복잡한 메뉴 구조를 간소화하고, 정보 접근성을 개선하는 데 초점을 맞췄습니다.<br/>
주요 사용층을 분석해 다크 테마를 적용해 가독성을 강화했습니다.<br/><br/>
**- 구성 요소:** <br/>
메뉴 구조를 단순화해 주요 정보를 쉽게 탐색할 수 있도록 설계했습니다.<br/>
피해구제 안내 섹션에서는 모달창을 사용해 단계적으로 정보를 제공하고, 절차도를 재디자인해 직관적으로 표현했습니다.<br/><br/>
**- 반응형 디자인:** <br/>
데스크톱과 모바일 환경 모두에서 일관된 사용자 경험을 제공하도록 제작했습니다.
<br/><br/><br/>
**인터파크 티켓 리뉴얼** <br/>
[인터파크 티켓 리뉴얼 페이지 바로가기](https://github.com/yeonflower2na/interpark-ticket-renewal) 
<br/>
**- 목적:** <br/>
사용자가 예매를 더 쉽게 할 수 있도록 레이아웃과 기능을 재구성했습니다.<br/><br/>
**- 구성 요소:** <br/>
로그인 영역을 기존과 달리 오른쪽에 배치해 사용자가 예매 내역과 관심 공연 정보를 한눈에 확인할 수 있게 했습니다.<br/>
공연장 페이지에는 등장 효과와 지도 API를 추가해 공연장 위치를 직관적으로 제공했습니다.<br/>
대표 공연 리스트는 바닐라 자바스크립트를 활용해 제작했으며, 호버 시 공연 정보를 표시하도록 설계했습니다.<br/><br/>
**- 클론코딩 프로젝트** <br/>
클래스101 클론코딩: SCSS를 사용해 디자인 일관성을 유지하며, 주요 레이아웃과 기능을 구현했습니다.<br/>
**- 팀 프로젝트** <br/>
Jurnee: React를 활용해 여행 일정 관리와 여행지 추천 기능을 중심으로 제작한 여행 플랜 사이트입니다.<br/>

<br/><br/>
## GRAPHIC Page
GRAPHIC 섹션에서는 이전에 작업했던 편집·시각디자인 결과물을 정리했습니다.<br/>
<div align="left">
  <img src="readmeImg/design.gif" width="700"/>
</div>
<br/>

**- 카테고리별 구성:** <br/>
편집디자인, 포스터 디자인, 신문 그래픽디자인 등으로 분류해 작업물을 나누었습니다.<br/>
'All' 탭에서는 모든 작업물을 한눈에 확인할 수 있습니다.<br/>
**- 최신순 정렬:** <br/>
작업물은 최신순으로 정리해, 사용자가 가장 최근 작업물을 쉽게 확인할 수 있도록 했습니다.<br/>
**- 호버 효과:** <br/>
작업물에 호버하면 해당 작업물의 대표 이미지가 나타나며, 사용자가 추가 정보를 확인할 수 있습니다.<br/>
**- 탭 구성:** <br/>
각 탭은 클릭 시 해당 카테고리의 작업물만 표시되도록 설계했으며, 데이터는 `designData.json`으로 분리해 관리합니다.<br/>
<br/><br/><br/>

## AX Page
AX 섹션은 **AI를 직접 업무에 적용해보며 바꿔온 방식과 결과를 기록**하는 공간입니다.<br/>
단순한 도구 사용 후기가 아니라, 어떤 문제를 어떤 방식으로 다뤘고 무엇이 달라졌는지를 남깁니다.
<br/><br/>

**- 게시판 형태:** <br/>
번호 · 카테고리 · 제목 · 날짜로 구성된 목록에서 글을 선택하면 상세 페이지로 이동합니다.<br/>
**- 마크다운 본문:** <br/>
글 내용은 마크다운 파일로 관리하며, 외부 라이브러리 없이 직접 만든 렌더러로 표시합니다.<br/>
제목 · 목록 · 인용 · 코드블록 · 이미지를 지원합니다.<br/>
**- 이미지 갤러리:** <br/>
연속으로 넣은 이미지는 한 줄로 모여 표시되고, 클릭하면 확대해서 볼 수 있습니다.<br/>
확대 화면에서는 좌우 버튼과 방향키로 이미지를 넘겨볼 수 있습니다.<br/>
**- 첨부파일:** <br/>
글마다 파일을 첨부할 수 있으며, 파일명과 용량을 표시하고 클릭하면 바로 내려받습니다.
<br/><br/>

**글 추가 방법**

1. 본문 마크다운 파일을 `next-portfolio/public/ax/` 에 추가합니다.
2. 이미지는 `public/ax/images/`, 첨부파일은 `public/ax/files/` 에 넣습니다.
3. `public/ax/posts.json` 에 항목을 추가합니다.

```json
{
  "id": "post-slug",
  "no": 3,
  "category": "AGENT",
  "title": "글 제목",
  "summary": "목록에 보일 한 줄 요약",
  "date": "2026.08.01",
  "file": "/ax/post-slug.md",
  "attachments": [
    { "name": "example.md", "file": "/ax/files/example.md", "size": "8.7 KB" }
  ]
}
```

`attachments`는 선택 항목이며, 없으면 첨부 영역이 표시되지 않습니다.<br/>
상세 페이지 주소는 `id` 를 따라 `/ax/post-slug` 가 됩니다.
<br/><br/><br/>
