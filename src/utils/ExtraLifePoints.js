import { INITIAL_LIFE_POINTS } from "./EnvironmentVariable";
const extraLifePoints = (state, actions, dropRatio) => {
  if (state.currentQuiz % dropRatio === 0 && state.currentQuiz !== 0) {
    if (state.lifePoints === INITIAL_LIFE_POINTS) {
      return;
    } else {
      actions.addLifePoint();
    }
  }
};

export default extraLifePoints;
