// AI 활용 능력 진단 게임 - 확장 문제 데이터베이스
// 10개 카테고리 × 30개 질문 (초급 10, 중급 10, 고급 10) = 총 300개 문제

const EXTENDED_QUESTIONS = {
  // 1. 실무 활용 (Practical Use)
  practical: {
    beginner: [
      {
        id: "prac_b1",
        title: "AI로 이메일을 작성할 때 가장 효과적인 방법은?",
        options: ["전체 내용을 AI가 작성하게 한다", "핵심 내용을 먼저 작성하고 AI로 다듬는다", "AI 없이 직접 작성한다"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "prac_b2",
        title: "AI에게 코드 리뷰를 요청할 때 포함해야 할 정보는?",
        options: ["코드만 복사해서 붙여넣기", "코드와 함께 목적과 컨텍스트 설명", "실행 결과만 보여주기"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "prac_b3",
        title: "긴 문서를 AI로 요약할 때 최적의 방법은?",
        options: ["전체를 한 번에 입력", "섹션별로 나누어 요약 후 통합", "첫 페이지만 요약"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "prac_b4",
        title: "AI로 프레젠테이션을 준비할 때 순서는?",
        options: ["AI가 전체 내용 생성 → 그대로 사용", "아웃라인 작성 → AI로 내용 보강", "이미지만 AI로 생성"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "prac_b5",
        title: "AI로 데이터 분석을 요청할 때 가장 중요한 것은?",
        options: ["데이터 형식과 구조를 명확히 설명", "파일 이름만 알려주기", "결과만 요구하기"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "prac_b6",
        title: "AI로 번역 작업을 할 때 주의점은?",
        options: ["직역만 요청", "문맥과 대상 독자를 함께 설명", "한 문장씩 번역"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "prac_b7",
        title: "AI로 마케팅 카피를 작성할 때 필수 정보는?",
        options: ["타겟 고객과 브랜드 톤앤매너", "경쟁사 카피 복사", "글자 수만 지정"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "prac_b8",
        title: "AI로 회의록을 작성하는 가장 효율적인 방법은?",
        options: ["녹음 파일 직접 업로드", "메모를 정리해서 AI로 구조화", "AI가 실시간으로 참여"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "prac_b9",
        title: "AI로 보고서를 작성할 때 첫 단계는?",
        options: ["전체 보고서를 AI가 작성", "목차와 구조를 먼저 잡기", "결론부터 작성"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "prac_b10",
        title: "AI로 일정 관리를 할 때 효과적인 방법은?",
        options: ["모든 일정을 AI가 결정", "우선순위를 정하고 AI로 최적화", "AI 사용 안함"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      }
    ],
    intermediate: [
      {
        id: "prac_i1",
        title: "복잡한 엑셀 수식을 AI로 생성할 때 베스트 프랙티스는?",
        options: ["원하는 결과를 예시와 함께 설명", "수식만 요청", "VBA 매크로로 대체"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "prac_i2",
        title: "AI로 SQL 쿼리를 작성할 때 제공해야 할 정보는?",
        options: ["테이블명만", "테이블 구조, 관계, 원하는 결과", "데이터베이스 종류만"],
        correct: 1,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "prac_i3",
        title: "AI로 API 문서를 작성할 때 포함해야 할 요소는?",
        options: ["엔드포인트, 파라미터, 응답 예시, 에러 처리", "URL만", "설명만"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "prac_i4",
        title: "AI로 테스트 케이스를 생성할 때 방법은?",
        options: ["랜덤 생성", "기능 명세와 edge case 설명", "정상 케이스만"],
        correct: 1,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "prac_i5",
        title: "AI로 UX 카피라이팅을 할 때 고려사항은?",
        options: ["문법만 체크", "사용자 시나리오와 감정 고려", "짧게만 작성"],
        correct: 1,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "prac_i6",
        title: "AI로 코드 리팩토링을 요청할 때 순서는?",
        options: ["전체 코드 한번에 리팩토링", "목적 설명 → 단계별 개선", "변수명만 변경"],
        correct: 1,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "prac_i7",
        title: "AI로 데이터 시각화를 요청할 때 명시할 사항은?",
        options: ["차트 종류, 축 설명, 인사이트 포인트", "색상만 지정", "데이터만 제공"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "prac_i8",
        title: "AI로 프로젝트 리스크 분석을 할 때 방법은?",
        options: ["AI가 모든 리스크 예측", "프로젝트 컨텍스트 제공 후 분석 요청", "일반적인 리스크만 확인"],
        correct: 1,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "prac_i9",
        title: "AI로 기술 문서를 작성할 때 구조는?",
        options: ["개요 → 상세 → 예시 → FAQ", "상세 내용만", "코드만 포함"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "prac_i10",
        title: "AI로 A/B 테스트를 설계할 때 필요한 정보는?",
        options: ["테스트명만", "가설, 지표, 대상, 기간", "결과 예측만"],
        correct: 1,
        enemyType: "prompt_eater",
        exp: 15
      }
    ],
    advanced: [
      {
        id: "prac_a1",
        title: "AI로 마이크로서비스 아키텍처를 설계할 때 접근법은?",
        options: ["요구사항 → 도메인 분석 → 서비스 분할 → 통신 설계", "서비스 개수만 정하기", "모놀리식으로 시작"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "prac_a2",
        title: "AI로 머신러닝 파이프라인을 구축할 때 순서는?",
        options: ["모델만 만들기", "데이터 준비 → 전처리 → 모델링 → 평가 → 배포", "정확도만 높이기"],
        correct: 1,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "prac_a3",
        title: "AI로 DevOps 자동화를 구현할 때 전략은?",
        options: ["CI/CD 파이프라인 설계 → 모니터링 → 롤백 전략", "배포만 자동화", "수동 관리"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "prac_a4",
        title: "AI로 보안 취약점 분석을 할 때 방법은?",
        options: ["코드만 스캔", "OWASP 기준 → 코드 분석 → 펜테스팅 시나리오", "에러 메시지만 확인"],
        correct: 1,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "prac_a5",
        title: "AI로 분산 시스템을 디버깅할 때 접근법은?",
        options: ["로그 수집 → 트레이싱 → 병목 분석 → 최적화", "에러만 확인", "재시작만 하기"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "prac_a6",
        title: "AI로 블록체인 스마트 컨트랙트를 검증할 때는?",
        options: ["코드만 확인", "비즈니스 로직 → 보안 → 가스 최적화", "배포만 하기"],
        correct: 1,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "prac_a7",
        title: "AI로 실시간 데이터 처리 시스템을 설계할 때는?",
        options: ["스트림 처리 → 윈도우 → 집계 → 저장", "배치만 처리", "저장만 하기"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "prac_a8",
        title: "AI로 성능 최적화를 할 때 프로세스는?",
        options: ["코드만 수정", "프로파일링 → 병목 식별 → 최적화 → 검증", "하드웨어만 추가"],
        correct: 1,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "prac_a9",
        title: "AI로 다국어 시스템을 구현할 때 고려사항은?",
        options: ["번역만 하기", "i18n 설계 → 문화적 차이 → RTL 지원 → 테스트", "영어만 지원"],
        correct: 1,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "prac_a10",
        title: "AI로 엔터프라이즈 통합을 설계할 때는?",
        options: ["API 연동 → 데이터 매핑 → 오류 처리 → 모니터링", "직접 연결만", "수동 처리"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      }
    ]
  },

  // 2. AI 협업 (Collaboration)
  collaboration: {
    beginner: [
      {
        id: "collab_b1",
        title: "AI와 인간의 역할 분담에서 AI가 잘하는 작업은?",
        options: ["창의적 전략 수립", "대량 데이터 처리와 패턴 인식", "윤리적 판단"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "collab_b2",
        title: "AI 결과물을 검증하는 첫 단계는?",
        options: ["그대로 사용", "사실 확인과 출처 검증", "문법만 체크"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "collab_b3",
        title: "팀에서 AI 도구를 도입할 때 우선 고려사항은?",
        options: ["가격만 비교", "팀원 교육과 가이드라인 수립", "즉시 전면 도입"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "collab_b4",
        title: "AI 생성 콘텐츠의 저작권은 누구에게 있나?",
        options: ["AI 회사", "사용자와 플랫폼 약관에 따라 다름", "아무도 없음"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "collab_b5",
        title: "AI와 협업할 때 인간이 반드시 해야 할 일은?",
        options: ["모든 작업 위임", "최종 검토와 책임", "아무것도 안함"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "collab_b6",
        title: "AI 도구를 팀에 소개할 때 방법은?",
        options: ["강제 사용", "시범 사용 후 점진적 확대", "비밀로 사용"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "collab_b7",
        title: "AI 결과물에 오류가 있을 때 대응은?",
        options: ["무시하고 사용", "수정하고 피드백 제공", "AI 사용 중단"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "collab_b8",
        title: "AI 협업 도구 선택 시 기준은?",
        options: ["팀 워크플로우와의 호환성", "가장 비싼 것", "가장 유명한 것"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "collab_b9",
        title: "AI로 생성한 코드를 팀에 공유할 때는?",
        options: ["그대로 커밋", "리뷰와 테스트 후 공유", "비밀로 함"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "collab_b10",
        title: "AI 도구 사용 가이드라인에 포함할 내용은?",
        options: ["사용 목적과 범위, 주의사항", "비용만", "없어도 됨"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      }
    ],
    intermediate: [
      {
        id: "collab_i1",
        title: "AI 페어 프로그래밍을 효과적으로 하는 방법은?",
        options: ["AI가 모든 코드 작성", "개발자가 설계, AI가 구현 보조", "AI 사용 안함"],
        correct: 1,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "collab_i2",
        title: "AI 생성 문서를 팀 위키에 올릴 때 표기는?",
        options: ["표기 없음", "AI 도움 받은 부분 명시", "작성자만 표기"],
        correct: 1,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "collab_i3",
        title: "팀 내 AI 활용도를 높이는 방법은?",
        options: ["강제 할당", "성공 사례 공유와 워크샵", "개인 자율"],
        correct: 1,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "collab_i4",
        title: "AI 도구 ROI를 측정하는 지표는?",
        options: ["시간 절감, 품질 향상, 비용 대비 효과", "사용 횟수만", "측정 안함"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "collab_i5",
        title: "크로스펑셔널 팀에서 AI 도구 통합 방법은?",
        options: ["부서별 다른 도구", "공통 플랫폼과 API 연동", "통합 안함"],
        correct: 1,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "collab_i6",
        title: "AI 기반 코드 리뷰 프로세스는?",
        options: ["AI만 리뷰", "AI 1차 리뷰 → 인간 최종 리뷰", "인간만 리뷰"],
        correct: 1,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "collab_i7",
        title: "AI 협업 시 버전 관리 방법은?",
        options: ["프롬프트와 결과물 함께 저장", "결과물만 저장", "저장 안함"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "collab_i8",
        title: "AI 도구 간 데이터 연계 방법은?",
        options: ["수동 복사", "API와 자동화 도구 활용", "연계 안함"],
        correct: 1,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "collab_i9",
        title: "AI 협업 품질 보증 프로세스는?",
        options: ["체크리스트 → 검증 → 승인", "즉시 배포", "검증 안함"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "collab_i10",
        title: "팀 AI 지식 관리 시스템 구축 방법은?",
        options: ["개인별 관리", "중앙화된 프롬프트 라이브러리", "관리 안함"],
        correct: 1,
        enemyType: "prompt_eater",
        exp: 15
      }
    ],
    advanced: [
      {
        id: "collab_a1",
        title: "AI-Human 하이브리드 워크플로우 최적화 방법은?",
        options: ["태스크 특성별 자동 라우팅 시스템", "수동 배분", "AI만 사용"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "collab_a2",
        title: "글로벌 팀의 AI 협업 거버넌스 구축은?",
        options: ["지역별 다른 정책", "통합 정책과 지역별 커스터마이징", "정책 없음"],
        correct: 1,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "collab_a3",
        title: "AI 기반 의사결정 지원 시스템 구현은?",
        options: ["데이터 수집 → AI 분석 → 인간 검증 → 실행", "AI만 결정", "인간만 결정"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "collab_a4",
        title: "엔터프라이즈 AI 협업 플랫폼 설계는?",
        options: ["단일 도구만", "멀티모달 AI + 워크플로우 엔진 + 감사 로그", "개별 도구"],
        correct: 1,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "collab_a5",
        title: "AI 협업 성숙도 모델 5단계 중 최고 단계는?",
        options: ["AI 실험", "AI 통합", "AI 기반 자율 최적화"],
        correct: 2,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "collab_a6",
        title: "AI 에이전트 오케스트레이션 패턴은?",
        options: ["단일 에이전트", "계층적 에이전트 조정과 작업 분배", "무작위 실행"],
        correct: 1,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "collab_a7",
        title: "Human-in-the-loop ML 시스템 설계는?",
        options: ["자동 학습만", "예측 → 인간 검증 → 피드백 루프", "수동 학습만"],
        correct: 1,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "collab_a8",
        title: "AI 협업 메트릭스와 KPI 설정은?",
        options: ["효율성, 정확도, 협업 시너지 지수", "사용량만", "측정 안함"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "collab_a9",
        title: "분산 AI 팀 코디네이션 전략은?",
        options: ["중앙 집중식", "연합 학습과 엣지 컴퓨팅", "독립 운영"],
        correct: 1,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "collab_a10",
        title: "AI 협업 윤리 프레임워크 구축은?",
        options: ["투명성, 책임성, 공정성, 프라이버시", "효율성만", "프레임워크 없음"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      }
    ]
  },

  // 3. 한계 인식 (Limitations)
  limitations: {
    beginner: [
      {
        id: "limit_b1",
        title: "AI가 할 수 없는 작업은?",
        options: ["텍스트 생성", "실시간 인터넷 브라우징(기본 모델)", "번역"],
        correct: 1,
        enemyType: "hallucination",
        exp: 10
      },
      {
        id: "limit_b2",
        title: "ChatGPT의 지식 cutoff date의 의미는?",
        options: ["서비스 종료일", "학습 데이터의 마지막 날짜", "가입일"],
        correct: 1,
        enemyType: "hallucination",
        exp: 10
      },
      {
        id: "limit_b3",
        title: "AI가 수학 문제를 틀리는 이유는?",
        options: ["계산기가 없어서", "패턴 기반 예측이라 논리 연산에 약함", "일부러 틀림"],
        correct: 1,
        enemyType: "hallucination",
        exp: 10
      },
      {
        id: "limit_b4",
        title: "긴 문서 처리 시 AI의 한계는?",
        options: ["토큰 제한으로 전체 처리 불가", "느려짐", "거부함"],
        correct: 0,
        enemyType: "hallucination",
        exp: 10
      },
      {
        id: "limit_b5",
        title: "AI가 이미지를 '이해'한다는 것의 실제 의미는?",
        options: ["진짜 이해함", "패턴을 인식하고 라벨링", "보지 못함"],
        correct: 1,
        enemyType: "hallucination",
        exp: 10
      },
      {
        id: "limit_b6",
        title: "AI가 개인정보를 기억하지 못하는 이유는?",
        options: ["용량 부족", "프라이버시 보호 설계", "관심 없음"],
        correct: 1,
        enemyType: "hallucination",
        exp: 10
      },
      {
        id: "limit_b7",
        title: "AI가 URL을 직접 방문할 수 없는 이유는?",
        options: ["보안과 샌드박스 환경", "인터넷 없음", "거부함"],
        correct: 0,
        enemyType: "hallucination",
        exp: 10
      },
      {
        id: "limit_b8",
        title: "AI의 '창의성'의 실체는?",
        options: ["진짜 창의적", "학습 데이터의 재조합", "복사"],
        correct: 1,
        enemyType: "hallucination",
        exp: 10
      },
      {
        id: "limit_b9",
        title: "AI가 감정을 표현할 때 실제로는?",
        options: ["감정을 느낌", "언어 패턴을 모방", "거짓말"],
        correct: 1,
        enemyType: "hallucination",
        exp: 10
      },
      {
        id: "limit_b10",
        title: "AI가 '모른다'고 답해야 하는 상황은?",
        options: ["학습 데이터에 없는 정보", "어려운 질문", "쉬운 질문"],
        correct: 0,
        enemyType: "hallucination",
        exp: 10
      }
    ],
    intermediate: [
      {
        id: "limit_i1",
        title: "Attention mechanism의 한계로 발생하는 문제는?",
        options: ["긴 컨텍스트에서 중간 정보 손실", "속도 저하", "오류 없음"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "limit_i2",
        title: "Few-shot learning의 한계는?",
        options: ["예시가 많을수록 항상 좋음", "예시 품질과 다양성에 의존", "한계 없음"],
        correct: 1,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "limit_i3",
        title: "AI의 추론 능력 한계를 보여주는 예시는?",
        options: ["번역", "인과관계 파악과 반사실적 추론", "요약"],
        correct: 1,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "limit_i4",
        title: "Tokenization이 야기하는 문제는?",
        options: ["특수문자와 신조어 처리 어려움", "속도 향상", "문제 없음"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "limit_i5",
        title: "AI의 일관성 문제가 발생하는 이유는?",
        options: ["버그", "확률적 생성으로 인한 변동성", "의도적"],
        correct: 1,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "limit_i6",
        title: "멀티턴 대화에서 AI의 한계는?",
        options: ["컨텍스트 누적과 모순 발생", "완벽함", "대화 거부"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "limit_i7",
        title: "AI가 코드 실행 결과를 예측 못하는 이유는?",
        options: ["실제 실행 환경 없이 패턴만 학습", "게으름", "코드 모름"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "limit_i8",
        title: "도메인 특화 작업에서 AI 한계는?",
        options: ["전문 용어와 맥락 이해 부족", "만능", "거부"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "limit_i9",
        title: "AI의 시간 개념 한계는?",
        options: ["과거/현재/미래 구분 완벽", "학습 시점 이후 정보 부재", "시간 여행 가능"],
        correct: 1,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "limit_i10",
        title: "Emergent ability의 예측 불가능성은?",
        options: ["모델 크기에 따른 급격한 능력 변화", "선형 성장", "능력 감소"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      }
    ],
    advanced: [
      {
        id: "limit_a1",
        title: "Transformer 아키텍처의 근본적 한계는?",
        options: ["2차 복잡도로 인한 확장성 문제", "성능 완벽", "속도 빠름"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "limit_a2",
        title: "AI의 Compositionality 문제란?",
        options: ["복잡한 개념을 요소로 분해/조합하는 능력 부족", "작곡 능력", "문제 없음"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "limit_a3",
        title: "Catastrophic forgetting 현상은?",
        options: ["새 태스크 학습 시 기존 지식 손실", "기억력 향상", "잊지 않음"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "limit_a4",
        title: "OOD(Out-of-Distribution) 일반화 실패는?",
        options: ["학습 분포 밖 데이터 처리 실패", "완벽한 일반화", "분포 무관"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "limit_a5",
        title: "Scaling law의 한계점은?",
        options: ["무한 확장 가능", "컴퓨팅과 데이터의 물리적 한계", "한계 없음"],
        correct: 1,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "limit_a6",
        title: "Symbol grounding problem이란?",
        options: ["기호와 실제 의미 연결 부재", "기호 인식 완벽", "문제 없음"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "limit_a7",
        title: "AI의 Causal reasoning 한계는?",
        options: ["상관관계와 인과관계 구분 실패", "완벽한 인과 추론", "추론 안함"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "limit_a8",
        title: "Adversarial attack 취약성은?",
        options: ["미세한 입력 변조로 오작동", "공격 면역", "보안 완벽"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "limit_a9",
        title: "Gödel의 불완전성과 AI의 관계는?",
        options: ["형식 체계 내 증명 불가능 명제 존재", "모든 것 증명 가능", "무관함"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "limit_a10",
        title: "AI consciousness의 Hard Problem은?",
        options: ["쉽게 해결", "주관적 경험(qualia)의 계산적 구현 불가능", "이미 의식 있음"],
        correct: 1,
        enemyType: "singularity_eye",
        exp: 25
      }
    ]
  },

  // 4. 비용 최적화 (Cost Optimization)
  cost_optimization: {
    beginner: [
      {
        id: "cost_b1",
        title: "AI API 사용료를 줄이는 가장 쉬운 방법은?",
        options: ["짧고 명확한 프롬프트 사용", "긴 프롬프트 사용", "자주 호출"],
        correct: 0,
        enemyType: "legacy_tool",
        exp: 10
      },
      {
        id: "cost_b2",
        title: "무료 AI 도구의 일반적인 제한사항은?",
        options: ["사용 횟수와 기능 제한", "제한 없음", "유료보다 좋음"],
        correct: 0,
        enemyType: "legacy_tool",
        exp: 10
      },
      {
        id: "cost_b3",
        title: "토큰(Token)이 비용과 관련된 이유는?",
        options: ["상관없음", "API 요금이 토큰 수 기준", "토큰이 비쌈"],
        correct: 1,
        enemyType: "legacy_tool",
        exp: 10
      },
      {
        id: "cost_b4",
        title: "캐싱을 통한 비용 절감 방법은?",
        options: ["반복 질문 결과 저장 후 재사용", "매번 새로 요청", "캐싱 안함"],
        correct: 0,
        enemyType: "legacy_tool",
        exp: 10
      },
      {
        id: "cost_b5",
        title: "모델 크기와 비용의 관계는?",
        options: ["무관함", "큰 모델일수록 비용 증가", "작을수록 비쌈"],
        correct: 1,
        enemyType: "legacy_tool",
        exp: 10
      },
      {
        id: "cost_b6",
        title: "배치 처리가 비용 효율적인 이유는?",
        options: ["한 번에 여러 요청 처리", "개별 처리가 싸다", "차이 없음"],
        correct: 0,
        enemyType: "legacy_tool",
        exp: 10
      },
      {
        id: "cost_b7",
        title: "AI 구독 서비스 선택 기준은?",
        options: ["실제 사용량과 필요 기능", "가장 비싼 것", "가장 싼 것"],
        correct: 0,
        enemyType: "legacy_tool",
        exp: 10
      },
      {
        id: "cost_b8",
        title: "오픈소스 AI 모델의 장점은?",
        options: ["무료 사용과 커스터마이징 가능", "항상 최고 성능", "지원 완벽"],
        correct: 0,
        enemyType: "legacy_tool",
        exp: 10
      },
      {
        id: "cost_b9",
        title: "AI 비용 모니터링이 중요한 이유는?",
        options: ["예산 초과 방지", "필요 없음", "재미로"],
        correct: 0,
        enemyType: "legacy_tool",
        exp: 10
      },
      {
        id: "cost_b10",
        title: "프리티어(Free tier) 활용 전략은?",
        options: ["개발/테스트 용도로 활용", "프로덕션 사용", "사용 안함"],
        correct: 0,
        enemyType: "legacy_tool",
        exp: 10
      }
    ],
    intermediate: [
      {
        id: "cost_i1",
        title: "Rate limiting 우회 전략은?",
        options: ["큐잉과 재시도 로직 구현", "무한 재시도", "포기"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "cost_i2",
        title: "Fine-tuning vs Prompting 비용 비교는?",
        options: ["초기 비용 높지만 장기적 절감 가능", "항상 프롬프팅이 싸다", "같음"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "cost_i3",
        title: "멀티 테넌시로 비용 절감하는 방법은?",
        options: ["여러 사용자가 리소스 공유", "개별 인스턴스", "불가능"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "cost_i4",
        title: "Edge deployment의 비용 이점은?",
        options: ["네트워크 비용 절감", "클라우드가 싸다", "차이 없음"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "cost_i5",
        title: "Quantization을 통한 비용 절감은?",
        options: ["모델 크기 축소로 인프라 비용 감소", "성능 향상", "비용 증가"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "cost_i6",
        title: "Spot instance 활용 전략은?",
        options: ["비중요 배치 작업에 활용", "실시간 서비스용", "사용 금지"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "cost_i7",
        title: "API Gateway 패턴의 비용 이점은?",
        options: ["요청 집계와 캐싱", "직접 호출이 싸다", "비용 증가"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "cost_i8",
        title: "비용 기반 모델 라우팅이란?",
        options: ["작업별로 적절한 모델 자동 선택", "항상 큰 모델", "항상 작은 모델"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "cost_i9",
        title: "Serverless AI의 비용 모델은?",
        options: ["사용한 만큼만 과금", "월 정액", "무료"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "cost_i10",
        title: "비용 최적화 자동화 도구는?",
        options: ["클라우드 비용 관리 플랫폼", "수동 관리", "필요 없음"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      }
    ],
    advanced: [
      {
        id: "cost_a1",
        title: "FinOps for AI 구현 전략은?",
        options: ["비용 가시화 → 최적화 → 자동화", "무계획", "고정 예산"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "cost_a2",
        title: "Multi-cloud arbitrage 전략은?",
        options: ["제공업체 간 가격 차이 활용", "단일 벤더", "온프레미스만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "cost_a3",
        title: "Distillation을 통한 비용 최적화는?",
        options: ["큰 모델 지식을 작은 모델로 전이", "모델 크기 증가", "성능 저하"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "cost_a4",
        title: "Dynamic batching 최적화는?",
        options: ["요청을 동적으로 묶어 처리", "개별 처리", "고정 배치"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "cost_a5",
        title: "GPU sharing과 MIG 활용은?",
        options: ["GPU 자원을 분할하여 활용도 극대화", "전용 GPU만", "CPU만 사용"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "cost_a6",
        title: "Cascade inference 패턴은?",
        options: ["쉬운 케이스는 작은 모델, 어려운 것만 큰 모델", "항상 큰 모델", "랜덤 선택"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "cost_a7",
        title: "Reserved capacity 전략은?",
        options: ["장기 약정으로 할인", "온디맨드만", "스팟만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "cost_a8",
        title: "AI workload 스케줄링 최적화는?",
        options: ["오프피크 시간 활용", "항상 실행", "랜덤 실행"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "cost_a9",
        title: "Cost-aware AutoML이란?",
        options: ["비용 제약 내에서 최적 모델 탐색", "성능만 고려", "비용 무시"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "cost_a10",
        title: "Hybrid inference 아키텍처는?",
        options: ["온프레미스 + 클라우드 최적 조합", "클라우드만", "온프렘만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      }
    ]
  },

  // 5. API/자동화 (Automation)
  automation: {
    beginner: [
      {
        id: "auto_b1",
        title: "API(Application Programming Interface)의 역할은?",
        options: ["프로그램 간 통신 인터페이스", "사용자 인터페이스", "데이터베이스"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "auto_b2",
        title: "API Key를 안전하게 관리하는 방법은?",
        options: ["코드에 직접 입력", "환경 변수나 시크릿 관리 도구", "공개 저장소"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "auto_b3",
        title: "Webhook의 기본 개념은?",
        options: ["이벤트 발생 시 자동 알림", "수동 호출", "데이터베이스"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "auto_b4",
        title: "노코드 자동화 도구의 장점은?",
        options: ["프로그래밍 없이 자동화 구축", "코딩 필수", "수동 작업"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "auto_b5",
        title: "Zapier, Make(Integromat)의 용도는?",
        options: ["앱 간 자동화 워크플로우", "코드 에디터", "데이터베이스"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "auto_b6",
        title: "크론(Cron) 표현식의 용도는?",
        options: ["스케줄 작업 시간 설정", "API 호출", "데이터 저장"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "auto_b7",
        title: "API Rate Limit의 의미는?",
        options: ["시간당 호출 횟수 제한", "속도 향상", "무제한"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "auto_b8",
        title: "REST API의 기본 메소드가 아닌 것은?",
        options: ["GET", "POST", "CONNECT"],
        correct: 2,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "auto_b9",
        title: "자동화 워크플로우의 트리거는?",
        options: ["작업을 시작하는 이벤트", "결과", "에러"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "auto_b10",
        title: "API 응답 코드 200의 의미는?",
        options: ["에러", "성공", "인증 필요"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      }
    ],
    intermediate: [
      {
        id: "auto_i1",
        title: "GraphQL과 REST API의 주요 차이는?",
        options: ["필요한 데이터만 요청 가능", "속도만 다름", "같음"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "auto_i2",
        title: "OAuth 2.0 인증 플로우의 목적은?",
        options: ["안전한 제3자 인증", "패스워드 저장", "익명 접근"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "auto_i3",
        title: "API Gateway의 역할은?",
        options: ["API 라우팅, 인증, 제한 관리", "데이터 저장", "UI 제공"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "auto_i4",
        title: "Idempotency의 중요성은?",
        options: ["중복 요청 시 같은 결과 보장", "속도 향상", "보안 강화"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "auto_i5",
        title: "마이크로서비스 간 통신 패턴은?",
        options: ["동기/비동기 메시징", "직접 DB 접근", "파일 공유"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "auto_i6",
        title: "CI/CD 파이프라인 자동화 도구는?",
        options: ["Jenkins, GitHub Actions", "Excel", "Word"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "auto_i7",
        title: "Event-driven 아키텍처의 장점은?",
        options: ["낮은 결합도와 확장성", "높은 결합도", "동기 처리"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "auto_i8",
        title: "API Versioning 전략은?",
        options: ["URL, 헤더, 쿼리 파라미터", "버전 없음", "매번 새 API"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "auto_i9",
        title: "서킷 브레이커 패턴의 목적은?",
        options: ["장애 전파 방지", "속도 향상", "비용 절감"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "auto_i10",
        title: "API 문서 자동화 도구는?",
        options: ["Swagger/OpenAPI", "메모장", "이메일"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      }
    ],
    advanced: [
      {
        id: "auto_a1",
        title: "Event Sourcing 패턴의 구현은?",
        options: ["모든 상태 변경을 이벤트로 저장", "현재 상태만 저장", "로그 없음"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "auto_a2",
        title: "SAGA 패턴의 분산 트랜잭션 처리는?",
        options: ["보상 트랜잭션으로 일관성 유지", "2PC 사용", "트랜잭션 없음"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "auto_a3",
        title: "gRPC의 장점과 적용 시나리오는?",
        options: ["고성능 바이너리 프로토콜, 마이크로서비스", "웹 브라우저용", "파일 전송만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "auto_a4",
        title: "Chaos Engineering 자동화는?",
        options: ["의도적 장애 주입으로 복원력 테스트", "버그 생성", "시스템 파괴"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "auto_a5",
        title: "Service Mesh의 역할은?",
        options: ["마이크로서비스 간 통신 관리", "UI 제공", "데이터 저장"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "auto_a6",
        title: "CQRS 패턴 구현 시 고려사항은?",
        options: ["읽기/쓰기 모델 분리와 일관성", "단일 모델", "캐시만 사용"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "auto_a7",
        title: "Distributed Tracing 구현은?",
        options: ["Correlation ID와 스팬 추적", "로그만 사용", "추적 안함"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "auto_a8",
        title: "API 조합 패턴(BFF)의 설계는?",
        options: ["클라이언트별 최적화된 백엔드", "단일 API", "직접 연결"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "auto_a9",
        title: "Async API와 WebSocket 활용은?",
        options: ["실시간 양방향 통신", "단방향만", "파일 전송만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "auto_a10",
        title: "Zero-trust 자동화 아키텍처는?",
        options: ["모든 요청 검증과 최소 권한", "완전 신뢰", "인증 없음"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      }
    ]
  },

  // 6. 모델 선택 (Model Selection)
  model_selection: {
    beginner: [
      {
        id: "model_b1",
        title: "GPT-4와 GPT-3.5의 주요 차이는?",
        options: ["성능과 비용", "이름만 다름", "GPT-3.5가 더 좋음"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "model_b2",
        title: "Claude의 특징은?",
        options: ["긴 컨텍스트 윈도우", "짧은 답변만", "코딩 불가"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "model_b3",
        title: "이미지 생성에 적합한 모델은?",
        options: ["GPT-4", "DALL-E, Midjourney", "Claude"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "model_b4",
        title: "코딩에 특화된 AI 모델은?",
        options: ["GitHub Copilot", "DALL-E", "Whisper"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "model_b5",
        title: "음성 인식 AI 모델은?",
        options: ["Stable Diffusion", "Whisper", "GPT-4"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "model_b6",
        title: "Gemini의 제공 회사는?",
        options: ["OpenAI", "Google", "Meta"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "model_b7",
        title: "오픈소스 LLM의 예시는?",
        options: ["GPT-4", "LLaMA, Mistral", "Claude"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "model_b8",
        title: "모델 크기(파라미터)가 클수록?",
        options: ["일반적으로 성능 향상", "항상 나쁨", "상관없음"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "model_b9",
        title: "실시간 응답이 중요할 때 선택은?",
        options: ["가장 큰 모델", "작고 빠른 모델", "오프라인 모델"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "model_b10",
        title: "특정 도메인 작업에는?",
        options: ["범용 모델", "도메인 특화 모델", "아무거나"],
        correct: 1,
        enemyType: "glitch",
        exp: 10
      }
    ],
    intermediate: [
      {
        id: "model_i1",
        title: "Few-shot vs Zero-shot 성능 차이는?",
        options: ["예시 제공 시 성능 향상", "항상 같음", "Zero-shot이 좋음"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "model_i2",
        title: "Instruction-tuned 모델의 장점은?",
        options: ["지시사항 이해도 향상", "속도만 빠름", "작업 불가"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "model_i3",
        title: "Mixture of Experts(MoE) 구조는?",
        options: ["작업별 전문가 모델 활성화", "단일 모델", "앙상블"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "model_i4",
        title: "Embedding 모델의 용도는?",
        options: ["텍스트를 벡터로 변환", "이미지 생성", "음성 인식"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "model_i5",
        title: "Constitutional AI의 특징은?",
        options: ["윤리적 가이드라인 내장", "속도 우선", "정확도만"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "model_i6",
        title: "모델 앙상블의 효과는?",
        options: ["여러 모델 조합으로 성능 향상", "단일 모델이 좋음", "속도 향상"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "model_i7",
        title: "Retrieval 모델과 생성 모델 차이는?",
        options: ["검색 vs 생성", "같은 것", "속도만 다름"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "model_i8",
        title: "모델 선택 시 latency 고려 이유는?",
        options: ["사용자 경험과 실시간성", "비용만 중요", "성능만 중요"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "model_i9",
        title: "도메인 적응(Domain Adaptation)은?",
        options: ["특정 분야에 모델 최적화", "일반화", "성능 저하"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "model_i10",
        title: "모델 벤치마크의 한계는?",
        options: ["실제 사용과 차이 가능", "완벽한 지표", "불필요"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      }
    ],
    advanced: [
      {
        id: "model_a1",
        title: "Sparse 모델의 장단점은?",
        options: ["효율성 높지만 구현 복잡", "항상 좋음", "사용 불가"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "model_a2",
        title: "RLHF vs RLAIF 차이는?",
        options: ["인간 피드백 vs AI 피드백", "같음", "속도만 다름"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "model_a3",
        title: "Emergent abilities 예측 방법은?",
        options: ["스케일링 법칙과 벤치마크", "불가능", "랜덤"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "model_a4",
        title: "Multi-modal 모델 통합 전략은?",
        options: ["크로스 어텐션과 퓨전", "독립 처리", "텍스트만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "model_a5",
        title: "Continual Learning 구현 시 과제는?",
        options: ["Catastrophic forgetting 방지", "쉬움", "불필요"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "model_a6",
        title: "모델 압축 기법 선택 기준은?",
        options: ["정확도 손실 vs 속도 향상", "항상 압축", "압축 안함"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "model_a7",
        title: "Federated Learning 적용 시나리오는?",
        options: ["프라이버시 보호 필요 시", "중앙 집중식이 좋음", "불가능"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "model_a8",
        title: "Neural Architecture Search는?",
        options: ["자동으로 최적 구조 탐색", "수동 설계", "고정 구조"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "model_a9",
        title: "Adaptive computation의 구현은?",
        options: ["입력 복잡도에 따라 연산 조절", "고정 연산", "무한 연산"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "model_a10",
        title: "모델 선택 자동화 시스템은?",
        options: ["메타러닝과 AutoML", "수동 선택", "랜덤 선택"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      }
    ]
  },

  // 7. 보안/규제 (Security & Compliance)
  security: {
    beginner: [
      {
        id: "sec_b1",
        title: "AI에 개인정보 입력 시 주의점은?",
        options: ["민감정보 제거 후 입력", "모두 입력", "암호화만 하면 안전"],
        correct: 0,
        enemyType: "security_bot",
        exp: 10
      },
      {
        id: "sec_b2",
        title: "공용 AI 서비스의 데이터 처리는?",
        options: ["학습에 사용될 가능성", "절대 안전", "로컬 저장"],
        correct: 0,
        enemyType: "security_bot",
        exp: 10
      },
      {
        id: "sec_b3",
        title: "GDPR이 AI 사용에 미치는 영향은?",
        options: ["개인정보 처리 제한", "영향 없음", "AI 금지"],
        correct: 0,
        enemyType: "security_bot",
        exp: 10
      },
      {
        id: "sec_b4",
        title: "AI 생성물의 법적 책임은?",
        options: ["사용자에게 있음", "AI 회사만", "책임 없음"],
        correct: 0,
        enemyType: "security_bot",
        exp: 10
      },
      {
        id: "sec_b5",
        title: "기업 데이터를 AI에 사용할 때는?",
        options: ["보안 정책 확인 필수", "자유롭게 사용", "금지"],
        correct: 0,
        enemyType: "security_bot",
        exp: 10
      },
      {
        id: "sec_b6",
        title: "AI 서비스 약관의 중요성은?",
        options: ["데이터 사용 권한 명시", "중요하지 않음", "읽지 않아도 됨"],
        correct: 0,
        enemyType: "security_bot",
        exp: 10
      },
      {
        id: "sec_b7",
        title: "프롬프트 인젝션 공격이란?",
        options: ["악의적 입력으로 AI 조작", "성능 향상", "정상 사용"],
        correct: 0,
        enemyType: "security_bot",
        exp: 10
      },
      {
        id: "sec_b8",
        title: "AI 사용 로그 보관 이유는?",
        options: ["감사와 문제 추적", "불필요", "속도 향상"],
        correct: 0,
        enemyType: "security_bot",
        exp: 10
      },
      {
        id: "sec_b9",
        title: "의료 데이터와 AI 사용 시 규제는?",
        options: ["HIPAA 등 준수", "자유 사용", "규제 없음"],
        correct: 0,
        enemyType: "security_bot",
        exp: 10
      },
      {
        id: "sec_b10",
        title: "AI 모델 접근 권한 관리는?",
        options: ["역할 기반 접근 제어", "모두 공개", "접근 불가"],
        correct: 0,
        enemyType: "security_bot",
        exp: 10
      }
    ],
    intermediate: [
      {
        id: "sec_i1",
        title: "Differential Privacy의 적용은?",
        options: ["개인정보 보호하며 학습", "완전 공개", "학습 불가"],
        correct: 0,
        enemyType: "security_bot",
        exp: 15
      },
      {
        id: "sec_i2",
        title: "Model extraction 공격 방어는?",
        options: ["Rate limiting과 워터마킹", "방어 불가", "공개"],
        correct: 0,
        enemyType: "security_bot",
        exp: 15
      },
      {
        id: "sec_i3",
        title: "AI 감사(Audit) 프레임워크는?",
        options: ["입력, 처리, 출력 전체 추적", "출력만 확인", "감사 불필요"],
        correct: 0,
        enemyType: "security_bot",
        exp: 15
      },
      {
        id: "sec_i4",
        title: "Homomorphic encryption의 역할은?",
        options: ["암호화된 상태로 연산", "복호화 후 처리", "암호화 불가"],
        correct: 0,
        enemyType: "security_bot",
        exp: 15
      },
      {
        id: "sec_i5",
        title: "AI 윤리 위원회의 역할은?",
        options: ["AI 사용 가이드라인 수립", "개발만", "불필요"],
        correct: 0,
        enemyType: "security_bot",
        exp: 15
      },
      {
        id: "sec_i6",
        title: "Data poisoning 공격 탐지는?",
        options: ["이상치 탐지와 검증", "불가능", "무시"],
        correct: 0,
        enemyType: "security_bot",
        exp: 15
      },
      {
        id: "sec_i7",
        title: "AI 시스템 침투 테스트는?",
        options: ["Red teaming과 adversarial testing", "불필요", "자동 안전"],
        correct: 0,
        enemyType: "security_bot",
        exp: 15
      },
      {
        id: "sec_i8",
        title: "Cross-border 데이터 규제는?",
        options: ["국가별 규제 준수", "자유 이동", "금지"],
        correct: 0,
        enemyType: "security_bot",
        exp: 15
      },
      {
        id: "sec_i9",
        title: "AI 보안 인증 표준은?",
        options: ["ISO/IEC 27001, SOC 2", "없음", "불필요"],
        correct: 0,
        enemyType: "security_bot",
        exp: 15
      },
      {
        id: "sec_i10",
        title: "Supply chain 보안 고려사항은?",
        options: ["모델과 데이터 출처 검증", "무시", "자동 안전"],
        correct: 0,
        enemyType: "security_bot",
        exp: 15
      }
    ],
    advanced: [
      {
        id: "sec_a1",
        title: "Zero-knowledge proof in AI는?",
        options: ["지식 공개 없이 검증", "모두 공개", "검증 불가"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "sec_a2",
        title: "Secure multi-party computation은?",
        options: ["데이터 공유 없이 협업 학습", "데이터 공유 필수", "협업 불가"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "sec_a3",
        title: "AI 규제 샌드박스의 목적은?",
        options: ["혁신과 규제 균형", "완전 규제", "규제 없음"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "sec_a4",
        title: "Explainable AI와 규제 준수는?",
        options: ["의사결정 투명성 보장", "블랙박스 유지", "설명 불필요"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "sec_a5",
        title: "AI 보안 위협 모델링(STRIDE)은?",
        options: ["체계적 위협 식별과 대응", "랜덤 대응", "위협 없음"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "sec_a6",
        title: "Confidential computing 적용은?",
        options: ["TEE에서 안전한 AI 실행", "일반 환경", "클라우드만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "sec_a7",
        title: "AI 거버넌스 프레임워크는?",
        options: ["정책, 프로세스, 기술 통합", "기술만", "정책만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "sec_a8",
        title: "Adversarial robustness 인증은?",
        options: ["공격 저항성 정량 평가", "불가능", "불필요"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "sec_a9",
        title: "AI 사고 대응(Incident Response)은?",
        options: ["탐지 → 격리 → 복구 → 분석", "무시", "재시작만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "sec_a10",
        title: "Quantum-resistant AI 보안은?",
        options: ["포스트퀀텀 암호화 적용", "현재 암호화 충분", "보안 불필요"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      }
    ]
  },

  // 8. 최신 트렌드 (Trends)
  trends: {
    beginner: [
      {
        id: "trend_b1",
        title: "AI Agent의 기본 개념은?",
        options: ["자율적으로 작업 수행하는 AI", "단순 챗봇", "검색 엔진"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "trend_b2",
        title: "Vector Database의 용도는?",
        options: ["임베딩 저장과 유사도 검색", "일반 데이터 저장", "이미지만 저장"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "trend_b3",
        title: "Function Calling의 의미는?",
        options: ["AI가 외부 도구 호출", "전화 걸기", "프로그래밍만"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "trend_b4",
        title: "AI 플러그인의 역할은?",
        options: ["AI 기능 확장", "속도 향상만", "보안만"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "trend_b5",
        title: "Prompt chaining이란?",
        options: ["여러 프롬프트 연결 실행", "단일 프롬프트", "프롬프트 삭제"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "trend_b6",
        title: "AI 음성 클로닝의 활용은?",
        options: ["콘텐츠 제작과 더빙", "전화만", "불가능"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "trend_b7",
        title: "Generative AI의 범위는?",
        options: ["텍스트, 이미지, 음성, 비디오", "텍스트만", "이미지만"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "trend_b8",
        title: "AI 코파일럿의 의미는?",
        options: ["작업 보조 AI 도구", "자동 조종사", "게임"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "trend_b9",
        title: "Edge AI의 장점은?",
        options: ["낮은 지연시간과 프라이버시", "클라우드가 빠름", "비용 높음"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "trend_b10",
        title: "AI 민주화의 의미는?",
        options: ["누구나 AI 접근 가능", "투표로 결정", "제한적 사용"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      }
    ],
    intermediate: [
      {
        id: "trend_i1",
        title: "LangChain의 핵심 기능은?",
        options: ["LLM 앱 개발 프레임워크", "언어 번역", "체인 관리"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "trend_i2",
        title: "Semantic search vs Keyword search는?",
        options: ["의미 이해 vs 단어 매칭", "같음", "속도만 다름"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "trend_i3",
        title: "AutoGPT의 작동 방식은?",
        options: ["목표 설정 후 자율 실행", "수동 제어", "단일 작업만"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "trend_i4",
        title: "Embedding의 차원 축소 이유는?",
        options: ["계산 효율성과 노이즈 제거", "품질 향상", "크기 증가"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "trend_i5",
        title: "AI의 Tool use 능력이란?",
        options: ["계산기, 브라우저 등 도구 활용", "대화만", "생성만"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "trend_i6",
        title: "Synthetic data의 활용은?",
        options: ["AI로 생성한 학습 데이터", "실제 데이터만", "사용 금지"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "trend_i7",
        title: "LoRA 파인튜닝의 장점은?",
        options: ["적은 파라미터로 효율적 학습", "전체 재학습", "성능 저하"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "trend_i8",
        title: "Vision-Language 모델의 응용은?",
        options: ["이미지 설명, 시각적 질의응답", "텍스트만", "이미지만"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "trend_i9",
        title: "AI의 Code interpreter 기능은?",
        options: ["코드 실행과 결과 분석", "설명만", "컴파일만"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "trend_i10",
        title: "Neuro-symbolic AI의 접근법은?",
        options: ["신경망과 기호 추론 결합", "신경망만", "기호만"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      }
    ],
    advanced: [
      {
        id: "trend_a1",
        title: "Transformer 이후 아키텍처 혁신은?",
        options: ["Mamba, RWKV 등 선형 복잡도", "Transformer만", "CNN 회귀"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "trend_a2",
        title: "World model의 구현 방향은?",
        options: ["물리 법칙과 인과관계 학습", "텍스트만", "이미지만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "trend_a3",
        title: "Multiagent 시스템 설계는?",
        options: ["협력과 경쟁 메커니즘", "단일 에이전트", "독립 실행"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "trend_a4",
        title: "Embodied AI의 도전 과제는?",
        options: ["물리 세계 상호작용과 학습", "시뮬레이션만", "텍스트만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "trend_a5",
        title: "Diffusion model의 혁신은?",
        options: ["고품질 생성과 제어성", "GAN만 사용", "속도만 중요"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "trend_a6",
        title: "AI의 Self-improvement 메커니즘은?",
        options: ["자기 생성 데이터로 재학습", "고정 모델", "외부 데이터만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "trend_a7",
        title: "Neuromorphic computing과 AI는?",
        options: ["뇌 모방 하드웨어로 효율성", "기존 GPU만", "CPU로 충분"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "trend_a8",
        title: "AI의 Recursive self-improvement 위험은?",
        options: ["통제 불가능한 능력 향상", "안전함", "불가능"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "trend_a9",
        title: "Quantum ML의 잠재력은?",
        options: ["지수적 속도 향상 가능성", "느림", "고전이 빠름"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "trend_a10",
        title: "AGI 달성의 주요 마일스톤은?",
        options: ["일반화, 전이학습, 자율성", "현재 달성", "불가능"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      }
    ]
  },

  // 9. 평가/벤치마크 (Evaluation)
  evaluation: {
    beginner: [
      {
        id: "eval_b1",
        title: "AI 답변의 정확도를 평가하는 첫 단계는?",
        options: ["사실 확인과 출처 검증", "믿고 사용", "속도만 확인"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "eval_b2",
        title: "A/B 테스트의 목적은?",
        options: ["두 버전 비교로 개선", "하나만 테스트", "테스트 안함"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "eval_b3",
        title: "Human evaluation이 필요한 이유는?",
        options: ["주관적 품질 평가", "자동화 완벽", "불필요"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "eval_b4",
        title: "벤치마크 점수의 한계는?",
        options: ["실제 성능과 차이 가능", "완벽한 지표", "무의미"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "eval_b5",
        title: "프롬프트 성능 측정 지표는?",
        options: ["정확도, 관련성, 완성도", "속도만", "길이만"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "eval_b6",
        title: "일관성(Consistency) 평가란?",
        options: ["같은 질문에 일관된 답변", "다양한 답변", "랜덤"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "eval_b7",
        title: "AI 편향성 테스트 방법은?",
        options: ["다양한 그룹별 결과 비교", "한 그룹만", "테스트 불필요"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "eval_b8",
        title: "응답 시간 측정이 중요한 이유는?",
        options: ["사용자 경험 영향", "상관없음", "느릴수록 좋음"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "eval_b9",
        title: "False positive vs False negative는?",
        options: ["잘못된 긍정 vs 잘못된 부정", "같은 것", "좋은 결과"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      },
      {
        id: "eval_b10",
        title: "Ground truth의 의미는?",
        options: ["검증된 정답 데이터", "예측값", "추정값"],
        correct: 0,
        enemyType: "glitch",
        exp: 10
      }
    ],
    intermediate: [
      {
        id: "eval_i1",
        title: "BLEU, ROUGE 점수의 용도는?",
        options: ["기계 번역과 요약 평가", "이미지 평가", "속도 측정"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "eval_i2",
        title: "Perplexity 지표의 의미는?",
        options: ["모델의 예측 불확실성", "정확도", "속도"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "eval_i3",
        title: "Inter-annotator agreement란?",
        options: ["평가자 간 일치도", "모델 성능", "데이터 크기"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "eval_i4",
        title: "Ablation study의 목적은?",
        options: ["구성 요소별 기여도 분석", "전체 테스트", "성능 향상"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "eval_i5",
        title: "Cross-validation의 장점은?",
        options: ["과적합 방지와 일반화 평가", "속도 향상", "데이터 절약"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "eval_i6",
        title: "Calibration의 중요성은?",
        options: ["신뢰도와 정확도 일치", "속도만 중요", "불필요"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "eval_i7",
        title: "Online evaluation vs Offline은?",
        options: ["실제 사용 vs 테스트 환경", "같은 것", "온라인만 중요"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "eval_i8",
        title: "Holdout set의 역할은?",
        options: ["최종 성능 평가용 데이터", "학습용", "검증용"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "eval_i9",
        title: "Confusion matrix 분석은?",
        options: ["분류 성능 상세 분석", "단순 정확도", "속도 측정"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "eval_i10",
        title: "Statistical significance 테스트는?",
        options: ["결과의 우연성 검증", "불필요", "항상 유의미"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      }
    ],
    advanced: [
      {
        id: "eval_a1",
        title: "Counterfactual evaluation이란?",
        options: ["가상 시나리오로 인과관계 평가", "실제만 평가", "예측만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "eval_a2",
        title: "Adversarial evaluation의 목적은?",
        options: ["모델 취약점 발견", "일반 성능만", "속도 테스트"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "eval_a3",
        title: "Meta-evaluation 프레임워크는?",
        options: ["평가 방법 자체를 평가", "단일 평가", "평가 안함"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "eval_a4",
        title: "Behavioral testing의 접근법은?",
        options: ["특정 행동 패턴 체계적 검증", "랜덤 테스트", "성능만 측정"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "eval_a5",
        title: "Robustness 평가 방법론은?",
        options: ["노이즈와 변형에 대한 저항성", "정확도만", "속도만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "eval_a6",
        title: "Interpretability 평가 지표는?",
        options: ["설명 충실도와 이해도", "성능만", "크기만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "eval_a7",
        title: "Compositional generalization 테스트는?",
        options: ["새로운 조합에 대한 일반화", "암기 테스트", "속도 측정"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "eval_a8",
        title: "Fairness 메트릭스 선택은?",
        options: ["도메인과 공정성 정의에 따라", "하나만 사용", "불필요"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "eval_a9",
        title: "Continual evaluation 시스템은?",
        options: ["배포 후 지속적 모니터링", "일회성 테스트", "배포 전만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "eval_a10",
        title: "Evaluation data contamination은?",
        options: ["테스트 데이터 학습 포함 문제", "좋은 현상", "무관함"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      }
    ]
  },

  // 10. 산업별 특화 (Industry Specific)
  industry: {
    beginner: [
      {
        id: "ind_b1",
        title: "마케팅에서 AI 활용 사례는?",
        options: ["개인화 추천과 광고 카피", "제조만", "사용 안함"],
        correct: 0,
        enemyType: "legacy_tool",
        exp: 10
      },
      {
        id: "ind_b2",
        title: "교육 분야 AI 활용은?",
        options: ["맞춤형 학습과 평가", "일률적 교육", "사용 금지"],
        correct: 0,
        enemyType: "legacy_tool",
        exp: 10
      },
      {
        id: "ind_b3",
        title: "의료 AI의 주요 활용은?",
        options: ["진단 보조와 약물 개발", "치료만", "사용 안함"],
        correct: 0,
        enemyType: "legacy_tool",
        exp: 10
      },
      {
        id: "ind_b4",
        title: "금융 AI의 용도는?",
        options: ["사기 탐지와 리스크 평가", "거래만", "사용 금지"],
        correct: 0,
        enemyType: "legacy_tool",
        exp: 10
      },
      {
        id: "ind_b5",
        title: "제조업 AI 활용은?",
        options: ["품질 관리와 예측 정비", "생산만", "사용 안함"],
        correct: 0,
        enemyType: "legacy_tool",
        exp: 10
      },
      {
        id: "ind_b6",
        title: "리테일 AI의 역할은?",
        options: ["재고 관리와 수요 예측", "판매만", "불필요"],
        correct: 0,
        enemyType: "legacy_tool",
        exp: 10
      },
      {
        id: "ind_b7",
        title: "법률 분야 AI 활용은?",
        options: ["문서 검토와 판례 분석", "재판만", "사용 금지"],
        correct: 0,
        enemyType: "legacy_tool",
        exp: 10
      },
      {
        id: "ind_b8",
        title: "농업 AI의 적용은?",
        options: ["작물 모니터링과 수확 예측", "파종만", "사용 안함"],
        correct: 0,
        enemyType: "legacy_tool",
        exp: 10
      },
      {
        id: "ind_b9",
        title: "물류 AI 최적화는?",
        options: ["경로 최적화와 배송 예측", "운송만", "불필요"],
        correct: 0,
        enemyType: "legacy_tool",
        exp: 10
      },
      {
        id: "ind_b10",
        title: "부동산 AI 활용은?",
        options: ["가격 예측과 매물 추천", "거래만", "사용 안함"],
        correct: 0,
        enemyType: "legacy_tool",
        exp: 10
      }
    ],
    intermediate: [
      {
        id: "ind_i1",
        title: "Programmatic advertising AI는?",
        options: ["실시간 입찰과 타겟팅 자동화", "수동 광고", "TV 광고만"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "ind_i2",
        title: "Adaptive learning 시스템은?",
        options: ["학습자 수준에 맞춰 조절", "고정 커리큘럼", "교사만"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "ind_i3",
        title: "의료 영상 AI의 정확도는?",
        options: ["특정 분야는 전문의 수준", "항상 부정확", "사용 불가"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "ind_i4",
        title: "알고리즘 트레이딩의 특징은?",
        options: ["밀리초 단위 자동 거래", "수동 거래", "하루 한 번"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "ind_i5",
        title: "Digital twin in 제조업은?",
        options: ["실시간 시뮬레이션과 최적화", "단순 모니터링", "도면만"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "ind_i6",
        title: "Dynamic pricing AI는?",
        options: ["수요-공급 실시간 가격 조정", "고정 가격", "할인만"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "ind_i7",
        title: "Legal AI의 한계는?",
        options: ["법적 조언은 변호사만 가능", "완전 대체", "제한 없음"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "ind_i8",
        title: "Precision agriculture AI는?",
        options: ["드론과 센서로 정밀 농업", "전통 농법", "추측만"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "ind_i9",
        title: "Last-mile delivery 최적화는?",
        options: ["AI 경로와 드론/로봇 배송", "트럭만", "도보만"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      },
      {
        id: "ind_i10",
        title: "PropTech AI 혁신은?",
        options: ["가상 투어와 자동 계약", "오프라인만", "중개인만"],
        correct: 0,
        enemyType: "prompt_eater",
        exp: 15
      }
    ],
    advanced: [
      {
        id: "ind_a1",
        title: "Attribution modeling in 마케팅은?",
        options: ["다채널 기여도 AI 분석", "단일 채널만", "추측만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "ind_a2",
        title: "교육 AI의 윤리적 과제는?",
        options: ["편향, 프라이버시, 공정성", "기술만 중요", "문제 없음"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "ind_a3",
        title: "AI 신약 개발 플랫폼은?",
        options: ["분자 설계와 임상 예측", "실험만", "불가능"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "ind_a4",
        title: "RegTech AI 컴플라이언스는?",
        options: ["규제 자동 모니터링과 보고", "수동 확인", "무시"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "ind_a5",
        title: "Industry 4.0 AI 통합은?",
        options: ["IoT, AI, 로봇 융합", "자동화만", "IT만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "ind_a6",
        title: "Omnichannel AI 전략은?",
        options: ["모든 채널 통합 고객 경험", "온라인만", "오프라인만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "ind_a7",
        title: "Judicial AI의 미래는?",
        options: ["보조 도구로 제한적 활용", "판사 대체", "사용 금지"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "ind_a8",
        title: "Climate-smart agriculture AI는?",
        options: ["기후 변화 대응 최적 재배", "전통 농법만", "포기"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "ind_a9",
        title: "Autonomous logistics 생태계는?",
        options: ["자율 차량, 드론, 로봇 통합", "사람만", "트럭만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      },
      {
        id: "ind_a10",
        title: "Smart city 부동산 AI는?",
        options: ["도시 데이터 통합 분석", "건물만", "토지만"],
        correct: 0,
        enemyType: "singularity_eye",
        exp: 25
      }
    ]
  }
};

// 난이도별 적 타입 매핑
const ENEMY_MAPPING = {
  beginner: ["glitch", "hallucination"],
  intermediate: ["prompt_eater", "legacy_tool"],
  advanced: ["security_bot", "singularity_eye"]
};

// 경험치 매핑
const EXP_MAPPING = {
  beginner: 10,
  intermediate: 15,
  advanced: 25
};

// 모든 질문을 하나의 배열로 변환하는 헬퍼 함수
function getAllQuestions() {
  const allQuestions = [];

  for (const [categoryKey, categoryData] of Object.entries(EXTENDED_QUESTIONS)) {
    for (const [difficulty, questions] of Object.entries(categoryData)) {
      questions.forEach(q => {
        allQuestions.push({
          ...q,
          category: categoryKey,
          difficulty: difficulty
        });
      });
    }
  }

  return allQuestions;
}

// 카테고리별 질문 가져오기
function getQuestionsByCategory(category, difficulty = null) {
  if (!EXTENDED_QUESTIONS[category]) return [];

  if (difficulty) {
    return EXTENDED_QUESTIONS[category][difficulty] || [];
  }

  // 모든 난이도의 질문 반환
  return [
    ...EXTENDED_QUESTIONS[category].beginner,
    ...EXTENDED_QUESTIONS[category].intermediate,
    ...EXTENDED_QUESTIONS[category].advanced
  ];
}

// 랜덤 질문 선택 (난이도 균형 맞춰서)
function getRandomQuestions(count = 10) {
  const allQuestions = getAllQuestions();
  const shuffled = allQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Export for use in game
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    EXTENDED_QUESTIONS,
    getAllQuestions,
    getQuestionsByCategory,
    getRandomQuestions
  };
}