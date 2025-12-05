// 직무별 확장 문제 데이터 (각 직무 40문항)
const ROLE_META = {
  "developer": {
    "label": "개발자",
    "domain": "코드/서비스",
    "asset": "API 명세·테스트 코드",
    "data": "에러 로그·요구사항"
  },
  "marketer": {
    "label": "마케터",
    "domain": "캠페인/콘텐츠",
    "asset": "카피·랜딩·광고 소재",
    "data": "페르소나·성과 데이터"
  },
  "sales": {
    "label": "영업",
    "domain": "제안/계약",
    "asset": "제안서·견적·영업 이메일",
    "data": "고객 요구·CRM 히스토리"
  },
  "cs": {
    "label": "CS",
    "domain": "티켓/FAQ",
    "asset": "응대 스크립트·매뉴얼",
    "data": "티켓 로그·제품 변경사항"
  },
  "designer": {
    "label": "디자이너",
    "domain": "디자인/브랜드",
    "asset": "와이어프레임·시안·디자인 시스템",
    "data": "요구사항·브랜드 가이드·리뷰"
  },
  "general": {
    "label": "일반",
    "domain": "업무/학습",
    "asset": "보고서·메모·계획",
    "data": "회의록·참고 자료"
  }
};

const EXP_BY_LEVEL = undefined;
const CATEGORY_LIMIT = undefined;

// 개발자 직무 40문항
const DEV_QUESTIONS = {
  "practical": {
    "beginner": [
      {
        "id": "developer_practical_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "재현 안 되는 500 오류를 AI에 줄 때 꼭 넣을 정보는?",
        "options": [
          "팀장 연락처와 팀 분위기",
          "요청 경로·입력값·발생 시각·스택트레이스",
          "서비스 소개 페이지 링크"
        ],
        "correct": 1,
        "desc": "재현 단서와 오류 위치가 함께 있어야 AI가 원인을 좁힌다.",
        "enemyType": "bug",
        "concept": "로그 공유 맥락",
        "whyCorrect": "요청 경로, 입력값, 시각, 스택이 있으면 AI가 환경과 흐름을 추정해 원인 후보를 빠르게 정리한다. 예를 들어 'POST /orders, body {...}, 2024-12-05 10:10 KST, NullPointer at OrderService'라고 주면 캐싱 문제인지 데이터 유효성 문제인지 바로 가설을 세운다. 이런 정보가 없으면 엉뚱한 재현 시나리오를 만들 가능성이 높다. 최소 단서를 주면 디버깅 시간을 단축할 수 있다.",
        "whyWrong": {
          "0": "팀 분위기는 중요하지만 오류 원인을 찾는 단서가 되진 않아요. 재현 정보가 없으면 AI가 추측만 하게 됩니다.",
          "2": "소개 링크만으로는 호출 맥락을 알 수 없어 엉뚱한 답을 줄 수 있어요. 실제 요청 정보가 먼저 필요합니다."
        },
        "realWorldTip": "스택과 입력값을 붙일 땐 개인정보를 마스킹하고, 타임존도 명시하면 타임아웃/스케줄 오류를 더 빨리 찾는다.",
        "skill": "context-giving",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "실무활용",
          "디버깅"
        ]
      },
      {
        "id": "developer_practical_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "신규 POST /payments API 초안을 AI에게 맡길 때 첫 지시는?",
        "options": [
          "UI 테마를 예쁘게 정해달라고 한다",
          "요구사항·에러 케이스·성능·검증 조건을 불릿으로 준다",
          "모든 옵션은 AI가 자유롭게 상상하게 둔다"
        ],
        "correct": 1,
        "desc": "요구사항과 실패 케이스를 명시해야 초안이 실전에 가깝다.",
        "enemyType": "glitch",
        "concept": "API 설계 요구사항",
        "whyCorrect": "성공/실패 응답 형식, 필수 필드, 허용 지연, 검증 조건을 명확히 주면 AI가 바로 명세 형태로 초안을 만든다. 예를 들어 '카드 결제, 실패 시 재시도 2회, 200ms 목표, 422 스키마 포함'을 주면 샘플 코드와 에러 모델까지 채워준다. 반대로 빈칸으로 두면 모호한 상태 코드를 제안해 다시 수정해야 한다. 처음부터 제약을 주면 재작업을 줄일 수 있다.",
        "whyWrong": {
          "0": "테마는 API 동작과 무관해요. 기능 요구를 먼저 잡아야 합니다.",
          "2": "상상에 맡기면 팀 규약이나 보안 정책을 어길 수 있어요. 제약을 주는 게 더 안전합니다."
        },
        "realWorldTip": "엔드포인트마다 성공/실패 예제 JSON 2개씩 붙여서 AI에 주면 코드샌드박스 없이도 명세 검수가 빨라진다.",
        "skill": "result-validation",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "실무활용",
          "디버깅"
        ]
      },
      {
        "id": "developer_practical_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "실패한 테스트 로그로 핫픽스를 AI에 요청할 때 최선의 방식은?",
        "options": [
          "리포 전체를 압축해 전달한다",
          "어디가 문제인지 추측해서 고쳐달라고만 한다",
          "실패 테스트 이름·입력값·기대/실제 결과·관련 파일 경로를 준다"
        ],
        "correct": 2,
        "desc": "실패 지점과 기대 값이 있어야 최소 수정 diff를 제안할 수 있다.",
        "enemyType": "worm",
        "concept": "테스트 기반 핫픽스",
        "whyCorrect": "테스트 이름과 입력, 기대/실제 결과, 해당 파일 경로를 주면 AI가 영향 범위를 좁혀 패치를 제안한다. 예를 들어 'should cap retry at 3, got 5, file: retry.ts'라고 주면 조건문 위치를 바로 찾는다. 전체 리포를 던지는 것보다 작은 문맥이 성능도 좋고 안전하다. 추측만 요청하면 동작이 깨지는 큰 수정이 나올 수 있다.",
        "whyWrong": {
          "0": "압축본은 모델 입력 한도를 금방 넘기고, 불필요한 코드까지 포함돼 분석이 느려요.",
          "1": "추측만 하면 실제 실패 경로와 동떨어진 수정을 제안할 수 있어요. 재현 정보가 우선입니다."
        },
        "realWorldTip": "패치 제안이 오면 즉시 테스트를 재실행하도록 스크립트를 붙여 두면 핫픽스 왕복 시간이 크게 줄어든다.",
        "skill": "result-validation",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "실무활용",
          "디버깅"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "developer_practical_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "느려진 SQL 호출을 AI로 개선할 때 먼저 시킬 작업은?",
        "options": [
          "실측 쿼리 플랜·슬로쿼리 로그·샘플 데이터 분포를 제공한다",
          "DBA 연락처를 공유한다",
          "UI 색상 가이드를 준다"
        ],
        "correct": 0,
        "desc": "실측 플랜과 데이터 분포를 알아야 정확한 튜닝 제안이 가능하다.",
        "enemyType": "bug",
        "concept": "성능 진단 맥락",
        "whyCorrect": "실행 계획과 인덱스 사용 여부, 샘플 데이터 분포를 주면 AI가 불필요한 풀스캔이나 조인 순서를 바로 짚는다. 예를 들어 'nested loop cost 150k, idx_orders_user missing' 같은 정보를 주면 인덱스 추가 vs 캐시 전략을 비교해준다. 단순 추측보다 튜닝 실효성이 높아지고 회귀 위험도 줄어든다. 데이터 분포를 모르면 과도한 인덱스 제안이 나올 수 있다.",
        "whyWrong": {
          "1": "연락처는 문제 해결에 직결되지 않아요. 기술적 단서를 먼저 주세요.",
          "2": "색상 가이드는 UI 작업에만 필요합니다. 성능 튜닝엔 로그가 우선입니다."
        },
        "realWorldTip": "슬로쿼리 탑 N과 explain analyze 결과를 함께 주면 AI가 비용 대비 효과가 큰 1~2개 조치를 추천한다.",
        "skill": "context-giving",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "실무활용",
          "디버깅"
        ]
      },
      {
        "id": "developer_practical_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "API 변경이 계약을 깨지 않는지 AI로 검증시키려면?",
        "options": [
          "명세 대비 변경 diff를 주고 계약 테스트 목록을 뽑게 한다",
          "README 제목을 바꿔달라고 한다",
          "CSS를 난독화해본다"
        ],
        "correct": 0,
        "desc": "명세-변경 diff를 기준으로 테스트 케이스를 뽑아야 회귀를 막는다.",
        "enemyType": "virus",
        "concept": "계약 테스트 설계",
        "whyCorrect": "변경된 필드, 상태 코드, 비즈니스 규칙을 diff로 주면 AI가 깨질 수 있는 시나리오를 계약 테스트 목록으로 만들어준다. 예를 들어 'status 201→202, 필수 필드 추가'라고 주면 구버전 클라이언트가 실패할 경로를 알려준다. README 변경만으론 위험 구간을 알 수 없다. 계약 테스트를 먼저 세우면 배포 전 알파 클라이언트로 빠르게 검증할 수 있다.",
        "whyWrong": {
          "1": "README 제목은 동작에 영향을 주지 않아 회귀를 잡을 수 없어요.",
          "2": "CSS 난독화는 전혀 관련이 없습니다. API 동작을 검증하는 테스트가 필요합니다."
        },
        "realWorldTip": "AI가 뽑은 계약 테스트는 Postman/브라우저 자동화보다 먼저 CI에 넣어 퀵 체크를 돌리면 비용 대비 효과가 크다.",
        "skill": "result-validation",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "개발",
          "실무활용",
          "기획설계"
        ]
      },
      {
        "id": "developer_practical_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "레거시 함수를 AI로 쪼갤 때 안전하게 하는 방법은?",
        "options": [
          "전체 코드를 새로 쓰게 한다",
          "기존 입출력 예시와 단위테스트 유지 조건을 함께 준다",
          "주석을 모두 제거하고 맡긴다"
        ],
        "correct": 1,
        "desc": "입출력 계약과 테스트를 제시해야 리팩터링 후 동작을 유지한다.",
        "enemyType": "trojan",
        "concept": "리팩터링 가드레일",
        "whyCorrect": "I/O 예시와 통과해야 할 테스트를 명확히 주면 AI가 내부를 쪼개더라도 외부 계약을 깨지 않는다. 예를 들어 'input A→B, edge case null 처리 유지'를 주면 해당 경로를 잃지 않도록 함수 분리를 제안한다. 코드 전체를 새로 쓰게 하면 버그가 스며들기 쉽다. 주석 제거만 하면 요구사항까지 잃어버려 위험하다.",
        "whyWrong": {
          "0": "새로 쓰면 테스트 없이 회귀가 생기기 쉽고 리뷰 비용이 커집니다.",
          "2": "주석 제거는 맥락 손실로 이어져 버그 가능성을 높여요. 오히려 예제를 더 줘야 합니다."
        },
        "realWorldTip": "AI 리팩터링 후 기존 테스트를 즉시 돌리고, 실패 케이스를 다시 입력해 추가 테스트로 고정하면 품질이 올라간다.",
        "skill": "result-validation",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "실무활용",
          "디버깅"
        ]
      }
    ],
    "advanced": [
      {
        "id": "developer_practical_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "위험한 배포 직전 AI를 가장 실용적으로 쓰는 방법은?",
        "options": [
          "배포 공지 문구를 더 화려하게 만든다",
          "신규 기능 이름을 더 멋지게 짓는다",
          "롤백·피처플래그·모니터링 항목을 포함한 배포 체크리스트를 작성시킨다"
        ],
        "correct": 2,
        "desc": "배포 전 체크리스트를 구조화하면 위험을 빠르게 줄인다.",
        "enemyType": "virus",
        "concept": "릴리즈 가드레일",
        "whyCorrect": "롤백 절차, 플래그 토글 조건, 메트릭 경보 기준을 포함한 리스트를 AI로 작성하면 빠뜨린 위험을 줄일 수 있다. 예를 들어 '에러율 2배 시 플래그 오프, DB 마이그레이션 롤백 커맨드'를 적어두면 야간 대응이 쉬워진다. 공지나 네이밍보다 리스크 관리 항목이 실전 영향이 크다. AI가 빠르게 포맷을 만들어주면 팀 합의가 빨라진다.",
        "whyWrong": {
          "0": "공지 문구는 사용자 커뮤니케이션에만 영향을 주고 장애 예방엔 도움이 적어요.",
          "1": "네이밍 개선도 중요하지만 즉시 위험을 낮추지는 못해요. 체크리스트가 우선입니다."
        },
        "realWorldTip": "체크리스트를 Confluence/Notion 템플릿으로 고정해두고, 배포 때마다 AI로 최신 값만 채우게 하면 준비 시간이 단축된다.",
        "skill": "result-validation",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "실무활용",
          "디버깅"
        ]
      },
      {
        "id": "developer_practical_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "장애 재발 방지 RCA 초안을 AI에게 맡길 때 포함해야 할 것?",
        "options": [
          "타임라인·근본 원인·재발 방지 액션을 구조화해 달라고 한다",
          "누가 실수했는지 이름을 찾게 한다",
          "재미있는 밈 이미지를 넣게 한다"
        ],
        "correct": 0,
        "desc": "RCA는 사실 타임라인과 원인-대책을 분리해 적어야 한다.",
        "enemyType": "bug",
        "concept": "RCA 구조화",
        "whyCorrect": "발생-감지-대응-해결 타임라인과 근본 원인, 재발 방지 액션을 표로 만들게 하면 빠르게 합의할 수 있다. 예를 들어 '알람 미설정→감지 지연→플래그 미제한'을 분리해 적으면 각 액션 오너를 정하기 쉽다. 사람을 지목하는 것보다 시스템적 대책에 집중해야 개선이 이루어진다. 밈이나 장식은 회고에 방해가 된다.",
        "whyWrong": {
          "1": "사람을 찾는 것에 집중하면 구조적 대책이 묻혀요. RCA는 시스템 개선이 목적입니다.",
          "2": "밈 추가는 분위기를 풀 수 있지만 문제 해결엔 도움이 되지 않습니다."
        },
        "realWorldTip": "RCA 초안을 AI로 만든 뒤 액션 소유자와 기한을 표에 바로 넣어 슬랙/이메일에 공유하면 후속 관리가 쉬워진다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "개발",
          "실무활용",
          "커뮤니케이션"
        ]
      }
    ]
  },
  "prompt": {
    "beginner": [
      {
        "id": "developer_prompt_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "오류 로그 해석을 AI에 요청할 때 핵심 프롬프트는?",
        "options": [
          "스택·상황·최근 변경점을 불릿으로 주고 원인 후보 3개를 달라고 한다",
          "감정 표현을 풍부하게 써달라고 한다",
          "짧게 아무 말이나 답하라고 한다"
        ],
        "correct": 0,
        "desc": "맥락과 기대 출력을 명확히 하면 원인 가설을 빠르게 받는다.",
        "enemyType": "glitch",
        "concept": "로그 분석 프롬프트",
        "whyCorrect": "스택과 발생 상황, 직전 릴리즈 정보를 함께 주고 '원인 후보 3개 + 추가 확인 항목'을 요청하면 바로 실행 가능한 가설을 얻는다. 예를 들어 '배포 직후 500 증가, DB 커넥션 제한 100→50'처럼 주면 연결 고갈 가능성을 제시한다. 감정 표현이나 모호한 요청은 분석 품질을 떨어뜨린다. 명확한 형식이 디버깅 속도를 높인다.",
        "whyWrong": {
          "1": "감정 표현은 친근하지만 기술적 단서를 늘려주진 않아요. 필요한 정보가 우선입니다.",
          "2": "모호한 요청은 엉뚱한 답을 불러옵니다. 원하는 출력 구조를 알려주세요."
        },
        "realWorldTip": "프롬프트에 '근거 로그 라인 번호를 함께 제시'라고 넣으면 다시 찾아보는 시간을 아낄 수 있다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "프롬프트작성",
          "디버깅"
        ]
      },
      {
        "id": "developer_prompt_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "리팩터링을 AI에 시킬 때 반드시 넣어야 할 제약은?",
        "options": [
          "이모지로만 코드를 작성하라고 한다",
          "외부 동작 동일·테스트 유지·코딩 규칙을 명시한다",
          "파일 이름을 랜덤으로 바꾸라고 한다"
        ],
        "correct": 1,
        "desc": "동작 동일성과 규칙을 적어야 안전한 리팩터링이 된다.",
        "enemyType": "worm",
        "concept": "리팩터링 프롬프트",
        "whyCorrect": "기존 입출력, 예외 처리, 테스트 통과를 유지하라고 명시하면 AI가 내부 구조만 바꾸고 계약을 지킨다. 예를 들어 '동작 동일, eslint 규칙 준수, 테스트 이름 유지'를 적으면 무분별한 API 변경을 막는다. 이모지나 랜덤 변경은 협업과 디버깅을 어렵게 만들 뿐이다. 제약을 넣어야 실무에 바로 쓸 수 있다.",
        "whyWrong": {
          "0": "이모지 코드는 가독성과 협업을 해칩니다. 실무 코드에는 맞지 않아요.",
          "2": "랜덤 파일명은 빌드/테스트를 깨뜨릴 수 있습니다. 규칙을 유지하는 게 중요해요."
        },
        "realWorldTip": "프롬프트 마지막에 '테스트 깨는 부분이 있으면 알려달라'를 넣어 회귀 위험을 다시 점검하게 하세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "프롬프트작성",
          "디버깅"
        ]
      },
      {
        "id": "developer_prompt_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "문서 생성을 AI에 맡길 때 효과적인 지시는?",
        "options": [
          "길게 아무 말이나 써달라고 한다",
          "섹션 구조와 길이, 대상 독자를 명시한다",
          "AI가 알아서 마음대로 쓰게 둔다"
        ],
        "correct": 1,
        "desc": "구조와 독자를 알려줘야 원하는 톤과 깊이가 맞는다.",
        "enemyType": "trojan",
        "concept": "문서 프롬프트 구조",
        "whyCorrect": "목차, 분량, 대상(예: 백엔드 엔지니어)을 적으면 AI가 맞춤 톤과 깊이로 작성한다. 예를 들어 '서론-문제정의-해결-테스트-리스크, 각 3문장'을 주면 바로 리뷰 가능한 초안이 나온다. 아무 말 대잔치나 자유 형식은 편차가 커서 재작성 시간이 늘어난다. 구조화가 품질을 높인다.",
        "whyWrong": {
          "0": "모호한 길이 지시는 일관성 없는 결과를 만듭니다. 구조를 먼저 정하세요.",
          "2": "모든 걸 맡기면 팀 규약이나 톤이 어긋날 수 있어요. 기본 틀은 제공해야 합니다."
        },
        "realWorldTip": "대상 독자와 읽는 시간(예: 3분)을 함께 넣으면 길이와 난이도가 더 안정적으로 맞춰진다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "개발",
          "프롬프트작성",
          "코드리뷰"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "developer_prompt_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "로그 라벨링 정확도를 높이려면 어떤 프롬프트가 좋을까?",
        "options": [
          "대표 로그와 기대 라벨을 3~5개 예시로 제공한다",
          "예시는 오히려 혼란을 주니 생략한다",
          "라벨 목록만 던지고 알아서 분류하게 둔다"
        ],
        "correct": 0,
        "desc": "소수의 좋은 예시가 모델 판단 기준을 세워준다.",
        "enemyType": "bug",
        "concept": "Few-shot 프롬프트",
        "whyCorrect": "예시 3~5개로 포맷과 기준을 보여주면 비슷한 패턴에서 일관성 있는 라벨을 준다. 예를 들어 'DB 연결 실패→infra, 유효성 실패→validation'처럼 적으면 모호한 로그도 같은 기준으로 묶인다. 예시가 없으면 모델이 새로운 카테고리를 만들어내거나 엉뚱한 라벨을 붙일 수 있다. 적은 예시라도 품질을 크게 올린다.",
        "whyWrong": {
          "1": "예시를 빼면 기준이 모호해져서 분류가 흔들립니다. 짧더라도 넣어주세요.",
          "2": "라벨만 던지면 포맷과 기준을 추측해야 해요. 예시가 있어야 재현성이 높아집니다."
        },
        "realWorldTip": "예시마다 '근거 라인'을 표시하게 하면 나중에 라벨 품질을 리뷰하기 쉬워진다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "프롬프트작성",
          "디버깅"
        ]
      },
      {
        "id": "developer_prompt_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI 코드 리뷰 요청 시 우선순위를 제대로 전달하는 방법은?",
        "options": [
          "추상적으로 '좋게 봐줘'라고만 한다",
          "유머를 많이 넣어달라고 한다",
          "성능·보안·가독성 등 검토 항목을 번호 목록으로 지정한다"
        ],
        "correct": 2,
        "desc": "검토 항목을 명시해야 리뷰 포커스가 맞는다.",
        "enemyType": "worm",
        "concept": "코드 리뷰 프롬프트",
        "whyCorrect": "항목별로 '1) 보안: 입력 검증, 2) 성능: O(n) 이하 유지, 3) 가독성: 함수 길이 30줄 이하'처럼 적으면 AI가 해당 기준에 집중한다. 추상적인 요청은 핵심을 놓치고 장식적인 피드백만 줄 수 있다. 유머 요구는 리뷰 품질과 무관하다. 명확한 우선순위가 실무에 도움이 된다.",
        "whyWrong": {
          "0": "모호한 요청은 리뷰 초점을 잃게 만들어요. 무엇을 봐야 하는지 알려주세요.",
          "1": "유머는 즐겁지만 기술적 정확도와는 별개입니다. 우선순위가 먼저예요."
        },
        "realWorldTip": "프롬프트에 '각 항목별로 1줄 근거 코드 라인 포함'을 요구하면 검토 시간을 줄일 수 있다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "개발",
          "프롬프트작성",
          "코드리뷰"
        ]
      },
      {
        "id": "developer_prompt_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "장문의 파일을 나눠서 프롬프트할 때 좋은 방식은?",
        "options": [
          "순서는 상관없으니 아무렇게나 보낸다",
          "조각마다 태그를 붙이고 마지막에 이전 조각 요약을 제공한다",
          "같은 조각을 여러 번 반복해 보낸다"
        ],
        "correct": 1,
        "desc": "조각 연결 정보를 줘야 모델이 맥락을 유지한다.",
        "enemyType": "virus",
        "concept": "분할 입력 프롬프트",
        "whyCorrect": "각 조각에 '[part 1/4]' 같은 태그를 붙이고 핵심 요약을 누적 전달하면 모델이 구조를 유지하며 답할 수 있다. 순서를 뒤섞거나 반복하면 문맥이 꼬여 잘못된 결론을 낼 수 있다. 긴 파일을 분할할 때는 연결 정보를 명시하는 게 필수다. 그래야 추론 품질이 유지된다.",
        "whyWrong": {
          "0": "순서를 흩뜨리면 모델이 흐름을 잃어버립니다. 태그로 질서를 주는 게 안전해요.",
          "2": "중복 전송은 토큰만 낭비하고 혼란을 줍니다. 요약 전달이 더 낫습니다."
        },
        "realWorldTip": "각 파트 요약을 3줄로 제한해 전달하면 토큰을 아끼면서도 맥락을 유지할 수 있다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "개발",
          "프롬프트작성",
          "코드리뷰"
        ]
      }
    ],
    "advanced": [
      {
        "id": "developer_prompt_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "환각을 줄이는 인용형 프롬프트 설계는?",
        "options": [
          "근거 파일/라인을 명시하게 하고 없으면 '근거 없음'이라고 답하게 한다",
          "창의적으로 더 길게 쓰라고 한다",
          "길이 제한을 없애서 자유롭게 쓰게 한다"
        ],
        "correct": 0,
        "desc": "근거 요청과 부정 답변 허용이 환각을 줄인다.",
        "enemyType": "trojan",
        "concept": "근거 기반 프롬프트",
        "whyCorrect": "출처 파일과 라인을 요구하고 근거가 없을 땐 '근거 없음'을 선언하게 하면 허구 생성이 줄어든다. 예를 들어 'src/order.ts:42'처럼 표시하게 하면 검증도 쉬워진다. 창의성 강화나 길이 확대는 오히려 추측을 늘린다. 근거를 강제하는 구조가 실무 신뢰도를 높인다.",
        "whyWrong": {
          "1": "창의성 지시는 기술 설명에서 오히려 환각을 키울 수 있어요.",
          "2": "길이 제한을 풀면 잡담이 길어지고 검증이 어려워집니다. 근거 중심이 우선입니다."
        },
        "realWorldTip": "출처를 JSON으로 반환하게 하면 UI에서 바로 링크를 걸 수 있어 리뷰 시간이 단축된다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "개발",
          "프롬프트작성",
          "코드리뷰"
        ]
      },
      {
        "id": "developer_prompt_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "자동 수정 요청 시 출력 형식을 어떻게 제한해야 안전할까?",
        "options": [
          "diff 패치와 실행할 테스트 목록을 구조화된 JSON/patch로 돌려달라 한다",
          "소설처럼 자유롭게 써달라고 한다",
          "스크린샷을 첨부해달라고 한다"
        ],
        "correct": 0,
        "desc": "출력 형식을 제한해야 자동 적용 파이프라인이 안전하다.",
        "enemyType": "virus",
        "concept": "구조화된 답변",
        "whyCorrect": "patch 형식과 테스트 명세를 정해주면 CI나 git apply에 바로 걸 수 있어 사고를 줄인다. 예를 들어 '{\"patch\": \"...\", \"tests\": [\"npm test order\"]}'처럼 요구하면 파이프라인이 안정된다. 자유 서술은 자동 적용하기 어렵고 오류를 낳기 쉽다. 스크린샷은 텍스트 기반 자동화와 맞지 않는다.",
        "whyWrong": {
          "1": "자유 서술은 사람이 다시 해석해야 해 자동화 이점이 사라집니다.",
          "2": "스크린샷은 텍스트 도구와 호환되지 않아 실패합니다. 구조화된 출력이 필요해요."
        },
        "realWorldTip": "CI에서 JSON 스키마를 검증하도록 두면 잘못된 포맷 응답을 초기에 걸러낼 수 있다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "프롬프트작성",
          "디버깅"
        ]
      }
    ]
  },
  "tools": {
    "beginner": [
      {
        "id": "developer_tools_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "단순 반복 코드 작성에 가장 적합한 도구는?",
        "options": [
          "IDE Copilot 자동완성",
          "대형 챗모델에 장문 질문",
          "손코딩만 고집하기"
        ],
        "correct": 0,
        "desc": "짧은 맥락의 반복 패턴은 IDE 내 자동완성이 빠르다.",
        "enemyType": "glitch",
        "concept": "도구 선택",
        "whyCorrect": "로직이 단순하고 파일 맥락이 명확할 때는 IDE의 Copilot류 자동완성이 가장 빠르고 정확하다. 몇 줄의 함수나 반복되는 DTO 변환 같은 패턴에서 바로 제안이 뜬다. 장문 챗은 오버헤드가 크고 손코딩은 시간이 오래 걸린다. 도구를 상황에 맞게 고르면 생산성이 올라간다.",
        "whyWrong": {
          "1": "챗모델은 길고 복잡한 맥락에 적합해요. 반복 패턴엔 과합니다.",
          "2": "손코딩만 고집하면 속도가 느려지고 휴먼 에러가 늘 수 있어요. 도구를 활용해 보세요."
        },
        "realWorldTip": "자동완성 제안이 뜰 때마다 바로 적용 말고, 탭 전에 변수명/타입이 맞는지 한 번 확인하는 습관을 들이세요.",
        "skill": "tool-selection",
        "aiTool": "copilot",
        "scenario": "analysis",
        "tags": [
          "개발",
          "도구선택",
          "데이터분석",
          "코파일럿"
        ]
      },
      {
        "id": "developer_tools_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "긴 설계나 논리 검토가 필요할 때 적합한 접근은?",
        "options": [
          "ESLint만 돌린다",
          "대화형 챗모델에 아키텍처 다이어그램과 맥락을 함께 준다",
          "컬러 피커로 색상을 먼저 고른다"
        ],
        "correct": 1,
        "desc": "복잡한 논리는 챗모델에 충분한 맥락을 줘야 한다.",
        "enemyType": "bug",
        "concept": "모델 사용 구분",
        "whyCorrect": "설계 결정은 의존 관계와 제약을 이해해야 하므로 다이어그램, 트래픽, SLA를 함께 주는 챗 기반 검토가 효과적이다. ESLint나 색상 설정은 구조적 의사결정과 무관하다. 맥락을 넉넉히 주면 위험 요소를 더 잘 짚는다.",
        "whyWrong": {
          "0": "ESLint는 스타일/버그를 잡지만 아키텍처 판단까지 대신하지는 못합니다.",
          "2": "색상은 UI에만 관련 있고 설계 검토와는 거리가 멀어요."
        },
        "realWorldTip": "다이어그램이 없으면 텍스트로라도 '모듈 A→B→C, QPS 1k'처럼 흐름을 먼저 적어주면 검토 품질이 올라간다.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "개발",
          "도구선택",
          "코드리뷰"
        ]
      },
      {
        "id": "developer_tools_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "로컬 코드 검색 후 AI를 쓰는 가장 좋은 흐름은?",
        "options": [
          "`rg`나 코드 검색으로 관련 파일만 찾고 그 부분을 발췌해 전달한다",
          "리포 전체를 업로드해 달라고 한다",
          "Stack Overflow 링크를 잔뜩 붙인다"
        ],
        "correct": 0,
        "desc": "관련 부분만 추려서 주면 모델 한도와 정확도를 모두 잡을 수 있다.",
        "enemyType": "worm",
        "concept": "맥락 추출",
        "whyCorrect": "빠른 코드 검색으로 필요한 함수나 타입 정의만 발췌해 주면 토큰을 아끼면서 정확한 답을 얻는다. 전체 리포 업로드는 한도를 넘기고 보안 위험도 크다. 링크만 잔뜩 붙이는 건 맥락 연결이 부족해 도움이 적다.",
        "whyWrong": {
          "1": "전체 리포는 입력 한도를 넘기고 노이즈가 많아요. 필요한 부분만 주세요.",
          "2": "링크 모음은 정리되지 않아 모델이 핵심을 찾기 어렵습니다. 코드 조각이 더 효과적입니다."
        },
        "realWorldTip": "발췌할 때 상하 10줄 정도의 주변 문맥을 함께 주면 타입/의존성을 이해시키는 데 도움이 된다.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "analysis",
        "tags": [
          "개발",
          "도구선택",
          "데이터분석"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "developer_tools_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "Copilot Chat 등에서 레포 컨텍스트를 정확히 읽게 하려면?",
        "options": [
          "에디터 테마만 바꾼다",
          "스크린샷만 찍어 보낸다",
          "리포 인덱싱/권한을 확인하고 경로를 명시해 질문한다"
        ],
        "correct": 2,
        "desc": "인덱싱 여부와 파일 경로를 지정해야 문맥이 어긋나지 않는다.",
        "enemyType": "virus",
        "concept": "레포 컨텍스트 설정",
        "whyCorrect": "리포가 인덱싱돼 있는지 확인하고 'src/payments/**를 봐줘'처럼 경로를 지정하면 관련 코드만 사용한다. 테마나 스크린샷은 컨텍스트 인식에 도움을 주지 않는다. 정확한 경로를 주면 엉뚱한 파일을 참고하는 일을 줄일 수 있다.",
        "whyWrong": {
          "0": "테마 변경은 가독성만 바꿀 뿐 컨텍스트에는 영향을 주지 않아요.",
          "1": "스크린샷은 검색이 안 되고 문맥 연결도 약해요. 실제 파일 경로가 필요합니다."
        },
        "realWorldTip": "질문 앞에 'workspace: monorepo/apps/pay'처럼 접두어를 붙이는 습관을 들이면 오답률이 줄어든다.",
        "skill": "tool-selection",
        "aiTool": "copilot",
        "scenario": "analysis",
        "tags": [
          "개발",
          "도구선택",
          "데이터분석",
          "코파일럿"
        ]
      },
      {
        "id": "developer_tools_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI 모델을 고를 때 현실적인 기준은?",
        "options": [
          "무조건 가장 빠른 모델만 쓴다",
          "간단 자동완성은 경량, 위험 변경은 상위 모델을 쓴다",
          "무조건 최신/큰 모델만 쓴다"
        ],
        "correct": 1,
        "desc": "작업 성격에 따라 비용·품질을 맞추는 게 효율적이다.",
        "enemyType": "trojan",
        "concept": "모델 선택",
        "whyCorrect": "반복 코드나 포맷팅은 경량 모델이 충분하고 비용이 절약된다. 보안/아키텍처 리뷰처럼 위험도가 큰 작업은 정확도가 높은 상위 모델이 낫다. 무조건 빠르거나 큰 모델만 고르면 비용과 품질이 균형을 잃는다. 작업별로 모델을 분리하는 게 실용적이다.",
        "whyWrong": {
          "0": "가장 빠른 모델만 쓰면 정밀한 판단이 필요한 작업에서 오류가 늘 수 있어요.",
          "2": "가장 큰 모델만 쓰면 비용이 과다하고 응답도 느려집니다. 경량/정밀을 나눠 쓰세요."
        },
        "realWorldTip": "CI에서는 경량 모델로 초안 리뷰 후, 위험 PR에만 상위 모델을 추가로 돌리는 식의 2단계 전략이 비용 효율이 좋다.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "개발",
          "도구선택",
          "코드리뷰"
        ]
      },
      {
        "id": "developer_tools_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "테스트 생성을 자동화할 때 모델에 주면 좋은 입력은?",
        "options": [
          "랜덤 데이터만 던져 테스트를 만들게 한다",
          "UI 스크린샷을 준다",
          "커버리지 보고서와 실패 케이스를 함께 줘 부족한 경로를 채우게 한다"
        ],
        "correct": 2,
        "desc": "결핍 구간을 알려줘야 유의미한 테스트가 생성된다.",
        "enemyType": "bug",
        "concept": "테스트 생성",
        "whyCorrect": "커버리지 레포트와 최근 실패 사례를 주면 AI가 누락된 경로를 우선 채운다. 예를 들어 'line 120 else 분기 미실행'을 알려주면 해당 경로를 위한 테스트를 제안한다. 랜덤 데이터만 주면 의미 없는 테스트가 나올 수 있다. UI 스크린샷은 단위 테스트 설계와 관련이 없다.",
        "whyWrong": {
          "0": "랜덤 데이터는 중요한 경로를 놓칠 수 있어요. 부족한 부분을 알려주는 게 낫습니다.",
          "1": "스크린샷은 단위 테스트 설계에 도움이 되지 않습니다. 코드 경로 정보를 주세요."
        },
        "realWorldTip": "AI가 생성한 테스트는 바로 추가 말고, 실패했던 버전과 통합해 회귀 테스트 세트로 묶어두면 재발 방지에 좋다.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "개발",
          "도구선택",
          "기획설계"
        ]
      }
    ],
    "advanced": [
      {
        "id": "developer_tools_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "사내 API 문서를 RAG로 붙일 때 핵심 설정은?",
        "options": [
          "정적 FAQ를 붙여넣기만 한다",
          "모델 파라미터만 바꿔본다",
          "임베딩 인덱스·쿼리 리라이팅·문맥 길이 제한을 둔다"
        ],
        "correct": 2,
        "desc": "검색-리라이팅-문맥 제한이 함께 있어야 정확도가 올라간다.",
        "enemyType": "bug",
        "concept": "RAG 설정",
        "whyCorrect": "엔드포인트별로 청크를 쪼개 임베딩하고, 사용자가 틀린 용어로 질문해도 리라이팅해주는 계층을 두면 검색 품질이 오른다. 문맥 길이를 제한해 노이즈를 줄이면 응답이 짧고 정확해진다. FAQ 붙여넣기나 파라미터 조정만으론 검색 품질이 개선되지 않는다.",
        "whyWrong": {
          "0": "FAQ만 붙이면 최신 명세나 세부 옵션을 못 찾을 수 있어요. 검색 인덱스가 필요합니다.",
          "1": "파라미터만 바꾸면 근본적인 검색 품질이 개선되지 않습니다. 인덱스와 리라이팅이 우선이에요."
        },
        "realWorldTip": "쿼리/응답에 출처 URL을 붙여 반환하게 하면 잘못된 문맥을 빠르게 교체할 수 있다.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "개발",
          "도구선택",
          "코드리뷰"
        ]
      },
      {
        "id": "developer_tools_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "CI에서 AI가 PR 코멘트를 남기게 할 때 주의할 점은?",
        "options": [
          "diff와 테스트 결과만 주고 쓰기 권한을 최소화하며 실패 시 무시하도록 한다",
          "PR에 직접 커밋하도록 한다",
          "비밀키를 로그에 출력해 검증한다"
        ],
        "correct": 0,
        "desc": "읽기 전용·최소 권한·비필수 동작으로 설정해야 안전하다.",
        "enemyType": "worm",
        "concept": "CI 연동 가드",
        "whyCorrect": "AI가 남긴 코멘트는 참고용이어야 하고, 쓰기 권한을 없애면 잘못된 자동 수정으로부터 보호된다. 실패해도 빌드를 깨지 않게 해야 개발 흐름을 막지 않는다. 직접 커밋이나 비밀키 노출은 큰 보안 사고로 이어질 수 있다.",
        "whyWrong": {
          "1": "직접 커밋은 잘못된 변경을 메인에 반영할 위험이 큽니다. 사람이 검토해야 해요.",
          "2": "비밀키 노출은 치명적입니다. 로그에 남기면 안 됩니다."
        },
        "realWorldTip": "PR 코멘트에 '근거 라인'을 첨부하게 하고, 사람이 승인하면만 적용하도록 워크플로를 분리하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "도구선택",
          "디버깅"
        ]
      }
    ]
  },
  "ethics": {
    "beginner": [
      {
        "id": "developer_ethics_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "실서비스 로그를 외부 AI에 보낼 때 먼저 할 일은?",
        "options": [
          "원본 전체를 그대로 올린다",
          "로그를 임의로 섞어버린다",
          "토큰/PII를 마스킹하고 필요한 부분만 최소로 전달한다"
        ],
        "correct": 2,
        "desc": "민감 정보를 지우고 최소 데이터만 공유해야 한다.",
        "enemyType": "trojan",
        "concept": "데이터 최소화",
        "whyCorrect": "토큰, 이메일, 주문번호 같은 식별자를 마스킹하고 필요한 스택 조각만 주면 유출 위험을 줄인다. 원본 전체를 올리면 개인정보와 기밀이 새어 나갈 수 있다. 임의 섞기는 원인 분석을 어렵게 만들어 도움도 안 된다. 최소화 원칙이 기본이다.",
        "whyWrong": {
          "0": "원본 전체는 유출 위험이 커요. 최소화와 마스킹이 먼저입니다.",
          "1": "데이터를 섞으면 분석이 불가능해집니다. 필요한 부분만 깔끔히 남겨주세요."
        },
        "realWorldTip": "슬랙/티켓에도 마스킹 버전을 사용하도록 팀 규칙을 정해두면 실수 확률이 줄어든다.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "윤리보안",
          "디버깅"
        ]
      },
      {
        "id": "developer_ethics_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "사내 코드 조각을 외부 모델에 붙여 넣을 때 주의는?",
        "options": [
          "개인 무료 계정에 아무 제약 없이 붙여 넣는다",
          "보안 승인된 모델/전용 워크스페이스를 쓰거나 민감 부분을 제거한다",
          "공용 채팅방에 공유한다"
        ],
        "correct": 1,
        "desc": "승인된 환경과 최소 공개가 기본이다.",
        "enemyType": "virus",
        "concept": "코드 기밀",
        "whyCorrect": "사내 규정에 맞는 승인된 모델이나 전용 워크스페이스를 사용하고, 비밀키/자격증명은 제거해야 한다. 개인 계정이나 공용 채널은 유출 위험이 높다. 최소 공개 원칙을 지켜야 안전하다.",
        "whyWrong": {
          "0": "무료 계정은 로그/학습에 쓰일 수 있어요. 기밀 코드에 부적합합니다.",
          "2": "공용 채널 공유는 즉시 유출입니다. 반드시 사내 승인 채널을 사용하세요."
        },
        "realWorldTip": "사내 프록시/게이트웨이를 통해서만 외부 모델을 호출하도록 개발환경을 통일하면 실수를 줄일 수 있다.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "개발",
          "윤리보안",
          "문서작성"
        ]
      },
      {
        "id": "developer_ethics_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "AI가 제안한 오픈소스 코드를 사용할 때 먼저 확인할 것은?",
        "options": [
          "바로 배포해본다",
          "주석만 추가한다",
          "라이선스 종류와 프로젝트와의 호환성"
        ],
        "correct": 2,
        "desc": "라이선스 호환을 확인하지 않으면 법적 리스크가 생긴다.",
        "enemyType": "bug",
        "concept": "라이선스 확인",
        "whyCorrect": "GPL, AGPL 등 복수 라이선스는 배포 방식에 제약을 준다. 호환 여부를 먼저 확인해야 나중에 코드 철거나 법적 분쟁을 피할 수 있다. 주석 추가나 즉시 배포는 위험하다. 호환성을 검증한 후 사용하는 게 안전하다.",
        "whyWrong": {
          "0": "검증 없이 배포하면 나중에 회수하거나 배포 제한을 받을 수 있어요.",
          "1": "주석 추가는 법적 호환성과 무관합니다. 라이선스가 우선이에요."
        },
        "realWorldTip": "AI가 제안한 라이브러리는 SBOM과 함께 기록하고, 승인된 라이선스 목록을 체크리스트로 두세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "개발",
          "윤리보안",
          "문서작성"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "developer_ethics_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "고객 데이터를 모델 학습/튜닝에 쓰기 전 해야 할 일은?",
        "options": [
          "전체 데이터를 그대로 학습시킨다",
          "익명화 없이 팀 외부와 공유한다",
          "DPA·목적 제한·삭제 정책을 확인하고 최소 데이터로 샘플링한다"
        ],
        "correct": 2,
        "desc": "법/계약 준수와 데이터 최소화가 선행되어야 한다.",
        "enemyType": "worm",
        "concept": "데이터 거버넌스",
        "whyCorrect": "데이터 처리 계약(DPA), 목적 제한, 보관/삭제 정책을 확인한 뒤 필요한 컬럼만 샘플링해야 한다. 전체 데이터를 그대로 쓰면 법적/신뢰 리스크가 크다. 익명화 없이 공유하면 규정 위반이 된다. 최소화와 계약 준수가 필수다.",
        "whyWrong": {
          "0": "전체 학습은 리스크가 크고 종종 규정 위반이에요. 필요한 만큼만 써야 합니다.",
          "1": "익명화 없이 공유하면 개인정보 유출 소지가 큽니다. 엄격히 통제하세요."
        },
        "realWorldTip": "샘플 생성 시 PII 컬럼을 자동 마스킹하는 스크립트를 먼저 돌리고, 사용된 필드를 로그로 남기세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "윤리보안",
          "디버깅"
        ]
      },
      {
        "id": "developer_ethics_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "프롬프트 인젝션을 막기 위한 현실적인 조치는?",
        "options": [
          "UI 색상을 바꾼다",
          "시스템 프롬프트 고정·입력 필터·출처 검증을 함께 둔다",
          "폰트를 변경한다"
        ],
        "correct": 1,
        "desc": "프롬프트 고정과 입력 검증이 기본 방어선이다.",
        "enemyType": "trojan",
        "concept": "프롬프트 보안",
        "whyCorrect": "시스템 지시를 코드에서 고정하고, 사용자 입력에서 위험 패턴을 필터링하며, 검색 문맥엔 출처 표시를 붙이면 인젝션을 줄일 수 있다. 색상이나 폰트 변경은 보안과 무관하다. 기본 방어선을 깔아야 한다.",
        "whyWrong": {
          "0": "색상 변경은 보안에 영향을 주지 않아요. 방어 로직이 필요합니다.",
          "2": "폰트도 시각 요소일 뿐 보안 효과가 없습니다."
        },
        "realWorldTip": "입력 필터 룰을 로그로 남겨 주기적으로 업데이트하면 새로운 인젝션 패턴을 빠르게 막을 수 있다.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "윤리보안",
          "디버깅"
        ]
      },
      {
        "id": "developer_ethics_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI가 추천한 라이브러리를 채택하기 전에 점검할 사항은?",
        "options": [
          "CVE·유지보수 상태·라이선스 호환성을 확인한다",
          "AI가 추천했으니 무조건 쓴다",
          "스타 수만 보고 결정한다"
        ],
        "correct": 0,
        "desc": "보안/유지보수/라이선스를 함께 봐야 안전하다.",
        "enemyType": "virus",
        "concept": "의존성 검증",
        "whyCorrect": "CVE 여부와 최신 릴리스 간격, 메인테이너 활동성을 확인하면 취약하거나 방치된 라이브러리를 피할 수 있다. 스타 수나 추천만 보고 채택하면 장기 리스크가 크다. 라이선스 호환도 함께 체크해야 한다.",
        "whyWrong": {
          "1": "추천만 믿으면 취약한 라이브러리를 들여올 수 있어요. 검증이 필요합니다.",
          "2": "스타 수는 인기 지표일 뿐 보안/법적 안전을 보장하지 않습니다."
        },
        "realWorldTip": "새 의존성을 추가할 땐 npm audit/GH security alert를 먼저 돌리고, AI 추천 이유와 함께 기록해 두세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "개발",
          "윤리보안",
          "문서작성"
        ]
      }
    ],
    "advanced": [
      {
        "id": "developer_ethics_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "모델 호출 로그에 최소로 남겨야 하는 필드는?",
        "options": [
          "전체 입력 평문",
          "요청 ID·목적·민감도 태그·익명화된 샘플",
          "아무것도 남기지 않는다"
        ],
        "correct": 1,
        "desc": "추적 가능성과 개인정보 보호를 함께 만족해야 한다.",
        "enemyType": "bug",
        "concept": "감사 로그",
        "whyCorrect": "요청 식별자와 사용 목적, 민감도 태그만 남기고 입력은 익명화/샘플링해 저장하면 추적성과 프라이버시를 동시에 잡는다. 평문 전체를 남기면 유출 위험이 커지고, 아무 로그도 없으면 사고 시 원인을 찾을 수 없다. 최소 필드 로그가 현실적이다.",
        "whyWrong": {
          "0": "평문 저장은 보안 사고 가능성을 높입니다. 익명화가 필요해요.",
          "2": "로그가 없으면 문제 발생 시 추적이 불가능해요. 최소한의 필드는 남겨야 합니다."
        },
        "realWorldTip": "민감도 태그에 따라 보관 기간을 자동으로 다르게 적용하면 규정 준수가 쉬워진다.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "윤리보안",
          "디버깅"
        ]
      },
      {
        "id": "developer_ethics_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "코드 자동수정 봇을 운영할 때 필수 안전장치는?",
        "options": [
          "바로 메인 브랜치에 머지",
          "야간에 무제한 실행",
          "샌드박스 테스트·승인 워크플로·권한 최소화"
        ],
        "correct": 2,
        "desc": "테스트와 승인, 권한 제한이 있어야 사고를 막는다.",
        "enemyType": "worm",
        "concept": "자동수정 거버넌스",
        "whyCorrect": "샌드박스에서 테스트를 돌리고, 사람이 승인해야만 배포되게 하며, 리포 권한을 최소화하면 자동수정 봇의 잘못된 변경을 막을 수 있다. 바로 머지나 무제한 실행은 대규모 장애로 이어질 수 있다. 가드레일 없이는 운영이 위험하다.",
        "whyWrong": {
          "0": "바로 머지는 잘못된 코드가 프로덕션에 들어갈 위험이 큽니다.",
          "1": "무제한 실행은 제어 불가능한 상태를 만들 수 있어요. 제한이 필요합니다."
        },
        "realWorldTip": "자동수정 봇 PR에는 항상 '자동 생성' 라벨과 체커 상태를 붙여서 사람이 판단하기 쉽게 만드세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "개발",
          "윤리보안",
          "콘텐츠제작"
        ]
      }
    ]
  },
  "advanced": {
    "beginner": [
      {
        "id": "developer_advanced_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "멀티스텝 자동화 설계에서 가장 먼저 정할 것은?",
        "options": [
          "UI 색상 팔레트",
          "입력/출력 스키마와 의사결정 기준",
          "새 슬로건"
        ],
        "correct": 1,
        "desc": "입출력과 기준을 정해야 이후 단계를 자동화할 수 있다.",
        "enemyType": "glitch",
        "concept": "워크플로 설계",
        "whyCorrect": "각 단계의 입력/출력 형식을 먼저 정의해야 모델과 도구를 연결할 수 있다. 예를 들어 '입력: 에러 로그, 출력: 원인 3개 JSON'을 정하면 다음 단계가 그 구조를 소비할 수 있다. 색상이나 슬로건은 자동화 품질과 무관하다. 스키마 정의가 기본이다.",
        "whyWrong": {
          "0": "색상은 자동화 흐름에 영향을 주지 않아요. 먼저 데이터 구조를 잡으세요.",
          "2": "슬로건은 브랜드 요소일 뿐 실행 흐름과 무관합니다."
        },
        "realWorldTip": "입출력 스키마를 JSON 스키마로 문서화하면 나중에 테스트와 검증을 자동화하기 쉽다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "자동화설계",
          "디버깅"
        ]
      },
      {
        "id": "developer_advanced_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "프롬프트 회귀 테스트를 시작할 때 첫 준비는?",
        "options": [
          "매번 감으로 답을 비교한다",
          "테스트를 단 한 개만 남긴다",
          "대표 입력과 기대 출력을 스냅샷으로 저장한다"
        ],
        "correct": 2,
        "desc": "스냅샷이 있어야 모델 업그레이드 후 변화를 검출한다.",
        "enemyType": "bug",
        "concept": "프롬프트 회귀",
        "whyCorrect": "주요 입력/출력을 스냅샷으로 저장하고 버전 관리해야 모델 변경 시 품질 하락을 잡을 수 있다. 감에 의존하거나 테스트를 줄이면 회귀를 놓친다. 최소 세트라도 저장해 두는 게 중요하다.",
        "whyWrong": {
          "0": "감에 의존하면 변화를 정량화할 수 없어요. 스냅샷이 필요합니다.",
          "1": "테스트를 줄이면 커버리지 부족으로 회귀를 놓칩니다. 대표 세트를 유지하세요."
        },
        "realWorldTip": "테스트 케이스를 CSV/JSON으로 두고 모델 버전별 점수를 기록하면 품질 추이가 한눈에 보인다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "개발",
          "자동화설계",
          "코드리뷰"
        ]
      },
      {
        "id": "developer_advanced_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "LLM 캐싱 전략을 세울 때 먼저 할 일은?",
        "options": [
          "재사용 가능한 질문 키와 버전 관리를 설계한다",
          "모든 응답을 무조건 캐싱한다",
          "캐싱을 아예 사용하지 않는다"
        ],
        "correct": 0,
        "desc": "키와 버전을 정의해야 캐시가 안전하게 동작한다.",
        "enemyType": "virus",
        "concept": "캐싱 전략",
        "whyCorrect": "질문 파라미터와 모델/지식 버전을 키로 삼아야 잘못된 응답 재사용을 막을 수 있다. 무조건 캐싱하면 컨텍스트가 달라도 오래된 답을 반환할 수 있고, 미사용은 비용을 높인다. 키/버전 설계가 품질과 비용을 모두 잡는다.",
        "whyWrong": {
          "1": "무조건 캐싱은 잘못된 답을 계속 돌려줄 수 있어요. 키 설계가 필요합니다.",
          "2": "캐싱을 안 하면 같은 질문에도 비용이 계속 듭니다. 균형이 중요해요."
        },
        "realWorldTip": "캐시 키에 모델 버전과 데이터 스냅샷 ID를 포함해, 배포 후 캐시를 안전하게 무효화할 수 있게 만드세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "개발",
          "자동화설계",
          "코드리뷰"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "developer_advanced_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "API 명세용 RAG 파이프라인의 핵심은?",
        "options": [
          "PDF를 통째로 붙여넣기",
          "엔드포인트별 청크/벡터화와 출처 링크 포함",
          "키워드 검색만 믿기"
        ],
        "correct": 1,
        "desc": "세분화된 청크와 출처가 있어야 답을 검증할 수 있다.",
        "enemyType": "trojan",
        "concept": "RAG 설계",
        "whyCorrect": "엔드포인트나 도메인별로 문서를 쪼개 벡터화하면 관련 문맥만 가져올 수 있고, 출처 링크를 붙이면 검증이 쉽다. PDF 통째 입력이나 키워드 검색만으론 정확도가 낮다. 구조화된 RAG가 필요한 이유다.",
        "whyWrong": {
          "0": "통째 입력은 노이즈가 많아 검색 품질이 떨어집니다. 청크가 필요해요.",
          "2": "키워드 검색만으론 동의어나 맥락을 놓쳐 답이 빈약할 수 있습니다."
        },
        "realWorldTip": "청크에 엔드포인트 이름을 태그로 넣어두면 로그 분석 시 어떤 문맥이 쓰였는지 추적하기 쉽다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "자동화설계",
          "디버깅"
        ]
      },
      {
        "id": "developer_advanced_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "LLM 도구 호출을 조합할 때 꼭 정의해야 하는 것은?",
        "options": [
          "각 도구의 입력/출력, 에러 재시도, 타임아웃",
          "도구를 임의로 아무 때나 호출하게 둔다",
          "사용자 입력을 그대로 시스템 명령으로 실행한다"
        ],
        "correct": 0,
        "desc": "툴 계약과 실패 처리 없이는 안전한 오케스트레이션이 어렵다.",
        "enemyType": "bug",
        "concept": "툴 오케스트레이션",
        "whyCorrect": "입출력 스키마, 재시도 정책, 타임아웃을 정의해야 모델이 도구를 안전하게 호출한다. 임의 호출이나 원본 명령 실행은 보안 위험과 장애를 부른다. 계약이 있어야 예측 가능한 동작을 만들 수 있다.",
        "whyWrong": {
          "1": "임의 호출은 잘못된 순서/중복 호출로 이어져요. 규칙이 필요합니다.",
          "2": "원본 명령 실행은 인젝션 위험이 큽니다. 필터링과 계약이 필수입니다."
        },
        "realWorldTip": "툴 호출 결과를 모두 로그로 남기고, 실패 패턴을 주기적으로 학습시키면 에이전트 품질이 올라간다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "자동화설계",
          "디버깅"
        ]
      },
      {
        "id": "developer_advanced_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "프롬프트 품질을 평가할 때 봐야 할 지표 조합은?",
        "options": [
          "정확도·커버리지·비용/지연을 함께 본다",
          "감정이 잘 담겼는지 본다",
          "응답 길이만 본다"
        ],
        "correct": 0,
        "desc": "정확도와 비용, 속도를 함께 관리해야 한다.",
        "enemyType": "worm",
        "concept": "프롬프트 평가",
        "whyCorrect": "정답률과 다양한 케이스 커버리지, 호출 비용과 지연까지 함께 봐야 실제 운영 품질을 판단할 수 있다. 감정이나 길이만 보면 실용적 품질을 놓친다. 균형 잡힌 지표가 필요하다.",
        "whyWrong": {
          "1": "감정은 기술적 품질과 무관합니다. 정확도가 우선이에요.",
          "2": "길이만으로 품질을 알 수 없어요. 정확도/비용/지연을 함께 보세요."
        },
        "realWorldTip": "케이스별 점수를 스프레드시트로 관리하고, 비용/지연도 함께 기록해 모델/프롬프트 변경 효과를 비교하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "개발",
          "자동화설계",
          "코드리뷰"
        ]
      }
    ],
    "advanced": [
      {
        "id": "developer_advanced_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "자동 코드 수정 파이프라인의 최소 단계는?",
        "options": [
          "분석→patch 생성→테스트→승인 대기",
          "patch 생성 후 곧바로 main에 머지",
          "로그 없이 무제한 실행"
        ],
        "correct": 0,
        "desc": "생성-검증-승인 단계를 거쳐야 안전하게 적용된다.",
        "enemyType": "virus",
        "concept": "자동화 가드레일",
        "whyCorrect": "분석 후 패치를 만들고, 테스트를 돌린 뒤 사람이 승인해야 프로덕션 안전을 지킬 수 있다. 곧바로 머지하거나 로그 없이 실행하면 장애 위험이 크다. 단계별 가드가 필수다.",
        "whyWrong": {
          "1": "바로 머지는 회귀를 그대로 배포할 수 있어 매우 위험합니다.",
          "2": "로그 없이 실행하면 문제가 나도 추적이 불가능해요. 기록이 필요합니다."
        },
        "realWorldTip": "패치 결과를 PR로 올리고 자동 테스트를 통과한 것만 리뷰 요청을 보내도록 설정하면 리뷰어 부담이 줄어든다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "자동화설계",
          "디버깅"
        ]
      },
      {
        "id": "developer_advanced_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "LLM 서비스 신뢰성을 설계할 때 핵심 조합은?",
        "options": [
          "테마 변경",
          "폰트 변경",
          "폴백 모델·서킷브레이커·SLI/알람"
        ],
        "correct": 2,
        "desc": "폴백과 차단, 관측 지표가 함께 있어야 SLA를 지킨다.",
        "enemyType": "bug",
        "concept": "신뢰성 설계",
        "whyCorrect": "장애 시 더 작은 모델/템플릿으로 폴백하고, 에러율 급증 시 서킷브레이커로 차단하며, 지연/성공률 SLI에 알람을 걸어야 운영 안정성이 확보된다. 테마나 폰트는 신뢰성과 무관하다. 인프라적 대책이 핵심이다.",
        "whyWrong": {
          "0": "테마는 UI 요소라 가용성과 무관합니다. 폴백/모니터링이 필요해요.",
          "1": "폰트도 시각적 요소일 뿐입니다. 신뢰성은 인프라 설정으로 확보합니다."
        },
        "realWorldTip": "SLI를 CloudWatch/Grafana에 대시보드로 올리고, 폴백 호출을 주기적으로 리허설하면 장애 대응이 빨라진다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "개발",
          "자동화설계",
          "디버깅"
        ]
      }
    ]
  }
};

