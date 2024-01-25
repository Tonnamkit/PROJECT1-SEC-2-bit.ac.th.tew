<script setup>
import { ref, reactive } from "vue";
import Questions from "../data/question"

const gameStarted = ref(false);
const gameEnded = ref(false);
const gameOver = ref(false);
const lifePoints = ref(3);
const score = ref(0);
const quizes = reactive(Questions);
const currentQuiz = ref(0);

const isCorrectAnswer = (optionId) => {
  if (optionId === answerIndex) {
    setBtnStyle("green")
    score.value++;
  } else {
    setBtnStyle("red")
    --lifePoints.value;
    if (lifePoints.value === 0) {
      gameOver.value = true;
    }
  }
  if (!isGameEnd(currentQuiz.value)) {
    currentQuiz.value++;
  } else {
    gameEnded.value = true;
  }
}

const isGameEnd = (quizIndex) => {
  return quizIndex === (quizes.length-1)
}
</script>

<template>
  <div>
    
  </div>
</template>

<style scoped></style>