'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Contact from '@/components/Contact';

export default function Detail06() {
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
              <img src="/assets/images/project7.png" alt="사미텍 홈페이지 리뉴얼" />
            </div>
          </div>

          {/* RIGHT */}
          <div className="detail-right">
            <div className="detail-box">
              <button
                className="detail-button"
                onClick={() => router.push('/uiux')}
              >
                <i className="fa-solid fa-arrow-left"></i> 프로젝트 목록으로
              </button>
              <h1 className="detail-subtitle">사미텍 홈페이지 리뉴얼</h1>
              <p className="detail-text">
                본 프로젝트는 <strong>실무에서 진행한 기업 홈페이지 리뉴얼</strong>로,
                <br />
                기획 방향 정리부터 화면 디자인까지 참여했습니다.
              </p>
              <br />
              <br />
              <p className="detail-text">
                <strong>(주)사미텍</strong>은 자체 AI 솔루션 <strong>SAMIGPT</strong>를 비롯해
                <br />
                고용정보 시스템 구축과 직업훈련 평가, 빅데이터 분석을 수행하는 기업입니다.
              </p>
              <p className="detail-text">리뉴얼은 다음의 목표를 중점으로 설계되었습니다</p>
              <ul className="detail-list">
                <li>- 기술 기업의 신뢰감을 과장 없이 전달</li>
                <li>- 사업 영역과 성과를 한눈에 파악할 수 있는 정보 구조</li>
                <li>- 이미지가 아닌 타이포그래피 중심의 화면 설계</li>
              </ul>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">프로젝트 바로가기</h1>
              <ul className="detail-link">
                <li>
                  <a
                    href="https://www.samitech.kr/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗 사미텍 홈페이지 [라이브 사이트]
                  </a>
                </li>
              </ul>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">디자인 컨셉 — 타이포그래피</h1>
              <p className="detail-text">
                사미텍의 핵심 제품은 <strong>언어를 다루는 AI</strong>입니다.
                <br />
                그래서 화면의 주인공을 이미지가 아닌 <strong>글자 자체</strong>로 두었습니다.
              </p>
              <br />
              <ul className="detail-list">
                <li className="main-desc">
                  <span>메시지를 먼저 읽히게</span>
                  &ldquo;도전적인 아이디어도, 어떤 창의적인 비전도 우리는 함께 만들어갑니다&rdquo;라는
                  회사의 문장을 첫 화면 전체를 쓰는 크기로 배치해, 방문자가 무엇보다 메시지를 먼저 읽도록 했습니다
                </li>
                <li className="main-desc">
                  <span>장식 대신 대비</span>
                  선·아이콘·배경 이미지를 줄이고, 글자 크기와 굵기의 차이만으로 정보의 위계를 만들었습니다
                </li>
                <li className="main-desc">
                  <span>여백을 구조로</span>
                  섹션 사이의 넉넉한 여백이 곧 구분선 역할을 하도록 해, 화면이 조용하면서도 리듬을 갖도록 설계했습니다
                </li>
                <li className="main-desc">
                  <span>영문과 국문의 역할 분리</span>
                  SOLUTION · OUR WORKS 같은 영문은 섹션을 여는 표지로, 국문은 실제 내용을 전달하는 본문으로
                  역할을 나눠 두 언어가 섞여도 시선이 흐트러지지 않게 했습니다
                </li>
                <li className="main-desc">
                  <span>읽는 흐름을 만드는 정렬</span>
                  좌측 정렬을 기본으로 삼아 시선의 시작점을 고정하고, 강조가 필요한 슬로건에서만
                  정렬과 크기를 달리해 화면의 전환점을 만들었습니다
                </li>
              </ul>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">화면 구성</h1>
              <div className="detail-feature">
                <h3 className="detail-article-title">📌 메인 페이지</h3>
                <ul className="detail-list">
                  <li className="main-desc">
                    <span>Section 1 – 슬로건</span>
                    회사의 비전 문장을 큰 타이포로 제시해 첫인상을 메시지로 만드는 영역
                  </li>
                  <li className="main-desc">
                    <span>Section 2 – SOLUTION</span>
                    자체 AI 솔루션 SAMIGPT를 소개하고, &ldquo;보안·가격·사용성 걱정없이 바로 적용하는 AI&rdquo;라는
                    핵심 가치를 한 줄로 전달
                  </li>
                  <li className="main-desc">
                    <span>Section 3 – SAMI NEWS</span>
                    회사 소식을 최신순으로 배치해 활동이 이어지고 있음을 보여주는 영역
                  </li>
                  <li className="main-desc">
                    <span>Section 4 – OUR WORKS</span>
                    수행 사업을 카드로 정리해 사업 범위를 한눈에 파악하도록 구성
                  </li>
                  <li className="main-desc">
                    <span>Section 5 – PARTNERS / 채용</span>
                    협력 관계와 채용 안내를 이어 붙여 기업의 규모와 성장을 함께 전달
                  </li>
                  <li className="main-desc">
                    <span>Section 6 – Contact Us</span>
                    문의 폼을 페이지 하단에 배치해 상담까지 한 흐름으로 연결
                  </li>
                </ul>
                <br />
                <h2 className="detail-article-title">📌 서브 페이지</h2>
                <ul className="detail-list">
                  <li className="main-desc">
                    <span>Works</span>
                    개별 사업의 배경과 결과를 정리한 사업 상세 페이지
                  </li>
                  <li className="main-desc">
                    <span>Business Performance</span>
                    수행 실적을 목록으로 정리해 신뢰의 근거를 제공하는 페이지
                  </li>
                  <li className="main-desc">
                    <span>Career</span>
                    채용 절차와 인재상을 안내하는 페이지
                  </li>
                  <li className="main-desc">
                    <span>Contact</span>
                    문의 폼과 회사 정보, 회사 소개서 다운로드를 제공하는 페이지
                  </li>
                </ul>
              </div>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">디자인 방향성</h1>
              <ul className="detail-list">
                <li>
                  <strong>타이포그래피 중심 설계:</strong> 이미지에 기대지 않고 글자의 크기·굵기·여백으로
                  화면의 인상과 위계를 만듦
                </li>
                <li>
                  <strong>정보 구조 단순화:</strong> 솔루션 · 사업 · 성과 · 채용 · 문의로 목적을 나눠
                  방문자가 원하는 정보까지 최단 경로로 도달
                </li>
                <li>
                  <strong>절제된 색 사용:</strong> 무채색을 기본으로 두고 포인트 컬러는 행동을 유도하는
                  버튼과 강조 문구에만 사용
                </li>
                <li>
                  <strong>일관된 컴포넌트:</strong> 버튼 · 카드 · 섹션 헤더의 규칙을 정의해
                  페이지가 늘어나도 톤이 흔들리지 않도록 설계
                </li>
                <li>
                  <strong>반응형 대응:</strong> 큰 타이포가 좁은 화면에서도 읽히도록 단계별 크기 기준을 마련
                </li>
              </ul>
            </div>

            <div className="detail-box">
              <h1 className="detail-subtitle">담당 역할</h1>
              <ul className="detail-list">
                <li className="list-tab">
                  <span>기획</span> 정보 구조 정리 및 화면 흐름 설계
                </li>
                <li className="list-tab">
                  <span>디자인</span> 메인·서브 페이지 UI 디자인, 타이포그래피 규칙 정의
                </li>
                <li className="list-tab">
                  <span>도구</span> Figma, Photoshop, Illustrator
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
