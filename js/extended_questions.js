// 직무별 확장 문제 데이터 (각 직무 40문항)
const ROLE_META = {
  developer: {
    label: "개발자",
    domain: "코드/서비스",
    asset: "API 명세·테스트 코드",
    data: "에러 로그·요구사항",
  },
  marketer: {
    label: "마케터",
    domain: "캠페인/콘텐츠",
    asset: "카피·랜딩·광고 소재",
    data: "페르소나·성과 데이터",
  },
  sales: {
    label: "영업",
    domain: "제안/계약",
    asset: "제안서·견적·영업 이메일",
    data: "고객 요구·CRM 히스토리",
  },
  cs: {
    label: "CS",
    domain: "티켓/FAQ",
    asset: "응대 스크립트·매뉴얼",
    data: "티켓 로그·제품 변경사항",
  },
  designer: {
    label: "디자이너",
    domain: "디자인/브랜드",
    asset: "와이어프레임·시안·디자인 시스템",
    data: "요구사항·브랜드 가이드·리뷰",
  },
  general: {
    label: "일반",
    domain: "업무/학습",
    asset: "보고서·메모·계획",
    data: "회의록·참고 자료",
  },
};

const EXP_BY_LEVEL = { beginner: 10, intermediate: 15, advanced: 22 };
const CATEGORY_LIMIT = { beginner: 3, intermediate: 3, advanced: 2 };

// 개발자 전용 고유 40문항
const DEV_QUESTIONS = {
  practical: {
    beginner: [
      {
        id: "developer_practical_b1",
        difficulty: "beginner",
        title: "Copilot이 생성한 로그인 코드에 보안 취약점이 의심될 때 AI에게 먼저 시킬 일은?",
        options: [
          "OWASP 기준으로 취약점 후보를 나열하고 수정 패치를 제안하게 한다",
          "UI 색상을 바꾸라고 지시한다",
          "변수명을 더 짧게 줄이라고 한다",
        ],
        correct: 0,
        desc: "보안 체크리스트로 후보를 찾고, 수정안을 함께 받아야 빠르게 검증할 수 있다.",
        enemyType: "glitch",
        concept: "보안 코드 리뷰",
        whyCorrect:
          "OWASP 같은 기준으로 의심 지점을 먼저 찾게 하면 놓치기 쉬운 인젝션, 취약한 인증 로직을 빠르게 좁힐 수 있다. 예를 들어 SQL 쿼리 조립 부분을 지목하게 하고, 준비된 구문으로 고친 패치까지 제안받으면 검증 속도가 빨라진다.",
        whyWrong: {
          1: "색상 변경은 보안과 무관해요. 겉모습을 고치기보다 취약점 후보부터 확인하는 편이 안전합니다.",
          2: "변수명을 줄이면 코드가 간결해지지만 취약점이 사라지지는 않아요. 먼저 위험 부분을 찾고 수정안을 받는 게 효과적입니다.",
        },
        realWorldTip: "AI가 제안한 패치는 바로 적용 말고, 로컬/CI에서 보안 정적 분석과 함께 검증하세요.",
      },
      {
        id: "developer_practical_b2",
        difficulty: "beginner",
        title: "에러 로그를 AI로 요약할 때 최소로 제공해야 할 정보는?",
        options: [
          "스택트레이스와 발생한 입력/상황 요약",
          "최근 팀 회식 사진",
          "개발자 닉네임 목록",
        ],
        correct: 0,
        desc: "에러 위치와 재현 맥락이 있어야 요약이 유용하다.",
        enemyType: "glitch",
        concept: "로그 요약 맥락",
        whyCorrect:
          "스택트레이스와 어떤 입력/상황에서 발생했는지 알려주면 AI가 핵심 원인을 빠르게 추려준다. 예를 들어 'PUT /orders/123, body {…}, 500, stack: …NullPointer'를 주면 재현까지 한 번에 확인할 수 있다.",
        whyWrong: {
          1: "사진은 분위기를 전하지만 오류와는 관련이 없어요. 필요한 정보만 주면 요약 품질이 올라갑니다.",
          2: "닉네임 정보는 책임 추적엔 도움 될 수 있지만 원인 분석에는 직접적이지 않아요. 로그와 상황이 우선입니다.",
        },
        realWorldTip: "로그 요약 프롬프트에 '재현 단계 3줄'을 추가하면 티켓 작성 시간이 크게 줄어든다.",
      },
      {
        id: "developer_practical_b3",
        difficulty: "beginner",
        title: "PR 설명을 AI로 작성할 때 반드시 포함해야 할 것은?",
        options: [
          "문제 상황, 핵심 변경점, 테스트 결과",
          "PR 작성자의 점심 메뉴",
          "좋아하는 라이브러리 순위",
        ],
        correct: 0,
        desc: "문제-해결-검증 흐름을 적어야 리뷰어가 바로 이해한다.",
        enemyType: "glitch",
        concept: "PR 문서화",
        whyCorrect:
          "어떤 문제를 해결했고 무엇을 바꿨으며 어떤 테스트를 통과했는지 적으면 리뷰어가 바로 판단할 수 있다. 예를 들어 '결제 재시도 무한루프 수정, 재시도 횟수 제한 추가, unit/integration 통과' 같은 구조가 유용하다.",
        whyWrong: {
          1: "점심 메뉴는 친근하지만 리뷰 판단에 도움 되지 않아요. 리뷰어 시간을 아끼려면 핵심 정보를 주는 게 좋습니다.",
          2: "라이브러리 취향은 흥미롭지만 변경 의도나 영향도를 설명하지 않습니다. 리뷰 흐름에 필요한 정보만 넣어주세요.",
        },
        realWorldTip: "PR마다 '문제-해결-테스트' 서식을 템플릿으로 고정하고 AI가 채우게 하면 리뷰 속도가 빨라진다.",
      },
    ],
  },
};

// 아직 미완성 - 추후 나머지 문제 추가 예정

