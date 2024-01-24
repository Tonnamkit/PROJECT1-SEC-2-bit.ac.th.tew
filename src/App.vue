<script setup>
import { ref, reactive, watch, nextTick } from "vue";
import Questions from "../data/question"

const windowWidth = ref(window.innerWidth);
const gameStarted = ref(false);
const gameEnded = ref(false);
const lifePoints = ref(3);
const score = ref(0);

const quizes = reactive(Questions);

const currentQuiz = ref(0);
const btnStyles = reactive(
  quizes[currentQuiz.value].options.map(() => "btn-outline")
);

const isChecking = ref(false);

const init = () => {
  gameEnded.value = false;
  currentQuiz.value = 0;
  lifePoints.value = 3;
  score.value = 0;
  isChecking.value = false;
  btnStyles.forEach((_, i) => {
    btnStyles[i] = "btn-outline";
  });
};

const toHome = () => {
  gameStarted.value = false;
  init();
};

const startGame = () => {
  gameStarted.value = true;
  init();
  console.log("Game started", gameStarted.value);
};

const checkAnswer = (index) => {
  console.log("Checking Answer");
  isChecking.value = true;
  if (index + 1 === quizes[currentQuiz.value].answer) {
    console.log("Correct");
    score.value++;
    btnStyles[index] = "btn-success";
    setTimeout(() => {
      if (checkGameEnded()) return;
      currentQuiz.value++;
      btnStyles.forEach((_, i) => {
        btnStyles[i] = "btn-outline";
      });
      isChecking.value = false;
    }, 1000);
  } else {
    console.log("Wrong");
    btnStyles[index] = "btn-error";
    setTimeout(() => {
      lifePoints.value--;
      btnStyles[index] = "btn-outline";
      if (lifePoints.value === 0 || checkGameEnded()) {
        console.log("Game Over");
        gameEnded.value = true;
        return;
      }
      isChecking.value = false;
      currentQuiz.value++;
    }, 1000);
  }
};

const checkGameEnded = () => {
  if (currentQuiz.value === quizes.length - 1) {
    console.log("Game Ended");
    gameEnded.value = true;
    return true;
  }
};

watch([currentQuiz, gameStarted], async () => {
  await nextTick();
  console.log("From watch");
  my_modal_2.showModal();
});
</script>

<template>
  <div>
    <div
      v-if="!gameStarted"
      id="home"
      class="flex justify-center items-center h-screen w-screen"
    >
      <div class="flex flex-col items-center gap-8 sm:gap-16 w-1/2 h-1/3">
        <h1 class="text-center leading-relaxed font-bold text-4xl sm:text-6xl">
          Funny Quiz Game
        </h1>
        <button
          @click="startGame"
          class="btn btn-outline rounded-2xl sm:btn-lg text-xl w-full sm:w-1/2"
        >
          New Game
        </button>
      </div>
    </div>

    <div
      v-else
      id="quiz"
      class="flex flex-col justify-between sm:justify-evenly items-center h-screen sm:w-[90%] mx-auto sm:py-6"
    >
      <!-- Score & Question Tab [Mobile] -->
      <div
        v-if="windowWidth <= 640"
        class="sm:hidden h-[10%] w-full flex justify-between items-center px-6"
      >
        <div class="flex">
          <div
            v-for="n in lifePoints"
            class="text-2xl"
          >
            ❤️
          </div>
        </div>
        <div>
          <button
            onclick="my_modal_2.showModal()"
            class="btn"
          >
            Show Question
          </button>
          <dialog
            id="my_modal_2"
            class="modal"
          >
            <div class="modal-box flex justify-center items-center h-1/3">
              <h3 class="font-bold text-2xl text-center leading-relaxed">
                {{ quizes[currentQuiz].question }}
              </h3>
            </div>
            <form
              method="dialog"
              class="modal-backdrop"
            >
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
      <!-- Score Section [SM] -->
      <div class="hidden sm:h-8 sm:flex sm:gap-2">
        <div
          v-for="n in lifePoints"
          class="md:text-5xl lg:text-3xl"
        >
          ❤️
        </div>
      </div>
      <!-- Question Section [SM] -->
      <div
        :key="currentQuiz"
        class="hidden h-[10%] sm:h-[30%] lg:h-[48%] w-[82%] sm:bg-slate-300 sm:text-3xl px-6 sm:flex justify-center items-center"
      >
        <div>
          <h1 class="sm:text-center sm:leading-relaxed">
            {{ quizes[currentQuiz].question }}
          </h1>
        </div>
      </div>
      <!-- Options Section -->
      <div
        class="h-[90%] sm:max-h-1/2 sm:h-[35%] sm:min-h-[30%] flex justify-between items-center flex-wrap sm:gap-4 w-full p-4 sm:p-6 rounded-md border"
      >
        <div
          v-for="(option, index) in quizes[currentQuiz].options"
          :key="index"
          @mousedown="if (!isChecking) checkAnswer(index);"
          :class="[btnStyles[index]]"
          class="btn w-[49%] sm:w-[47%] h-[49%] max-h-[50%] sm:text-xl sm:min-w-[48%] sm:h-[47%] flex justify-center items-center border-2"
        >
          {{ option }}
        </div>
      </div>
    </div>

    <div
      id="result"
      v-show="gameEnded"
      class="absolute top-0 left-0 z-10 w-screen h-screen bg-slate-300/75 flex justify-center items-center"
    >
      <div
        class="h-3/5 w-4/5 sm:h-4/5 sm:w-3/5 py-8 sm:py-[5%] bg-slate-300 border-2 border-black rounded-2xl flex flex-col justify-evenly items-center gap-10"
      >
        <h2 class="text-4xl font-bold sm:text-6xl">Game Ended</h2>
        <div
          class="w-[35%] py-2 sm:w-1/5 sm:py-4 border border-neutral-500 rounded-lg sm:rounded-xl text-center text-lg sm:text-xl"
        >
          Score {{ score }}
        </div>
        <div
          class="flex flex-col h-[30%] sm:h-[25%] w-1/2 sm:w-1/3 gap-5 sm:gap-8"
        >
          <button
            @click="startGame"
            class="btn btn-outline h-1/2 sm:h-1/2 border-2 rounded-lg sm:rounded-2xl sm:text-2xl"
          >
            New Game
          </button>
          <button
            @click="toHome"
            class="btn btn-outline h-1/2 sm:h-1/2 border-2 rounded-lg sm:rounded-2xl sm:text-2xl"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>