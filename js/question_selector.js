// 직무별 균형 문제 선택기
class QuestionSelector {
  constructor() {
    this.categories = ["practical", "prompt", "tools", "ethics", "advanced"];
    this.difficultyRatio = { beginner: 3, intermediate: 5, advanced: 2 }; // 총 10문항 비율
    this.sessionHistory = this.loadHistory();
  }

  // 선택한 직무(role)에서 10문항을 균형 있게 추출
  selectBalancedQuestions(role = "general") {
    const selectedQuestions = [];
    const usedQuestionIds = new Set();
    const questionPool = EXTENDED_QUESTIONS[role] || EXTENDED_QUESTIONS.general;

    if (!questionPool) {
      console.warn(`No questions for role: ${role}`);
      return [];
    }

    // 카테고리별 최소 2문항씩 먼저 확보
    for (const category of this.categories) {
      const categoryQuestions = this.getQuestionsFromCategory(
        category,
        2,
        usedQuestionIds,
        questionPool
      );
      selectedQuestions.push(...categoryQuestions);
    }

    // 난이도 비율에 맞춰 재구성
    const balancedQuestions = this.balanceByDifficulty(selectedQuestions);
    const shuffledQuestions = this.shuffle(balancedQuestions);
    const gameQuestions = this.convertToGameFormat(shuffledQuestions);
    this.saveToHistory(gameQuestions);
    return gameQuestions;
  }

  // 카테고리별 문제 가져오기
  getQuestionsFromCategory(category, count, usedIds, questionPool = null) {
    const questions = [];
    const categoryData = questionPool ? questionPool[category] : EXTENDED_QUESTIONS[category];
    if (!categoryData) return questions;

    const allCategoryQuestions = [
      ...(categoryData.beginner || []),
      ...(categoryData.intermediate || []),
      ...(categoryData.advanced || []),
    ];

    const availableQuestions = allCategoryQuestions.filter(
      (q) => !this.isRecentlyUsed(q.id) && !usedIds.has(q.id)
    );

    const pool = availableQuestions.length >= count ? availableQuestions : allCategoryQuestions;
    const shuffled = this.shuffle([...pool]);

    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
      if (!usedIds.has(shuffled[i].id)) {
        questions.push({ ...shuffled[i], category });
        usedIds.add(shuffled[i].id);
      }
    }

    return questions;
  }

  // 난이도 균형 맞추기
  balanceByDifficulty(questions) {
    const byDifficulty = { beginner: [], intermediate: [], advanced: [] };

    questions.forEach((q) => {
      if (q.exp <= 10) byDifficulty.beginner.push(q);
      else if (q.exp <= 15) byDifficulty.intermediate.push(q);
      else byDifficulty.advanced.push(q);
    });

    const balanced = [];
    const beginnerCount = Math.min(this.difficultyRatio.beginner, byDifficulty.beginner.length);
    balanced.push(...this.shuffle(byDifficulty.beginner).slice(0, beginnerCount));

    const advancedCount = Math.min(this.difficultyRatio.advanced, byDifficulty.advanced.length);
    balanced.push(...this.shuffle(byDifficulty.advanced).slice(0, advancedCount));

    const remainingCount = 10 - balanced.length;
    const intermediateCount = Math.min(remainingCount, byDifficulty.intermediate.length);
    balanced.push(...this.shuffle(byDifficulty.intermediate).slice(0, intermediateCount));

    if (balanced.length < 10) {
      const allRemaining = [
        ...byDifficulty.beginner.filter((q) => !balanced.includes(q)),
        ...byDifficulty.intermediate.filter((q) => !balanced.includes(q)),
        ...byDifficulty.advanced.filter((q) => !balanced.includes(q)),
      ];
      const needed = 10 - balanced.length;
      balanced.push(...this.shuffle(allRemaining).slice(0, needed));
    }

    return balanced.slice(0, 10);
  }

  // 게임 포맷으로 변환
  convertToGameFormat(questions) {
    return questions.map((q) => ({
      id: q.id,
      cat: q.category || "basic",
      title: q.title,
      options: q.options,
      correct: q.correct,
      desc: q.desc,
      enemyType: q.enemyType || "glitch",
      exp: q.exp || 10,
      difficulty: this.getDifficultyLevel(q.exp),
    }));
  }

  getDifficultyLevel(exp) {
    if (exp <= 10) return "beginner";
    if (exp <= 15) return "intermediate";
    return "advanced";
  }

  isRecentlyUsed(questionId) {
    const recentSessions = this.sessionHistory.slice(-3);
    return recentSessions.some((session) => session.questions.some((q) => q.id === questionId));
  }

  shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  loadHistory() {
    try {
      const stored = localStorage.getItem("quizHistory");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  saveToHistory(questions) {
    const session = {
      timestamp: Date.now(),
      questions: questions.map((q) => ({ id: q.id, category: q.cat })),
    };

    this.sessionHistory.push(session);
    if (this.sessionHistory.length > 10) {
      this.sessionHistory = this.sessionHistory.slice(-10);
    }

    try {
      localStorage.setItem("quizHistory", JSON.stringify(this.sessionHistory));
    } catch (e) {
      console.warn("Failed to save history:", e);
    }
  }

  getStatistics() {
    const stats = {
      totalSessions: this.sessionHistory.length,
      totalQuestions: 0,
      categoryDistribution: {},
      difficultyDistribution: { beginner: 0, intermediate: 0, advanced: 0 },
    };

    this.sessionHistory.forEach((session) => {
      stats.totalQuestions += session.questions.length;
      session.questions.forEach((q) => {
        stats.categoryDistribution[q.category] = (stats.categoryDistribution[q.category] || 0) + 1;
      });
    });

    return stats;
  }
}

window.questionSelector = new QuestionSelector();