const BASE_TEMPLATES = {
  practical: [
    {
      id: "prac_b1",
      difficulty: "beginner",
      title: "AI로 {ASSET} 초안을 만들 때 먼저 챙길 정보는?",
      options: ["목표·대상·제약 조건", "색상 테마", "이모지/말투만 지정"],
      correct: 0,
      desc: "목표와 대상, 제약을 명시해야 산출물이 맞는다.",
      enemyType: "glitch",
      concept: "요구사항 맥락 세팅",
      whyCorrect:
        "AI가 방향을 잡으려면 목적, 읽는 사람, 분량·규정 같은 제약을 먼저 줘야 한다. 예를 들어 {ROLE}가 내부 {ASSET}을 만들 때 'QA팀용, 1페이지, 테스트 범위 명시'를 알려주면 재작업이 줄어든다.",
      whyWrong: {
        1: "색상 테마를 먼저 떠올리기 쉽지만, 목표나 독자가 없으면 AI가 길을 잃어요. 디자인보다 방향을 먼저 잡아야 산출물이 일관됩니다.",
        2: "말투만 정하면 친근해 보일 수 있지만, 무엇을 위해 쓰는지 정보가 없어 결과가 제각각 나올 수 있어요. 기본 맥락을 먼저 채워주세요.",
      },
      realWorldTip: "반복 요청이면 목표·대상·제약을 3줄 템플릿으로 만들어 붙여넣으면 품질이 안정된다.",
    },
    {
      id: "prac_b2",
      difficulty: "beginner",
      title: "회의 메모를 AI로 요약할 때 필수로 넣어야 하는 것은?",
      options: ["참석자·결정사항·액션 아이템", "회의실 온도", "간식 메뉴"],
      correct: 0,
      desc: "누가 무엇을 결정했는지와 후속 액션을 함께 줘야 한다.",
      enemyType: "glitch",
      concept: "결정/책임 추적",
      whyCorrect:
        "참석자, 결정, 담당자와 기한을 포함해야 이후 추적이 가능하다. 예를 들어 '백엔드 리더-API 마이그레이션 결정-12/10까지 민수'처럼 연결하면 자동 요약도 바로 쓸 수 있다.",
      whyWrong: {
        1: "회의실 온도처럼 분위기 정보는 재밌지만 실행 계획을 세우는 데는 도움이 안 돼요. 핵심 결정 정보가 묻힐 수 있습니다.",
        2: "간식 메뉴를 적고 싶을 수 있지만 업무 핵심과는 거리가 있어요. 불필요한 정보가 많으면 AI가 중요한 포인트를 놓칠 수 있습니다.",
      },
      realWorldTip: "캘린더 초대에 '참석자/의제/결정/액션' 서식을 같이 적어두면 회의 후 바로 AI 요약을 돌릴 수 있다.",
    },
    {
      id: "prac_b3",
      difficulty: "beginner",
      title: "AI가 만든 {ASSET}에 사실 오류가 의심될 때 첫 조치는?",
      options: ["원본 {DATA}와 대조하며 검증", "길이만 줄이기", "폰트만 바꾸기"],
      correct: 0,
      desc: "출력을 원본과 비교해 틀린 부분을 바로 잡아야 한다.",
      enemyType: "glitch",
      concept: "사실 검증",
      whyCorrect:
        "근거 데이터와 줄 단위로 비교하며 틀린 수치·인용을 표시해야 한다. 예를 들어 로그의 에러율이나 캠페인 전환율을 원본과 대조하면 신뢰를 지킬 수 있다.",
      whyWrong: {
        1: "길이를 줄이면 정돈돼 보여서 선택하기 쉽지만, 사실 관계가 틀렸다면 오류가 그대로 남아요. 짧아진 오류는 더 눈에 띄지 않을 수 있습니다.",
        2: "폰트를 바꾸면 산출물이 깔끔해 보이지만, 사실성은 그대로예요. 겉모습보다 내용 검증이 먼저입니다.",
      },
      realWorldTip: "원본 링크나 스크린샷을 AI 출력 옆에 붙여두고 리뷰하면 검수 시간을 크게 줄일 수 있다.",
    },
    {
      id: "prac_i1",
      difficulty: "intermediate",
      title: "반복되는 {ASSET}을 자동화 템플릿으로 만들 때 가장 먼저 정의할 것은?",
      options: ["입력·출력 스키마와 품질 기준", "색상/폰트 가이드", "모델 버전만 변경"],
      correct: 0,
      desc: "스키마와 합격 기준이 고정돼야 자동화 품질을 비교할 수 있다.",
      enemyType: "prompt_eater",
      concept: "스키마 고정",
      whyCorrect:
        "필수 입력 필드, 기대 출력 구조, 합격 기준을 미리 정의해야 회귀 테스트가 가능하다. 예를 들어 '입력: 요구사항/로그, 출력: 표준 체크리스트·요약, 기준: 오류 유형 3개 포함'처럼 고정한다.",
      whyWrong: {
        1: "디자인 가이드를 먼저 챙기면 완성도가 높을 것 같지만, 구조가 없으면 매번 새로 설명해야 해요. 자동화 효과가 줄어듭니다.",
        2: "모델을 바꾸면 나아질 것처럼 느껴지지만, 기준이 없으면 개선 여부를 확인하기 어렵습니다. 비교할 공통 틀이 필요해요.",
      },
      realWorldTip: "JSON 스키마와 샘플 입력/출력을 한 문서에 두고 PR 템플릿처럼 관리하면 팀 합의가 빨라진다.",
    },
    {
      id: "prac_i2",
      difficulty: "intermediate",
      title: "{DOMAIN} 리스크나 이슈 로그를 AI로 정리할 때 놓치기 쉬운 정보는?",
      options: ["발생 조건·영향도·우선순위", "시각 효과", "폰트 스타일"],
      correct: 0,
      desc: "조건과 영향이 있어야 우선순위가 계산된다.",
      enemyType: "prompt_eater",
      concept: "리스크 우선순위",
      whyCorrect:
        "발생 조건과 고객/시스템 영향, 우선순위를 함께 기록해야 대응 순서를 정할 수 있다. 예를 들어 '로그인 실패 5% 이상이면, 신규 결제 중단 영향, P1'처럼 표준화한다.",
      whyWrong: {
        1: "시각 효과를 주면 보기 좋지만, 의사결정에 필요한 정보가 빠지면 우선순위를 정하기 어렵습니다.",
        2: "폰트 스타일을 다듬으면 깔끔해 보이지만, 리스크 판단에는 조건과 영향 정보가 더 중요해요.",
      },
      realWorldTip: "리스크 템플릿에 조건/영향/주요 지표를 필수 필드로 설정하고 AI가 빈칸을 채우게 하면 우선순위 회의가 빨라진다.",
    },
    {
      id: "prac_i3",
      difficulty: "intermediate",
      title: "다국어 {ASSET}을 안정적으로 만들기 위한 필수 입력은?",
      options: ["용어집·톤·길이 지침", "랜덤 이모지", "무료 번역기 링크만 제공"],
      correct: 0,
      desc: "용어와 톤을 고정해야 언어별 품질이 균일해진다.",
      enemyType: "prompt_eater",
      concept: "용어/톤 가이드",
      whyCorrect:
        "공통 용어집, 브랜드 톤, 목표 길이를 명시하면 언어별 표현이 달라지지 않는다. 예를 들어 '용어: 사용자는 회원, 톤: 격식, 길이: 500자'처럼 주면 재검수가 줄어든다.",
      whyWrong: {
        1: "이모지는 친근함을 주지만 번역 시 의미가 달라지거나 문화적 오해가 생길 수 있어요. 표현이 흔들릴 수 있습니다.",
        2: "번역기 링크만 주면 도구 선택이 제각각이어서 용어 일관성을 지키기 어렵습니다. 공통 가이드가 필요해요.",
      },
      realWorldTip: "언어별 금지 표현과 허용 표현을 짧게 정리해 프롬프트에 첨부하면 QA 시간이 크게 줄어든다.",
    },
    {
      id: "prac_a1",
      difficulty: "advanced",
      title: "RAG로 {ASSET} 답변 품질을 높이려면 초기 설계에서 가장 중요한 것은?",
      options: ["청크 기준과 메타데이터(출처·권한)", "온도 0으로 고정", "토큰 제한만 늘리기"],
      correct: 0,
      desc: "검색 적합도를 좌우하는 청크/메타 설계가 핵심이다.",
      enemyType: "singularity_eye",
      concept: "검색 적합도 설계",
      whyCorrect:
        "콘텐츠를 의미 단위로 자르고 출처·버전·권한 태그를 붙여야 검색과 필터링이 정확해진다. 예를 들어 매뉴얼을 API별/릴리스별 청크로 나누고 권한 태그를 걸면 잘못된 답변을 막을 수 있다.",
      whyWrong: {
        1: "온도를 낮추면 차분해지긴 하지만, 검색이 잘못되면 여전히 틀린 답을 줄 수 있어요. 근거 품질을 먼저 잡는 게 안전합니다.",
        2: "토큰을 많이 주면 풍부해 보이지만 불필요한 내용도 늘어 핵심이 흐려질 수 있습니다. 선별된 컨텍스트가 더 중요해요.",
      },
      realWorldTip: "초기 파일 업로드 시 메타데이터 스키마를 먼저 정의하고, 검색 실패 예시를 수집해 청크 기준을 조정하라.",
    },
    {
      id: "prac_a2",
      difficulty: "advanced",
      title: "AI 도입 효과를 경영진에 설득하려면 어떤 근거가 필요할까?",
      options: ["도입 전후 베이스라인 대비 정량 지표", "새 UI 스크린샷", "팀 분위기 느낌"],
      correct: 0,
      desc: "전후 비교 가능한 정량 지표가 있어야 설득된다.",
      enemyType: "singularity_eye",
      concept: "정량적 효과 증명",
      whyCorrect:
        "시간 단축, 오류율 감소, 전환율 개선 같은 지표를 도입 전후 베이스라인과 비교해야 효과를 증명할 수 있다. 예를 들어 코드 리뷰 평균 2일→0.5일, 캠페인 작성 시간 4시간→1시간처럼 제시한다.",
      whyWrong: {
        1: "UI 스크린샷은 눈에 잘 띄지만 성과를 숫자로 증명하지는 못해요. 결정권자가 납득하기 어려울 수 있습니다.",
        2: "팀 분위기 이야기는 따뜻하지만, 투자 판단에는 객관적 근거가 부족해요. 데이터와 함께 제시하면 더 힘이 실립니다.",
      },
      realWorldTip: "도입 전에 기준 지표를 한 번 측정해둔 뒤 주간 리포트로 같은 지표를 추적하면 예산 심의 때 바로 활용할 수 있다.",
    },
  ],
  prompt: [
    {
      id: "prompt_b1",
      difficulty: "beginner",
      title: "톤이나 길이가 지켜지지 않을 때 가장 먼저 해야 할 조치는?",
      options: ["시스템 메시지에 톤·길이·형식을 명시", "온도만 낮추기", "샘플 수만 줄이기"],
      correct: 0,
      desc: "시스템 레벨에서 형식을 고정해야 흔들리지 않는다.",
      enemyType: "prompt_eater",
      concept: "시스템 지시 활용",
      whyCorrect:
        "시스템 메시지에 톤, 길이, 금지 표현을 넣으면 사용자 입력보다 우선 적용된다. 예를 들어 '200자 이하, 존댓말, 행동만 bullet'을 시스템에 넣으면 질문이 흔들려도 형식이 유지된다.",
      whyWrong: {
        1: "온도를 낮추면 차분해지지만 길이나 형식을 반드시 지키는 장치는 아니에요. 여전히 편차가 날 수 있습니다.",
        2: "샘플 수를 줄이면 간단해 보이지만, 형식 규칙을 명시하지 않으면 결과가 들쭉날쭉할 수 있어요.",
      },
      realWorldTip: "자주 쓰는 형식은 시스템 메시지 템플릿으로 저장해 팀이 복붙할 수 있게 공유하라.",
    },
    {
      id: "prompt_b2",
      difficulty: "beginner",
      title: "JSON 형태로 분류 결과를 받으려면 어떤 지시가 필요할까?",
      options: ["스키마와 예시(JSON)를 함께 제공", "길이만 제한", "모델만 교체"],
      correct: 0,
      desc: "출력 스키마를 명시해야 구조가 고정된다.",
      enemyType: "prompt_eater",
      concept: "구조화 출력 지시",
      whyCorrect:
        "필드 이름, 타입, 허용 값, 예시를 함께 주면 모델이 같은 구조로 답한다. 예를 들어 `{\"tag\": [\"bug\"], \"priority\": \"P1\"}` 같은 예시를 넣으면 파싱 오류가 줄어든다.",
      whyWrong: {
        1: "길이만 제한하면 깔끔해 보이지만 구조는 여전히 자유로워 JSON이 깨질 수 있어요. 형태를 명확히 해야 합니다.",
        2: "모델을 바꾸면 나아질 것 같지만, 스키마를 주지 않으면 어떤 모델도 동일한 구조를 보장하기 어렵습니다.",
      },
      realWorldTip: "JSON 스키마를 코드 블록으로 넣고 '다른 문자는 제외'라고 명시하면 운영에서 파싱 실패가 크게 줄어든다.",
    },
    {
      id: "prompt_b3",
      difficulty: "beginner",
      title: "AI에게 역할을 부여하는 주된 목적은?",
      options: ["응답 범위와 톤을 좁혀 편차를 줄이기", "속도 향상", "비용 감소"],
      correct: 0,
      desc: "역할 지시는 품질 편차를 줄이는 장치다.",
      enemyType: "prompt_eater",
      concept: "역할 기반 프롬프트",
      whyCorrect:
        "전문가 역할을 주면 기대하는 관점과 언어가 좁혀져 일관성이 생긴다. 예를 들어 '{ROLE} 선임으로서 보안 위험만 지적'이라고 하면 불필요한 아이디어 제안이 줄어든다.",
      whyWrong: {
        1: "역할을 주면 집중할 것 같지만 속도 자체가 빨라지지는 않아요. 응답 품질과 관련된 설정입니다.",
        2: "역할 지시는 비용을 바로 낮추지 않아요. 토큰을 줄이거나 프로세스를 바꿔야 비용이 변합니다.",
      },
      realWorldTip: "역할과 금지사항을 함께 주면 톤과 범위가 동시에 잡혀 리뷰 시간이 단축된다.",
    },
    {
      id: "prompt_i1",
      difficulty: "intermediate",
      title: "길이가 긴 {DATA}를 요약할 때 오류를 줄이는 방식은?",
      options: ["부분 요약 후 메타 요약(계층 요약)", "온도 0으로 고정", "길이 제한만 늘리기"],
      correct: 0,
      desc: "계층 요약이 길이 제한을 우회하며 정확도를 높인다.",
      enemyType: "prompt_eater",
      concept: "계층 요약 설계",
      whyCorrect:
        "본문을 여러 조각으로 나눠 요약한 뒤 그 요약들을 다시 압축하면 맥락을 유지하면서 길이를 맞출 수 있다. 예를 들어 티켓 50개를 5개씩 요약하고 다시 합치면 누락을 줄일 수 있다.",
      whyWrong: {
        1: "온도를 낮추면 차분해지지만 긴 입력을 다 담지는 못해요. 길이 문제는 여전히 남습니다.",
        2: "길이 제한을 늘리면 편해 보이지만 한계에 부딪히거나 비용이 커질 수 있어요. 구조적으로 요약하는 편이 안전합니다.",
      },
      realWorldTip: "대량 문서를 다룰 때는 'chunk 요약 -> 합치기 -> 검증' 스텝을 템플릿으로 만들어둬라.",
    },
    {
      id: "prompt_i2",
      difficulty: "intermediate",
      title: "할루시네이션을 줄이기 위한 프롬프트 설계는?",
      options: ["근거 없으면 모른다고 답하고, 인용 근거를 표기하라고 지시", "온도 높이기", "질문을 여러 번 반복하기"],
      correct: 0,
      desc: "불확실성 표현과 근거 인용을 강제해야 한다.",
      enemyType: "prompt_eater",
      concept: "근거 기반 답변",
      whyCorrect:
        "모른다는 응답을 허용하고 근거 출처를 요구하면 추측을 줄일 수 있다. 예를 들어 '출처 URL 2개 이상 인용, 없으면 모르겠다고 답'을 넣으면 허위 링크를 덜 만든다.",
      whyWrong: {
        1: "온도를 높이면 창의적이긴 하지만 추측도 함께 늘 수 있어요. 안정성에는 맞지 않습니다.",
        2: "질문을 반복하면 설득력은 생기지만 근거가 없으면 같은 오류가 계속될 수 있어요. 근거 요구가 더 효과적입니다.",
      },
      realWorldTip: "실서비스에서는 '근거 없는 답변 거절' 규칙을 시스템 메시지로 고정하고 로깅까지 연결해야 한다.",
    },
    {
      id: "prompt_i3",
      difficulty: "intermediate",
      title: "다단계 추론 문제가 자주 틀릴 때 넣어야 할 지시는?",
      options: ["중간 추론 단계를 표/리스트로 적게 하고 자기 검증을 지시", "최종 답만 요청", "샘플 수만 늘리기"],
      correct: 0,
      desc: "중간 사고 과정을 외부화해야 오류를 잡을 수 있다.",
      enemyType: "prompt_eater",
      concept: "체인 오브 소트",
      whyCorrect:
        "중간 계산이나 가정, 근거를 표로 적게 하고 '오류가 있으면 수정' 지시를 넣으면 논리 비약을 잡을 수 있다. 예를 들어 정책 비교 시 항목별 체크리스트를 채우게 하면 빠뜨림이 줄어든다.",
      whyWrong: {
        1: "최종 답만 받으면 간단하지만, 과정이 보이지 않아 개선 포인트를 찾기 어려워요.",
        2: "샘플을 늘리면 맞을 확률은 오르지만 비용이 커지고 원인 분석이 어렵습니다. 과정 노출이 더 효율적이에요.",
      },
      realWorldTip: "중간 표를 로그로 저장해 오답 패턴을 분석하면 프롬프트 개선 포인트가 명확해진다.",
    },
    {
      id: "prompt_a1",
      difficulty: "advanced",
      title: "안전 프롬프트를 설계할 때 반드시 포함해야 할 것은?",
      options: ["금지 주제·표현과 거부 응답 패턴", "온도 0", "예시 1개만 추가"],
      correct: 0,
      desc: "금지 항목과 거부 규칙이 있어야 정책을 지킨다.",
      enemyType: "security_bot",
      concept: "안전 가드레일",
      whyCorrect:
        "금지 키워드, 허용 범위, 위반 시 답변 예시를 명시하면 모델이 민감 주제를 거부할 수 있다. 예를 들어 '개인정보 요청 시 답변 거부 문구'를 넣으면 유출을 막는다.",
      whyWrong: {
        1: "온도를 낮추면 조심스러워지지만, 금지 주제를 꼭 피하는 장치는 아니에요. 정책은 별도로 명확히 해야 합니다.",
        2: "예시가 1개뿐이면 다양한 우회 패턴을 막기 어렵습니다. 몇 가지 대표 사례를 더 넣으면 안전해져요.",
      },
      realWorldTip: "정책 문구는 시스템 프롬프트에 고정하고, 감사 로그에 거부 사유도 함께 남겨야 규제 대응이 쉽다.",
    },
    {
      id: "prompt_a2",
      difficulty: "advanced",
      title: "프롬프트 실험을 코드로 관리할 때 필요한 것은?",
      options: ["버전·테스트 케이스·시드 기록", "주석 제거", "무작위 입력"],
      correct: 0,
      desc: "버전과 테스트를 기록해야 회귀 비교가 가능하다.",
      enemyType: "singularity_eye",
      concept: "프롬프트 버전 관리",
      whyCorrect:
        "프롬프트 문자열과 실험 시드, 기대 출력 테스트를 함께 저장해야 변경 효과를 비교할 수 있다. 예를 들어 git에 프롬프트와 회귀 테스트를 묶어두면 릴리스 전 품질 검증이 가능하다.",
      whyWrong: {
        1: "주석을 지우면 단정해 보이지만 변경 이유를 잃어버려 다시 개선하기 어려워요.",
        2: "무작위 입력만 쓰면 매번 결과가 달라 비교가 힘듭니다. 같은 시드를 써야 개선 효과를 확인할 수 있어요.",
      },
      realWorldTip: "AB 테스트용 프롬프트와 결과 샘플을 폴더 구조로 고정해두면 새 모델 교체 시 바로 비교할 수 있다.",
    },
  ],
  tools: [
    {
      id: "tools_b1",
      difficulty: "beginner",
      title: "실시간 정보가 필요한 질문에 적합한 모델/도구는?",
      options: ["브라우징·검색 가능한 모델", "텍스트 전용 오프라인 모델", "이미지 전용 모델"],
      correct: 0,
      desc: "실시간 정보는 브라우징 모델로 최신성을 확보한다.",
      enemyType: "legacy_tool",
      concept: "실시간 검색 활용",
      whyCorrect:
        "뉴스나 가격처럼 변하는 정보는 검색/브라우징 기능이 있는 모델로 확인해야 한다. 예를 들어 고객 가용 재고를 답할 때 브라우징 모델을 쓰면 최신 데이터를 불러올 수 있다.",
      whyWrong: {
        1: "오프라인 모델은 빠르지만 최신 정보가 없을 수 있어요. 업데이트 주기를 모르면 답이 낡을 위험이 있습니다.",
        2: "이미지 모델은 시각 처리에 강점이 있어 텍스트 기반 최신 정보를 답하기에는 적합하지 않습니다.",
      },
      realWorldTip: "정적 질의와 실시간 질의를 라우팅해 비용을 아끼고 정확도를 높여라.",
    },
    {
      id: "tools_b2",
      difficulty: "beginner",
      title: "{ASSET} 협업 문서를 만들 때 기본 권한 설정은?",
      options: ["최소 권한 원칙으로 편집자를 제한", "모두 편집 가능하게 공개", "테마만 먼저 설정"],
      correct: 0,
      desc: "최소 권한 원칙을 적용해야 유출과 오염을 막는다.",
      enemyType: "legacy_tool",
      concept: "권한 최소화",
      whyCorrect:
        "역할별로 보기/편집을 분리해야 실수나 유출을 줄인다. 예를 들어 제안서 초안은 담당자만 편집, 나머지는 댓글만 허용하면 이력이 깔끔하다.",
      whyWrong: {
        1: "모두 편집을 열어두면 빠를 것 같지만 우발적 수정이나 유출 위험이 커질 수 있어요.",
        2: "테마를 맞추면 보기 좋지만 접근 통제와는 별개예요. 권한이 먼저 정리돼야 합니다.",
      },
      realWorldTip: "민감 문서는 만료 기간과 링크 보호를 함께 설정해 두면 배포 후에도 통제가 쉽다.",
    },
    {
      id: "tools_b3",
      difficulty: "beginner",
      title: "스프레드시트를 AI로 분석하기 전에 해야 할 일은?",
      options: ["헤더와 데이터 타입을 정리", "배경색을 꾸미기", "행 높이 늘리기"],
      correct: 0,
      desc: "정리된 스키마가 있어야 분석 오류가 줄어든다.",
      enemyType: "legacy_tool",
      concept: "데이터 정규화",
      whyCorrect:
        "열 이름과 타입을 명확히 해야 모델이 의미를 이해한다. 예를 들어 날짜 열을 텍스트로 두면 기간 계산이 틀리므로 사전에 ISO 날짜로 변환한다.",
      whyWrong: {
        1: "배경색을 바꾸면 가독성은 좋아지지만 데이터 의미를 바로잡지는 못해요.",
        2: "행 높이를 조정하면 보기 편해지지만 값 자체의 정확성과는 무관합니다.",
      },
      realWorldTip: "업로드 전에 null, 단위, 중복을 간단히 정리한 후 AI 분석을 돌리면 오탐을 크게 줄일 수 있다.",
    },
    {
      id: "tools_i1",
      difficulty: "intermediate",
      title: "외부 API 호출이 실패해도 워크플로가 버티게 하려면?",
      options: ["백오프 재시도와 회로 차단 패턴 적용", "무한 재호출", "에러를 무시하고 진행"],
      correct: 0,
      desc: "재시도와 차단으로 장애 전파를 막는다.",
      enemyType: "legacy_tool",
      concept: "회복 탄력성 설계",
      whyCorrect:
        "지수 백오프와 회로 차단을 넣으면 일시 장애 시 자동 복구하고, 연쇄 장애를 막을 수 있다. 예를 들어 429 응답 시 1s/2s/4s 대기 후 차단하면 서비스가 안정된다.",
      whyWrong: {
        1: "무한 재호출은 곧 복구될 것 같지만 비용이 커지고 상대 시스템에 부담을 줄 수 있어요.",
        2: "에러를 무시하면 겉으론 진행되지만 잘못된 결과가 쌓여 신뢰를 잃을 수 있습니다.",
      },
      realWorldTip: "외부 의존점은 별도 모듈로 분리하고 재시도 횟수·타임아웃을 환경변수로 관리하면 운영 중에도 튜닝하기 쉽다.",
    },
    {
      id: "tools_i2",
      difficulty: "intermediate",
      title: "로그를 수집·공유할 때 민감 정보 노출을 막는 방법은?",
      options: ["마스킹/삭제 파이프라인을 적용", "용량만 늘리기", "압축만 하기"],
      correct: 0,
      desc: "수집 시점에 민감 필드를 걸러야 한다.",
      enemyType: "security_bot",
      concept: "로그 프라이버시",
      whyCorrect:
        "수집 단계에서 이메일·전화·주민번호 등을 자동 마스킹해야 유출을 막을 수 있다. 예를 들어 정규식 파이프라인으로 카드번호를 `****` 처리한 뒤 저장한다.",
      whyWrong: {
        1: "용량을 늘리면 많이 담을 수 있지만, 민감 정보가 그대로라면 리스크는 줄지 않습니다.",
        2: "압축은 공간을 아껴주지만 노출된 정보 자체를 없애지는 못해요. 필터링이 우선입니다.",
      },
      realWorldTip: "로그 스키마에 '민감 필드' 태그를 달아 추적하고, 저장 기간을 정책으로 제한하면 대응이 쉬워진다.",
    },
    {
      id: "tools_i3",
      difficulty: "intermediate",
      title: "팀별 AI 사용량과 비용을 통제하려면 무엇이 필요한가?",
      options: ["쿼터·모니터링 대시보드·알림", "무제한 허용", "과금 알림 끄기"],
      correct: 0,
      desc: "사용량을 가시화하고 한도를 정해야 남용을 막는다.",
      enemyType: "legacy_tool",
      concept: "사용량 거버넌스",
      whyCorrect:
        "팀/프로젝트 단위 쿼터와 실시간 모니터링을 두면 예산을 예측하고 남용을 막을 수 있다. 예를 들어 월 10만 토큰 초과 시 슬랙 알림을 보내면 조기 대응이 가능하다.",
      whyWrong: {
        1: "무제한 허용은 편하지만 예산 초과나 오남용을 놓치기 쉽습니다. 통제가 어려워져요.",
        2: "알림을 끄면 조기 신호를 놓쳐 뒤늦게 대응하게 될 수 있습니다.",
      },
      realWorldTip: "대시보드에 단가와 예산 대비 사용률을 함께 표시하면 경영진 보고 자료로도 바로 쓸 수 있다.",
    },
    {
      id: "tools_a1",
      difficulty: "advanced",
      title: "검색+생성 파이프라인을 모니터링할 때 핵심 지표는?",
      options: ["성공률·지연·매칭률", "GPU 사용량만", "토큰 길이만"],
      correct: 0,
      desc: "품질과 속도를 함께 봐야 이상을 잡는다.",
      enemyType: "singularity_eye",
      concept: "엔드투엔드 관측성",
      whyCorrect:
        "응답 성공률, 지연, 검색 매칭률을 함께 봐야 어디서 문제가 생겼는지 빠르게 찾을 수 있다. 예를 들어 매칭률이 떨어지면 인덱스 문제를, 지연이 늘면 모델/네트워크를 의심한다.",
      whyWrong: {
        1: "GPU 사용량은 인프라 상태만 보여줘서 품질 이슈를 파악하기 어렵습니다. 전체 흐름을 함께 봐야 해요.",
        2: "토큰 길이는 비용 감지에는 좋지만 실패나 지연 원인과 직접 연결되지 않습니다.",
      },
      realWorldTip: "로그에 쿼리-ID별 검색 결과와 생성 결과를 함께 남기고 대시보드로 묶으면 RCA가 빨라진다.",
    },
    {
      id: "tools_a2",
      difficulty: "advanced",
      title: "온프레 모델을 선택해야 하는 대표 이유는?",
      options: ["데이터 통제/보안 요구가 높을 때", "배경음 설정을 바꾸고 싶을 때", "폰트 변경 필요"],
      correct: 0,
      desc: "보안과 규제 요구가 높으면 온프레가 필요하다.",
      enemyType: "security_bot",
      concept: "배포 아키텍처 판단",
      whyCorrect:
        "민감 데이터나 규제 산업에서는 데이터 경로를 직접 통제해야 하므로 온프레 또는 VPC 배포가 적합하다. 예를 들어 의료 기록을 처리할 때는 내부망 모델이 요구된다.",
      whyWrong: {
        1: "배경음은 사용자 경험 요소라 보안·통제 요건을 결정하는 기준이 되기 어렵습니다.",
        2: "폰트 변경도 비주얼 요소라 배포 방식 선택과 직접 관련이 없어요. 보안 요구가 우선입니다.",
      },
      realWorldTip: "온프레를 선택했다면 키 관리, 접근 제어, 로깅까지 포함한 운영 계획을 동시에 세워야 한다.",
    },
  ],
  ethics: [
    {
      id: "ethics_b1",
      difficulty: "beginner",
      title: "개인정보가 포함된 자료를 AI에 넣기 전 해야 할 일은?",
      options: ["비식별화·최소화", "그대로 업로드", "지인에게 전달"],
      correct: 0,
      desc: "민감 정보는 최소한으로 가리고 넣어야 한다.",
      enemyType: "security_bot",
      concept: "개인정보 보호",
      whyCorrect:
        "이름, 연락처, 계좌 등은 가명처리하거나 제거해야 유출 위험을 줄일 수 있다. 예를 들어 티켓 로그에 고객 이메일을 `***@domain.com`으로 바꾸고 업로드한다.",
      whyWrong: {
        1: "원본을 그대로 올리면 편하지만 규제 위반과 유출 위험이 커요. 한 번 새면 돌이키기 어렵습니다.",
        2: "지인에게 공유하면 도움을 받을 것 같지만 노출 범위가 넓어지고 책임이 모호해질 수 있습니다.",
      },
      realWorldTip: "민감 필드를 자동 탐지·마스킹하는 전처리 스크립트를 만들어 워크플로에 넣어라.",
    },
    {
      id: "ethics_b2",
      difficulty: "beginner",
      title: "AI 생성물을 외부에 배포할 때 필요한 안내는?",
      options: ["AI 생성 여부와 검증 필요성을 명시", "모델 이름만 표기", "아무 안내 없음"],
      correct: 0,
      desc: "출처와 검증 필요성을 알려야 책임 있는 배포다.",
      enemyType: "security_bot",
      concept: "출처 투명성",
      whyCorrect:
        "AI가 작성했다는 점과 사람이 검수했는지 여부를 알려야 오해를 줄일 수 있다. 예를 들어 'AI 초안 기반, 2024-12-01 검수 완료'라고 표시한다.",
      whyWrong: {
        1: "모델 이름만 적으면 정보는 있지만 검증 여부를 알 수 없어요. 책임 범위가 흐려집니다.",
        2: "안내 없이 배포하면 사용자가 완전한 사실로 믿을 수 있어요. 오해를 막으려면 출처를 알려주세요.",
      },
      realWorldTip: "템플릿 하단에 'AI 생성 초안, 사실 검증 필요 시 연락' 같은 고지를 기본값으로 넣어라.",
    },
    {
      id: "ethics_b3",
      difficulty: "beginner",
      title: "AI 결과를 검수 없이 고객에게 바로 전달할 때 가장 큰 위험은?",
      options: ["사실 오류·편향 노출", "배경색 깨짐", "폰트 깨짐"],
      correct: 0,
      desc: "검수 없이는 오류와 편향이 그대로 전달된다.",
      enemyType: "security_bot",
      concept: "검수 필요성",
      whyCorrect:
        "모델이 생성한 잘못된 수치나 편향 표현이 그대로 나가면 신뢰와 법적 리스크를 모두 잃는다. 예를 들어 잘못된 견적을 보내면 계약 분쟁이 발생할 수 있다.",
      whyWrong: {
        1: "배경색 깨짐은 거슬릴 수 있지만 핵심 리스크는 아니에요. 내용 검증이 우선입니다.",
        2: "폰트 깨짐도 가독성 문제라 비즈니스 영향은 적어요. 사실성과 편향을 먼저 봐야 합니다.",
      },
      realWorldTip: "고객용 응답은 최소 1단계 사람 검수를 거치고, 승인 흔적을 남겨 책임소재를 명확히 하라.",
    },
    {
      id: "ethics_i1",
      difficulty: "intermediate",
      title: "고위험 업무에서 휴먼 인더 루프가 필요한 이유는?",
      options: ["오류·편향을 사람이 최종 제어", "비용 증가", "속도 저하"],
      correct: 0,
      desc: "사람 검수가 고위험 도메인에서 안전망 역할을 한다.",
      enemyType: "security_bot",
      concept: "휴먼 인더 루프",
      whyCorrect:
        "법률, 의료, 금융처럼 오류 비용이 큰 영역은 사람이 최종 검토해야 한다. 예를 들어 약관 변경 안내는 법무가 승인해야 규제 위반을 막을 수 있다.",
      whyWrong: {
        1: "비용이 늘어 보여 망설여질 수 있지만, 사고 비용을 생각하면 필요한 투자예요.",
        2: "속도가 느려질까 걱정되지만, 고위험 영역은 안전이 더 우선입니다. 사람 검토로 큰 사고를 막을 수 있어요.",
      },
      realWorldTip: "위험도에 따라 자동/검토/거부 세 가지 경로를 정의하고, 검토 과정과 승인자를 로깅하라.",
    },
    {
      id: "ethics_i2",
      difficulty: "intermediate",
      title: "저작권 리스크를 줄이기 위한 프로세스는?",
      options: ["금지 키워드 정책과 출처 필터링 적용", "즉시 외부 공개", "모델만 교체"],
      correct: 0,
      desc: "정책과 필터로 금지 요소를 걸러야 한다.",
      enemyType: "security_bot",
      concept: "저작권 통제",
      whyCorrect:
        "금지된 캐릭터·브랜드를 차단하고, 인용 시 출처를 요구해야 저작권 분쟁을 줄인다. 예를 들어 이미지 생성 프롬프트에 금지어 리스트를 두고 필터링한다.",
      whyWrong: {
        1: "검토 없이 공개하면 빠르지만 보호된 콘텐츠가 섞일 위험이 있어요. 사후 대응이 더 어려워집니다.",
        2: "모델을 바꿔도 정책이 없으면 같은 문제가 반복될 수 있어요. 절차가 안전망을 만듭니다.",
      },
      realWorldTip: "출시 전 AI 산출물에 대해 자동 금지어 스캔과 사람이 한 번 보는 게이트를 만들라.",
    },
    {
      id: "ethics_i3",
      difficulty: "intermediate",
      title: "로그에 민감 정보가 남지 않게 하려면?",
      options: ["수집/저장 단계에서 마스킹하고 보존 기간을 설정", "무제한 저장", "압축만 하기"],
      correct: 0,
      desc: "수집 시점 마스킹과 보존 정책이 핵심이다.",
      enemyType: "security_bot",
      concept: "로그 거버넌스",
      whyCorrect:
        "수집 단계에서 마스킹하고, 30/90일 등 보존 기간을 지정해야 규제에 대응할 수 있다. 예를 들어 PII 필드는 저장 전에 hash나 삭제 처리한다.",
      whyWrong: {
        1: "무제한 저장은 편하지만 오래될수록 유출·규제 리스크가 커집니다. 만료 정책이 필요해요.",
        2: "압축은 공간만 절약할 뿐, 민감 데이터는 그대로 남아 위험을 줄이지 못합니다.",
      },
      realWorldTip: "로그 파이프라인에 PII 탐지기를 두고, 만료 시 자동 삭제하는 작업을 크론으로 돌려라.",
    },
    {
      id: "ethics_a1",
      difficulty: "advanced",
      title: "설명 가능성을 높이기 위한 설계는?",
      options: ["근거와 추론 경로를 함께 노출", "속도만 높이기", "UI를 화려하게 개편"],
      correct: 0,
      desc: "근거를 노출해야 설명 가능성이 확보된다.",
      enemyType: "singularity_eye",
      concept: "설명 가능성",
      whyCorrect:
        "출처 문서, 사용한 데이터 포인트, 추론 단계를 보여주면 검증과 감사가 가능하다. 예를 들어 답변 옆에 인용 문서를 링크하면 고객이 직접 확인할 수 있다.",
      whyWrong: {
        1: "속도를 높이면 편하지만 근거가 없으면 왜 그 답이 나왔는지 설명하기 어려워요.",
        2: "UI를 멋지게 꾸며도 근거가 없다면 투명성이 올라가지 않습니다. 내용이 먼저입니다.",
      },
      realWorldTip: "답변 객체에 출처 배열을 포함하도록 스키마를 정의하면 다양한 인터페이스에서도 근거 노출을 유지할 수 있다.",
    },
    {
      id: "ethics_a2",
      difficulty: "advanced",
      title: "규제 산업에서 AI를 쓸 때 추가로 필요한 통제는?",
      options: ["감사 로그·접근 통제·모델 한계 공개", "무제한 접근 허용", "모델 이름 비공개"],
      correct: 0,
      desc: "감사와 통제가 있어야 규제 요구를 충족한다.",
      enemyType: "security_bot",
      concept: "규제 대응 거버넌스",
      whyCorrect:
        "누가 언제 무엇을 조회/생성했는지 기록하고, 접근 권한을 최소화하며, 모델 한계를 공개해야 규제 감사에 대응할 수 있다. 예를 들어 금융 챗봇은 로그와 알림을 모두 남겨야 한다.",
      whyWrong: {
        1: "무제한 접근은 편하지만 민감 정보가 과도하게 퍼질 수 있어요. 최소 권한이 안전합니다.",
        2: "모델 이름을 숨기면 조용해 보이지만 한계를 알리지 않으면 오해가 생길 수 있어요. 투명하게 안내하는 편이 안전합니다.",
      },
      realWorldTip: "규제 대상 기능에는 별도 감사 테이블과 접근 알림을 붙여 추후 조사 시 증빙을 확보하라.",
    },
  ],
  advanced: [
    {
      id: "adv_b1",
      difficulty: "beginner",
      title: "캐싱을 설계할 때 기본적으로 포함해야 할 키는?",
      options: ["입력 내용과 사용자 권한 정보", "프롬프트 문자열만", "캐시를 아예 쓰지 않기"],
      correct: 0,
      desc: "입력과 권한이 달라지면 다른 답을 반환해야 한다.",
      enemyType: "singularity_eye",
      concept: "캐시 키 설계",
      whyCorrect:
        "사용자 권한이나 조직 정보가 다르면 같은 질문도 다른 답이어야 하므로 키에 포함해야 한다. 예를 들어 조직 ID를 키에 넣으면 권한 외 문서를 캐시에서 잘못 제공하지 않는다.",
      whyWrong: {
        1: "프롬프트만 키로 쓰면 편하지만 권한 차이를 구분하지 못해 잘못된 정보가 노출될 수 있어요.",
        2: "캐시를 아예 안 쓰면 단순하지만 비용과 지연이 커져 서비스 품질이 흔들릴 수 있습니다.",
      },
      realWorldTip: "키를 해시(입력+사용자ID+권한) 형태로 표준화하고 TTL을 업무 중요도에 따라 다르게 두어라.",
    },
    {
      id: "adv_b2",
      difficulty: "beginner",
      title: "평가 세트를 만들 때 가장 신뢰도 높은 소스는?",
      options: ["실사용 쿼리 기반 시나리오", "모델이 만든 질문", "임의 문장 모음"],
      correct: 0,
      desc: "실사용 기반 평가가 실제 성능을 보여준다.",
      enemyType: "singularity_eye",
      concept: "현실성 있는 평가",
      whyCorrect:
        "운영 중 발생한 질문/티켓을 기반으로 시나리오를 만들어야 점수가 실제 사용자 경험과 연결된다. 예를 들어 지난 분기 고객 질문 100개를 클린한 뒤 평가 세트로 쓴다.",
      whyWrong: {
        1: "모델이 만든 질문은 깔끔해 보여도 실제 현장과 다를 수 있어요. 성능이 과대평가될 수 있습니다.",
        2: "임의 문장은 만들기 쉽지만 실제 난이도나 패턴을 반영하지 못해요. 현실성을 잃을 수 있습니다.",
      },
      realWorldTip: "운영 로그에서 자주 틀린 케이스를 태깅해 벤치마크로 만들면 개선 효과를 숫자로 증명하기 쉽다.",
    },
    {
      id: "adv_b3",
      difficulty: "beginner",
      title: "멀티샷 프롬프트 비용을 줄이는 방법은?",
      options: ["예시를 검색 후 주입하는 Retrieval-Augmented Prompting", "예시를 무한히 추가해 운에 맡기기", "모델을 무조건 다운그레이드"],
      correct: 0,
      desc: "필요할 때만 예시를 불러와 비용을 줄인다.",
      enemyType: "singularity_eye",
      concept: "예시 검색 주입",
      whyCorrect:
        "필요한 예시만 검색해 넣으면 토큰을 줄이면서도 품질을 유지한다. 예를 들어 비슷한 과거 티켓 3개만 불러와 답변을 생성하면 비용과 편차를 동시에 줄인다.",
      whyWrong: {
        1: "예시를 많이 넣으면 든든해 보이지만 비용이 늘고 컨텍스트가 넘칠 수 있어요.",
        2: "모델을 낮추면 비용은 줄지만 품질 저하를 막기 어렵습니다. 다른 보완책이 필요해요.",
      },
      realWorldTip: "과거 사례를 벡터 DB에 넣고, 질의와 유사한 예시 2~3개만 주입하도록 파이프라인을 설계하라.",
    },
    {
      id: "adv_i1",
      difficulty: "intermediate",
      title: "에이전트 워크플로가 무한 루프에 빠질 때 필요한 안전장치는?",
      options: ["스텝 제한·종료 조건·예산 한도", "온도 조정", "모델 교체"],
      correct: 0,
      desc: "루프 방지 조건을 명시해야 비용 폭주를 막는다.",
      enemyType: "singularity_eye",
      concept: "에이전트 가드레일",
      whyCorrect:
        "최대 스텝 수, 실패 횟수, 비용 한도를 정하면 비정상 루프를 끊을 수 있다. 예를 들어 8스텝 초과 시 중단하고 에러를 반환하도록 한다.",
      whyWrong: {
        1: "온도를 조정하면 성향은 바뀌지만 루프를 막는 안전장치는 아니에요. 종료 조건이 별도로 필요합니다.",
        2: "모델을 바꾸면 새로워 보이지만 같은 설계라면 똑같이 루프에 빠질 수 있어요.",
      },
      realWorldTip: "각 스텝 로그와 사용 토큰을 기록해 경보를 걸면 현장에서 루프를 빠르게 탐지할 수 있다.",
    },
    {
      id: "adv_i2",
      difficulty: "intermediate",
      title: "지식이 오래된 모델을 보완하는 실용적 방법은?",
      options: ["검색 후 최신 정보를 주입해 답변", "온도 조정", "폰트 변경"],
      correct: 0,
      desc: "검색과 주입으로 최신성을 확보한다.",
      enemyType: "singularity_eye",
      concept: "지식 보강",
      whyCorrect:
        "검색 결과나 최신 문서를 함께 넣으면 오래된 모델도 최신 상황을 반영할 수 있다. 예를 들어 신규 가격표를 검색해 함께 전달하면 잘못된 가격 안내를 막는다.",
      whyWrong: {
        1: "온도 조정은 스타일을 바꾸지만 지식 자체를 새로 넣어주지는 않아요.",
        2: "폰트를 바꾸면 보기만 달라지고 정보는 그대로라 최신성 문제를 해결하지 못합니다.",
      },
      realWorldTip: "업데이트가 잦은 데이터는 주기적으로 검색/주입하는 미들웨어를 두고, 실패 시 경고를 보내라.",
    },
    {
      id: "adv_i3",
      difficulty: "intermediate",
      title: "프롬프트가 길어질 때 주요 위험은?",
      options: ["비용 상승과 앞부분 컨텍스트 소실", "색상 문제", "폰트 문제"],
      correct: 0,
      desc: "긴 프롬프트는 비용과 성능을 동시에 악화시킬 수 있다.",
      enemyType: "singularity_eye",
      concept: "컨텍스트 관리",
      whyCorrect:
        "길이가 길면 토큰 비용이 늘고, 컨텍스트 윈도우 한계로 앞부분이 잘릴 수 있다. 예를 들어 200k 토큰 모델도 긴 히스토리에서 초기 규칙이 무시될 수 있다.",
      whyWrong: {
        1: "색상은 UI 요소라 컨텍스트 관리와는 관련이 없어요. 길이와 비용을 먼저 챙겨야 합니다.",
        2: "폰트도 가독성 요소라 컨텍스트 유지 문제를 해결하지 못합니다.",
      },
      realWorldTip: "지침은 짧게, 예시는 검색 주입으로 필요한 만큼만 넣어 컨텍스트를 관리하라.",
    },
    {
      id: "adv_a1",
      difficulty: "advanced",
      title: "프롬프트 인젝션을 막기 위한 핵심 조치는?",
      options: ["시스템 프롬프트 고정과 입력 검증/필터링", "색상 변경", "폰트 변경"],
      correct: 0,
      desc: "시스템 지시 고정과 입력 필터가 있어야 인젝션을 막는다.",
      enemyType: "security_bot",
      concept: "프롬프트 보안",
      whyCorrect:
        "시스템 지시를 코드에서 고정하고, 사용자 입력에서 위험 패턴을 필터링해야 우회 지시를 차단할 수 있다. 예를 들어 '이전 지시 무시' 같은 문구를 탐지해 거부한다.",
      whyWrong: {
        1: "색상 변경은 시각 요소라 보안에 직접 영향을 주지 않아요.",
        2: "폰트 변경도 표현만 바꾸어 보안 효과는 없습니다.",
      },
      realWorldTip: "입력 필터, 컨텍스트 분리, 정적 시스템 프롬프트를 함께 적용하고, 탐지 로그를 남겨 패턴을 업데이트하라.",
    },
    {
      id: "adv_a2",
      difficulty: "advanced",
      title: "LLM 서빙 SLA를 지키기 위한 기술적 조합은?",
      options: ["오토스케일·캐시·폴백 전략", "테마 변경", "폰트 변경"],
      correct: 0,
      desc: "스케일링과 캐시, 폴백이 있어야 지연/장애를 관리한다.",
      enemyType: "singularity_eye",
      concept: "신뢰성 엔지니어링",
      whyCorrect:
        "부하에 따라 자동 확장하고, 자주 쓰는 응답을 캐시하며, 실패 시 더 작은 모델이나 템플릿 응답으로 폴백해야 한다. 예를 들어 API 장애 시 FAQ 캐시로 응답하면 SLA를 지킨다.",
      whyWrong: {
        1: "테마를 바꾸면 보기 좋지만 성능이나 가용성을 직접 개선하지는 않아요.",
        2: "폰트 변경은 가독성은 돕지만 SLA를 지키는 데는 영향이 적습니다. 인프라 조치가 더 효과적입니다.",
      },
      realWorldTip: "임계 지연과 에러율에 대한 경보를 설정하고, 폴백 플로우를 주기적으로 DR 리허설처럼 테스트하라.",
    },
  ],
};