// 마케터 직무 40문항
const MARKETER_QUESTIONS = {
  "practical": {
    "beginner": [
      {
        "id": "marketer_practical_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "신규 랜딩 페이지 카피 초안을 AI에 맡길 때 먼저 줄 정보는?",
        "options": [
          "브랜드 색상 코드만",
          "페르소나·문제·제안 가치·CTA 목표",
          "경쟁사 링크만"
        ],
        "correct": 1,
        "desc": "누구에게 무엇을 왜 말하는지 알려줘야 카피가 맞는다.",
        "enemyType": "glitch",
        "concept": "카피 브리프",
        "whyCorrect": "페르소나의 문제와 제안 가치, 원하는 행동을 주면 AI가 메시지와 CTA를 정렬시킨다. 예를 들어 'B2B 마케터, 리드 30% 증대, CTA: 데모 신청'을 주면 헤드라인·보조 카피가 일관된다. 색상이나 경쟁사 링크만 주면 방향성이 모호해 재작업이 많아진다. 핵심 맥락이 있어야 초안 품질이 오른다.",
        "whyWrong": {
          "0": "색상 정보만으론 어떤 가치를 강조해야 할지 알 수 없어요. 메시지가 먼저입니다.",
          "2": "경쟁사 링크만 주면 무분별한 모방이 되기 쉽고, 우리 가치와 어긋날 수 있어요."
        },
        "realWorldTip": "브리프에 '금지 표현/톤'을 함께 넣으면 승인 속도가 빨라진다.",
        "skill": "result-validation",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "마케팅",
          "실무활용",
          "코드리뷰"
        ]
      },
      {
        "id": "marketer_practical_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "이메일 캠페인 A/B 테스트 아이디어를 AI에 요청할 때 필수로 줄 것?",
        "options": [
          "팀 회식 사진",
          "고객 이름 전체 목록",
          "목표 지표·대상 세그먼트·현재 성과·제약"
        ],
        "correct": 2,
        "desc": "목표와 현 상태를 줘야 의미 있는 실험안을 제시한다.",
        "enemyType": "worm",
        "concept": "테스트 브리프",
        "whyCorrect": "오픈율/전환율 등 목표와 대상, 현재 메일 성과, 스팸/법적 제약을 알려주면 AI가 현실적인 변수만 추천한다. 회식 사진은 무관하며, 이름 전체는 개인정보 노출 위험이 있다. 제약이 없으면 과도한 실험을 제안할 수 있다.",
        "whyWrong": {
          "0": "사진은 분위기만 전달해요. 실험 설계엔 도움이 안 됩니다.",
          "1": "전체 이름은 개인정보라 불필요하고 위험합니다. 세그먼트 정보만 주세요."
        },
        "realWorldTip": "목표 지표와 베이스라인 수치를 함께 넣으면 AI가 uplift 가설을 더 구체적으로 만든다.",
        "skill": "result-validation",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "마케팅",
          "실무활용",
          "커뮤니케이션"
        ]
      },
      {
        "id": "marketer_practical_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "AI로 광고 소재 요약 보고서를 만들 때 가장 중요한 입력은?",
        "options": [
          "캠페인 담당자 연락처",
          "임의의 밈 이미지",
          "성과 지표(CTR/CVR)와 크리에이티브별 핵심 메시지"
        ],
        "correct": 2,
        "desc": "지표와 메시지를 함께 줘야 패턴을 요약할 수 있다.",
        "enemyType": "bug",
        "concept": "성과 요약",
        "whyCorrect": "소재별 CTR/CVR과 어떤 메시지/비주얼인지 알려줘야 잘 된 패턴을 뽑아낸다. 연락처나 밈은 분석과 무관하다. 입력이 없으면 일반론만 제공한다. 지표+메시지 조합이 있어야 실무적인 요약이 가능하다.",
        "whyWrong": {
          "0": "연락처는 소통용이지 분석 단서가 아니에요.",
          "1": "밈 이미지는 재미는 있지만 성과와 상관이 없습니다."
        },
        "realWorldTip": "소재별 썸네일 링크를 함께 주면 AI가 비주얼 패턴까지 요약해준다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "마케팅",
          "실무활용",
          "커뮤니케이션"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "marketer_practical_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI에게 캠페인 퍼널 진단을 맡길 때 먼저 해야 할 세팅은?",
        "options": [
          "광고주 로고만 보낸다",
          "예산 총액만 알려준다",
          "채널별 유입-전환 지표와 목표 대비 차이를 제공한다"
        ],
        "correct": 2,
        "desc": "구간별 전환율과 목표 차이를 줘야 병목을 찾는다.",
        "enemyType": "virus",
        "concept": "퍼널 진단",
        "whyCorrect": "채널별 CTR/CPA/리드→MQL→SQL 전환율과 목표 대비 차이를 주면 AI가 병목 구간과 원인 가설을 제시한다. 로고나 총예산만으론 어디서 막히는지 알 수 없다. 숫자가 있어야 실질적인 조언을 받을 수 있다.",
        "whyWrong": {
          "0": "로고는 브랜딩 자료일 뿐, 진단 단서가 아닙니다.",
          "1": "총액만으론 어느 구간에 쓰였는지 몰라 병목을 못 찾습니다."
        },
        "realWorldTip": "지표와 함께 최근 변경사항(랜딩 교체 등)을 주면 원인 추적 속도가 빨라진다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "마케팅",
          "실무활용",
          "콘텐츠제작"
        ]
      },
      {
        "id": "marketer_practical_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI로 고객 여정 맵을 만들 때 놓치면 안 되는 입력은?",
        "options": [
          "주요 터치포인트와 고객 감정/니즈 변화",
          "브랜드 사무실 주소",
          "경쟁사 주가"
        ],
        "correct": 0,
        "desc": "터치포인트와 감정 변화가 있어야 여정이 입체적이다.",
        "enemyType": "glitch",
        "concept": "여정 맵",
        "whyCorrect": "터치포인트(광고→랜딩→데모→구매)마다 고객 감정/니즈를 주면 AI가 병목과 메시지 개선 포인트를 잡는다. 주소나 주가는 여정 설계와 무관하다. 감정 흐름이 없으면 단순 단계 나열로 끝난다.",
        "whyWrong": {
          "1": "주소는 물리 정보일 뿐 여정 설계에 영향을 주지 않아요.",
          "2": "주가는 시장 정보라 메시지 설계와는 동떨어져 있습니다."
        },
        "realWorldTip": "각 터치포인트마다 '의문/장애/도움 요소'를 함께 적으면 액션 아이템을 뽑기 쉽다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "마케팅",
          "실무활용",
          "기획설계"
        ]
      },
      {
        "id": "marketer_practical_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI에 리마케팅 시나리오를 짜달라 할 때 가장 먼저 줄 정보는?",
        "options": [
          "경쟁사 블로그 URL만",
          "다른 팀 OKR 전체",
          "세그먼트 조건·지난 행동·제외 규칙·캠페인 목표"
        ],
        "correct": 2,
        "desc": "세그먼트와 목표를 알려야 리마케팅 플로우가 현실적이다.",
        "enemyType": "worm",
        "concept": "리마케팅 설계",
        "whyCorrect": "방문/장바구니/이탈 등 행동, 제외해야 할 세그먼트, 목표(재방문/구매)를 주면 AI가 빈도·창·크리에이티브까지 설계한다. 경쟁사 URL은 참고일 뿐이고 OKR 전체는 과잉 정보다. 필수 맥락이 없으면 엉뚱한 플로우가 나온다.",
        "whyWrong": {
          "0": "경쟁사 URL만으론 우리 데이터와 무관해 적용하기 어렵습니다.",
          "1": "OKR 전체는 목적과 다르게 너무 넓어 설계를 흐릴 수 있어요."
        },
        "realWorldTip": "빈도 캡과 크리에이티브 수를 함께 지정하면 예산 낭비를 막을 수 있다.",
        "skill": "context-giving",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "마케팅",
          "실무활용",
          "디버깅"
        ]
      }
    ],
    "advanced": [
      {
        "id": "marketer_practical_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "RFM 기반 세그먼트를 AI로 자동 생성할 때 첫 단계는?",
        "options": [
          "색상 팔레트를 고른다",
          "모델이 알아서 정하게 둔다",
          "최근/빈도/금액 기준과 컷오프 값을 정의한다"
        ],
        "correct": 2,
        "desc": "컷오프를 정의해야 세그먼트가 일관된다.",
        "enemyType": "virus",
        "concept": "세그먼트 설계",
        "whyCorrect": "최근성/구매 빈도/금액의 구간을 정해줘야 AI가 세그먼트를 안정적으로 나눈다. 팔레트는 시각 요소이고, 임의 분할은 재현성이 없다. 컷오프가 있어야 A/B와 자동화에 쓸 수 있다.",
        "whyWrong": {
          "0": "색상은 시각화용일 뿐 세그먼트 기준이 아닙니다.",
          "1": "임의로 나누면 매번 달라져 테스트가 어렵습니다."
        },
        "realWorldTip": "R/F/M 각각 3구간 정도로 시작해 성과 보며 조정하면 된다.",
        "skill": "context-giving",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "마케팅",
          "실무활용",
          "디버깅"
        ]
      },
      {
        "id": "marketer_practical_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "AI로 크리에이티브 대량 변형을 만들 때 안전장치는?",
        "options": [
          "모든 변형을 즉시 집행한다",
          "색상만 다양하게 바꾼다",
          "브랜드 가이드·금지 표현·리뷰 프로세스를 먼저 지정한다"
        ],
        "correct": 2,
        "desc": "가이드와 검수 흐름이 있어야 리스크를 줄인다.",
        "enemyType": "bug",
        "concept": "대량 생성 가드레일",
        "whyCorrect": "브랜드 톤, 금지 표현, 승인 흐름을 지정하면 대량 생성된 소재가 정책을 위반할 위험이 줄어든다. 즉시 집행은 사고를 부르고, 색상만 바꾸면 성과 개선이 제한적이다. 가드레일을 세우는 게 우선이다.",
        "whyWrong": {
          "0": "검수 없이 집행하면 브랜드/정책 리스크가 큽니다.",
          "1": "색상만 바꾸면 메시지/오퍼 테스트가 되지 않아 효과가 낮습니다."
        },
        "realWorldTip": "승인된 문구/이미지 스니펫을 라이브러리화해 AI 프롬프트에 넣으면 품질이 안정된다.",
        "skill": "result-validation",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "마케팅",
          "실무활용",
          "코드리뷰"
        ]
      }
    ]
  },
  "prompt": {
    "beginner": [
      {
        "id": "marketer_prompt_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "AI로 광고 카피를 요청할 때 프롬프트에 꼭 넣을 항목은?",
        "options": [
          "이모지 잔뜩",
          "아무 맥락 없이 짧게",
          "목표 지표·페르소나·톤·분량"
        ],
        "correct": 2,
        "desc": "지표와 톤을 주면 카피가 목표에 맞게 나온다.",
        "enemyType": "glitch",
        "concept": "카피 프롬프트",
        "whyCorrect": "CTR/전환 목표, 타깃, 톤, 분량을 명시하면 AI가 방향을 잡는다. 맥락 없는 요청은 일반론만 나오고, 이모지 남발은 채널 정책을 깨거나 톤을 흐릴 수 있다. 명시가 품질을 높인다.",
        "whyWrong": {
          "0": "이모지는 보조일 뿐, 핵심 지시가 없으면 품질이 떨어집니다.",
          "1": "맥락이 없으면 우리 캠페인과 맞지 않는 카피가 나옵니다."
        },
        "realWorldTip": "채널 정책(예: 30자 제한, 특정 금지어)을 프롬프트에 넣어 바로 검수 가능하게 하세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "마케팅",
          "프롬프트작성",
          "코드리뷰"
        ]
      },
      {
        "id": "marketer_prompt_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "랜딩 페이지 섹션 구성을 AI에 맡길 때 좋은 지시는?",
        "options": [
          "배경음악 취향만 말한다",
          "섹션 순서·필수 메시지·증거 자료를 제시한다",
          "AI에게 전부 자유롭게 맡긴다"
        ],
        "correct": 1,
        "desc": "섹션과 증거를 알려줘야 설득 구조가 잡힌다.",
        "enemyType": "worm",
        "concept": "랜딩 프롬프트",
        "whyCorrect": "문제-해결-증거-CTA 순서와 사회적 증거(후기/수치)를 주면 AI가 설득 흐름을 만든다. 음악 취향은 무관하고, 자유 방임은 길이와 톤이 들쑥날쑥해진다.",
        "whyWrong": {
          "0": "음악은 랜딩 복사에서 영향이 거의 없습니다.",
          "2": "구조 없이 맡기면 다시 재작성해야 할 확률이 큽니다."
        },
        "realWorldTip": "프롬프트에 '각 섹션 2~3문장'처럼 길이 제한을 넣으면 스캔 가능한 초안이 나온다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "마케팅",
          "프롬프트작성",
          "커뮤니케이션"
        ]
      },
      {
        "id": "marketer_prompt_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "리포트 요약을 AI에 시킬 때 결과물 형식을 어떻게 지정해야 할까?",
        "options": [
          "핵심 지표·인사이트·액션 아이템을 불릿으로 요구한다",
          "감성 에세이로 써달라고 한다",
          "길이를 제한하지 않는다"
        ],
        "correct": 0,
        "desc": "형식을 정하면 재편집 없이 바로 쓸 수 있다.",
        "enemyType": "bug",
        "concept": "요약 프롬프트",
        "whyCorrect": "지표/인사이트/액션을 구조화해 달라 하면 발표나 메일에 바로 붙일 수 있다. 감성 에세이나 길이 무제한은 핵심을 흐리고 편집 부담을 키운다. 형식 지정이 효율적이다.",
        "whyWrong": {
          "1": "에세이 톤은 보고서 요약과 맞지 않아 실무 활용이 어렵습니다.",
          "2": "길이 제한이 없으면 장황한 요약이 되어 다시 줄여야 합니다."
        },
        "realWorldTip": "발표 슬라이드용이면 '슬라이드 1장당 3불릿'처럼 더 구체적으로 제한해 보세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "analysis",
        "tags": [
          "마케팅",
          "프롬프트작성",
          "데이터분석"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "marketer_prompt_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI에게 광고 정책 위반 검수를 맡길 때 프롬프트에 필요한 것은?",
        "options": [
          "색상 팔레트",
          "브랜드 역사",
          "플랫폼 정책 요약과 금지어 리스트"
        ],
        "correct": 2,
        "desc": "정책 기준과 금지어가 있어야 위반을 잡아낸다.",
        "enemyType": "trojan",
        "concept": "정책 검수",
        "whyCorrect": "채널별 금지 표현과 예시를 주면 AI가 카피를 정책에 맞춰 점검한다. 팔레트나 역사만으론 위반 여부를 판단할 수 없다. 기준이 없으면 검수가 느슨해진다.",
        "whyWrong": {
          "0": "색상은 시각 요소일 뿐 정책 위반과 직접 관련이 없습니다.",
          "1": "브랜드 역사는 톤엔 도움이 되지만 정책 검수 기준은 아닙니다."
        },
        "realWorldTip": "위반 유형별 예시를 2~3개 넣어주면 탐지 정확도가 오른다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "마케팅",
          "프롬프트작성",
          "콘텐츠제작"
        ]
      },
      {
        "id": "marketer_prompt_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI로 페르소나별 메시지 매트릭스를 만들 때 좋은 입력은?",
        "options": [
          "페르소나 이름만 던진다",
          "페르소나 특성·페인포인트·주요 이득을 표 형태로 준다",
          "모호한 감정 단어만 준다"
        ],
        "correct": 1,
        "desc": "특성과 페인포인트를 알려줘야 메시지가 정렬된다.",
        "enemyType": "virus",
        "concept": "메시지 매트릭스",
        "whyCorrect": "성별/직무/목표/고민을 표로 주면 AI가 혜택·증거·CTA를 페르소나별로 매칭한다. 이름만 주면 맥락이 없고, 감정 단어만으론 메시지 설계가 어렵다. 구체성이 필요하다.",
        "whyWrong": {
          "0": "이름만으론 어떤 문제가 있는지 알 수 없습니다.",
          "2": "감정만 있으면 혜택 설계가 불명확해요. 특성이 필요합니다."
        },
        "realWorldTip": "각 페르소나에 '선호 채널'을 함께 넣으면 배포 계획까지 한 번에 뽑을 수 있다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "마케팅",
          "프롬프트작성",
          "기획설계"
        ]
      },
      {
        "id": "marketer_prompt_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI에게 인사이트 설명을 시킬 때 환각을 줄이는 방법은?",
        "options": [
          "원본 지표와 출처를 포함해 '근거 없으면 없음'을 명시한다",
          "창의력을 극대화하라고 지시한다",
          "길이를 마음껏 쓰게 한다"
        ],
        "correct": 0,
        "desc": "출처와 부정 가능성을 명시하면 근거 없는 해석을 줄인다.",
        "enemyType": "glitch",
        "concept": "환각 방지",
        "whyCorrect": "지표와 출처를 함께 주고, 근거 없으면 없음이라고 답하라 하면 AI가 추측을 줄인다. 창의력 강화나 길이 무제한은 오히려 허구를 늘린다. 근거 요구가 신뢰도를 높인다.",
        "whyWrong": {
          "1": "창의력 강조는 분석보다 스토리텔링에 치우쳐 위험합니다.",
          "2": "길이 제한 없이는 불필요한 서술이 많아집니다."
        },
        "realWorldTip": "표로 요약 후 설명하도록 요구하면 숫자-설명이 짝지어져 검증이 쉽다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "마케팅",
          "프롬프트작성",
          "커뮤니케이션"
        ]
      }
    ],
    "advanced": [
      {
        "id": "marketer_prompt_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "자동 리포트 생성 워크플로우에서 출력 형식을 어떻게 지시해야 할까?",
        "options": [
          "지표/인사이트/액션을 JSON 필드로 고정한다",
          "소설 형식으로 길게 쓰게 둔다",
          "스크린샷만 보내달라 한다"
        ],
        "correct": 0,
        "desc": "구조화된 출력이 있어야 자동 파이프라인에 넣을 수 있다.",
        "enemyType": "worm",
        "concept": "구조화 출력",
        "whyCorrect": "JSON 스키마로 필드를 고정하면 대시보드/슬랙에 바로 붙일 수 있다. 소설형은 다시 파싱해야 하고, 스크린샷은 자동화와 맞지 않는다. 형식 통제가 자동화를 안전하게 만든다.",
        "whyWrong": {
          "1": "서술형은 사람이 재정리해야 해 자동화 이점이 사라집니다.",
          "2": "스크린샷은 텍스트 파이프라인과 호환되지 않습니다."
        },
        "realWorldTip": "스키마 검증을 추가해 잘못된 필드는 바로 경고하게 설정하세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "analysis",
        "tags": [
          "마케팅",
          "프롬프트작성",
          "데이터분석"
        ]
      },
      {
        "id": "marketer_prompt_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "다국어 카피 생성 시 품질을 유지하려면 프롬프트에 무엇을 넣을까?",
        "options": [
          "번역기만 돌리게 둔다",
          "언어별 금지 표현·톤·길이 제한과 리뷰 기준",
          "언어 선택을 AI에게 맡긴다"
        ],
        "correct": 1,
        "desc": "언어별 가이드와 리뷰 기준이 있어야 품질이 유지된다.",
        "enemyType": "virus",
        "concept": "다국어 프롬프트",
        "whyCorrect": "언어마다 금지 표현, 톤, 길이, 리뷰 체크리스트를 주면 문화적 오해를 줄인다. 단순 번역기는 뉘앙스를 놓치고, 언어 선택을 맡기면 우선순위가 어긋난다. 구체적 가이드가 필요하다.",
        "whyWrong": {
          "0": "번역기만 쓰면 브랜드 톤이 깨질 수 있습니다.",
          "2": "언어 선택을 맡기면 비즈니스 우선순위를 반영하지 못합니다."
        },
        "realWorldTip": "언어별 승인된 예시 카피를 1~2개 넣어주면 톤과 표현이 안정된다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "마케팅",
          "프롬프트작성",
          "코드리뷰"
        ]
      }
    ]
  },
  "tools": {
    "beginner": [
      {
        "id": "marketer_tools_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "소규모 카피 수정에 가장 효율적인 도구는?",
        "options": [
          "대형 챗모델에 장문 설명",
          "수작업만 고집",
          "에디터 내 AI 리라이팅"
        ],
        "correct": 2,
        "desc": "짧은 수정은 에디터 내 리라이팅이 가장 빠르다.",
        "enemyType": "glitch",
        "concept": "도구 선택",
        "whyCorrect": "문장 단위 수정은 에디터/브라우저 확장 리라이팅이 속도와 맥락 모두 좋다. 장문 챗은 과잉이고, 수작업만 하면 시간이 늘어난다. 상황에 맞는 도구가 생산성을 높인다.",
        "whyWrong": {
          "0": "챗모델은 길고 복잡한 맥락에 적합해요. 반복 패턴엔 과합니다.",
          "1": "수작업만 고집하면 속도가 느려지고 휴먼 에러가 늘 수 있어요. 도구를 활용해 보세요."
        },
        "realWorldTip": "리라이팅 요청 시 길이/톤을 함께 지정하면 재수정이 줄어든다.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "마케팅",
          "도구선택",
          "콘텐츠제작"
        ]
      },
      {
        "id": "marketer_tools_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "성과 분석이 필요한 긴 리포트 초안을 만들 때 적합한 접근은?",
        "options": [
          "대화형 챗모델에 지표와 맥락을 붙여 요청한다",
          "CSS 린터를 돌린다",
          "색상 테마만 설정한다"
        ],
        "correct": 0,
        "desc": "분석/스토리텔링은 챗모델에 맥락을 줘야 한다.",
        "enemyType": "bug",
        "concept": "모델 선택",
        "whyCorrect": "숫자와 맥락을 함께 준 챗모델은 이야기 구조와 인사이트를 제안한다. CSS 린터나 색상 설정은 구조적 의사결정과 무관하다. 맥락을 넉넉히 주면 위험 요소를 더 잘 짚는다.",
        "whyWrong": {
          "1": "린터는 코드 품질 도구라 분석과 관계없습니다.",
          "2": "색상은 시각적 요소일 뿐 인사이트에는 영향을 주지 않습니다."
        },
        "realWorldTip": "지표 표와 목표를 함께 붙이면 챗모델이 갭 분석을 자동으로 해준다.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "마케팅",
          "도구선택",
          "커뮤니케이션"
        ]
      },
      {
        "id": "marketer_tools_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "과거 캠페인 데이터를 활용하려면 어떤 흐름이 좋을까?",
        "options": [
          "전체 데이터베이스를 통째로 붙인다",
          "스프레드시트 요약→핵심만 발췌→챗모델에 질문",
          "결과만 기억에 의존한다"
        ],
        "correct": 1,
        "desc": "핵심 발췌를 주면 정확도와 속도를 모두 얻는다.",
        "enemyType": "virus",
        "concept": "맥락 추출",
        "whyCorrect": "중요 지표와 메모를 발췌해 주면 토큰을 아끼면서 정확히 대답한다. 통째 입력은 한도를 넘기고, 기억만 의존하면 오류가 난다. 발췌가 효율적이다.",
        "whyWrong": {
          "0": "통째로 붙이면 한도/보안 문제가 생길 수 있어요.",
          "2": "기억만 의존하면 숫자/날짜를 잘못 기억할 수 있습니다."
        },
        "realWorldTip": "최근 3개 캠페인의 KPI와 주요 실험 결과만 뽑아두는 템플릿을 유지해두세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "마케팅",
          "도구선택",
          "디버깅"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "marketer_tools_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "GA4 데이터 요약을 챗모델로 받을 때 정확도를 높이는 방법은?",
        "options": [
          "대시보드 스크린샷만 보낸다",
          "색상을 바꾼다",
          "쿼리 결과 표와 정의를 함께 전달한다"
        ],
        "correct": 2,
        "desc": "데이터와 정의를 함께 줘야 오해를 줄인다.",
        "enemyType": "worm",
        "concept": "데이터 요약",
        "whyCorrect": "표와 지표 정의(세션/사용자 등)를 주면 AI가 정확히 해석한다. 스크린샷만으론 수치를 읽기 어렵고, 색상은 의미를 전달하지 못한다.",
        "whyWrong": {
          "0": "스크린샷은 OCR 한계로 숫자를 잘못 읽을 수 있어요.",
          "1": "색상 변경은 해석에 영향을 주지 않습니다."
        },
        "realWorldTip": "지표 정의와 세그먼트 조건을 함께 넣으면 엉뚱한 인사이트를 줄인다.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "analysis",
        "tags": [
          "마케팅",
          "도구선택",
          "데이터분석"
        ]
      },
      {
        "id": "marketer_tools_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "크리에이티브 태그 자동화를 도입할 때 고려할 점은?",
        "options": [
          "즉시 전 소재에 자동 태깅을 적용한다",
          "태그 스키마·정의·검수 프로세스를 먼저 만든다",
          "태그를 자유롭게 생성하게 둔다"
        ],
        "correct": 1,
        "desc": "스키마와 검수가 없으면 태그가 난잡해진다.",
        "enemyType": "trojan",
        "concept": "태깅 거버넌스",
        "whyCorrect": "태그 스키마와 정의를 정하고, 샘플 검수를 거쳐야 일관성 있게 집계된다. 즉시 전 소재에 적용하면 오류가 쌓이고, 자유 생성은 중복/오타가 생긴다.",
        "whyWrong": {
          "0": "검수 없이 전면 적용하면 잘못된 태그로 리포트가 틀어질 수 있습니다.",
          "2": "자유 태그는 나중에 정리 비용이 큽니다."
        },
        "realWorldTip": "태그 목록을 분기별로 동결하고, 추가 시 변경 로그를 남기세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "마케팅",
          "도구선택",
          "디버깅"
        ]
      },
      {
        "id": "marketer_tools_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "대규모 콘텐츠 캘린더를 AI로 작성할 때 챙길 설정은?",
        "options": [
          "채널별 빈도·주제 버킷·금지 토픽을 명시한다",
          "날짜만 던진다",
          "AI가 자유롭게 정하게 둔다"
        ],
        "correct": 0,
        "desc": "빈도와 토픽 기준이 있어야 일정이 현실적이다.",
        "enemyType": "bug",
        "concept": "캘린더 자동화",
        "whyCorrect": "채널별 업로드 빈도, 주제 버킷, 금지 토픽을 주면 AI가 겹치지 않는 일정과 아이디어를 채운다. 날짜만 주거나 전적으로 맡기면 비현실적인 계획이 나온다.",
        "whyWrong": {
          "1": "날짜만으론 무엇을 올릴지 몰라 도움이 적습니다.",
          "2": "완전 자유는 브랜드 위험이나 리소스 초과 일정을 만들 수 있어요."
        },
        "realWorldTip": "성수기/비수기 메모를 함께 주면 업다운에 맞게 빈도를 조절해 준다.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "마케팅",
          "도구선택",
          "기획설계"
        ]
      }
    ],
    "advanced": [
      {
        "id": "marketer_tools_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "RAG로 브랜드 가이드를 연결할 때 핵심 설정은?",
        "options": [
          "PDF를 통째로 붙이기만",
          "섹션별 청크·임베딩·출처 링크 반환",
          "파라미터만 바꾸기"
        ],
        "correct": 1,
        "desc": "청크와 출처가 있어야 답을 검증할 수 있다.",
        "enemyType": "virus",
        "concept": "브랜드 RAG",
        "whyCorrect": "가이드 섹션을 잘게 나눠 임베딩하고, 답변에 출처 링크를 붙이면 톤/금지어를 정확히 반영한다. 통째 입력이나 파라미터 조정만으론 잘못된 인용이 늘어난다.",
        "whyWrong": {
          "0": "통째 입력은 노이즈가 많아 엉뚱한 답이 나옵니다.",
          "2": "파라미터 조정만으론 검색 품질이 개선되지 않습니다."
        },
        "realWorldTip": "출처를 함께 반환하게 하면 에디터가 바로 검증하고 수정할 수 있다.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "마케팅",
          "도구선택",
          "커뮤니케이션"
        ]
      },
      {
        "id": "marketer_tools_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "광고 카피 자동 집행 파이프라인의 최소 가드레일은?",
        "options": [
          "샌드박스 검수·AB 테스트 샘플·승인 플로우",
          "바로 전체 예산 집행",
          "로깅 없이 실행"
        ],
        "correct": 0,
        "desc": "검수와 작은 샘플링이 있어야 위험을 줄인다.",
        "enemyType": "worm",
        "concept": "자동 집행 안전",
        "whyCorrect": "샌드박스에서 정책 검수 후 소량 예산으로 시험하고, 승인 후 확대해야 한다. 바로 전체 집행이나 로깅 없음은 리스크가 크다. 가드레일이 없으면 브랜드/비용 사고가 난다.",
        "whyWrong": {
          "1": "전체 집행은 오류가 있을 때 손실이 크게 발생합니다.",
          "2": "로그가 없으면 문제가 나도 원인을 찾을 수 없습니다."
        },
        "realWorldTip": "자동 생성 카피에는 항상 'AI 생성' 태그와 실험 ID를 남겨 추적 가능하게 하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "마케팅",
          "도구선택",
          "콘텐츠제작"
        ]
      }
    ]
  },
  "ethics": {
    "beginner": [
      {
        "id": "marketer_ethics_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "고객 데이터를 외부 모델에 보낼 때 첫 체크는?",
        "options": [
          "전체 CSV를 그대로 업로드",
          "PII 마스킹·목적 제한·필수 최소 데이터만 사용",
          "동의 여부를 확인하지 않는다"
        ],
        "correct": 1,
        "desc": "민감 정보는 줄이고 목적을 명확히 해야 한다.",
        "enemyType": "trojan",
        "concept": "데이터 최소화",
        "whyCorrect": "PII를 가리고 목적을 제한하면 유출 위험을 낮춘다. 전체 CSV 업로드나 동의 무시는 규정 위반 가능성이 크다. 최소 데이터만 쓰는 것이 기본이다.",
        "whyWrong": {
          "0": "전체 업로드는 유출/재식별 위험이 큽니다.",
          "2": "동의 확인 없이 쓰면 법적 리스크가 생깁니다."
        },
        "realWorldTip": "샘플링과 마스킹 스크립트를 템플릿화해 반복해서 쓰세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "analysis",
        "tags": [
          "마케팅",
          "윤리보안",
          "데이터분석"
        ]
      },
      {
        "id": "marketer_ethics_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "AI가 만든 카피에 저작권 리스크를 줄이려면?",
        "options": [
          "바로 대규모 집행",
          "상표/금지어 스캔과 정책 검수를 거친다",
          "출처를 묻지 않는다"
        ],
        "correct": 1,
        "desc": "상표/정책 검수를 해야 침해 리스크를 줄인다.",
        "enemyType": "virus",
        "concept": "저작권/브랜드",
        "whyCorrect": "상표명, 경쟁사 명칭, 금지 표현을 스캔하고 정책 검수를 하면 침해 위험을 줄인다. 바로 집행하거나 출처를 안 묻는 건 위험하다.",
        "whyWrong": {
          "0": "대규모 집행은 오류가 있을 때 피해가 커집니다.",
          "2": "출처 확인 없이는 표절/침해를 막기 어렵습니다."
        },
        "realWorldTip": "브랜드/정책 키워드를 정기적으로 업데이트해 검수 프롬프트에 포함시키세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "마케팅",
          "윤리보안",
          "콘텐츠제작"
        ]
      },
      {
        "id": "marketer_ethics_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "사용자 리뷰를 요약할 때 개인정보 노출을 막으려면?",
        "options": [
          "이름·이메일 등 식별자 제거 후 요약한다",
          "모든 리뷰 원문을 그대로 붙인다",
          "리뷰에 없는 정보도 추측한다"
        ],
        "correct": 0,
        "desc": "식별자를 지우고 요약해야 안전하다.",
        "enemyType": "glitch",
        "concept": "PII 보호",
        "whyCorrect": "식별자를 제거한 뒤 요약하면 개인정보 노출 없이 인사이트를 얻는다. 원문 그대로는 유출 위험이 있고, 추측은 왜곡을 만든다.",
        "whyWrong": {
          "1": "원문은 PII를 포함할 수 있어 바로 공유하기 위험합니다.",
          "2": "추측은 사실과 다른 내용을 만들어 신뢰를 떨어뜨립니다."
        },
        "realWorldTip": "리뷰 요약 시 '개인정보 제거 여부' 체크리스트를 함께 사용하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "마케팅",
          "윤리보안",
          "코드리뷰"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "marketer_ethics_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "외부 벤더 모델을 사용할 때 확인해야 할 계약 조건은?",
        "options": [
          "데이터 사용 범위·보관 기간·서브프로세서 공개",
          "UI 테마",
          "폰트 스타일"
        ],
        "correct": 0,
        "desc": "데이터 처리 조건을 확인해야 규정 위반을 막는다.",
        "enemyType": "worm",
        "concept": "벤더 거버넌스",
        "whyCorrect": "사용 범위, 보관 기간, 서브프로세서를 확인해야 개인정보/성과 데이터가 오남용되지 않는다. 테마나 폰트는 계약 리스크와 무관하다. 계약 조건이 기본이다.",
        "whyWrong": {
          "1": "테마는 시각 요소일 뿐 보안/규정과 관련 없습니다.",
          "2": "폰트 스타일도 계약 리스크와 무관합니다."
        },
        "realWorldTip": "DPA와 SOC2/ISO 등 인증 여부를 함께 확인해 기록하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "analysis",
        "tags": [
          "마케팅",
          "윤리보안",
          "데이터분석"
        ]
      },
      {
        "id": "marketer_ethics_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI가 만든 성과 인사이트를 외부 공유할 때 주의할 점은?",
        "options": [
          "민감 지표 마스킹·컨텍스트 명시·과장 표현 금지",
          "숫자를 크게 부풀린다",
          "경쟁사 데이터와 섞어 공유한다"
        ],
        "correct": 0,
        "desc": "맥락과 정확성을 지켜야 신뢰를 유지한다.",
        "enemyType": "bug",
        "concept": "대외 커뮤니케이션",
        "whyCorrect": "민감 지표를 가리고, 비교 기준을 명시하며, 과장 없이 전달해야 신뢰를 잃지 않는다. 부풀리거나 경쟁사 데이터 혼합은 법적/윤리적 리스크가 크다.",
        "whyWrong": {
          "1": "과장은 신뢰를 잃고 규제 위험을 높입니다.",
          "2": "경쟁사 데이터 혼합은 부정확하고 법적 문제가 될 수 있습니다."
        },
        "realWorldTip": "외부 공유본엔 내부용 지표와 별도 필터를 적용해 자동으로 숨기도록 설정하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "마케팅",
          "윤리보안",
          "커뮤니케이션"
        ]
      },
      {
        "id": "marketer_ethics_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "타겟팅 모델을 만들 때 편향을 줄이려면?",
        "options": [
          "성과 높은 그룹만 더 강화한다",
          "편향을 신경 쓰지 않는다",
          "민감 특성 제외·공정성 지표 모니터링·샘플 균형 확인"
        ],
        "correct": 2,
        "desc": "민감 특성을 통제하고 공정성을 모니터링해야 한다.",
        "enemyType": "virus",
        "concept": "편향 완화",
        "whyCorrect": "민감 특성을 제외하거나 가중치를 조정하고, 공정성 지표를 모니터링해야 차별적 타겟팅을 줄일 수 있다. 성과만 보고 강화하면 편향이 커지고, 무시하면 규제/브랜드 리스크가 생긴다.",
        "whyWrong": {
          "0": "성과만 강화하면 특정 집단을 과도하게 제외할 수 있습니다.",
          "1": "편향을 무시하면 법적/브랜드 피해가 발생할 수 있어요."
        },
        "realWorldTip": "정기적으로 샘플을 리샘플링하고 공정성 지표를 대시보드로 모니터링하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "analysis",
        "tags": [
          "마케팅",
          "윤리보안",
          "데이터분석"
        ]
      }
    ],
    "advanced": [
      {
        "id": "marketer_ethics_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "광고 자동화 시스템 로그에 남겨야 할 최소 정보는?",
        "options": [
          "전체 입력 평문",
          "캠페인 ID·입력 데이터 타입·민감도 태그·결과 요약",
          "아무 로그도 남기지 않는다"
        ],
        "correct": 1,
        "desc": "추적성과 프라이버시를 함께 지켜야 한다.",
        "enemyType": "bug",
        "concept": "감사 로그",
        "whyCorrect": "캠페인/요청 ID와 데이터 타입/민감도만 기록하고 입력은 요약/마스킹하면 사고 시 추적 가능하면서 유출 위험을 낮춘다. 평문 전체 저장은 위험하고, 로그가 없으면 원인 파악이 불가능하다. 최소 필드 로그가 현실적이다.",
        "whyWrong": {
          "0": "평문 저장은 유출 시 피해가 큽니다.",
          "2": "로그가 없으면 문제를 추적할 수 없습니다."
        },
        "realWorldTip": "민감도에 따라 로그 보존 기간을 자동으로 다르게 적용하면 규정 준수가 쉬워진다.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "마케팅",
          "윤리보안",
          "디버깅"
        ]
      },
      {
        "id": "marketer_ethics_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "AI 자동 집행 봇에 부여할 최소 권한 원칙은?",
        "options": [
          "읽기/제안 권한 중심, 집행은 승인 후에만",
          "전체 관리자 권한 부여",
          "비밀키를 로그에 노출"
        ],
        "correct": 0,
        "desc": "최소 권한과 승인 플로우가 안전성을 만든다.",
        "enemyType": "trojan",
        "concept": "권한 최소화",
        "whyCorrect": "제안/리포트 권한까지만 주고, 집행은 사람이 승인해야 위험한 자동 변경을 막을 수 있다. 관리자 권한이나 키 노출은 심각한 사고로 이어진다.",
        "whyWrong": {
          "1": "전체 권한은 오동작 시 큰 손실을 낳습니다.",
          "2": "키 노출은 즉시 보안 사고로 이어집니다."
        },
        "realWorldTip": "집행 봇이 남긴 제안에는 항상 근거 데이터를 첨부하게 해 검증을 쉽게 하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "마케팅",
          "윤리보안",
          "디버깅"
        ]
      }
    ]
  },
  "advanced": {
    "beginner": [
      {
        "id": "marketer_advanced_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "자동화된 리드 라우팅을 설계할 때 먼저 정의할 것은?",
        "options": [
          "배경색",
          "입력 필드와 라우팅 규칙 스키마",
          "캠페인 슬로건"
        ],
        "correct": 1,
        "desc": "필드와 규칙이 있어야 자동 라우팅이 가능하다.",
        "enemyType": "glitch",
        "concept": "워크플로 스키마",
        "whyCorrect": "필수/선택 입력과 조건을 정의해야 AI가 영업/CS로 정확히 배분한다. 배경색이나 슬로건은 라우팅과 무관하다. 스키마가 우선이다.",
        "whyWrong": {
          "0": "색상은 라우팅 로직에 영향을 주지 않습니다.",
          "2": "슬로건은 메시지일 뿐 데이터 흐름과 무관합니다."
        },
        "realWorldTip": "필드 정의에 '수집 근거(UTM)'를 포함하면 소스별 성과 트래킹이 쉬워진다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "마케팅",
          "자동화설계",
          "기획설계"
        ]
      },
      {
        "id": "marketer_advanced_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "프롬프트 회귀 테스트를 마케팅 워크플로에 도입할 때 첫 단계는?",
        "options": [
          "핵심 입력/출력을 스냅샷으로 저장해 기준을 만든다",
          "매번 감으로 판단한다",
          "테스트를 한두 개로 줄인다"
        ],
        "correct": 0,
        "desc": "스냅샷이 있어야 모델 업데이트 시 품질 변화를 잡는다.",
        "enemyType": "bug",
        "concept": "프롬프트 회귀",
        "whyCorrect": "주요 카피/세그먼트 추천 요청과 기대 출력을 스냅샷으로 저장하면 모델 변경 후 비교가 쉽다. 감에 의존하거나 테스트를 줄이면 회귀를 놓친다.",
        "whyWrong": {
          "1": "감에 의존하면 품질 변화를 정량화할 수 없습니다.",
          "2": "테스트가 너무 적으면 커버리지가 부족합니다."
        },
        "realWorldTip": "스냅샷을 버전 관리해 모델 릴리스별 점수를 기록하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "마케팅",
          "자동화설계",
          "코드리뷰"
        ]
      },
      {
        "id": "marketer_advanced_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "LLM 응답 캐싱을 마케팅 챗봇에 쓸 때 유의할 점은?",
        "options": [
          "키에 모델 버전·지식 버전을 포함해 무효화 기준을 만든다",
          "모든 답을 무조건 캐싱한다",
          "캐싱을 아예 사용하지 않는다"
        ],
        "correct": 0,
        "desc": "버전 포함 키가 있어야 잘못된 답 재사용을 막는다.",
        "enemyType": "virus",
        "concept": "캐싱 설계",
        "whyCorrect": "모델/지식 스냅샷이 바뀌면 캐시를 무효화할 수 있어야 한다. 무조건 캐싱은 컨텍스트가 달라도 오래된 답을 반환할 수 있고, 미사용은 비용을 높인다. 키/버전 설계가 품질과 비용을 모두 잡는다.",
        "whyWrong": {
          "1": "무조건 캐싱은 잘못된 답을 계속 돌려줄 수 있어요. 키 설계가 필요합니다.",
          "2": "캐싱을 안 하면 같은 질문에도 비용이 계속 듭니다. 균형이 중요해요."
        },
        "realWorldTip": "FAQ 업데이트 시 지식 스냅샷 ID를 바꿔 캐시 무효화를 자동화하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "마케팅",
          "자동화설계",
          "코드리뷰"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "marketer_advanced_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "퍼널별 KPI를 자동 모니터링하려면 무엇을 정의해야 할까?",
        "options": [
          "KPI 임계값·알람 조건·폴백 액션",
          "색상 테마",
          "폰트 굵기"
        ],
        "correct": 0,
        "desc": "임계값과 대응 액션이 있어야 자동 알람이 의미가 있다.",
        "enemyType": "glitch",
        "concept": "모니터링 설계",
        "whyCorrect": "임계값과 알람 채널, 폴백 액션을 정해야 알람이 실질적으로 대응으로 이어진다. 테마/폰트는 영향이 없다.",
        "whyWrong": {
          "1": "테마는 모니터링 동작과 무관합니다.",
          "2": "폰트는 가독성 요소일 뿐입니다."
        },
        "realWorldTip": "임계값은 주간/일간 두 수준으로 나눠 경보 빈도를 조절하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "마케팅",
          "자동화설계",
          "기획설계"
        ]
      },
      {
        "id": "marketer_advanced_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "마케팅 에이전트가 여러 도구를 호출할 때 필요한 정의는?",
        "options": [
          "도구를 임의로 아무 때나 쓰게 둔다",
          "사용자 입력을 그대로 시스템 명령으로 실행한다",
          "각 도구의 입출력·타임아웃·재시도 정책"
        ],
        "correct": 2,
        "desc": "툴 계약이 없으면 예측 불가 동작이 생긴다.",
        "enemyType": "trojan",
        "concept": "툴 오케스트레이션",
        "whyCorrect": "입출력과 실패 처리, 타임아웃을 정의해야 도구 호출이 안전하다. 임의 호출이나 원본 명령 실행은 보안/품질 문제를 만든다.",
        "whyWrong": {
          "0": "임의 호출은 잘못된 순서/중복 호출로 이어져요. 규칙이 필요합니다.",
          "1": "원본 명령 실행은 인젝션 위험이 큽니다. 필터링과 계약이 필수입니다."
        },
        "realWorldTip": "툴 호출 로그를 남기고 실패 패턴을 학습시키면 에이전트 품질이 올라간다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "마케팅",
          "자동화설계",
          "디버깅"
        ]
      },
      {
        "id": "marketer_advanced_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "카피 생성 품질을 평가할 때 봐야 할 조합은?",
        "options": [
          "길이만 본다",
          "감정이입만 본다",
          "CTR/전환·톤 일관성·규정 준수·비용"
        ],
        "correct": 2,
        "desc": "성과·브랜드·규정·비용을 함께 봐야 한다.",
        "enemyType": "virus",
        "concept": "품질 평가",
        "whyCorrect": "성과 지표와 톤/브랜드 일관성, 정책 준수, 비용을 함께 봐야 운영 품질을 판단할 수 있다. 길이나 감정만 보면 실무 품질을 놓친다.",
        "whyWrong": {
          "0": "길이만으론 품질을 알 수 없습니다.",
          "1": "감정이입만 보면 규정/성과를 놓칠 수 있어요."
        },
        "realWorldTip": "정량 지표와 휴먼 리뷰 점수를 함께 기록해 모델 변경 전후를 비교하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "마케팅",
          "자동화설계",
          "코드리뷰"
        ]
      }
    ],
    "advanced": [
      {
        "id": "marketer_advanced_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "캠페인 자동 최적화 파이프라인의 필수 단계는?",
        "options": [
          "변수 제안 후 바로 전체 적용",
          "로그 없이 무제한 반복",
          "분석→변수 제안→소량 실험→검증→확대"
        ],
        "correct": 2,
        "desc": "실험과 검증 단계를 거쳐야 안전하게 확대한다.",
        "enemyType": "bug",
        "concept": "자동 최적화",
        "whyCorrect": "변수를 제안하고 소량 실험 후 검증해야 대규모 확대가 안전하다. 바로 전체 적용이나 로그 없음은 손실을 키운다.",
        "whyWrong": {
          "0": "즉시 전체 적용은 실패 시 비용 손실이 큽니다.",
          "1": "로그가 없으면 원인 파악이 불가합니다."
        },
        "realWorldTip": "실험에는 예산 캡과 종료 조건을 함께 설정하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "마케팅",
          "자동화설계",
          "디버깅"
        ]
      },
      {
        "id": "marketer_advanced_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "LLM 기반 챗봇 SLA를 지키기 위한 기술 조합은?",
        "options": [
          "테마 변경",
          "폰트 변경",
          "캐시·폴백 답변·서킷브레이커·SLI 알람"
        ],
        "correct": 2,
        "desc": "캐시/폴백/차단/관측이 함께 있어야 SLA를 지킨다.",
        "enemyType": "virus",
        "concept": "신뢰성",
        "whyCorrect": "자주 묻는 질문 캐시, 모델 장애 시 폴백, 에러 폭증 시 차단, 지연/성공률 알람이 있어야 운영 안정성이 생긴다. 테마나 폰트는 SLA와 무관하다.",
        "whyWrong": {
          "0": "테마는 가용성과 관계없습니다.",
          "1": "폰트는 신뢰성에 영향을 주지 않습니다."
        },
        "realWorldTip": "SLI를 대시보드로 노출하고 정기적으로 폴백 리허설을 돌리세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "마케팅",
          "자동화설계",
          "디버깅"
        ]
      }
    ]
  }
};

