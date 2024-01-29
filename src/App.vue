<script setup>
import { ref, reactive } from 'vue'
import Questions from '../data/question'

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
        <h1 v-if="state.gameStarted">
            Hello, world. Tew is testing the push concept on github
        </h1>
        <!-- Result Overlay -->
        <div
            id="result-overlay"
            class="absolute inset-0 flex flex-col justify-center items-center h-screen"
            v-if="!state.gameStarted"
        >
            <div
                id="result-box"
                class="flex flex-col justify-center items-center gap-4 lg:gap-8 border-2 border-black rounded-2xl px-8 py-16 md:px-16 md:py-32 lg:px-32"
            >
                <h1 class="font-bold text-4xl md:text-6xl lg:text-8xl xl:text-9xl">Game Over</h1>
                <p class="text-xl md:text-3xl lg:text-6xl xl:text-7xl">Score: {{ state.score }}</p>
                <button class="btn btn-sm md:btn lg:btn-lg" @click="() => {actions.reset(); actions.startGame();}">
                    Play Again
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