function fillPlaceholders(text, meta) {
  if (!text) return "";
  return text
    .replace(/{ROLE}/g, meta.label)
    .replace(/{DOMAIN}/g, meta.domain)
    .replace(/{ASSET}/g, meta.asset)
    .replace(/{DATA}/g, meta.data || meta.domain);
}

function softenWhyWrong(text) {
  if (!text) return "";
  return `이 선택을 하신 이유가 충분히 이해돼요. ${text} 다음에는 핵심만 챙기면 금방 더 좋아질 거예요.`;
}

function buildRoleQuestions(roleKey, meta) {
  const roleSet = {};
  Object.entries(BASE_TEMPLATES).forEach(([cat, list]) => {
    roleSet[cat] = { beginner: [], intermediate: [], advanced: [] };
    list.forEach((tpl) => {
      const item = {
        id: `${roleKey}_${tpl.id}`,
        category: cat,
        title: fillPlaceholders(tpl.title, meta),
        options: tpl.options.map((o) => fillPlaceholders(o, meta)),
        correct: tpl.correct,
        desc: fillPlaceholders(tpl.desc, meta),
        enemyType: tpl.enemyType,
        exp: EXP_BY_LEVEL[tpl.difficulty],
        difficulty: tpl.difficulty,
        concept: fillPlaceholders(tpl.concept, meta),
        whyCorrect: fillPlaceholders(tpl.whyCorrect, meta),
        whyWrong: {
          1: softenWhyWrong(fillPlaceholders(tpl.whyWrong[1], meta)),
          2: softenWhyWrong(fillPlaceholders(tpl.whyWrong[2], meta)),
        },
        realWorldTip: fillPlaceholders(tpl.realWorldTip, meta),
      };
      if (roleSet[cat][tpl.difficulty].length < (CATEGORY_LIMIT[tpl.difficulty] || 0)) {
        roleSet[cat][tpl.difficulty].push(item);
      }
    });
  });
  return roleSet;
}