// 영업 직무 40문항
const SALES_QUESTIONS = {
  "practical": {
    "beginner": [
      {
        "id": "sales_practical_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "제안서 초안을 AI에 맡길 때 가장 먼저 제공할 정보는?",
        "options": [
          "팀 회식 장소",
          "고객 산업·문제·제안 가치·예산 범위",
          "경쟁사 로고"
        ],
        "correct": 1,
        "desc": "고객 맥락과 예산을 줘야 제안이 현실적이다.",
        "enemyType": "glitch",
        "concept": "제안 브리프",
        "whyCorrect": "산업/문제/가치/예산을 알려주면 AI가 적정 패키지와 강조점을 잡는다. 회식 정보나 로고만으론 제안 방향을 잡기 어렵다.",
        "whyWrong": {
          "0": "회식 장소는 제안과 관련이 없습니다.",
          "2": "로고만으론 고객 문제를 알 수 없어요."
        },
        "realWorldTip": "목표 KPI와 성공 사례 링크를 함께 넣으면 설득력이 높아진다.",
        "skill": "context-giving",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "영업",
          "실무활용",
          "콘텐츠제작"
        ]
      },
      {
        "id": "sales_practical_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "콜 요약을 AI에 맡길 때 반드시 넣어야 할 것?",
        "options": [
          "콜 목적·핵심 질문·다음 액션",
          "참석자 이름만",
          "콜 길이만"
        ],
        "correct": 0,
        "desc": "목적/질문/액션이 있어야 실행 가능한 요약이 된다.",
        "enemyType": "bug",
        "concept": "콜 요약",
        "whyCorrect": "콜의 목적과 나온 질문, 합의된 다음 액션을 주면 AI가 실행형 요약을 만든다. 이름이나 길이만으론 의미가 없다.",
        "whyWrong": {
          "1": "이름만으론 대화 내용을 알 수 없습니다.",
          "2": "길이만으론 무슨 일이 있었는지 알기 어렵습니다."
        },
        "realWorldTip": "요약에 담당자/기한을 포함하도록 지시하면 후속 관리가 쉬워진다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "영업",
          "실무활용",
          "콘텐츠제작"
        ]
      },
      {
        "id": "sales_practical_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "견적서 비교표를 AI에 만들게 할 때 필요한 입력은?",
        "options": [
          "회사 연혁",
          "사무실 주소",
          "제품 옵션·가격·할인 조건·약정 기간"
        ],
        "correct": 2,
        "desc": "옵션/가격/약정을 줘야 정확한 비교표가 나온다.",
        "enemyType": "worm",
        "concept": "견적 비교",
        "whyCorrect": "옵션별 가격과 할인, 약정 조건을 주면 AI가 경쟁력 포인트를 표로 만든다. 연혁이나 주소는 비교표에 필요 없다.",
        "whyWrong": {
          "0": "연혁은 비교 요소가 아닙니다.",
          "1": "주소는 가격 비교에 영향을 주지 않습니다."
        },
        "realWorldTip": "경쟁사 조건도 함께 넣으면 차별 포인트를 자동으로 강조해준다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "영업",
          "실무활용",
          "콘텐츠제작"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "sales_practical_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI에게 세일즈 이메일 시퀀스를 짜달라 할 때 먼저 정해야 할 것은?",
        "options": [
          "타깃 세그먼트·페인포인트·터치 횟수·간격",
          "배경음악",
          "폰트 스타일"
        ],
        "correct": 0,
        "desc": "세그먼트와 간격이 있어야 시퀀스가 현실적이다.",
        "enemyType": "virus",
        "concept": "이메일 시퀀스",
        "whyCorrect": "누구에게 어떤 문제를 해결하려 하는지, 몇 회/간격으로 보낼지 주면 AI가 적절한 메시지와 CTA를 배분한다. 음악/폰트는 설득 흐름과 무관하다.",
        "whyWrong": {
          "1": "음악은 이메일 설득과 관련 없습니다.",
          "2": "폰트 스타일보다 메시지/간격이 우선입니다."
        },
        "realWorldTip": "1~3회차는 문제 인식, 후반은 증거/CTA로 가이드하면 반응이 좋다.",
        "skill": "context-giving",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "영업",
          "실무활용",
          "커뮤니케이션"
        ]
      },
      {
        "id": "sales_practical_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "프루프 포인트를 AI로 뽑게 할 때 필요한 입력은?",
        "options": [
          "마케팅 색상 테마",
          "팀원 닉네임",
          "산업별 고객 사례와 수치, 유사 페인포인트"
        ],
        "correct": 2,
        "desc": "사례와 수치를 줘야 설득력 있는 프루프가 나온다.",
        "enemyType": "glitch",
        "concept": "프루프 설계",
        "whyCorrect": "유사 산업/문제에서 얻은 수치를 주면 AI가 맞춤 증거를 뽑는다. 색상/닉네임은 설득에 도움이 없다.",
        "whyWrong": {
          "0": "색상은 프루프와 관계없습니다.",
          "1": "닉네임은 설득 자료에 필요하지 않습니다."
        },
        "realWorldTip": "케이스 스터디 링크를 같이 넣어 근거를 바로 확인할 수 있게 하세요.",
        "skill": "context-giving",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "영업",
          "실무활용",
          "기획설계"
        ]
      },
      {
        "id": "sales_practical_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "RFP 응답 초안을 AI에 맡길 때 시간 절약 포인트는?",
        "options": [
          "RFP 제목만 보낸다",
          "질문-답변 매핑 테이블과 기존 참고 자료를 함께 준다",
          "모든 질문을 스스로 추측하게 둔다"
        ],
        "correct": 1,
        "desc": "매핑 테이블을 주면 초안 속도가 빨라진다.",
        "enemyType": "worm",
        "concept": "RFP 대응",
        "whyCorrect": "질문별 요구사항과 참고 자료를 매핑해주면 AI가 누락 없이 초안을 쓴다. 제목만 보내면 일반론이 나오고, 추측은 위험하다.",
        "whyWrong": {
          "0": "제목만으론 요구사항을 알 수 없습니다.",
          "2": "추측은 실수와 오답을 낳습니다."
        },
        "realWorldTip": "자주 쓰는 답변을 스니펫으로 모아 프롬프트에 첨부하면 품질이 안정된다.",
        "skill": "result-validation",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "영업",
          "실무활용",
          "코드리뷰"
        ]
      }
    ],
    "advanced": [
      {
        "id": "sales_practical_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "대형 고객 맞춤 제안서를 자동화할 때 필요한 검수 단계는?",
        "options": [
          "AI가 쓴 대로 바로 발송",
          "요구사항 매핑→법무/기술 검수→고객 맞춤 리뷰",
          "가격만 수정해 발송"
        ],
        "correct": 1,
        "desc": "검수 단계를 넣어야 리스크를 줄인다.",
        "enemyType": "bug",
        "concept": "제안 자동화 가드",
        "whyCorrect": "요구사항 충족 여부 확인 후 법무/기술 검수를 거치고, 고객 맥락을 리뷰해야 한다. 바로 발송이나 가격만 수정은 오류/위험을 키운다.",
        "whyWrong": {
          "0": "바로 발송은 오류나 위반 위험이 큽니다.",
          "2": "가격만 손보면 요구사항 누락을 놓칠 수 있습니다."
        },
        "realWorldTip": "검수 체크리스트를 프롬프트와 함께 사용해 누락을 줄이세요.",
        "skill": "result-validation",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "영업",
          "실무활용",
          "디버깅"
        ]
      },
      {
        "id": "sales_practical_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "AI로 업셀/크로셀 시나리오를 짤 때 필요한 데이터는?",
        "options": [
          "회사 로고만",
          "구매 이력·계약 만료일·현재 사용량·니즈",
          "직원 수만"
        ],
        "correct": 1,
        "desc": "이력과 사용량을 줘야 시나리오가 정밀해진다.",
        "enemyType": "virus",
        "concept": "업셀 설계",
        "whyCorrect": "무엇을 언제 얼마나 쓰고 있는지 알아야 적절한 업셀 메시지와 타이밍을 잡는다. 로고나 직원 수만으론 부족하다.",
        "whyWrong": {
          "0": "로고는 맥락을 주지 않습니다.",
          "2": "직원 수만으론 구체 니즈를 알기 어렵습니다."
        },
        "realWorldTip": "계약 만료 60/30/7일 기준으로 다른 메시지를 설정하면 반응률이 높아진다.",
        "skill": "context-giving",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "영업",
          "실무활용",
          "기획설계"
        ]
      }
    ]
  },
  "prompt": {
    "beginner": [
      {
        "id": "sales_prompt_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "후속 이메일을 AI에 쓰게 할 때 좋은 프롬프트는?",
        "options": [
          "이전 콜 요약·고객 우려·다음 제안·톤을 명시한다",
          "짧게 아무 말",
          "이모지만 잔뜩"
        ],
        "correct": 0,
        "desc": "콜 맥락과 우려를 주면 맞춤 후속이 나온다.",
        "enemyType": "glitch",
        "concept": "후속 메일 프롬프트",
        "whyCorrect": "콜 요약과 고객 우려, 원하는 다음 행동, 톤을 주면 AI가 맞춤형 후속을 작성한다. 맥락 없는 요청이나 이모지 남발은 설득력을 떨어뜨린다.",
        "whyWrong": {
          "1": "맥락이 없으면 일반적인 메일만 나옵니다.",
          "2": "이모지 남발은 B2B 톤과 어울리지 않을 수 있습니다."
        },
        "realWorldTip": "CTA를 한 가지로 제한하고 기한을 명시하게 하면 반응률이 오른다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "영업",
          "프롬프트작성",
          "커뮤니케이션"
        ]
      },
      {
        "id": "sales_prompt_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "콜 스크립트를 AI로 만들 때 꼭 지정할 것은?",
        "options": [
          "콜 목표·오픈 질문·금지 표현",
          "상대방 직급 추측",
          "날씨 이야기"
        ],
        "correct": 0,
        "desc": "목표와 질문, 금지어를 줘야 통제 가능한 스크립트가 나온다.",
        "enemyType": "worm",
        "concept": "콜 스크립트",
        "whyCorrect": "목표와 질문 리스트, 피해야 할 표현을 주면 AI가 일정한 품질의 스크립트를 만든다. 직급 추측이나 날씨는 핵심 대화와 무관하다.",
        "whyWrong": {
          "1": "직급 추측은 불필요한 가정입니다.",
          "2": "날씨 이야기만으론 목적을 달성할 수 없습니다."
        },
        "realWorldTip": "오픈/폐쇄 질문 비율을 지시하면 더 풍부한 정보를 얻을 수 있다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "영업",
          "프롬프트작성",
          "코드리뷰"
        ]
      },
      {
        "id": "sales_prompt_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "콜 요약 공유용 메모를 AI가 쓰게 할 때 형식은?",
        "options": [
          "장문의 소설",
          "감정 위주 일기",
          "결정 사항·열린 질문·액션 아이템을 불릿으로 요청"
        ],
        "correct": 2,
        "desc": "결정/질문/액션을 분리하면 팀 공유가 쉽다.",
        "enemyType": "bug",
        "concept": "메모 구조",
        "whyCorrect": "결정/질문/액션을 나눠 달라 하면 누구나 바로 후속을 파악한다. 소설이나 감정 일기는 실무에 불필요하다.",
        "whyWrong": {
          "0": "소설형은 필요한 정보를 찾기 어렵게 만듭니다.",
          "1": "감정 위주 메모는 후속 작업에 도움이 적습니다."
        },
        "realWorldTip": "각 액션에 담당자/기한을 함께 적게 하면 체이싱 시간이 줄어든다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "영업",
          "프롬프트작성",
          "커뮤니케이션"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "sales_prompt_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI에게 경쟁사 대응 FAQ를 만들게 할 때 필요한 것은?",
        "options": [
          "경쟁사 슬로건만",
          "자주 받는 이의제기와 근거 자료",
          "가격표만"
        ],
        "correct": 1,
        "desc": "반박 근거를 줘야 실전 FAQ가 된다.",
        "enemyType": "virus",
        "concept": "경쟁 대응",
        "whyCorrect": "이의제기 리스트와 대응 근거를 주면 AI가 일관된 FAQ를 만든다. 슬로건/가격만으론 충분하지 않다.",
        "whyWrong": {
          "0": "슬로건만으론 고객 우려를 해소할 수 없습니다.",
          "2": "가격만으론 가치 설명이 부족합니다."
        },
        "realWorldTip": "근거 자료 링크를 포함해 바로 참조할 수 있게 하세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "영업",
          "프롬프트작성",
          "문서작성"
        ]
      },
      {
        "id": "sales_prompt_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI로 데모 스크립트를 만들 때 효과적인 지시는?",
        "options": [
          "데모 시간만",
          "고객 목표·핵심 기능·성공 지표·데모 순서",
          "UI 색상"
        ],
        "correct": 1,
        "desc": "목표와 기능/순서를 줘야 데모가 매끄럽다.",
        "enemyType": "trojan",
        "concept": "데모 스크립트",
        "whyCorrect": "고객 목표와 보여줄 기능, 성공 지표, 순서를 주면 AI가 흐름을 짜준다. 시간만 주면 내용이 비고, 색상은 irrelevant.",
        "whyWrong": {
          "0": "시간만으론 무엇을 보여줄지 모릅니다.",
          "2": "색상은 데모 내용과 무관합니다."
        },
        "realWorldTip": "리스크 질문을 미리 적어 데모 중 선제 대응 포인트를 만들게 하세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "영업",
          "프롬프트작성",
          "커뮤니케이션"
        ]
      },
      {
        "id": "sales_prompt_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "리드 우선순위 규칙을 AI에 설명할 때 포함할 항목은?",
        "options": [
          "행동 점수·적합도 점수 기준·디캠프 규칙",
          "색상 코드",
          "폰트 크기"
        ],
        "correct": 0,
        "desc": "점수 기준을 줘야 우선순위가 일관된다.",
        "enemyType": "glitch",
        "concept": "리드 스코어",
        "whyCorrect": "행동/적합도 기준과 점수컷, 디캠프 조건을 주면 AI가 리드를 안정적으로 분류한다. 색상/폰트는 무관하다.",
        "whyWrong": {
          "1": "색상은 스코어링과 관계없습니다.",
          "2": "폰트는 시각 요소일 뿐입니다."
        },
        "realWorldTip": "스코어 변경 시 날짜/사유를 기록해 팀과 공유하세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "영업",
          "프롬프트작성",
          "커뮤니케이션"
        ]
      }
    ],
    "advanced": [
      {
        "id": "sales_prompt_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "계약서 리뷰를 AI에 맡길 때 안전한 출력 형식은?",
        "options": [
          "자유 서술",
          "이미지로만 반환",
          "조항별 위험 요약과 근거를 표로 반환"
        ],
        "correct": 2,
        "desc": "구조화된 표가 있어야 검토/협의가 쉽다.",
        "enemyType": "worm",
        "concept": "계약 검토",
        "whyCorrect": "조항/위험/근거를 표로 받으면 법무/영업이 빠르게 협의한다. 자유 서술이나 이미지 반환은 협업에 불편하다.",
        "whyWrong": {
          "0": "서술형은 검토 포인트를 찾기 어렵습니다.",
          "1": "이미지는 검색/편집이 어렵습니다."
        },
        "realWorldTip": "위험 등급과 수정 제안을 함께 요구하면 대응 속도가 빨라진다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "영업",
          "프롬프트작성",
          "코드리뷰"
        ]
      },
      {
        "id": "sales_prompt_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "자동 제안 생성 파이프라인에서 환각을 줄이는 방법은?",
        "options": [
          "근거 자료 링크와 '근거 없으면 없음' 규칙을 강제한다",
          "창의성을 극대화",
          "길이 제한 해제"
        ],
        "correct": 0,
        "desc": "근거 강제가 환각을 줄인다.",
        "enemyType": "virus",
        "concept": "환각 방지",
        "whyCorrect": "근거 자료를 요구하고 없으면 없음으로 답하게 하면 허구를 줄인다. 창의성/길이 강조는 오히려 추측을 늘린다.",
        "whyWrong": {
          "1": "창의성 강조는 사실과 다른 내용을 넣을 수 있습니다.",
          "2": "길이 제한 해제는 장황하고 검증 어려운 답을 만듭니다."
        },
        "realWorldTip": "출처 URL을 포함하게 하면 고객에게도 투명성을 보여줄 수 있다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "영업",
          "프롬프트작성",
          "커뮤니케이션"
        ]
      }
    ]
  },
  "tools": {
    "beginner": [
      {
        "id": "sales_tools_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "간단한 이메일 수정에 적합한 도구는?",
        "options": [
          "대형 챗모델 장문 세션",
          "수동 편집만",
          "CRM 내 AI 리라이팅"
        ],
        "correct": 2,
        "desc": "간단 수정은 CRM 내 리라이팅이 가장 효율적이다.",
        "enemyType": "glitch",
        "concept": "도구 선택",
        "whyCorrect": "CRM/메일 도구 내 리라이팅은 컨텍스트를 유지한 채 빠르게 수정할 수 있다. 장문 챗은 과잉이고, 수동 편집만 하면 시간이 늘어난다.",
        "whyWrong": {
          "0": "장문 챗은 전략/서사 작업에 쓰세요.",
          "1": "수동만 하면 속도가 느립니다."
        },
        "realWorldTip": "리라이팅 시 CTA와 톤을 명시하면 재수정이 줄어든다.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "영업",
          "도구선택",
          "커뮤니케이션"
        ]
      },
      {
        "id": "sales_tools_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "긴 제안서 구조를 검토할 때 적합한 방식은?",
        "options": [
          "오타 검사기만 돌린다",
          "색상을 먼저 바꾼다",
          "챗모델에 목차와 핵심 요구사항을 함께 주고 검토"
        ],
        "correct": 2,
        "desc": "요구사항을 준 챗모델 검토가 구조 점검에 효율적이다.",
        "enemyType": "bug",
        "concept": "모델 사용",
        "whyCorrect": "요구사항과 목차를 주면 누락/중복을 점검해준다. 오타/색상은 구조 검토와 무관하다.",
        "whyWrong": {
          "0": "오타 검사는 구조/내용 누락을 잡지 못합니다.",
          "1": "색상 변경은 설득력에 큰 영향을 주지 않습니다."
        },
        "realWorldTip": "요구사항 체크리스트를 함께 첨부해 누락 여부를 표시하게 하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "analysis",
        "tags": [
          "영업",
          "도구선택",
          "데이터분석"
        ]
      },
      {
        "id": "sales_tools_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "CRM 노트 자동화 시 시작해야 할 작업은?",
        "options": [
          "모든 대화를 그대로 저장",
          "비밀키를 기록",
          "필드 스키마 정의와 민감 정보 마스킹 규칙 설정"
        ],
        "correct": 2,
        "desc": "스키마와 마스킹 규칙이 있어야 안전하다.",
        "enemyType": "worm",
        "concept": "CRM 자동화",
        "whyCorrect": "필수/옵션 필드와 마스킹 규칙을 정해야 노트 품질과 보안을 지킬 수 있다. 대화 원문 저장이나 키 기록은 위험하다.",
        "whyWrong": {
          "0": "원문 그대로 저장하면 PII 유출 위험이 큽니다.",
          "1": "비밀키 기록은 절대 금지입니다."
        },
        "realWorldTip": "노트에 액션/기한 필드를 추가하면 후속 관리가 쉬워진다.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "영업",
          "도구선택",
          "코드리뷰"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "sales_tools_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "콜 요약 자동화 정확도를 올리려면?",
        "options": [
          "전체 녹취만 던진다",
          "채널 테마만 바꾼다",
          "콜 목적/아젠다/결정 포인트를 태그로 표시"
        ],
        "correct": 2,
        "desc": "태그가 있어야 요약이 구조화된다.",
        "enemyType": "virus",
        "concept": "콜 요약 정확도",
        "whyCorrect": "아젠다/결정 태그를 주면 AI가 중요한 부분을 중심으로 요약한다. 녹취만 주면 산만하고, 테마는 영향이 없다.",
        "whyWrong": {
          "0": "녹취만으론 무엇이 중요한지 알기 어렵습니다.",
          "1": "테마는 요약 품질에 영향을 주지 않습니다."
        },
        "realWorldTip": "콜 시작에 목적을 말하고 태그로 표시하면 요약 정확도가 오른다.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "automation",
        "tags": [
          "영업",
          "도구선택",
          "자동화"
        ]
      },
      {
        "id": "sales_tools_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "세일즈 챗봇 응답 정확도를 높이려면?",
        "options": [
          "챗봇 이름만 멋지게 짓는다",
          "FAQ/RFP 자료를 청크화해 인덱싱하고 최신 변경을 동기화",
          "이미지만 넣는다"
        ],
        "correct": 1,
        "desc": "자료 인덱싱과 동기화가 정확도를 좌우한다.",
        "enemyType": "trojan",
        "concept": "챗봇 정확도",
        "whyCorrect": "FAQ/RFP를 청크/인덱싱하고 업데이트 시 동기화해야 최신 답을 낸다. 이름/이미지는 정확도에 영향이 없다.",
        "whyWrong": {
          "0": "이름만 멋져도 답이 틀리면 무용지물입니다.",
          "2": "이미지만으론 텍스트 질의에 답을 못합니다."
        },
        "realWorldTip": "챗봇 답변에 출처 링크를 포함시켜 검증과 신뢰도를 높이세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "영업",
          "도구선택",
          "커뮤니케이션"
        ]
      },
      {
        "id": "sales_tools_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "계정 계획 자동화에서 AI에 줄 핵심 입력은?",
        "options": [
          "계정 목표·조직도·기존 계약·리스크/기회",
          "회사 슬로건",
          "배경색"
        ],
        "correct": 0,
        "desc": "계정 정보와 리스크/기회가 있어야 계획이 유용하다.",
        "enemyType": "bug",
        "concept": "계정 계획",
        "whyCorrect": "목표와 조직도, 계약/리스크 정보를 주면 AI가 스폰서 지도와 액션을 제안한다. 슬로건/색상은 계획과 무관하다.",
        "whyWrong": {
          "1": "슬로건만으론 전략을 세울 수 없습니다.",
          "2": "색상은 전략에 영향을 주지 않습니다."
        },
        "realWorldTip": "계정 내 챔피언/반대자 정보를 함께 넣으면 메시지 전략을 더 정밀하게 만들 수 있다.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "영업",
          "도구선택",
          "기획설계"
        ]
      }
    ],
    "advanced": [
      {
        "id": "sales_tools_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "AI 기반 가격 제안 추천을 도입할 때 필수 검증은?",
        "options": [
          "AI 제안 그대로 적용",
          "로그를 남기지 않는다",
          "승인 한도·할인 정책·히스토리 재현 테스트"
        ],
        "correct": 2,
        "desc": "정책/히스토리 검증이 있어야 가격 오류를 막는다.",
        "enemyType": "virus",
        "concept": "가격 추천",
        "whyCorrect": "할인 정책과 승인 한도를 적용하고, 과거 거래를 재현 테스트해야 안전하다. 제안 그대로 적용이나 로그 없음은 위험하다.",
        "whyWrong": {
          "0": "그대로 적용하면 정책 위반 가격이 나갈 수 있습니다.",
          "1": "로그가 없으면 오류를 추적할 수 없습니다."
        },
        "realWorldTip": "추천 가격에 근거(비교 사례)를 포함시켜 영업이 쉽게 설명하도록 하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "영업",
          "도구선택",
          "디버깅"
        ]
      },
      {
        "id": "sales_tools_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "세일즈 오토메이션 파이프라인에서 SLA를 지키려면?",
        "options": [
          "테마 변경",
          "재시도/폴백/서킷브레이커와 모니터링을 설정",
          "폰트 변경"
        ],
        "correct": 1,
        "desc": "폴백과 차단, 모니터링이 있어야 안정적이다.",
        "enemyType": "trojan",
        "concept": "신뢰성",
        "whyCorrect": "실패 시 재시도와 폴백, 에러 폭증 시 차단, 지연/성공률 모니터링을 둬야 SLA를 지킨다. 테마/폰트는 영향이 없다.",
        "whyWrong": {
          "0": "테마는 가용성과 무관합니다.",
          "2": "폰트도 마찬가지입니다."
        },
        "realWorldTip": "임계값에 대한 알람을 슬랙/이메일에 연동해 즉시 대응하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "영업",
          "도구선택",
          "디버깅"
        ]
      }
    ]
  },
  "ethics": {
    "beginner": [
      {
        "id": "sales_ethics_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "고객 정보로 AI를 활용할 때 첫 번째 조치는?",
        "options": [
          "개인 메신저로 공유",
          "아무 제한 없이 업로드",
          "PII 마스킹과 승인된 채널 사용"
        ],
        "correct": 2,
        "desc": "마스킹과 승인 채널이 기본이다.",
        "enemyType": "glitch",
        "concept": "PII 보호",
        "whyCorrect": "식별 정보는 가리고 승인된 도구만 써야 유출을 막는다. 개인 메신저나 무제한 업로드는 위험하다.",
        "whyWrong": {
          "0": "개인 메신저는 기록/보안이 취약합니다.",
          "1": "제한 없는 업로드는 규정 위반입니다."
        },
        "realWorldTip": "CRM에서 내보내기 전 자동 마스킹 스크립트를 사용하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "영업",
          "윤리보안",
          "문서작성"
        ]
      },
      {
        "id": "sales_ethics_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "AI가 생성한 제안서를 고객에게 보낼 때 해야 할 일은?",
        "options": [
          "근거/정확성 검토와 계약 조건 확인",
          "그대로 즉시 발송",
          "출처를 숨긴다"
        ],
        "correct": 0,
        "desc": "검토와 조건 확인 없이 발송하면 리스크가 크다.",
        "enemyType": "bug",
        "concept": "검수",
        "whyCorrect": "AI 제안은 검토 후 발송해야 오류/법적 문제를 막는다. 즉시 발송이나 출처 숨김은 신뢰를 해친다.",
        "whyWrong": {
          "1": "검토 없이 보내면 오류가 그대로 나갑니다.",
          "2": "출처를 숨기는 건 투명성을 해치고 위험합니다."
        },
        "realWorldTip": "법무/가격 정책 체크리스트를 통과한 후에만 공유하도록 하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "영업",
          "윤리보안",
          "디버깅"
        ]
      },
      {
        "id": "sales_ethics_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "경쟁사 정보를 활용할 때 윤리적으로 해야 할 일은?",
        "options": [
          "비밀 정보를 요청",
          "출처를 숨긴다",
          "공개 정보만 사용하고 오해 소지를 명시한다"
        ],
        "correct": 2,
        "desc": "공개 정보와 출처 명시는 기본 윤리다.",
        "enemyType": "trojan",
        "concept": "정보 윤리",
        "whyCorrect": "공개된 자료만 사용하고 출처를 명시해야 법적/윤리적 문제를 피한다. 비밀 정보 요구나 출처 숨김은 위험하다.",
        "whyWrong": {
          "0": "비밀 정보 요구는 법적 문제를 일으킵니다.",
          "1": "출처 숨김은 신뢰를 해칩니다."
        },
        "realWorldTip": "자료마다 출처/날짜를 함께 기록해 업데이트 시점을 관리하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "영업",
          "윤리보안",
          "문서작성"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "sales_ethics_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI 콜 요약을 저장할 때 개인정보를 줄이는 방법은?",
        "options": [
          "전체 녹취와 연락처를 평문으로 저장",
          "이름/연락처를 식별 불가 형태로 저장하고 필요한 부분만 남긴다",
          "익명화를 하지 않는다"
        ],
        "correct": 1,
        "desc": "식별자 최소화가 필요하다.",
        "enemyType": "virus",
        "concept": "데이터 최소화",
        "whyCorrect": "식별자 제거와 최소 저장이 규정 준수에 필수다. 평문 저장이나 익명화 미실시는 유출 위험을 키운다.",
        "whyWrong": {
          "0": "평문 저장은 큰 위험을 초래합니다.",
          "2": "익명화 없이는 규정 위반 가능성이 큽니다."
        },
        "realWorldTip": "콜 요약에는 고객 코드만 남기고 이름/연락처는 CRM 링크로 대체하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "analysis",
        "tags": [
          "영업",
          "윤리보안",
          "데이터분석"
        ]
      },
      {
        "id": "sales_ethics_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI가 추천한 가격/조건을 적용하기 전에 해야 할 검증은?",
        "options": [
          "정책/마진/계약 조건 충돌 여부 검토",
          "추천 그대로 적용",
          "경쟁사 조건을 임의로 섞는다"
        ],
        "correct": 0,
        "desc": "정책/마진 검토 없이 적용하면 위험하다.",
        "enemyType": "glitch",
        "concept": "정책 준수",
        "whyCorrect": "내부 정책과 마진, 계약 조건을 확인해야 AI 추천이 적합한지 알 수 있다. 그대로 적용하거나 임의 섞기는 오류와 분쟁을 부른다.",
        "whyWrong": {
          "1": "검증 없이 적용하면 정책 위반 가격이 나갈 수 있습니다.",
          "2": "임의 혼합은 부정확하고 위험합니다."
        },
        "realWorldTip": "승인 프로세스를 자동화해 정책 체크 후만 발송되게 하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "영업",
          "윤리보안",
          "디버깅"
        ]
      },
      {
        "id": "sales_ethics_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI 자동화로 고객에게 메시지를 보낼 때 과도한 빈도를 막으려면?",
        "options": [
          "빈도 캡과 옵트아웃, 시간대 규칙을 적용",
          "무제한 발송",
          "응답이 없을수록 더 자주 보낸다"
        ],
        "correct": 0,
        "desc": "빈도/옵트아웃 규칙이 기본이다.",
        "enemyType": "worm",
        "concept": "스팸 방지",
        "whyCorrect": "빈도 제한과 옵트아웃, 시간대 규칙을 적용해야 스팸을 막는다. 무제한 발송은 신뢰를 잃게 만든다.",
        "whyWrong": {
          "1": "무제한 발송은 스팸으로 분류될 수 있습니다.",
          "2": "응답 없을 때 더 자주 보내면 반감만 커집니다."
        },
        "realWorldTip": "캠페인당 최대 발송 횟수와 조용 기간을 정책으로 명시해 두세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "영업",
          "윤리보안",
          "커뮤니케이션"
        ]
      }
    ],
    "advanced": [
      {
        "id": "sales_ethics_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "AI 자동 계약 생성에서 감사 가능성을 높이려면?",
        "options": [
          "로그를 남기지 않는다",
          "평문 전체 계약을 외부에 저장",
          "요청/응답 로그와 사용된 데이터/모델 버전을 기록"
        ],
        "correct": 2,
        "desc": "로그와 버전 기록이 있어야 추적이 가능하다.",
        "enemyType": "trojan",
        "concept": "감사 로그",
        "whyCorrect": "요청/응답과 데이터/모델 버전을 남겨야 문제 발생 시 추적/재현이 가능하다. 로그 없음이나 평문 외부 저장은 위험하다.",
        "whyWrong": {
          "0": "로그가 없으면 원인을 찾을 수 없습니다.",
          "1": "평문 외부 저장은 유출 위험이 큽니다."
        },
        "realWorldTip": "민감도에 따라 로그 보존 기간을 다르게 설정하고 암호화 저장하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "영업",
          "윤리보안",
          "디버깅"
        ]
      },
      {
        "id": "sales_ethics_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "자동화된 제안/메일 봇 권한 설계 원칙은?",
        "options": [
          "전체 발송 권한 부여",
          "비밀키를 코드에 하드코딩",
          "읽기/초안 작성만 허용하고 발송은 승인 필요"
        ],
        "correct": 2,
        "desc": "최소 권한과 승인 플로우가 안전하다.",
        "enemyType": "virus",
        "concept": "권한 최소화",
        "whyCorrect": "초안/제안 작성까지만 허용하고 발송은 승인받아야 사고를 막는다. 전체 권한이나 키 하드코딩은 보안 사고 위험이 크다.",
        "whyWrong": {
          "0": "전체 권한은 오발송을 일으킬 수 있습니다.",
          "1": "키 하드코딩은 유출되기 쉽습니다."
        },
        "realWorldTip": "봇 계정에 제한된 역할을 부여하고, 발송 전 사람 리뷰 단계를 두세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "영업",
          "윤리보안",
          "코드리뷰"
        ]
      }
    ]
  },
  "advanced": {
    "beginner": [
      {
        "id": "sales_advanced_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "자동 오퍼 생성 워크플로에서 가장 먼저 정의해야 할 것은?",
        "options": [
          "배경색",
          "입력/출력 스키마와 승인 기준",
          "로고 크기"
        ],
        "correct": 1,
        "desc": "스키마와 승인 기준이 있어야 자동화가 안전하다.",
        "enemyType": "glitch",
        "concept": "워크플로 정의",
        "whyCorrect": "입출력 필드와 승인 조건을 정의하면 잘못된 오퍼를 걸러낼 수 있다. 색상/로고는 중요하지 않다.",
        "whyWrong": {
          "0": "색상은 오퍼 정확도와 무관합니다.",
          "2": "로고 크기는 스키마보다 덜 중요합니다."
        },
        "realWorldTip": "스키마에 할인 한도와 유효기간 필드를 포함하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "영업",
          "자동화설계",
          "콘텐츠제작"
        ]
      },
      {
        "id": "sales_advanced_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "프롬프트 회귀 테스트를 세일즈에 적용할 때 초기 세트는?",
        "options": [
          "임의 프롬프트 한두 개",
          "주요 콜/제안/FAQ 프롬프트와 기대 답변 스냅샷",
          "감에 따른 평가"
        ],
        "correct": 1,
        "desc": "대표 케이스 스냅샷이 있어야 회귀를 잡는다.",
        "enemyType": "bug",
        "concept": "프롬프트 회귀",
        "whyCorrect": "대표 콜/제안/FAQ 프롬프트와 기대 답을 저장해야 모델 변경 시 품질 하락을 감지한다. 임의/감에 의존하면 놓친다.",
        "whyWrong": {
          "0": "한두 개로는 커버리지가 부족합니다.",
          "2": "감으로는 비교가 어렵습니다."
        },
        "realWorldTip": "주요 산업/규모별로 최소 1개씩 케이스를 유지하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "영업",
          "자동화설계",
          "코드리뷰"
        ]
      },
      {
        "id": "sales_advanced_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "LLM 캐싱을 견적 챗봇에 적용할 때 핵심은?",
        "options": [
          "질문 파라미터와 가격 정책 버전을 키에 포함",
          "모든 답을 무조건 캐싱",
          "캐시를 아예 쓰지 않음"
        ],
        "correct": 0,
        "desc": "정책 버전 포함 키가 있어야 오답을 막는다.",
        "enemyType": "virus",
        "concept": "캐싱",
        "whyCorrect": "가격/정책이 바뀌면 캐시를 무효화할 수 있어야 한다. 무조건 캐싱은 잘못된 가격을 반복하고, 미사용은 비용이 늘어난다.",
        "whyWrong": {
          "1": "무조건 캐싱은 정책 변경 후 잘못된 답을 줄 수 있습니다.",
          "2": "캐시 미사용은 비용과 지연이 커집니다."
        },
        "realWorldTip": "정책 변경 시 버전 번호를 올리고 캐시를 비우는 훅을 두세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "automation",
        "tags": [
          "영업",
          "자동화설계",
          "자동화"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "sales_advanced_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "SLA가 있는 챗봇을 운영할 때 모니터링해야 할 지표는?",
        "options": [
          "배경색",
          "폰트",
          "응답 시간·정확도·핸드오프 비율"
        ],
        "correct": 2,
        "desc": "속도/품질/핸드오프를 함께 봐야 한다.",
        "enemyType": "glitch",
        "concept": "SLI",
        "whyCorrect": "응답 시간과 정답률, 상담원 핸드오프 비율을 봐야 SLA를 지킨다. 색상/폰트는 무관하다.",
        "whyWrong": {
          "0": "색상은 SLA에 영향을 주지 않습니다.",
          "1": "폰트도 영향이 없습니다."
        },
        "realWorldTip": "핸드오프 기준을 명확히 정의해 잘못된 전환을 줄이세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "영업",
          "자동화설계",
          "코드리뷰"
        ]
      },
      {
        "id": "sales_advanced_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "도구 호출 에이전트를 구축할 때 필요한 안전장치는?",
        "options": [
          "입출력 검증·타임아웃·에러 핸들링",
          "임의 시스템 명령 허용",
          "재시도 없이 실패 방치"
        ],
        "correct": 0,
        "desc": "검증과 에러 처리 없이는 안전하지 않다.",
        "enemyType": "trojan",
        "concept": "툴 안전",
        "whyCorrect": "입력 검증, 타임아웃, 재시도/폴백이 있어야 도구 호출이 안전하다. 임의 명령 허용이나 실패 방치는 위험하다.",
        "whyWrong": {
          "1": "임의 명령은 보안 위험을 만듭니다.",
          "2": "실패를 방치하면 파이프라인이 멈출 수 있습니다."
        },
        "realWorldTip": "실패 로그를 수집해 패턴을 학습시키면 안정성이 높아진다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "영업",
          "자동화설계",
          "디버깅"
        ]
      },
      {
        "id": "sales_advanced_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "세일즈 자동화 품질을 측정할 때 어떤 지표 조합을 봐야 할까?",
        "options": [
          "길이만",
          "감정만",
          "리드 응답속도·회복률·인적 개입 비율·비용"
        ],
        "correct": 2,
        "desc": "속도/품질/비용을 함께 봐야 한다.",
        "enemyType": "worm",
        "concept": "품질 지표",
        "whyCorrect": "응답속도, 전환/회복률, 인적 개입, 비용을 함께 봐야 자동화가 실제로 도움 되는지 알 수 있다. 길이나 감정만으론 부족하다.",
        "whyWrong": {
          "0": "길이만으론 품질을 알 수 없습니다.",
          "1": "감정만으로는 전환 품질을 판단하기 어렵습니다."
        },
        "realWorldTip": "분기별로 지표를 기록해 자동화 변경의 영향을 추적하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "영업",
          "자동화설계",
          "코드리뷰"
        ]
      }
    ],
    "advanced": [
      {
        "id": "sales_advanced_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "자동 계약 생성 파이프라인의 필수 단계는?",
        "options": [
          "요구사항 매핑→조항 생성→법무 검토→서명",
          "조항 생성 후 바로 서명",
          "검토/로그 없이 진행"
        ],
        "correct": 0,
        "desc": "검토를 거쳐야 계약 오류를 막는다.",
        "enemyType": "virus",
        "concept": "계약 자동화",
        "whyCorrect": "요구사항 확인 후 생성, 법무 검토, 서명 순으로 진행해야 리스크를 줄인다. 바로 서명이나 로그 없음은 위험하다.",
        "whyWrong": {
          "1": "검토 없이 서명하면 오류를 잡을 수 없습니다.",
          "2": "로그가 없으면 추적이 불가합니다."
        },
        "realWorldTip": "서명 전 체크리스트를 자동 생성해 검토를 강제하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "영업",
          "자동화설계",
          "디버깅"
        ]
      },
      {
        "id": "sales_advanced_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "세일즈 오토메이션 SLA를 지키기 위한 기술 조합은?",
        "options": [
          "테마 변경",
          "큐·재시도·폴백·모니터링",
          "폰트 변경"
        ],
        "correct": 1,
        "desc": "큐/재시도/폴백/모니터링이 핵심이다.",
        "enemyType": "glitch",
        "concept": "신뢰성",
        "whyCorrect": "큐와 재시도, 폴백, 모니터링이 있어야 장애에도 SLA를 지킨다. 테마/폰트는 영향이 없다.",
        "whyWrong": {
          "0": "테마는 SLA와 무관합니다.",
          "2": "폰트도 무관합니다."
        },
        "realWorldTip": "임계 지표에 알람을 걸고 폴백을 주기적으로 테스트하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "automation",
        "tags": [
          "영업",
          "자동화설계",
          "자동화"
        ]
      }
    ]
  }
};

