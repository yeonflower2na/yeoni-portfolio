'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Contact from '@/components/Contact';

export default function Detail05() {
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/project6.JPG" alt="Class101" />
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
              <h1 className="detail-subtitle">[SASS] 클래스101 클론코딩</h1>
              <p className="detail-text">
                본 프로젝트는 <strong>Sass(SCSS)를 학습하고 적용하기 위한 목적</strong>으로
                진행한 클래스101 클론코딩 프로젝트입니다.
                <br />
                CSS 전처리기를 활용하여 유지보수성 높은 스타일 구조를 설계했습니다.
              </p>
              <br />
              <br />
              <p className="detail-text">
                <strong>클래스101(Class101)</strong>은 온라인 클래스 플랫폼으로,
                다양한 분야의 강의를 제공하는 서비스입니다.
              </p>
              <p className="detail-text">클론코딩은 다음의 목표를 중점으로 설계되었습니다</p>
              <ul className="detail-list">
                <li>- Sass 변수, 믹스인, 중첩 규칙을 활용한 모듈화된 스타일 작성</li>
                <li>- 컴포넌트 기반의 재사용 가능한 CSS 구조 설계</li>
                <li>- 실제 서비스와 유사한 레이아웃 및 인터랙션 구현</li>
              </ul>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">프로젝트 바로가기</h1>
              <ul className="detail-link">
                <li>
                  <a
                    href="https://yeonflower2na.github.io/class101-clone/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗 클론코딩 결과물 [라이브 사이트]
                  </a>
                </li>
              </ul>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">제작 일정</h1>
              <div className="detail-list">
                <li className="list-tab">
                  <span>기획</span> 2025.01 : 구현 범위 선정 및 분석
                </li>
                <li className="list-tab">
                  <span>디자인</span> 2025.01 : 레이아웃 분석 및 스타일 가이드 정리
                </li>
                <li className="list-tab">
                  <span>개발</span> 2025.01 : Sass 기반 퍼블리싱 구현
                </li>
              </div>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">주요 기능</h1>
              <div className="detail-feature">
                <h3 className="detail-article-title">📌 메인 페이지</h3>
                <ul className="detail-list">
                  <li className="main-desc">
                    <span>헤더 & 네비게이션</span>
                    로고, 카테고리 메뉴, 검색 및 로그인 영역으로 구성된 상단 헤더
                  </li>
                  <li className="main-desc">
                    <span>메인 비주얼</span>
                    프로모션 배너 슬라이더와 핵심 카피가 포함된 히어로 영역
                  </li>
                  <li className="main-desc">
                    <span>추천 클래스</span>
                    카드형 레이아웃으로 인기 강의와 신규 강의 목록 제공
                  </li>
                  <li className="main-desc">
                    <span>푸터</span>
                    사이트 정보, 정책 링크, SNS 연결을 포함한 풀 푸터
                  </li>
                </ul>
                <br />
                <h3 className="detail-article-title">📌 카테고리</h3>
                <ul className="detail-list">
                  <li className="main-desc">
                    <span>카테고리 탭</span>
                    드로잉, 공예, 요리 등 분야별 카테고리 탭 필터
                  </li>
                  <li className="main-desc">
                    <span>강의 목록</span>
                    선택한 카테고리에 해당하는 강의 카드 목록 표시
                  </li>
                </ul>
                <br />
                <h3 className="detail-article-title">📌 슬라이더</h3>
                <ul className="detail-list">
                  <li className="main-desc">
                    <span>배너 슬라이더</span>
                    자동 재생과 네비게이션 버튼이 있는 메인 배너
                  </li>
                  <li className="main-desc">
                    <span>강의 슬라이더</span>
                    다수의 강의 카드를 좌우 스크롤로 탐색하는 카드 슬라이더
                  </li>
                </ul>
              </div>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">사용 기술 및 도구</h1>
              <ul className="detail-list">
                <li className="list-tab">
                  <span>개발</span> HTML5, CSS3, Sass(SCSS), JavaScript
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
