'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Contact from '@/components/Contact';

export default function Detail03() {
  const router = useRouter();

  useEffect(() => {
    document.body.style.backgroundColor = 'var(--white)';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <>
      <Header />
      <Contact />
      <main className="detail-main">
        <div className="detail-container">
          {/* LEFT */}
          <div className="detail-left">
            <div className="detail-video">
              <video src="/assets/videos/kca-demo.mp4" controls />
            </div>
          </div>

          {/* RIGHT */}
          <div className="detail-right">
            <div className="detail-box">
              <button
                className="detail-button"
                onClick={() => router.push('/project')}
              >
                <i className="fa-solid fa-arrow-left"></i> 프로젝트 목록으로
              </button>
              <h1 className="detail-subtitle">Yeoni&#39;s Portfolio</h1>
              <p className="detail-text">
                본 프로젝트는 <strong>디자이너에서 퍼블리셔로 성장하는 과정</strong>을 담은
                <br />
                개인 포트폴리오 사이트입니다.
              </p>
              <br />
              <br />
              <p className="detail-text">
                기획, 디자인, 개발까지 <strong>전 과정을 단독으로 수행</strong>하였으며,
                <br />
                다양한 라이브러리와 애니메이션 기술을 활용하여 인터랙티브한 경험을 구현했습니다.
              </p>
              <p className="detail-text">포트폴리오는 다음의 목표를 중점으로 설계되었습니다</p>
              <ul className="detail-list">
                <li>- 브랜드 아이덴티티를 반영한 개성 있는 UI 디자인</li>
                <li>- GSAP 및 Three.js를 활용한 몰입형 애니메이션 구현</li>
                <li>- 작업물의 효과적인 전달을 위한 정보 구조 설계</li>
              </ul>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">프로젝트 바로가기</h1>
              <ul className="detail-link">
                <li>
                  <a
                    href="https://yeonflower2na.github.io/yeoni-portfolio/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗 포트폴리오 [라이브 사이트]
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/yeonflower2na/yeoni-portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💻 프로젝트 코드 [GitHub]
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.figma.com/design/yeoni-portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🎨 UX/UI 디자인 [Figma]
                  </a>
                </li>
              </ul>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">주요 기능</h1>
              <div className="detail-feature">
                <h3 className="detail-article-title">📌 Intro</h3>
                <ul className="detail-list">
                  <li className="main-desc">
                    <span>Three.js 3D 오브젝트</span>
                    인터랙티브한 3D 파티클 효과로 강렬한 첫 인상 제공
                  </li>
                  <li className="main-desc">
                    <span>타이핑 애니메이션</span>
                    GSAP 기반 텍스트 등장 효과로 브랜드 메시지 전달
                  </li>
                </ul>
                <br />
                <h3 className="detail-article-title">📌 About Me</h3>
                <ul className="detail-list">
                  <li className="main-desc">
                    <span>스킬 영역</span>
                    사용 기술과 숙련도를 시각화한 스킬 바 구성
                  </li>
                  <li className="main-desc">
                    <span>타임라인</span>
                    학습 경력과 성장 과정을 타임라인으로 표현
                  </li>
                </ul>
                <br />
                <h3 className="detail-article-title">📌 Project</h3>
                <ul className="detail-list">
                  <li className="main-desc">
                    <span>프로젝트 카드</span>
                    작업물을 카드형으로 배치하여 썸네일과 기본 정보 제공
                  </li>
                  <li className="main-desc">
                    <span>디자인 필터</span>
                    카테고리별 필터로 원하는 작업물 탐색 기능
                  </li>
                </ul>
                <br />
                <h3 className="detail-article-title">📌 공통 기능</h3>
                <ul className="detail-list">
                  <li className="main-desc">
                    <span>스크롤 애니메이션</span>
                    GSAP ScrollTrigger를 활용한 섹션별 등장 애니메이션
                  </li>
                  <li className="main-desc">
                    <span>커스텀 커서</span>
                    브랜드 감성을 살린 커스텀 마우스 커서 구현
                  </li>
                  <li className="main-desc">
                    <span>Contact 모달</span>
                    연락처 정보를 포함한 홀로그램 스타일 모달
                  </li>
                </ul>
              </div>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">폴더 구조</h1>
              <pre className="detail-pre">
                {`📦 yeoni-portfolio\n ┣ 📂 assets\n ┃ ┣ 📂 images\n ┃ ┗ 📂 videos\n ┣ 📂 css\n ┣ 📂 js\n ┣ 📄 index.html\n ┣ 📄 about.html\n ┣ 📄 project.html\n ┗ 📄 design.html`}
              </pre>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">사용 기술 및 도구</h1>
              <ul className="detail-list">
                <li className="list-tab">
                  <span>개발</span> HTML5, CSS3, JavaScript, GSAP, Three.js, Swiper
                </li>
                <li className="list-tab">
                  <span>디자인</span> Figma
                </li>
                <li className="list-tab">
                  <span>개발 환경</span> VS Code
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