// CS 직무 40문항
const CS_QUESTIONS = {
  "practical": {
    "beginner": [
      {
        "id": "cs_practical_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "티켓 요약을 AI에 맡길 때 꼭 넣어야 할 정보는?",
        "options": [
          "담당자 별명",
          "문제 유형·재현 단계·기대/실제 결과",
          "팀 회식 일정"
        ],
        "correct": 1,
        "desc": "문제/재현/결과가 있어야 유용한 요약이 된다.",
        "enemyType": "glitch",
        "concept": "티켓 요약",
        "whyCorrect": "유형과 재현, 기대/실제 결과를 주면 AI가 정확히 분류/요약한다. 별명이나 회식 정보는 무관하다.",
        "whyWrong": {
          "0": "별명은 문제를 설명하는 데 필요하지 않아요.",
          "2": "회식 일정도 무관합니다."
        },
        "realWorldTip": "요약에 심각도/우선순위를 함께 요청하면 triage 속도가 빨라진다.",
        "skill": "context-giving",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "고객지원",
          "실무활용",
          "디버깅"
        ]
      },
      {
        "id": "cs_practical_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "FAQ 초안을 AI에 맡길 때 첫 지시는?",
        "options": [
          "자주 묻는 질문·정확한 답·관련 정책을 제공",
          "UI 색상",
          "회사 연혁만"
        ],
        "correct": 0,
        "desc": "FAQ는 질문과 정책 근거가 필요하다.",
        "enemyType": "worm",
        "concept": "FAQ 작성",
        "whyCorrect": "실제 질문과 정확한 답, 정책/약관 근거를 주면 AI가 신뢰도 높은 FAQ를 만든다. 색상/연혁은 도움이 안 된다.",
        "whyWrong": {
          "1": "색상은 FAQ 내용과 관련이 없습니다.",
          "2": "연혁만으론 고객 질문에 답하지 못합니다."
        },
        "realWorldTip": "FAQ마다 링크/근거를 붙여 업데이트 시 빠르게 검증하세요.",
        "skill": "result-validation",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "고객지원",
          "실무활용",
          "문서작성"
        ]
      },
      {
        "id": "cs_practical_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "챗봇 응답을 개선하려 할 때 먼저 줄 데이터는?",
        "options": [
          "챗봇 이름만",
          "실패한 대화 로그와 의도/정답 매핑",
          "랜덤 밈"
        ],
        "correct": 1,
        "desc": "실패 로그와 정답이 있어야 개선이 가능하다.",
        "enemyType": "bug",
        "concept": "챗봇 개선",
        "whyCorrect": "실패 로그와 정답을 주면 AI가 재학습 포인트를 제안한다. 이름이나 밈은 영향이 없다.",
        "whyWrong": {
          "0": "이름만으론 문제를 알 수 없습니다.",
          "2": "밈은 개선과 무관합니다."
        },
        "realWorldTip": "오답 로그에 의도 라벨을 붙여두면 재학습이 쉬워진다.",
        "skill": "context-giving",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "고객지원",
          "실무활용",
          "디버깅"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "cs_practical_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI로 우선순위를 정렬하려면 필요한 입력은?",
        "options": [
          "티켓 작성자 이름",
          "티켓 심각도·영향 고객 수·SLA 시간",
          "색상 코드"
        ],
        "correct": 1,
        "desc": "심각도/영향/SLA가 있어야 우선순위가 정해진다.",
        "enemyType": "virus",
        "concept": "우선순위 설정",
        "whyCorrect": "심각도, 영향 범위, SLA 남은 시간을 주면 AI가 triage 순서를 제안한다. 이름/색상은 영향이 없다.",
        "whyWrong": {
          "0": "이름만으론 긴급도를 알 수 없습니다.",
          "2": "색상은 우선순위 판단과 무관합니다."
        },
        "realWorldTip": "SLA 남은 시간을 분 단위로 넣으면 대기열 정렬이 정확해진다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "고객지원",
          "실무활용",
          "콘텐츠제작"
        ]
      },
      {
        "id": "cs_practical_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "루틴 문의 자동화를 설계할 때 AI에 줄 핵심 자료는?",
        "options": [
          "브랜드 슬로건",
          "배경음악",
          "FAQ/매뉴얼·정책 링크·예외 처리 규칙"
        ],
        "correct": 2,
        "desc": "정책과 예외를 줘야 자동화가 안전하다.",
        "enemyType": "glitch",
        "concept": "자동화 설계",
        "whyCorrect": "FAQ와 정책, 예외 규칙을 주면 AI가 자동 응답 범위를 안전하게 정의한다. 슬로건/음악은 무관하다.",
        "whyWrong": {
          "0": "슬로건은 정책/절차를 대체하지 않습니다.",
          "1": "음악은 자동화 정확도와 무관합니다."
        },
        "realWorldTip": "예외 처리 규칙을 JSON으로 주면 챗봇/티켓 라우팅에 바로 적용된다.",
        "skill": "context-giving",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "고객지원",
          "실무활용",
          "기획설계"
        ]
      },
      {
        "id": "cs_practical_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "CS 팀 회고 문서를 AI에 부탁할 때 포함해야 할 것?",
        "options": [
          "팀 점심 메뉴",
          "색상 테마",
          "주요 사건·원인·재발 방지·지표 변화"
        ],
        "correct": 2,
        "desc": "사건/원인/대책/지표가 있어야 회고가 의미 있다.",
        "enemyType": "worm",
        "concept": "회고 구조",
        "whyCorrect": "사건과 원인, 재발 방지, 지표 변화를 주면 AI가 actionable 회고를 만든다. 메뉴/색상은 중요하지 않다.",
        "whyWrong": {
          "0": "점심 메뉴는 회고와 무관합니다.",
          "1": "색상은 결과에 영향을 주지 않습니다."
        },
        "realWorldTip": "각 액션에 오너/기한을 붙여주도록 지시하면 후속 관리가 쉬워진다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "고객지원",
          "실무활용",
          "문서작성"
        ]
      }
    ],
    "advanced": [
      {
        "id": "cs_practical_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "다국어 CS 응답 자동화를 할 때 품질 확보 방법은?",
        "options": [
          "단순 번역기로만 처리",
          "언어별 가이드·금지 표현·검수 샘플을 설정",
          "모든 언어를 자유롭게 생성"
        ],
        "correct": 1,
        "desc": "언어별 가이드와 검수가 있어야 품질을 유지한다.",
        "enemyType": "bug",
        "concept": "다국어 품질",
        "whyCorrect": "언어별 톤/금지 표현/검수 기준을 주고 샘플을 검토해야 오역/오해를 줄인다. 번역기만이나 자유 생성은 위험하다.",
        "whyWrong": {
          "0": "번역기만 쓰면 문화적 뉘앙스를 놓칩니다.",
          "2": "자유 생성은 정책 위반 위험이 큽니다."
        },
        "realWorldTip": "언어별 승인된 템플릿을 프롬프트에 포함시키면 일관성이 높아진다.",
        "skill": "result-validation",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "고객지원",
          "실무활용",
          "코드리뷰"
        ]
      },
      {
        "id": "cs_practical_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "AI로 클레임 응답 초안을 만들 때 안전장치는?",
        "options": [
          "정책 근거·사과/보상 범위·에스컬레이션 기준을 명시",
          "감정적으로 대응",
          "바로 환불 약속"
        ],
        "correct": 0,
        "desc": "근거와 범위를 명시해야 사고를 줄인다.",
        "enemyType": "virus",
        "concept": "클레임 대응",
        "whyCorrect": "정책과 보상 범위, 에스컬레이션 기준을 주면 AI가 일관된 답을 제시한다. 감정적 대응이나 무조건 환불은 위험하다.",
        "whyWrong": {
          "1": "감정적 대응은 상황을 악화시킬 수 있습니다.",
          "2": "무조건 환불은 정책/재무 위험을 만듭니다."
        },
        "realWorldTip": "민감도 높은 케이스는 에스컬레이션 라벨을 붙여 사람 검토를 거치게 하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "고객지원",
          "실무활용",
          "콘텐츠제작"
        ]
      }
    ]
  },
  "prompt": {
    "beginner": [
      {
        "id": "cs_prompt_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "AI에 응대 스크립트 수정을 요청할 때 필요한 프롬프트는?",
        "options": [
          "색상 코드",
          "현재 스크립트·문제점·목표 톤·제한어",
          "짧게 알아서 수정"
        ],
        "correct": 1,
        "desc": "문제와 톤/제한을 알려줘야 원하는 수정이 된다.",
        "enemyType": "glitch",
        "concept": "스크립트 프롬프트",
        "whyCorrect": "현재 스크립트와 문제, 원하는 톤, 금지어를 주면 AI가 안전하게 개선한다. 색상이나 모호한 지시는 불필요하다.",
        "whyWrong": {
          "0": "색상은 스크립트 내용과 무관합니다.",
          "2": "모호하면 기대와 다른 답이 나옵니다."
        },
        "realWorldTip": "신규/기존 고객 등 상황도 함께 적어주면 톤을 맞추기 쉽다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "고객지원",
          "프롬프트작성",
          "커뮤니케이션"
        ]
      },
      {
        "id": "cs_prompt_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "지식베이스 답변 생성을 AI에 맡길 때 좋은 지시는?",
        "options": [
          "길게 아무 말",
          "이모지로만",
          "문제/원인/조치/링크를 구조화해 달라 한다"
        ],
        "correct": 2,
        "desc": "구조화 요청이 있어야 바로 게시할 수 있다.",
        "enemyType": "worm",
        "concept": "지식베이스",
        "whyCorrect": "문제/원인/조치/링크를 구조화하면 바로 KB에 올릴 수 있다. 모호하거나 이모지는 품질을 낮춘다.",
        "whyWrong": {
          "0": "모호한 요청은 편집이 많이 필요합니다.",
          "1": "이모지만으론 정보를 전달하기 어렵습니다."
        },
        "realWorldTip": "FAQ 형식(질문-답변)으로 반환하게 하면 게시가 빠르다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "고객지원",
          "프롬프트작성",
          "코드리뷰"
        ]
      },
      {
        "id": "cs_prompt_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "콜 로그 요약을 요청할 때 환각을 줄이는 방법은?",
        "options": [
          "창의적으로 길게",
          "원문 일부와 \"없는 정보는 없음으로 표시\"를 지시",
          "감정을 강조"
        ],
        "correct": 1,
        "desc": "없는 정보는 없음으로 명시하게 해야 추측을 막는다.",
        "enemyType": "bug",
        "concept": "환각 방지",
        "whyCorrect": "없는 정보는 없음으로 표기하라고 지시하면 추측을 줄일 수 있다. 창의/감정 강조는 왜곡을 낳는다.",
        "whyWrong": {
          "0": "창의성은 요약 정확도를 떨어뜨릴 수 있습니다.",
          "2": "감정 강조는 사실을 흐릴 수 있습니다."
        },
        "realWorldTip": "요약에 티켓 링크를 포함해 참고 근거를 남기세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "고객지원",
          "프롬프트작성",
          "디버깅"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "cs_prompt_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI로 응답 템플릿을 만들 때 고객 유형별로 다르게 하려면?",
        "options": [
          "유형별 상황/톤/금지어를 표로 제공",
          "유형 이름만 준다",
          "아무 제약 없이 생성"
        ],
        "correct": 0,
        "desc": "유형별 톤/금지어가 있어야 맞춤 템플릿이 된다.",
        "enemyType": "glitch",
        "concept": "세분화 프롬프트",
        "whyCorrect": "상황/톤/금지어를 유형별로 주면 AI가 맞춤 템플릿을 만든다. 이름만 주거나 제약 없이는 일관성이 없다.",
        "whyWrong": {
          "1": "이름만으론 어떤 톤이 필요한지 알 수 없습니다.",
          "2": "제약 없이는 정책 위반 위험이 있습니다."
        },
        "realWorldTip": "신규/유료/이탈 위험 등 세그먼트별로 다른 톤을 지정하세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "고객지원",
          "프롬프트작성",
          "콘텐츠제작"
        ]
      },
      {
        "id": "cs_prompt_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI에게 에스컬레이션 기준을 설명할 때 꼭 넣을 내용은?",
        "options": [
          "색상",
          "폰트",
          "심각도·SLA·에스컬레이션 경로/담당자"
        ],
        "correct": 2,
        "desc": "심각도/SLA/경로가 있어야 기준이 된다.",
        "enemyType": "virus",
        "concept": "에스컬레이션",
        "whyCorrect": "심각도와 SLA, 경로/담당자를 주면 AI가 적절히 라우팅한다. 색상/폰트는 기준이 아니다.",
        "whyWrong": {
          "0": "색상은 경로 판단에 영향을 주지 않습니다.",
          "1": "폰트도 무관합니다."
        },
        "realWorldTip": "경로를 JSON으로 정의해 챗봇/티켓 시스템에서 재사용하세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "고객지원",
          "프롬프트작성",
          "커뮤니케이션"
        ]
      },
      {
        "id": "cs_prompt_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI가 응답 근거를 제공하도록 하려면?",
        "options": [
          "자유롭게 말하기",
          "길이 제한 없음",
          "출처 문서/링크와 '근거 없으면 없음' 지시"
        ],
        "correct": 2,
        "desc": "출처 요청이 환각을 줄인다.",
        "enemyType": "worm",
        "concept": "근거 기반",
        "whyCorrect": "출처를 요구하고 근거 없으면 없음으로 답하게 해야 허구를 줄인다. 자유/무제한 길이는 왜곡을 키운다.",
        "whyWrong": {
          "0": "자유 서술은 검증이 어렵습니다.",
          "1": "길이 제한 없이는 잡담이 늘어납니다."
        },
        "realWorldTip": "출처를 하이퍼링크로 반환하게 하면 검증이 빨라진다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "고객지원",
          "프롬프트작성",
          "문서작성"
        ]
      }
    ],
    "advanced": [
      {
        "id": "cs_prompt_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "자동화된 응답 패치 제안을 안전하게 받으려면?",
        "options": [
          "patch 형태와 테스트/검증 단계 요청",
          "자유 서술",
          "바로 배포"
        ],
        "correct": 0,
        "desc": "구조화와 검증 요청이 안전하다.",
        "enemyType": "trojan",
        "concept": "패치 제안",
        "whyCorrect": "patch와 테스트를 요구하면 안전하게 검토/적용할 수 있다. 자유 서술이나 바로 배포는 위험하다.",
        "whyWrong": {
          "1": "자유 서술은 적용하기 어렵습니다.",
          "2": "바로 배포는 오류 위험이 큽니다."
        },
        "realWorldTip": "테스트 결과와 함께 패치를 받도록 해 CI에 바로 연결하세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "automation",
        "tags": [
          "고객지원",
          "프롬프트작성",
          "자동화"
        ]
      },
      {
        "id": "cs_prompt_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "CS 에이전트 프롬프트에서 환각을 줄이는 설계는?",
        "options": [
          "출처 강조·금지 답변·부정 응답 허용",
          "창의력 최우선",
          "길이 제한 없음"
        ],
        "correct": 0,
        "desc": "출처와 금지 답변을 넣어야 허구가 줄어든다.",
        "enemyType": "virus",
        "concept": "환각 방지",
        "whyCorrect": "출처를 요구하고 금지 답변/부정 응답을 허용하면 허구가 줄어든다. 창의성/무제한 길이는 위험하다.",
        "whyWrong": {
          "1": "창의성만 강조하면 사실과 다른 답을 낼 수 있습니다.",
          "2": "길이 무제한은 불필요한 내용을 늘립니다."
        },
        "realWorldTip": "FAQ에 없는 질문엔 '확인 후 회신' 정책을 넣어 안전하게 대응하세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "고객지원",
          "프롬프트작성",
          "기획설계"
        ]
      }
    ]
  },
  "tools": {
    "beginner": [
      {
        "id": "cs_tools_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "티켓 요약 자동화를 시작할 때 필요한 준비는?",
        "options": [
          "UI 테마",
          "폰트",
          "티켓 필드 스키마와 민감 정보 마스킹 규칙"
        ],
        "correct": 2,
        "desc": "스키마/마스킹이 있어야 안전하다.",
        "enemyType": "glitch",
        "concept": "티켓 자동화",
        "whyCorrect": "필드 정의와 마스킹 규칙이 없으면 요약에 PII가 포함될 수 있다. 테마/폰트는 중요하지 않다.",
        "whyWrong": {
          "0": "테마는 보안과 무관합니다.",
          "1": "폰트도 무관합니다."
        },
        "realWorldTip": "민감 필드를 발견하면 마스킹하도록 프롬프트에 넣으세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "automation",
        "tags": [
          "고객지원",
          "도구선택",
          "자동화"
        ]
      },
      {
        "id": "cs_tools_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "간단한 매크로 수정에 적합한 도구는?",
        "options": [
          "대형 챗모델 장문 세션",
          "헬프데스크 내 AI 편집기",
          "수동 편집만"
        ],
        "correct": 1,
        "desc": "맥락 보존이 되는 내장 편집기가 빠르다.",
        "enemyType": "bug",
        "concept": "도구 선택",
        "whyCorrect": "헬프데스크 내 편집기는 필드/변수 문맥을 유지해 작은 수정에 효율적이다. 장문 챗은 과잉, 수동만은 느리다.",
        "whyWrong": {
          "0": "챗은 전략 작업에 쓰세요.",
          "2": "수동만 하면 시간이 오래 걸립니다."
        },
        "realWorldTip": "편집 시 변수(placeholders)가 깨지지 않게 명확히 지시하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "analysis",
        "tags": [
          "고객지원",
          "도구선택",
          "데이터분석"
        ]
      },
      {
        "id": "cs_tools_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "이벤트 알림 요약을 자동화할 때 무엇을 포함해야 할까?",
        "options": [
          "배경색",
          "폰트 굵기",
          "이벤트 타입·영향·조치 권장사항"
        ],
        "correct": 2,
        "desc": "타입/영향/조치를 줘야 알림이 유용하다.",
        "enemyType": "worm",
        "concept": "알림 요약",
        "whyCorrect": "이벤트 종류와 영향, 권장 조치를 주면 AI가 실행형 알림을 만든다. 색상/폰트는 의미를 주지 않는다.",
        "whyWrong": {
          "0": "색상은 영향도를 설명하지 않습니다.",
          "1": "폰트도 무관합니다."
        },
        "realWorldTip": "알림에 티켓 생성 링크를 함께 넣어 즉시 전환을 유도하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "고객지원",
          "도구선택",
          "콘텐츠제작"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "cs_tools_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "챗봇 인텐트 분류 정확도를 높이려면?",
        "options": [
          "예시 없이 라벨만 줌",
          "대표 문장과 정답 인텐트 예시를 다수 제공",
          "랜덤 데이터"
        ],
        "correct": 1,
        "desc": "예시가 있어야 분류 기준이 선다.",
        "enemyType": "virus",
        "concept": "인텐트 학습",
        "whyCorrect": "예시와 라벨을 주면 모델이 기준을 학습한다. 라벨만이나 랜덤 데이터는 기준이 없다.",
        "whyWrong": {
          "0": "라벨만으론 포맷과 기준을 알기 어렵습니다.",
          "2": "랜덤 데이터는 잡음을 늘립니다."
        },
        "realWorldTip": "월별로 예시를 갱신해 신규 문의 패턴을 반영하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "analysis",
        "tags": [
          "고객지원",
          "도구선택",
          "데이터분석"
        ]
      },
      {
        "id": "cs_tools_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "헬프데스크 자동 분류를 도입할 때 필요한 모니터링은?",
        "options": [
          "정확도/재현율·오분류 케이스 리뷰·피드백 루프",
          "색상 테마",
          "폰트"
        ],
        "correct": 0,
        "desc": "성능/오분류 리뷰가 필수다.",
        "enemyType": "trojan",
        "concept": "모니터링",
        "whyCorrect": "정확도/재현율을 보고 오분류를 리뷰하며 피드백을 넣어야 품질이 유지된다. 테마/폰트는 영향이 없다.",
        "whyWrong": {
          "1": "테마는 성능과 무관합니다.",
          "2": "폰트도 마찬가지입니다."
        },
        "realWorldTip": "오분류된 티켓은 자동으로 QA 큐로 보내 리뷰하게 하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "고객지원",
          "도구선택",
          "디버깅"
        ]
      },
      {
        "id": "cs_tools_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "CS 지식 RAG를 만들 때 핵심은?",
        "options": [
          "정책/가이드 문서를 청크·태그·출처 포함",
          "PDF 통째 업로드",
          "검색 없이 답변"
        ],
        "correct": 0,
        "desc": "청크와 출처가 있어야 정확도가 높다.",
        "enemyType": "bug",
        "concept": "RAG",
        "whyCorrect": "청크/태그로 문맥을 나누고 출처를 붙여야 정확/검증이 쉬운 답을 준다. 통째 업로드나 검색 생략은 환각을 키운다.",
        "whyWrong": {
          "1": "통째 업로드는 노이즈가 많습니다.",
          "2": "검색 없이 답하면 허구가 늘어납니다."
        },
        "realWorldTip": "출처 링크를 답변에 포함해 상담원이 바로 검증하게 하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "고객지원",
          "도구선택",
          "커뮤니케이션"
        ]
      }
    ],
    "advanced": [
      {
        "id": "cs_tools_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "자동 응답/패치 적용 파이프라인의 필수 가드레일은?",
        "options": [
          "바로 프로덕션 적용",
          "샌드박스 테스트·롤백 계획·승인 워크플로",
          "로그 없이 실행"
        ],
        "correct": 1,
        "desc": "테스트/롤백/승인이 있어야 안전하다.",
        "enemyType": "virus",
        "concept": "가드레일",
        "whyCorrect": "샌드박스 테스트와 롤백, 승인 단계를 거쳐야 CS 자동화가 안전하게 동작한다. 즉시 적용이나 로그 없음은 사고를 낳는다.",
        "whyWrong": {
          "0": "바로 적용은 위험합니다.",
          "2": "로그 없이는 원인 추적이 안 됩니다."
        },
        "realWorldTip": "패치/응답에 테스트 결과를 첨부하도록 요구하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "고객지원",
          "도구선택",
          "디버깅"
        ]
      },
      {
        "id": "cs_tools_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "CS 챗봇 SLA를 지키기 위한 기술 조합은?",
        "options": [
          "캐시·폴백 답변·서킷브레이커·SLI 알람",
          "테마 변경",
          "폰트 변경"
        ],
        "correct": 0,
        "desc": "신뢰성을 위해 캐시/폴백/차단/알람이 필요하다.",
        "enemyType": "trojan",
        "concept": "신뢰성",
        "whyCorrect": "캐시로 반복 질문을 빠르게 처리하고, 장애 시 폴백, 오류 폭증 시 차단, SLI 알람을 둬야 SLA를 지킨다. 테마/폰트는 무관하다.",
        "whyWrong": {
          "1": "테마는 가용성과 관계없습니다.",
          "2": "폰트도 무관합니다."
        },
        "realWorldTip": "폴백 시에는 상담원 연결 옵션을 함께 제시하도록 하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "고객지원",
          "도구선택",
          "디버깅"
        ]
      }
    ]
  },
  "ethics": {
    "beginner": [
      {
        "id": "cs_ethics_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "고객 녹취를 AI에 보낼 때 기본 원칙은?",
        "options": [
          "민감 정보 마스킹·승인된 용도만 사용",
          "전체 녹취를 아무 도구에 업로드",
          "동의 없이 사용"
        ],
        "correct": 0,
        "desc": "마스킹과 목적 제한이 필수다.",
        "enemyType": "glitch",
        "concept": "녹취 보호",
        "whyCorrect": "민감 정보는 가리고 승인된 도구에서만 써야 유출/위반을 막는다. 무분별 업로드나 무동의 사용은 위험하다.",
        "whyWrong": {
          "1": "무분별 업로드는 유출 위험이 큽니다.",
          "2": "동의 없이 사용하면 규정 위반입니다."
        },
        "realWorldTip": "녹취 업로드 전 자동 마스킹 파이프라인을 사용하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "automation",
        "tags": [
          "고객지원",
          "윤리보안",
          "자동화"
        ]
      },
      {
        "id": "cs_ethics_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "AI가 제안한 응답을 고객에게 보내기 전 해야 할 일은?",
        "options": [
          "정책/정확성 검토",
          "그대로 발송",
          "출처를 숨김"
        ],
        "correct": 0,
        "desc": "검토 없이 발송하면 리스크가 크다.",
        "enemyType": "bug",
        "concept": "검수",
        "whyCorrect": "정책과 정확성을 확인해야 오답/위반을 막는다. 그대로 발송이나 출처 숨김은 위험하다.",
        "whyWrong": {
          "1": "검토 없이 보내면 오답이 나갈 수 있습니다.",
          "2": "출처 숨김은 신뢰를 해칩니다."
        },
        "realWorldTip": "자동 응답에도 검수 플래그를 남겨 추적 가능하게 하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "고객지원",
          "윤리보안",
          "문서작성"
        ]
      },
      {
        "id": "cs_ethics_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "챗봇이 모르는 질문을 받았을 때 안전한 대응은?",
        "options": [
          "모른다고 말하고 상담원 연결 옵션 제공",
          "추측해서 답변",
          "응답을 거부"
        ],
        "correct": 0,
        "desc": "모른다고 말하고 연결하는 게 안전하다.",
        "enemyType": "trojan",
        "concept": "안전 응답",
        "whyCorrect": "모른다고 밝히고 상담원 연결을 제시하면 오답/오해를 줄인다. 추측은 환각을 키우고, 거부만 하면 경험이 나쁘다.",
        "whyWrong": {
          "1": "추측 답변은 잘못된 정보를 줄 수 있습니다.",
          "2": "거부만 하면 고객 경험이 나빠집니다."
        },
        "realWorldTip": "모르는 질문은 자동으로 티켓을 만들어 추적하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "고객지원",
          "윤리보안",
          "커뮤니케이션"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "cs_ethics_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "CS 데이터로 모델을 학습시키기 전 확인해야 할 것?",
        "options": [
          "모두 원문으로 저장",
          "아무 확인 없이 학습",
          "데이터 동의·보관 기간·익명화 여부"
        ],
        "correct": 2,
        "desc": "동의/보관/익명화가 필수다.",
        "enemyType": "virus",
        "concept": "데이터 거버넌스",
        "whyCorrect": "동의와 보관 기간, 익명화를 확인해야 규정 준수가 된다. 원문 저장이나 무확인은 위험하다.",
        "whyWrong": {
          "0": "원문 저장은 유출 위험이 큽니다.",
          "1": "확인 없이 학습은 규정 위반일 수 있습니다."
        },
        "realWorldTip": "데이터 사용 목적/기간을 메타데이터로 남기세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "analysis",
        "tags": [
          "고객지원",
          "윤리보안",
          "데이터분석"
        ]
      },
      {
        "id": "cs_ethics_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI 응답에 편향이 생기지 않게 하려면?",
        "options": [
          "편향을 무시",
          "편향 사례 점검·금지 표현·감독 루프",
          "창의성만 높임"
        ],
        "correct": 1,
        "desc": "편향 점검/금지어/감독이 필요하다.",
        "enemyType": "glitch",
        "concept": "편향 방지",
        "whyCorrect": "편향 사례를 점검하고 금지 표현을 설정, 감독 루프를 돌려야 편향을 줄인다. 무시하거나 창의성만 높이면 위험하다.",
        "whyWrong": {
          "0": "무시는 문제를 키웁니다.",
          "2": "창의성만 높이면 규정 위반 답이 나올 수 있습니다."
        },
        "realWorldTip": "정기적으로 샘플 응답을 리뷰해 편향을 모니터링하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "고객지원",
          "윤리보안",
          "코드리뷰"
        ]
      },
      {
        "id": "cs_ethics_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "로그 저장 시 개인정보 노출을 줄이는 방법은?",
        "options": [
          "평문 전체 저장",
          "식별자 마스킹·필요 필드만 저장·암호화",
          "로그를 아예 저장하지 않음"
        ],
        "correct": 1,
        "desc": "마스킹·최소화·암호화가 기본이다.",
        "enemyType": "worm",
        "concept": "로그 보안",
        "whyCorrect": "마스킹과 최소 저장, 암호화를 해야 유출 위험을 낮춘다. 평문 저장은 위험하고, 로그 부재는 추적이 불가하다.",
        "whyWrong": {
          "0": "평문 저장은 유출 시 피해가 큽니다.",
          "2": "로그가 없으면 문제를 추적할 수 없습니다."
        },
        "realWorldTip": "로그 민감도에 따라 보존 기간을 다르게 설정하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "고객지원",
          "윤리보안",
          "디버깅"
        ]
      }
    ],
    "advanced": [
      {
        "id": "cs_ethics_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "자동 응답 봇의 권한 설계 원칙은?",
        "options": [
          "읽기/제안 위주, 실행은 승인 후",
          "전체 관리자",
          "비밀키 노출"
        ],
        "correct": 0,
        "desc": "최소 권한이 안전하다.",
        "enemyType": "trojan",
        "concept": "권한 최소화",
        "whyCorrect": "제안/초안까지만 허용하고 실행은 승인해야 사고를 막는다. 관리자 권한이나 키 노출은 위험하다.",
        "whyWrong": {
          "1": "전체 권한은 오작동 시 피해가 큽니다.",
          "2": "키 노출은 즉시 보안 사고입니다."
        },
        "realWorldTip": "봇 계정에 세분화된 역할을 부여하고 로깅을 필수화하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "고객지원",
          "윤리보안",
          "기획설계"
        ]
      },
      {
        "id": "cs_ethics_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "자동화된 CS 시스템의 감사 가능성을 높이려면?",
        "options": [
          "로그 미저장",
          "요청/응답·모델 버전·사용 데이터 출처를 기록",
          "평문 외부 저장"
        ],
        "correct": 1,
        "desc": "로그와 출처 기록이 감사에 필수다.",
        "enemyType": "virus",
        "concept": "감사",
        "whyCorrect": "요청/응답과 버전, 데이터 출처를 기록해야 문제 발생 시 추적/재현이 가능하다. 로그 부재나 평문 저장은 위험하다.",
        "whyWrong": {
          "0": "로그가 없으면 원인을 찾을 수 없습니다.",
          "2": "평문 외부 저장은 유출 위험이 큽니다."
        },
        "realWorldTip": "민감도에 따라 로그 접근 권한을 분리하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "고객지원",
          "윤리보안",
          "디버깅"
        ]
      }
    ]
  },
  "advanced": {
    "beginner": [
      {
        "id": "cs_advanced_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "CS 자동화 워크플로 설계에서 가장 먼저 정할 것은?",
        "options": [
          "입력/출력 스키마와 예외 처리",
          "배경색",
          "로고 크기"
        ],
        "correct": 0,
        "desc": "스키마/예외가 있어야 자동화가 안정적이다.",
        "enemyType": "glitch",
        "concept": "워크플로 스키마",
        "whyCorrect": "입출력과 예외를 정의하면 오작동을 줄일 수 있다. 색상/로고는 중요도가 낮다.",
        "whyWrong": {
          "1": "색상은 동작과 무관합니다.",
          "2": "로고 크기는 우선순위가 아닙니다."
        },
        "realWorldTip": "예외 발생 시 핸드오프 경로를 스키마에 포함하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "고객지원",
          "자동화설계",
          "기획설계"
        ]
      },
      {
        "id": "cs_advanced_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "프롬프트 회귀 테스트를 CS에 적용할 때 필요한 것은?",
        "options": [
          "대표 질문/답변 스냅샷 세트",
          "임의 한두 질문",
          "감으로 평가"
        ],
        "correct": 0,
        "desc": "스냅샷 세트가 있어야 회귀를 잡는다.",
        "enemyType": "bug",
        "concept": "프롬프트 회귀",
        "whyCorrect": "대표 FAQ/예외 질문과 기대 답을 저장해야 모델 변경 시 품질을 비교할 수 있다. 한두 개나 감은 부족하다.",
        "whyWrong": {
          "1": "한두 질문으론 커버리지가 부족합니다.",
          "2": "감은 일관성이 없습니다."
        },
        "realWorldTip": "월별로 스냅샷을 업데이트해 신규 질문을 반영하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "고객지원",
          "자동화설계",
          "코드리뷰"
        ]
      },
      {
        "id": "cs_advanced_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "LLM 캐싱을 CS 챗봇에 쓸 때 고려할 것?",
        "options": [
          "모든 답 무조건 캐싱",
          "정책 버전/FAQ 업데이트 시 캐시 무효화",
          "캐싱 미사용"
        ],
        "correct": 1,
        "desc": "버전 기준 무효화가 필요하다.",
        "enemyType": "virus",
        "concept": "캐싱",
        "whyCorrect": "정책/FAQ가 바뀌면 캐시를 비워야 한다. 무조건 캐싱은 오래된 정보를 반환하고, 미사용은 비용을 높인다.",
        "whyWrong": {
          "0": "무조건 캐싱은 잘못된 답을 유지합니다.",
          "2": "캐싱을 안 쓰면 비용/지연이 커집니다."
        },
        "realWorldTip": "FAQ 스냅샷 ID를 캐시 키에 포함하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "고객지원",
          "자동화설계",
          "문서작성"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "cs_advanced_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "SLA가 있는 CS 챗봇 모니터링 핵심 지표는?",
        "options": [
          "응답 시간·정확도·핸드오프 비율",
          "배경색",
          "폰트"
        ],
        "correct": 0,
        "desc": "속도/품질/핸드오프를 봐야 한다.",
        "enemyType": "glitch",
        "concept": "모니터링",
        "whyCorrect": "응답 시간, 정확도, 핸드오프 비율을 모니터링해야 SLA를 지킨다. 색상/폰트는 무관하다.",
        "whyWrong": {
          "1": "색상은 SLA에 영향을 주지 않습니다.",
          "2": "폰트도 마찬가지입니다."
        },
        "realWorldTip": "핸드오프 기준을 명확히 정의해 잘못된 전환을 줄이세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "고객지원",
          "자동화설계",
          "코드리뷰"
        ]
      },
      {
        "id": "cs_advanced_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "도구 호출 CS 에이전트의 안전장치는?",
        "options": [
          "임의 명령 실행 허용",
          "실패 방치",
          "입력 검증·타임아웃·재시도/폴백"
        ],
        "correct": 2,
        "desc": "검증/타임아웃/폴백이 필수다.",
        "enemyType": "trojan",
        "concept": "툴 안전",
        "whyCorrect": "검증/타임아웃/재시도·폴백이 없으면 시스템 명령이 위험하게 실행될 수 있다.",
        "whyWrong": {
          "0": "임의 실행은 보안 위험이 큽니다.",
          "1": "실패를 방치하면 파이프라인이 멈출 수 있습니다."
        },
        "realWorldTip": "실패 로그를 수집해 패턴을 학습시키면 안정성이 높아집니다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "고객지원",
          "자동화설계",
          "디버깅"
        ]
      },
      {
        "id": "cs_advanced_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "자동화 품질을 평가할 때 봐야 할 지표 조합은?",
        "options": [
          "해결률·처리시간·재오픈율·비용",
          "길이만",
          "감정만"
        ],
        "correct": 0,
        "desc": "성과/속도/재오픈/비용을 함께 봐야 한다.",
        "enemyType": "worm",
        "concept": "품질 지표",
        "whyCorrect": "해결률, 처리시간, 재오픈율, 비용을 함께 봐야 자동화가 효과적인지 알 수 있다. 길이나 감정만으론 부족하다.",
        "whyWrong": {
          "1": "길이만으론 품질을 알 수 없습니다.",
          "2": "감정만 보면 성과를 놓칩니다."
        },
        "realWorldTip": "월별 트렌드를 기록해 개선 효과를 추적하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "고객지원",
          "자동화설계",
          "코드리뷰"
        ]
      }
    ],
    "advanced": [
      {
        "id": "cs_advanced_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "CS 자동화 배포 파이프라인 필수 단계는?",
        "options": [
          "바로 전체 배포",
          "QA 샘플 테스트→승인→점진적 롤아웃→모니터링",
          "로그 없음"
        ],
        "correct": 1,
        "desc": "테스트/승인/점진 배포가 필요하다.",
        "enemyType": "virus",
        "concept": "배포 가드",
        "whyCorrect": "샘플 테스트와 승인, 점진적 배포, 모니터링이 있어야 안정적이다. 즉시 전체 배포나 로그 없음은 위험하다.",
        "whyWrong": {
          "0": "바로 배포는 오류 확산 위험이 큽니다.",
          "2": "로그가 없으면 문제를 추적할 수 없습니다."
        },
        "realWorldTip": "롤백 스위치와 경보를 함께 설정하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "고객지원",
          "자동화설계",
          "디버깅"
        ]
      },
      {
        "id": "cs_advanced_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "CS 자동화 SLA를 지키기 위한 기술 조합은?",
        "options": [
          "테마 변경",
          "캐시·폴백·서킷브레이커·SLI 알람",
          "폰트 변경"
        ],
        "correct": 1,
        "desc": "신뢰성을 위한 캐시/폴백/차단/알람이 필요하다.",
        "enemyType": "glitch",
        "concept": "신뢰성",
        "whyCorrect": "캐시/폴백/차단/알람이 있어야 SLA를 지킨다. 테마/폰트는 무관하다.",
        "whyWrong": {
          "0": "테마는 가용성과 관계없습니다.",
          "2": "폰트도 마찬가지입니다."
        },
        "realWorldTip": "정기적으로 폴백 연습을 해 장애 대응을 숙달하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "automation",
        "tags": [
          "고객지원",
          "자동화설계",
          "자동화"
        ]
      }
    ]
  }
};