const EXTENDED_QUESTIONS = Object.fromEntries(
  Object.entries(ROLE_META).map(([roleKey, meta]) => [roleKey, buildRoleQuestions(roleKey, meta)])
);

function getQuestionStats() {
  const stats = {
    total: 0,
    byRole: {},
    byCategory: {},
    byDifficulty: { beginner: 0, intermediate: 0, advanced: 0 },
  };

  Object.entries(EXTENDED_QUESTIONS).forEach(([role, roleSet]) => {
    let roleCount = 0;
    Object.entries(roleSet).forEach(([cat, levels]) => {
      Object.entries(levels).forEach(([lvl, arr]) => {
        const c = arr.length;
        roleCount += c;
        stats.byDifficulty[lvl] += c;
        stats.byCategory[cat] = (stats.byCategory[cat] || 0) + c;
      });
    });
    stats.byRole[role] = roleCount;
    stats.total += roleCount;
  });
  return stats;
}

console.log("Question Database Stats:", getQuestionStats());

if (typeof window !== "undefined") {
  window.EXTENDED_QUESTIONS = EXTENDED_QUESTIONS;
}

if (typeof module !== "undefined") {
  module.exports = {
    EXTENDED_QUESTIONS,
    buildRoleQuestions,
    ROLE_META,
    BASE_TEMPLATES,
  };
}
