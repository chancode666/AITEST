// AI 피드백 모듈 - GPT API 연동 (종합 평가 특화)
const AIFeedback = {
    // OpenAI API 설정 (환경변수 또는 설정 파일에서 로드)
    API_KEY: window.OPENAI_API_KEY || '',
    API_URL: 'https://api.openai.com/v1/chat/completions',
    MAX_RETRIES: 3,

    // API 실패 여부 저장 (UI 알림용)
    lastCallFailed: false,

    // 직무 한글명
    getRoleKorean(role) {
        const names = {
            'developer': '개발자',
            'marketer': '마케터',
            'sales': '영업',
            'cs': 'CS',
            'designer': '디자이너',
            'general': '일반'
        };
        return names[role] || '일반';
    },

    // 직무별 AI 활용 시나리오 (구체적 예시)
    getRoleScenarios(role) {
        const scenarios = {
            'developer': {
                daily: ['코드 리뷰 자동화', 'API 문서 생성', '버그 원인 분석', '테스트 케이스 작성'],
                advanced: ['아키텍처 설계 검토', 'PR 요약 자동화', '레거시 코드 리팩토링 제안'],
                prompts: ['이 코드의 시간복잡도를 분석해줘', '이 함수에 대한 단위 테스트 작성해줘', 'SQL 쿼리 최적화 방법 알려줘']
            },
            'marketer': {
                daily: ['광고 카피 A/B 테스트', 'SNS 콘텐츠 캘린더', '경쟁사 분석 요약', '이메일 제목 최적화'],
                advanced: ['퍼널 분석 인사이트 도출', '고객 페르소나 구체화', '캠페인 ROI 예측'],
                prompts: ['20대 여성 타겟 인스타 캡션 5개 써줘', '이 랜딩페이지 헤드라인 개선해줘', '이탈률 높은 이유 분석해줘']
            },
            'sales': {
                daily: ['미팅 요약 정리', '제안서 초안 작성', '고객 이의제기 대응', 'CRM 데이터 분석'],
                advanced: ['딜 성사 확률 예측', '업셀링 타이밍 분석', '고객 이탈 징후 감지'],
                prompts: ['이 미팅 녹취록 핵심만 요약해줘', '가격 협상 이메일 초안 써줘', '이 고객사에 맞는 제안 포인트 뽑아줘']
            },
            'cs': {
                daily: ['FAQ 답변 초안', '고객 불만 분류', '응대 스크립트 개선', '만족도 분석'],
                advanced: ['VOC 트렌드 분석', '자동 응답 시나리오 설계', '에스컬레이션 기준 최적화'],
                prompts: ['이 불만 고객에게 보낼 사과 메일 써줘', '자주 묻는 질문 10개 정리해줘', '이 리뷰 감정 분석해줘']
            },
            'designer': {
                daily: ['디자인 피드백 요약', '컬러 팔레트 추천', 'UI 카피 작성', '레퍼런스 분석'],
                advanced: ['사용자 테스트 인사이트 정리', '디자인 시스템 문서화', 'A/B 테스트 결과 해석'],
                prompts: ['이 UI의 접근성 문제점 찾아줘', '이 브랜드에 맞는 톤앤매너 정의해줘', '모바일 UX 개선점 3가지 알려줘']
            },
            'general': {
                daily: ['회의록 정리', '이메일 초안 작성', '보고서 요약', '일정 관리'],
                advanced: ['프로젝트 리스크 분석', '의사결정 프레임워크 적용', '팀 생산성 분석'],
                prompts: ['이 보고서 핵심 3줄로 요약해줘', '상사에게 보고할 이메일 써줘', '이 데이터에서 인사이트 뽑아줘']
            }
        };
        return scenarios[role] || scenarios['general'];
    },

    // 카테고리 한글명
    getCategoryKorean(cat) {
        const names = {
            'practical': '실전 적용',
            'prompt': '프롬프트',
            'tools': '도구 활용',
            'ethics': '윤리/보안',
            'advanced': '고급 활용'
        };
        return names[cat] || cat;
    },

    // 종합 평가 프롬프트 생성 (GPT가 집중할 부분)
    buildPrompt(role, answers, totalScore) {
        const roleKorean = this.getRoleKorean(role);
        const roleScenarios = this.getRoleScenarios(role);
        const grade = totalScore >= 90 ? 'S' : totalScore >= 80 ? 'A' : totalScore >= 70 ? 'B' : totalScore >= 60 ? 'C' : totalScore >= 50 ? 'D' : 'E';

        // 맞은/틀린 문제 분류
        const correctQuestions = answers.filter(a => a.correct === a.userSel);
        const wrongQuestions = answers.filter(a => a.correct !== a.userSel);

        // 카테고리별 성적 계산
        const catStats = {};
        answers.forEach(a => {
            if (!catStats[a.cat]) catStats[a.cat] = { correct: 0, total: 0, questions: [] };
            catStats[a.cat].total++;
            catStats[a.cat].questions.push({
                title: a.title,
                isCorrect: a.correct === a.userSel,
                difficulty: a.difficulty || 'intermediate'
            });
            if (a.correct === a.userSel) catStats[a.cat].correct++;
        });

        // 난이도별 성적 계산
        const diffStats = { beginner: { correct: 0, total: 0 }, intermediate: { correct: 0, total: 0 }, advanced: { correct: 0, total: 0 } };
        answers.forEach(a => {
            const diff = a.difficulty || 'intermediate';
            if (diffStats[diff]) {
                diffStats[diff].total++;
                if (a.correct === a.userSel) diffStats[diff].correct++;
            }
        });

        // 난이도별 정답률 문자열
        const diffAnalysis = Object.entries(diffStats)
            .filter(([_, stat]) => stat.total > 0)
            .map(([diff, stat]) => {
                const diffKorean = diff === 'beginner' ? '기초' : diff === 'intermediate' ? '중급' : '고급';
                const rate = Math.round(stat.correct / stat.total * 100);
                return `${diffKorean}: ${stat.correct}/${stat.total} (${rate}%)`;
            }).join(', ');

        // 가장 점수 높은/낮은 카테고리 찾기
        let bestCat = null, worstCat = null;
        let bestScore = -1, worstScore = 101;
        Object.entries(catStats).forEach(([cat, stat]) => {
            const score = Math.round(stat.correct / stat.total * 100);
            if (score > bestScore) { bestScore = score; bestCat = cat; }
            if (score < worstScore) { worstScore = score; worstCat = cat; }
        });

        // 다음 등급 계산
        const nextGrade = grade === 'E' ? 'C' : grade === 'D' ? 'B' : grade === 'C' ? 'A' : grade === 'B' ? 'A' : 'S';
        const gradeGap = grade === 'E' ? 30 : grade === 'D' ? 20 : 10;

        // 특수 케이스 체크
        const isPerfectScore = wrongQuestions.length === 0;
        const isNearPerfect = wrongQuestions.length <= 2 && totalScore >= 80; // A등급 (1-2개 틀림)
        const isVeryLow = correctQuestions.length <= 2; // 0-2개만 맞춤

        // 문제별 상세 정보 JSON 배열 구성
        const questionsDetailArray = answers.map((a, idx) => {
            const isCorrect = a.correct === a.userSel;
            const diffKorean = a.difficulty === 'beginner' ? '기초' : a.difficulty === 'advanced' ? '고급' : '중급';
            return {
                num: idx + 1,
                title: a.title,
                category: this.getCategoryKorean(a.cat),
                difficulty: diffKorean,
                result: isCorrect ? 'O' : 'X'
            };
        });

        return `당신은 '퍼널뱅크 AI 멘토'입니다. 퍼널뱅크는 직무별 AI 활용 교육 서비스입니다.

## 사용자 정보
- 직무: ${roleKorean}
- 점수: ${totalScore}점
- 등급: ${grade}
- 강점 카테고리: ${this.getCategoryKorean(bestCat)} (${bestScore}%)
- 약점 카테고리: ${this.getCategoryKorean(worstCat)} (${worstScore}%)
- 난이도별 정답률: ${diffAnalysis}

## 문제 결과 (JSON)
${JSON.stringify(questionsDetailArray, null, 2)}

## 등급별 타이틀 규칙 (필수 준수)
- 90점 이상 (S등급): "AI 마스터"
- 80-89점 (A등급): "AI 스페셜리스트"
- 70-79점 (B등급): "러닝 유저"
- 70점 미만 (C/D/E등급): "성장형 유저"

## 핵심 규칙
1. **문제 제목은 위 JSON에서 정확히 복사** - 임의 생성 절대 금지
2. **patternAnalysis 형식**: "X번 '정확한제목'에서 ~한 성향이 보여요"
3. **${roleKorean} 실무 맥락 활용**: ${roleScenarios.daily.slice(0,2).join(', ')}
4. **친근한 톤**: "~하셨네요", "~해보시면 어떨까요?"
5. **반복 표현 금지**: 같은 칭찬 표현 한 번만 사용
6. **뜬금없는 비유 금지**: 과일, 날씨, 산 등의 비유 사용 금지
7. **퍼널뱅크 자연스럽게 연결**: 강압적이지 않게, 도움이 될 수 있다는 톤으로

## 특수 케이스 처리
${isPerfectScore ? `### 만점(100점) 케이스
- "아쉬운", "채우면" 등의 표현 절대 금지
- 도전/확장/심화 톤으로 작성
- growthAreas: 다음 단계 도전 과제로 작성` : ''}
${isNearPerfect ? `### A등급(1-2개 오답) 케이스
- 틀린 ${wrongQuestions.length}개 문제에만 집중
- 거의 완벽하다는 뉘앙스 유지` : ''}
${isVeryLow ? `### 저점수 케이스
- 격려 위주로 작성
- growthAreas는 1개만 제시
- 작은 성취도 크게 칭찬` : ''}

## JSON 응답 형식 (마크다운 코드블록 없이 순수 JSON만 출력)
{
  "grade": "${grade}",
  "title": "위 등급별 타이틀 규칙에 따라 정확히 작성",
  "shortMessage": "15자 이내 공유용 메시지",
  "overallDiagnosis": "4-5문장. 맞은 문제 제목을 구체적으로 언급하며 종합 평가",
  "todayHighlight": {
    "questionNumber": "맞은 문제 중 하나의 번호",
    "title": "해당 문제의 정확한 제목 (위 JSON에서 복사)",
    "comment": "2-3문장. 난이도 언급 + ${roleKorean} 실무 연결"
  },
  "whatIfSimulation": {
    "scenario": "${isPerfectScore ? '팀원 멘토링/교육자 시나리오' : `${nextGrade}등급 달성 시나리오`}",
    "encouragement": "격려 메시지",
    "tip": "구체적 실천 팁"
  },
  "competencyProfile": {
    "practical": {"score": 0-100, "level": "강점/보통/성장중", "analysis": "2문장 분석"},
    "prompt": {"score": 0-100, "level": "강점/보통/성장중", "analysis": "2문장 분석"},
    "tools": {"score": 0-100, "level": "강점/보통/성장중", "analysis": "2문장 분석"},
    "ethics": {"score": 0-100, "level": "강점/보통/성장중", "analysis": "2문장 분석"},
    "advanced": {"score": 0-100, "level": "강점/보통/성장중", "analysis": "2문장 분석"}
  },
  "patternAnalysis": [
    "X번 '정확한문제제목'에서 ~한 성향이 보여요",
    "Y번 '정확한문제제목'을 맞추신 걸 보니 ~를 잘 이해하고 계시네요",
    "Z번 '정확한문제제목'에서 ~한 부분이 아쉬웠어요"
  ],
  "topStrengths": ["맞은 문제와 연결된 강점1", "강점2", "강점3"],
  "growthAreas": ["긍정적으로 프레이밍한 성장포인트1", "성장포인트2", "성장포인트3"],
  "actionPlan": {
    "thisWeek": "'${roleScenarios.prompts[0]}' 같은 프롬프트 직접 써보기",
    "thisMonth": "한 달 후 달성 목표",
    "learningKeywords": ["${roleKorean} AI 활용", "추천 키워드2", "추천 키워드3"]
  },
  "funnelbankPitch": "퍼널뱅크 ${roleKorean} 맞춤 과정 소개. 테스트 결과와 연결하여 4-5문장으로 자연스럽게 작성. 예: '${this.getCategoryKorean(worstCat)} 영역을 더 키우고 싶으시다면, 퍼널뱅크의 ${roleKorean} 맞춤 과정이 도움이 될 수 있어요. 실무에서 바로 쓸 수 있는 AI 활용법을 알려드려요.'",
  "closingMessage": "2문장 따뜻한 마무리. 퍼널뱅크 언급 포함 권장"
}`;
    },

    // 등급별 톤 가이드
    getGradeToneGuide(grade, roleKorean) {
        const guides = {
            'S': `[S등급]
- 톤: 진심으로 감탄하는 느낌
- 예시: "와, 정말 잘하셨어요! ${roleKorean}로서 AI를 제대로 활용하고 계시네요."
- 퍼널뱅크: "혹시 팀원들에게 AI 활용법을 알려주시는 역할에 관심 있으시다면, 퍼널뱅크의 리더 과정도 한번 살펴보셔도 좋을 것 같아요."`,

            'A': `[A등급]
- 톤: 칭찬하면서 살짝 아쉬운 점만 짚어주기
- 예시: "거의 다 왔어요! 조금만 보완하시면 완벽해지실 것 같아요."
- 퍼널뱅크: "마지막 한 끗 차이, 퍼널뱅크에서 같이 채워보시면 어떨까요?"`,

            'B': `[B등급]
- 톤: 응원하는 느낌, 가능성 강조
- 예시: "좋은 감각 갖고 계시네요! 여기서 조금만 더 배우시면 확 달라지실 거예요."
- 퍼널뱅크: "혹시 더 체계적으로 배워보고 싶으시다면, 퍼널뱅크가 도움이 될 수 있어요. 부담 없이 한번 구경해보세요."`,

            'C': `[C등급]
- 톤: 격려하면서 방향 제시
- 예시: "시작이 반이에요! 기초는 알고 계시니까, 이제 어디를 채우면 되는지만 알면 돼요."
- 퍼널뱅크: "혼자 찾아보시기 막막하시면, 퍼널뱅크에서 ${roleKorean} 맞춤 커리큘럼으로 차근차근 도와드릴 수 있어요."`,

            'D': `[D등급]
- 톤: 따뜻하게 안심시키기
- 예시: "괜찮아요! 테스트 보신 것만으로도 한 발 앞서신 거예요. 이제 방향만 잡으면 돼요."
- 퍼널뱅크: "처음이라 어디서부터 시작해야 할지 막막하시죠? 퍼널뱅크가 처음부터 같이 가드릴게요."`,

            'E': `[E등급]
- 톤: 완전 안심시키고 함께 가자는 느낌
- 예시: "괜찮아요, 누구나 처음은 있어요! AI 처음 접하시는 거 맞죠? 오히려 지금 시작하시는 게 타이밍 좋아요."
- 퍼널뱅크: "퍼널뱅크는 진짜 처음이신 분들을 위한 과정도 있어요. 손잡고 차근차근 알려드릴게요."`
        };
        return guides[grade] || guides['C'];
    },

    // API 호출 (재시도 로직 포함)
    async callAPI(prompt, retryCount = 0) {
        try {
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [
                        {
                            role: 'system',
                            content: '당신은 퍼널뱅크의 AI 멘토입니다. 퍼널뱅크는 직무별 AI 활용 교육 서비스입니다. 사용자가 기분 좋게 결과를 받아들이면서도 퍼널뱅크 과정에 관심을 갖도록 자연스럽게 안내합니다. 반드시 유효한 JSON 형식으로만 응답하세요. 마크다운 코드블록 없이 순수 JSON만 출력하세요. 문제 제목은 반드시 제공된 데이터에서 그대로 복사하세요.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: 0.6,
                    max_tokens: 2500
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            const content = data.choices[0].message.content;

            // JSON 파싱 시도
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('JSON not found in response');
            }

            this.lastCallFailed = false;
            return JSON.parse(jsonMatch[0]);

        } catch (error) {
            console.error(`API 호출 실패 (시도 ${retryCount + 1}/${this.MAX_RETRIES}):`, error);

            if (retryCount < this.MAX_RETRIES - 1) {
                const delay = Math.pow(2, retryCount) * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
                return this.callAPI(prompt, retryCount + 1);
            }

            this.lastCallFailed = true;
            throw error;
        }
    },

    // 메인 피드백 생성 함수
    async generateFeedback(role, answers, onProgress = null) {
        const correctCount = answers.filter(a => a.correct === a.userSel).length;
        const totalScore = Math.round((correctCount / answers.length) * 100);

        if (onProgress) onProgress(1, 'AI 멘토가 답변을 검토하고 있습니다...');

        const prompt = this.buildPrompt(role, answers, totalScore);

        if (onProgress) onProgress(2, '카테고리별 역량을 분석하고 있습니다...');

        try {
            if (onProgress) onProgress(3, '맞춤형 종합 평가를 생성하고 있습니다...');

            const aiResponse = await this.callAPI(prompt);

            if (onProgress) onProgress(4, '결과를 정리하고 있습니다...');

            // GPT 응답 + 문제별 오답노트 결합
            const feedback = this.combineWithQuestionData(aiResponse, answers);

            return {
                success: true,
                data: feedback,
                totalScore: totalScore
            };
        } catch (error) {
            console.error('AI 피드백 생성 실패:', error);
            return {
                success: false,
                error: error.message,
                totalScore: totalScore,
                data: this.getFallbackFeedback(role, answers, totalScore)
            };
        }
    },

    // GPT 종합 평가 + 미리 작성된 문제별 데이터 결합
    combineWithQuestionData(aiResponse, answers) {
        // 카테고리별 점수 계산 (실제 데이터 기반)
        const catStats = {};
        answers.forEach(a => {
            if (!catStats[a.cat]) catStats[a.cat] = { correct: 0, total: 0 };
            catStats[a.cat].total++;
            if (a.correct === a.userSel) catStats[a.cat].correct++;
        });

        // categoryAnalysis 형식 맞추기 (기존 UI 호환)
        const categoryAnalysis = {};
        Object.keys(catStats).forEach(cat => {
            const score = Math.round((catStats[cat].correct / catStats[cat].total) * 100);
            const aiCatData = aiResponse.competencyProfile?.[cat] || {};
            categoryAnalysis[cat] = {
                score: score,
                feedback: aiCatData.analysis || `${this.getCategoryKorean(cat)} 영역 분석 결과입니다.`
            };
        });

        // 문제별 분석 (미리 작성된 whyCorrect, whyWrong 사용)
        const questions = answers.map((a, idx) => {
            const isCorrect = a.correct === a.userSel;
            let analysis = '';

            if (isCorrect) {
                // 정답: whyCorrect 또는 desc 사용
                analysis = a.whyCorrect || a.desc || '정답입니다! 올바른 판단을 하셨습니다.';
            } else {
                // 오답: whyWrong 사용
                const wrongKey = a.userSel === 0 ? '1' : a.userSel === 1 ? '1' : '2';
                if (a.userSel !== a.correct) {
                    // userSel이 0이면 1번 선택, 1이면 2번 선택, 2면 3번 선택
                    const feedbackKey = a.userSel + 1;
                    analysis = a.whyWrong?.[feedbackKey] || a.whyWrong?.[1] || a.desc || `정답은 ${a.correct + 1}번입니다.`;
                }
                if (a.realWorldTip) {
                    analysis += `\n\n실무 팁: ${a.realWorldTip}`;
                }
            }

            return {
                questionId: idx + 1,
                isCorrect: isCorrect,
                userChoice: a.userSel,
                correctAnswer: a.correct,
                analysis: analysis,
                category: a.cat,
                concept: a.concept || ''
            };
        });

        return {
            // GPT 생성 종합 평가
            overall: {
                grade: aiResponse.grade,
                title: aiResponse.title,
                message: aiResponse.overallDiagnosis,
                shortMessage: aiResponse.shortMessage,
                strengths: aiResponse.topStrengths || [],
                improvements: aiResponse.growthAreas || []
            },

            // 새 섹션: 오늘의 하이라이트
            todayHighlight: aiResponse.todayHighlight || null,

            // 새 섹션: 만약 시뮬레이션
            whatIfSimulation: aiResponse.whatIfSimulation || null,

            // 상세 분석 (GPT)
            patternAnalysis: aiResponse.patternAnalysis || [],
            competencyProfile: aiResponse.competencyProfile || {},
            actionPlan: aiResponse.actionPlan || {},
            funnelbankPitch: aiResponse.funnelbankPitch || '',
            closingMessage: aiResponse.closingMessage || '',

            // 기존 UI 호환
            categoryAnalysis: categoryAnalysis,

            // 문제별 분석 (미리 작성된 데이터)
            questions: questions
        };
    },

    // 폴백 피드백 (API 실패 시)
    getFallbackFeedback(role, answers, totalScore) {
        const grade = totalScore >= 90 ? 'S' : totalScore >= 80 ? 'A' : totalScore >= 70 ? 'B' : totalScore >= 60 ? 'C' : totalScore >= 50 ? 'D' : 'E';
        const roleKorean = this.getRoleKorean(role);

        const titles = {
            'S': 'AI 마스터',
            'A': '시니어 스페셜리스트',
            'B': '스페셜리스트',
            'C': '프랙티셔너',
            'D': '주니어',
            'E': '비기너'
        };

        const messages = {
            'S': `와, 정말 잘하셨어요! ${roleKorean}로서 AI를 제대로 활용하고 계시네요. 이 정도 실력이면 주변 분들한테도 알려주실 수 있겠어요.`,
            'A': `거의 다 왔어요! 조금만 더 채우시면 완벽해질 것 같아요. ${roleKorean}로서 좋은 감각 갖고 계시네요.`,
            'B': `좋은 감각 갖고 계시네요! ${roleKorean} 업무에 AI를 활용하시려는 시도가 보여요. 여기서 조금만 더 배우시면 확 달라지실 거예요.`,
            'C': `시작이 반이에요! 기초는 알고 계시니까, 이제 어디를 채우면 되는지만 알면 돼요. 같이 하나씩 채워볼까요?`,
            'D': `괜찮아요! 테스트 보신 것만으로도 한 발 앞서신 거예요. 이제 방향만 잡으면 돼요. 천천히 가도 괜찮아요.`,
            'E': `괜찮아요, 누구나 처음은 있어요! AI 처음 접하시는 거죠? 오히려 지금 시작하시는 게 타이밍 좋아요.`
        };

        const funnelbankMessages = {
            'S': `혹시 팀원들에게 AI 활용법을 알려주시는 역할에 관심 있으시다면, 퍼널뱅크의 리더 과정도 한번 살펴보셔도 좋을 것 같아요. ${roleKorean} 실무에 딱 맞는 심화 내용이 있거든요.`,
            'A': `마지막 한 끗 차이, 퍼널뱅크에서 같이 채워보시면 어떨까요? ${roleKorean} 맞춤 과정에서 아쉬웠던 부분만 콕 집어서 알려드릴 수 있어요.`,
            'B': `혹시 더 체계적으로 배워보고 싶으시다면, 퍼널뱅크가 도움이 될 수 있어요. ${roleKorean} 실무에 바로 쓸 수 있는 것들 위주로 알려드려요. 부담 없이 한번 구경해보세요.`,
            'C': `혼자 찾아보시기 막막하시면, 퍼널뱅크에서 ${roleKorean} 맞춤 커리큘럼으로 차근차근 도와드릴 수 있어요. 어디서부터 시작해야 할지 같이 정리해드릴게요.`,
            'D': `처음이라 어디서부터 시작해야 할지 막막하시죠? 퍼널뱅크가 처음부터 같이 가드릴게요. ${roleKorean} 업무에 필요한 것부터 하나씩 알려드릴게요.`,
            'E': `퍼널뱅크는 진짜 처음이신 분들을 위한 과정도 있어요. 손잡고 차근차근 알려드릴게요. 궁금하시면 한번 들러보세요.`
        };

        // 카테고리별 점수 계산
        const catStats = {};
        answers.forEach(a => {
            if (!catStats[a.cat]) catStats[a.cat] = { correct: 0, total: 0 };
            catStats[a.cat].total++;
            if (a.correct === a.userSel) catStats[a.cat].correct++;
        });

        // 강점/약점 찾기
        let bestCat = null, worstCat = null;
        let bestScore = -1, worstScore = 101;
        Object.keys(catStats).forEach(cat => {
            const score = Math.round((catStats[cat].correct / catStats[cat].total) * 100);
            if (score > bestScore) { bestScore = score; bestCat = cat; }
            if (score < worstScore) { worstScore = score; worstCat = cat; }
        });

        const categoryAnalysis = {};
        Object.keys(catStats).forEach(cat => {
            const score = Math.round((catStats[cat].correct / catStats[cat].total) * 100);
            categoryAnalysis[cat] = {
                score: score,
                feedback: score >= 70 ? `${this.getCategoryKorean(cat)} 영역에서 좋은 역량을 보여주셨어요!` :
                         score >= 40 ? `${this.getCategoryKorean(cat)} 영역은 조금 더 학습하시면 금방 늘어요.` :
                         `${this.getCategoryKorean(cat)} 영역의 기초부터 다지면 빠르게 성장할 수 있어요.`
            };
        });

        // 문제별 분석 (미리 작성된 데이터 사용)
        const questions = answers.map((a, idx) => {
            const isCorrect = a.correct === a.userSel;
            let analysis = '';

            if (isCorrect) {
                analysis = a.whyCorrect || a.desc || '정답입니다! 올바른 판단을 하셨습니다.';
            } else {
                const feedbackKey = a.userSel + 1;
                analysis = a.whyWrong?.[feedbackKey] || a.whyWrong?.[1] || a.desc || `정답은 ${a.correct + 1}번입니다.`;
                if (a.realWorldTip) {
                    analysis += `\n\n실무 팁: ${a.realWorldTip}`;
                }
            }

            return {
                questionId: idx + 1,
                isCorrect: isCorrect,
                userChoice: a.userSel,
                correctAnswer: a.correct,
                analysis: analysis,
                category: a.cat
            };
        });

        return {
            overall: {
                grade: grade,
                title: titles[grade],
                message: messages[grade],
                shortMessage: bestScore >= 70 ? `${this.getCategoryKorean(bestCat)}의 강자!` : '성장 가능성 무한!',
                strengths: bestScore >= 50 ?
                    [`${this.getCategoryKorean(bestCat)} 영역 ${bestScore}% - 이 분야의 감을 잡고 계세요`] :
                    ['테스트에 도전하는 적극적인 자세가 멋져요'],
                improvements: worstScore < 70 ?
                    [`${this.getCategoryKorean(worstCat)} 영역을 익히시면 더 성장하실 수 있어요`] :
                    ['꾸준한 학습으로 역량을 유지해보세요']
            },
            patternAnalysis: [],
            competencyProfile: {},
            actionPlan: {},
            funnelbankPitch: funnelbankMessages[grade],
            closingMessage: '오늘 테스트 보시느라 수고하셨어요. 앞으로의 성장, 응원할게요!',
            categoryAnalysis: categoryAnalysis,
            questions: questions
        };
    }
};

// 전역으로 노출
window.AIFeedback = AIFeedback;
