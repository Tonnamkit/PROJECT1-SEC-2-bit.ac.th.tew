<script setup>
import { ref, reactive } from 'vue'
import Questions from '../data/question'
import debugMode from './util/debug'

const quizzes = reactive(Questions)

const { debug } = debugMode(true)

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
    restart() {
      this.reset()
      state.gameStarted = true
    },
  }
  return { state, actions }
}

const { state, actions } = useGameStore(3)
debug(state)
debug(state.lifePoints)
debug('current : ' + state.currentQuiz)
debug('isGameEnd' + state.gameEnded)

//? how to access object question
// debug(quizzes[0].question)

const isCorrectAnswer = (optionAns, event) => {
  if (optionAns === quizzes[state.currentQuiz].answer) {
    event.target.className = 'bg-green-200'
    actions.addScore()
    debug(state.score)
  } else {
    actions.removeLifePoint()
    debug('current life points : ' + state.lifePoints)
    if (state.lifePoints === 0) {
      debug('end game !!!!')
      actions.endGame()
    }
  }

  if (state.currentQuiz !== quizzes.length - 1) {
    actions.nextQuiz()
  } else {
    actions.endGame()
  }
}
</script>

<template>
  <div class="h-screen w-screen flex items-center">
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    />
    <!-- Main Menu -->
    <div
      id="main-menu"
      v-if="!state.gameStarted"
      class="flex flex-col justify-center items-center gap-[15%] sm:gap-[22%] h-1/2 sm:w-1/2 mx-auto text-center"
    >
      <h1 class="text-4xl sm:text-5xl font-bold leading-loose">
        Funny Quiz Game
      </h1>
      <button
        @click="actions.startGame"
        class="btn btn-outline w-3/5 sm:w-1/2 text-xl"
      >
        Start Game
      </button>
    </div>
    <!-- Quiz -->
    <div id="quiz-section" v-else>
      <h1>Hello, world. Tew is testing the push concept on github</h1>
      <button @click="actions.endGame">FINISH QUIZ</button>
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
          @click="isCorrectAnswer(index + 1, $event)"
        >
          {{ option }}
        </div>
      </div>
    </div>
    <!-- Result Overlay -->
    <div
      id="result"
      v-show="state.gameEnded"
      class="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
    >
      <div id="result-content" class="bg-white p-8 rounded-lg text-center">
        <div id="header-section">
          <h2 class="text-5xl font-bold">Game Ended</h2>
        </div>
        <div id="score-section" class="text-2xl my-4">
          Your Score: {{ state.score }}
        </div>
        <div id="image-section" class="my-4">
          <h3>Under Construction!!</h3>
        </div>
        <div id="btn-section" class="flex justify-center">
          <button
            @click="actions.reset"
            class="text-xl px-4 py-2 bg-blue-500 text-white rounded mr-4"
          >
            <span class="material-symbols-outlined"> home </span>
          </button>
          <button
            @click="actions.restart"
            class="text-xl px-4 py-2 bg-green-500 text-white rounded"
          >
            <span class="material-symbols-outlined"> restart_alt </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
