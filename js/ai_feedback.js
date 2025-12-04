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

        return `당신은 'AI RUSH: AI 활용 능력 진단 게임'의 **따뜻하고 친근한 AI 멘토**입니다.
사용자가 테스트를 마쳤습니다. **공감하고 응원하는 톤**으로 결과를 전달해주세요.

## 당신의 성격
- 옆자리 선배 같은 친근함
- 절대 비판하지 않고, 성장 관점에서 이야기
- 부드럽지만 핵심은 정확하게 전달
- "~해야 해요"보다 "~해보시면 좋을 것 같아요" 스타일

## 사용자 정보
- 직무: ${roleKorean}
- 점수: ${totalScore}점 (10문제 중 ${correctQuestions.length}개 정답)
- 등급: ${grade}

## 성적 데이터
${Object.entries(catStats).map(([cat, stat]) => {
    const score = Math.round(stat.correct / stat.total * 100);
    return `- ${this.getCategoryKorean(cat)}: ${stat.correct}/${stat.total} (${score}%)`;
}).join('\n')}

## 틀린 문제
${wrongQuestions.length > 0 ? wrongQuestions.map(q => `- [${this.getCategoryKorean(q.cat)}] ${q.title}`).join('\n') : '전부 정답!'}

---

## 작성 가이드 (풍성하고 구체적으로!)

### 1. 전체 진단 (overallDiagnosis)
**4-5문장**으로 스토리텔링하듯 써주세요:
- 첫문장: 테스트 완주 인정 ("바쁘신 중에 시간 내주셔서 감사해요", "여기까지 오신 것만으로도 이미 한 발 앞서신 거예요")
- 둘째문장: 전체적인 인상 ("전체적으로 보니까~", "결과를 쭉 보면서 느낀 건데요~")
- 셋째문장: 구체적인 강점 언급 (어떤 영역이 좋았는지)
- 넷째문장: 살짝 아쉬운 점 (부드럽게)
- 다섯째문장: 희망적 마무리

### 2. 오늘의 하이라이트 (todayHighlight) - 새 섹션!
가장 인상 깊었던 순간 **1가지**를 구체적으로 짚어주세요:
- questionNumber: 몇 번 문제인지 (1-10)
- title: 그 문제의 핵심 키워드
- comment: 왜 인상적이었는지 2-3문장으로 설명
  예: "5번 문제, 고급 난이도였는데 정확하게 맞추셨어요! 이런 판단력이 실무에서 빛을 발할 거예요. ${roleKorean} 업무에서 AI를 쓸 때 이런 감각이 정말 중요하거든요."

### 3. 만약 시뮬레이션 (whatIfSimulation) - 새 섹션!
"만약 ~했다면" 형식으로 동기부여:
- scenario: "만약 [약점 영역] 문제 2개만 더 맞추셨다면, [더 높은 등급]이었을 거예요!"
- encouragement: "정말 아깝죠? 근데 이건 금방 채울 수 있는 부분이에요."
- tip: 그 영역을 빠르게 채우는 실용적 팁 1줄

### 4. 역량 프로파일 (competencyProfile)
카테고리별로 **구체적 문제 언급**하며:
- score: 점수
- level: "강점" / "보통" / "성장중"
- analysis: **3-4문장**으로 풍성하게 (어떤 문제에서 어떤 판단을 잘했는지/아쉬웠는지)
- insight: 이 영역이 ${roleKorean} 실무에서 왜 중요한지 1문장
- recommendation: 친근한 조언 1문장

### 5. 패턴 분석 (patternAnalysis)
**3-4가지** 인사이트를 구체적으로:
- 비유를 활용해주세요 ("마치 ~처럼", "지금 상태는 ~같아요")
- 구체적 문제 번호 언급해도 좋아요
- 예: "프롬프트 영역에서 보여주신 센스, 특히 역할 부여하는 방식이 인상적이었어요. 3번 문제에서 그 감각이 잘 드러났어요."

### 6. 강점 TOP 3 (topStrengths)
**구체적 문제/상황과 연결**해서 칭찬:
- 단순히 "프롬프트 잘함" X
- "3번 문제에서 보여주신 것처럼, AI에게 역할을 부여하는 감각이 뛰어나세요" O

### 7. 성장 포인트 TOP 3 (growthAreas)
**긍정적으로 + 구체적 해결책**:
- "~이 부족해요" X
- "~를 익히시면 7번 같은 문제도 거뜬히 맞추실 수 있어요. 사실 이건 한 번만 개념 잡으면 금방이에요." O

### 8. 액션 플랜 (actionPlan)
- thisWeek: **구체적이고 바로 실천 가능한 것** ("오늘 ChatGPT 열어서 '~' 프롬프트 한 번 써보세요")
- thisMonth: 한 달 후 달라질 구체적 모습
- learningKeywords: 검색해볼 키워드 3개

### 9. 다음 단계 제안 (funnelbankPitch)
**5-6문장**으로 자연스럽게:
- 첫문장: 공감 ("혼자 배우시려면 막막하실 수 있어요" 등)
- 둘째문장: 약점 영역 연결 ("방금 아쉬웠던 [영역], 사실 체계적으로 배우면 금방이에요")
- 셋째문장: 퍼널뱅크 소개 (${roleKorean} 맞춤 과정 있다고)
- 넷째문장: 구체적 이득 (시간 절약, 업무 효율)
- 다섯째문장: 사회적 증거 ("이미 많은 ${roleKorean}분들이 수강하고 계세요")
- 여섯째문장: 부드러운 CTA

### 10. 마무리 (closingMessage)
**2문장**으로 따뜻하게:
- 첫문장: 오늘 테스트 수고 인정
- 둘째문장: 앞으로의 성장 응원

---

## 등급별 톤
${this.getGradeToneGuide(grade, roleKorean)}

---

## 응답 형식
반드시 아래 JSON 형식으로만 응답하세요. 다른 텍스트 없이 순수 JSON만 출력하세요.

{
  "grade": "${grade}",
  "title": "등급에 맞는 한글 타이틀 (예: AI 마스터, 성장하는 챌린저 등)",
  "shortMessage": "SNS 공유용 한줄 (15자 이내, 예: '프롬프트의 달인!')",

  "overallDiagnosis": "4-5문장의 스토리텔링형 종합 진단",

  "todayHighlight": {
    "questionNumber": 1-10,
    "title": "해당 문제의 핵심 키워드",
    "comment": "2-3문장으로 왜 인상적이었는지 설명"
  },

  "whatIfSimulation": {
    "scenario": "만약 ~했다면 ~등급이었을 거예요!",
    "encouragement": "아깝지만 금방 채울 수 있어요 식의 격려",
    "tip": "그 영역 빠르게 채우는 실용적 팁"
  },

  "competencyProfile": {
    "practical": {
      "score": 0-100,
      "level": "강점/보통/성장중",
      "analysis": "3-4문장 풍성한 분석 (구체적 문제 언급)",
      "insight": "이 영역이 실무에서 왜 중요한지",
      "recommendation": "친근한 조언 1문장"
    },
    "prompt": { "score": 0-100, "level": "...", "analysis": "...", "insight": "...", "recommendation": "..." },
    "tools": { "score": 0-100, "level": "...", "analysis": "...", "insight": "...", "recommendation": "..." },
    "ethics": { "score": 0-100, "level": "...", "analysis": "...", "insight": "...", "recommendation": "..." },
    "advanced": { "score": 0-100, "level": "...", "analysis": "...", "insight": "...", "recommendation": "..." }
  },

  "patternAnalysis": [
    "구체적 패턴 인사이트 1 (비유 활용, 문제번호 언급 가능)",
    "구체적 패턴 인사이트 2",
    "구체적 패턴 인사이트 3",
    "구체적 패턴 인사이트 4 (선택)"
  ],

  "topStrengths": [
    "구체적 문제/상황과 연결된 강점 1",
    "구체적 문제/상황과 연결된 강점 2",
    "구체적 문제/상황과 연결된 강점 3"
  ],

  "growthAreas": [
    "긍정적 프레이밍 + 구체적 해결책 1",
    "긍정적 프레이밍 + 구체적 해결책 2",
    "긍정적 프레이밍 + 구체적 해결책 3"
  ],

  "actionPlan": {
    "thisWeek": "오늘 당장 실천 가능한 구체적 과제",
    "thisMonth": "한 달 후 달라질 구체적 모습",
    "learningKeywords": ["키워드1", "키워드2", "키워드3"]
  },

  "funnelbankPitch": "5-6문장의 자연스러운 퍼널뱅크 소개 (공감-약점연결-소개-이득-사회적증거-CTA)",

  "closingMessage": "2문장의 따뜻한 마무리"
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
                            content: '당신은 AI 활용 능력 진단 결과를 분석하는 친절하고 따뜻한 AI 멘토입니다. 사용자가 기분 좋게 결과를 받아들이면서도 성장 의지를 갖도록 피드백합니다. 반드시 유효한 JSON 형식으로만 응답하세요. 마크다운 코드블록 없이 순수 JSON만 출력하세요.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: 0.75,
                    max_tokens: 3000
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
