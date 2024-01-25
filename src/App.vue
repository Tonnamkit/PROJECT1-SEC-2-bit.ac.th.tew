<script setup>
import { ref, reactive } from "vue";
import Questions from "../data/question"

const gameStarted = ref(false);
const gameEnded = ref(false);
const lifePoints = ref(3);
const score = ref(0);
const quizes = reactive(Questions);
const currentQuiz = ref(0);
</script>

<template>
  <div>
    <h1>Hello, world. Tew is testing the push concept on github</h1>
  </div>
</template>

<style scoped></style>