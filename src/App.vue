<script setup>
import { reactive, watch } from 'vue';
import Questions from '../data/question';
import useGameStore from './hook/GameStore';
import GameStatus from './utils/GameStatus';
import extraLifePoints from './utils/ExtraLifePoints';
import { buttonStyle } from './utils/EnvironmentVariable';
import { isScoreRatioBetween } from './utils/ScoreRatioBetween';
import {
  addOns,
  expectedRangesWithMessages,
} from './utils/EnvironmentVariable';

const quizzes = reactive(Questions);
const { state, actions } = useGameStore(quizzes, 3);

const isOptionsExist = () => {
  return quizzes[state.currentQuiz].options !== undefined;
};

const setButtonStyle = (btnStyle, event) => {
  event.target.className = btnStyle
};

const validateAnswer = (chosenOptionIndex, event) => {
  const currentAnswer = quizzes[state.currentQuiz].answer;
  const isTextAnswer = !chosenOptionIndex;
  const enteredTextAnswer = isTextAnswer
    ? event.target.value.trim().toLowerCase()
    : null;

  if (
    (isTextAnswer && enteredTextAnswer === currentAnswer.toLowerCase()) ||
    (!isTextAnswer && chosenOptionIndex === currentAnswer)
  ) {
    actions.addScore();
    setButtonStyle(buttonStyle.CORRECT, event);
    extraLifePoints(state, actions, addOns.dropExtraLifeRatio);
  } else {
    actions.removeLifePoint();
  }

  if (isTextAnswer) {
    event.target.value = '';
  }

  state.gameStatus = GameStatus.VALIDATED;
};

watch([() => state.score, () => state.lifePoints], () => {
  if (state.gameStatus === GameStatus.VALIDATED && !state.gameEnded) {
    actions.nextQuiz();
  }
});
</script>

<template>
  <div class="h-screen w-screen flex items-center select-none">
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
      <div class="lifePoint">
        Life Point <span v-for="n in state.lifePoints">❤️</span>
      </div>
      <h2 class="question">
        {{ quizzes[state.currentQuiz].question }}
      </h2>
      <div class="quizForm">
        <div class="textBox" v-if="!isOptionsExist()">
          <input
            type="text"
            id="answer"
            placeholder="Type your answer here!"
            @keyup.enter="validateAnswer(undefined, $event)"
          />
        </div>
        <button
          v-else
          class="btn btn-outline"
          v-for="(option, index) in quizzes[state.currentQuiz].options"
          :key="index"
          @click="validateAnswer(index + 1, $event)"
        >
          {{ option }}
        </button>
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
        <div id="image-section" class="my-4 flex justify-center">
          <div v-for="item in expectedRangesWithMessages">
            <div
              v-if="isScoreRatioBetween(state, quizzes, item.lower, item.upper)"
            >
              <img
                :src="`src/assets/images/${item.upper}.jpg`"
                :alt="item.message"
                class="rounded-lg w-64 h-80 object-cover"
              />
              <h3 class="text-xl mt-3 font-bold underline underline-offset-2">
                {{ item.message }}
              </h3>
            </div>
          </div>
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
