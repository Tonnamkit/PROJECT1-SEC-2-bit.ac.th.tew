const extraLifePoints = (state, actions, dropRatio) => {
    if (state.currentQuiz % dropRatio === 0 && state.currentQuiz !== 0) {
      if (state.lifePoints === 3) {
        return;
      } else {
        actions.addLifePoint();
      }
    }
};

export default extraLifePoints;