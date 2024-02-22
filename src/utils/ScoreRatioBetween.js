const isScoreRatioBetween = (state, quizzes, lower, upper) => {
  const scoreRatio = Math.round((state.score / quizzes.length) * 100);
  return scoreRatio >= lower && scoreRatio <= upper;
};

export { isScoreRatioBetween }