// 디자이너 직무 40문항
const DESIGNER_QUESTIONS = {
  "practical": {
    "beginner": [
      {
        "id": "designer_practical_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "와이어프레임 초안을 AI에 맡길 때 먼저 전달할 것?",
        "options": [
          "브랜드 슬로건만",
          "랜덤 이미지만",
          "목표·사용자 시나리오·필수 요소·제약"
        ],
        "correct": 2,
        "desc": "목표와 제약을 주면 구조가 바로 잡힌다.",
        "enemyType": "glitch",
        "concept": "와이어 브리프",
        "whyCorrect": "목표와 시나리오, 필수 요소/제약을 주면 AI가 흐름을 설계한다. 슬로건/이미지만으론 구조가 나오지 않는다.",
        "whyWrong": {
          "0": "슬로건만으론 정보 구조를 만들기 어렵습니다.",
          "1": "랜덤 이미지는 맥락과 무관합니다."
        },
        "realWorldTip": "주요 사용자 여정(진입-행동-결과)을 함께 주면 흐름이 더 명확해진다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "디자인",
          "실무활용",
          "기획설계"
        ]
      },
      {
        "id": "designer_practical_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "디자인 리뷰 메모를 AI가 쓰게 할 때 핵심은?",
        "options": [
          "색상 코드만",
          "감상만",
          "문제 지점·추천 수정·우선순위를 명시"
        ],
        "correct": 2,
        "desc": "문제/수정/우선순위를 줘야 actionable하다.",
        "enemyType": "worm",
        "concept": "리뷰 메모",
        "whyCorrect": "문제와 추천 수정, 우선순위를 주면 바로 실행 가능한 메모가 된다. 색상/감상만으론 부족하다.",
        "whyWrong": {
          "0": "색상만으론 문제 해결에 부족합니다.",
          "1": "감상은 액션을 만들지 못합니다."
        },
        "realWorldTip": "컴포넌트 이름과 화면 경로를 함께 적어 정확도를 높이세요.",
        "skill": "result-validation",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "디자인",
          "실무활용",
          "코드리뷰"
        ]
      },
      {
        "id": "designer_practical_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "이미지 생성 프롬프트를 AI에 요청할 때 필요한 정보는?",
        "options": [
          "스타일·구성 요소·색감·용도",
          "파일 크기만",
          "아무 말 없이 생성"
        ],
        "correct": 0,
        "desc": "스타일/구성/색감/용도가 있어야 원하는 이미지가 나온다.",
        "enemyType": "bug",
        "concept": "이미지 프롬프트",
        "whyCorrect": "스타일, 포함 요소, 색감, 사용 목적을 주면 AI가 맞춤 이미지를 만든다. 파일 크기나 무맥락 요청은 품질이 낮다.",
        "whyWrong": {
          "1": "크기만으론 내용을 알 수 없습니다.",
          "2": "맥락 없는 요청은 랜덤 이미지를 만듭니다."
        },
        "realWorldTip": "사용 채널(웹/모바일/프린트)을 명시하면 비율과 디테일이 맞춰진다.",
        "skill": "result-validation",
        "aiTool": "midjourney",
        "scenario": "code-review",
        "tags": [
          "디자인",
          "실무활용",
          "코드리뷰",
          "미드저니"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "designer_practical_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "디자인 시스템 토큰 변경을 AI로 제안받을 때 필요한 입력은?",
        "options": [
          "랜덤 색상 팔레트",
          "현재 토큰 값·사용 맥락·제약(접근성/브랜드)",
          "폰트 이름만"
        ],
        "correct": 1,
        "desc": "현재 값과 제약을 줘야 안전한 제안이 나온다.",
        "enemyType": "virus",
        "concept": "토큰 관리",
        "whyCorrect": "현재 토큰과 사용 맥락, 접근성/브랜드 제약을 주면 AI가 충돌 없이 제안한다. 랜덤 팔레트나 폰트만으론 위험하다.",
        "whyWrong": {
          "0": "랜덤 팔레트는 브랜드/접근성 문제를 일으킬 수 있습니다.",
          "2": "폰트만으론 색/간격 등 다른 토큰을 다룰 수 없습니다."
        },
        "realWorldTip": "토큰 변경 시 영향받는 컴포넌트 리스트를 함께 요청하세요.",
        "skill": "context-giving",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "디자인",
          "실무활용",
          "콘텐츠제작"
        ]
      },
      {
        "id": "designer_practical_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "사용성 테스트 스크립트를 AI에 맡길 때 포함할 것?",
        "options": [
          "테스트 목표·시나리오·과업·관찰 포인트",
          "테스트 장소",
          "장비 브랜드"
        ],
        "correct": 0,
        "desc": "목표/시나리오/과업/관찰 포인트가 스크립트 핵심이다.",
        "enemyType": "glitch",
        "concept": "UT 스크립트",
        "whyCorrect": "무엇을 검증할지와 과업, 관찰 포인트를 주면 AI가 집중된 스크립트를 만든다. 장소/장비는 부차적이다.",
        "whyWrong": {
          "1": "장소는 스크립트 핵심이 아닙니다.",
          "2": "장비 브랜드도 중요도가 낮습니다."
        },
        "realWorldTip": "성공 기준을 함께 정의하면 결과 분석이 쉬워진다.",
        "skill": "result-validation",
        "aiTool": "general",
        "scenario": "analysis",
        "tags": [
          "디자인",
          "실무활용",
          "데이터분석"
        ]
      },
      {
        "id": "designer_practical_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "프로토타입 피드백을 AI로 정리할 때 필요한 데이터는?",
        "options": [
          "디자이너 취향",
          "피드백 원문·스크린 참조·우선순위 기준",
          "랜덤 밈"
        ],
        "correct": 1,
        "desc": "원문/참조/우선순위가 있어야 정리가 된다.",
        "enemyType": "worm",
        "concept": "피드백 정리",
        "whyCorrect": "피드백과 화면 참조, 우선순위 기준을 주면 AI가 actionable 리스트를 만든다. 취향/밈은 무관하다.",
        "whyWrong": {
          "0": "취향만으론 우선순위를 정할 수 없습니다.",
          "2": "밈은 정보와 무관합니다."
        },
        "realWorldTip": "피드백에 태그(버그/UX/카피)를 붙여달라고 하면 분류가 빨라진다.",
        "skill": "result-validation",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "디자인",
          "실무활용",
          "디버깅"
        ]
      }
    ],
    "advanced": [
      {
        "id": "designer_practical_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "디자인 QA 체크리스트를 AI에 만들게 할 때 핵심은?",
        "options": [
          "플랫폼별 기준·접근성·성능/반응형 항목",
          "색상만",
          "폰트만"
        ],
        "correct": 0,
        "desc": "플랫폼/접근성/성능 항목이 핵심이다.",
        "enemyType": "bug",
        "concept": "QA 체크리스트",
        "whyCorrect": "플랫폼 가이드, 접근성, 성능/반응형 항목을 주면 QA 체크리스트가 실용적이다. 색상/폰트만으론 부족하다.",
        "whyWrong": {
          "1": "색상만으론 QA를 할 수 없습니다.",
          "2": "폰트만으로는 범위를 정의할 수 없습니다."
        },
        "realWorldTip": "체크리스트에 스크린샷 예시를 요청하면 QA 속도가 빨라진다.",
        "skill": "result-validation",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "디자인",
          "실무활용",
          "문서작성"
        ]
      },
      {
        "id": "designer_practical_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "AI로 대규모 이미지 변형을 생성할 때 안전장치는?",
        "options": [
          "브랜드 가이드·금지 요소·검수 플로우 지정",
          "즉시 모든 채널에 게시",
          "검수 없이 사용"
        ],
        "correct": 0,
        "desc": "가이드/검수가 있어야 브랜드 리스크를 줄인다.",
        "enemyType": "virus",
        "concept": "대량 생성 가드",
        "whyCorrect": "가이드와 금지 요소, 검수 플로우를 지정해야 정책/브랜드 위반을 막는다. 즉시 게시나 무검수는 위험하다.",
        "whyWrong": {
          "1": "즉시 게시하면 오류가 그대로 노출됩니다.",
          "2": "검수 없이는 품질/정책 리스크가 큽니다."
        },
        "realWorldTip": "승인된 샘플 세트를 프롬프트에 첨부하면 일관성이 올라간다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "디자인",
          "실무활용",
          "문서작성"
        ]
      }
    ]
  },
  "advanced": {
    "beginner": [
      {
        "id": "designer_advanced_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "디자인 자동화 플로우를 짤 때 가장 먼저 정의할 것은?",
        "options": [
          "배경색",
          "로고 크기",
          "입력/출력 스키마와 승인 기준"
        ],
        "correct": 2,
        "desc": "스키마/승인이 있어야 안전하게 자동화된다.",
        "enemyType": "glitch",
        "concept": "워크플로 정의",
        "whyCorrect": "어떤 입력을 받아 어떤 산출을 내놓을지, 승인 조건은 무엇인지 정해야 자동 적용 시 위험을 줄인다. 색상/로고는 동작과 무관하다.",
        "whyWrong": {
          "0": "배경색은 자동화 정확도와 관계없습니다.",
          "1": "로고 크기는 기능보다 우선순위가 낮습니다."
        },
        "realWorldTip": "스키마에 접근성/브랜드 체크 결과 필드도 포함시키면 검수가 쉬워진다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "디자인",
          "자동화설계",
          "콘텐츠제작"
        ]
      },
      {
        "id": "designer_advanced_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "디자인 프롬프트 회귀 테스트를 시작할 때 준비할 것은?",
        "options": [
          "임의 프롬프트 한두 개",
          "감으로 평가",
          "대표 입력/출력 스냅샷과 점수 기준"
        ],
        "correct": 2,
        "desc": "스냅샷이 있어야 모델 변경 시 품질 변화를 잡는다.",
        "enemyType": "bug",
        "concept": "프롬프트 회귀",
        "whyCorrect": "주요 카피/레이아웃 요청과 기대 출력을 저장해둬야 업그레이드 후 비교가 가능하다. 임의/감에 의존하면 회귀를 놓친다.",
        "whyWrong": {
          "0": "한두 개로는 커버리지가 부족합니다.",
          "1": "감에 의존하면 일관성이 없습니다."
        },
        "realWorldTip": "스냅샷은 버전 관리해서 모델 변경 이력을 함께 기록하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "디자인",
          "자동화설계",
          "코드리뷰"
        ]
      },
      {
        "id": "designer_advanced_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "디자인 어시스턴트에 캐싱을 적용할 때 핵심은?",
        "options": [
          "질문 파라미터와 가이드 버전을 키에 포함",
          "모든 응답을 무조건 캐싱",
          "캐싱을 쓰지 않음"
        ],
        "correct": 0,
        "desc": "버전 포함 키가 있어야 오래된 답을 막는다.",
        "enemyType": "virus",
        "concept": "캐싱 설계",
        "whyCorrect": "가이드/토큰 버전과 입력 파라미터를 키로 넣어야 정책 변경 시 캐시를 무효화할 수 있다. 무조건 캐싱은 오래된 답을 반복하고, 미사용은 비용이 증가한다.",
        "whyWrong": {
          "1": "무조건 캐싱은 잘못된 정보를 계속 보여줄 수 있습니다.",
          "2": "캐싱을 안 쓰면 동일 질문에도 비용/지연이 늘어납니다."
        },
        "realWorldTip": "가이드 업데이트 시 버전 번호를 올리고 캐시를 비우는 훅을 두세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "디자인",
          "자동화설계",
          "기획설계"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "designer_advanced_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "디자인 자동화의 품질 지표를 정리할 때 봐야 할 것은?",
        "options": [
          "색상 만족도만",
          "정확도(규격 준수)·접근성 실패율·수동 개입 비율·비용",
          "길이만"
        ],
        "correct": 1,
        "desc": "품질/접근성/개입/비용을 함께 봐야 한다.",
        "enemyType": "glitch",
        "concept": "품질 지표",
        "whyCorrect": "규격/토큰 준수 정확도, 접근성 실패율, 수동 개입 비율, 비용을 함께 봐야 자동화가 실효성 있는지 판단한다. 색상/길이만 보면 실무 품질을 놓친다.",
        "whyWrong": {
          "0": "색상 만족도만으론 전체 품질을 알 수 없습니다.",
          "2": "길이는 품질의 일부 요소일 뿐입니다."
        },
        "realWorldTip": "월별로 지표를 기록해 자동화 변경이 미친 영향을 추적하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "디자인",
          "자동화설계",
          "코드리뷰"
        ]
      },
      {
        "id": "designer_advanced_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "디자인 도구 호출 에이전트를 만들 때 필요한 안전장치는?",
        "options": [
          "임의 시스템 명령 허용",
          "실패를 방치",
          "입력 검증·타임아웃·재시도/롤백 계획"
        ],
        "correct": 2,
        "desc": "검증/타임아웃/재시도가 없으면 위험하다.",
        "enemyType": "trojan",
        "concept": "툴 오케스트레이션",
        "whyCorrect": "입출력 검증과 타임아웃, 재시도/롤백이 있어야 잘못된 SVG/토큰을 적용하는 사고를 막는다. 임의 명령/방치는 보안·품질을 해친다.",
        "whyWrong": {
          "0": "임의 명령은 보안 사고를 부를 수 있습니다.",
          "1": "실패를 방치하면 파이프라인이 멈출 수 있습니다."
        },
        "realWorldTip": "툴 호출 결과는 모두 로그로 남겨 패턴을 학습시키세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "디자인",
          "자동화설계",
          "디버깅"
        ]
      },
      {
        "id": "designer_advanced_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "디자인 자동화 SLA를 위한 모니터링 지표는?",
        "options": [
          "응답 시간·정확도·접근성 실패율·핸드오프 비율",
          "배경색",
          "폰트"
        ],
        "correct": 0,
        "desc": "속도/정확도/접근성/핸드오프를 함께 봐야 한다.",
        "enemyType": "worm",
        "concept": "SLI",
        "whyCorrect": "응답 시간과 정확도, 접근성 실패율, 사람이 개입한 비율을 모니터링해야 SLA를 지킨다. 색상/폰트는 무관하다.",
        "whyWrong": {
          "1": "색상은 SLA와 무관합니다.",
          "2": "폰트도 SLA와 관계없습니다."
        },
        "realWorldTip": "접근성 실패는 자동 알람을 걸어 즉시 롤백하도록 설정하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "디자인",
          "자동화설계",
          "콘텐츠제작"
        ]
      }
    ],
    "advanced": [
      {
        "id": "designer_advanced_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "자동 디자인 변경을 프로덕션에 적용하기 전 필수 단계는?",
        "options": [
          "바로 전체 적용",
          "로그 없이 진행",
          "샌드박스 검증→시각 diff 리뷰→점진 배포"
        ],
        "correct": 2,
        "desc": "검증/리뷰/점진 배포가 있어야 안전하다.",
        "enemyType": "virus",
        "concept": "배포 가드",
        "whyCorrect": "샌드박스와 시각 diff 검토, 점진 배포를 거쳐야 잘못된 디자인이 퍼지는 걸 막는다. 즉시 적용이나 로그 부재는 큰 리스크다.",
        "whyWrong": {
          "0": "즉시 적용은 잘못된 디자인을 전면 노출할 수 있습니다.",
          "1": "로그가 없으면 문제 추적이 어렵습니다."
        },
        "realWorldTip": "배포 전후 스크린샷을 자동으로 수집해 롤백 여부를 판단하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "디자인",
          "자동화설계",
          "디버깅"
        ]
      },
      {
        "id": "designer_advanced_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "디자인 자동화 SLA를 지키기 위한 기술 조합은?",
        "options": [
          "테마 변경",
          "캐시·폴백·서킷브레이커·SLI 알람",
          "폰트 변경"
        ],
        "correct": 1,
        "desc": "신뢰성을 위한 캐시/폴백/차단/알람이 필요하다.",
        "enemyType": "trojan",
        "concept": "신뢰성",
        "whyCorrect": "캐시/폴백/차단/알람이 있어야 SLA를 지킨다. 테마/폰트는 무관하다.",
        "whyWrong": {
          "0": "테마는 가용성과 관계없습니다.",
          "2": "폰트도 무관합니다."
        },
        "realWorldTip": "정기적으로 폴백 연습을 해 장애 대응을 숙달하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "디자인",
          "자동화설계",
          "콘텐츠제작"
        ]
      }
    ]
  },
  "prompt": {
    "beginner": [
      {
        "id": "designer_prompt_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "AI에 디자인 카피/UX 마이크로카피를 요청할 때 포함할 것?",
        "options": [
          "이모지만",
          "아무 맥락 없이",
          "맥락·톤·길이·제약어"
        ],
        "correct": 2,
        "desc": "맥락/톤/길이/제약을 줘야 맞춤 카피가 나온다.",
        "enemyType": "glitch",
        "concept": "마이크로카피 프롬프트",
        "whyCorrect": "사용자 흐름 맥락, 톤, 길이, 금지어를 주면 UX 카피가 제품에 맞게 나온다. 이모지/무맥락은 품질을 낮춘다.",
        "whyWrong": {
          "0": "이모지만으론 정보를 전달하기 어렵습니다.",
          "1": "맥락이 없으면 동떨어진 카피가 나옵니다."
        },
        "realWorldTip": "A/B로 시험할 대안 2~3개를 요청하면 실험이 쉬워진다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "디자인",
          "프롬프트작성",
          "코드리뷰"
        ]
      },
      {
        "id": "designer_prompt_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "컴포넌트 문서를 AI로 작성할 때 좋은 지시는?",
        "options": [
          "색상만",
          "사용 목적·속성·예제 코드/이미지·금지 사례를 요구",
          "폰트만"
        ],
        "correct": 1,
        "desc": "목적/속성/예제/금지 사례를 포함해야 한다.",
        "enemyType": "worm",
        "concept": "컴포넌트 문서",
        "whyCorrect": "목적/속성/예제/안티패턴을 주면 문서가 완성도 있게 나온다. 색상/폰트만으론 부족하다.",
        "whyWrong": {
          "0": "색상만으론 사용법을 설명할 수 없습니다.",
          "2": "폰트만으로 문서를 작성할 수 없습니다."
        },
        "realWorldTip": "상호작용 상태(hover/focus)를 꼭 포함시키라고 지시하세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "디자인",
          "프롬프트작성",
          "문서작성"
        ]
      },
      {
        "id": "designer_prompt_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "디자인 피드백을 AI에 요약하게 할 때 형식은?",
        "options": [
          "감상문",
          "장점/문제/액션을 분리해 불릿으로",
          "길게 서술"
        ],
        "correct": 1,
        "desc": "장점/문제/액션 분리가 실행 가능성을 높인다.",
        "enemyType": "bug",
        "concept": "피드백 요약",
        "whyCorrect": "장점/문제/액션을 분리해달라 하면 팀이 바로 대응할 수 있다. 감상문이나 장문 서술은 시간이 든다.",
        "whyWrong": {
          "0": "감상만으론 개선 포인트를 찾기 어렵습니다.",
          "2": "장문 서술은 스캔이 어렵습니다."
        },
        "realWorldTip": "액션에 우선순위를 붙여달라고 하면 스프린트 계획이 빨라진다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "디자인",
          "프롬프트작성",
          "기획설계"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "designer_prompt_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI로 디자인 브리프를 확장할 때 환각을 줄이는 방법은?",
        "options": [
          "창의성만 강조",
          "근거 자료 링크와 금지 범위를 명시",
          "길이 제한 해제"
        ],
        "correct": 1,
        "desc": "근거/금지 범위를 주면 불필요한 확장을 막는다.",
        "enemyType": "virus",
        "concept": "브리프 확장",
        "whyCorrect": "근거 자료와 금지 요소를 주면 AI가 맥락 내에서 확장한다. 창의성/길이만 강조하면 엉뚱한 제안이 나온다.",
        "whyWrong": {
          "0": "창의성만 강조하면 브리프 밖으로 벗어날 수 있습니다.",
          "2": "길이 해제는 노이즈를 늘립니다."
        },
        "realWorldTip": "반드시 지켜야 할 브랜드/접근성 규칙을 명시하세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "디자인",
          "프롬프트작성",
          "콘텐츠제작"
        ]
      },
      {
        "id": "designer_prompt_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI에게 프레젠테이션 스토리라인을 요청할 때 필요한 것은?",
        "options": [
          "색상 테마만",
          "애매한 요청",
          "목적·청중·핵심 메시지·증거"
        ],
        "correct": 2,
        "desc": "목적/청중/메시지/증거가 스토리의 뼈대다.",
        "enemyType": "trojan",
        "concept": "스토리라인",
        "whyCorrect": "목적, 청중, 핵심 메시지, 증거를 주면 AI가 설득력 있는 구조를 만든다. 테마/모호한 요청은 부족하다.",
        "whyWrong": {
          "0": "테마만으론 메시지가 정해지지 않습니다.",
          "1": "모호하면 방향이 맞지 않을 수 있습니다."
        },
        "realWorldTip": "슬라이드 수와 분량을 함께 제한하면 더 실용적이다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "디자인",
          "프롬프트작성",
          "커뮤니케이션"
        ]
      },
      {
        "id": "designer_prompt_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI에게 접근성 검토를 맡길 때 프롬프트에 넣을 것은?",
        "options": [
          "브랜드 슬로건",
          "감성 문구",
          "WCAG 기준·색 대비·키보드 내비게이션 체크리스트"
        ],
        "correct": 2,
        "desc": "접근성 기준을 줘야 제대로 검토한다.",
        "enemyType": "glitch",
        "concept": "접근성 프롬프트",
        "whyCorrect": "WCAG 기준과 체크리스트를 주면 AI가 구체적으로 검토한다. 슬로건/감성 문구는 기준이 아니다.",
        "whyWrong": {
          "0": "슬로건은 접근성 지표가 아닙니다.",
          "1": "감성 문구도 기준이 아닙니다."
        },
        "realWorldTip": "색 대비 계산과 키보드 포커스 경로 점검을 요청하세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "디자인",
          "프롬프트작성",
          "커뮤니케이션"
        ]
      }
    ],
    "advanced": [
      {
        "id": "designer_prompt_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "자동 디자인 변경 제안을 안전하게 적용하려면?",
        "options": [
          "자유 서술",
          "patch 형식·영향 범위·테스트 플랜을 요청",
          "바로 머지"
        ],
        "correct": 1,
        "desc": "구조화와 테스트가 있어야 안전하다.",
        "enemyType": "worm",
        "concept": "자동 제안",
        "whyCorrect": "patch/영향/테스트를 요구하면 적용이 안전하다. 자유 서술이나 즉시 머지는 위험하다.",
        "whyWrong": {
          "0": "서술형은 적용이 어렵습니다.",
          "2": "즉시 머지는 오류를 배포할 수 있습니다."
        },
        "realWorldTip": "변경 제안에 스크린샷 diff를 요청하면 리뷰가 빨라진다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "디자인",
          "프롬프트작성",
          "코드리뷰"
        ]
      },
      {
        "id": "designer_prompt_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "다국어 UI 카피 검수를 AI에 맡길 때 설계는?",
        "options": [
          "자동 번역만",
          "언어별 금지어·톤·길이·현지화 체크리스트",
          "언어 선택을 맡김"
        ],
        "correct": 1,
        "desc": "언어별 체크리스트가 있어야 품질을 지킨다.",
        "enemyType": "virus",
        "concept": "다국어 검수",
        "whyCorrect": "금지어/톤/길이/현지화 체크리스트를 주면 문화적 오류를 줄인다. 번역만이나 언어 선택 맡김은 위험하다.",
        "whyWrong": {
          "0": "자동 번역만으론 뉘앙스를 놓칩니다.",
          "2": "언어 선택을 맡기면 우선순위를 반영하지 못합니다."
        },
        "realWorldTip": "현지 리뷰어가 확인할 항목을 AI 요약에 포함시키세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "디자인",
          "프롬프트작성",
          "디버깅"
        ]
      }
    ]
  },
  "tools": {
    "beginner": [
      {
        "id": "designer_tools_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "반복되는 레이아웃 변형을 빠르게 만들 도구는?",
        "options": [
          "디자인 툴 내 AI 변형",
          "장문 챗모델",
          "완전 수작업"
        ],
        "correct": 0,
        "desc": "툴 내 변형이 컨텍스트와 속도 모두 유리하다.",
        "enemyType": "glitch",
        "concept": "도구 선택",
        "whyCorrect": "디자인 툴 내 변형은 캔버스 컨텍스트를 그대로 활용한다. 챗모델은 과잉, 수작업은 느리다.",
        "whyWrong": {
          "1": "챗모델은 전략/서사 작업에 적합합니다.",
          "2": "수작업만 하면 속도가 느립니다."
        },
        "realWorldTip": "변형 요청 시 비율/여백 가이드를 함께 적으세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "디자인",
          "도구선택",
          "문서작성"
        ]
      },
      {
        "id": "designer_tools_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "길고 복잡한 디자인 설명을 정리할 때 적합한 방법은?",
        "options": [
          "챗모델에 구조/목적을 주고 요약 요청",
          "색상 린터 실행",
          "폰트 변경"
        ],
        "correct": 0,
        "desc": "챗모델 요약이 구조 정리에 유용하다.",
        "enemyType": "bug",
        "concept": "요약 도구",
        "whyCorrect": "구조와 목적을 주면 챗모델이 핵심만 요약한다. 색상/폰트 변경은 내용 정리에 도움이 안 된다.",
        "whyWrong": {
          "1": "색상 린터는 설명 정리에 무관합니다.",
          "2": "폰트 변경도 영향 없습니다."
        },
        "realWorldTip": "슬라이드/문서 목적을 함께 적으면 요약 정확도가 올라간다.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "디자인",
          "도구선택",
          "문서작성"
        ]
      },
      {
        "id": "designer_tools_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "자산 검색 후 AI를 활용하려면 좋은 흐름은?",
        "options": [
          "필요 자산을 검색/발췌 후 컨텍스트와 함께 전달",
          "전체 라이브러리를 통째로 업로드",
          "기억에 의존"
        ],
        "correct": 0,
        "desc": "발췌+맥락 제공이 정확도/속도를 높인다.",
        "enemyType": "worm",
        "concept": "맥락 제공",
        "whyCorrect": "필요한 자산만 발췌해 맥락과 함께 주면 AI가 정확하게 활용한다. 통째 업로드는 한도/보안 문제, 기억 의존은 오류가 난다.",
        "whyWrong": {
          "1": "통째 업로드는 비효율적이고 위험합니다.",
          "2": "기억은 부정확할 수 있습니다."
        },
        "realWorldTip": "컴포넌트 이름/버전까지 같이 적어주면 활용도가 높다.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "디자인",
          "도구선택",
          "디버깅"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "designer_tools_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "컴포넌트 라이브러리 검색 정확도를 높이려면?",
        "options": [
          "파일명만 추측",
          "이미지 스크린샷만",
          "메타데이터/태그 정비 후 AI 검색을 사용"
        ],
        "correct": 2,
        "desc": "태그가 있어야 검색 품질이 오른다.",
        "enemyType": "virus",
        "concept": "검색 품질",
        "whyCorrect": "메타데이터/태그가 정리돼야 AI가 정확히 찾는다. 추측이나 스크린샷만으론 부족하다.",
        "whyWrong": {
          "0": "추측은 검색 실패를 부릅니다.",
          "1": "스크린샷만으론 텍스트 검색이 어렵습니다."
        },
        "realWorldTip": "컴포넌트 태그를 분기마다 정리해 검색 품질을 유지하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "디자인",
          "도구선택",
          "코드리뷰"
        ]
      },
      {
        "id": "designer_tools_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "디자인 QA 자동화 도입 시 필요한 모니터링은?",
        "options": [
          "색상 테마",
          "폰트",
          "오탐/누락률·접근성/반응형 체크 결과"
        ],
        "correct": 2,
        "desc": "품질 지표 모니터링이 필요하다.",
        "enemyType": "trojan",
        "concept": "QA 모니터링",
        "whyCorrect": "오탐/누락률과 접근성/반응형 체크를 모니터링해야 자동화가 제대로 작동한다. 테마/폰트는 무관하다.",
        "whyWrong": {
          "0": "테마는 QA 품질에 영향을 주지 않습니다.",
          "1": "폰트도 마찬가지입니다."
        },
        "realWorldTip": "오탐 사례는 수동 검수로 보완해 룰을 지속 개선하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "디자인",
          "도구선택",
          "코드리뷰"
        ]
      },
      {
        "id": "designer_tools_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "디자인 문서 RAG 구축 시 핵심은?",
        "options": [
          "문서를 통째로 넣기",
          "섹션별 청크·태그·출처 반환",
          "검색 생략"
        ],
        "correct": 1,
        "desc": "청크/태그/출처가 정확도를 높인다.",
        "enemyType": "bug",
        "concept": "RAG",
        "whyCorrect": "청크/태그로 나누고 출처를 붙여야 정확히 인용할 수 있다. 통째 입력이나 검색 생략은 환각을 낳는다.",
        "whyWrong": {
          "0": "통째 입력은 노이즈가 많습니다.",
          "2": "검색 생략은 잘못된 답을 만들기 쉽습니다."
        },
        "realWorldTip": "출처 링크를 포함해 검증/수정 시간을 줄이세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "디자인",
          "도구선택",
          "문서작성"
        ]
      }
    ],
    "advanced": [
      {
        "id": "designer_tools_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "디자인 자동화 스크립트를 배포할 때 안전장치는?",
        "options": [
          "바로 프로덕션 적용",
          "샌드박스 테스트·롤백·승인 플로우",
          "로그 없이 실행"
        ],
        "correct": 1,
        "desc": "테스트/롤백/승인이 필수다.",
        "enemyType": "virus",
        "concept": "배포 가드",
        "whyCorrect": "테스트와 롤백, 승인 없이 배포하면 디자인 자산이 망가질 수 있다. 즉시 적용/로그 없음은 위험하다.",
        "whyWrong": {
          "0": "즉시 적용은 큰 리스크입니다.",
          "2": "로그가 없으면 문제 추적이 어렵습니다."
        },
        "realWorldTip": "변경 사항을 PR/검수 단계로 올리고 승인 후 반영하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "디자인",
          "도구선택",
          "디버깅"
        ]
      },
      {
        "id": "designer_tools_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "디자인 자동화 SLA를 지키기 위한 기술 조합은?",
        "options": [
          "테마 변경",
          "폰트 변경",
          "캐시·폴백·서킷브레이커·SLI 알람"
        ],
        "correct": 2,
        "desc": "신뢰성을 위한 캐시/폴백/차단/알람이 필요하다.",
        "enemyType": "trojan",
        "concept": "신뢰성",
        "whyCorrect": "캐시/폴백/차단/알람이 있어야 SLA를 지킨다. 테마/폰트는 무관하다.",
        "whyWrong": {
          "0": "테마는 가용성과 관계없습니다.",
          "1": "폰트도 무관합니다."
        },
        "realWorldTip": "정기적으로 폴백 연습을 해 장애 대응을 숙달하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "디자인",
          "도구선택",
          "콘텐츠제작"
        ]
      }
    ]
  },
  "ethics": {
    "beginner": [
      {
        "id": "designer_ethics_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "사용자 데이터로 디자인 테스트를 할 때 첫 조치는?",
        "options": [
          "아무 도구나 업로드",
          "동의 없이 사용",
          "동의 여부 확인·PII 마스킹·승인된 도구 사용"
        ],
        "correct": 2,
        "desc": "동의/마스킹/승인이 기본이다.",
        "enemyType": "glitch",
        "concept": "데이터 윤리",
        "whyCorrect": "동의와 마스킹, 승인 도구 사용이 없으면 유출/위반 위험이 크다. 무분별 업로드나 무동의 사용은 위험하다.",
        "whyWrong": {
          "0": "무분별 업로드는 위험합니다.",
          "1": "무동의 사용은 규정 위반입니다."
        },
        "realWorldTip": "테스트 샘플은 최소화해 필요한 부분만 사용하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "analysis",
        "tags": [
          "디자인",
          "윤리보안",
          "데이터분석"
        ]
      },
      {
        "id": "designer_ethics_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "AI가 생성한 이미지 사용 전 확인할 것은?",
        "options": [
          "저작권/상표/라이선스 준수 여부",
          "바로 상용 배포",
          "출처 불명 이미지 사용"
        ],
        "correct": 0,
        "desc": "라이선스/상표를 확인해야 한다.",
        "enemyType": "bug",
        "concept": "저작권",
        "whyCorrect": "라이선스와 상표 침해 여부를 확인해야 법적 리스크를 막는다. 즉시 배포나 출처 불명 사용은 위험하다.",
        "whyWrong": {
          "1": "바로 배포하면 침해 위험이 큽니다.",
          "2": "출처 불명 이미지는 사용을 피해야 합니다."
        },
        "realWorldTip": "사용 전 승인 체크리스트를 돌리고 근거를 기록하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "디자인",
          "윤리보안",
          "콘텐츠제작"
        ]
      },
      {
        "id": "designer_ethics_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "다양성/포용성을 지키기 위한 이미지 생성 요청은?",
        "options": [
          "임의로 생성",
          "다양한 성별/인종/연령을 포함하도록 명시",
          "특정 집단만 사용"
        ],
        "correct": 1,
        "desc": "다양성을 명시해야 편향을 줄인다.",
        "enemyType": "trojan",
        "concept": "포용성",
        "whyCorrect": "포용적 표현을 명시해야 편향 이미지를 줄일 수 있다. 임의 생성이나 특정 집단만 사용은 편향을 키운다.",
        "whyWrong": {
          "0": "임의 생성은 편향을 키울 수 있습니다.",
          "2": "특정 집단만 사용하면 배제적 메시지가 됩니다."
        },
        "realWorldTip": "출력 검수 때 다양성 체크리스트를 활용하세요.",
        "skill": "risk-awareness",
        "aiTool": "midjourney",
        "scenario": "creation",
        "tags": [
          "디자인",
          "윤리보안",
          "콘텐츠제작",
          "미드저니"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "designer_ethics_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "디자인 자동화 로그에 개인정보를 줄이는 방법은?",
        "options": [
          "전체 데이터를 평문 저장",
          "로그를 남기지 않음",
          "식별자 마스킹·필수 필드만 로그·암호화"
        ],
        "correct": 2,
        "desc": "마스킹/최소화/암호화가 필요하다.",
        "enemyType": "virus",
        "concept": "로그 보안",
        "whyCorrect": "마스킹과 최소화, 암호화를 해야 유출 위험을 줄인다. 평문 저장이나 로그 부재는 각각 위험/추적 불가를 낳는다.",
        "whyWrong": {
          "0": "평문 저장은 유출 시 큰 피해가 납니다.",
          "1": "로그가 없으면 문제 추적이 어렵습니다."
        },
        "realWorldTip": "민감도 태그에 따라 로그 보존 기간을 설정하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "디자인",
          "윤리보안",
          "디버깅"
        ]
      },
      {
        "id": "designer_ethics_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI가 제안한 디자인을 적용하기 전 해야 할 검증은?",
        "options": [
          "그대로 적용",
          "출처 확인 없이 사용",
          "브랜드/접근성/라이선스 검수"
        ],
        "correct": 2,
        "desc": "브랜드/접근성/라이선스 검수가 필수다.",
        "enemyType": "glitch",
        "concept": "검수",
        "whyCorrect": "브랜드 일관성, 접근성, 라이선스를 검수해야 위험을 줄인다. 그대로 적용하거나 출처 미확인은 위험하다.",
        "whyWrong": {
          "0": "검수 없이 적용하면 브랜드/법적 문제를 낳을 수 있습니다.",
          "1": "출처 미확인은 저작권 위험이 있습니다."
        },
        "realWorldTip": "검수 결과를 체크리스트로 남겨 재사용하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "디자인",
          "윤리보안",
          "콘텐츠제작"
        ]
      },
      {
        "id": "designer_ethics_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "디자인 데이터 편향을 줄이기 위한 프롬프트 설계는?",
        "options": [
          "편향을 무시",
          "창의성만 강조",
          "다양성 요구·금지 표현·검수 루프 포함"
        ],
        "correct": 2,
        "desc": "다양성/금지/검수가 편향 완화 핵심이다.",
        "enemyType": "worm",
        "concept": "편향 방지",
        "whyCorrect": "다양성 요구와 금지 표현, 검수 루프를 넣어야 편향을 줄인다. 무시하거나 창의성만 강조하면 위험하다.",
        "whyWrong": {
          "0": "편향을 무시하면 문제가 지속됩니다.",
          "1": "창의성 강조는 편향을 키울 수 있습니다."
        },
        "realWorldTip": "출력 샘플을 정기적으로 리뷰해 편향 여부를 점검하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "디자인",
          "윤리보안",
          "코드리뷰"
        ]
      }
    ],
    "advanced": [
      {
        "id": "designer_ethics_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "자동 생성 디자인 자산의 감사 가능성을 높이려면?",
        "options": [
          "로그 없음",
          "생성 로그·모델/프롬프트 버전·사용 데이터 출처 기록",
          "평문 외부 저장"
        ],
        "correct": 1,
        "desc": "로그/버전/출처 기록이 감사에 필수다.",
        "enemyType": "trojan",
        "concept": "감사",
        "whyCorrect": "로그와 버전, 데이터 출처를 기록해야 문제 발생 시 추적/재현이 가능하다. 로그 부재나 평문 저장은 위험하다.",
        "whyWrong": {
          "0": "로그가 없으면 원인을 찾을 수 없습니다.",
          "2": "평문 저장은 유출 위험이 큽니다."
        },
        "realWorldTip": "버전/출처는 메타데이터로 자산에 함께 저장하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "디자인",
          "윤리보안",
          "디버깅"
        ]
      },
      {
        "id": "designer_ethics_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "디자인 자동화 봇 권한 설계 원칙은?",
        "options": [
          "읽기/제안 권한 위주, 적용은 승인 후",
          "전체 관리자",
          "비밀키 하드코딩"
        ],
        "correct": 0,
        "desc": "최소 권한과 승인 플로우가 안전하다.",
        "enemyType": "virus",
        "concept": "권한 최소화",
        "whyCorrect": "제안/초안까지만 허용하고 적용은 승인해야 자산 파손을 막는다. 전체 권한/키 하드코딩은 위험하다.",
        "whyWrong": {
          "1": "전체 권한은 오작동 시 피해가 큽니다.",
          "2": "키 하드코딩은 즉시 보안 사고입니다."
        },
        "realWorldTip": "봇 계정에 제한된 역할을 부여하고 로그를 필수화하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "디자인",
          "윤리보안",
          "디버깅"
        ]
      }
    ]
  }
};

