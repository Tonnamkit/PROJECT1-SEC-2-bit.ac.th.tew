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
    restart() {
      this.reset()
      state.gameStarted = true;
    }
  };

  return { state, actions };
};

const displayImg = (percent) => {
  const calPercent = (state.score / quizzes.length) * 100
  return calPercent <= percent
}

const { state, actions } = useGameStore(3);
</script>

<template>
  <div>
    <link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

    <!-- Main Menu -->
    <div id="main-menu" v-if="!state.gameStarted">
      <h1>Funny Quiz Game</h1>
      <button @click="actions.startGame">Start Game</button>
    </div>
    <!-- Quiz -->
    <div id="quiz-section" v-else>
      <h1>Hello, world. Tew is testing the push concept on github</h1>
      <button @click="actions.endGame">FINISH QUIZ</button>
    </div>
    <!-- Result Overlay -->
    <div id="result" v-show="state.gameEnded"
      class="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div id="result-content" class="bg-white p-8 rounded-lg text-center">
        <div id="header-section">
          <h2 class="text-5xl font-bold">Game Ended</h2>
        </div>
        <div id="score-section" class="text-2xl my-4">
          Your Score: {{ state.score }}
        </div>
        <div id="image-section" class="my-4 flex justify-center">
          <img src="./assets/images/25.jpg" v-show="displayImg(25)" alt="เฟมผิดหวังในตัวคุณ"
            class="rounded-lg w-64 h-64 object-cover">
        </div>
        <div id="btn-section" class="flex justify-center">
          <button @click="actions.reset" class="text-xl px-4 py-2 bg-blue-500 text-white rounded mr-4"><span
              class="material-symbols-outlined">
              home
            </span></button>
          <button @click="actions.restart" class="text-xl px-4 py-2 bg-green-500 text-white rounded"><span
              class="material-symbols-outlined">
              restart_alt
            </span></button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped></style>
