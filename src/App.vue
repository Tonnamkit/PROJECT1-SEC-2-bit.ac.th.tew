<script setup>
import { reactive, watch} from 'vue';
import Questions from '../data/question';
import useGameStore from './hook/GameStore';
import GameStatus from './utils/GameStatus';
import extraLifePoints from './utils/ExtraLifePoints';
import { isScoreRatioBetween } from './utils/ScoreRatioBetween';
import {
  addOns,
  expectedRangesWithMessages,
  buttonStyles,
  textBoxStyles,
  INITIAL_LIFE_POINTS,
} from './utils/EnvironmentVariable';

const quizzes = reactive(Questions);
const { state, actions } = useGameStore(quizzes, INITIAL_LIFE_POINTS);

const isOptionsExist = () => {
  return quizzes[state.currentQuiz].options !== undefined;
};

const setButtonStyle = (isTextAnswer, getStyle, event) => {
  const target = event.target;
  target.className = getStyle(isTextAnswer);
  state.isChecking = true
  if (isTextAnswer) {
    setTimeout(() => {
      target.className = textBoxStyles.DEFAULT;
    }, 1000);
  } else {
    setTimeout(() => {
      target.className = buttonStyles.DEFAULT;
    }, 1000);
  }
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
    extraLifePoints(state, actions, addOns.dropExtraLifeRatio);
    setButtonStyle(
      isTextAnswer,
      (isTextAnswer) => {
        return isTextAnswer ? textBoxStyles.CORRECT : buttonStyles.CORRECT;
      },
      event
    );
  } else {
    actions.removeLifePoint();
    setButtonStyle(
      isTextAnswer,
      (isTextAnswer) => {
        return isTextAnswer ? textBoxStyles.INCORRECT : buttonStyles.INCORRECT;
      },
      event
    );
  }

  if (isTextAnswer) {
    event.target.value = '';
  }

  state.gameStatus = GameStatus.VALIDATED;
};

const handleClickEnter = (event) => {
  const newEvent = new Event('keyup');
  event.target.previousElementSibling.dispatchEvent(newEvent);
  validateAnswer(undefined, newEvent);
};

watch([() => state.score, () => state.lifePoints], () => {  
  if (state.gameStatus === GameStatus.VALIDATED && !state.gameEnded) {
      setTimeout(() => {
        actions.nextQuiz();
      }, 1000);
  }
});
</script>

<template>
  <div class="set-center-page bg-page">
    <!-- Main Menu -->
    <div
      id="main-menu"
      v-if="!state.gameStarted"
      class="box general-border mx-10"
    >
      <h1 class="heading-text animate-bounce">Bit Quiz Tew</h1>
      <button @click="actions.startGame" class="general-btn md:hover-button">
        Start Game
      </button>
    </div>
    <!-- Quiz -->
    <div
      id="quiz-section"
      class="set-center-page flex-col gap-6 lg:gap-6"
      :class="state.gameEnded ? 'blur-sm' : 'blur-none'"
      v-else
    >
      <div
        id="life-point"
        class="box flex-col gap-4 p-4 w-5/12 md:w-4/12 lg:w-3/12"
      >
        <h3 class="sub-heading-text">Life Point</h3>
        <div class="set-child-center gap-2 min-[410px]:gap-4">
          <div v-for="n in state.lifePoints" :key="n">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="heart heart-sm md:heart-md"
            >
              <path
                d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
              />
            </svg>
          </div>
        </div>
      </div>
      <h2 class="box question-box text-xl lg:text-3xl text-center">
        <div
          v-if="
            state.currentQuiz % addOns.dropExtraLifeRatio === 0 &&
            state.currentQuiz !== 0
          "
          class="flex gap-2 items-center text-wrap justify-center w-1/4 md:w-1/5 lg:w-1/6 bg-golden-sand-500 text-white p-1 pl-1 rounded-lg m-3"
        >
          Extra life
        </div>
        {{ quizzes[state.currentQuiz].question }}
      </h2>
      <div class="flex gap-4 w-4/5" v-if="!isOptionsExist()">
        <input
          type="text"
          id="answer"
          placeholder="Type your answer here!"
          class="input input-bordered input-lg w-full box answer-box pl-4"
          @keyup.enter="if(!state.isChecking) validateAnswer(undefined, $event);"
        />
        <button
          @click="if(!state.isChecking) handleClickEnter($event);"
          class="general-btn hover-button box bg-golden-sand-500 hover:bg-golden-sand-600 text-white"
        >
          Enter
        </button>
      </div>
      <div
        v-else
        class="answer-container-sm md:answer-container-md gap-2 md:gap-y-2 w-4/5 md:w-[95%]"
      >
        <p
          v-for="(option, index) in quizzes[state.currentQuiz].options"
          :key="index"
          class="box answer-box md:hover-button h-fit"
          @click="if(!state.isChecking) validateAnswer(index + 1, $event);"
        >
          {{ option }}
        </p>
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
          <h2 class="heading-text">Game Ended</h2>
        </div>
        <p id="score-section" class="sub-heading-text my-4">
          Your Score: {{ state.score }}
        </p>
        <div id="image-section" class="my-8 flex justify-center">
          <div v-for="item in expectedRangesWithMessages" :key="item.lower">
            <div
              v-if="isScoreRatioBetween(state, quizzes, item.lower, item.upper)"
              class="flex flex-col items-center gap-2"
            >
              <img
                :src="`images/${item.upper}.jpg`"
                :alt="item.message"
                class="rounded-lg w-64 h-80 object-cover"
              />
              <h3
                class="sub-heading-text mt-3 font-bold underline underline-offset-2"
              >
                {{ item.message }}
              </h3>
            </div>
          </div>
        </div>
        <div id="btn-section" class="flex justify-evenly">
          <p
            id="home-btn"
            @click="actions.reset"
            class="bg-blue-500 button-icon md:hover-button set-child-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              class="result-icon"
            >
              <path
                d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
              />
            </svg>
          </p>
          <p
            id="restart-btn"
            @click="actions.restart"
            class="bg-green-500 button-icon md:hover-button set-child-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="result-icon"
            >
              <path
                d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"
              />
            </svg>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Single+Day&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');

* {
  font-family: 'Single Day', 'Itim', cursive;
  user-select: none;
}
</style>
