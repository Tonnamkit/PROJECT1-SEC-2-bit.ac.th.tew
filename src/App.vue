<script setup>
import { ref, reactive } from "vue";
import Questions from "../data/question";

const quizzes = reactive(Questions);

const useGameStore = (lifePoints) => {
  const state = reactive({
    gameStarted: false,
    gameEnded: false,
    lifePoints,
    score: 0,
    currentQuiz: 0,
  });

  const actions = {
    nextQuiz() {
      state.currentQuiz++;
    },
    addScore() {
      state.score++;
    },
    removeLifePoint() {
      state.lifePoints--;
    },
    startGame() {
      state.gameStarted = true;
    },
    endGame() {
      state.gameEnded = true;
    },
    reset() {
      state.gameStarted = false;
      state.gameEnded = false;
      state.lifePoints = lifePoints;
      state.score = 0;
      state.currentQuiz = 0;
    },
  };

  return { state, actions };
};

const { state, actions } = useGameStore(3);

//bomscope

// const isCorrectAnswer = (optionId) => {
//   if (optionId === answerIndex) {
//     setBtnStyle("green")
//     score.value++;
//   } else {
//     setBtnStyle("red")
//     --lifePoints.value;
//     if (lifePoints.value === 0) {
//       gameOver.value = true;
//     }
//   }
//   if (!isGameEnd(currentQuiz.value)) {
//     currentQuiz.value++;
//   } else {
//     gameEnded.value = true;
//   }
// }

// const isGameEnd = (quizIndex) => {
//   return quizIndex === (quizes.length-1)
// }
</script>

<template>
  <div>
    <!-- Main Menu -->
    <div id="main-menu" v-if="!state.gameStarted">
      <h1>Funny Quiz Game</h1>
      <button @click="actions.startGame">Start Game</button>
    </div>
    <!-- Quiz -->

    <!-- Result Overlay -->
  </div>
</template>

<style scoped></style>
