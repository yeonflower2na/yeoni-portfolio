'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Contact from '@/components/Contact';

export default function Detail02() {
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
              <h1 className="detail-subtitle">인터파크 티켓 리뉴얼</h1>
              <p className="detail-text">
                본 프로젝트는 <strong>팀 프로젝트</strong>로 진행한 티켓 예매 사이트 리뉴얼입니다.
                <br />
                UX/UI 디자인부터 퍼블리싱까지 팀원들과 역할을 분담하여 수행하였습니다.
              </p>
              <br />
              <br />
              <p className="detail-text">
                <strong>인터파크 티켓(Interpark Ticket)</strong>은 공연, 스포츠, 전시 등 다양한
                문화 콘텐츠를 예매할 수 있는 플랫폼입니다.
              </p>
              <p className="detail-text">리뉴얼은 다음의 목표를 중점으로 설계되었습니다</p>
              <ul className="detail-list">
                <li>- 사용자 중심의 직관적인 예매 흐름 개선</li>
                <li>- 브랜드 정체성을 반영한 일관된 디자인 시스템 구축</li>
                <li>- 다양한 콘텐츠 카테고리에 대응하는 유연한 레이아웃</li>
              </ul>
              <br />
              <p className="detail-text">
                <strong>팀 구성</strong>
              </p>
              <ul className="detail-list">
                <li className="list-tab">
                  <span>고윤정</span> 팀장
                </li>
                <li className="list-tab">
                  <span>정연희</span> 디자인 & 퍼블리싱
                </li>
                <li className="list-tab">
                  <span>고경현</span> 디자인 & 퍼블리싱
                </li>
                <li className="list-tab">
                  <span>윤다경</span> 디자인 & 퍼블리싱
                </li>
              </ul>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">프로젝트 바로가기</h1>
              <ul className="detail-link">
                <li>
                  <a
                    href="https://yeonflower2na.github.io/interpark-ticket-renewal/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗 리뉴얼 결과물 [라이브 사이트]
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/yeonflower2na/interpark-ticket-renewal"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💻 프로젝트 코드 [GitHub]
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.figma.com/design/interpark-ticket-renewal"
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
                  <span>기획</span> 2024.11 : 사용자 요구 분석 및 리뉴얼 방향 수립
                </li>
                <li className="list-tab">
                  <span>디자인</span> 2024.11 ~ 12 : UX/UI 설계 및 프로토타입 제작
                </li>
                <li className="list-tab">
                  <span>개발</span> 2024.12 : 반응형 퍼블리싱 및 인터랙션 구현
                </li>
              </div>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">주요 기능</h1>
              <div className="detail-feature">
                <h3 className="detail-article-title">📌 공통 레이아웃</h3>
                <ul className="detail-list">
                  <li className="main-desc">
                    <span>Header</span>
                    로고, 검색, 카테고리 네비게이션 및 로그인 영역으로 구성된 헤더
                  </li>
                  <li className="main-desc">
                    <span>Footer</span>
                    사이트맵, 고객센터, SNS 링크를 포함한 풀 푸터 구성
                  </li>
                  <li className="main-desc">
                    <span>배너</span>
                    프로모션 배너 슬라이더로 시각적 주목도 강화
                  </li>
                </ul>
                <br />
                <h3 className="detail-article-title">📌 메인 페이지</h3>
                <ul className="detail-list">
                  <li className="main-desc">
                    <span>Section 1 – 메인 비주얼</span>
                    대형 히어로 배너와 슬라이더로 주요 공연 정보 제공
                  </li>
                  <li className="main-desc">
                    <span>Section 2 – 추천 공연</span>
                    카드형 레이아웃으로 인기 공연 및 티켓 정보 표시
                  </li>
                  <li className="main-desc">
                    <span>Section 3 – 카테고리별 공연</span>
                    뮤지컬, 콘서트, 스포츠 등 카테고리별 필터 탭 구성
                  </li>
                  <li className="main-desc">
                    <span>Section 4 – 랭킹</span>
                    실시간 예매 순위를 시각적으로 표현한 랭킹 리스트
                  </li>
                  <li className="main-desc">
                    <span>Section 5 – 이벤트/기획전</span>
                    배너형 이벤트 영역으로 프로모션 정보 강조
                  </li>
                  <li className="main-desc">
                    <span>Section 6 – 스포츠</span>
                    스포츠 경기 일정 및 예매 링크 제공
                  </li>
                  <li className="main-desc">
                    <span>Section 7 – 전시/클래식</span>
                    전시 및 클래식 공연 카드 목록
                  </li>
                  <li className="main-desc">
                    <span>Section 8 – 빠른예매</span>
                    공연명 검색 및 날짜 선택으로 빠른 예매 접근
                  </li>
                </ul>
                <br />
                <h2 className="detail-article-title">📌 서브 페이지</h2>
                <ul className="detail-list">
                  <li className="main-desc">
                    <span>서브페이지1 - 공연 홀 안내</span>
                    공연장 정보, 좌석 배치도, 오시는 길 안내 페이지
                  </li>
                  <li className="main-desc">
                    <span>서브페이지2 - 예매 페이지</span>
                    날짜/좌석 선택, 결제 흐름을 단계별로 구성한 예매 UI
                  </li>
                </ul>
              </div>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">디자인 방향성</h1>
              <ul className="detail-list">
                <li>
                  <strong>브랜드 일관성:</strong> 인터파크 브랜드 컬러와 아이덴티티를 반영한 통일된 디자인 언어
                </li>
                <li>
                  <strong>콘텐츠 중심 레이아웃:</strong> 다양한 공연 정보를 카드형으로 정리하여 시인성 극대화
                </li>
                <li>
                  <strong>직관적인 예매 흐름:</strong> 최소한의 클릭으로 예매 완료에 도달하는 UX 설계
                </li>
                <li>
                  <strong>시각적 위계 강화:</strong> 타이포그래피와 색상으로 주요 정보와 보조 정보 구분
                </li>
              </ul>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">폴더 구조</h1>
              <pre className="detail-pre">
                {`📦 인터파크티켓\n ┣ 📄 index.html\n ┣ 📄 resetCSS.css\n ┣ 📂 footer\n ┣ 📂 header\n ┣ 📂 login-modal\n ┣ 📂 main\n ┣ 📂 sub-hall\n ┗ 📂 sub-reservation`}
              </pre>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">사용 기술 및 도구</h1>
              <ul className="detail-list">
                <li className="list-tab">
                  <span>개발</span> HTML5, CSS3, JavaScript, Swiper
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
