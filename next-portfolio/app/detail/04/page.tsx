'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Contact from '@/components/Contact';

export default function Detail04() {
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
              <img src="/assets/images/project3-1.png" alt="Jurnee" />
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
              <h1 className="detail-subtitle">React [팀프로젝트] - 여행 플랜 사이트 Jurnee</h1>
              <p className="detail-text">
                본 프로젝트는 <strong>React 기반의 여행 플랜 사이트</strong>를 제작한 팀 프로젝트입니다.
                <br />
                여행 일정 관리와 여행지 추천 기능을 중심으로 사용자 친화적인 UI를 구현했습니다.
              </p>
              <br />
              <br />
              <p className="detail-text">
                <strong>Jurnee</strong>는 사용자가 여행 일정을 직접 계획하고 관리할 수 있는
                여행 플래너 플랫폼으로, 소셜 로그인과 여행지 추천 기능을 통해
                편리한 여행 계획 수립을 돕습니다.
              </p>
              <p className="detail-text">프로젝트는 다음의 목표를 중점으로 설계되었습니다</p>
              <ul className="detail-list">
                <li>- React 컴포넌트 기반의 재사용 가능한 UI 구조 설계</li>
                <li>- 직관적인 일정 플래너 인터페이스 구현</li>
                <li>- 소셜 로그인을 통한 간편한 사용자 인증</li>
              </ul>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">프로젝트 바로가기</h1>
              <ul className="detail-link">
                <li>
                  <a
                    href="https://www.figma.com/design/jurnee-travel-planner"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🎨 UX/UI 디자인 [Figma]
                  </a>
                </li>
              </ul>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">제작 일정</h1>
              <div className="detail-list">
                <li className="list-tab">
                  <span>기획</span> 2025.01 : 서비스 기획 및 요구사항 정의
                </li>
                <li className="list-tab">
                  <span>디자인</span> 2025.02 : UI/UX 디자인 및 프로토타입 제작
                </li>
                <li className="list-tab">
                  <span>개발</span> 2025.02 ~ 03 : React 컴포넌트 개발 및 기능 구현
                </li>
              </div>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">주요 기능</h1>
              <div className="detail-feature">
                <h3 className="detail-article-title">📌 메인 비주얼</h3>
                <ul className="detail-list">
                  <li className="main-desc">
                    <span>히어로 섹션</span>
                    여행 감성을 살린 풀스크린 비주얼과 검색 기능 제공
                  </li>
                  <li className="main-desc">
                    <span>인기 여행지</span>
                    카드형 레이아웃으로 추천 여행지 목록 제공
                  </li>
                </ul>
                <br />
                <h3 className="detail-article-title">📌 여행 일정 플래너</h3>
                <ul className="detail-list">
                  <li className="main-desc">
                    <span>일정 생성</span>
                    날짜 선택과 여행지 추가로 나만의 여행 일정 생성
                  </li>
                  <li className="main-desc">
                    <span>드래그 앤 드롭</span>
                    일정 항목을 드래그하여 순서 변경 가능
                  </li>
                  <li className="main-desc">
                    <span>일정 저장</span>
                    생성한 여행 플랜을 저장하고 언제든지 조회
                  </li>
                </ul>
                <br />
                <h3 className="detail-article-title">📌 여행지 추천</h3>
                <ul className="detail-list">
                  <li className="main-desc">
                    <span>카테고리별 필터</span>
                    국내/해외, 테마별 여행지 필터링
                  </li>
                  <li className="main-desc">
                    <span>여행지 상세</span>
                    여행지 정보, 사진, 주변 관광지 안내
                  </li>
                </ul>
                <br />
                <h3 className="detail-article-title">📌 소셜 로그인</h3>
                <ul className="detail-list">
                  <li className="main-desc">
                    <span>간편 로그인</span>
                    소셜 계정을 통한 빠른 회원가입 및 로그인 기능
                  </li>
                  <li className="main-desc">
                    <span>마이페이지</span>
                    저장된 일정 및 즐겨찾기 여행지 관리
                  </li>
                </ul>
              </div>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">사용 기술 및 도구</h1>
              <ul className="detail-list">
                <li className="list-tab">
                  <span>개발</span> React, JavaScript
                </li>
                <li className="list-tab">
                  <span>디자인</span> Figma
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
