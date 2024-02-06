// This file contains the logic to check if the score ratio is between a range of values.
const isScoreRatioBetween = (state, quizzes, lower, upper) => {
  const scoreRatio = (state.score / quizzes.length) * 100;
  return scoreRatio >= lower && scoreRatio <= upper;
};

export { isScoreRatioBetween }