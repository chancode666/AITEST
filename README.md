# AI RUSH - AI 활용 능력 진단 퀴즈

## 1. 프로젝트 개요
퍼널뱅크(Funnelbank)의 AI 교육 서비스를 위한 **AI 활용 능력 진단 퀴즈 게임**입니다.
사용자는 직무별 맞춤 문제를 풀고, GPT 기반 AI 멘토로부터 개인화된 피드백을 받습니다.

## 2. 주요 기능

### 직무별 맞춤 퀴즈
- **6개 직무 지원**: 개발자, 마케터, 영업, CS, 디자이너, 일반
- **240개 문제**: 직무당 40문항 (5개 카테고리 x 8문항)
- **균형 잡힌 출제**: 카테고리/난이도별 균등 분배

### 문제 카테고리
| 카테고리 | 설명 |
|---------|------|
| practical | 실무 활용 |
| prompt | 프롬프트 엔지니어링 |
| tools | AI 도구 활용 |
| ethics | AI 윤리/한계 |
| advanced | 고급 활용 |

### 난이도 분포 (10문항 기준)
- 초급(beginner): 3문항
- 중급(intermediate): 5문항
- 고급(advanced): 2문항

### AI 피드백 시스템
- GPT-4o-mini 기반 개인화 피드백
- 카테고리별 강점/약점 분석
- 맞춤형 학습 가이드 제공
- 오답별 개별 피드백 (whyWrong)

### 문제 태그 시스템
각 문제에 4종 태그 포함:
- `skill`: 측정 역량
- `aiTool`: 관련 AI 도구
- `scenario`: 실무 시나리오
- `tags`: 키워드 배열

## 3. 파일 구조
```
/
├── index.html              # 메인 HTML (CSS/JS 인라인 포함)
├── js/
│   ├── config.js           # API 설정 템플릿
│   ├── config.local.js     # 실제 API 키 (git 제외)
│   ├── extended_questions.js  # 240개 문제 데이터
│   ├── question_selector.js   # 균형 잡힌 문제 선택 로직
│   └── ai_feedback.js      # GPT 피드백 생성
└── README.md
```

## 4. 설정 방법

### API 키 설정
1. `js/config.js`를 복사하여 `js/config.local.js` 생성
2. OpenAI API 키 입력:
```javascript
window.OPENAI_API_KEY = 'sk-your-api-key-here';
```

## 5. 게임 플로우
1. **인트로**: 직무 선택
2. **퀴즈**: 10문제 풀이 (3지선다)
3. **로딩**: AI 피드백 생성 중
4. **결과**: 점수, 등급, AI 분석, 문제별 해설

## 6. 결과 화면 구성
- 종합 점수 및 등급 (S~E)
- AI 멘토의 한줄 코멘트
- 카테고리별 레이더 차트
- 강점 3가지 / 개선점 3가지
- 문제별 상세 분석 (정답/오답 필터)
- 카테고리별 AI 피드백

## 7. 기술 스택
- **Frontend**: Vanilla JS, CSS3 (사이버펑크 테마)
- **AI**: OpenAI GPT-4o-mini API
- **3D 배경**: Three.js
- **반응형**: 모바일 최적화 (768px, 480px, 375px)

## 8. 향후 계획 (TODO)
- [ ] PDF 보고서 저장 기능
- [ ] SNS 공유 기능 (카카오톡, 인스타그램)
- [ ] 사용자 풀이 데이터 저장/분석