// 일반 직무 40문항
const GENERAL_QUESTIONS = {
  "practical": {
    "beginner": [
      {
        "id": "general_practical_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "회의록 작성에 AI를 쓸 때 꼭 넣을 정보는?",
        "options": [
          "회의 목적·참석자·결정/액션 아이템",
          "회의실 온도",
          "랜덤 이모지"
        ],
        "correct": 0,
        "desc": "목적/결정/액션이 있어야 쓸모 있는 회의록이 된다.",
        "enemyType": "glitch",
        "concept": "회의록",
        "whyCorrect": "목적과 결정/액션을 주면 AI가 실행 가능한 회의록을 만든다. 온도/이모지는 무관하다.",
        "whyWrong": {
          "1": "온도는 내용과 관련 없습니다.",
          "2": "이모지만으론 정보를 전달할 수 없습니다."
        },
        "realWorldTip": "액션에 담당자/기한을 붙여달라고 하면 후속이 빨라진다.",
        "skill": "context-giving",
        "aiTool": "general",
        "scenario": "creation",
        "tags": [
          "사무",
          "실무활용",
          "콘텐츠제작"
        ]
      },
      {
        "id": "general_practical_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "보고서 초안을 AI에 맡길 때 첫 지시는?",
        "options": [
          "목적·독자·형식·분량·데드라인",
          "색상 테마",
          "폰트만"
        ],
        "correct": 0,
        "desc": "목적/독자/형식/분량을 알려줘야 맞춤 초안이 나온다.",
        "enemyType": "worm",
        "concept": "보고서 브리프",
        "whyCorrect": "목적과 독자, 형식/분량/기한을 주면 AI가 방향을 잡는다. 테마/폰트만으론 불충분하다.",
        "whyWrong": {
          "1": "테마만으론 내용을 알 수 없습니다.",
          "2": "폰트만으론 구조가 나오지 않습니다."
        },
        "realWorldTip": "필수 섹션을 불릿으로 지정하면 재작업이 줄어든다.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "사무",
          "실무활용",
          "문서작성"
        ]
      },
      {
        "id": "general_practical_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "업무 매뉴얼 요약을 AI에 요청할 때 필요한 것은?",
        "options": [
          "회사 연혁",
          "원본 매뉴얼·핵심 단계·주의사항",
          "브랜드 슬로건"
        ],
        "correct": 1,
        "desc": "핵심 단계/주의를 주면 요약이 실용적이다.",
        "enemyType": "bug",
        "concept": "매뉴얼 요약",
        "whyCorrect": "원본과 핵심 단계, 주의사항을 주면 안전한 요약이 나온다. 연혁/슬로건은 무관하다.",
        "whyWrong": {
          "0": "연혁은 매뉴얼 요약과 무관합니다.",
          "2": "슬로건도 무관합니다."
        },
        "realWorldTip": "주의사항은 별도 섹션으로 요청해 강조하게 하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "사무",
          "실무활용",
          "문서작성"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "general_practical_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "프로젝트 계획서를 AI에 맡길 때 필요한 입력은?",
        "options": [
          "배경색",
          "폰트",
          "목표·마일스톤·리스크·리소스"
        ],
        "correct": 2,
        "desc": "목표/마일스톤/리스크/리소스가 계획의 핵심이다.",
        "enemyType": "virus",
        "concept": "계획서",
        "whyCorrect": "이 네 가지가 있어야 실행 가능한 계획이 된다. 색상/폰트는 우선순위가 아니다.",
        "whyWrong": {
          "0": "색상은 계획 수립과 무관합니다.",
          "1": "폰트도 마찬가지입니다."
        },
        "realWorldTip": "리스크에 대응 계획을 함께 요청하세요.",
        "skill": "context-giving",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "사무",
          "실무활용",
          "기획설계"
        ]
      },
      {
        "id": "general_practical_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "자동 회의 요약 정확도를 높이려면?",
        "options": [
          "녹취만 던진다",
          "아젠다/결정/할 일 태그를 함께 제공",
          "감정만 강조"
        ],
        "correct": 1,
        "desc": "태그가 있어야 요약이 구조화된다.",
        "enemyType": "glitch",
        "concept": "요약 정확도",
        "whyCorrect": "아젠다/결정/할 일을 태그로 주면 AI가 중요한 부분을 잡는다. 녹취만 주면 산만하고, 감정만 강조하면 본질을 놓친다.",
        "whyWrong": {
          "0": "녹취만으론 중요한 부분을 식별하기 어렵습니다.",
          "2": "감정만으론 실행 항목을 잡기 어렵습니다."
        },
        "realWorldTip": "회의 시작에 목적을 명확히 말하고 기록하면 요약 품질이 올라간다.",
        "skill": "result-validation",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "사무",
          "실무활용",
          "코드리뷰"
        ]
      },
      {
        "id": "general_practical_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "자동 일정 초대 생성 시 AI에 줄 핵심 정보는?",
        "options": [
          "참석자 별명",
          "시간·장소/링크·목적·참석자·아젠다",
          "캘린더 테마"
        ],
        "correct": 1,
        "desc": "시간/링크/목적/아젠다가 있어야 초대가 완성된다.",
        "enemyType": "worm",
        "concept": "일정 초대",
        "whyCorrect": "필수 정보를 주면 AI가 바로 보낼 수 있는 초대를 만든다. 별명/테마는 중요하지 않다.",
        "whyWrong": {
          "0": "별명만으론 초대를 만들 수 없습니다.",
          "2": "테마는 내용과 무관합니다."
        },
        "realWorldTip": "타임존을 명시하게 하면 해외 팀과 일정 오류를 줄인다.",
        "skill": "context-giving",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "사무",
          "실무활용",
          "디버깅"
        ]
      }
    ],
    "advanced": [
      {
        "id": "general_practical_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "워크플로 자동화 체크리스트를 AI로 만들 때 핵심은?",
        "options": [
          "색상",
          "입력/출력·예외 처리·검증/승인 단계",
          "폰트"
        ],
        "correct": 1,
        "desc": "입출력/예외/검증이 핵심이다.",
        "enemyType": "bug",
        "concept": "자동화 체크리스트",
        "whyCorrect": "입출력과 예외, 검증/승인을 포함해야 실제 자동화에 사용할 수 있다. 색상/폰트는 무관하다.",
        "whyWrong": {
          "0": "색상은 체크리스트 품질과 무관합니다.",
          "2": "폰트도 마찬가지입니다."
        },
        "realWorldTip": "체크리스트를 템플릿화해 반복 사용하세요.",
        "skill": "result-validation",
        "aiTool": "general",
        "scenario": "automation",
        "tags": [
          "사무",
          "실무활용",
          "자동화"
        ]
      },
      {
        "id": "general_practical_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "보고 자동화를 할 때 안전성을 높이는 설정은?",
        "options": [
          "무조건 자동 전송",
          "로그 없음",
          "데이터 출처 검증·에러 시 알람/폴백·버전 관리"
        ],
        "correct": 2,
        "desc": "검증/알람/버전이 있어야 안전하다.",
        "enemyType": "virus",
        "concept": "보고 자동화",
        "whyCorrect": "출처 검증과 에러 알람, 폴백, 버전 관리를 해야 잘못된 보고가 나가도 대응할 수 있다. 무조건 전송/로그 없음은 위험하다.",
        "whyWrong": {
          "0": "무조건 전송은 잘못된 보고를 퍼뜨립니다.",
          "1": "로그가 없으면 원인 추적이 어렵습니다."
        },
        "realWorldTip": "보고마다 데이터 스냅샷 ID를 기록하세요.",
        "skill": "result-validation",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "사무",
          "실무활용",
          "디버깅"
        ]
      }
    ]
  },
  "prompt": {
    "beginner": [
      {
        "id": "general_prompt_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "AI에 요약을 요청할 때 환각을 줄이는 프롬프트는?",
        "options": [
          "창의력을 높여달라",
          "길이 제한 해제",
          "원문/출처를 제공하고 '없는 정보는 없음'을 명시"
        ],
        "correct": 2,
        "desc": "출처와 부정 응답 허용이 환각을 줄인다.",
        "enemyType": "glitch",
        "concept": "환각 방지",
        "whyCorrect": "출처와 '없음' 응답을 허용하면 추측이 줄어든다. 창의/무제한 길이는 허구를 늘린다.",
        "whyWrong": {
          "0": "창의성은 요약 정확도를 떨어뜨릴 수 있습니다.",
          "1": "길이 무제한은 불필요한 내용을 늘립니다."
        },
        "realWorldTip": "요약에 페이지/슬라이드 번호를 포함하도록 요청하세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "사무",
          "프롬프트작성",
          "커뮤니케이션"
        ]
      },
      {
        "id": "general_prompt_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "AI로 이메일 초안을 쓸 때 필수로 넣어야 할 것?",
        "options": [
          "이모지만",
          "이름만",
          "수신자·목적·톤·CTA·기한"
        ],
        "correct": 2,
        "desc": "수신자/목적/CTA가 있어야 이메일이 목적에 맞는다.",
        "enemyType": "worm",
        "concept": "이메일 프롬프트",
        "whyCorrect": "누구에게 어떤 톤으로 무엇을 요청하는지와 기한을 줘야 맞춤 이메일이 된다. 이모지나 이름만으론 부족하다.",
        "whyWrong": {
          "0": "이모지만으론 내용을 전달하기 어렵습니다.",
          "1": "이름만으론 목적을 알 수 없습니다."
        },
        "realWorldTip": "CTA는 한 가지로 제한하고 기한을 명시하세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "사무",
          "프롬프트작성",
          "커뮤니케이션"
        ]
      },
      {
        "id": "general_prompt_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "AI에 업무 체크리스트 작성을 부탁할 때 좋은 지시는?",
        "options": [
          "랜덤 단어",
          "목표·마감·필수 단계·제약을 명시",
          "감정 표현만"
        ],
        "correct": 1,
        "desc": "목표/마감/단계/제약이 있어야 체크리스트가 실용적이다.",
        "enemyType": "bug",
        "concept": "체크리스트",
        "whyCorrect": "목표와 마감, 필수 단계/제약을 주면 누락 없이 체크리스트가 만들어진다. 랜덤 단어나 감정은 도움이 없다.",
        "whyWrong": {
          "0": "랜덤 단어는 무의미합니다.",
          "2": "감정 표현만으론 할 일을 정리할 수 없습니다."
        },
        "realWorldTip": "각 항목에 완료 기준을 요청하면 품질이 올라간다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "사무",
          "프롬프트작성",
          "코드리뷰"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "general_prompt_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI로 정책 문서 요약을 받을 때 정확도를 높이려면?",
        "options": [
          "제목만 던진다",
          "조항별 질문과 원문/출처를 함께 제공",
          "창의적 서술 요청"
        ],
        "correct": 1,
        "desc": "조항/출처를 줘야 정확히 요약한다.",
        "enemyType": "virus",
        "concept": "정책 요약",
        "whyCorrect": "조항별 질문과 원문을 주면 AI가 정확히 요약한다. 제목만이나 창의 서술은 오차가 늘어난다.",
        "whyWrong": {
          "0": "제목만으론 내용을 알 수 없습니다.",
          "2": "창의 서술은 왜곡될 수 있습니다."
        },
        "realWorldTip": "요약에 조항 번호를 유지하게 요청하세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "사무",
          "프롬프트작성",
          "문서작성"
        ]
      },
      {
        "id": "general_prompt_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI에 프로젝트 상태 리포트를 쓰게 할 때 필요한 것은?",
        "options": [
          "진척도·리스크·의존성·다음 단계",
          "색상 테마",
          "폰트"
        ],
        "correct": 0,
        "desc": "진척/리스크/의존성/다음 단계가 핵심이다.",
        "enemyType": "glitch",
        "concept": "상태 리포트",
        "whyCorrect": "핵심 상태와 리스크, 의존성, 다음 단계를 주면 실용 리포트가 된다. 테마/폰트는 부차적이다.",
        "whyWrong": {
          "1": "테마는 상태와 무관합니다.",
          "2": "폰트도 마찬가지입니다."
        },
        "realWorldTip": "레드/옐로/그린 상태 정의를 함께 주면 일관성이 생긴다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "사무",
          "프롬프트작성",
          "커뮤니케이션"
        ]
      },
      {
        "id": "general_prompt_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI로 지식 공유 포스트를 만들 때 환각을 줄이려면?",
        "options": [
          "창의력 최우선",
          "근거 링크·금지 표현·검증 요청을 포함",
          "길이 제한 없음"
        ],
        "correct": 1,
        "desc": "근거와 검증 요청이 환각을 줄인다.",
        "enemyType": "worm",
        "concept": "환각 방지",
        "whyCorrect": "근거와 검증을 요구하면 허구가 줄어든다. 창의/무제한 길이는 위험하다.",
        "whyWrong": {
          "0": "창의성 강조는 사실과 다른 내용을 낼 수 있습니다.",
          "2": "길이 무제한은 불필요한 서술이 많아집니다."
        },
        "realWorldTip": "출처를 각 단락에 붙이게 하면 검토 시간이 줄어든다.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "communication",
        "tags": [
          "사무",
          "프롬프트작성",
          "커뮤니케이션"
        ]
      }
    ],
    "advanced": [
      {
        "id": "general_prompt_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "자동화된 보고 파이프라인 출력 형식 설계는?",
        "options": [
          "JSON/CSV 스키마와 검증 규칙 정의",
          "자유 서술",
          "이미지로만 반환"
        ],
        "correct": 0,
        "desc": "스키마/검증이 자동화에 필수다.",
        "enemyType": "bug",
        "concept": "출력 스키마",
        "whyCorrect": "스키마와 검증이 있어야 자동화에 바로 쓸 수 있다. 자유/이미지는 후처리가 필요하다.",
        "whyWrong": {
          "1": "서술형은 파싱이 어렵습니다.",
          "2": "이미지는 자동화에 부적합합니다."
        },
        "realWorldTip": "스키마 변경 시 버전 번호를 올려 호환성을 관리하세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "사무",
          "프롬프트작성",
          "기획설계"
        ]
      },
      {
        "id": "general_prompt_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "워크플로 자동화 프롬프트에서 오류를 줄이는 설계는?",
        "options": [
          "창의성 강조",
          "길이 제한 없음",
          "입력 검증·에러 메시지 포맷·폴백 절차 명시"
        ],
        "correct": 2,
        "desc": "검증과 폴백을 명시해야 오류를 줄인다.",
        "enemyType": "virus",
        "concept": "에러 처리",
        "whyCorrect": "검증/에러 포맷/폴백을 명시하면 자동화 오류에 대비할 수 있다. 창의/무제한 길이는 노이즈를 늘린다.",
        "whyWrong": {
          "0": "창의성만 강조하면 포맷이 흔들립니다.",
          "1": "길이 무제한은 불필요한 내용이 많아집니다."
        },
        "realWorldTip": "에러 발생 시 사람에게 에스컬레이션하도록 정의하세요.",
        "skill": "prompt-structure",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "사무",
          "프롬프트작성",
          "디버깅"
        ]
      }
    ]
  },
  "tools": {
    "beginner": [
      {
        "id": "general_tools_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "간단한 문서 요약에 적합한 도구는?",
        "options": [
          "대형 챗모델 장문 세션",
          "수동 읽기",
          "브라우저/에디터 내 요약"
        ],
        "correct": 2,
        "desc": "짧은 요약은 내장 요약이 빠르고 충분하다.",
        "enemyType": "glitch",
        "concept": "도구 선택",
        "whyCorrect": "간단 요약은 내장 도구가 빠르고 맥락을 덜 요구한다. 장문 챗은 과잉이고 수동은 느리다.",
        "whyWrong": {
          "0": "장문 챗은 복잡한 분석에 더 적합합니다.",
          "1": "수동 읽기는 시간이 오래 걸립니다."
        },
        "realWorldTip": "길이 제한을 명시해 과도한 요약을 막으세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "사무",
          "도구선택",
          "문서작성"
        ]
      },
      {
        "id": "general_tools_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "길고 복잡한 문서를 검토할 때 적합한 접근은?",
        "options": [
          "맞춤법 검사기만",
          "색상 변경",
          "챗모델에 목차/질문을 주고 질의 응답"
        ],
        "correct": 2,
        "desc": "챗모델 Q&A가 복잡한 문서 검토에 유용하다.",
        "enemyType": "bug",
        "concept": "Q&A 사용",
        "whyCorrect": "목차와 질문을 주면 필요한 부분을 빠르게 파악한다. 맞춤법/색상은 내용 검토와 무관하다.",
        "whyWrong": {
          "0": "맞춤법 검사는 내용 검토를 대체하지 않습니다.",
          "1": "색상은 내용 이해에 영향이 없습니다."
        },
        "realWorldTip": "중요 섹션 번호를 함께 주면 탐색 시간이 줄어든다.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "사무",
          "도구선택",
          "문서작성"
        ]
      },
      {
        "id": "general_tools_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "여러 문서를 묶어 요약할 때 효율적인 방법은?",
        "options": [
          "전체를 통째로 붙인다",
          "각 문서 핵심을 발췌 후 합쳐서 요약 요청",
          "제목만 나열"
        ],
        "correct": 1,
        "desc": "발췌 후 요약이 정확도/속도를 높인다.",
        "enemyType": "worm",
        "concept": "발췌 요약",
        "whyCorrect": "핵심 발췌를 합쳐 요약하면 토큰을 절약하며 정확도를 올린다. 통째 입력은 한도/노이즈 문제, 제목만은 정보가 부족하다.",
        "whyWrong": {
          "0": "통째 입력은 비효율적입니다.",
          "2": "제목만으론 내용을 알 수 없습니다."
        },
        "realWorldTip": "각 문서 출처를 표시해 최종 요약에도 근거를 남기세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "사무",
          "도구선택",
          "문서작성"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "general_tools_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "파일/지식 검색 정확도를 높이려면?",
        "options": [
          "운에 맡긴다",
          "이미지만 본다",
          "메타데이터/태그를 정비하고 검색 범위를 지정"
        ],
        "correct": 2,
        "desc": "태그와 범위 지정이 정확도를 높인다.",
        "enemyType": "virus",
        "concept": "검색 품질",
        "whyCorrect": "메타데이터/태그 정비와 범위 지정이 있어야 검색 정확도가 높아진다. 운/이미지는 부족하다.",
        "whyWrong": {
          "0": "운에 맡기면 재현성이 없습니다.",
          "1": "이미지만으론 텍스트 검색을 할 수 없습니다."
        },
        "realWorldTip": "폴더/프로젝트별 태그 정책을 만들어 유지하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "사무",
          "도구선택",
          "코드리뷰"
        ]
      },
      {
        "id": "general_tools_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "워크플로 자동화 도구를 선택할 때 기준은?",
        "options": [
          "UI 색상",
          "폰트",
          "통합성·보안·비용·운영 난이도"
        ],
        "correct": 2,
        "desc": "통합/보안/비용/운영성을 봐야 한다.",
        "enemyType": "trojan",
        "concept": "도구 선택",
        "whyCorrect": "연동성, 보안, 비용, 운영 난이도를 보고 선택해야 한다. 색상/폰트는 본질이 아니다.",
        "whyWrong": {
          "0": "색상은 선택 기준이 아닙니다.",
          "1": "폰트도 아닙니다."
        },
        "realWorldTip": "PoC로 작은 플로우를 먼저 돌려보고 확장하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "automation",
        "tags": [
          "사무",
          "도구선택",
          "자동화"
        ]
      },
      {
        "id": "general_tools_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "자동화 로그를 관리할 때 필요한 것은?",
        "options": [
          "요청/응답·결과·에러 로그·보존 정책",
          "로그 미저장",
          "평문 외부 저장"
        ],
        "correct": 0,
        "desc": "로그와 보존 정책이 필수다.",
        "enemyType": "bug",
        "concept": "로그 관리",
        "whyCorrect": "요청/응답/에러와 보존 정책을 정해 관리해야 문제를 추적한다. 로그 부재나 평문 저장은 위험하다.",
        "whyWrong": {
          "1": "로그가 없으면 원인을 추적할 수 없습니다.",
          "2": "평문 저장은 유출 위험이 큽니다."
        },
        "realWorldTip": "로그에는 민감도 태그를 붙여 보존 기간을 자동 적용하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "사무",
          "도구선택",
          "디버깅"
        ]
      }
    ],
    "advanced": [
      {
        "id": "general_tools_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "자동화 스크립트 배포 시 필수 안전장치는?",
        "options": [
          "바로 프로덕션",
          "샌드박스 테스트·롤백·승인·모니터링",
          "로그 없음"
        ],
        "correct": 1,
        "desc": "테스트/롤백/승인/모니터링이 필수다.",
        "enemyType": "virus",
        "concept": "배포 가드",
        "whyCorrect": "이 단계가 없으면 자동화가 사고를 낼 수 있다. 즉시 배포나 로그 없음은 위험하다.",
        "whyWrong": {
          "0": "즉시 배포는 리스크가 큽니다.",
          "2": "로그 없이는 추적이 불가합니다."
        },
        "realWorldTip": "변경은 PR/리뷰 흐름을 통해 반영하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "사무",
          "도구선택",
          "디버깅"
        ]
      },
      {
        "id": "general_tools_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "자동화 SLA를 지키기 위한 기술 조합은?",
        "options": [
          "큐·재시도·폴백·서킷브레이커·SLI 알람",
          "테마 변경",
          "폰트 변경"
        ],
        "correct": 0,
        "desc": "신뢰성을 위한 큐/재시도/폴백/차단/알람이 필요하다.",
        "enemyType": "trojan",
        "concept": "신뢰성",
        "whyCorrect": "큐/재시도/폴백/차단/알람이 있어야 SLA를 지킨다. 테마/폰트는 무관하다.",
        "whyWrong": {
          "1": "테마는 가용성과 관계없습니다.",
          "2": "폰트도 무관합니다."
        },
        "realWorldTip": "장애 리허설을 정기적으로 돌려 폴백을 검증하세요.",
        "skill": "tool-selection",
        "aiTool": "general",
        "scenario": "automation",
        "tags": [
          "사무",
          "도구선택",
          "자동화"
        ]
      }
    ]
  },
  "ethics": {
    "beginner": [
      {
        "id": "general_ethics_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "외부 모델 사용 시 문서 공유 기본 원칙은?",
        "options": [
          "개인 메신저로 공유",
          "아무 제한 없이 업로드",
          "민감 정보 마스킹·승인 도구 사용"
        ],
        "correct": 2,
        "desc": "마스킹과 승인 도구가 기본이다.",
        "enemyType": "glitch",
        "concept": "데이터 보호",
        "whyCorrect": "민감 정보를 가리고 승인된 도구를 써야 유출을 막는다. 개인 메신저/무제한 업로드는 위험하다.",
        "whyWrong": {
          "0": "개인 메신저는 보안/기록이 약합니다.",
          "1": "무제한 업로드는 규정 위반 가능성이 큽니다."
        },
        "realWorldTip": "업로드 전 자동 마스킹 워크플로를 사용하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "사무",
          "윤리보안",
          "문서작성"
        ]
      },
      {
        "id": "general_ethics_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "AI가 제안한 내용을 문서에 반영하기 전에 해야 할 일은?",
        "options": [
          "즉시 반영",
          "출처와 사실 검증",
          "출처 숨김"
        ],
        "correct": 1,
        "desc": "검증 없이 반영하면 오류가 난다.",
        "enemyType": "bug",
        "concept": "검수",
        "whyCorrect": "출처와 사실을 확인해야 오류/환각을 막는다. 즉시 반영이나 출처 숨김은 위험하다.",
        "whyWrong": {
          "0": "검증 없이 반영하면 잘못된 정보가 퍼질 수 있습니다.",
          "2": "출처 숨김은 신뢰를 해칩니다."
        },
        "realWorldTip": "중요 수치는 원본 문서 링크와 함께 남기세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "사무",
          "윤리보안",
          "디버깅"
        ]
      },
      {
        "id": "general_ethics_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "팀 문서를 AI 학습에 사용하기 전 확인할 것은?",
        "options": [
          "그냥 업로드",
          "동의·보관/삭제 정책·민감도 라벨",
          "출처 제거"
        ],
        "correct": 1,
        "desc": "동의/정책/민감도 확인이 필수다.",
        "enemyType": "trojan",
        "concept": "데이터 거버넌스",
        "whyCorrect": "동의와 보관/삭제, 민감도 라벨을 확인해야 한다. 그냥 업로드나 출처 제거는 위험하다.",
        "whyWrong": {
          "0": "무단 업로드는 규정 위반입니다.",
          "2": "출처 제거는 책임 추적을 어렵게 합니다."
        },
        "realWorldTip": "민감도 라벨링 자동화를 도입해 실수를 줄이세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "사무",
          "윤리보안",
          "문서작성"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "general_ethics_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "자동화 로그를 저장할 때 프라이버시를 지키는 방법은?",
        "options": [
          "마스킹·최소 필드·암호화·보존 기간 설정",
          "평문 전체 저장",
          "로그 미저장"
        ],
        "correct": 0,
        "desc": "마스킹/최소화/암호화/보존이 필수다.",
        "enemyType": "virus",
        "concept": "로그 프라이버시",
        "whyCorrect": "마스킹/최소화/암호화와 보존 기간 설정이 프라이버시를 지킨다. 평문 저장이나 로그 부재는 각각 위험/추적 불가다.",
        "whyWrong": {
          "1": "평문 저장은 유출 위험이 큽니다.",
          "2": "로그가 없으면 문제를 추적할 수 없습니다."
        },
        "realWorldTip": "민감도 라벨별로 보존 기간을 자동 적용하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "사무",
          "윤리보안",
          "디버깅"
        ]
      },
      {
        "id": "general_ethics_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "AI 도입 시 팀 커뮤니케이션에서 지켜야 할 것은?",
        "options": [
          "AI가 만든 부분과 검증 여부를 명시",
          "AI를 사용했음을 숨김",
          "검증 없이 공유"
        ],
        "correct": 0,
        "desc": "출처/검증을 투명하게 알려야 한다.",
        "enemyType": "glitch",
        "concept": "투명성",
        "whyCorrect": "AI 작성 여부와 검증 상태를 알려야 오해를 줄이고 품질을 지킨다. 숨김/무검증 공유는 신뢰를 해친다.",
        "whyWrong": {
          "1": "숨기면 신뢰와 책임이 모호해집니다.",
          "2": "검증 없이 공유하면 오류가 퍼집니다."
        },
        "realWorldTip": "AI 초안은 라벨을 붙이고 검증 후 확정본으로 구분하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "사무",
          "윤리보안",
          "코드리뷰"
        ]
      },
      {
        "id": "general_ethics_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "자동화된 결재/승인 봇의 안전한 권한 설계는?",
        "options": [
          "전체 결재 권한 부여",
          "비밀키 하드코딩",
          "제안/검증까지만 허용하고 최종 승인은 사람"
        ],
        "correct": 2,
        "desc": "최소 권한과 사람 승인으로 안전성을 확보한다.",
        "enemyType": "worm",
        "concept": "권한 최소화",
        "whyCorrect": "봇은 제안/검증까지만 하고 최종 승인은 사람이 해야 한다. 전체 권한/키 하드코딩은 위험하다.",
        "whyWrong": {
          "0": "전체 권한은 오작동 시 피해가 큽니다.",
          "1": "키 하드코딩은 즉시 사고로 이어집니다."
        },
        "realWorldTip": "승인 로그를 남겨 감사 가능성을 확보하세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "사무",
          "윤리보안",
          "디버깅"
        ]
      }
    ],
    "advanced": [
      {
        "id": "general_ethics_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "자동화된 업무 흐름의 감사 가능성을 높이려면?",
        "options": [
          "로그 없음",
          "요청/응답·버전·데이터 출처·결과 로그를 남김",
          "평문 외부 저장"
        ],
        "correct": 1,
        "desc": "로그/출처/버전 기록이 필수다.",
        "enemyType": "trojan",
        "concept": "감사",
        "whyCorrect": "요청/응답, 버전, 출처, 결과를 기록해야 추적/재현이 가능하다. 로그 없음이나 평문 저장은 위험하다.",
        "whyWrong": {
          "0": "로그가 없으면 추적이 불가합니다.",
          "2": "평문 저장은 유출 위험이 큽니다."
        },
        "realWorldTip": "중요 작업은 변경 이력을 버전 관리 시스템에 남기세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "사무",
          "윤리보안",
          "디버깅"
        ]
      },
      {
        "id": "general_ethics_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "팀 차원의 AI 사용 정책에 포함해야 할 내용은?",
        "options": [
          "데이터 분류·도구 승인 절차·금지 케이스·감사 체계",
          "색상 가이드",
          "폰트 가이드"
        ],
        "correct": 0,
        "desc": "데이터/도구/금지/감사 정책이 핵심이다.",
        "enemyType": "virus",
        "concept": "AI 정책",
        "whyCorrect": "데이터 분류, 승인 도구, 금지 케이스, 감사 체계를 명확히 해야 안전하게 AI를 쓴다. 색상/폰트 가이드는 중요도가 낮다.",
        "whyWrong": {
          "1": "색상/폰트는 정책 핵심이 아닙니다.",
          "2": "핵심 정책이 없으면 위험합니다."
        },
        "realWorldTip": "분기마다 정책 교육과 퀴즈를 실시해 준수율을 높이세요.",
        "skill": "risk-awareness",
        "aiTool": "general",
        "scenario": "documentation",
        "tags": [
          "사무",
          "윤리보안",
          "문서작성"
        ]
      }
    ]
  },
  "advanced": {
    "beginner": [
      {
        "id": "general_advanced_b1",
        "difficulty": "beginner",
        "exp": 10,
        "title": "업무 자동화 플로우를 설계할 때 먼저 정할 것은?",
        "options": [
          "입력/출력 스키마와 승인 기준",
          "배경색",
          "로고 크기"
        ],
        "correct": 0,
        "desc": "스키마/승인이 있어야 자동화가 안전하다.",
        "enemyType": "glitch",
        "concept": "워크플로 정의",
        "whyCorrect": "입출력과 승인 기준을 정해야 잘못된 자동 전송을 막는다. 색상/로고는 동작과 무관하다.",
        "whyWrong": {
          "1": "색상은 자동화 품질에 영향을 주지 않습니다.",
          "2": "로고 크기는 우선순위가 아닙니다."
        },
        "realWorldTip": "승인 단계와 롤백 방법을 함께 정의하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "planning",
        "tags": [
          "사무",
          "자동화설계",
          "기획설계"
        ]
      },
      {
        "id": "general_advanced_b2",
        "difficulty": "beginner",
        "exp": 10,
        "title": "프롬프트 회귀 테스트를 일반 업무에 도입할 때 필요한 것?",
        "options": [
          "임의 프롬프트 한두 개",
          "감으로 평가",
          "대표 입력/출력 스냅샷 세트"
        ],
        "correct": 2,
        "desc": "스냅샷이 있어야 품질 변화를 잡는다.",
        "enemyType": "bug",
        "concept": "프롬프트 회귀",
        "whyCorrect": "대표 요청과 기대 답변을 저장해두면 모델 변경 시 비교가 가능하다. 임의/감에 의존하면 회귀를 놓친다.",
        "whyWrong": {
          "0": "한두 개로는 커버리지가 부족합니다.",
          "1": "감에 의존하면 일관성이 없습니다."
        },
        "realWorldTip": "스냅샷을 버전 관리 시스템에 넣어 히스토리를 남기세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "사무",
          "자동화설계",
          "코드리뷰"
        ]
      },
      {
        "id": "general_advanced_b3",
        "difficulty": "beginner",
        "exp": 10,
        "title": "LLM 캐싱을 내부 챗봇에 적용할 때 핵심은?",
        "options": [
          "모든 응답을 무조건 캐싱",
          "질문 파라미터와 지식 버전을 키에 포함",
          "캐싱 미사용"
        ],
        "correct": 1,
        "desc": "버전 포함 키가 있어야 오래된 답을 막는다.",
        "enemyType": "virus",
        "concept": "캐싱",
        "whyCorrect": "지식/모델 버전과 입력을 키로 삼아야 정책 변경 시 캐시를 무효화할 수 있다. 무조건 캐싱은 오류를 반복하고, 미사용은 비용/지연이 커진다.",
        "whyWrong": {
          "0": "무조건 캐싱은 오래된 정보를 계속 보여줄 수 있습니다.",
          "2": "캐싱을 안 쓰면 동일 질문에도 비용이 계속 듭니다."
        },
        "realWorldTip": "정책/FAQ 업데이트 시 버전 번호를 올려 캐시를 지우세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "사무",
          "자동화설계",
          "디버깅"
        ]
      }
    ],
    "intermediate": [
      {
        "id": "general_advanced_i1",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "자동화 SLA를 관리할 때 모니터링할 지표는?",
        "options": [
          "배경색",
          "응답 시간·정확도·실패율·핸드오프 비율",
          "폰트"
        ],
        "correct": 1,
        "desc": "속도/정확도/실패/핸드오프를 함께 봐야 한다.",
        "enemyType": "glitch",
        "concept": "SLI",
        "whyCorrect": "응답 시간과 정확도, 실패율, 사람이 개입한 비율을 모니터링해야 SLA를 지킨다. 색상/폰트는 무관하다.",
        "whyWrong": {
          "0": "색상은 SLA에 영향을 주지 않습니다.",
          "2": "폰트도 SLA와 무관합니다."
        },
        "realWorldTip": "임계값을 이중으로 설정해 경고/치명 단계를 나누세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "automation",
        "tags": [
          "사무",
          "자동화설계",
          "자동화"
        ]
      },
      {
        "id": "general_advanced_i2",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "워크플로 에이전트가 여러 도구를 호출할 때 필요한 것은?",
        "options": [
          "임의 시스템 명령 허용",
          "입력 검증·타임아웃·재시도/폴백",
          "실패 로그를 남기지 않음"
        ],
        "correct": 1,
        "desc": "검증/타임아웃/폴백이 없으면 위험하다.",
        "enemyType": "trojan",
        "concept": "툴 오케스트레이션",
        "whyCorrect": "검증과 타임아웃, 재시도/폴백이 있어야 안전하게 도구를 호출한다. 임의 명령이나 로그 부재는 보안/추적 모두에 위험하다.",
        "whyWrong": {
          "0": "임의 명령은 보안 사고를 부를 수 있습니다.",
          "2": "로그가 없으면 문제를 추적할 수 없습니다."
        },
        "realWorldTip": "툴 호출 결과를 모두 기록하고 실패 패턴을 학습시켜 개선하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "사무",
          "자동화설계",
          "디버깅"
        ]
      },
      {
        "id": "general_advanced_i3",
        "difficulty": "intermediate",
        "exp": 15,
        "title": "업무 자동화 품질을 측정할 때 봐야 할 조합은?",
        "options": [
          "길이만",
          "처리 시간·정확도·재처리율·비용",
          "감정만"
        ],
        "correct": 1,
        "desc": "시간/정확도/재처리/비용을 함께 봐야 한다.",
        "enemyType": "worm",
        "concept": "품질 지표",
        "whyCorrect": "처리 시간과 정확도, 재처리율, 비용을 함께 봐야 자동화가 효율적인지 판단한다. 길이나 감정만으론 부족하다.",
        "whyWrong": {
          "0": "길이만으론 품질을 알 수 없습니다.",
          "2": "감정만 보면 성과를 놓칩니다."
        },
        "realWorldTip": "정기적으로 지표를 기록해 변경 영향도를 추적하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "code-review",
        "tags": [
          "사무",
          "자동화설계",
          "코드리뷰"
        ]
      }
    ],
    "advanced": [
      {
        "id": "general_advanced_a1",
        "difficulty": "advanced",
        "exp": 22,
        "title": "자동화 배포 파이프라인의 필수 단계는?",
        "options": [
          "바로 전체 배포",
          "로그 없음",
          "샌드박스 테스트→승인→점진 롤아웃→모니터링"
        ],
        "correct": 2,
        "desc": "테스트/승인/점진 배포가 있어야 안전하다.",
        "enemyType": "virus",
        "concept": "배포 가드",
        "whyCorrect": "테스트와 승인, 점진 배포, 모니터링이 있어야 장애를 줄인다. 즉시 배포나 로그 부재는 위험하다.",
        "whyWrong": {
          "0": "바로 배포는 오류가 즉시 전파됩니다.",
          "1": "로그가 없으면 추적이 불가합니다."
        },
        "realWorldTip": "롤백 스위치와 경보를 함께 설정하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "debugging",
        "tags": [
          "사무",
          "자동화설계",
          "디버깅"
        ]
      },
      {
        "id": "general_advanced_a2",
        "difficulty": "advanced",
        "exp": 22,
        "title": "자동화 SLA를 지키기 위한 기술 조합은?",
        "options": [
          "큐·재시도·폴백·서킷브레이커·SLI 알람",
          "테마 변경",
          "폰트 변경"
        ],
        "correct": 0,
        "desc": "신뢰성을 위한 큐/재시도/폴백/차단/알람이 필요하다.",
        "enemyType": "trojan",
        "concept": "신뢰성",
        "whyCorrect": "큐/재시도/폴백/차단/알람이 있어야 SLA를 지킨다. 테마/폰트는 무관하다.",
        "whyWrong": {
          "1": "테마는 가용성과 관계없습니다.",
          "2": "폰트도 무관합니다."
        },
        "realWorldTip": "장애 리허설을 정기적으로 돌려 폴백을 검증하세요.",
        "skill": "workflow-design",
        "aiTool": "general",
        "scenario": "automation",
        "tags": [
          "사무",
          "자동화설계",
          "자동화"
        ]
      }
    ]
  }
};

const ROLE_SPECIFIC_QUESTIONS = {
  developer: DEV_QUESTIONS,
  marketer: MARKETER_QUESTIONS,
  sales: SALES_QUESTIONS,
  cs: CS_QUESTIONS,
  designer: DESIGNER_QUESTIONS,
  general: GENERAL_QUESTIONS,
};

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
  Object.entries(ROLE_META).map(([roleKey, meta]) => [
    roleKey,
    ROLE_SPECIFIC_QUESTIONS[roleKey] || buildRoleQuestions(roleKey, meta),
  ])
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
    ROLE_SPECIFIC_QUESTIONS,
    DEV_QUESTIONS,
  };
}
