// 균형잡힌 랜덤 문제 선택 시스템
class QuestionSelector {
    constructor() {
        // 카테고리 정의
        this.categories = [
            'practical',  // 실무 활용
            'prompt',     // 프롬프트 엔지니어링
            'tools',      // AI 도구 활용
            'ethics',     // AI 윤리/보안
            'advanced'    // 고급 기능
        ];

        // 난이도별 비율 (총 10문제 기준)
        this.difficultyRatio = {
            beginner: 3,      // 초급 3문제
            intermediate: 5,  // 중급 5문제
            advanced: 2       // 고급 2문제
        };

        // 세션 기록 관리
        this.sessionHistory = this.loadHistory();
    }

    // 균형잡힌 10문제 선택
    selectBalancedQuestions() {
        const selectedQuestions = [];
        const usedQuestionIds = new Set();

        // 각 카테고리에서 2문제씩 선택 (총 10문제)
        for (const category of this.categories) {
            const categoryQuestions = this.getQuestionsFromCategory(category, 2, usedQuestionIds);
            selectedQuestions.push(...categoryQuestions);
        }

        // 난이도 균형 맞추기
        const balancedQuestions = this.balanceByDifficulty(selectedQuestions);

        // 문제 순서 섞기
        const shuffledQuestions = this.shuffle(balancedQuestions);

        // 게임 형식에 맞게 변환
        const gameQuestions = this.convertToGameFormat(shuffledQuestions);

        // 세션 기록 저장
        this.saveToHistory(gameQuestions);

        return gameQuestions;
    }

    // 카테고리별 문제 가져오기
    getQuestionsFromCategory(category, count, usedIds) {
        const questions = [];
        const categoryData = EXTENDED_QUESTIONS[category];

        if (!categoryData) return questions;

        // 모든 난이도의 문제를 하나의 배열로 합치기
        const allCategoryQuestions = [
            ...(categoryData.beginner || []),
            ...(categoryData.intermediate || []),
            ...(categoryData.advanced || [])
        ];

        // 최근 3회 세션에서 사용한 문제 제외
        const availableQuestions = allCategoryQuestions.filter(q =>
            !this.isRecentlyUsed(q.id) && !usedIds.has(q.id)
        );

        // 사용 가능한 문제가 부족하면 전체에서 선택
        const pool = availableQuestions.length >= count ? availableQuestions : allCategoryQuestions;

        // 랜덤 선택
        const shuffled = this.shuffle([...pool]);
        for (let i = 0; i < Math.min(count, shuffled.length); i++) {
            if (!usedIds.has(shuffled[i].id)) {
                questions.push({...shuffled[i], category});
                usedIds.add(shuffled[i].id);
            }
        }

        return questions;
    }

    // 난이도별 균형 맞추기
    balanceByDifficulty(questions) {
        // 문제를 난이도별로 분류
        const byDifficulty = {
            beginner: [],
            intermediate: [],
            advanced: []
        };

        questions.forEach(q => {
            // exp 값으로 난이도 판단
            if (q.exp <= 10) {
                byDifficulty.beginner.push(q);
            } else if (q.exp <= 15) {
                byDifficulty.intermediate.push(q);
            } else {
                byDifficulty.advanced.push(q);
            }
        });

        // 목표 비율에 맞게 선택
        const balanced = [];

        // 초급 3문제
        const beginnerCount = Math.min(this.difficultyRatio.beginner, byDifficulty.beginner.length);
        balanced.push(...this.shuffle(byDifficulty.beginner).slice(0, beginnerCount));

        // 고급 2문제
        const advancedCount = Math.min(this.difficultyRatio.advanced, byDifficulty.advanced.length);
        balanced.push(...this.shuffle(byDifficulty.advanced).slice(0, advancedCount));

        // 나머지는 중급으로 채우기
        const remainingCount = 10 - balanced.length;
        const intermediateCount = Math.min(remainingCount, byDifficulty.intermediate.length);
        balanced.push(...this.shuffle(byDifficulty.intermediate).slice(0, intermediateCount));

        // 부족한 경우 다른 난이도에서 보충
        if (balanced.length < 10) {
            const allRemaining = [
                ...byDifficulty.beginner.filter(q => !balanced.includes(q)),
                ...byDifficulty.intermediate.filter(q => !balanced.includes(q)),
                ...byDifficulty.advanced.filter(q => !balanced.includes(q))
            ];
            const needed = 10 - balanced.length;
            balanced.push(...this.shuffle(allRemaining).slice(0, needed));
        }

        return balanced.slice(0, 10);
    }

    // 게임 형식으로 변환
    convertToGameFormat(questions) {
        return questions.map((q, index) => ({
            id: q.id,
            cat: q.category || 'basic',
            title: q.title,
            options: q.options,
            correct: q.correct,
            desc: q.desc || this.generateDescription(q),
            enemyType: q.enemyType || 'glitch',
            exp: q.exp || 10,
            difficulty: this.getDifficultyLevel(q.exp)
        }));
    }

    // 설명 자동 생성
    generateDescription(question) {
        const descriptions = {
            practical: "실무에서 AI를 효과적으로 활용하는 방법입니다.",
            prompt: "효과적인 프롬프트 작성이 AI 활용의 핵심입니다.",
            tools: "적절한 도구 선택이 작업 효율을 크게 높입니다.",
            ethics: "AI 윤리와 보안은 책임감 있는 사용의 기본입니다.",
            advanced: "고급 기능을 활용하면 더 복잡한 작업이 가능합니다."
        };
        return descriptions[question.category] || "AI를 올바르게 이해하고 활용하는 것이 중요합니다.";
    }

    // 난이도 레벨 반환
    getDifficultyLevel(exp) {
        if (exp <= 10) return 'beginner';
        if (exp <= 15) return 'intermediate';
        return 'advanced';
    }

    // 최근 사용 여부 확인
    isRecentlyUsed(questionId) {
        const recentSessions = this.sessionHistory.slice(-3); // 최근 3회
        return recentSessions.some(session =>
            session.questions.some(q => q.id === questionId)
        );
    }

    // 배열 섞기 (Fisher-Yates)
    shuffle(array) {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    // 세션 기록 불러오기
    loadHistory() {
        try {
            const stored = localStorage.getItem('quizHistory');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    }

    // 세션 기록 저장
    saveToHistory(questions) {
        const session = {
            timestamp: Date.now(),
            questions: questions.map(q => ({ id: q.id, category: q.cat }))
        };

        this.sessionHistory.push(session);

        // 최대 10개 세션만 보관
        if (this.sessionHistory.length > 10) {
            this.sessionHistory = this.sessionHistory.slice(-10);
        }

        try {
            localStorage.setItem('quizHistory', JSON.stringify(this.sessionHistory));
        } catch (e) {
            console.warn('Failed to save history:', e);
        }
    }

    // 통계 정보 가져오기
    getStatistics() {
        const stats = {
            totalSessions: this.sessionHistory.length,
            totalQuestions: 0,
            categoryDistribution: {},
            difficultyDistribution: { beginner: 0, intermediate: 0, advanced: 0 }
        };

        this.sessionHistory.forEach(session => {
            stats.totalQuestions += session.questions.length;
            session.questions.forEach(q => {
                stats.categoryDistribution[q.category] = (stats.categoryDistribution[q.category] || 0) + 1;
            });
        });

        return stats;
    }
}

// 전역 인스턴스 생성
window.questionSelector = new QuestionSelector();