<script setup>
import { ref, reactive } from "vue"
import Questions from "../data/question"

const quizzes = reactive(Questions)

const useGameStore = (lifePoints) => {
  const state = reactive({
    gameStarted: false,
    gameEnded: false,
    lifePoints,
    score: 0,
    currentQuiz: 0,
  })

  const actions = {
    nextQuiz() {
      state.currentQuiz++
    },
    addScore() {
      state.score++
    },
    removeLifePoint() {
      state.lifePoints--
    },
    startGame() {
      state.gameStarted = true
    },
    endGame() {
      state.gameEnded = true
    },
    reset() {
      state.gameStarted = false
      state.gameEnded = false
      state.lifePoints = lifePoints
      state.score = 0
      state.currentQuiz = 0
    },
  }

  return { state, actions }
}

const { state, actions } = useGameStore(3)
</script>

<template>
  <div>
    <!-- Main Menu -->
    <div id="main-menu" v-if="!state.gameStarted">
      <h1>Funny Quiz Game</h1>
      <button @click="actions.startGame">Start Game</button>
    </div>
    <!-- Quiz -->
    <div id="quiz-section" v-else>
      <div class="lifePoint">
        Life Point <span v-for="n in state.lifePoints">❤️</span>
      </div>
      <h2 class="question">
        {{ quizzes[state.currentQuiz].question }}
      </h2>
      <div class="quizForm">
        <div
          class="option"
          v-for="(option, index) in quizzes[state.currentQuiz].options"
          :key="index"
        >
          {{ option }}
        </div>
      </div>
    </div>
    <!-- Result Overlay -->
  </div>
</template>

<style scoped></style>
